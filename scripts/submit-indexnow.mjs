/**
 * IndexNow + Bing Webmaster Tools Bulk-Submit
 * ───────────────────────────────────────────
 * Meldet alle DE-URLs aus dist/sitemap.xml an IndexNow (Bing, Yandex, Seznam,
 * Naver …) und – als Backup – an die Bing WMT SubmitUrlbatch-API.
 *
 * Aufruf:  node scripts/submit-indexnow.mjs
 *          (läuft auch als Teil von `npm run build:deploy`)
 *
 * Voraussetzung: `npm run build` wurde ausgeführt (dist/sitemap.xml existiert).
 * Kein externer Dependency-Bedarf: nutzt Node-natives fetch (Node 18+) und
 * Regex-Sitemap-Parse (xml2js optional, nicht nötig).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const HOST = "gastro-master.de";
const SITE_URL = `https://${HOST}`;
const SITEMAP_PATH = path.join(ROOT, "dist", "sitemap.xml");
// Der Key MUSS derjenige sein, unter dem der Host bei IndexNow zuerst
// akzeptiert wurde. Beide Key-Dateien liegen live im Root und liefern 200,
// aber nur 3phgc5… wird angenommen (HTTP 202); 5e1219b3… quittiert IndexNow
// mit „UserForbiddedToAccessSite" (403), obwohl die Datei erreichbar ist.
const KEY_PATH = path.join(ROOT, "scripts", "indexnow.key");

// ── 1. IndexNow-Key laden ────────────────────────────────────────────────────
if (!fs.existsSync(KEY_PATH)) {
  console.error(`❌ IndexNow-Key fehlt: ${KEY_PATH} — erst Key generieren.`);
  process.exit(1);
}
const KEY = fs.readFileSync(KEY_PATH, "utf-8").trim();
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

// ── Bing-WMT-Key aus .env.local lesen (ohne dotenv-Dependency) ───────────────
function readEnvLocal(name) {
  if (process.env[name]) return process.env[name];
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return null;
  const line = fs
    .readFileSync(envPath, "utf-8")
    .split("\n")
    .find((l) => l.trim().startsWith(`${name}=`));
  return line ? line.slice(line.indexOf("=") + 1).trim() : null;
}
const BING_WMT_API_KEY = readEnvLocal("BING_WMT_API_KEY");

// ── 2. URLs aus dist/sitemap.xml lesen + filtern ─────────────────────────────
if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`❌ Sitemap fehlt: ${SITEMAP_PATH} — erst \`npm run build\` ausführen.`);
  process.exit(1);
}
const sitemapXml = fs.readFileSync(SITEMAP_PATH, "utf-8");

const allLocs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());

// Nur DE-URLs; andere Sprachen, Paginierung, Assets/Bilder ausschließen.
const DE_PREFIX = `${SITE_URL}/de`;
const EXCLUDE = /\/page\/|\/blog-covers\/|\.(webp|jpg|jpeg|png|gif|svg|css|js|xml|txt|ico)$/i;
const urlList = [
  ...new Set(
    allLocs.filter(
      (u) => (u === `${SITE_URL}/de` || u.startsWith(`${DE_PREFIX}/`)) && !EXCLUDE.test(u),
    ),
  ),
];

console.log(`📄 Sitemap: ${allLocs.length} <loc> gesamt → ${urlList.length} DE-URLs nach Filter`);
if (urlList.length === 0) {
  console.error("❌ Keine DE-URLs gefunden — Abbruch.");
  process.exit(1);
}

// ── HTTP-Helper mit robustem Fehler-Handling ─────────────────────────────────
async function post(url, options, label) {
  try {
    const res = await fetch(url, options);
    const text = await res.text().catch(() => "");
    console.log(`   ${res.ok ? "✅" : "⚠️ "} ${label}: HTTP ${res.status} ${res.statusText}${text ? ` — ${text.slice(0, 200)}` : ""}`);
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.log(`   ❌ ${label}: Verbindungsfehler — ${String(err?.message || err).slice(0, 160)}`);
    return { ok: false, status: 0 };
  }
}

// ── 3. IndexNow-Submit (Bing + alle IndexNow-Partner) ────────────────────────
console.log("\n🔔 IndexNow → https://api.indexnow.org/indexnow");
console.log(`   host=${HOST} · keyLocation=${KEY_LOCATION}`);
const indexNowRes = await post(
  "https://api.indexnow.org/indexnow",
  {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  },
  "IndexNow",
);

// ── 4. Bing WMT SubmitUrlbatch (Backup, max 500/Tag) ─────────────────────────
console.log("\n🔔 Bing WMT → SubmitUrlbatch");
let bingRes = { ok: false, status: 0 };
if (!BING_WMT_API_KEY) {
  console.log("   ⏭  BING_WMT_API_KEY fehlt in .env.local — Bing-WMT-Call übersprungen.");
} else if (urlList.length > 500) {
  console.log(`   ⏭  ${urlList.length} URLs > 500/Tag-Limit — Bing-WMT-Call übersprungen (IndexNow deckt Bing ab).`);
} else {
  bingRes = await post(
    `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_WMT_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ siteUrl: SITE_URL, urlList }),
    },
    "Bing WMT",
  );
}

// ── 5. Zusammenfassung ───────────────────────────────────────────────────────
console.log("\n────────── Zusammenfassung ──────────");
console.log(`URLs eingereicht : ${urlList.length}`);
console.log(`IndexNow         : HTTP ${indexNowRes.status}${indexNowRes.ok ? " ✅" : ""}`);
console.log(`Bing WMT         : HTTP ${bingRes.status}${bingRes.ok ? " ✅" : BING_WMT_API_KEY ? "" : " (übersprungen)"}`);

// Exit-Code: Erfolg wenn mind. IndexNow angenommen (200/202).
process.exit(indexNowRes.ok || bingRes.ok ? 0 : 2);

/**
 * Canonical-Validation (dist-Scan).
 * Prüft jede gebaute HTML-Datei in dist/ auf:
 *   1. genau EIN <link rel="canonical"> (kein fehlendes, kein doppeltes)
 *   2. self-referenziell: der href == eigener URL-Pfad (pro Sprache)
 *      Ausnahme: die Root-SPA-Fallback-Datei (dist/index.html) zeigt bewusst
 *      auf /de (Default-Sprache).
 *
 * Deckt die PRERENDERER-Ebene ab (fängt Prerenderer-Regressions + Missing/
 * Duplicate-Tags). Die client-seitige Überschreibung (useSeoMeta) wird durch
 * lint-canonical-source.mjs abgesichert — ein statischer dist-Scan kann sie
 * naturgemäß nicht sehen (sie passiert erst zur Laufzeit im Browser).
 *
 * Usage: node scripts/validate-canonical.mjs   ·   Exit-Code 1 bei Fehler.
 */

import { readFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const SITE_URL = "https://gastro-master.de";
const DEFAULT_LANG = "de";

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

const norm = (u) => u.replace(/\/+$/, "");

let files;
try {
  files = walkHtml(DIST);
} catch {
  console.error("❌ dist/ nicht gefunden — erst `npm run build` (bzw. vite build + prerender) laufen lassen.");
  process.exit(1);
}

const errors = [];
let withTag = 0;
let skippedStubs = 0;

for (const file of files) {
  const slug = file.replace(DIST, "").replace(/\/index\.html$/, ""); // "" für Root
  // Erwartete self-referenzielle Canonical. Root-Fallback → Default-Sprache.
  const expected = norm(slug === "" ? `${SITE_URL}/${DEFAULT_LANG}` : `${SITE_URL}${slug}`);

  const html = readFileSync(file, "utf-8");

  // Migrations-Redirect-Stubs (Meta-Refresh + noindex) zeigen bewusst auf ihren
  // Nachfolger statt auf sich selbst → überspringen (siehe generate-prerendered-html.mjs).
  if (/http-equiv=["']refresh["']/i.test(html) && /name=["']robots["'][^>]*noindex/i.test(html)) {
    skippedStubs += 1;
    continue;
  }

  const tags = html.match(/<link[^>]+rel="canonical"[^>]*>/g) || [];
  const label = slug || "/";

  if (tags.length === 0) {
    errors.push(`[${label}] KEIN <link rel="canonical">`);
    continue;
  }
  if (tags.length > 1) {
    errors.push(`[${label}] ${tags.length} Canonical-Tags (erwartet: genau 1)`);
  }
  withTag++;

  const hrefMatch = tags[0].match(/href="([^"]+)"/);
  if (!hrefMatch) {
    errors.push(`[${label}] Canonical-Tag ohne href`);
    continue;
  }
  const href = norm(hrefMatch[1]);
  if (href !== expected) {
    errors.push(`[${label}] Canonical zeigt nicht auf sich selbst:\n        ist:      ${href}\n        erwartet: ${expected}`);
  }
}

const realPages = files.length - skippedStubs;
console.log(`🔎 Canonical-Validation über ${files.length} dist-Seiten (${skippedStubs} Redirect-Stubs übersprungen).`);
console.log(`   ${withTag}/${realPages} echte Seiten mit Canonical-Tag.`);

if (errors.length === 0) {
  console.log("✅ Alle Seiten haben genau 1 self-referenzielle Canonical.");
  process.exit(0);
}
console.error(`❌ ${errors.length} Canonical-Fehler:`);
for (const e of errors.slice(0, 50)) console.error(`   - ${e}`);
if (errors.length > 50) console.error(`   ... und ${errors.length - 50} weitere`);
process.exit(1);

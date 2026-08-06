/**
 * Post-build script: generates dist/sitemap.xml
 * Reads route config from src/config/routes.ts (parsed as text, no TS runtime needed).
 * Supports per-language localized slugs.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ─── Parse routes from TypeScript config ─────────────────────────────────────
const configSource = readFileSync(resolve(ROOT, "src/config/routes.ts"), "utf-8");

// Matches entries that use the `slugs(de, en, it)` helper:
//   { key: "foo", slugs: slugs("/de-slug", "/en-slug", "/it-slug"), importPath: "...", priority: 0.8, changefreq: "weekly" }
const helperRegex =
  /\{\s*key:\s*"([^"]+)",\s*slugs:\s*slugs\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)\s*,\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;

// Matches entries with an explicit slugs object (e.g. the homepage):
//   { key: "home", slugs: { de: "/", en: "/", it: "/", fa: "/", si: "/", ru: "/" }, ... }
const explicitRegex =
  /\{\s*key:\s*"([^"]+)",\s*slugs:\s*\{\s*de:\s*"([^"]+)",\s*en:\s*"([^"]+)",\s*it:\s*"([^"]+)",\s*fa:\s*"([^"]+)",\s*si:\s*"([^"]+)",\s*ru:\s*"([^"]+)"\s*\}\s*,\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;

const routes = [];
let m;

while ((m = helperRegex.exec(configSource)) !== null) {
  const [, key, de, en, it, priority, changefreq] = m;
  routes.push({
    key,
    slugs: { de, en, it, fa: en, si: en, ru: en },
    priority: parseFloat(priority),
    changefreq,
  });
}

while ((m = explicitRegex.exec(configSource)) !== null) {
  const [, key, de, en, it, fa, si, ru, priority, changefreq] = m;
  routes.push({
    key,
    slugs: { de, en, it, fa, si, ru },
    priority: parseFloat(priority),
    changefreq,
  });
}

if (routes.length === 0) {
  console.error("❌ No routes found in src/config/routes.ts");
  process.exit(1);
}

// ─── Config ──────────────────────────────────────────────────────────────────
const BASE_URL = "https://gastro-master.de";
const LANGUAGES = ["de", "en", "it", "fa", "si", "ru"];
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// XML-escape für Text der in Element-Content fließt (z.B. image:title/caption).
// Ohne das bricht ein rohes `&` (z.B. "Kassensystem & Bestellsystem") die Sitemap
// mit `xmlParseEntityRef: no name` → Google parst nur bis zur Fehlerzeile.
// `&` MUSS zuerst ersetzt werden, sonst wird das eingefügte `&amp;` doppelt escaped.
function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ─── Generate XML ────────────────────────────────────────────────────────────
const urlEntries = [];

const buildHref = (lang, slug) => {
  const pathPart = slug === "/" ? "" : slug;
  return `${BASE_URL}/${lang}${pathPart}`;
};

// Batch 4 (vorgezogen): nur DE-Routen in die Sitemap. en/it/fa/si/ru sind jetzt
// noindex → sie gehören nicht in die Sitemap (sonst widersprüchliches Signal).
// hreflang-Alternates entfallen, weil nur eine indexierbare Sprache bleibt.
for (const route of routes) {
  const loc = buildHref("de", route.slugs.de);
  urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`);
}

// ─── Blog post URLs ───────────────────────────────────────────────────────────
// Parse slug + publishedDate from BOTH blog data files: blog-posts-generated.ts
// (generierte Posts) und blog-posts.ts (handgeschriebene lbp-Posts — der
// Spread `...generatedBlogPosts` dort enthält keine Slug-Literale, daher
// keine Duplikate; zur Sicherheit wird per Set dedupliziert).
// Blog is DE-only (no hreflang alternates).
const blogPostRegex = /slug:\s*"([^"]+)"[\s\S]*?publishedDate:\s*"([^"]+)"/g;
const blogPosts = [];
const seenBlogSlugs = new Set();
for (const file of ["src/data/blog-posts-generated.ts", "src/data/blog-posts.ts"]) {
  const source = readFileSync(resolve(ROOT, file), "utf-8");
  let bp;
  blogPostRegex.lastIndex = 0;
  while ((bp = blogPostRegex.exec(source)) !== null) {
    if (seenBlogSlugs.has(bp[1])) continue;
    seenBlogSlugs.add(bp[1]);
    blogPosts.push({ slug: bp[1], publishedDate: bp[2] });
  }
}

for (const { slug, publishedDate } of blogPosts) {
  const loc = `${BASE_URL}/de/blog/${slug}`;
  // lastmod: today (statt publishedDate) — signalisiert GSC die laufenden
  // Polish-Wellen (FAQ-Erweiterung, Internal-Links, Quotables, Schema-Upgrades).
  urlEntries.push(
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
  );
}

// ─── Standalone: /request-data-delete (präfixlos, DE-only, keine Alternates) ──
// Stabile URL für App-Store-Datenlöschungsangaben; pre-rendered via
// generate-prerendered-html.mjs (gleicher Pfad, eigenes statisches HTML).
urlEntries.push(
  `  <url>\n    <loc>${BASE_URL}/request-data-delete</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>`,
);

// ─── Comparison-URLs (multilingual, alle 6 Sprachen, lokalisiertes Segment) ─
// EN nutzt SaaS-Industrienorm "vs" (monday.com/vs/asana). Muss synchron mit
// src/config/routes.ts:VERGLEICHE_SEGMENT bleiben.
const COMPARISON_SEGMENT = {
  de: "vergleiche",
  en: "vs",
  it: "confronti",
  fa: "vs",
  si: "vs",
  ru: "vs",
};
// Hub-Page (Übersicht aller Konkurrenz-Vergleiche) — nur DE (Batch 4: Nicht-DE
// noindex, daher nicht in die Sitemap und ohne hreflang-Alternates).
let hubUrlCount = 0;
{
  const loc = `${BASE_URL}/de/${COMPARISON_SEGMENT.de}`;
  urlEntries.push(
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
  );
  hubUrlCount += 1;
}

const { readdirSync: readdirSyncForComparisons } = await import("fs");
let comparisonSlugs = [];
try {
  comparisonSlugs = readdirSyncForComparisons(resolve(ROOT, "src/data/comparisons"))
    .filter(
      (f) =>
        f.endsWith(".ts") &&
        f !== "types.ts" &&
        f !== "index.ts" &&
        f !== "hub.ts",
    )
    .map((f) => f.replace(/\.ts$/, ""));
} catch {
  comparisonSlugs = [];
}
let comparisonUrlCount = 0;
for (const slug of comparisonSlugs) {
  // Nur DE (Batch 4).
  const loc = `${BASE_URL}/de/${COMPARISON_SEGMENT.de}/${slug}`;
  urlEntries.push(
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
  );
  comparisonUrlCount += 1;
}

// Image-Sitemap-Block für die Hauptseite (alle 6 Sprachen). Ergänzt das
// Standard-Sitemap-Schema mit Google's xmlns:image. Bei mehrsprachigen Sites
// wird das Image-Tag pro Locale-URL (Homepage) wiederholt — das verbessert
// Multimodal-SEO (Google Images, Bing Visual, Yandex). Wir referenzieren nur
// hash-freie Public-Assets (Logo, Favicon) — gehashte Vite-Assets ändern
// Filenames pro Build und sollten nicht in Sitemap.
const HOMEPAGE_IMAGES = [
  {
    loc: `${BASE_URL}/logo-gastro-master.png`,
    title: "Gastro Master — Provisionsfreies Bestellsystem für Restaurants",
    caption: "Logo Gastro Master · Kassensystem & Bestellsystem für Restaurants",
  },
];

// Patche Homepage-URL-Entries (route.slugs.de === "/") um image-Blocks
const homeRoute = routes.find((r) => r.slugs.de === "/");
if (homeRoute) {
  const imagesXml = HOMEPAGE_IMAGES.map(
    (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`,
  ).join("\n");
  // Inject images before closing </url> für jede Homepage-Locale-URL (de/en/it/fa/si/ru)
  for (let i = 0; i < urlEntries.length; i += 1) {
    const isHome = LANGUAGES.some(
      (lang) => urlEntries[i].includes(`<loc>${BASE_URL}/${lang}</loc>`),
    );
    if (isHome) {
      urlEntries[i] = urlEntries[i].replace(
        "  </url>",
        `${imagesXml}\n  </url>`,
      );
    }
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urlEntries.join("\n")}
</urlset>
`;

// ─── Write to dist/ ──────────────────────────────────────────────────────────
const outPath = resolve(ROOT, "dist/sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");

const blogUrlCount = blogPosts.length;
console.log(`✅ Sitemap generated (DE-only, Batch 4): ${routes.length} route URLs + ${blogUrlCount} blog URLs + ${hubUrlCount} comparison-hub URL + ${comparisonUrlCount} comparison detail URLs = ${urlEntries.length} total URLs`);
console.log(`   → ${outPath}`);

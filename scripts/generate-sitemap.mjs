/**
 * Post-build script: generates dist/sitemap.xml
 * Reads route config from src/config/routes.ts (parsed as text, no TS runtime needed)
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ─── Parse routes from TypeScript config ─────────────────────────────────────
const configSource = readFileSync(resolve(ROOT, "src/config/routes.ts"), "utf-8");

// Extract ROUTES array entries via regex (avoids needing a TS runtime)
const routeRegex = /\{\s*path:\s*"([^"]+)",\s*importPath:\s*"[^"]+",\s*priority:\s*([\d.]+),\s*changefreq:\s*"([^"]+)"\s*\}/g;
const routes = [];
let match;
while ((match = routeRegex.exec(configSource)) !== null) {
  routes.push({
    path: match[1],
    priority: parseFloat(match[2]),
    changefreq: match[3],
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

// ─── Generate XML ────────────────────────────────────────────────────────────
const urlEntries = [];

for (const route of routes) {
  for (const lang of LANGUAGES) {
    const pagePath = route.path === "/" ? "" : route.path;
    const loc = `${BASE_URL}/${lang}${pagePath}`;

    // hreflang alternates for this page
    const alternates = LANGUAGES.map(
      (altLang) =>
        `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}/${altLang}${pagePath}" />`
    ).join("\n");

    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/de${pagePath}" />`;

    urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
${alternates}
${xDefault}
  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urlEntries.join("\n")}
</urlset>
`;

// ─── Write to dist/ ──────────────────────────────────────────────────────────
const outPath = resolve(ROOT, "dist/sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");

console.log(`✅ Sitemap generated: ${routes.length} routes × ${LANGUAGES.length} languages = ${urlEntries.length} URLs`);
console.log(`   → ${outPath}`);

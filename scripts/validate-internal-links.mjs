/**
 * validate-internal-links.mjs — Build-Validator für interne Links.
 *
 * Prüft ALLE internen href-Werte in dist/ gegen die tatsächlich erzeugte
 * Dateimenge:
 *   - Ziel existiert nicht (Seite/Datei)  → FEHLER (exit 1)
 *   - präfixloser Link (/blog, /produkte, /loesungen, /downloads statt /de/…)
 *                                          → WARNUNG
 *   - /static/… (Asset, wird separat per FTP geliefert) → WARNUNG statt Fehler
 *
 * Läuft am Ende von `npm run build`. Verhindert, dass tote interne Links
 * (Soft-404 wegen SPA-Fallback) oder präfixlose Legacy-Links zurückkehren.
 */
import { readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';

const DIST = 'dist';

const allFiles = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else allFiles.push(p);
  }
};
walk(DIST);

const fileSet = new Set();
const dirWithIndex = new Set();
for (const f of allFiles) {
  const rel = '/' + relative(DIST, f).split('\\').join('/');
  fileSet.add(rel);
  if (rel.endsWith('/index.html')) {
    dirWithIndex.add(rel.replace(/\/index\.html$/, '') || '/');
  }
}

const resolves = (path) => {
  const clean = path.split('?')[0].split('#')[0];
  if (fileSet.has(clean)) return true;
  const p = clean.replace(/\/$/, '') || '/';
  return dirWithIndex.has(p);
};

const htmls = allFiles.filter((f) => f.endsWith('.html'));
const PREFIXLESS = /^\/(blog|produkte|loesungen|downloads)\//;

const deadTargets = new Map(); // href -> {count, sample}
const prefixless = new Map();
const staticMissing = new Map();

for (const f of htmls) {
  const html = readFileSync(f, 'utf-8');
  const rel = relative(DIST, f);
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const base = href.split('#')[0].split('?')[0];
    if (PREFIXLESS.test(base)) {
      const e = prefixless.get(base) || { count: 0, sample: rel };
      e.count += 1;
      prefixless.set(base, e);
    }
    if (!resolves(base)) {
      const bucket = base.startsWith('/static/') ? staticMissing : deadTargets;
      const e = bucket.get(base) || { count: 0, sample: rel };
      e.count += 1;
      bucket.set(base, e);
    }
  }
}

const printList = (label, map, max = 40) => {
  const entries = [...map.entries()].sort((a, b) => b[1].count - a[1].count);
  console.log(label);
  for (const [href, info] of entries.slice(0, max)) {
    console.log(`   ${String(info.count).padStart(4)}×  ${href}   (z.B. ${info.sample})`);
  }
  if (entries.length > max) console.log(`   … und ${entries.length - max} weitere`);
};

let failed = false;

if (prefixless.size > 0) {
  const total = [...prefixless.values()].reduce((s, e) => s + e.count, 0);
  printList(`⚠️  ${prefixless.size} präfixlose interne Link-Ziele (${total} Vorkommen) — sollten /de/… sein:`, prefixless);
}

if (staticMissing.size > 0) {
  const total = [...staticMissing.values()].reduce((s, e) => s + e.count, 0);
  printList(`⚠️  ${staticMissing.size} /static/-Ziele fehlen im Build (${total} Vorkommen) — separat per FTP liefern:`, staticMissing);
}

if (deadTargets.size > 0) {
  const total = [...deadTargets.values()].reduce((s, e) => s + e.count, 0);
  printList(`❌ ${deadTargets.size} interne Link-Ziele existieren NICHT (${total} Vorkommen):`, deadTargets);
  failed = true;
}

if (failed) {
  console.error('❌ INTERNAL-LINKS VALIDATION FAILED — tote interne Links gefunden.');
  process.exit(1);
}
console.log(`✅ Interne Links: alle Ziele existieren (${htmls.length} HTML-Dateien geprüft)` + (prefixless.size ? ' — Warnungen s.o.' : '') + '.');

/**
 * Canonical-Source-Lint (Pre-Build).
 * Sichert den ECHTEN Regressions-Vektor des Canonical-Bugs ab: die
 * client-seitige Ableitung in src/hooks/useSeoMeta.ts.
 *
 * Der Bug (GSC „Alternative Seite mit richtigem kanonischen Tag") entstand, weil
 * useSeoMeta die korrekte prerenderte Canonical post-JS mit einem hardcodierten
 * Prop-String überschrieb (ohne /lang/-Prefix, bei Nicht-DE sogar falsche Sprache).
 * Der Fix leitet die Canonical IMMER aus window.location ab.
 *
 * BUILD-BRECHEND (Exit 1):
 *   - useSeoMeta leitet die Canonical NICHT mehr aus window.location ab, ODER
 *   - useSeoMeta übergibt wieder den rohen Prop an upsertLink("canonical", …).
 *   Beides würde den Bug reaktivieren — deckt ALLE Call-Sites auf einen Schlag ab
 *   (hardcoded Strings, t()-Locale, Templates, Config), weil die Mechanik zentral ist.
 *
 * WARNUNGEN (nicht build-brechend, für späteres Aufräumen):
 *   - hardcodierte Canonical-String-Literale in useSeoMeta-Call-Sites (jetzt inert)
 *   - Locale-JSON meta.canonical ohne korrekten /lang/-Prefix (jetzt inert)
 *
 * Usage: node scripts/lint-canonical-source.mjs   ·   Exit-Code 1 bei Regression.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SITE_URL = "https://gastro-master.de";
const LANGS = ["de", "en", "it", "fa", "si", "ru"];

const criticals = [];
const warnings = [];

// ─── 1. BUILD-BRECHEND: useSeoMeta-Mechanik ─────────────────────────────────
const hookPath = resolve(ROOT, "src/hooks/useSeoMeta.ts");
if (!existsSync(hookPath)) {
  criticals.push("src/hooks/useSeoMeta.ts nicht gefunden — Canonical-Guard kann nicht greifen.");
} else {
  const hook = readFileSync(hookPath, "utf-8");
  const derivesFromLocation = /window\.location\.pathname/.test(hook);
  // Alt-Bug-Muster: upsertLink("canonical", <bezeichner>) mit rohem Prop statt
  // der abgeleiteten Variable. Erlaubt ist upsertLink("canonical", canonicalHref).
  const rawPropOverwrite = /upsertLink\(\s*["']canonical["']\s*,\s*canonical\s*\)/.test(hook);

  if (!derivesFromLocation) {
    criticals.push(
      'useSeoMeta.ts leitet die Canonical NICHT aus window.location.pathname ab — ' +
      "der Canonical-Bug-Guard ist deaktiviert (siehe scripts/lint-canonical-source.mjs).",
    );
  }
  if (rawPropOverwrite) {
    criticals.push(
      'useSeoMeta.ts ruft wieder upsertLink("canonical", canonical) mit dem rohen ' +
      "Prop auf → überschreibt die korrekte Canonical mit einem hardcodierten Wert.",
    );
  }
}

// ─── 2. WARNUNG: hardcodierte Canonical-String-Literale in Call-Sites ────────
function walkSrc(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) walkSrc(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith("useSeoMeta.ts")) out.push(full);
  }
  return out;
}

const reHardcoded = /canonical:\s*[`"']https?:\/\/[^`"']+[`"']/g;
for (const file of walkSrc(resolve(ROOT, "src"))) {
  const src = readFileSync(file, "utf-8");
  let m;
  while ((m = reHardcoded.exec(src)) !== null) {
    const rel = file.replace(ROOT + "/", "");
    warnings.push(`hardcodierte Canonical (inert, useSeoMeta ignoriert sie): ${rel} → ${m[0].slice(0, 80)}`);
  }
}

// ─── 3. WARNUNG: Locale-JSON meta.canonical mit falschem/fehlendem Prefix ────
const localesDir = resolve(ROOT, "public/locales");
if (existsSync(localesDir)) {
  for (const lang of LANGS) {
    const langDir = resolve(localesDir, lang);
    if (!existsSync(langDir)) continue;
    for (const entry of readdirSync(langDir, { withFileTypes: true })) {
      if (!entry.name.endsWith(".json")) continue;
      let data;
      try {
        data = JSON.parse(readFileSync(resolve(langDir, entry.name), "utf-8"));
      } catch {
        continue;
      }
      const can = data?.meta?.canonical;
      if (typeof can !== "string") continue;
      const expectedPrefix = `${SITE_URL}/${lang}`;
      // korrekt: exakt der Sprach-Root ODER beginnt mit /{lang}/
      const ok = can === expectedPrefix || can.startsWith(`${expectedPrefix}/`);
      if (!ok) {
        warnings.push(`Locale ${lang}/${entry.name}: meta.canonical ohne /${lang}/-Prefix (inert) → ${can}`);
      }
    }
  }
}

// ─── Ausgabe ────────────────────────────────────────────────────────────────
if (warnings.length) {
  console.warn(`⚠️  ${warnings.length} Canonical-Warnung(en) (nicht build-brechend, Aufräum-Kandidaten):`);
  for (const w of warnings.slice(0, 25)) console.warn(`   - ${w}`);
  if (warnings.length > 25) console.warn(`   ... und ${warnings.length - 25} weitere`);
}

if (criticals.length === 0) {
  console.log("✅ Canonical-Guard aktiv: useSeoMeta leitet self-referenziell aus window.location ab.");
  process.exit(0);
}
console.error(`❌ ${criticals.length} kritische(r) Canonical-Regression(en):`);
for (const e of criticals) console.error(`   - ${e}`);
process.exit(1);

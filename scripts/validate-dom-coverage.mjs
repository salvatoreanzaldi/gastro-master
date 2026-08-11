#!/usr/bin/env node
/**
 * Deckungsprüfung: Steht der Text des prerenderten HTML auch im gerenderten DOM?
 * ────────────────────────────────────────────────────────────────────────────
 * Warum es diese Datei gibt (Batch 7): Die Prüfung lief mehrere Runden lang als
 * Ad-hoc-Skript und meldete nie etwas — weil sie es nicht konnte. Zwei Fehler
 * steckten in der Methode:
 *   1. Der DOM-Korpus war `innerText + textContent` VERKETTET. Jedes Wort stand
 *      damit doppelt zur Verfügung; fehlender Text ging als „gefunden" durch.
 *   2. Gesucht wurde in `innerHTML` INKLUSIVE der <script>-Blöcke. Damit fand
 *      man FAQ-Antworten im JSON-LD statt im Seiteninhalt — genau die Stelle,
 *      an der die Antworten in Wahrheit fehlten.
 * Beide Fehler sind hier ausgeschlossen und die Konvention ist festgeschrieben:
 *
 *   KORPUS      nur textContent von #root (nicht body, nicht innerText)
 *   TAGS        Tag-Grenzen werden zu Leerzeichen (sonst klebt „WebseiteApp")
 *   AUSSCHLUSS  <script> und <style> werden VORHER entfernt
 *   ZÄHLUNG     jedes DOM-Wort genau einmal (Multiset, kein Doppelkorpus)
 *   SICHTBAR    eingeklappte Panels zählen mit (textContent sieht sie)
 *   VORBEDINGT  ohne Hydrations-Beweis bricht das Skript ab statt zu melden
 *
 * Zwei Kennzahlen, weil eine nicht reicht:
 *   • WORT-RECALL  — Anteil der statischen Inhaltswörter, die im DOM vorkommen.
 *     Grob, aber stabil. Blind für Passagen, deren Wörter anderswo auf der Seite
 *     ebenfalls vorkommen (deshalb allein nicht ausreichend).
 *   • FEHLENDE PASSAGEN — statische Textblöcke, von denen weniger als die Hälfte
 *     der Wörter im DOM auftaucht, werden IM WORTLAUT ausgegeben. Diese Prüfung
 *     hat die verschwundenen FAQ-Antworten gefunden, nicht die Prozentzahl.
 *
 * Das statische Chrome (Navigation + Footer aus site-navigation.ts) wird
 * abgezogen — es ist Boilerplate und würde die Werte schönen.
 *
 * Aufruf:
 *   node scripts/validate-dom-coverage.mjs                 # Standard-Stichprobe
 *   node scripts/validate-dom-coverage.mjs --pages=/de,/de/preise
 *   node scripts/validate-dom-coverage.mjs --threshold=93
 *   node scripts/validate-dom-coverage.mjs --selftest      # Negativtest, s. u.
 *
 * NEGATIVTEST (--selftest): schleust einen eindeutigen Satz in das statische
 * HTML einer dist-Datei ein, der im DOM garantiert nicht vorkommt, lässt die
 * Prüfung laufen und stellt die Datei danach wieder her. Schlägt die Prüfung
 * dabei NICHT an, ist sie kaputt und das Skript endet mit Exit-Code 1.
 * Eine Prüfung, die nie anschlägt, ist verdächtig, bis jemand sie absichtlich
 * zum Anschlagen gebracht hat.
 *
 * Braucht einen Browser (Playwright) und läuft deshalb NICHT im Build.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, extname, resolve } from 'node:path';
import { statSync } from 'node:fs';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};
const SELFTEST = process.argv.includes('--selftest');
const THRESHOLD = Number(arg('threshold', '93'));
const PORT = Number(arg('port', '4187'));

/**
 * Stichprobe: je ein Vertreter pro Seitentyp (Prerenderer-Zweig) PLUS jede
 * Seite, die ein Batch repariert hat — sonst reparieren wir Seiten und merken
 * nicht, wenn sie wieder driften (Batch 9).
 * Laufzeit: ein Browser-Kontext je Seite, rund 4 s pro Seite.
 */
const DEFAULT_PAGES = [
  // Seitentypen
  '/de',
  '/de/produkte',
  '/de/produkte/pakete/kassensystem',
  '/de/produkte/hardware',
  '/de/produkte/add-ons',
  '/de/loesungen/restaurant',
  '/de/blog/pausenzeiten-gastronomie',
  '/de/blog/lieferando-partner-werden-vor-und-nachteile',
  '/de/blog/was-kostet-bestellsystem',
  '/de/blog/thema/arbeitsrecht',
  '/de/vergleiche/resmio',
  // In Batch 8/9 repariert — ab jetzt überwacht
  '/de/faq',
  '/de/preise',
  '/de/loesungen',
  '/de/uber-uns',
  '/de/produkte/add-ons/kiosk',
];
const PAGES = arg('pages', '') ? arg('pages', '').split(',').filter(Boolean) : DEFAULT_PAGES;

// ─── Apache-treuer Static-Server (DirectoryIndex + SPA-Fallback) ─────────────
// vite preview löst /pfad NICHT auf /pfad/index.html auf und liefert stattdessen
// sofort die Root-Shell — man misst dann die Startseite statt der Zielseite.
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain' };
const startServer = () =>
  new Promise((ok) => {
    const server = createServer((req, res) => {
      const rel = decodeURIComponent((req.url || '/').split('?')[0]).replace(/^\/+/, '');
      for (const cand of [join(DIST, rel, 'index.html'), join(DIST, rel), join(DIST, 'index.html')]) {
        try {
          if (!statSync(cand).isFile()) continue;
          res.writeHead(200, { 'Content-Type': MIME[extname(cand)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
          res.end(readFileSync(cand));
          return;
        } catch { /* nächster Kandidat */ }
      }
      res.writeHead(404).end('not found');
    });
    server.listen(PORT, () => ok(server));
  });

// ─── Textaufbereitung ───────────────────────────────────────────────────────
const ENTITIES = { '&amp;': '&', '&nbsp;': ' ', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&auml;': 'ä', '&ouml;': 'ö', '&uuml;': 'ü', '&Auml;': 'Ä', '&Ouml;': 'Ö', '&Uuml;': 'Ü', '&szlig;': 'ß', '&euro;': '€', '&ndash;': '–', '&mdash;': '—', '&bdquo;': '„', '&ldquo;': '"', '&rdquo;': '"', '&hellip;': '…', '&lt;': '<', '&gt;': '>', '&sect;': '§', '&middot;': '·', '&bull;': '•', '&rsquo;': '’', '&lsquo;': '‘', '&deg;': '°' };
const decode = (s) => s.replace(/&[a-zA-Z#0-9]+;/g, (m) => ENTITIES[m] ?? ' ');
/** HTML → Text, Tag-Grenzen als Leerzeichen, Skripte/Styles raus. */
const plain = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
const words = (text) =>
  text.toLowerCase().replace(/[^a-zäöüß0-9€%§]+/g, ' ').split(' ').filter((w) => w.length > 2);

/** Statischer Seiteninhalt ohne Navigation/Footer (Chrome ist Boilerplate). */
const staticContent = (file) => {
  const html = readFileSync(file, 'utf8');
  const start = html.indexOf('<div id="root">');
  if (start < 0) return { text: '', passages: [] };
  const root = html
    .slice(start, html.indexOf('</body>', start))
    .replace(/<nav class="static-chrome-nav"[\s\S]*?<\/nav>/, '')
    .replace(/<footer class="static-chrome-footer"[\s\S]*?<\/footer>/, '');
  const passages = root
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .split(/<\/(?:p|li|h1|h2|h3|h4|td|th|blockquote)>/)
    .map(plain)
    .filter((t) => t.split(' ').length >= 8);
  return { text: plain(root), passages };
};

// ─── Messung im Browser ─────────────────────────────────────────────────────
const measure = async (page, url) => {
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle' });
  // Lazy-Sektionen mounten lassen
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  return page.evaluate(() => {
    const root = document.querySelector('#root');
    if (!root) return null;
    const clone = root.cloneNode(true);
    clone.querySelectorAll('script,style').forEach((n) => n.remove());
    return {
      // innerHTML des bereinigten Klons: Tag-Grenzen bleiben erhalten und werden
      // erst in Node zu Leerzeichen — textContent allein würde Wörter verkleben.
      html: clone.innerHTML,
      hydrated: !!document.querySelector('h1') && root.querySelectorAll('*').length > 50 &&
        !!Object.keys(root).find((k) => k.startsWith('__react')),
      nodes: root.querySelectorAll('*').length,
    };
  });
};

const run = async () => {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('❌ Playwright nicht installiert — Deckungsprüfung übersprungen (npm i -D playwright).');
    process.exit(2);
  }
  const server = await startServer();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const results = [];
  for (const url of PAGES) {
    const file = join(DIST, url === '/' ? '' : url, 'index.html');
    if (!existsSync(file)) { console.log(`⚠️  ${url}: keine prerenderte Datei — übersprungen`); continue; }
    const page = await ctx.newPage();
    const dom = await measure(page, url);
    await page.close();
    if (!dom) { console.error(`❌ ${url}: kein #root im DOM.`); process.exitCode = 1; continue; }
    if (!dom.hydrated) {
      // Vorbedingung, kein Ergebnis: eine nicht hydrierte Seite würde 100 %
      // Deckung melden, weil das statische HTML noch unverändert dasteht.
      console.error(`❌ ${url}: HYDRATIONS-BEWEIS FEHLGESCHLAGEN (${dom.nodes} Knoten) — Messung ungültig.`);
      process.exitCode = 1;
      continue;
    }
    const domWords = new Map();
    for (const w of words(plain(dom.html))) domWords.set(w, (domWords.get(w) || 0) + 1);
    const present = new Set(domWords.keys());
    const { text, passages } = staticContent(file);
    const staticWords = words(text);
    const budget = new Map(domWords);
    let hits = 0;
    for (const w of staticWords) {
      const left = budget.get(w) || 0;
      if (left > 0) { hits += 1; budget.set(w, left - 1); }
    }
    const recall = staticWords.length ? Math.round((hits / staticWords.length) * 100) : 100;
    const missingPassages = passages
      .map((p) => { const ws = words(p); const found = ws.filter((w) => present.has(w)).length; return { p, share: ws.length ? found / ws.length : 1 }; })
      .filter((x) => x.share < 0.5);
    results.push({ url, recall, staticWords: staticWords.length, domWords: [...domWords.values()].reduce((a, b) => a + b, 0), missingPassages, nodes: dom.nodes });
  }
  await browser.close();
  server.close();
  return results;
};

const report = (results) => {
  let failed = 0;
  console.log(`\nDeckung statisch → DOM (Schwelle ${THRESHOLD} % Wort-Recall; Chrome abgezogen)\n`);
  for (const r of results) {
    const bad = r.recall < THRESHOLD || r.missingPassages.length > 0;
    if (bad) failed += 1;
    console.log(`${bad ? '❌' : '✅'} ${r.url.padEnd(52)} ${String(r.recall).padStart(3)} %  (${r.staticWords} statisch / ${r.domWords} DOM)`);
    for (const m of r.missingPassages) {
      console.log(`     fehlt im DOM: „${m.p.slice(0, 160)}${m.p.length > 160 ? '…' : ''}"`);
    }
  }
  console.log(
    failed === 0
      ? `\n✅ Deckung in Ordnung (${results.length} Seiten geprüft).`
      : `\n❌ ${failed} von ${results.length} Seiten unter der Schwelle oder mit fehlenden Passagen.`,
  );
  return failed;
};

// ─── Negativtest ────────────────────────────────────────────────────────────
const SELFTEST_SENTENCE =
  'Dieser Kontrollsatz existiert ausschliesslich im statischen HTML und darf im gerenderten DOM niemals auftauchen.';
const selftest = async () => {
  const target = join(DIST, 'de', 'index.html');
  const original = readFileSync(target, 'utf8');
  console.log('── Negativtest: Kontrollsatz wird in dist/de/index.html eingeschleust …');
  writeFileSync(target, original.replace('<div id="root">', `<div id="root"><p>${SELFTEST_SENTENCE}</p>`));
  try {
    const results = await run();
    const hit = results.find((r) => r.url === '/de');
    const caught = !!hit && hit.missingPassages.some((m) => m.p.includes('Kontrollsatz'));
    report(results);
    if (caught) {
      console.log('\n✅ NEGATIVTEST BESTANDEN: Die Prüfung hat den eingeschleusten Satz gemeldet.');
      return 0;
    }
    console.error('\n❌ NEGATIVTEST FEHLGESCHLAGEN: Der eingeschleuste Satz wurde NICHT gemeldet — die Prüfung ist blind.');
    return 1;
  } finally {
    writeFileSync(target, original);
    console.log('── dist/de/index.html wiederhergestellt.');
  }
};

const code = SELFTEST ? await selftest() : report(await run());
process.exit(code > 0 ? 1 : process.exitCode ?? 0);

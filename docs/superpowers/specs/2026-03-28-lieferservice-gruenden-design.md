# Spec: /loesungen/lieferservice-gruenden

**Datum:** 2026-03-28
**Status:** Approved
**Zielgruppe:** Komplette Neugründer ohne Gastro-Erfahrung, die "Lieferdienst gründen" googeln oder in KI-Suchmaschinen eingeben.

---

## 1. Überblick

Vollständiger Overhaul von `src/pages/LieferserviceGruendenPage.tsx` (aktuell 50-Zeilen-Stub) zu einer ~700-Zeilen self-contained Ratgeber-Seite.

**Route:** `/loesungen/lieferservice-gruenden` (bereits in App.tsx + Navbar.tsx registriert — keine Routing-Änderungen nötig)
**Approach:** Self-contained TSX, kein Component-Split, kein neues Verzeichnis. Folgt dem Muster von `TransaktionsumlagePage.tsx` und `AppPage.tsx`.

---

## 2. Seitenstruktur (6 Content-Sektionen)

```
<Navbar />          ← unveränderte Shared-Komponente
S1: Hero
S2: Marktstatistiken
S3: Schritt-für-Schritt Gründungsanleitung
S4: Vergleichstabelle
S5: FAQ-Akkordeon
S6: CTA-Abschluss
<Footer />          ← unveränderte Shared-Komponente
```

---

## 3. TypeScript-Interfaces & Daten-Arrays

### Interfaces

```typescript
interface StatItem {
  value: string;
  label: string;
  source: string;   // Anzeige-Text für den Link
  href: string;     // Externe URL
}

interface StepItem {
  num: string;         // "01" … "04"
  icon: LucideIcon;    // z.B. Building2, ClipboardList, Target, Monitor
  title: string;
  text: string;
  highlight: string;   // Highlight-Box-Text
  products?: Array<{ label: string; href: string }>;  // nur bei Schritt 4
  featured?: boolean;  // nur Schritt 4 = true
}

interface CompareRow {
  label: string;
  own: string;         // Wert für Gastro Master Spalte
  ownGood: boolean;    // true → grüne Farbe
  platform: string;    // Wert für Plattform-Spalte
  platformBad: boolean; // true → rote Farbe
}

interface FaqItem {
  q: string;
  a: string;
}
```

### STATS (4 Einträge)

```typescript
const STATS: StatItem[] = [
  {
    value: "6,1 Mrd. €",
    label: "Online Food Delivery Umsatz Deutschland (2023)",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "9,9 Mrd. €",
    label: "Prognostizierter Umsatz bis 2028 — Wachstum +62 %",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "bis 30 %",
    label: "Provision Lieferando bei Plattform-Fahrern",
    source: "Berliner Abendblatt",
    href: "https://berliner-abendblatt.de/berlin-news/lieferando-hoehere-provisionen-fuer-restaurants-id162852",
  },
  {
    value: "20–60 €",
    label: "Kosten für die Gewerbeanmeldung eines Lieferdienstes",
    source: "gewerbeanmeldung.de",
    href: "https://www.gewerbeanmeldung.de/gewerbe-anmelden/lieferservice",
  },
];
```

### STEPS (4 Einträge)

```typescript
const STEPS: StepItem[] = [
  {
    num: "01",
    icon: Building2,  // from lucide-react
    title: "Geschäftsmodell wählen",
    text: "Eigene Produktion, Ghost Kitchen oder Vermittlung? Jedes Modell hat andere Anforderungen an Kapital, Fläche und Personal. Ghost Kitchens liefern ohne Gastraum — mit 60–80 % niedrigeren Mietkosten.",
    highlight: "Ghost Kitchens: 60–80 % niedrigere Mietkosten vs. klassisches Restaurant",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Gewerbe anmelden & Rechtliches klären",
    text: "Du benötigst: Gewerbeanmeldung beim Gewerbeamt (20–60 €), Lebensmittelhygiene-Schulung nach HACCP-Standard und ein Gesundheitszeugnis vom Gesundheitsamt für alle Personen mit Lebensmittelkontakt.",
    highlight: "Kosten: 20–60 €. Dauer: 1–2 Wochen. Kein Führerschein oder Gaststättenkonzession nötig.",
  },
  {
    num: "03",
    icon: Target,
    title: "Spezialisierung statt breites Angebot",
    text: "Spezialisten gewinnen: Ein Lieferdienst für vegane Bowls baut schneller Stammkunden auf als ein generischer Anbieter. Nischenpositionierung schützt vor dem Preiskampf mit Plattformen.",
    highlight: "Empfehlung zum Start: 1 Küchen-Kategorie, 8–12 Gerichte, 1 Liefergebiet.",
  },
  {
    num: "04",
    icon: Monitor,
    title: "Technik & Bestellsystem aufbauen",
    text: "Hier entscheidet sich, ob du auf ewig Provision zahlst oder 100 % deines Umsatzes behältst. Mit Gastro Master bekommst du eigenen Webshop, App und Kassensystem — ohne technisches Vorwissen, live in 2–3 Wochen.",
    highlight: "0 % Provision ab dem ersten Auftrag. Keine Einrichtungskosten.",
    featured: true,
    products: [
      { label: "Webshop (0 % Provision)", href: "/produkte/webshop" },
      { label: "Bestell-App",             href: "/produkte/app" },
      { label: "Transaktionsumlage",      href: "/produkte/transaktionsumlage" },
      { label: "Webseite",                href: "/produkte/webseite" },
    ],
  },
];
```

### COMPARE_ROWS (8 Zeilen)

Spalten: **"Eigener Lieferdienst (Gastro Master)"** (navy) vs. **"Lieferando / Wolt / Uber Eats"** (orange/warm)

```typescript
const COMPARE_ROWS: CompareRow[] = [
  { label: "Provision pro Bestellung",   own: "0 %",                     ownGood: true,  platform: "13–30 %",            platformBad: true  },
  { label: "Kundendaten gehören dir",    own: "✓ Vollständig",           ownGood: true,  platform: "✗ Gehören der Plattform", platformBad: true  },
  { label: "Eigenes Branding & App",     own: "✓ Eigene Domain & App",   ownGood: true,  platform: "✗ Plattform-Branding",   platformBad: true  },
  { label: "Preisgestaltung",            own: "✓ Vollständig frei",      ownGood: true,  platform: "Eingeschränkt",           platformBad: false },
  { label: "Monatliche Fixkosten",       own: "ab 49 €/Monat",           ownGood: true,  platform: "% vom Umsatz (variabel)", platformBad: false },
  { label: "Plattform-Sichtbarkeit",     own: "Eigene SEO / Ads",        ownGood: false, platform: "✓ In der Plattform",      platformBad: false },
  { label: "Direktes Kundenfeedback",    own: "✓ Direkt & vollständig",  ownGood: true,  platform: "Nur über Plattform",      platformBad: false },
  { label: "Support & Onboarding",       own: "✓ Persönlich (700+ Kunden)", ownGood: true, platform: "Ticket-System",        platformBad: false },
];
```

### FAQ_ITEMS (5 Einträge)

```typescript
const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Was kostet es, einen Lieferdienst zu gründen?",
    a: "Die Gründungskosten variieren je nach Modell. Die Gewerbeanmeldung kostet 20–60 €. Für eine Ghost Kitchen ohne eigene Produktion sind Startkosten ab 2.000–5.000 € realistisch. Das Bestellsystem (Webshop + App) ist ab 49 €/Monat erhältlich. Das größte Sparpotenzial liegt im laufenden Betrieb: Kein Plattformanteil von 13–30 % auf jeden Auftrag.",
  },
  {
    q: "Brauche ich ein Restaurant, um einen Lieferdienst zu starten?",
    a: "Nein. Du kannst als sogenannte Ghost Kitchen starten — eine Küche, die ausschließlich für die Lieferung produziert, ohne Gastraum. Das spart erhebliche Mietkosten und macht den Einstieg deutlich günstiger. Wichtig ist nur eine Gewerbeanmeldung und die Einhaltung der Lebensmittelhygiene-Vorschriften.",
  },
  {
    q: "Wie viel Provision nimmt Lieferando?",
    a: "Lieferando verlangt 13 % Provision, wenn du deine eigenen Fahrer einsetzt. Nutzt du die Lieferando-Fahrer, steigt die Provision auf bis zu 30 % pro Bestellung. Bei Wolt und Uber Eats liegen die Sätze ähnlich: 15–30 % je nach Vertrag und Service-Level. Quelle: Berliner Abendblatt, leaf-systems.eu.",
  },
  {
    q: "Lohnt sich ein eigener Lieferdienst 2026?",
    a: "Ja — der Markt wächst laut Statista von 6,1 Mrd. € (2023) auf prognostizierte 9,9 Mrd. € bis 2028. Wer früh ein eigenes System aufbaut, profitiert doppelt: vom Marktwachstum und vom Wegfall der Plattformprovisionen. Mit einem eigenen Bestellsystem zahlst du ab 49 €/Monat statt bis zu 30 % Provision.",
  },
  {
    q: "Welche Genehmigungen brauche ich für einen Lieferdienst?",
    a: "Du benötigst: (1) Gewerbeanmeldung beim lokalen Gewerbeamt (20–60 €), (2) Lebensmittelhygiene-Schulung nach HACCP-Standard (online möglich, ca. 20–50 €), (3) Gesundheitszeugnis vom Gesundheitsamt für alle Personen mit Lebensmittelkontakt (einmalig, ca. 30 €). Eine Gaststättenerlaubnis ist für reine Lieferdienste ohne Gastraum nicht erforderlich.",
  },
];
```

---

## 4. Sektion-Details

### S1 — Hero

- **Hintergrund:** `bg-gradient-navy` — `linear-gradient(160deg, #061830, #0A264A, #0D3266)`
- **Badge:** Text `"Ratgeber 2026 · Lieferdienst gründen"`, Farbe cyan-brand
- **Breadcrumb:** `"Lösungen → Lieferdienst gründen"`, fade-gray
- **H1:** `"Eigenen Lieferdienst gründen — der komplette Leitfaden für 2026"`
- **Subline:** `"Ohne Lieferando. Ohne 30 % Provision. Mit einem eigenen System, das dir gehört. Dieser Leitfaden erklärt dir Schritt für Schritt, wie du deinen Lieferdienst aufbaust — von der Gewerbeanmeldung bis zum ersten Auftrag."`
- **GEO-Definitionsblock** — UI: `div` mit `border-l-2 border-cyan-brand bg-white/5 rounded-r-xl px-5 py-4`, darin:
  - Label: `<span className="text-cyan-brand text-xs font-bold uppercase tracking-widest">Definition</span>`
  - Text: `"Ein eigener Lieferdienst ermöglicht es Gründern, ohne hohe Fixkosten in den boomenden Food-Delivery-Markt einzusteigen — unabhängig von Plattformen wie Lieferando, Wolt oder Uber Eats. Statt 15–30 % Provision zu zahlen, behältst du 100 % deines Umsatzes."`
- **CTA-Row:**
  - Primär: `<Link to="/kontakt">` — `"Kostenlose Beratung anfragen →"` — amber gradient button
  - Sekundär: `<a href="#steps">` — `"Zur Anleitung ↓"` — ghost link, `text-white/50`
- **Animation:** `motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}`

### S2 — Marktstatistiken

- **Hintergrund:** `bg-white dark:bg-[#111111]`
- **Padding:** `py-20 md:py-28 px-5 md:px-8 lg:px-16`
- **Header:** H2 `"Food Delivery Deutschland — Marktüberblick 2026"`, Badge `"Marktdaten"`
- **Grid:** `grid grid-cols-2 md:grid-cols-4 gap-5` — 2 Spalten Mobile, 4 Spalten Desktop
- **Card-Aufbau (pro StatItem):**
  ```
  <div className="rounded-2xl p-6 border ...">
    <p className="text-3xl md:text-4xl font-black">{value}</p>
    <p className="text-sm text-muted mt-2">{label}</p>
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="text-xs underline mt-3 block text-muted/50 hover:text-cyan-brand">
      Quelle: {source} →
    </a>
  </div>
  ```
- **Erste Card:** navy background, `text-cyan-brand` für value, weiße Label-Texte
- **Restliche Cards:** `bg-white dark:bg-white/5`, border `border-[#0A264A]/08`
- **Animation:** `whileInView={{ opacity:1, y:0 }} initial={{ opacity:0, y:20 }} transition={{ delay: i*0.08 }} viewport={{ once:true }}`

### S3 — Schritt-für-Schritt Gründungsanleitung

- **Hintergrund:** `bg-[#0A264A]` (navy)
- **Padding:** `py-24 md:py-32 px-5 md:px-8 lg:px-16`
- **Badge:** `"Gründungsanleitung"` cyan
- **H2:** `"In 4 Schritten zum eigenen Lieferdienst"`
- **Grid:** `grid grid-cols-1 md:grid-cols-2 gap-6` — single column Mobile, 2×2 Desktop
- **Step-Card Aufbau:**
  ```
  <div className="relative rounded-2xl p-8 border border-white/08 bg-white/04 overflow-hidden">
    <span className="absolute top-4 right-5 text-7xl font-black text-white/04 select-none">{num}</span>
    <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
      <Icon className="w-5 h-5 text-cyan-brand" />
    </div>
    <h3 className="text-lg font-700 text-white mb-3">{title}</h3>
    <p className="text-sm text-white/55 leading-7">{text}</p>
    <div className="mt-4 rounded-lg bg-cyan-brand/08 border border-cyan-brand/15 px-4 py-3 text-cyan-brand text-sm font-500">{highlight}</div>
    {/* Schritt 4 only: */}
    <div className="mt-4 flex flex-wrap gap-2">
      {products.map(p => <Link to={p.href} className="...chip...">{p.label}</Link>)}
    </div>
  </div>
  ```
- **Schritt 4 featured:** `border-cyan-brand/30 bg-cyan-brand/06` statt default
- **Mobile:** Alle 4 Cards stapeln sich vertikal (single column)

### S4 — Vergleichstabelle

- **Hintergrund:** `bg-white dark:bg-[#111111]`
- **Padding:** `py-24 md:py-32 px-5 md:px-8 lg:px-16`
- **Badge:** `"Vergleich"` amber
- **H2:** `"Eigenes System vs. Plattform-Abhängigkeit"`
- **Mobile-Strategie:** Tabelle in `div.overflow-x-auto` gewrapped → horizontales Scrollen auf < 768px. Min-Width der Tabelle: `min-w-[640px]`
- **Tabellen-Header:**
  - Spalte 1: `bg-[#f8fafc]`, Text `"Kriterium"`, grau
  - Spalte 2: `bg-[#0A264A]`, Text `"Eigener Lieferdienst"` (weiß) + Subline `"mit Gastro Master"` (cyan)
  - Spalte 3: `bg-[#fff8f0]`, Text `"Lieferando / Wolt / Uber Eats"` (orange/brown `#92400e`)
- **Zeilen-Rendering:** Iteriert über `COMPARE_ROWS`, `ownGood` → grün (`text-emerald-500 font-bold`), `platformBad` → rot (`text-red-500 font-bold`)
- **Conversion-Box** unter Tabelle:
  ```
  bg-gradient-to-r from-[#0A264A] to-[#0D3266] rounded-2xl p-8 md:p-10
  flex flex-col md:flex-row items-start md:items-center justify-between gap-6
  ```
  - Text: `"Bei 3.000 € Monatsumsatz zahlt Lieferando bis zu 900 € Provision — jeden Monat. Mit Gastro Master zahlst du 49 € — und behältst den Rest."`
  - CTA-Button inline: `"Jetzt kostenlos testen →"` → `/kontakt`

### S5 — FAQ

- **Hintergrund:** `bg-[#f8fafc] dark:bg-[#0f172a]`
- **Padding:** `py-24 md:py-32 px-5 md:px-8 lg:px-16`
- **Header:** H2 `"Häufige Fragen zum Thema Lieferdienst gründen"`, Badge `"FAQ"`
- **Accordion-State:** `const [openIdx, setOpenIdx] = useState<number | null>(null)` — nur ein Item gleichzeitig offen
- **Item-Aufbau:**
  ```tsx
  <div key={i} className="bg-white dark:bg-white/5 rounded-2xl border border-[#0A264A]/07 overflow-hidden">
    <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
      className="w-full flex justify-between items-center px-6 py-5 text-left font-600 text-[#0A264A]">
      {item.q}
      <ChevronDown className={`transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>
      {openIdx === i && (
        <motion.div initial={{ height:0 }} animate={{ height:"auto" }} exit={{ height:0 }}
          className="overflow-hidden">
          <p className="px-6 pb-6 text-sm text-[#0A264A]/65 leading-7">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  ```
- **Max-Width:** `max-w-3xl mx-auto`
- **Mobile:** Vollständige Breite, kein Grid

### S6 — CTA-Abschluss

- **Hintergrund:** `bg-gradient-navy` (wie Hero)
- **Padding:** `py-24 md:py-32 px-5 md:px-8 lg:px-16`
- **Badge:** `"Kostenlose Beratung"` white/transparent
- **H2:** `"Wir helfen dir, deinen Lieferdienst zu planen"`
- **Subline:** `"700+ Gastronomen haben mit Gastro Master ihre Plattformabhängigkeit beendet. Lass uns gemeinsam herausfinden, welches System für deinen Lieferdienst passt."`
- **CTA:** `<Link to="/kontakt">` amber gradient button `"Kostenloses Erstgespräch vereinbaren →"`
- **Trust-Row** (`flex flex-wrap justify-center gap-8 mt-8`):
  ```
  [0 € Einrichtungskosten] [700+ aktive Kunden] [5,0 ★ Google] [Persönlicher Support]
  ```
  Jedes Item: `text-white/40 text-sm flex items-center gap-2`, Zahl/Wert `text-white/70 font-600`

---

## 5. SEO / GEO

### Meta-Tags (via `useEffect`)

```typescript
useEffect(() => {
  document.title = "Lieferdienst gründen 2026 — Kompletter Leitfaden | Gastro Master";
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content",
    "Eigenen Lieferdienst aufbauen ohne Lieferando. Schritt-für-Schritt: Gewerbeanmeldung, Kosten, Bestellsystem — 0 % Provision mit Gastro Master."
  );
}, []);
```

### Keywords

- Primär: `Lieferdienst gründen`, `Lieferservice gründen`
- Sekundär: `eigenen Lieferdienst aufbauen`, `Lieferservice eröffnen Kosten`, `Lieferdienst ohne Lieferando`, `Food Delivery Gründung Deutschland`

### GEO-Techniken

| Technik | Implementierung | Erwarteter Effekt |
|---------|----------------|-------------------|
| Statistiken mit Quellenlinks | 4 Stat-Cards mit externen Inline-Links | +37 % KI-Zitierrate |
| Definitionsblöcke | Hero-Definitionsblock | +15 % semantische Relevanz |
| Vergleichstabellen | S4 — 8-Zeilen-Tabelle | KI bevorzugt tabellarische Daten |
| FAQ-Schema | JSON-LD FAQPage | Google Featured Snippets |
| Article-Schema | JSON-LD Article | +25 % KI-Erwähnung |
| Externe Quellenlinks | `rel="noopener noreferrer"`, kein `nofollow` | Semantische Autorität |

### JSON-LD Schema 1 — FAQPage

```typescript
const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};
```

### JSON-LD Schema 2 — Article

```typescript
const SCHEMA_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Eigenen Lieferdienst gründen — der komplette Leitfaden für 2026",
  "description": "Schritt-für-Schritt Anleitung zum Aufbau eines eigenen Lieferdienstes ohne Plattformabhängigkeit.",
  "author": { "@type": "Organization", "name": "Gastro Master", "url": "https://gastro-master.de" },
  "publisher": { "@type": "Organization", "name": "Gastro Master", "url": "https://gastro-master.de" },
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-28",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://gastro-master.de/loesungen/lieferservice-gruenden" },
};
```

Beide Schemas werden als `<script type="application/ld+json">` im JSX gerendert:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
```

---

## 6. Design-System

| Token | Wert | Tailwind-Klasse |
|-------|------|-----------------|
| Primary Navy | `#0A264A` | `bg-[#0A264A]` / `text-[#0A264A]` |
| Cyan Accent | `hsl(196, 100%, 50%)` = `#00BFFF` | `text-cyan-brand` (custom token in tailwind.config) |
| Amber | `#F59E0B` | `text-amber-500` |
| Light BG | `#F8FAFC` | `bg-[#f8fafc]` |
| Border | `rgba(10,38,74,0.07)` | `border-[#0A264A]/07` |
| Schrift | Outfit | global in `index.css` geladen |
| Border-Radius Cards | 16px | `rounded-2xl` |
| Section-Padding | `py-24 md:py-32 px-5 md:px-8 lg:px-16` | — |

**Animations-Pattern (konsistent mit bestehenden Seiten):**
```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: i * 0.08 }}
```

---

## 7. Was NICHT geändert wird

- `src/App.tsx` — Route bereits vorhanden
- `src/components/landing/Navbar.tsx` — Link bereits vorhanden
- Alle anderen Seiten, Komponenten und Konfigurationsdateien

---

## 8. Verifikation

```bash
npm run build  # muss fehlerfrei durchlaufen
```

Manuelle Checks:
- `localhost:8080/loesungen/lieferservice-gruenden` zeigt alle 6 Sektionen
- Produktlink-Chips in Schritt 4 navigieren zu den richtigen URLs
- FAQ-Akkordeon öffnet und schließt korrekt (jeweils nur eines offen)
- Vergleichstabelle scrollt horizontal auf Mobile (< 768px)
- `document.title` gesetzt korrekt
- JSON-LD via Browser DevTools → `document.querySelectorAll('script[type="application/ld+json"]')` → 2 Scripts vorhanden

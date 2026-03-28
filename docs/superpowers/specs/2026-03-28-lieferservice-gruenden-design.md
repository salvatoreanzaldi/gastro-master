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

## 2. Seitenstruktur (7 Sektionen)

```
Navbar
S1: Hero
S2: Marktstatistiken (4 Stat-Cards)
S3: Schritt-für-Schritt Gründungsanleitung (4 Schritte)
S4: Vergleichstabelle (Eigenes System vs. Plattformen)
S5: FAQ (5 Fragen, JSON-LD)
S6: CTA-Abschluss
Footer
```

---

## 3. File-Aufbau (intern)

```typescript
// Imports: motion (framer-motion), lucide-react Icons, Navbar, Footer, Link (react-router-dom)

// META
const META_TITLE = "Lieferdienst gründen 2026 — Kompletter Leitfaden | Gastro Master"
const META_DESC  = "Eigenen Lieferdienst aufbauen ohne Lieferando. Schritt-für-Schritt: Gewerbeanmeldung, Kosten, Bestellsystem — 0 % Provision mit Gastro Master."

// JSON-LD
const SCHEMA_FAQ     // FAQPage Schema — 5 Einträge
const SCHEMA_ARTICLE // Article + HowTo Schema

// Daten-Arrays
const STATS[]        // 4 Marktdaten-Einträge mit Quellenlinks
const STEPS[]        // 4 Gründungsschritte
const COMPARE_ROWS[] // 8 Vergleichszeilen
const FAQ_ITEMS[]    // 5 FAQ-Einträge

// Component
export default function LieferserviceGruendenPage()
  useEffect → document.title, meta description
  return: JSON-LD scripts + Navbar + S1–S6 + Footer
```

---

## 4. Sektion-Details

### S1 — Hero
- **Hintergrund:** `bg-gradient-navy` (wie andere Produktseiten: `#061830 → #0A264A → #0D3266`)
- **Badge:** `"Ratgeber 2026 · Lieferdienst gründen"` (cyan)
- **H1:** `"Eigenen Lieferdienst gründen — der komplette Leitfaden für 2026"`
- **Subline:** `"Ohne Lieferando. Ohne 30 % Provision. Mit einem eigenen System, das dir gehört."`
- **GEO-Definitionsblock** (Cyan-Border-Left, `bg-white/5`):
  > *"Ein eigener Lieferdienst ermöglicht es Gründern, ohne hohe Fixkosten in den boomenden Food-Delivery-Markt einzusteigen — unabhängig von Plattformen wie Lieferando, Wolt oder Uber Eats. Statt 15–30 % Provision zu zahlen, behältst du 100 % deines Umsatzes."*
- **Breadcrumb:** Lösungen → Lieferdienst gründen
- **Primär-CTA:** `"Kostenlose Beratung anfragen →"` → `/kontakt`
- **Sekundär-Link:** `"Zur Anleitung ↓"` → Anchor `#steps`
- **Animation:** `motion.div` mit `initial={{ opacity:0, y:24 }}` + `animate`

### S2 — Marktstatistiken
- **Hintergrund:** `bg-white dark:bg-[#111111]`
- **Header:** `"Food Delivery Deutschland — Marktüberblick 2026"`
- **Grid:** 4 Cards (`md:grid-cols-4`, mobile `grid-cols-2`)
- **Cards:**
  | Value | Label | Quelle |
  |-------|-------|--------|
  | 6,1 Mrd. € | Online Food Delivery Umsatz D (2023) | [Statista](https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland) |
  | 9,9 Mrd. € | Prognostizierter Umsatz 2028 (+62 %) | [Statista](https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland) |
  | bis 30 % | Lieferando-Provision (mit Plattform-Fahrern) | [Berliner Abendblatt](https://berliner-abendblatt.de/berlin-news/lieferando-hoehere-provisionen-fuer-restaurants-id162852) |
  | 20–60 € | Kosten Gewerbeanmeldung Lieferdienst | [gewerbeanmeldung.de](https://www.gewerbeanmeldung.de/gewerbe-anmelden/lieferservice) |
- **Erste Card** navy-highlighted (visueller GEO-Anker)
- **Quellenlinks:** inline im Card-Footer, `target="_blank" rel="noopener noreferrer"`, kein `nofollow`
- **Animation:** `whileInView` staggered, `viewport={{ once: true }}`

### S3 — Schritt-für-Schritt Gründungsanleitung
- **Hintergrund:** `bg-[#0A264A]` (navy)
- **Badge:** `"Gründungsanleitung"` (cyan)
- **H2:** `"In 4 Schritten zum eigenen Lieferdienst"`
- **Grid:** 2×2 (`md:grid-cols-2`), mobile single-column
- **Schritte:**

  **Schritt 1 — Geschäftsmodell wählen**
  - Eigene Produktion / Ghost Kitchen / Vermittlung
  - Highlight-Box: *"Ghost Kitchens: 60–80 % niedrigere Mietkosten vs. klassisches Restaurant"*

  **Schritt 2 — Gewerbe anmelden & Recht**
  - HACCP-Schulung, Gesundheitszeugnis, Gewerbeanmeldung
  - Highlight-Box: *"Kosten: 20–60 €. Dauer: 1–2 Wochen."*

  **Schritt 3 — Spezialisierung vs. breites Angebot**
  - Nischenpositionierung-Argument
  - Highlight-Box: *"Empfehlung: 1 Kategorie, 8–12 Gerichte zum Start"*

  **Schritt 4 — Technik & Bestellsystem** (featured card, Cyan-Border)
  - Natürlicher Übergang zu Gastro Master
  - **Produktlink-Chips** (4 Stück):
    - `[Webshop (0 % Provision)]` → `/produkte/webshop`
    - `[Bestell-App]` → `/produkte/app`
    - `[Transaktionsumlage]` → `/produkte/transaktionsumlage`
    - `[Webseite]` → `/produkte/webseite`

### S4 — Vergleichstabelle
- **Hintergrund:** `bg-white dark:bg-[#111111]`
- **Badge:** `"Vergleich"` (amber)
- **H2:** `"Eigenes System vs. Plattform-Abhängigkeit"`
- **Tabellenspalten:** Kriterium / Gastro Master (navy-Header) / Lieferando·Wolt·Uber Eats (orange-Header)
- **8 Zeilen:**
  | Kriterium | Eigenes System | Plattform |
  |-----------|---------------|-----------|
  | Provision pro Bestellung | 0 % ✓ | 13–30 % ✗ |
  | Kundendaten gehören dir | ✓ | ✗ |
  | Eigenes Branding / eigene App | ✓ | ✗ |
  | Preisgestaltung frei | ✓ | Eingeschränkt |
  | Fixkosten / Monat | ab 49 €/Monat | % vom Umsatz |
  | Sichtbarkeit | Eigene SEO/Ads | ✓ Plattform |
  | Direktes Kundenfeedback | ✓ | Nur über Plattform |
  | Support & Onboarding | Persönlich (700+ Kunden) | Ticket-System |
- **Conversion-Box** unter Tabelle (navy-Gradient):
  > *"Bei 3.000 € Monatsumsatz zahlt Lieferando bis zu 900 € Provision — jeden Monat. Mit Gastro Master zahlst du 49 € — und behältst den Rest."*

### S5 — FAQ
- **Hintergrund:** `bg-[#f8fafc] dark:bg-[#0f172a]`
- **H2:** `"Häufige Fragen zum Thema Lieferdienst gründen"`
- **Accordion:** `useState` für open-Index, `AnimatePresence` für Expand/Collapse
- **5 Fragen** (GEO-optimiert — exakt so wie Nutzer an KI stellen):
  1. "Was kostet es, einen Lieferdienst zu gründen?"
  2. "Brauche ich ein Restaurant, um einen Lieferdienst zu starten?"
  3. "Wie viel Provision nimmt Lieferando?"
  4. "Lohnt sich ein eigener Lieferdienst 2026?"
  5. "Welche Genehmigungen brauche ich für einen Lieferdienst?"
- **JSON-LD** `FAQPage` Schema direkt im Component als `<script type="application/ld+json">`

### S6 — CTA-Abschluss
- **Hintergrund:** `bg-gradient-navy` (wie Hero)
- **H2:** `"Wir helfen dir, deinen Lieferdienst zu planen"`
- **Subline:** `"700+ Gastronomen haben mit Gastro Master ihre Plattformabhängigkeit beendet."`
- **CTA-Button:** `"Kostenloses Erstgespräch vereinbaren →"` → `/kontakt`
- **Trust-Row (4 Items):**
  - `0 €` Einrichtungskosten
  - `700+` aktive Kunden
  - `5,0 ★` Google Bewertung
  - `Persönlicher` Ansprechpartner

---

## 5. SEO / GEO-Strategie

### Meta-Tags
```
Title:       "Lieferdienst gründen 2026 — Kompletter Leitfaden | Gastro Master"
Description: "Eigenen Lieferdienst aufbauen ohne Lieferando. Schritt-für-Schritt:
              Gewerbeanmeldung, Kosten, Bestellsystem — 0 % Provision mit Gastro Master."
Canonical:   /loesungen/lieferservice-gruenden
```

### Primäre Keywords
- `Lieferdienst gründen`
- `Lieferservice gründen`

### Sekundäre Keywords
- `eigenen Lieferdienst aufbauen`
- `Lieferservice eröffnen Kosten`
- `Lieferdienst ohne Lieferando`
- `Food Delivery Gründung Deutschland`

### GEO-Techniken (Princeton-Methoden)
| Technik | Implementierung | Erwarteter Effekt |
|---------|----------------|-------------------|
| Statistiken mit Quellenlinks | 4 Stat-Cards mit Inline-Links | +37 % KI-Zitierrate |
| Definitionsblöcke | Hero + Schritt-Intros | +15 % Relevanz |
| Vergleichstabellen | S4 — 8-Zeilen-Tabelle | KI bevorzugt Tabellen |
| FAQ-Schema | JSON-LD FAQPage | Google Featured Snippets |
| Article-Schema | JSON-LD Article/HowTo | +25 % KI-Erwähnung |
| Quellenlinks extern | `rel="noopener"`, kein `nofollow` | Semantische Autorität |

### JSON-LD Schemas

**Schema 1 — FAQPage:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet es, einen Lieferdienst zu gründen?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
    // ... 4 weitere
  ]
}
```

**Schema 2 — Article (HowTo):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Eigenen Lieferdienst gründen — der komplette Leitfaden für 2026",
  "description": "...",
  "author": { "@type": "Organization", "name": "Gastro Master" },
  "publisher": { "@type": "Organization", "name": "Gastro Master" },
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-28"
}
```

---

## 6. Design-System

| Token | Wert |
|-------|------|
| Primärfarbe | `#0A264A` (navy) |
| Akzentfarbe | `hsl(196, 100%, 50%)` (cyan-brand) |
| Amber-Akzent | `#F59E0B` |
| Schrift | Outfit (bereits global geladen) |
| Border-Radius Cards | `rounded-2xl` (16px) |
| Section-Padding | `py-24 md:py-32`, `px-5 md:px-8 lg:px-16` |

**Animations-Pattern (konsistent mit Produktseiten):**
```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: i * 0.08 }}
```

---

## 7. Abgrenzung / Was NICHT geändert wird

- `src/App.tsx` — Route bereits vorhanden
- `src/components/landing/Navbar.tsx` — Link bereits vorhanden
- Alle anderen Seiten und Komponenten bleiben unberührt

---

## 8. Verifikation

```bash
npm run build  # muss fehlerfrei sein
```

- `localhost:8080/loesungen/lieferservice-gruenden` zeigt die vollständige Seite
- Alle 6 Sektionen sichtbar
- Produktlink-Chips in Schritt 4 navigieren korrekt
- FAQ-Accordion öffnet/schließt
- Vergleichstabelle rendert korrekt auf Mobile (overflow-x-auto)
- JSON-LD via Google Rich Results Test validierbar

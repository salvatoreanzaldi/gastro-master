# SEO & GEO Regeln — gastro-master.de

## Inhaltsverzeichnis
1. [SEO-Checkliste pro Seite](#seo-checkliste-pro-seite)
2. [GEO-Optimierung](#geo-optimierung)
3. [Schema-Markup Templates](#schema-markup-templates)
4. [Keyword-Integration](#keyword-integration)
5. [Technische SEO](#technische-seo)
6. [Linkbroker-Empfehlungen](#linkbroker-empfehlungen)

---

## SEO-Checkliste pro Seite

Prüfe JEDE Seite gegen diese Checkliste:

### Meta-Daten
- [ ] **Meta Title:** 50-60 Zeichen, Fokus-Keyword vorne, Markenname hinten
  - Format: `[Fokus-Keyword] — Gastro Master`
  - Beispiel: `Kassensystem Gastronomie mit TSE — Gastro Master`
- [ ] **Meta Description:** 140-160 Zeichen, Keyword + Nutzenversprechen + CTA
  - Beispiel: `Kassensystem mit integrierter TSE für dein Restaurant. Gesetzeskonform, einfach bedienbar. Jetzt kostenlos beraten lassen.`
- [ ] **Canonical URL:** Gesetzt und korrekt (keine Duplikate)
- [ ] **Open Graph Tags:** Titel, Beschreibung, Bild für Social Sharing

### Heading-Hierarchie
- [ ] **H1:** Genau 1x pro Seite, enthält Fokus-Keyword
- [ ] **H2:** Unterabschnitte, enthalten Secondary Keywords
- [ ] **H3:** Detailpunkte, enthalten Longtail-Keywords
- [ ] Keine Sprünge (z.B. H1→H3 ohne H2)
- [ ] Keine Links in Überschriften

### Content-Qualität
- [ ] **Fokus-Keyword** erscheint in: H1, erster Absatz, mindestens 1x H2, Meta Title
- [ ] **Keyword-Dichte:** 1-2% (nicht übertreiben, natürlich einbauen)
- [ ] **Textlänge:** Produktseiten 800-1500 Wörter, Ratgeber 1500-3000 Wörter
- [ ] **Fließtext:** Keine reinen Aufzählungen, natürliche Sprache
- [ ] **Sprachprofil C:** Du-Ansprache, B1-B2, 10-20 Wörter pro Satz

### Bilder
- [ ] **Alt-Text:** Beschreibend mit Keyword (z.B. `alt="Kassensystem Gastronomie mit TSE Gastro Master"`)
- [ ] **Dateiname:** keyword-basiert (z.B. `kassensystem-gastronomie.webp`)
- [ ] **Format:** WebP bevorzugt, Fallback JPEG
- [ ] **Lazy Loading:** Für Bilder below the fold

---

## GEO-Optimierung

GEO (Generative Engine Optimization) optimiert für AI-Suchmaschinen wie ChatGPT, Perplexity und Google AI Overviews.

### Die 5 GEO-Taktiken

#### 1. Quellenangaben (+40% AI-Sichtbarkeit)
Jede Behauptung mit Zahlen braucht eine Quellenzeile:
```html
<p class="source" style="font-size: 12px; color: #94A3B8; font-style: italic; margin-top: 8px;">
  Quelle: Statista, Online Food Delivery Outlook Deutschland 2025
</p>
```
**Akzeptierte Quellen:** Statista, DEHOGA, BMF, Statistisches Bundesamt, KassenSichV, Abgabenordnung, Branchenstudien mit Jahresangabe.

#### 2. Definitionsblöcke (Featured Snippet / AI-Zitat)
Fachbegriffe als eigenständigen Block formatieren:
```html
<div class="definition-block">
  <strong>Was ist eine TSE?</strong>
  <p>Eine TSE (Technische Sicherheitseinrichtung) ist ein Sicherheitsmodul,
  das seit dem 1. Januar 2020 in jeder elektronischen Kasse in Deutschland
  Pflicht ist. Sie protokolliert jede Transaktion manipulationssicher gemäß
  der Kassensicherungsverordnung (KassenSichV).</p>
</div>
```
AI-Modelle erkennen dieses Muster und zitieren es häufig.

#### 3. FAQ-Schema mit strukturierten Antworten
FAQ-Fragen die echte Nutzer-Prompts spiegeln:
- Schlecht: „Was bietet Gastro Master?"
- Gut: „Was kostet ein Kassensystem für Restaurants 2026?"
- Gut: „Wie gründe ich einen eigenen Lieferdienst ohne Lieferando?"

#### 4. Statistik-Integration
Konkrete Zahlen mit Jahreszahl einbauen:
- „Der Online-Liefermarkt in Deutschland wird 2025 auf 18,75 Mrd. € geschätzt (Statista)"
- „59 % der Gastronomen wollen laut DEHOGA in Digitalisierung investieren"
- „Bußgelder bis 25.000 € bei Verstößen gegen die KassenSichV"

#### 5. Vergleichstabellen
AI-Suchmaschinen lieben strukturierte Vergleiche:
```html
<table>
  <tr><th>Kriterium</th><th>Eigener Webshop</th><th>Lieferando</th></tr>
  <tr><td>Provision</td><td>0 %</td><td>14 % + 0,69 €</td></tr>
  <tr><td>Kundendaten</td><td>Gehören dir</td><td>Gehören Lieferando</td></tr>
</table>
```

### Zitierfähigkeits-Check
Prüfe jede Antwort/jeden Absatz: Würde ChatGPT diesen Text als Quelle zitieren?

**Ja, wenn:**
- Konkrete Zahl + Quelle + Jahreszahl vorhanden
- Klare Definition eines Fachbegriffs
- Strukturierter Vergleich mit Fakten
- Schritt-für-Schritt-Anleitung

**Nein, wenn:**
- Vage Marketingaussage ohne Belege
- Nur Meinung ohne Daten
- Zu kurz (<50 Wörter) für eigenständiges Zitat

---

## Schema-Markup Templates

### FAQPage (für /faq und FAQ-Abschnitte)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Die Frage hier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Antwort hier."
      }
    }
  ]
}
```

### BreadcrumbList (für jede Seite)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://gastro-master.de/" },
    { "@type": "ListItem", "position": 2, "name": "Produkte", "item": "https://gastro-master.de/produkte/" },
    { "@type": "ListItem", "position": 3, "name": "Kassensystem", "item": "https://gastro-master.de/produkte/kassensystem/" }
  ]
}
```

### Organization (Startseite)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Gastro Master",
  "url": "https://gastro-master.de",
  "logo": "https://gastro-master.de/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-6081-9128913",
    "contactType": "customer service",
    "email": "info@gastro-master.de",
    "availableLanguage": "German"
  },
  "sameAs": []
}
```

### HowTo (für Anleitungen)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Eigenen Lieferdienst gründen — Schritt für Schritt",
  "step": [
    { "@type": "HowToStep", "name": "Schritt 1", "text": "..." },
    { "@type": "HowToStep", "name": "Schritt 2", "text": "..." }
  ]
}
```

### DefinedTerm (für Fachbegriffe)
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "TSE",
  "description": "Technische Sicherheitseinrichtung — Pflichtmodul für elektronische Kassen in Deutschland seit 2020",
  "inDefinedTermSet": "Gastronomie-Fachbegriffe"
}
```

---

## Keyword-Integration

### Primäre Platzierung (Pflicht)
1. **Meta Title** — Fokus-Keyword möglichst weit vorne
2. **H1** — Fokus-Keyword natürlich eingebaut
3. **Erster Absatz** — Fokus-Keyword in den ersten 100 Wörtern
4. **URL** — Fokus-Keyword im Pfad (schon von Linkbroker festgelegt)

### Sekundäre Platzierung (empfohlen)
5. **Mindestens 1x H2** — Secondary Keyword
6. **Alt-Text eines Bildes** — Fokus- oder Longtail-Keyword
7. **Interner Link Anchor-Text** — Keyword-Variante (von anderer Seite kommend)
8. **Meta Description** — Fokus-Keyword + CTA

### Longtail-Integration
Die Longtail-Keywords aus den Keyword-Clustern (siehe `site-architecture.md`) in den Fließtext einbauen — NATÜRLICH, nicht gestopft. Jedes Longtail-Keyword sollte 1x im Text vorkommen.

---

## Technische SEO

### URL-Regeln (Linkbroker)
- Kleinbuchstaben, Bindestriche statt Unterstriche
- Keyword im URL-Pfad
- Keine Parameter, keine Session-IDs
- Trailing Slash konsistent (entweder immer oder nie)
- Max 3 Ebenen tief (z.B. /produkte/kassensystem/)

### Ladezeit
- Bilder komprimiert (WebP, max 200KB)
- CSS/JS minifiziert
- Lazy Loading für Bilder und Akkordeon-Inhalte
- Kritisches CSS inline

### Mobile
- Responsive Design (Mobile First)
- Touch-Targets mindestens 48x48px
- Kein horizontales Scrollen
- Akkordeon-Fragen gut tappbar

### Crawling
- robots.txt erlaubt /produkte/, /loesungen/, /wissen/, /faq, /vergleiche/
- XML Sitemap aktuell
- Canonical URLs gesetzt
- Keine noindex auf wichtigen Seiten

---

## Linkbroker-Empfehlungen (Zusammenfassung)

### Kritische Schwächen (aus Vor-Analyse)
1. **URL-Struktur ist teilweise unlogisch** — Seiten überschneiden sich thematisch
2. **Content zu allgemein** — spricht nicht gezielt Suchanfragen an
3. **Fehlende Trust-Elemente** — keine Testimonials, Success Stories, Kundenlogos
4. **FAQ zu allgemein** — nicht strategisch für SEO genutzt (wird bereits verbessert)
5. **Blog/Karriere nur im Footer** — sollten prominenter eingebunden werden

### Strategische Empfehlungen
1. **Thematische Cluster aufbauen** — nicht nur Funktionen auflisten, sondern nach Zielgruppen und Suchintentionen strukturieren
2. **/wissen/ Bereich aufbauen** — Ratgeber für informationale Suchanfragen, schafft Backlink-Potenzial
3. **/integrationen/ Bereich** — Uber Direct, Wolt, PayPal als eigene Seiten
4. **/vergleiche/ Bereich** — Order Smart, App Smart Vergleichsseiten
5. **Jede Seite muss klar beantworten:** Worum geht es? Für wen? Welches Problem wird gelöst?
6. **Regionale Vorbereitung** — URL-Struktur muss /stadtname/produkt ermöglichen

### Content-Priorität (Linkbroker)
1. 🔴 /loesungen/lieferservice-gruenden — höchstes Suchvolumen
2. 🔴 /produkte/bestellsystem — stärkste transaktionale Absicht
3. 🟡 /produkte/bestellapp — Individualisierung-Zielgruppe
4. 🟡 /produkte/kassensystem — TSE-Pflicht treibt Nachfrage
5. 🟡 /wissen/alternativen-zu-lieferando — starkes SEO-Potenzial
6. 🟢 /vergleiche/order-smart — Marken-Keywords abfangen

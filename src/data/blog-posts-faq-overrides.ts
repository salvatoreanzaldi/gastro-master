/**
 * Generate-sichere FAQ- + H2-Overrides für Blog-Posts (GSC-Fragen-Optimierung).
 *
 * Warum diese Datei existiert:
 *   Die H2-Blöcke + FAQ-Schemata aus Batch A/B lagen nur in blog-posts-generated.ts.
 *   Diese Datei wird von `npm run generate:blog-posts` überschrieben — der Generator
 *   baut die FAQPage aus einer „Häufige Fragen"-H3-Sektion des Markdowns (nicht aus
 *   den einzelnen SEO-H2s), daher gehen die erweiterten FAQ-Einträge dort verloren.
 *
 * Diese Datei ist HANDGEPFLEGT und generate-safe. Sie wird in blog-posts.ts in die
 * (regenerierten) Posts gemergt. Da Prerenderer, Client UND RSS alle blog-posts.ts
 * importieren, wirkt der Override auf allen Ebenen (raw-HTML-Head + Client-DOM).
 *
 * Merge-Regeln (siehe applyBlogOverride in blog-posts.ts):
 *   - faq:            wird in die FAQPage.mainEntity der post.jsonLd gemergt
 *                     (idempotent: Fragen die schon existieren werden übersprungen).
 *   - appendH2sToBody: hängt die faq-Paare als <h2>+<p> an post.bodyHtml an — für
 *                     Slugs, deren H2s in einem Quellformat liegen das der Generator
 *                     ignoriert (z. B. batch-02: H2s im .md, Generator liest .html).
 */
import type { FAQItem } from "./blog-posts-types";

export interface BlogPostOverride {
  faq?: FAQItem[];
  appendH2sToBody?: boolean;
  /** Überschreibt die (generierte) metaDescription des Posts — für Posts deren
   *  metaDescription im generierten File zu kurz/= Titel ist (Kategorie A). */
  metaDescription?: string;
  /** Überschreibt den Post-Titel — für Posts mit zu langem Titel-Tail (>105 Z.).
   *  Wirkt auf <title>, H1 und Schema-headline; Keyword-Kopf bleibt erhalten. */
  title?: string;
}

export const BLOG_POST_OVERRIDES: Record<string, BlogPostOverride> = {
  // Kategorie-A-Fixes: metaDescription im generierten File war = Titel (zu kurz).
  "cloud-pos-system-gastronomie": {
    metaDescription: "Cloud-POS für die Gastronomie 2026: Vorteile, Risiken und echte Kosten im Überblick. So findest du das richtige Kassensystem für dein Restaurant.",
  },
  "food-truck-starten-2026": {
    metaDescription: "Food Truck starten 2026: Businessplan, Genehmigungen, Standplatz und die ersten 100 Tage. Der komplette Praxis-Leitfaden für deinen erfolgreichen Start.",
  },
  "lieferzeiten-optimieren": {
    metaDescription: "Lieferzeiten im Restaurant optimieren: Routenplanung, Dispatch und Küchenprozesse. So verkürzt du die Lieferzeit und steigerst die Kundenzufriedenheit.",
  },
  "lokales-seo-restaurants": {
    metaDescription: "Lokales SEO für Restaurants 2026: So wirst du bei Google in deiner Stadt gefunden — Google-Profil, Bewertungen und Keywords Schritt für Schritt erklärt.",
  },
  // Batch 1: zu lange Descriptions (>220 Z.) auf ≤155 getrimmt.
  "bar-eroeffnen-konzession": {
    title: "Bar eröffnen 2026: Schritte, Kosten, Schankerlaubnis & Recht",
    metaDescription: "Bar eröffnen 2026: Schankerlaubnis, Startkapital, GEMA, Jugendschutz und Bundesländer-Vergleich — der vollständige Gründer-Guide für Cocktailbar, Kneipe und Weinbar.",
  },
  "pizza-lieferdienst-gruenden": {
    title: "Pizza-Lieferdienst gründen 2026: Businessplan & Technik",
    metaDescription: "Pizza-Lieferdienst gründen 2026: Dark Kitchen vs. Storefront, Baurecht, Fahrer und Startkapital — die 12-Schritte-Roadmap für deinen Lieferbetrieb.",
  },
  "kpis-gastronomie-kennzahlen": {
    metaDescription: "Die 10 wichtigsten KPIs in der Gastronomie 2026: Wareneinsatz, Personalquote, Durchschnittsbon und Food-Cost — inkl. Formeln, Benchmarks und Dashboard.",
  },
  "versicherungen-restaurant-betrieb": {
    metaDescription: "Welche Versicherungen ein Gastronomiebetrieb 2026 braucht: Pflicht vs. empfohlen, Prämienspannen und Checkliste für Restaurant, Café und Imbiss.",
  },

  // Rechtlich verifiziert an gesetze-im-internet.de (JArbSchG / JuSchG).
  "darf-man-mit-14-in-der-gastronomie-arbeiten": {
    title: "Darf man mit 14 in der Gastronomie arbeiten? (2026)",
    metaDescription: "Darf ein 14-Jähriger im Restaurant arbeiten? Klare Antworten für Gastronomen und Eltern: Was ab welchem Alter geht und was ein Verstoß kostet.",
    faq: [
      {
        question: "Darf man mit 14 kellnern?",
        answer: "Nein. Mit 14 gilt man als Kind (§ 2 JArbSchG) — Kinderbeschäftigung ist verboten (§ 5 Abs. 1). Max. 2 Stunden täglich nur leichte Arbeit (§ 5 Abs. 3 JArbSchG). Kellnern zählt nicht dazu. Bier/Wein erst ab 16, Spirituosen erst ab 18 (§ 9 JuSchG).",
      },
      {
        question: "Wie lange darf man mit 14 in der Gastronomie arbeiten?",
        answer: "Mit 14 gilt man als Kind (§ 2 JArbSchG). Die 8-Stunden-Regel (§ 8) gilt nur für Jugendliche ab 15. Für Kinder: max. 2 Stunden täglich, nur leichte Arbeit, nicht zwischen 18 und 8 Uhr, nicht während der Schulzeit (§ 5 Abs. 3). Reguläre Gastro-Arbeit ist nicht zulässig.",
      },
      {
        question: "Wie alt muss man sein, um in der Gastronomie zu arbeiten?",
        answer: "Regulär: mindestens 15 Jahre und nicht mehr vollzeitschulpflichtig (Jugendlicher, § 2 JArbSchG), bis 8h/Tag (§ 8). Mit 13–14 nur leichte Arbeit, max. 2h/Tag (§ 5). Im Gaststättengewerbe erst ab 16 bis 22 Uhr (§ 14 JArbSchG).",
      },
      {
        question: "Wie lange darf man mit 15 oder 16 in der Gastronomie arbeiten?",
        answer: "Ab 15 (nicht mehr vollzeitschulpflichtig) = Jugendlicher: max. 8h/Tag, 40h/Woche (§ 8 JArbSchG). Vollzeitschulpflichtiger 15-Jähriger = wie Kind (§ 2 Abs. 3). Abends bis 20 Uhr; im Gaststättengewerbe ab 16 bis 22 Uhr (§ 14 JArbSchG).",
      },
    ],
  },

  // H2s liegen in batch-02 nur im .md, Generator liest wordpress.html → hier anhängen.
  "lieferando-bestellung-stornieren": {
    metaDescription: "Lieferando-Bestellung als Restaurant stornieren: Schritt für Schritt im Backend, Folgen für Bewertungen und Ranking — plus Hebel zur Vermeidung.",
    appendH2sToBody: true,
    faq: [
      {
        question: "Kann man eine Lieferando-Bestellung stornieren?",
        answer: "Ja, aber nur solange das Restaurant die Bestellung noch nicht akzeptiert hat (meist 1–3 Minuten). Danach ist Stornierung nur noch über den Kundenservice möglich.",
      },
      {
        question: "Wie storniere ich eine Bestellung bei Lieferando?",
        answer: "App → Bestellungen → aktive Bestellung antippen → „Bestellung stornieren“. Falls die Option fehlt, sofort Lieferando-Chat oder Telefonsupport kontaktieren.",
      },
      {
        question: "Was tun, wenn die Lieferando-Bestellung nicht ankommt?",
        answer: "Lieferando-App → Bestellung → „Hilfe anfordern“. Bei bestätigter Nicht-Lieferung hast du Anspruch auf vollständige Rückerstattung oder eine neue Bestellung.",
      },
      {
        question: "Wie bekomme ich bei Lieferando mein Geld zurück?",
        answer: "App → Bestellung → „Bestellung melden“ → Problem beschreiben + Fotos → Rückerstattung beantragen. Lieferando erstattet in der Regel innerhalb von 3–5 Werktagen. Backup: PayPal-Käuferschutz.",
      },
    ],
  },

  "lieferando-portal-richtig-nutzen": {
    title: "Lieferando-Portal richtig nutzen: 6 Hebel für mehr Bestellungen",
    metaDescription: "Lieferando-Portal als Restaurant nutzen: 6 Hebel, die wirklich Bestellungen bringen, was Lieferando dir verschweigt und wann sich eine eigene Lösung lohnt.",
    faq: [
      {
        question: "Wie funktioniert Lieferando?",
        answer: "Kunden geben Standort ein, wählen ein Restaurant und bestellen online. Bezahlung digital beim Checkout. Das Restaurant erhält die Bestellung auf Tablet oder POS und liefert selbst — oder nutzt den Lieferando-Rider-Service.",
      },
      {
        question: "Wie funktioniert Lieferando für Restaurants?",
        answer: "Als Restaurant registrierst du dich im Partner-Portal. Du pflegst Menü, Preise und Öffnungszeiten. Bestellungen erscheinen in Echtzeit im System. Lieferando zieht täglich 13–30 % Provision ab.",
      },
      {
        question: "Wie bestellt man bei Lieferando?",
        answer: "Lieferando.de oder App: Standort → Restaurant → Gericht → Warenkorb → Zahlungsmethode → Bestellen. Bestätigungsmail kommt sofort; Lieferstatus in der App verfolgen.",
      },
      {
        question: "Was ist Lieferando?",
        answer: "Lieferando ist Deutschlands größtes Online-Bestell-Portal für Essen und Lebensmittel. Es gehört zu Just Eat Takeaway und ist in Deutschland, Österreich und der Schweiz aktiv.",
      },
    ],
  },

  "wolt-vs-lieferando": {
    title: "Wolt vs. Lieferando 2026: der ehrliche Vergleich",
    metaDescription: "Wolt vs. Lieferando 2026: Welche App ist besser für Kunden, welche Plattform lohnt sich für Restaurants? Provision, Reichweite und Service im Vergleich.",
    faq: [
      {
        question: "Was ist Wolt?",
        answer: "Wolt ist ein finnischer Online-Liefer- und Abholservice, gegründet 2014 in Helsinki. 2022 von DoorDash für 8,1 Mrd. Dollar übernommen. In Deutschland liefert Wolt Essen, Lebensmittel und Waren aus lokalen Restaurants und Partnerläden.",
      },
      {
        question: "Was ist Wolt+?",
        answer: "Wolt+ ist das Abo-Modell von Wolt (ca. 9,99 €/Monat). Mit Wolt+ erhältst du unbegrenzt kostenlose Lieferungen, Rabatte bei Partnerrestaurants und priorisierten Kundenservice.",
      },
      {
        question: "Wie funktioniert Wolt?",
        answer: "Kunde: App → Restaurant wählen → bestellen → online bezahlen → Wolt-Kurier liefert. Restaurant: Als Wolt-Partner anmelden, Menü einpflegen, ca. 15–30 % Provision pro Bestellung.",
      },
      {
        question: "Wer steckt hinter Wolt?",
        answer: "Wolt wurde 2014 von Miki Kuusi in Helsinki gegründet. 2022 übernahm DoorDash (USA) das Unternehmen für 8,1 Mrd. Dollar vollständig.",
      },
      {
        question: "Wolt oder Lieferando — was ist besser für Restaurants?",
        answer: "Lieferando dominiert mit mehr Kundenstamm und Bestellvolumen. Wolt bietet regional transparentere Provisionsmodelle. Beste Alternative für Restaurants: eigenes Bestellsystem ohne Provision — 100 % der Einnahmen behalten.",
      },
    ],
  },

  // Hub-Seite 13–17 (handgepflegt in blog-posts.ts). FAQ-Wortlaut = H3 im Artikel.
  // Rechtlich verifiziert an gesetze-im-internet.de (JArbSchG / JuSchG).
  "jugendarbeitsschutz-gastronomie": {
    metaDescription: "Ab wann darf man in der Gastronomie arbeiten? Klare Übersicht für 13 bis 17 Jahre: Arbeitszeiten, Verbote und Genehmigungen — was Gastronomen wissen.",
    faq: [
      {
        question: "Ab wann darf man in der Gastronomie arbeiten?",
        answer: "Regulär ab 15 Jahren, wenn die Vollzeitschulpflicht endet (Jugendlicher nach § 2 JArbSchG). Mit 13–14 nur leichte Tätigkeiten, max. 2h/Tag (§ 5 Abs. 3). Im Gaststättengewerbe erst ab 16 bis 22 Uhr (§ 14 JArbSchG).",
      },
      {
        question: "Darf man mit 15 in der Gastronomie arbeiten?",
        answer: "Kommt auf die Schulpflicht an. Wer noch vollzeitschulpflichtig ist, gilt als Kind (§ 2 Abs. 3 JArbSchG) — max. 2h/Tag leichte Arbeit. Wer nicht mehr schulpflichtig ist = Jugendlicher, bis 8h/Tag (§ 8), Ferienjobs erlaubt.",
      },
      {
        question: "Darf man mit 16 in der Gastronomie arbeiten?",
        answer: "Ja. Ab 16 = Jugendlicher (§ 2 JArbSchG): 8h/Tag, 40h/Woche (§ 8). Sonderregel Gastgewerbe: bis 22 Uhr (§ 14). Bier und Wein servieren erlaubt (§ 9 JuSchG), Spirituosen erst ab 18.",
      },
      {
        question: "Wie lange darf man mit 16 in der Gastronomie arbeiten?",
        answer: "Maximal 8 Stunden täglich, 40 Stunden wöchentlich (§ 8 JArbSchG), 5-Tage-Woche. Im Gaststättengewerbe darf bis 22 Uhr gearbeitet werden (§ 14 JArbSchG) — in keiner anderen Branche gilt diese Ausnahme.",
      },
      {
        question: "Was ist der Unterschied zwischen Kind und Jugendlichem im JArbSchG?",
        answer: "Kind = unter 15 Jahre ODER vollzeitschulpflichtig (auch mit 15). Jugendlicher = 15–18 Jahre UND nicht mehr vollzeitschulpflichtig (§ 2 JArbSchG). Ein schulpflichtiger 15-Jähriger wird wie ein Kind behandelt (§ 2 Abs. 3).",
      },
      {
        question: "Brauche ich für Jugendliche eine Genehmigung?",
        answer: "Keine separate Genehmigung der Behörde, aber: schriftliche Elternerlaubnis, ärztliche Erstuntersuchung (§ 32 JArbSchG, Pflicht vor Arbeitsbeginn), schriftlicher Arbeitsvertrag und Aushang der JArbSchG-Vorschriften (§ 47).",
      },
    ],
  },
  "pachtkalkulation-restaurant-berechnen": {
    metaDescription: "Pachtkalkulation für Restaurants 2026: der 8–12 %-Korridor, Pacht-Obergrenze-Formel und Fix- vs. Umsatzpacht — mit Rechenbeispiel und Verhandlungs-FAQ.",
  },
  "food-trends-2026-deutschland": {
    metaDescription: "Food Trends 2026 in Deutschland: pflanzenbasiert, fermentiert, regional und alkoholfrei-premium — mit Daten und Leitfaden für Speisekarte und Marketing.",
  },
  "miete-pacht-gastronomie": {
    title: "Miete oder Pacht in der Gastronomie 2026: Der Unterschied",
    metaDescription: "Miete oder Pacht in der Gastronomie: § 535 vs. § 581 BGB, Betriebspflicht, Konkurrenzschutz und Umsatzpacht — Praxis-Leitfaden 2026 mit 6-Schritte-Prüfung.",
  },
  "whatsapp-marketing-gastronomie-automation": {
    metaDescription: "WhatsApp-Marketing für Restaurants 2026: Cloud API vs. Business App, Opt-in, Automation und die rechtlichen Spielregeln nach UWG und DSGVO. Praxis-Guide.",
  },
  "eigene-app-erstellen-restaurant": {
    metaDescription: "Eigene App fürs Restaurant: Build vs. Buy, realistische Kosten und der 6-Wochen-Plan zum Launch im App- und Play-Store. Praxis-Guide aus vielen Beratungen.",
  },
  "personal-finden-gastronomie-2026": {
    metaDescription: "Personal finden in der Gastronomie 2026: Recruiting-Kanäle, AGG-konforme Stellenanzeigen und DSGVO-Bewerbungs-Workflows — mit Primärquellen und Tipps.",
  },
  "google-my-business-restaurant-optimieren": {
    metaDescription: "Google Unternehmensprofil für Restaurants 2026 optimieren: Local-Pack-Ranking, Bewertungen, Bestellbutton und Posts — die Schritt-für-Schritt-Anleitung.",
  },
  "fachkraeftemangel-gastronomie-loesungen": {
    metaDescription: "Fachkräftemangel in der Gastronomie 2026: 10 Lösungen von Chancenkarte und Blauer Karte EU bis Automatisierung — mit aktuellen Zahlen und Rechtsstand.",
  },
  "liquiditaet-gastronomie-sichern": {
    metaDescription: "Liquidität in der Gastronomie 2026 sichern: 13-Wochen-Plan, Vorkasse, Factoring, KfW-StartGeld und Steuerstundung — mit Primärquellen von Destatis und KfW.",
  },
  "google-unternehmensprofil-login": {
    metaDescription: "Google Unternehmensprofil-Login 2026: So kommst du auch ohne Dashboard über Search und Maps rein — plus 2FA-Probleme, Verifizierung und Inhaberwechsel.",
  },
  "reservierungssystem-restaurant-vergleich": {
    metaDescription: "Reservierungssystem-Vergleich 2026: Plattform vs. Eigenlösung, DSGVO bei Gästedaten, rechtssichere No-Show-Policy und POS-Integration für Restaurants.",
  },
  "gastronomie-trends-2026": {
    metaDescription: "Gastronomie-Trends 2026: DEHOGA-Daten, KI-Tools, Personalmangel und Loyalty 3.0 — die sechs Branchen-Trends für Restaurants mit Priorisierungs-Framework.",
  },
  "mitarbeiterbindung-gastro-fluktuation": {
    metaDescription: "Mitarbeiterbindung in der Gastronomie 2026: 7 erprobte Strategien gegen Fluktuation — inklusive Fluktuationskosten, 50-Euro-Grenze und Schichtplanung.",
  },
  "mehrwertsteuer-gastronomie-2026": {
    metaDescription: "Mehrwertsteuer Gastronomie 2026: Wann gilt 7 %, wann 19 %? Speisen, Getränke & Lieferung — korrekte Kalkulation, Kassensystem-Setup und alle neuen Regeln.",
    // FAQPage existiert bereits (7 Fragen im meta.json-Schema). #1/#4 des Briefs sind
    // Dubletten (7%/19%-Frage + Preisanpassung schon da) → nur die 2 fehlenden ergänzt.
    faq: [
      {
        question: "Welche Steuersenkung gibt es für die Gastronomie ab 2026?",
        answer: "Das Steueränderungsgesetz 2025 senkt den Mehrwertsteuersatz für Speisen dauerhaft von 19 % auf 7 % ab dem 01.01.2026. Rechtsgrundlage: BGBl 2025 I Nr. 363.",
      },
      {
        question: "Was ändert sich 2026 für Gastronomen bei der Mehrwertsteuer?",
        answer: "Die Unterscheidung „im Haus 19 % / außer Haus 7 %“ für Speisen entfällt. Alle Speisen werden mit 7 % besteuert. Getränke bleiben 19 %.",
      },
    ],
  },
  "azubi-finden-gastronomie": {
    metaDescription: "Azubi-Recruiting in der Gastronomie 2026: BBiG- und JArbSchG-Compliance, IHK-Lehrstellenbörse, Social Media und Praktika — plus DSGVO-Bewerbungs-Workflows.",
  },
  "wareneinsatz-berechnen-gastronomie": {
    metaDescription: "Wareneinsatz in der Gastronomie berechnen: Branchen-Benchmarks 2026, Soll-Ist-Abweichung aufdecken und mit digitaler Warenwirtschaft Marge gewinnen.",
  },
  "datenschutz-restaurant-dsgvo-2026": {
    metaDescription: "DSGVO im Restaurant 2026: Pflichten nach Art. 5, 6, 13 und 32, Cookie-Banner, AVV und Bußgeld-Risiken — inklusive Checkliste für Gastronomen.",
  },
  "umsatzsteigerung-gastronomie": {
    metaDescription: "Umsatzsteigerung in der Gastronomie 2026: 12 erprobte Hebel von Upselling über Menu Engineering bis Online-Bestellung — mit Priorisierungs-Framework.",
  },
  "jugendschutz-alkoholauschank": {
    metaDescription: "Jugendschutzgesetz für die Gastronomie: Altersgrenzen für Bier, Wein und Spirituosen, Aushangpflicht und Bußgelder — mit Checkliste 2026 (§§ 3, 9, 10).",
  },
  "kassensicherungsverordnung-2026-tse": {
    title: "KassenSichV & TSE 2026: Der Compliance-Guide",
    metaDescription: "KassenSichV 2026 für Gastronomen: TSE-Pflicht, Belegausgabe, Meldung via ELSTER und Bußgelder bis 25.000 € — mit Compliance-Checkliste und Primärquellen.",
  },
  "restaurant-preise-erhoehen-2026": {
    metaDescription: "Preise erhöhen im Restaurant 2026: Kalkulations-Trigger, Preispsychologie und ein 5-Schritte-Workflow zur Gäste-Kommunikation — mit Destatis-Daten.",
  },
  "lustige-werbesprueche-gastronomie": {
    metaDescription: "Lustige Werbesprüche für die Gastronomie: 40+ eigene Slogans mit Wortspielen und saisonalem Witz — plus Theorie zu Wirkung, Markenrecht und A/B-Test.",
  },
  "experience-dining-2026": {
    metaDescription: "8 Experience-Dining-Konzepte 2026: Omakase, Chef's Table, Dinner-in-the-Dark und Supper Club — mit Preispositionierung und 7-Schritte-Einstieg.",
  },
  "buchhaltung-gastronomie-grundlagen": {
    metaDescription: "Buchhaltung in der Gastronomie 2026: GoBD-Pflichten, Kassenbuch nach § 146 AO, DSFinV-K und DATEV-Export — plus die 10 häufigsten Fehler.",
  },
  "saisonales-menu-management": {
    metaDescription: "Saisonkarte in der Gastronomie 2026: Saison-Kalender, Wareneinsatz 28–35 %, LMIV bei Karten-Rotation und digitale Menükarte — mit 7-Schritte-Workflow.",
  },
  "wolt-fahrer-arbeitsbedingungen": {
    title: "Wolt-Fahrer: Arbeitsbedingungen & Verdienst 2026",
    metaDescription: "Wolt-Fahrer Arbeitsbedingungen 2026: Was Kuriere wirklich verdienen, welche Risiken sie tragen und was die EU-Plattform-Richtlinie ändert. Ehrlicher Check.",
  },
  "lieferando-geld-zurueckfordern": {
    title: "Lieferando-Geld zurückfordern: 3 Wege (2026)",
    metaDescription: "Bestellung nicht angekommen oder falsch geliefert? So bekommst du dein Geld bei Lieferando zurück — 3 Wege, Schritt für Schritt, plus Hilfe beim Support.",
  },
  "cafe-gruenden": {
    title: "Café gründen 2026: Schritt-für-Schritt-Guide",
    metaDescription: "Café gründen 2026: der komplette Guide zu Recht, Kosten von 30.000–150.000 €, Businessplan und Finanzierung — mit 12-Schritte-Roadmap und Primärquellen.",
  },
  "hygieneschulung-personal-gastronomie": {
    title: "Hygieneschulung Gastronomie: IfSG, LMHV & HACCP",
    metaDescription: "Hygieneschulung in der Gastronomie: IfSG-Erstbelehrung, Folgebelehrung alle 2 Jahre, LMHV jährlich und HACCP für Verantwortliche — sauber aufgestellt.",
  },
  "negative-bewertungen-krisenkommunikation": {
    metaDescription: "Negative Google-Bewertungen rechtssicher beantworten: 5-Schritte-Playbook, DSGVO-Regeln und Krisen-Templates für Restaurants — mit juristischem Überblick.",
  },
  "paypal-beim-essen-bestellen-restaurant-vorteile": {
    metaDescription: "PayPal beim Essen-Bestellen: Welche Vorteile Kunden und Restaurants haben, was es kostet und wie es sich zu Klarna und Direktzahlung verhält.",
  },
  "restaurant-website-verbessern-seo": {
    metaDescription: "Was Google nach dem Core-Update 2026 bewertet: Core Web Vitals, E-E-A-T und Schema.org für Restaurant-Websites — inklusive 6-Wochen-Checkliste.",
  },
  "systemgastronomie-beispiele": {
    metaDescription: "Systemgastronomie-Beispiele 2026: McDonald's, Vapiano, dean&david und L'Osteria — klare Abgrenzung System vs. Franchise und was Einzelgastronomen lernen.",
  },
  "bnpl-im-lieferdienst-vergleich": {
    metaDescription: "Welcher BNPL-Anbieter lohnt sich fürs Restaurant? Klarna, PayPal Pay Later, Riverty und easyCredit im ehrlichen Vergleich — Kosten, Conversion, Empfehlung.",
  },
  "instagram-tiktok-marketing-restaurant": {
    metaDescription: "Wie Restaurants 2026 Instagram und TikTok strategisch nutzen — DSA-konform, mit Geo-Reichweite, Mikro-Influencern und Conversion-Pfad vom Reel zum Tisch.",
  },
  "lieferanten-gastronomie-auswaehlen": {
    metaDescription: "Lieferantenauswahl in der Gastronomie 2026: 8 Kriterien, 7-Schritte-Workflow, Multi-Sourcing und § 377 HGB — rechtssicher und praxistauglich.",
  },
  "restaurant-namen-markenrechtlich-pruefen": {
    metaDescription: "Restaurant-Namen markenrechtlich prüfen: DPMAregister und EUIPO Schritt für Schritt, Klasse 43, Gebühren 2026 und Schutzhindernisse — mit Checkliste.",
  },
  "lieferdienst-marge-optimieren": {
    metaDescription: "Lieferdienst-Marge optimieren: Plattform-Provision senken, Routen und Verpackung optimieren, Up-Selling — mit Vorher/Nachher-Rechnung und Checkliste.",
  },
  "restaurant-marketing-strategien-2026": {
    metaDescription: "Restaurant-Marketing 2026: Google, Social Media, E-Mail, lokales SEO und Loyalty — wie du dein Budget richtig verteilst, mit 90-Tage-Sprint und Tabelle.",
  },
  "vegane-menues-entwickeln": {
    metaDescription: "Vegane Karte einführen: Rezept-Bausteine, LMIV-Allergenkennzeichnung, HCVO-Grenzen, V-Label und Menu-Engineering — 7-Schritte-Roadmap für Restaurants.",
  },
  "werbeslogans-fuer-restaurants": {
    metaDescription: "Über 50 eigene Slogan-Beispiele für Restaurants in 5 Kategorien — klassisch, lokal, familienfreundlich, regional und trendy — plus Markenrecht-Grundlagen.",
  },
  "lieferando-bestellung-storniert-restaurant-perspektive": {
    metaDescription: "Lieferando-Bestellung storniert — was tun? Wie Restaurants reagieren, was es kostet und wie man Stornierungen reduziert. Praxis-Guide für 2026.",
  },
  "lieferando-bewertung-loeschen-antworten": {
    metaDescription: "Lieferando-Bewertung löschen oder professionell antworten? 4 Wege gegen unfaire Bewertungen, wann Lieferando wirklich löscht und wie du richtig reagierst.",
    // Antwortfunktion-Frage fehlt im generierten FAQPage (kein passender H3-Plain-Absatz)
    // → generate-safe ergänzt. Keine Dublette zu den 6 bestehenden Fragen.
    faq: [
      {
        question: "Kann ich auf eine Lieferando-Bewertung öffentlich antworten?",
        answer: "Ja. Seit 2024 können Restaurantpartner im Lieferando-Partner-Portal direkt auf Kundenbewertungen antworten. Die Antwort ist öffentlich sichtbar und erscheint unter der Bewertung.",
      },
    ],
  },
  "nachhaltiges-cafe": {
    title: "Nachhaltiges Café 2026: Zero-Waste & Mehrweg-Pflicht",
    metaDescription: "Nachhaltiges Café gründen 2026: VerpackG § 33, Zertifikate wie EU-Bio und Fairtrade, Mehrweg-Systeme und UWG-sichere Greenwashing-Vermeidung.",
  },
  "tischmanagement-auslastung-optimieren": {
    metaDescription: "Tischmanagement im Restaurant optimieren: Covers-KPI, Turnover-Benchmarks, Tisch-Mix und digitales Table Management — mit 8-Schritte-Workflow 2026.",
  },
  "google-bewertungen-restaurant-strategie": {
    metaDescription: "Wie Restaurants 2026 legal mehr Google-Bewertungen gewinnen — UWG- und Google-konform. Mit 6-Monats-Plan, Anti-Pattern-Liste und Melde-Workflow.",
  },
  "ki-restaurant-management-2026": {
    metaDescription: "KI im Restaurant-Management 2026: 8 Use-Cases von Menü und Forecasting über Personal bis Food-Waste — mit EU-AI-Act- und DSGVO-Leitplanken.",
  },
  "automatisierung-gastronomie": {
    metaDescription: "Automatisierung in der Gastronomie 2026: Wo sich Self-Order-Kiosks lohnen und Küchenroboter meist nicht — mit ROI-Rechnungen und 5-Schritte-Roadmap.",
  },
  "fleischpreis-kalkulation-restaurant": {
    title: "Fleischpreis-Kalkulation im Restaurant 2026",
    metaDescription: "Fleischkalkulation im Restaurant 2026: Preisentwicklung, Cut-Strategie, Schlachtverluste und Portionsgrößen — mit Speisekarten-Rotation und Reporting.",
  },
  "lieferando-partner-werden-vor-und-nachteile": {
    title: "Lieferando-Partner werden: Vor- und Nachteile 2026",
    metaDescription: "Lieferando-Partner werden: Was es kostet, was es bringt — Vor- und Nachteile aus Restaurant-Sicht, die Zahlen-Realität und die Hybrid-Alternative für 2026.",
    // Provisions-Frage steht als H3 in der Quelle, wird aber vom Generator nicht ins
    // FAQPage-Schema gezogen (quotable-Blockquote statt Plain-Absatz) → hier generate-safe ergänzt.
    faq: [
      {
        question: "Wie hoch ist die Provision bei Lieferando wirklich?",
        answer: "13–30 % vom Bestellwert je nach Modell: Marketplace (eigene Fahrer) ca. 13 %, Logistics (Lieferando-Fahrer) ca. 25–30 %. Verhandlungsspielraum bei kleinen Restaurants kaum vorhanden.",
      },
    ],
  },
  "speisekarte-kalkulieren-food-cost": {
    metaDescription: "Speisekarte kalkulieren 2026: Food-Cost-Quote, Aufschlagsfaktor und Menu Engineering — so wird deine Karte rentabel, mit Formel und 5-Schritte-Workflow.",
  },
  "wie-viele-pizzen-verkauft-pizzeria-pro-tag": {
    metaDescription: "Wie viele Pizzen verkauft eine Pizzeria pro Tag? Realistische Zahlen je Größe, ein Spitzenzeiten-Vergleich und 5 Hebel für mehr Volumen.",
  },
  "zukunft-essenslieferungen-2026": {
    metaDescription: "Wohin entwickelt sich die Essenslieferung bis 2030? Quick Commerce, Ghost Kitchens, Robotik, KI und Direktbestellung — Daten, Prognosen und Action-Pfad.",
  },
  "marketing-budget-restaurant-planung": {
    metaDescription: "Wie viel Marketing-Budget braucht dein Restaurant 2026? DEHOGA-Benchmarks, idealer Kanal-Mix und CAC/LTV-Berechnung — mit Saisonplanung und Eurozahlen.",
  },
  "schichtplanung-gastronomie-digital": {
    metaDescription: "Schichtplanung in der Gastronomie 2026: ArbZG-Vorgaben, das BAG-Stechuhr-Urteil, Tool-Vergleich und POS-Integration — mit Checkliste für den Betrieb.",
  },
  "energiekosten-gastronomie-senken": {
    metaDescription: "Energiekosten im Restaurant senken: 10 Maßnahmen mit Payback, DEHOGA Strom- und Gaspool und Förderungen 2026 — mit konkreten Benchmarks und ROI-Tabelle.",
  },
  "allergenkennzeichnung-speisekarte-lmiv": {
    metaDescription: "Allergenkennzeichnung in der Gastronomie 2026: die 14 LMIV-Allergene, Pflichten zur Karte, mündliche Auskunft und QR-Speisekarte — mit Checkliste.",
  },
  "lieferando-mindestbestellwert-richtig-setzen": {
    metaDescription: "Lieferando-Mindestbestellwert richtig setzen: die Marge-Formel, Branchen-Benchmarks und 3 häufige Fehler — so verdienst du 2026 mehr statt zu wenig.",
  },
  "restaurant-krisenmanagement-playbook": {
    title: "Krisenmanagement in der Gastronomie 2026: Das Playbook",
    metaDescription: "Krisenmanagement in der Gastronomie 2026: Playbook für operative, finanzielle und rechtliche Krisen — mit Krisen-Matrix, Frühwarn-KPIs und 14-Punkte-Check.",
  },
  "coworking-restaurant-trend": {
    title: "Coworking-Café 2026: Konzept, Fläche & Preismodelle",
    metaDescription: "Coworking-Café planen: 3 Geschäftsmodelle, Flächen- und Akustik-Konzept, WLAN-Recht und Umsatzsteuer 7/19 % — mit ehrlichen Scheiter-Mustern.",
  },
  "essen-bestellen-mit-klarna": {
    metaDescription: "Essen bestellen mit Klarna: Welche Lieferdienste es akzeptieren, wie die 3 Bezahl-Optionen funktionieren und was Klarna Restaurants und Kunden kostet.",
  },
  "gastro-master-app-erklaerung": {
    metaDescription: "Die Gastro-Master-App im Überblick: Was eine moderne Restaurant-App 2026 leisten muss, welche Funktionen üblich sind und was der ROI ist.",
  },
  "email-marketing-restaurant-loyalty": {
    metaDescription: "Rechtssicheres E-Mail-Marketing für Restaurants 2026: Double-Opt-in, Koppelungsverbot, UWG-Bestandskundenausnahme und DSGVO-konforme Loyalty-Programme.",
  },
  "online-bestellsystem-restaurant-2026": {
    // „Gastronomie" ergänzt (Keyword fehlte in der gerenderten Description).
    metaDescription: "Online-Bestellsystem für Restaurants & Gastronomie 2026: Kosten, Anbieter, Lieferando-Alternativen und 4-Wochen-Plan. Mit Modellrechnung.",
    // FAQPage existiert (10 Fragen, auto-extrahiert). #3/#4 des Briefs sind Dubletten
    // (Kosten + Lohnt-sich-vs-Lieferando schon da) → nur die 2 neuen ergänzt.
    faq: [
      {
        question: "Was ist ein Bestellsystem für die Gastronomie?",
        answer: "Ein Bestellsystem für die Gastronomie ermöglicht Gästen, Speisen und Getränke digital zu bestellen — entweder online (Webshop, App) oder am Tisch (QR-Code). Im Unterschied zu Plattformen wie Lieferando zahlt der Gastronom eine monatliche Fixgebühr statt 13–30 % Provision pro Bestellung.",
      },
      {
        question: "Welches Online-Bestellsystem ist das beste für Restaurants 2026?",
        answer: "Das hängt vom Bestellvolumen ab. Ab ca. 30–60 Direktbestellungen pro Woche lohnt ein eigenes System (Gastro Master, Orderiom, orderio) gegenüber Lieferando rechnerisch. Wichtig: DSGVO-Konformität, TSE-Anbindung und Kassensystem-Integration prüfen.",
      },
    ],
  },
  "speisekarte-mit-bildern-erstellen": {
    title: "Speisekarte mit Bildern erstellen: 5 Regeln für mehr Umsatz",
    metaDescription: "Speisekarte mit Bildern erstellen: Welche Fotos wirklich verkaufen, was sie kosten und wie du sie in deine Online-Bestellseite einbindest.",
  },
  "wein-kalkulation-restaurant": {
    title: "Weinkalkulation im Restaurant: Aufschlag & Deckungsbeitrag",
    metaDescription: "Weinkalkulation im Restaurant: Aufschlagsfaktor vs. Deckungsbeitrag-Methode, WE-Quote 25–33 %, Glasweinausschank und PAngV-konforme Preisauszeichnung.",
  },
  "inventar-management-lieferservice": {
    metaDescription: "Wie Lieferdienste Inventar in Echtzeit managen: Live-Stocks, FIFO, Forecast, Multi-Standort und ROI — mit BMEL-Daten zur Lebensmittelverschwendung.",
  },
  "pizzeria-auf-lieferdienst-umstellen": {
    metaDescription: "Pizzeria auf Lieferdienst umstellen 2026: 8–12-Wochen-Plan, Liefergebiet, Verpackung, Hybrid-Bestellmodell, Fahrer-Logistik und ROI-Rechnung.",
  },
  "speiseeis-produktion-hygiene": {
    title: "Speiseeis-Gastronomie 2026: Betriebsformen & Hygiene",
    metaDescription: "Eisdiele, Manufaktur oder Eis-Truck: 5 Betriebsformen, EU-Hygiene 852/853, LMHV, HACCP, LMIV-Allergene, MwSt 7 % und Saison-Konzepte.",
  },
  "beste-bestell-apps-deutschland-2026": {
    metaDescription: "Welche Bestell-Apps lohnen sich 2026 in Deutschland? Lieferando, Wolt, Uber Eats und eigene Restaurant-Apps im ehrlichen Vergleich.",
  },
  "catering-b2b-mittagstisch": {
    metaDescription: "Catering B2B 2026: 7 % oder 19 % MwSt? BFH XI R 3/13, DIN 10508, LMIV Art. 44, Vertragsklauseln und B2B-Aufschlag 30–50 %. Der Leitfaden.",
  },
  // Slug-Rename 2026-07-29: alternativen-zu-lieferando-2026 → lieferando-alternative (Ziel-Keyword in URL, 301 via LEGACY_REDIRECT_STUBS). Content unverändert (D1).
  "lieferando-alternative": {
    title: "Lieferando Alternative für Restaurants 2026 — Provisions-Vergleich",
    metaDescription: "Lieferando nimmt bis zu 30% Provision. Wir zeigen dir die besten Alternativen für dein Restaurant und wie du dein eigenes Bestellsystem aufbaust.",
  },
  "kueche-planen-gastronomie": {
    metaDescription: "Gastro-Küche planen 2026: Zonen-Prinzip, 4 Layout-Typen, ASR/ArbStättV, VDI 2052, DIN EN 1825, Brandschutz und Invest-Orientierung pro m².",
  },
  "lieferando-provision-2026": {
    metaDescription: "Lieferando-Provision 2026 im Faktencheck: 13 % bei Eigenlieferung, bis 30 % bei Plattform-Lieferung, 2,5 % Servicegebühr. Offizielle Quellen.",
  },
  "lieferservice-shopsystem": {
    metaDescription: "Lieferservice-Shopsystem 2026 im Vergleich: Provisionen, Funktionen und ROI für Gastro Master, Lieferando, Wolt, Shopify und Resmio.",
  },
  "nachhaltige-gastronomie-2026": {
    metaDescription: "Nachhaltige Gastronomie 2026: Energie, Abfall, Einkauf, Zertifizierung und Kommunikation — 5 Säulen, VerpackG-konform und BGH-Katjes-sicher.",
  },
  "bestellsystem-fuer-kellner": {
    metaDescription: "Bestellsystem für Kellner 2026: Tablet, Handheld, Smartphone und Mobile-POS im Vergleich. Workflow, Kosten, ROI und 6-Wochen-Einführungsplan.",
  },
  "haccp-lebensmittelsicherheit-2026": {
    metaDescription: "HACCP in der Gastronomie 2026 praxisnah: 7 Grundsätze, Pflicht-Doku, Schulung nach LMHV, digitale Tools, Kontrollen und Bußgelder je Bundesland.",
  },
  "offene-kueche-restaurant": {
    metaDescription: "Offene Küche im Restaurant planen: 4 Konzept-Varianten, strengere Hygiene, Arbeitsschutz (DGUV, ASR, VDI 2052), Kostendelta 20–40 % und Workflow.",
  },
  "witzige-restaurant-namen": {
    title: "Witzige Restaurant-Namen: 80+ Ideen, die funktionieren",
    metaDescription: "80+ witzige Restaurant-Namen für Pizzerien, Cafés, Bars und mehr — plus 5 Namens-Strategien, die funktionieren, und worauf du rechtlich achtest.",
  },
  "restaurant-app-entwickeln-kosten": {
    title: "Eigene Restaurant-App entwickeln 2026: Was sie wirklich kostet",
  },
  "chef-table-event-dining": {
    title: "Chef's Table & Event-Dining 2026: Konzept & Preise",
  },
  "franchise-gastronomie-2026": {
    title: "Franchise in der Gastronomie 2026: Recht, Gebühren & Margen",
  },
  "regionale-lebensmittelbeschaffung": {
    title: "Regionale Lebensmittelbeschaffung 2026: Lieferketten & Recht",
  },
  "ghost-kitchen-gruenden-deutschland": {
    title: "Ghost Kitchen gründen in Deutschland 2026: Der Guide",
  },
  "nachhaltige-verpackung-restaurant": {
    title: "Nachhaltige Verpackung im Restaurant 2026: Mehrwegpflicht",
  },
  "restaurant-eroeffnen-2026": {
    title: "Restaurant eröffnen 2026: Recht, Kosten & Genehmigungen",
  },
  "ferienjob-gastronomie-rechtliche-grundlagen-2026": {
    title: "Ferienjob in der Gastronomie 2026: Rechtliche Grundlagen",
  },
  "uber-eats-kuendigen": {
    metaDescription: "Uber One kündigen: Was kaum jemand weiß — damit endet auch dein Rabatt auf Uber-Fahrten. Schritt für Schritt für iOS, Android und als Restaurant-Partner.",
  },
  "lieferando-restaurant-kuendigen": {
    metaDescription: "Lieferando kündigen als Restaurant: Die Kündigungsadresse, die kaum jemand kennt — inkl. fertiger Vorlage und was danach mit deinen Bewertungen passiert.",
  },
  "wolt-kuendigen": {
    metaDescription: "Wolt kündigen: Der Kündigen-Button ist absichtlich versteckt. 3 Wege — Abo beenden, Account löschen oder als Restaurant aussteigen. Schritt für Schritt.",
  },
  "wolt-kundenservice-telefonnummer": {
    metaDescription: "Wolt hat absichtlich keine Telefonnummer — seit der Gründung 2014. Diese 4 Wege ersetzen sie komplett, einer davon ist sogar schneller als jeder Anruf.",
  },
};

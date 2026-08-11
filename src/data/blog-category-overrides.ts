// Batch 6 Phase 2 — Kategorie-Bereinigung als Override-Ebene.
//
// WARUM ein Override-Modul statt Edits in blog-posts-generated.ts:
// `npm run generate:blog-posts` ÜBERSCHREIBT die generierte Datei — dort
// editierte Kategorien wären beim nächsten Generator-Lauf weg (gleiche
// Falle wie bei den FAQ-Overrides). Diese Map wird beim Zusammenbau in
// blog-posts.ts angewandt und ist damit die EINE Quelle für alle
// Konsumenten (BlogPage, Related-Links, Prerenderer, Sitemap-Hub).
//
// Auflösung von 'migrations-altsite' (24) + Labor-Law-Ring → Personal &
// Schulung (14) + Kassen-Themen → Kassensysteme + Einzelkorrekturen.
// Entscheidungsgrundlage: Batch-6-Bericht Phase A4 + Freigaben 2.1–2.4.
export const CATEGORY_OVERRIDES: Record<string, string> = {
  "digitale-speisekarte": "Bestellsysteme",
  "businessplan-gastronomie": "Gründung",
  "preiskalkulation-gastronomie": "Finanzen",
  "personalplanung-gastronomie": "Personal & Schulung",
  "gastronomie-software": "Kassensysteme",
  "konzession-gastronomie": "Gründung",
  "selbstbedienung-gastronomie": "Bestellsysteme",
  "gema-gebuehren-gastronomie": "Recht & Compliance",
  "nachtzuschlag-gastronomie": "Personal & Schulung",
  "no-show-gebuehr-gastronomie": "Recht & Compliance",
  "wareneingangskontrolle-gastronomie": "Betrieb & Service",
  "mise-en-place-gastronomie": "Betrieb & Service",
  "kassendifferenz-gastronomie": "Kassensysteme",
  "function-sheet-restaurant": "Betrieb & Service",
  "kassenpflicht-gastronomie": "Kassensysteme",
  "toiletten-gesetz-gastronomie": "Recht & Compliance",
  "inventur-gastronomie": "Finanzen",
  "bewirtungsbeleg-gastronomie": "Finanzen",
  "eigenbeleg-gastronomie": "Finanzen",
  "allergene-liste-gastronomie": "Recht & Compliance",
  "offene-ladenkasse-gastronomie": "Kassensysteme",
  "imbiss-eroeffnen": "Gründung",
  "restaurant-namen": "Gründung",
  "popup-restaurant": "Gründung",
  "kassensicherungsverordnung-2026-tse": "Kassensysteme",
  "cloud-pos-system-gastronomie": "Kassensysteme",
  "pausenzeiten-gastronomie": "Personal & Schulung",
  "urlaubsanspruch-minijob-gastronomie": "Personal & Schulung",
  "feiertagszuschlag-gastronomie": "Personal & Schulung",
  "sonntagszuschlag-gastronomie": "Personal & Schulung",
  "urlaubsantrag-vorlage-gastronomie": "Personal & Schulung",
  "kuendigung-minijob-gastronomie": "Personal & Schulung",
  "urlaubsanspruch-teilzeit-gastronomie": "Personal & Schulung",
  "fahrtkostenzuschuss-gastronomie": "Personal & Schulung",
  "urlaubsanspruch-bei-krankheit-gastronomie": "Personal & Schulung",
  "maximale-arbeitszeit-gastronomie": "Personal & Schulung",
  "ueberstunden-auszahlen-gastronomie": "Personal & Schulung",
  "spaetschicht-zuschlag-gastronomie": "Personal & Schulung",
  "arbeitsstunden-pro-monat-gastronomie": "Personal & Schulung",
  "ueberstunden-steuerfrei-gastronomie": "Personal & Schulung",
  "restaurant-namen-markenrechtlich-pruefen": "Gründung",
  "mindestlohn-gastronomie-2026": "Personal & Schulung",
  "versicherungen-restaurant-betrieb": "Finanzen",
  "buchhaltung-gastronomie-grundlagen": "Finanzen",
};

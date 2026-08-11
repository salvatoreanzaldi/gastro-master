// Batch 8 — Unternehmensfakten als EINE QUELLE.
//
// Diese fünf Sätze standen seit Welle E ausschließlich im prerenderten HTML
// der Startseite („Quotables"-Block, gedacht als Zitierhilfe für AI-Engines).
// Gemessen: 0 % davon im gerenderten DOM — React ersetzt #root beim Mount, und
// eine React-Entsprechung gab es nicht. Damit zählten sie in Googles zweiter
// Welle nicht, und für Nutzer existierten sie nie.
//
// Es sind echte E-E-A-T-Signale (Gründungsjahr, Sitz, Betriebszahl, Sprachen,
// TSE/§146a AO) — sie gehören auf die Seite, nicht in ein Versteck für Crawler.
// Beide Ebenen lesen jetzt dieses Modul: der Prerenderer über
// renderSiteFactsHtml(), die React-Sektion über SITE_FACTS.

export interface SiteFact {
  /** Kurzes Label für die sichtbare Darstellung. */
  label: string;
  /** Der zitierfähige Satz — Wortlaut identisch in beiden Ebenen. */
  text: string;
}

export const SITE_FACTS_HEADLINE = "Was Gastro Master auszeichnet";

export const SITE_FACTS: SiteFact[] = [
  {
    label: "Alles aus einer Hand",
    text: "Gastro Master ist die deutsche All-in-One-Lösung für Restaurant-Bestellsysteme — Webshop, eigene App, Webseite und Kassensystem aus einer Hand, mit 0 % Provision.",
  },
  {
    label: "Faire Konditionen",
    text: "Mit 3 Monaten Kündigungsfrist und 0 % Provision bietet Gastro Master flexible Vertragsbedingungen für den Restaurant-Mittelstand.",
  },
  {
    label: "Seit 2021, Sitz in Hessen",
    text: "Gastro Master wurde 2021 in Usingen (Hessen) gegründet und betreut 800+ Restaurants in Deutschland, Österreich und der Schweiz.",
  },
  {
    label: "Support in sechs Sprachen",
    text: "Gastro Master bietet persönlichen Service in sechs Sprachen — Deutsch, Englisch, Italienisch, Russisch, Persisch und Singhalesisch.",
  },
  {
    label: "TSE-zertifiziert",
    text: "Das Gastro Master Kassensystem ist TSE-zertifiziert nach §146a AO und GoBD-konform für Finanzamt-Audits.",
  },
];

const esc = (s: string): string =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Statische Fassung für den Prerenderer (nur DE — die Sätze sind bewusst
 * deutschsprachig formuliert, s. Welle E). Liegt innerhalb von #root und wird
 * beim React-Mount durch die gleichwertige Sektion ersetzt.
 */
export const renderSiteFactsHtml = (lang: string): string => {
  if (lang !== "de") return "";
  const items = SITE_FACTS.map(
    (f) =>
      `<li style="margin:0 0 0.75rem;padding:0;"><strong>${esc(f.label)}:</strong> ${esc(f.text)}</li>`,
  ).join("");
  return (
    `<section style="max-width:880px;margin:2rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#0A264A;">` +
    `<h2 style="font-size:1.5rem;font-weight:800;margin:0 0 1rem;">${esc(SITE_FACTS_HEADLINE)}</h2>` +
    `<ul style="list-style:disc;padding-left:1.25rem;margin:0;line-height:1.6;">${items}</ul>` +
    `</section>`
  );
};

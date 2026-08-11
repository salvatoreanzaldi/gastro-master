// Batch 9 — Provisionsspanne als EINE QUELLE.
//
// Die Angabe „13–30 % Provision" steht an 115 Fundstellen in 22 Dateien und
// ist inhaltlich korrekt (unabhängige Branchenquellen nennen dieselbe Spanne,
// oberer Bereich bei Plattform-Logistik). Das Problem war nie die Zahl, sondern
// dass sie nirgends gepflegt und nirgends datiert war: Eine absolute Behauptung
// über die Preise eines Wettbewerbers altert schlecht und ist als vergleichende
// Werbung (UWG §6) nur haltbar, wenn sie objektiv UND nachprüfbar ist — also
// datiert und als Erfahrungswert gekennzeichnet.
//
// Diese Datei ist der Ort, an dem Spanne und Stand gepflegt werden. Wer die
// Zahlen aktualisiert, ändert sie hier und zieht die unten gelisteten Stellen
// nach. Neue Texte formulieren mit `provisionClaim()`.

export interface ProvisionStand {
  /** Untergrenze in Prozent — Plattform-Vermittlung, eigene Fahrer. */
  min: number;
  /** Obergrenze in Prozent — Lieferung durch Plattform-Fahrer. */
  max: number;
  /** Stand der Angabe (Monat Jahr), erscheint im Fließtext. */
  stand: string;
  /** Herkunftsformel — kennzeichnet die Angabe als Erfahrungswert. */
  herkunft: string;
}

export const PROVISION_STAND: ProvisionStand = {
  min: 13,
  max: 30,
  stand: "August 2026",
  herkunft: "öffentlich verfügbare Angaben und Erfahrungswerte aus der Praxis",
};

/** Formulierungshilfe für neue Texte: vollständiger, belegbarer Satzbaustein. */
export const provisionClaim = (p: ProvisionStand = PROVISION_STAND): string =>
  `Nach ${p.herkunft} liegt die Provision je nach Modell zwischen rund ${p.min} Prozent ` +
  `(Plattform-Vermittlung, du lieferst selbst) und ${p.max} Prozent (Lieferung durch ` +
  `Plattform-Fahrer); Stand: ${p.stand}.`;

/** Kurzform für Tabellen und Aufzählungen. */
export const provisionRange = (p: ProvisionStand = PROVISION_STAND): string =>
  `${p.min}–${p.max} % (Stand: ${p.stand})`;

/**
 * NACHGEZOGENE FUNDSTELLEN (Batch 9) — hier gepflegt, dort formuliert:
 *   • src/data/blog-posts-faq-overrides.ts — Partner-Artikel, 2 Stellen (Batch 7)
 *   • public/locales/{de,en,it,ru,si}/faq.json — je 3 Stellen, 15 gesamt
 *
 * BEWUSST NICHT NACHGEZOGEN:
 *   • src/data/blog-posts-generated.ts (64 Stellen) — der Generator überschreibt
 *     die Datei; ein Override-Mechanismus nur für eine Datierung wäre mehr
 *     Maschinerie als Nutzen. Dort steht die Zahl durchweg als Rechenbeispiel
 *     oder Nebensatz, nicht als Kernbehauptung der Seite.
 *   • Kalkulations-Fußnoten in blog-landing-content.ts (3 Stellen) — dort ist
 *     die Zahl Rechengrundlage eines Beispiels, nicht die Aussage selbst.
 *   • Bundles ueber-uns / lieferservice-gruenden / ghost-kitchen / lieferdienst
 *     (~19 Stellen) — Nebensätze in Fließtext, keine eigenständige Behauptung.
 */

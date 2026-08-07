// Batch 3b — EINE Quelle der Wahrheit für die drei Blog-Landing-Routen
// (/de/blog/was-kostet-bestellsystem, /warum-lieferando-verzichten,
// /5-fehler-lieferdienst-eroffnen). Die React-Komponenten UND der Prerenderer
// (generate-prerendered-html.mjs) lesen dieselben Blöcke — Muster wie
// money-page-links.ts aus Batch 3. Vorher lag der Content als hardcodiertes
// JSX nur im Client (36/37/33 Wörter im rohen HTML).
//
// WICHTIG: Dieses Modul muss selbstständig bleiben (keine extensionslosen
// Imports) — der Node-Type-Stripping-Loader des Prerenderers löst sie nicht auf.

export interface LandingMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishDateDisplay: string; // z. B. "20. April 2026" (Anzeige im Layout)
  publishedDateIso: string; // z. B. "2026-04-20" (Schema datePublished)
}

export interface CalcRow {
  label: string;
  value: string;
  tone?: "neg" | "pos";
}

export interface CalcCard {
  title: string;
  tone: "neg" | "pos" | "neutral";
  sub?: string;
  rows: CalcRow[];
  footLabel?: string;
  footValue?: string;
  note?: string;
}

export interface CompareRow {
  kriterium: string;
  lieferando: string;
  wolt: string;
  gastroMaster: string;
  gmPositiv: boolean;
}

export type LandingBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "compareTable"; headers: [string, string, string, string]; rows: CompareRow[] }
  | { kind: "calcCards"; cards: CalcCard[] }
  | { kind: "note"; title: string; text: string }
  | { kind: "items"; items: { title: string; text: string }[] }
  | { kind: "list"; heading?: string; sub?: string; items: string[] }
  | {
      kind: "steps";
      steps: { num: string; title: string; problem: string; loesung: string; tipp: string }[];
    };

export interface LandingPost {
  meta: LandingMeta;
  blocks: LandingBlock[];
}

// Statische Labels, die auch der Client in den Karten rendert (Parität).
export const STEP_LABELS = { loesung: "Die Lösung", tipp: "Praxis-Tipp" } as const;

// slug → Blog-Kategorien für die 6 kontextuellen Backlinks
// (Auswahl via blogLinksForCategories aus money-page-links.ts — geteilte Logik).
export const LANDING_BLOG_CATEGORIES: Record<string, string[]> = {
  "was-kostet-bestellsystem": ["Bestellsysteme", "Finanzen"],
  "warum-lieferando-verzichten": ["Lieferservice", "Bestellsysteme"],
  "5-fehler-lieferdienst-eroffnen": ["Gründung", "Lieferservice"],
};

// ─── Content: was-kostet-bestellsystem ───────────────────────────────────────

const KOSTEN: LandingPost = {
  meta: {
    slug: "was-kostet-bestellsystem",
    title: "Was kostet ein eigenes Bestellsystem wirklich? (Ehrlicher Vergleich)",
    description:
      "Setup, Provision, Support — wir rechnen alle Kosten durch und zeigen, was Gastro Master im Vergleich zu Lieferando wirklich kostet.",
    category: "Vergleich",
    readingTime: "7 min",
    publishDateDisplay: "20. April 2026",
    publishedDateIso: "2026-04-20",
  },
  blocks: [
    {
      kind: "p",
      text: "„Ein eigenes Bestellsystem ist zu teuer\" — das hört man oft von Gastronomen, die noch nie die Gegenrechnung gemacht haben. Die Wahrheit ist: Der Vergleich ist nicht Kosten vs. keine Kosten. Er ist strukturelle Fixkosten vs. variable Provisionen, die mit deinem Erfolg mitwachsen.",
    },
    {
      kind: "p",
      text: "Wir zeigen alle Zahlen — einschließlich der Kosten, über die Plattformen nicht gerne sprechen.",
    },
    { kind: "h2", text: "Direkter Vergleich: Lieferando vs. Wolt vs. eigenes System" },
    {
      kind: "compareTable",
      headers: ["Kriterium", "Lieferando", "Wolt", "Gastro Master"],
      rows: [
        { kriterium: "Einstiegskosten", lieferando: "Kostenlos", wolt: "Kostenlos", gastroMaster: "Einmalige Setup-Gebühr", gmPositiv: true },
        { kriterium: "Provision je Bestellung", lieferando: "13–30 %", wolt: "15–30 %", gastroMaster: "0 %", gmPositiv: true },
        { kriterium: "Monatliche Grundgebühr", lieferando: "Paketabhängig", wolt: "Paketabhängig", gastroMaster: "Fixer Monatsbetrag", gmPositiv: true },
        { kriterium: "Kundendaten-Zugang", lieferando: "Kein Zugang", wolt: "Kein Zugang", gastroMaster: "Vollständig", gmPositiv: true },
        { kriterium: "Eigene Domain / Branding", lieferando: "Nein", wolt: "Nein", gastroMaster: "Ja", gmPositiv: true },
        { kriterium: "Push-Notifications an Kunden", lieferando: "Nein", wolt: "Nein", gastroMaster: "Ja", gmPositiv: true },
        { kriterium: "Sofortige Reichweite", lieferando: "Hoch", wolt: "Hoch", gastroMaster: "Selbst aufbauen", gmPositiv: false },
        { kriterium: "Algorithmus-Abhängigkeit", lieferando: "Hoch", wolt: "Hoch", gastroMaster: "Keine", gmPositiv: true },
      ],
    },
    { kind: "h2", text: "Was 100 Bestellungen im Monat wirklich kosten" },
    {
      kind: "p",
      text: "Statt abstrakter Prozentsätze: ein konkretes Beispiel für 100 Bestellungen pro Monat bei einem Durchschnittswert von 28 €.",
    },
    {
      kind: "calcCards",
      cards: [
        {
          title: "Lieferando (22 %)",
          tone: "neg",
          rows: [
            { label: "100 Bestellungen à 28 €", value: "2.800 €" },
            { label: "Lieferando-Provision (22 %)", value: "– 616 €", tone: "neg" },
            { label: "Jahreskosten Provision", value: "– 7.392 €", tone: "neg" },
          ],
          footLabel: "Provision im Jahr bei 100 Bestell./Monat",
          footValue: "– 7.392 €",
        },
        {
          title: "Gastro Master",
          tone: "pos",
          rows: [
            { label: "100 Bestellungen à 28 €", value: "2.800 €" },
            { label: "Monatliche Gebühr (Beispiel)", value: "– 149 €", tone: "neg" },
            { label: "Provision", value: "0 €", tone: "pos" },
            { label: "Jahreskosten", value: "– 1.788 €", tone: "neg" },
          ],
          footLabel: "Fixkosten im Jahr (kein Wachstum der Kosten)",
          footValue: "– 1.788 €",
        },
      ],
    },
    {
      kind: "note",
      title: "Ersparnis im Beispiel: über 5.600 € im Jahr — bei nur 100 Bestellungen pro Monat.",
      text: "Je mehr du bestellst, desto mehr sparst du mit einem Fixkosten-Modell.",
    },
    { kind: "h2", text: "Versteckte Kosten, die niemand erwähnt" },
    { kind: "p", text: "Die Provision ist nur der sichtbare Teil. Was Plattformverträge noch kosten:" },
    {
      kind: "items",
      items: [
        {
          title: "Sichtbarkeitsboosts (Sponsored Listings)",
          text: "Um in der App oben zu erscheinen, bezahlst du zusätzlich für Werbeplätze. Wer nicht zahlt, sinkt in der Relevanz.",
        },
        {
          title: "Pflichtfotos und professionelle Fotografie",
          text: "Lieferando empfiehlt (und teils verlangt) professionelle Produktfotos. Kosten: 500–2.000 € je nach Umfang.",
        },
        {
          title: "Vertragsgebundene Laufzeiten",
          text: "Viele Lieferando-Pakete haben Mindestlaufzeiten von 12 Monaten. Kündigung vor Ablauf ist teuer.",
        },
        {
          title: "Storno- und Reklamationskosten",
          text: "Bei Stornierungen oder Kundenbeschwerden trägst du als Betreiber oft die Kosten — Lieferando schützt sich vertraglich.",
        },
      ],
    },
    { kind: "h2", text: "Ab wann lohnt sich ein eigenes System?" },
    {
      kind: "p",
      text: "Die Break-Even-Frage ist einfach: Liegt deine monatliche Gastro-Master-Gebühr unterhalb der Provision, die du sonst zahlen würdest? Bei 100 Bestellungen à 28 € und 22 % Provision sind das 616 € im Monat — eine Fixgebühr ist fast immer günstiger.",
    },
    {
      kind: "p",
      text: "Realistisch lohnt sich der Wechsel ab ca. 50–80 Bestellungen pro Monat. Darunter ist das Wachstum über Plattformreichweite oft sinnvoller — aber mit dem klaren Plan, parallel den eigenen Kanal aufzubauen.",
    },
    { kind: "h2", text: "Fazit" },
    {
      kind: "p",
      text: "Ein eigenes Bestellsystem ist keine Zusatzausgabe — es ist eine Investition, die sich ab einem bestimmten Volumen schnell amortisiert. Wer die Vollkosten der Plattformabhängigkeit kennt, kommt fast immer zu demselben Schluss: Die günstigste Lösung langfristig ist die eigene.",
    },
    {
      kind: "p",
      text: "Wichtig: Vergleiche nicht Null-Kosten (Lieferando-Einstieg) mit Vollkosten (eigenes System). Vergleiche die Gesamtkosten über 24 Monate. Dann sieht die Rechnung meistens sehr deutlich aus.",
    },
  ],
};

// ─── Content: warum-lieferando-verzichten ────────────────────────────────────

const LIEFERANDO: LandingPost = {
  meta: {
    slug: "warum-lieferando-verzichten",
    title: "Warum dein Lieferservice auf Lieferando verzichten sollte",
    description:
      "Lieferando nimmt bis zu 30 % Provision pro Bestellung. Was das für deine Marge wirklich bedeutet — und welche Alternative sich lohnt.",
    category: "Meinung",
    readingTime: "6 min",
    publishDateDisplay: "20. April 2026",
    publishedDateIso: "2026-04-20",
  },
  blocks: [
    {
      kind: "p",
      text: "Lieferando ist für viele Lieferdienste der erste Schritt ins digitale Zeitalter. Schnell eingerichtet, große Reichweite, sofortige Sichtbarkeit. Was auf den ersten Blick überzeugend klingt, entpuppt sich nach einigen Monaten als strukturelles Problem: Du baust ein Geschäft auf, das einem anderen gehört.",
    },
    {
      kind: "calcCards",
      cards: [
        {
          title: "Was 100 Bestellungen auf Lieferando wirklich kosten",
          tone: "neutral",
          sub: "Vereinfachtes Beispiel, Provision 22 % (Mittelwert)",
          rows: [
            { label: "Durchschnittlicher Bestellwert", value: "28,00 €" },
            { label: "Umsatz bei 100 Bestellungen", value: "2.800,00 €" },
            { label: "Lieferando-Provision (22 %)", value: "− 616,00 €", tone: "neg" },
            { label: "Lieferkosten (eigener Fahrer)", value: "− 350,00 €", tone: "neg" },
            { label: "Lebensmittelkosten (30 %)", value: "− 840,00 €", tone: "neg" },
            { label: "Verbleibender Deckungsbeitrag", value: "994,00 €", tone: "pos" },
            { label: "Deckungsbeitrag pro Bestellung", value: "≈ 9,94 €", tone: "pos" },
          ],
          note: "* Lieferando-Provision variiert je nach Paket zwischen 13 % und 30 %. Lieferkosten und Personalkosten nicht eingerechnet.",
        },
      ],
    },
    {
      kind: "p",
      text: "Knapp 10 € Deckungsbeitrag pro Bestellung klingt vertretbar — bis du davon Miete, Strom, Verpackung und deinen eigenen Lohn abziehst. Die Plattform verdient bei jedem Verkauf mit, ohne das Risiko zu tragen.",
    },
    { kind: "h2", text: "3 strukturelle Probleme mit Lieferando" },
    { kind: "p", text: "Die Provision ist nur die offensichtlichste Baustelle." },
    {
      kind: "items",
      items: [
        {
          title: "Die Provision frisst deine Marge",
          text: "Lieferando verlangt je nach Paket zwischen 13 % und 30 % auf jede Bestellung — ohne Wenn und Aber. Bei einem durchschnittlichen Bestellwert von 28 € bleiben dir nach Provision oft nur 19–24 € übrig. Ziehst du Lebensmittelkosten (ca. 30 %) und Lieferkosten ab, arbeitest du schnell im Minus.",
        },
        {
          title: "Deine Kunden gehören dir nicht",
          text: "Auf Lieferando bestellen Kunden bei dir — aber Lieferando besitzt die Beziehung. Du bekommst keine E-Mail-Adressen, keine Telefonnummern, keine Möglichkeit zur direkten Kundenbindung. Wechselst du die Plattform, verlierst du den Zugang zu deiner eigenen Kundenbasis.",
        },
        {
          title: "Preiserhöhungen treffen nur dich",
          text: "Lieferando kann seine Provisionen jederzeit anpassen. Deine Verträge mit Lieferanten, dein Personal, deine Miete — all das hat Preise, die du kennst und planst. Deine Abhängigkeit von Lieferando gibt einer externen Partei dauerhaft Kontrolle über deine Marge.",
        },
      ],
    },
    { kind: "h2", text: "Wann Lieferando trotzdem Sinn ergibt" },
    {
      kind: "p",
      text: "Fairerweise: Lieferando hat einen echten Wert in der Anlaufphase. Wenn du gerade eröffnest und noch keine Stammkundschaft hast, kann die Plattform erste Bestellungen bringen. Als langfristige Strategie funktioniert es nur dann, wenn deine Marge das dauerhaft hergibt — und das ist in der Gastronomie selten der Fall.",
    },
    {
      kind: "p",
      text: "Der Fehler ist nicht, Lieferando zu nutzen. Der Fehler ist, ausschließlich auf Lieferando zu setzen und nie eine eigene Infrastruktur aufzubauen.",
    },
    { kind: "h2", text: "Die Alternative: eigenes Bestellsystem" },
    {
      kind: "p",
      text: "Ein eigenes Bestellsystem bedeutet nicht, auf Reichweite zu verzichten — es bedeutet, die Kundenbeziehung selbst in der Hand zu halten. Du betreibst deinen eigenen Webshop unter deiner Domain, behältst alle Kundendaten und zahlst keine Provision pro Bestellung.",
    },
    {
      kind: "list",
      items: [
        "Eigene Bestellseite unter deiner Domain — keine Provision pro Bestellung",
        "Kundendaten gehören dir: E-Mail, Telefon, Bestellhistorie",
        "Direkte Kundenbindung durch Push-Nachrichten und eigene Angebote",
        "Transparente Fixkosten statt variables Provisionsmodell",
        "Keine Abhängigkeit von Plattform-Algorithmen oder Sichtbarkeits-Rankings",
      ],
    },
    {
      kind: "p",
      text: "Natürlich braucht das eigene Bestellsystem mehr Eigeninitiative beim Marketing: Du musst Kunden aktiv auf deinen Shop aufmerksam machen. Aber jeder Kunde, der einmal direkt bei dir bestellt, ist ein Kunde, dem Lieferando nie mehr 30 % abnimmt.",
    },
    { kind: "h2", text: "Fazit" },
    {
      kind: "p",
      text: "Lieferando ist kein schlechtes Produkt — es ist das falsche Fundament für einen nachhaltigen Betrieb. Wer langfristig denkt, baut lieber jetzt eine eigene Infrastruktur auf, als in zwei Jahren festzustellen, dass 30 % seiner Einnahmen dauerhaft an eine Plattform fließen, auf der er keine Kontrolle hat.",
    },
    { kind: "p", text: "Der erste Schritt kostet Überwindung. Der zweite Schritt zahlt sich aus." },
  ],
};

// ─── Content: 5-fehler-lieferdienst-eroffnen ─────────────────────────────────

const FEHLER: LandingPost = {
  meta: {
    slug: "5-fehler-lieferdienst-eroffnen",
    title: "5 Fehler beim Eröffnen eines Lieferdienstes (und wie du sie vermeidest)",
    description:
      "Von falscher Standortwahl bis fehlendem Bestellsystem: Diese Fehler kosten Gründer Monate und Tausende Euro.",
    category: "How-to",
    readingTime: "8 min",
    publishDateDisplay: "20. April 2026",
    publishedDateIso: "2026-04-20",
  },
  blocks: [
    {
      kind: "p",
      text: "Einen Lieferdienst zu gründen klingt überschaubar: Küche mieten, Fahrer einstellen, auf Lieferando anmelden, loslegen. Die Realität sieht anders aus. Die meisten Gründer scheitern nicht an schlechtem Essen — sie scheitern an Fehlern, die in der Planungsphase gemacht werden und sich erst Monate später zeigen.",
    },
    { kind: "p", text: "Hier sind die fünf häufigsten Fehler — und was du stattdessen tun kannst." },
    {
      kind: "steps",
      steps: [
        {
          num: "01",
          title: "Standortwahl nach Bauchgefühl statt nach Daten",
          problem:
            "Viele Gründer wählen ihren Standort, weil die Miete günstig ist oder sie das Viertel mögen. Dabei entscheidet die Lieferdichte des Gebiets über alles: Wer in einem dünner besiedelten Stadtrand eröffnet, hat zu große Lieferradien und zu wenige Bestellungen pro Stunde.",
          loesung:
            "Analysiere vor der Unterschrift das Bestellvolumen in deinem Zielgebiet. Schau dir Google Maps-Bewertungen anderer Lieferdienste in der Umgebung an, zähle Wohneinheiten im Radius und prüfe, ob Konkurrenten die Zone bereits aufgegeben haben — das sagt oft mehr als jede Marktanalyse.",
          tipp: "Ein Lieferradius von 3–5 km ist ideal. Mehr bedeutet zu lange Lieferzeiten und kalte Pizza.",
        },
        {
          num: "02",
          title: "Preise ohne vollständige Kostenkalkulation setzen",
          problem:
            "Der häufigste Anfängerfehler: Preise werden so gesetzt, dass sie 'wettbewerbsfähig' wirken — ohne je ausgerechnet zu haben, ob sie auch profitabel sind. Lebensmittelkosten (30–35 %), Verpackung (2–5 %), Lieferung (4–8 € pro Bestellung), Plattformprovisionen (bis 30 %) und Betriebskosten summieren sich schnell auf 70–80 % des Umsatzes.",
          loesung:
            "Rechne jeden Artikel durch: Was kostet er in der Herstellung? Wie viel Provision fällt an? Welche Verpackung brauchst du? Erst wenn du diese Zahlen kennst, setzt du den Verkaufspreis. Eine Kalkulations-Tabelle hilft dabei mehr als jedes Bauchgefühl.",
          tipp: "Ziele auf einen Rohertrag von mindestens 65 % je Gericht — alles darunter macht es schwer, profitabel zu wirtschaften.",
        },
        {
          num: "03",
          title: "Kein eigenes Bestellsystem von Anfang an",
          problem:
            "Viele starten ausschließlich über Lieferando oder Wolt — und merken erst Monate später, dass sie keine Kundendaten besitzen, keine Möglichkeit zur Kundenbindung haben und 20–30 % ihrer Einnahmen dauerhaft an eine Plattform abgeben. Aus dieser Abhängigkeit herauszukommen ist schwieriger, als von Anfang an einen eigenen Kanal aufzubauen.",
          loesung:
            "Starte parallel: Nutze Plattformen für die Anfangsreichweite, aber richte gleichzeitig deinen eigenen Webshop ein. Gib Direktbestellern einen kleinen Anreiz (5 % Rabatt, kostenlose Beilage) und bewirb deine eigene Website aktiv auf Verpackungen und Quittungen.",
          tipp: "Jeder Kunde, der einmal direkt bei dir bestellt, ist ein Kunde, den die Plattform nie wieder abkassiert.",
        },
        {
          num: "04",
          title: "Personalplanung für die erste Woche, nicht für die dritte",
          problem:
            "Der Eröffnungs-Hype ist real: Viele neue Lieferdienste haben in den ersten zwei Wochen mehr Bestellungen als danach. Wer dafür zu wenig Personal hat, liefert zu spät — und verliert Kunden für immer. Wer umgekehrt zu viel Personal in einer schwachen Phase vorhält, verbrennt Cash.",
          loesung:
            "Plane in Phasen: Woche 1–2 mit etwas mehr Kapazität, dann nach echten Bestellzahlen skalieren. Nutze flexible Fahrer (Minijob, Stundenbasis), bevor du feste Verträge abschließt. Ein Liefermanagementsystem, das Touren optimiert, reduziert deinen Fahrerbedarf deutlich.",
          tipp: "Zwei zuverlässige Fahrer sind besser als vier unzuverlässige. Qualität schlägt Quantität beim ersten Eindruck.",
        },
        {
          num: "05",
          title: "Marketing als Nachgedanke statt als Strategie",
          problem:
            "'Wir sind live, jetzt kommen die Kunden von allein' — dieser Gedanke kostet Gründer wertvolle erste Monate. Wer neu auf dem Markt ist, muss aktiv auf sich aufmerksam machen. Mund-zu-Mund-Propaganda funktioniert, braucht aber Zeit.",
          loesung:
            "Plane dein Eröffnungsmarketing mindestens vier Wochen vor Launch: Flyer im Liefergebiet, Google Business-Profil vollständig befüllen, Instagram-Account mit erstem Content, und ein Eröffnungsangebot (z.B. kostenlose Lieferung für erste 200 Bestellungen). Die Investition in die ersten Kunden zahlt sich durch Stammkunden zurück.",
          tipp: "Ein Google Business-Profil mit echten Fotos und regelmäßigen Beiträgen erhöht deine lokale Sichtbarkeit kostenlos.",
        },
      ],
    },
    {
      kind: "list",
      heading: "Schnell-Check vor deinem Launch",
      sub: "Hake diese Punkte ab, bevor du live gehst",
      items: [
        "Liefergebiet nach Bestelldichte analysiert?",
        "Vollständige Kostenkalkulation für alle Gerichte erstellt?",
        "Eigener Bestellkanal neben Plattformen geplant?",
        "Personalplan für die ersten 6 Wochen erstellt?",
        "Eröffnungsmarketing mindestens 4 Wochen im Voraus geplant?",
      ],
    },
    { kind: "h2", text: "Fazit" },
    {
      kind: "p",
      text: "Die gute Nachricht: Alle fünf Fehler sind vermeidbar — wenn du sie kennst, bevor du sie machst. Die Gastronomie ist brutal ehrlich: Fehler zeigen sich sofort in den Zahlen. Wer früh mit Kalkulation, Systemaufbau und Marketing anfängt, gibt sich selbst die Chance, in der dritten Woche noch da zu sein — und in der dritten Saison zu wachsen.",
    },
    {
      kind: "p",
      text: "Ein eigenes Bestellsystem ist kein Luxus — es ist das Fundament, auf dem du unabhängig von Plattformen aufbaust. Wer das von Anfang an versteht, hat einen erheblichen Vorteil gegenüber der Konkurrenz, die das erst nach zwei Jahren schmerzhaft lernt.",
    },
  ],
};

export const LANDING_POSTS: Record<string, LandingPost> = {
  [KOSTEN.meta.slug]: KOSTEN,
  [LIEFERANDO.meta.slug]: LIEFERANDO,
  [FEHLER.meta.slug]: FEHLER,
};

// ─── Statischer HTML-Renderer (Prerenderer-Seite) ────────────────────────────
// Semantisches, ungestyltes-bis-minimal-gestyltes HTML aus DENSELBEN Blöcken,
// die der Client rendert. Texte sind damit byte-identisch zur DOM-Prosa.

const esc = (s: string): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function calcCardHtml(card: CalcCard): string {
  const rows = card.rows
    .map((r) => `<div><dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd></div>`)
    .join("");
  return [
    "<section>",
    `<h3>${esc(card.title)}</h3>`,
    card.sub ? `<p>${esc(card.sub)}</p>` : "",
    `<dl>${rows}</dl>`,
    card.footLabel && card.footValue
      ? `<p><strong>${esc(card.footLabel)}:</strong> ${esc(card.footValue)}</p>`
      : "",
    card.note ? `<p>${esc(card.note)}</p>` : "",
    "</section>",
  ]
    .filter(Boolean)
    .join("");
}

export function renderLandingArticleHtml(slug: string): string {
  const post = LANDING_POSTS[slug];
  if (!post) return "";
  const out: string[] = [];
  for (const b of post.blocks) {
    switch (b.kind) {
      case "p":
        out.push(`<p>${esc(b.text)}</p>`);
        break;
      case "h2":
        out.push(`<h2>${esc(b.text)}</h2>`);
        break;
      case "compareTable": {
        const head = b.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join("");
        const rows = b.rows
          .map(
            (r) =>
              `<tr><th scope="row">${esc(r.kriterium)}</th><td>${esc(r.lieferando)}</td><td>${esc(r.wolt)}</td><td>${esc(r.gastroMaster)}</td></tr>`,
          )
          .join("");
        out.push(`<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`);
        break;
      }
      case "calcCards":
        out.push(b.cards.map(calcCardHtml).join(""));
        break;
      case "note":
        out.push(`<p><strong>${esc(b.title)}</strong> ${esc(b.text)}</p>`);
        break;
      case "items":
        for (const it of b.items) {
          out.push(`<h3>${esc(it.title)}</h3><p>${esc(it.text)}</p>`);
        }
        break;
      case "list":
        if (b.heading) out.push(`<h2>${esc(b.heading)}</h2>`);
        if (b.sub) out.push(`<p>${esc(b.sub)}</p>`);
        out.push(`<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`);
        break;
      case "steps":
        for (const s of b.steps) {
          out.push(
            `<h3>${esc(s.num)}. ${esc(s.title)}</h3>` +
              `<p>${esc(s.problem)}</p>` +
              `<p><strong>${STEP_LABELS.loesung}:</strong> ${esc(s.loesung)}</p>` +
              `<p><strong>${STEP_LABELS.tipp}:</strong> ${esc(s.tipp)}</p>`,
          );
        }
        break;
    }
  }
  return out.join("\n");
}

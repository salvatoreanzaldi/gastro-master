// Batch 6 Phase 3 — Kategorie-Hubs unter /de/blog/thema/<slug>.
//
// EINE QUELLE (Muster money-page-links.ts): Dieses Modul ist zugleich
//   1. die Hub-REGISTRY (BLOG_HUBS): Kategorie → Hub. Aus ihr leiten sich ab:
//      - die bedingte Breadcrumb-Tiefe der Blog-Posts (Kategorie-Ebene bekommt
//        NUR dann eine item-URL, wenn hier ein Hub registriert ist — Googles
//        Spezifikation erlaubt item-lose ListItems nur an letzter Position),
//      - der Kategorie-Link im sichtbaren Crumb (React + Prerenderer),
//      - die Sitemap-Einträge der Hubs,
//      - der Prerender- und der React-Render des Hubs selbst.
//      Ein neuer Hub = ein Eintrag hier. Keine zweite Liste, nirgends.
//   2. der Hub-CONTENT (querschnittlich, nicht zusammenfassend): Die Tabelle,
//      der Entscheidungspfad und die Einstiegsfragen entstehen aus dem
//      VERGLEICH der Artikel — jede Aussage ist einem Quell-Artikel
//      zuordenbar (sourceSlug), aber im Wortlaut des Hubs paraphrasiert.
//
// Selbstständig halten (keine extensionslosen Imports) — der Prerenderer
// lädt dieses Modul mit Nodes Type-Stripping-Loader.

export interface HubLawRow {
  thema: string;
  sourceSlug: string;
  grundlage: string;
  grenzwert: string;
  fehler: string;
}

export interface HubDecisionStep {
  frage: string;
  antwort: string;
  slugs: string[];
}

export interface HubFaqItem {
  q: string;
  a: string;
  sourceSlug?: string;
}

export interface BlogHub {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string[];
  lawTableTitle: string;
  lawTable: HubLawRow[];
  decisionTitle: string;
  decisionIntro: string;
  decisionPath: HubDecisionStep[];
  faqTitle: string;
  faq: HubFaqItem[];
  outro: string[];
}

const ARBEITSRECHT: BlogHub = {
  slug: "arbeitsrecht",
  category: "Personal & Schulung",
  title: "Arbeitsrecht in der Gastronomie — der Überblick für Betreiber",
  metaTitle: "Gastro Master | Arbeitsrecht Gastronomie — Regeln, Fristen & Zuschläge im Überblick",
  description:
    "Arbeitszeiten, Pausen, Urlaub, Zuschläge und Kündigung in der Gastronomie: alle gesetzlichen Grundlagen, Grenzwerte und typischen Fehler — mit Vergleichstabelle und vertiefenden Ratgebern.",
  intro: [
    "Wer ein Restaurant, Café oder einen Lieferdienst führt, ist automatisch auch Arbeitgeber — und damit gelten vom ersten Mitarbeiter an dieselben Gesetze wie im Großbetrieb. Die häufigste Einstiegsfrage lautet: Welche Regeln gelten in meinem Betrieb überhaupt? Die Antwort steckt in vier Gesetzen, die fast jede Personalfrage der Gastronomie abdecken.",
    "Das Arbeitszeitgesetz (ArbZG) setzt die Grenzen für Arbeitszeit, Pausen und Nachtarbeit. Das Bundesurlaubsgesetz (BUrlG) regelt den Urlaubsanspruch — für Minijobber genauso wie für Vollzeitkräfte. Das Einkommensteuergesetz steuert mit § 3b, welche Sonn-, Feiertags- und Nachtzuschläge steuerfrei bleiben. Und das BGB liefert die Basis für Kündigungsfristen und die Vergütung von Überstunden.",
    "Diese Seite ist der Einstieg in den kompletten Themenblock: Die Tabelle zeigt alle Regeln, Fristen und Grenzwerte im direkten Vergleich — etwas, das kein Einzel-Ratgeber leisten kann. Der Entscheidungspfad führt dich von deiner Betriebssituation zu genau den Regeln, die für dich greifen. Und jede Zeile verlinkt auf den vertiefenden Ratgeber mit Rechenbeispielen und Vorlagen.",
  ],
  lawTableTitle: "Alle Arbeitsrechts-Themen im Vergleich",
  lawTable: [
    { thema: "Pausenzeiten", sourceSlug: "pausenzeiten-gastronomie", grundlage: "§ 4 ArbZG", grenzwert: "ab 6 Std. 30 Min., ab 9 Std. 45 Min.", fehler: "Schichten ohne dokumentierte Pause durchlaufen lassen" },
    { thema: "Maximale Arbeitszeit", sourceSlug: "maximale-arbeitszeit-gastronomie", grundlage: "§ 3 ArbZG", grenzwert: "8 Std./Tag, bis 10 Std. mit Ausgleich", fehler: "10-Stunden-Tage ohne Ausgleich innerhalb von 6 Monaten" },
    { thema: "Arbeitsstunden pro Monat", sourceSlug: "arbeitsstunden-pro-monat-gastronomie", grundlage: "§ 3 ArbZG", grenzwert: "max. 48 Std./Woche im 6-Monats-Schnitt", fehler: "Vertragsstunden mit der gesetzlichen Obergrenze verwechseln" },
    { thema: "Urlaub im Minijob", sourceSlug: "urlaubsanspruch-minijob-gastronomie", grundlage: "§§ 1, 4 BUrlG", grenzwert: "voller Anspruch nach 6 Monaten Wartezeit", fehler: "Minijobbern den gesetzlichen Urlaub verweigern" },
    { thema: "Urlaub in Teilzeit", sourceSlug: "urlaubsanspruch-teilzeit-gastronomie", grundlage: "§§ 3, 11 BUrlG", grenzwert: "anteilig nach Arbeitstagen; Lohn = 13-Wochen-Schnitt", fehler: "Urlaub nach Stunden statt nach Arbeitstagen rechnen" },
    { thema: "Urlaub bei Krankheit", sourceSlug: "urlaubsanspruch-bei-krankheit-gastronomie", grundlage: "§§ 1, 9 BUrlG", grenzwert: "AU-Tage zählen nicht als Urlaubstage", fehler: "krankgeschriebene Urlaubstage trotzdem vom Konto abziehen" },
    { thema: "Urlaubsantrag", sourceSlug: "urlaubsantrag-vorlage-gastronomie", grundlage: "§ 7 BUrlG", grenzwert: "Pflichtangaben: Zeitraum, Tage, Unterschriften", fehler: "mündliche Zusagen ohne schriftliche Dokumentation" },
    { thema: "Kündigung im Minijob", sourceSlug: "kuendigung-minijob-gastronomie", grundlage: "§ 622 BGB, § 7 Abs. 4 BUrlG", grenzwert: "Fristen wachsen mit Beschäftigungsdauer", fehler: "Resturlaub bei Kündigung nicht auszahlen" },
    { thema: "Überstunden auszahlen", sourceSlug: "ueberstunden-auszahlen-gastronomie", grundlage: "§ 612 BGB", grenzwert: "Vergütung, wenn Bezahlung zu erwarten ist", fehler: "pauschale „mit dem Gehalt abgegolten“-Klauseln" },
    { thema: "Überstunden & Steuer", sourceSlug: "ueberstunden-steuerfrei-gastronomie", grundlage: "§ 3b EStG (SFN-Zuschläge)", grenzwert: "SFN-Zuschläge auch auf Überstunden steuerfrei", fehler: "die Überstundenvergütung selbst für steuerfrei halten" },
    { thema: "Feiertagszuschlag", sourceSlug: "feiertagszuschlag-gastronomie", grundlage: "§ 3b EStG", grenzwert: "bis 125 % des Grundlohns steuerfrei", fehler: "gesetzliche Pflicht annehmen, wo keine besteht" },
    { thema: "Sonntagszuschlag", sourceSlug: "sonntagszuschlag-gastronomie", grundlage: "§ 3b EStG", grenzwert: "bis 50 % des Grundlohns steuerfrei", fehler: "Steuerfreiheit ohne korrekte Lohnabrechnung verspielen" },
    { thema: "Spätschichtzuschlag", sourceSlug: "spaetschicht-zuschlag-gastronomie", grundlage: "§ 3b EStG (kein eigener Begriff)", grenzwert: "20–24 Uhr: bis 25 % als Nachtarbeit", fehler: "„Spätschicht“ als eigene steuerfreie Kategorie behandeln" },
    { thema: "Fahrtkostenzuschuss", sourceSlug: "fahrtkostenzuschuss-gastronomie", grundlage: "§ 107 GewO, EStG (Pauschalierung)", grenzwert: "freiwillig; ÖPNV-Zuschuss pauschal 15 % versteuerbar", fehler: "eine gesetzliche Pflicht vermuten, wo keine ist" },
  ],
  decisionTitle: "Welche Regeln greifen bei dir? Der Entscheidungspfad",
  decisionIntro:
    "Nicht jede Regel betrifft jeden Betrieb gleich. Drei Fragen führen dich zu den Themen, die du zuerst klären solltest:",
  decisionPath: [
    {
      frage: "1. Wie sind deine Leute beschäftigt — Minijob oder Teilzeit/Vollzeit?",
      antwort:
        "Minijobber haben dieselben Rechte wie alle anderen: gesetzlicher Urlaub, Kündigungsfristen nach BGB, Lohnfortzahlung. Der Unterschied liegt nur in Steuer und Sozialversicherung. Bei Teilzeit wird der Urlaub anteilig nach Arbeitstagen berechnet — nicht nach Stunden.",
      slugs: ["urlaubsanspruch-minijob-gastronomie", "urlaubsanspruch-teilzeit-gastronomie", "kuendigung-minijob-gastronomie"],
    },
    {
      frage: "2. Arbeitet dein Team abends, sonntags oder an Feiertagen?",
      antwort:
        "Dann entscheidet § 3b EStG, wie viel von deinen Zuschlägen steuerfrei bleibt: bis 50 % sonntags, bis 125 % an Feiertagen, bis 25 % für Nachtarbeit ab 20 Uhr. Wichtig: Das Gesetz kennt nur Nacht, Sonntag und Feiertag — einen eigenen „Spätschichtzuschlag“ gibt es steuerlich nicht.",
      slugs: ["sonntagszuschlag-gastronomie", "feiertagszuschlag-gastronomie", "spaetschicht-zuschlag-gastronomie", "ueberstunden-steuerfrei-gastronomie"],
    },
    {
      frage: "3. Fallen regelmäßig lange Schichten oder Überstunden an?",
      antwort:
        "Dann sind drei Grenzen relevant: maximal 8 (bis 10) Stunden pro Tag, 48 Wochenstunden im 6-Monats-Schnitt, und Pausen ab 6 Stunden Arbeitszeit. Überstunden sind nach § 612 BGB grundsätzlich zu vergüten oder per Freizeit auszugleichen.",
      slugs: ["maximale-arbeitszeit-gastronomie", "arbeitsstunden-pro-monat-gastronomie", "pausenzeiten-gastronomie", "ueberstunden-auszahlen-gastronomie"],
    },
  ],
  faqTitle: "Die Einstiegsfragen",
  faq: [
    {
      q: "Gilt das Arbeitsrecht auch für kleine Betriebe mit zwei, drei Mitarbeitern?",
      a: "Ja. ArbZG, BUrlG und die Kündigungsfristen des BGB gelten unabhängig von der Betriebsgröße — vom ersten Mitarbeiter an. Nur einzelne Schutzvorschriften wie das Kündigungsschutzgesetz setzen Mindestgrößen voraus.",
      sourceSlug: "kuendigung-minijob-gastronomie",
    },
    {
      q: "Haben Minijobber Anspruch auf bezahlten Urlaub?",
      a: "Ja — nach § 1 BUrlG hat jeder Arbeitnehmer Anspruch auf bezahlten Urlaub, unabhängig von der Beschäftigungsform. Der volle Jahresanspruch entsteht nach sechs Monaten Wartezeit.",
      sourceSlug: "urlaubsanspruch-minijob-gastronomie",
    },
    {
      q: "Sind Zuschläge für Sonntagsarbeit Pflicht?",
      a: "Eine allgemeine gesetzliche Pflicht zu Sonntagszuschlägen gibt es nicht — sie entstehen durch Arbeits- oder Tarifvertrag. Wenn du sie zahlst, bleiben sie nach § 3b EStG bis 50 % des Grundlohns steuerfrei.",
      sourceSlug: "sonntagszuschlag-gastronomie",
    },
    {
      q: "Wie lange darf eine Schicht in der Gastronomie maximal dauern?",
      a: "Grundsätzlich 8 Stunden Arbeitszeit pro Tag. Eine Verlängerung auf bis zu 10 Stunden ist erlaubt, wenn der Schnitt innerhalb von sechs Monaten wieder auf 8 Stunden ausgeglichen wird. Pausen zählen nicht als Arbeitszeit.",
      sourceSlug: "maximale-arbeitszeit-gastronomie",
    },
    {
      q: "Was passiert mit dem Urlaub, wenn ein Mitarbeiter im Urlaub krank wird?",
      a: "Mit ärztlicher Bescheinigung dürfen die Krankheitstage nicht als Urlaubstage gezählt werden (§ 9 BUrlG) — sie wandern zurück auf das Urlaubskonto.",
      sourceSlug: "urlaubsanspruch-bei-krankheit-gastronomie",
    },
  ],
  outro: [
    "Arbeitsrecht ist in der Gastronomie kein Kann-Thema: Verstöße gegen Arbeitszeit- oder Pausenregeln zeigen sich spätestens bei einer Prüfung — und Fehler bei Urlaub oder Kündigung enden schnell vor dem Arbeitsgericht. Die gute Nachricht: Mit den vier Gesetzen aus dieser Übersicht sind die allermeisten Alltagsfragen abgedeckt.",
    "Alle Ratgeber dieser Kategorie findest du unten — jeder mit Rechenbeispielen, Vorlagen und den typischen Fallstricken aus der Praxis von über 800 Gastronomiebetrieben.",
  ],
};

/** Kategorie → Hub. Ein neuer Hub = ein Eintrag hier (Registry, s. Kopfkommentar). */
export const BLOG_HUBS: Record<string, BlogHub> = {
  [ARBEITSRECHT.category]: ARBEITSRECHT,
};

/** Hub-Pfad (ohne Host) für eine Kategorie — oder null, wenn kein Hub existiert. */
export function hubPathForCategory(category: string): string | null {
  const hub = BLOG_HUBS[category];
  return hub ? `/de/blog/thema/${hub.slug}` : null;
}

/** Hub per URL-Slug (für Router + Prerenderer). */
export function hubBySlug(slug: string): BlogHub | null {
  return Object.values(BLOG_HUBS).find((h) => h.slug === slug) ?? null;
}

// ─── Statischer HTML-Renderer (Prerenderer-Ebene) ────────────────────────────

const esc = (s: string): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export interface HubPostRef {
  slug: string;
  title: string;
}

export function renderHubStaticHtml(hub: BlogHub, categoryPosts: HubPostRef[]): string {
  const out: string[] = [];
  for (const p of hub.intro) out.push(`<p>${esc(p)}</p>`);
  out.push(`<h2>${esc(hub.lawTableTitle)}</h2>`);
  const rows = hub.lawTable
    .map(
      (r) =>
        `<tr><th scope="row"><a href="/de/blog/${r.sourceSlug}">${esc(r.thema)}</a></th>` +
        `<td>${esc(r.grundlage)}</td><td>${esc(r.grenzwert)}</td><td>${esc(r.fehler)}</td></tr>`,
    )
    .join("");
  out.push(
    `<table><thead><tr><th scope="col">Thema</th><th scope="col">Gesetzliche Grundlage</th><th scope="col">Frist / Grenzwert</th><th scope="col">Häufigster Fehler</th></tr></thead><tbody>${rows}</tbody></table>`,
  );
  out.push(`<h2>${esc(hub.decisionTitle)}</h2>`);
  out.push(`<p>${esc(hub.decisionIntro)}</p>`);
  for (const step of hub.decisionPath) {
    out.push(`<h3>${esc(step.frage)}</h3><p>${esc(step.antwort)}</p>`);
    out.push(
      `<ul>${step.slugs
        .map((s) => {
          const post = categoryPosts.find((p) => p.slug === s);
          return `<li><a href="/de/blog/${s}">${esc(post?.title ?? s)}</a></li>`;
        })
        .join("")}</ul>`,
    );
  }
  out.push(`<h2>${esc(hub.faqTitle)}</h2>`);
  for (const f of hub.faq) out.push(`<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`);
  for (const p of hub.outro) out.push(`<p>${esc(p)}</p>`);
  out.push(`<h2>Alle Ratgeber zu ${esc(hub.category)}</h2>`);
  out.push(
    `<ul>${categoryPosts
      .map((p) => `<li><a href="/de/blog/${p.slug}">${esc(p.title)}</a></li>`)
      .join("")}</ul>`,
  );
  return out.join("\n");
}

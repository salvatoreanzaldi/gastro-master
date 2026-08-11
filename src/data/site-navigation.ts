// Batch 7 Phase 0 — EINE QUELLE für die seitenweite Navigation.
//
// Bis Batch 6 lebten Navbar- und Footer-Links ausschließlich in den React-
// Komponenten. Der Prerenderer kennt React nicht (String-Templates), also
// stand in JEDER prerenderten Seite kein <footer> und fast kein interner Link:
// die Startseite gab in Googles erster Welle genau EINEN Link weiter, während
// das gerenderte DOM 146 hat. Ahrefs meldete daraufhin 9 Orphan Pages.
//
// Dieses Modul hält die Link-Struktur EINMAL. Es liest niemand nach, es rendert
// niemand nach: React-Navbar/-Footer lesen dieselben Arrays wie der
// Prerenderer, und die statische HTML-Fassung entsteht hier (Muster
// blog-hub-content.ts → renderHubStaticHtml), NICHT als zweiter String im
// Prerenderer. Genau diese Doppelpflege war die Wurzel fast jedes Fehlers.
//
// Sprachen: Links tragen den DE-Slug als kanonischen Schlüssel. Die Übersetzung
// macht der Aufrufer über routes.ts (React: useLangPath → buildLocalizedPath;
// Prerenderer: routeByDeSlug aus derselben Datei). buildHref allein würde nur
// das Präfix setzen und für en/it/fa/si/ru tote Links erzeugen — dieselbe Falle
// wie bei den Breadcrumbs in Batch 3, gelöst über denselben Weg.

export interface SiteNavLink {
  /** DE-Slug wie in src/config/routes.ts — Sprachvarianten leitet der Aufrufer ab. */
  deSlug: string;
  /** Fallback-Label (Produktnamen sind Eigennamen und bleiben unübersetzt). */
  label: string;
  /** Optionaler i18n-Pfad in common.json (Punktnotation, auch mit Array-Index). */
  i18nKey?: string;
  /** true = sprachneutrale Adresse ohne /<lang>-Präfix (z. B. /request-data-delete). */
  absolute?: boolean;
  /** Untergeordnete Einträge (im Footer eingerückt dargestellt). */
  children?: SiteNavLink[];
}

export interface SiteNavGroup {
  id: string;
  /** Gruppentitel; verlinkt auf `hubDeSlug`, falls die Gruppe eine Hub-Seite hat. */
  titleI18nKey: string;
  titleFallback: string;
  hubDeSlug?: string;
  links: SiteNavLink[];
}

/** Kopfzeile: die Top-Level-Ziele der Navbar (ohne Dropdown-Kinder). */
export const MAIN_NAV: SiteNavLink[] = [
  { deSlug: "/produkte", label: "Produkte", i18nKey: "nav.produkte" },
  { deSlug: "/loesungen", label: "Lösungen", i18nKey: "nav.loesungen" },
  { deSlug: "/preise", label: "Preise", i18nKey: "nav.preise" },
  { deSlug: "/uber-uns", label: "Über uns", i18nKey: "nav.ueberUns" },
  { deSlug: "/blog", label: "Blog" },
  { deSlug: "/kontakt", label: "Kontakt", i18nKey: "footer.kontakt" },
];

/** Pakete — Reihenfolge = Navbar-Dropdown = Footer-Spalte. */
export const PAKETE_LINKS: SiteNavLink[] = [
  { deSlug: "/produkte/pakete/online-bestellshop", label: "Online Shop" },
  { deSlug: "/produkte/pakete/bestell-app", label: "App System" },
  { deSlug: "/produkte/pakete/webseite", label: "Webseite" },
  { deSlug: "/produkte/pakete/kassensystem", label: "Kassensystem" },
];

/** Add-Ons — dieselbe Reihenfolge wie im Navbar-Dropdown. */
export const ADDON_LINKS: SiteNavLink[] = [
  { deSlug: "/produkte/add-ons/transaktionsumlage", label: "Transaktions-Umlage" },
  { deSlug: "/produkte/add-ons/qr-code-flyer", label: "QR-Code-Flyer" },
  { deSlug: "/produkte/add-ons/fahrer-app-gps", label: "Fahrer-App mit GPS" },
  { deSlug: "/produkte/add-ons/qr-code-tischsystem", label: "QR-Code-Tischsystem" },
  { deSlug: "/produkte/add-ons/bildschirmfunktion", label: "Kitchen Display" },
  { deSlug: "/produkte/add-ons/kiosk", label: "Self-Service-Kiosk" },
];

/** Lösungen — Labels kommen aus nav.loesItems[i].label. */
export const LOESUNGEN_LINKS: SiteNavLink[] = [
  { deSlug: "/loesungen/lieferservice-gruenden", label: "Lieferdienst gründen", i18nKey: "nav.loesItems.0.label" },
  { deSlug: "/loesungen/franchise", label: "Franchise", i18nKey: "nav.loesItems.1.label" },
  { deSlug: "/loesungen/restaurant", label: "Restaurant", i18nKey: "nav.loesItems.2.label" },
  { deSlug: "/loesungen/lieferdienst", label: "Lieferdienst", i18nKey: "nav.loesItems.3.label" },
  { deSlug: "/loesungen/cafe-baeckerei", label: "Café & Bäckerei", i18nKey: "nav.loesItems.4.label" },
  { deSlug: "/loesungen/ghost-kitchen", label: "Ghost Kitchen", i18nKey: "nav.loesItems.5.label" },
];

/** Produkt-Zwischenüberschriften im Footer (Pakete / Add-Ons / Hardware). */
export const PRODUKT_SUBGROUPS: { titleFallback: string; titleI18nKey: string; hubDeSlug?: string; links: SiteNavLink[] }[] = [
  { titleFallback: "Pakete", titleI18nKey: "nav.prodCategories.0.label", links: PAKETE_LINKS },
  // Batch 7 Phase 0.8: /produkte/add-ons war eine Orphan Page — der Hub stand
  // NUR im Navbar-Dropdown, das erst beim Klick rendert (im DOM 0 Links).
  // Als verlinkte Zwischenüberschrift hängt der ganze Add-On-Teilbaum wieder dran.
  { titleFallback: "Add-Ons", titleI18nKey: "nav.prodCategories.1.label", hubDeSlug: "/produkte/add-ons", links: ADDON_LINKS },
  { titleFallback: "Hardware", titleI18nKey: "nav.prodCategories.2.label", links: [{ deSlug: "/produkte/hardware", label: "Hardware" }] },
];

export const FOOTER_GROUPS: SiteNavGroup[] = [
  {
    id: "produkte",
    titleI18nKey: "footer.produkte",
    titleFallback: "Produkte",
    hubDeSlug: "/produkte",
    links: [...PAKETE_LINKS, { deSlug: "/produkte/add-ons", label: "Add-Ons" }, ...ADDON_LINKS, { deSlug: "/produkte/hardware", label: "Hardware" }],
  },
  {
    id: "loesungen",
    titleI18nKey: "footer.loesungen",
    titleFallback: "Lösungen",
    hubDeSlug: "/loesungen",
    links: LOESUNGEN_LINKS,
  },
  {
    id: "weiteres",
    titleI18nKey: "footer.weiteres",
    titleFallback: "Weiteres",
    links: [
      { deSlug: "/impressum", label: "Impressum", i18nKey: "footer.impressum" },
      { deSlug: "/datenschutz", label: "Datenschutz", i18nKey: "footer.datenschutz" },
      { deSlug: "/agb", label: "AGB", i18nKey: "footer.agb" },
      { deSlug: "/kontakt", label: "Kontakt", i18nKey: "footer.kontakt" },
      { deSlug: "/uber-uns", label: "Über uns", i18nKey: "footer.ueberUns" },
      { deSlug: "/faq", label: "FAQ" },
      // Stand vor Batch 7 genau EINMAL im gerenderten DOM (Slider-Sektion der
      // Startseite, IntegrationSliderSection.tsx) und in keiner rohen Seite.
      { deSlug: "/integrations", label: "Integrationen" },
      { deSlug: "/blog", label: "Blog" },
      {
        deSlug: "/downloads",
        label: "Downloads",
        i18nKey: "footer.downloads",
        // Batch 7 Phase 0.8: /downloads/druckertreiber ist im gerenderten DOM
        // verlinkt (Karte auf der Downloads-Seite), im ROHEN HTML aber nicht —
        // die Downloads-Seite selbst hat nur einen generischen Prerender.
        children: [{ deSlug: "/downloads/druckertreiber", label: "Druckertreiber" }],
      },
      // Pflichtseite für die App-Stores (Konto-/Datenlöschung), sprachneutral.
      // War in der Sitemap, aber nirgends verlinkt.
      { deSlug: "/request-data-delete", label: "Datenlöschung", absolute: true },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/gastromasterde" },
  { label: "YouTube", href: "https://youtube.com/@Gastro-Master" },
  { label: "Facebook", href: "https://facebook.com/gastromasterde" },
];

/** Label-Auflösung — React übergibt t(), der Prerenderer einen JSON-Resolver. */
export type LabelResolver = (i18nKey: string, fallback: string) => string;

export const navLabelOf = (link: { label: string; i18nKey?: string }, t?: LabelResolver): string =>
  link.i18nKey && t ? t(link.i18nKey, link.label) : link.label;

/* ────────────────────────────────────────────────────────────────────────────
   Statische HTML-Fassung (lebt INNERHALB von <div id="root"> und wird beim
   React-Mount ersetzt — deshalb keine Dublette nach der Hydration und kein
   verstecktes Markup, das dauerhaft im DOM bleibt).
   `href` übersetzt einen DE-Slug in die Zielsprache (Aufrufer-Sache, s. o.).
   ──────────────────────────────────────────────────────────────────────────── */

const esc = (s: string): string =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export interface StaticChromeOptions {
  lang: string;
  /** DE-Slug → fertiger Pfad in der Zielsprache, z. B. "/en/products/hardware". */
  href: (deSlug: string) => string;
  t?: LabelResolver;
  /** Jahr für die Copyright-Zeile (Prerenderer übergibt die Build-Zeit). */
  year?: number;
}

const linkHtml = (link: SiteNavLink, o: StaticChromeOptions, style: string): string =>
  `<a href="${link.absolute ? link.deSlug : o.href(link.deSlug)}" style="${style}">${esc(navLabelOf(link, o.t))}</a>`;

/** Kopfzeile: Marke + Top-Level-Navigation. */
export const renderStaticNavHtml = (o: StaticChromeOptions): string => {
  const items = MAIN_NAV.map((l) =>
    `<li style="display:inline-block;margin:0 0.9rem 0.4rem 0;">${linkHtml(l, o, "color:#0A264A;text-decoration:none;font-weight:600;")}</li>`,
  ).join("");
  return (
    `<nav class="static-chrome-nav" aria-label="Hauptnavigation" style="max-width:1100px;margin:0 auto;padding:1rem 1.5rem;font-family:system-ui,sans-serif;border-bottom:1px solid #e5e7eb;">` +
    `<a href="${o.href("/")}" style="color:#0A264A;text-decoration:none;font-weight:900;font-size:1.1rem;margin-right:1.5rem;">Gastro Master</a>` +
    `<ul style="list-style:none;display:inline;padding:0;margin:0;">${items}</ul>` +
    `</nav>`
  );
};

/** Fußzeile: vollständige Sitemap-Navigation als echtes <footer>-Element. */
export const renderStaticFooterHtml = (o: StaticChromeOptions): string => {
  const A = "color:rgba(255,255,255,0.75);text-decoration:none;";
  const columns = FOOTER_GROUPS.map((group) => {
    const title = group.hubDeSlug
      ? `<a href="${o.href(group.hubDeSlug)}" style="color:rgba(255,255,255,0.55);text-decoration:none;">${esc(navLabelOf({ label: group.titleFallback, i18nKey: group.titleI18nKey }, o.t))}</a>`
      : esc(navLabelOf({ label: group.titleFallback, i18nKey: group.titleI18nKey }, o.t));
    const items = group.links
      .map((l) => {
        const kids = (l.children ?? [])
          .map((c) => `<li style="margin:0.3rem 0 0 0.9rem;">${linkHtml(c, o, A)}</li>`)
          .join("");
        return `<li style="margin:0.35rem 0;">${linkHtml(l, o, A)}${kids ? `<ul style="list-style:none;padding:0;margin:0;">${kids}</ul>` : ""}</li>`;
      })
      .join("");
    return (
      `<div style="min-width:180px;">` +
      `<p style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.55);margin:0 0 0.75rem;">${title}</p>` +
      `<ul style="list-style:none;padding:0;margin:0;font-size:0.9rem;">${items}</ul>` +
      `</div>`
    );
  }).join("");
  const social = SOCIAL_LINKS.map(
    (s) => `<a href="${s.href}" rel="noopener noreferrer" style="${A}margin-right:0.75rem;">${esc(s.label)}</a>`,
  ).join("");
  return (
    `<footer class="static-chrome-footer" style="background:#0A264A;color:#fff;font-family:system-ui,sans-serif;margin-top:2rem;padding:2.5rem 1.5rem 2rem;">` +
    `<div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:2.5rem;">` +
    `<div style="min-width:180px;"><a href="${o.href("/")}" style="color:#fff;text-decoration:none;font-weight:900;font-size:1.1rem;">Gastro Master</a>` +
    `<p style="margin:0.75rem 0 0;font-size:0.85rem;">${social}</p></div>` +
    columns +
    `</div>` +
    `<p style="max-width:1100px;margin:2rem auto 0;font-size:0.8rem;color:rgba(255,255,255,0.4);">© ${o.year ?? 2026} Gastro Master. ${esc(o.t ? o.t("footer.rights", "Alle Rechte vorbehalten.") : "Alle Rechte vorbehalten.")}</p>` +
    `</footer>`
  );
};

/**
 * Generates src/data/blog-posts-generated.ts from Obsidian blog-exports.
 * Usage: node scripts/generate-blog-posts.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";

// Markdown → HTML config for flat-MD batches (Batch 21+).
// `mangle: false`/`headerIds: false`: keep clean HTML without injected anchor IDs.
// Inline HTML (callout boxes, disclaimers) passes through unchanged.
marked.setOptions({ mangle: false, headerIds: false });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const BLOG_EXPORTS_DIR =
  "/Users/salvatore/Desktop/Obsidian/Obsidian/04 Ressourcen/blog-exports";

const BATCH_DIRS = [
  "batch-01-bestellsysteme",
  "batch-02-bestellsysteme",
  "batch-03-bestellsysteme",
  "batch-04-cluster1-2-uebergang",
  "batch-05-cluster2-compliance",
  "batch-06-cluster2-3-uebergang",
  "batch-07-cluster3-marketing",
  "batch-08-cluster3-marketing",
  "batch-09-cluster3-4-uebergang",
  "batch-10-cluster4-hr",
  "batch-11-cluster4-5-uebergang",
  "batch-12-cluster5-finanzen",
  "batch-13-cluster5-6-uebergang",
  "batch-14-cluster6-gruendung",
  "batch-15-cluster6-7-uebergang",
  "batch-16-cluster7-trends",
  "batch-17-cluster7-8-uebergang",
  "batch-18-cluster8-betrieb-service",
  "batch-19-cluster8-9-uebergang",
  "batch-20-cluster9-finale",
  "batch-21-migrations-altsite",
  "batch-22-plattformen",
];

/**
 * Slug → Category-Label-Mapping für Batch 21 (flat-MD-Format).
 * Die YAML-cluster-Werte ("21-migrations-altsite") matchen keine
 * kanonische Kategorie — daher slug-basiertes Override-Mapping.
 * Kategorien-Labels matchen src/config/blog-categories.ts.
 */
const FLAT_MD_CATEGORY_BY_SLUG = {
  "darf-man-mit-14-in-der-gastronomie-arbeiten": "Personal & Schulung",
  "lieferando-geld-zurueckfordern": "Lieferservice",
  "essen-bestellen-mit-klarna": "Finanzen",
  "lieferando-portal-richtig-nutzen": "Lieferservice",
  "speisekarte-mit-bildern-erstellen": "Website & Marketing",
  "wolt-vs-lieferando": "Lieferservice",
  "wolt-fahrer-arbeitsbedingungen": "Lieferservice",
  "witzige-restaurant-namen": "Website & Marketing",
  "wie-viele-pizzen-verkauft-pizzeria-pro-tag": "Betrieb & Service",
  "lieferando-partner-werden-vor-und-nachteile": "Lieferservice",
  "beste-bestell-apps-deutschland-2026": "Bestellsysteme",
  "lieferando-bewertung-loeschen-antworten": "Lieferservice",
  "lieferando-mindestbestellwert-richtig-setzen": "Lieferservice",
  "ferienjob-gastronomie-rechtliche-grundlagen-2026": "Personal & Schulung",
  "paypal-beim-essen-bestellen-restaurant-vorteile": "Finanzen",
  "bnpl-im-lieferdienst-vergleich": "Finanzen",
  "lieferando-bestellung-storniert-restaurant-perspektive": "Lieferservice",
  // Batch 22 — Plattformen (Wolt / Uber Eats / Lieferando; Consumer + B2B-Bridge)
  "wolt-geld-zurueckfordern": "Lieferservice",
  "uber-eats-geld-zurueckfordern": "Lieferservice",
  "lieferando-kundenservice-telefonnummer": "Lieferservice",
  "wolt-kundenservice-telefonnummer": "Lieferservice",
  "wolt-kuendigen": "Lieferservice",
  "uber-eats-kuendigen": "Lieferservice",
  "wolt-bestellung-stornieren": "Lieferservice",
  "uber-eats-bestellung-stornieren": "Lieferservice",
  "wolt-provision-restaurant-2026": "Lieferservice",
  "uber-eats-provision-restaurant-2026": "Lieferservice",
  "lieferando-restaurant-kuendigen": "Lieferservice",
};

/**
 * Normalize meta: handle both top-level fields and nested post_meta format.
 * Returns a unified flat object with all fields we need.
 */
function normalizeMeta(raw) {
  // If top-level slug exists, it's a standard format
  if (raw.slug) return raw;

  // Nested format: fields live inside post_meta (and other sub-objects)
  if (raw.post_meta && typeof raw.post_meta === "object") {
    const pm = raw.post_meta;
    const seo = raw.meta_seo || {};

    // Collect product links from produktlinks_audit
    const productLinks = [];
    if (raw.produktlinks_audit?.links) {
      for (const l of raw.produktlinks_audit.links) {
        if (l.url) productLinks.push(l.url.replace(/^https?:\/\/gastro-master\.de/, ""));
      }
    }

    return {
      post_id: pm.position || null,
      slug: pm.slug,
      title: pm.title || pm.h1_title,
      meta_description: seo.meta_description || pm.meta_description,
      meta_tags: seo.meta_title
        ? { meta_description: seo.meta_description }
        : null,
      publish_date: pm.publish_date,
      cluster: pm.cluster,
      main_keyword: pm.focus_keyword ? { term: pm.focus_keyword } : null,
      secondary_keywords: pm.secondary_keywords || [],
      categories: pm.categories || [],
      tags: pm.tags || [],
      reading_time_minutes: pm.reading_time_minutes,
      internal_links: {
        product_links_unique: productLinks,
      },
    };
  }

  return raw;
}

const CATEGORY_MAP = {
  // Bestellsysteme
  "Bestellsysteme": "Bestellsysteme",
  "Cluster 1": "Bestellsysteme",
  "Bestellsysteme & Lieferservice": "Bestellsysteme",
  "Bestellsysteme-Lieferservice": "Bestellsysteme",
  "bestellsysteme-lieferservice": "Bestellsysteme",
  // Lieferservice
  "Lieferservice": "Lieferservice",
  // Website & Marketing
  "Website & Marketing": "Website & Marketing",
  "Cluster 3": "Website & Marketing",
  "Marketing & Sichtbarkeit": "Website & Marketing",
  "marketing": "Website & Marketing",
  "marketing-sichtbarkeit": "Website & Marketing",
  "Marketing & Sichtbarkeit (Übergang zu Cluster 4)": "Website & Marketing",
  "Marketing & Sichtbarkeit (Cluster-Start)": "Website & Marketing",
  "→ 3 Übergang": "Website & Marketing",
  "→ 3 (Übergang)": "Website & Marketing",
  "3-uebergang": "Website & Marketing",
  // Recht & Compliance
  "Recht & Compliance": "Recht & Compliance",
  "Cluster 2": "Recht & Compliance",
  "Compliance": "Recht & Compliance",
  "Kassensysteme & Compliance": "Recht & Compliance",
  // Personal & Schulung
  "Personal & Schulung": "Personal & Schulung",
  "Cluster 4": "Personal & Schulung",
  "HR": "Personal & Schulung",
  "HR & Personal": "Personal & Schulung",
  "Personal & HR (Cluster-Start)": "Personal & Schulung",
  "Cluster 4 — HR & Personal": "Personal & Schulung",
  "→ 4 (Übergang)": "Personal & Schulung",
  // Finanzen
  "Finanzen": "Finanzen",
  "finanzen": "Finanzen",
  "Cluster 5": "Finanzen",
  "Finanzen & BWL": "Finanzen",
  "finanzen-bwl": "Finanzen",
  // Gründung
  "Gründung": "Gründung",
  "Gruendung": "Gründung",
  "gruendung": "Gründung",
  "Cluster 6 Gründung (Abschluss)": "Gründung",
  // Betrieb & Service
  "Betrieb & Service": "Betrieb & Service",
  "Cluster 8": "Betrieb & Service",
  "Spezial & Long-Tail": "Betrieb & Service",
  // Trends & Zukunft
  "Trends & Zukunft": "Trends & Zukunft",
  "Trends & Zukunft (Speisen-Fokus)": "Trends & Zukunft",
  "Cluster 7": "Trends & Zukunft",
};

function normalizeCategory(raw) {
  if (!raw) return "Betrieb & Service";
  const trimmed = raw.trim();
  return CATEGORY_MAP[trimmed] ?? trimmed;
}

/**
 * Simplify a cluster string like "1 Bestellsysteme" → "Bestellsysteme"
 * or "3 — Marketing & Sichtbarkeit" → "Marketing & Sichtbarkeit"
 * or "4" → "Cluster 4"
 */
function simplifyCluster(clusterRaw) {
  if (!clusterRaw) return "Betrieb & Service";
  const s = String(clusterRaw).trim();
  // Remove leading number + optional separators (spaces, dashes, em-dashes, —)
  const match = s.match(/^\d+\s*[—\-–]?\s*(.*)/);
  if (match && match[1].trim()) {
    return match[1].trim();
  }
  // Fallback if only a number
  if (/^\d+$/.test(s)) return `Cluster ${s}`;
  return s;
}

/**
 * Convert a URL like "/produkte/pakete/online-bestellshop" to a title
 */
function urlToTitle(url) {
  const segments = url.replace(/\/$/, "").split("/");
  const last = segments[segments.length - 1];
  if (!last) return url;
  const withSpaces = last.replace(/-/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

/**
 * Extract product link URLs from a meta.json's internal_links field.
 * Handles many different formats across batches.
 */
function extractProductLinks(internalLinks) {
  if (!internalLinks || typeof internalLinks !== "object") return [];

  // Format: { product_links_unique: ["/produkte/..."] }
  if (Array.isArray(internalLinks.product_links_unique)) {
    return internalLinks.product_links_unique.filter(
      (u) => typeof u === "string"
    );
  }

  // Format: { product_links_unique: { links: [{url: "https://gastro-master.de/..."}] } }
  if (
    internalLinks.product_links_unique &&
    typeof internalLinks.product_links_unique === "object" &&
    Array.isArray(internalLinks.product_links_unique.links)
  ) {
    return internalLinks.product_links_unique.links
      .map((l) => {
        const u = l.url || "";
        return u.replace(/^https?:\/\/gastro-master\.de/, "");
      })
      .filter(Boolean);
  }

  // Format: { product_urls: ["https://gastro-master.de/..."] }
  if (Array.isArray(internalLinks.product_urls)) {
    return internalLinks.product_urls
      .map((u) => u.replace(/^https?:\/\/gastro-master\.de/, ""))
      .filter(Boolean);
  }

  // Format: { products: ["/produkte/..."] }
  if (Array.isArray(internalLinks.products)) {
    return internalLinks.products.filter((u) => typeof u === "string");
  }

  // Format: { product_links_detail: [{url: "/produkte/..."}] }
  if (Array.isArray(internalLinks.product_links_detail)) {
    return internalLinks.product_links_detail
      .map((l) => {
        const u = l.url || "";
        return u.replace(/^https?:\/\/gastro-master\.de/, "");
      })
      .filter(Boolean);
  }

  return [];
}

/**
 * Clean the wordpress HTML body:
 * - Remove <!-- wp:... --> and <!-- /wp:... --> comments
 * - Remove <script> tags (including JSON-LD)
 * - Remove HTML comments <!-- ... -->
 * - Remove the first <h1>...</h1>
 * - Remove <p class="post-meta">...</p>
 * - Replace "TL;DR" variants with "Das Wichtigste auf einen Blick"
 * - Remove Hook/Hook-Intro pseudo-headings (writing-prompt residue)
 * - Trim and remove empty leading/trailing lines
 */
function cleanBodyHtml(html) {
  let result = html;

  // Remove WordPress block comments (both inline and multiline)
  result = result.replace(/<!--\s*\/?wp:[^>]*-->/g, "");

  // Remove <script> tags (including JSON-LD blocks)
  result = result.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // Remove remaining HTML comments
  result = result.replace(/<!--[\s\S]*?-->/g, "");

  // Remove the first <h1>...</h1> occurrence
  result = result.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");

  // Remove <p class="post-meta">...</p>
  result = result.replace(/<p[^>]*class="post-meta"[^>]*>[\s\S]*?<\/p>/gi, "");

  // Remove author-signature divs (contain wrong author attribution — Salvatore Anzaldi)
  result = result.replace(/<div[^>]*class="[^"]*author-signature[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");

  // Remove related-posts sections (redundant navigation block)
  result = result.replace(/<section[^>]*class="[^"]*related-posts[^"]*"[^>]*>[\s\S]*?<\/section>/gi, "");

  // Remove any line containing wrong author attribution "Salvatore Anzaldi"
  result = result.split("\n").filter((l) => !l.includes("Salvatore Anzaldi")).join("\n");

  // Remove "Hook" and "Hook-Intro" pseudo-headings (writing-prompt artifacts)
  // Covers: <h2>Hook</h2>, <h2>Hook: ...</h2>, <h2>Hook-Intro</h2>, <h2>Hook — ...</h2>, <h2 id="hook">Hook</h2>
  result = result.replace(/<h[1-6][^>]*>\s*Hook(-Intro)?\s*(:|—|&mdash;|-)?\s*[\s\S]*?<\/h[1-6]>/gi, "");

  // Normalize internal links from absolute gastro-master.de URLs to locale-prefixed paths
  // (keeps JSON-LD @id anchors + logo.png intact because JSON-LD <script> was stripped above)
  // Special case: #bewertungen anchor on /uber-uns → external Google reviews
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/uber-uns#bewertungen/g, "https://g.page/r/CdCNZ5Fg01PBEBM/review");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/uber-uns/g, "/de/uber-uns");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/kontakt/g, "/de/kontakt");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/loesungen/g, "/de/loesungen");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/produkte/g, "/de/produkte");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/blog\//g, "/de/blog/");
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/blog(?=["\s<])/g, "/de/blog");
  // Drop wp-content legacy paths to avoid 404s (logo stays intact in JSON-LD context)
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/wp-content\/[^"\s]*/g, "");
  // Trailing base-URL cleanup (but leave the domain in strong/JSON-like contexts that escape stripping here)
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de\/(?=["'\s<])/g, "/de/");
  // Bare domain without trailing slash (e.g. href="https://gastro-master.de">text</a>)
  result = result.replace(/https?:\/\/(?:www\.)?gastro-master\.de(?=["'\s<])/g, "/de");
  // For "Alle Bewertungen lesen" link target="_blank" — ensure it's external-safe
  result = result.replace(
    /<a([^>]*?)href="https:\/\/g\.page\/r\/CdCNZ5Fg01PBEBM\/review"([^>]*)>/g,
    '<a$1href="https://g.page/r/CdCNZ5Fg01PBEBM/review" target="_blank" rel="noopener noreferrer"$2>'
  );
  // De-duplicate target/rel attrs in case already present
  result = result.replace(/(target="_blank")([^>]*?)(target="_blank")/g, "$1$2");
  result = result.replace(/(rel="noopener noreferrer")([^>]*?)(rel="noopener noreferrer")/g, "$1$2");

  // Replace TL;DR variants with German equivalent — CASE-SENSITIVE to avoid
  // matching lowercase `tldr-box` class names. Matches: "TL;DR", "TL;DR —", "TL;DR:"
  result = result.replace(/\bTL;?DR\b\s*(?:—|&mdash;|-|:)?\s*/g, "Das Wichtigste auf einen Blick ");
  // Clean up double spaces / trailing spaces from replacement
  result = result.replace(/Das Wichtigste auf einen Blick\s+Das Wichtigste auf einen Blick/g, "Das Wichtigste auf einen Blick");

  // Collapse multiple blank lines into single blank lines
  result = result.replace(/\n{3,}/g, "\n\n");

  // Trim leading/trailing whitespace
  result = result.trim();

  return result;
}

/**
 * Decode common HTML entities to plain UTF-8 characters.
 */
function decodeHtmlEntities(str) {
  return str
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&bdquo;/g, "„")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&auml;/g, "ä")
    .replace(/&ouml;/g, "ö")
    .replace(/&uuml;/g, "ü")
    .replace(/&Auml;/g, "Ä")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&szlig;/g, "ß")
    .replace(/&amp;/g, "&");
}

/**
 * Generate a human-readable excerpt (≤160 chars) for BlogCard.
 * Strategy: find first clean <p>, skip callouts/lists/headings,
 * skip paragraphs with heavy compliance markers (§§).
 */
function generateExcerpt(bodyHtml, title) {
  const fallback = `Praxiswissen zu „${title}" — kompakt, aktuell und auf den Punkt.`;
  if (!bodyHtml) return fallback;

  let html = bodyHtml;
  // Remove all callout blocks, lists, tables, blockquotes, headings, figures
  html = html.replace(/<aside[\s\S]*?<\/aside>/gi, "");
  html = html.replace(/<(ul|ol|table|figure|blockquote)[\s\S]*?<\/\1>/gi, "");
  html = html.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, "");
  html = html.replace(/<(div|section)[^>]*class="[^"]*(tldr|callout|hinweis|warnung|info-box)[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, "");

  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];

  const truncate = (text) => {
    if (text.length <= 160) return text;
    const cut = text.substring(0, 160);
    const lastSpace = cut.lastIndexOf(" ");
    const body = lastSpace > 100 ? cut.substring(0, lastSpace) : cut;
    return body.replace(/[,;:—–\-]+$/, "").trim() + "…";
  };

  const cleanPara = (raw) => {
    let t = raw.replace(/<[^>]+>/g, "").trim();
    t = decodeHtmlEntities(t);
    t = t.replace(/\s+/g, " ").trim();
    return t;
  };

  const isMetaOrDisclaimer = (t) => {
    // Post-meta lines (Veröffentlicht / Letztes Update / Autor / Lesezeit)
    if (/^(Letztes Update|Veröffentlicht|Aktualisiert|Update|Autor|Lesezeit)[\s:·]/i.test(t)) return true;
    if (/·\s*(Autor|Lesezeit|von\s+\w+)/i.test(t) && t.length < 180) return true;
    // Disclaimers / legal hedges
    if (/^(Dieser (Artikel|Beitrag|Text) (dient|ersetzt|stellt|ist))/i.test(t)) return true;
    if (/ersetzt keine\s+(steuer|rechts|arbeits|juristisch)/i.test(t)) return true;
    if (/^(Haftungsausschluss|Rechtlicher Hinweis|Disclaimer|Quelle|Hinweis|Stand):/i.test(t)) return true;
    return false;
  };

  // Pass 1: strictly clean paragraphs (no §, no compliance intros, no meta/disclaimers)
  for (const m of pMatches) {
    const t = cleanPara(m[1]);
    if (t.length < 60) continue;
    if (t.includes("§")) continue;
    if (isMetaOrDisclaimer(t)) continue;
    return truncate(t);
  }

  // Pass 2: relaxed — strip §-parentheticals and abbreviation ballast
  for (const m of pMatches) {
    let t = cleanPara(m[1]);
    if (isMetaOrDisclaimer(t)) continue;
    t = t.replace(/\([^)]*§[^)]*\)/g, "");
    t = t.replace(/§+\s*\d+[a-zA-Z]*(\s*(?:Abs\.|Nr\.|S\.|ff\.?)\s*\d*)*/g, "");
    t = t.replace(/\s+/g, " ").trim().replace(/\s*,\s*,/g, ",");
    if (t.length < 40) continue;
    return truncate(t);
  }

  return fallback;
}

// ─── Schema.org constants ────────────────────────────────────────────────────

const SITE_BASE = "https://gastro-master.de";
const LOGO_URL = `${SITE_BASE}/logo-gastro-master.png`;
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 1024;

// ─── Welle F: Per-post hero covers (public/blog-covers/{slug}.webp + .jpg) ───
// Covers werden zentral aus Slug + Datei-Existenz abgeleitet — kein Frontmatter-
// Feld nötig, Regeneration bleibt verlustfrei. Fehlt ein Bild-Paar, fällt der
// Post automatisch auf das Logo zurück (B.3 in fixJsonLdMeta).

const COVERS_DIR = resolve(ROOT, "public/blog-covers");
const COVER_WIDTH = 1200;
const COVER_HEIGHT = 630;

// Cluster-Motiv → deutsche Alt-Text-Beschreibung (Welle-F-Motiv-Library).
const COVER_ALT_BY_MOTIF = {
  bestellsysteme: "Hände verpacken Pizza-Karton in warmer Restaurant-Küche",
  pos: "Modernes Kassensystem auf Holz-Counter in warmem Bistro",
  compliance: "Koch mit Klemmbrett in warmer Profi-Küche",
  marketing: "Warmes Restaurant von außen bei Dämmerung mit einladenden Fenstern",
  hr: "Restaurant-Team beim gemeinsamen Anrichten von Pasta in moderner Küche",
  finanzen: "Restaurant-Inhaber am Fenster mit Espresso und Münzstapel in modernem Bistro",
  gruendung: "Hände öffnen Tür zu warmem modernen Restaurant im Morgenlicht",
  trends: "Modernes warmes Restaurant-Interior mit Tablet und zeitgemäßem Design",
  betrieb: "Chef beim präzisen Anrichten eines Gerichts in warmer Küche",
  lieferservice: "Lieferbote nimmt Pizza-Karton am Restaurant-Counter entgegen",
  cafe: "Barista bereitet Espresso in modernem warmen Café",
  fallback: "Warme moderne Restaurant-Szene mit einladender Atmosphäre",
};

// Kategorie → Motiv-Key (identisch zur F1-Bild-Generierung; Slug-Overrides s.u.)
const COVER_MOTIF_BY_CATEGORY = {
  "Bestellsysteme": "bestellsysteme",
  "Website & Marketing": "marketing",
  "Betrieb & Service": "betrieb",
  "Finanzen": "finanzen",
  "Personal & Schulung": "hr",
  "Gründung": "gruendung",
  "Trends & Zukunft": "trends",
  "Lieferservice": "lieferservice",
  "Recht & Compliance": "compliance",
};

function coverMotifKey(slug, category) {
  // Slug-Sub-Routing analog F1 (spezifischeres Motiv schlägt Kategorie)
  if (/kassensicherungsverordnung|kassensystem|kassenbuch|(^|-)tse(-|$)/.test(slug)) return "pos";
  if (/(^|-)cafe(-|$)|^cafe-|-cafe$|kleines-cafe|nachhaltiges-cafe|barista/.test(slug)) return "cafe";
  return COVER_MOTIF_BY_CATEGORY[category] || "fallback";
}

/**
 * Alt-Text: "{Titel-Kurzform}: {Motiv-Beschreibung}", hart auf 125 Zeichen
 * gekappt (Barrierefreiheits-Standard). Titel-Kurzform = erstes Titel-Segment
 * vor ":" / "—" / "–" / "|", bei Bedarf an Wortgrenze gekürzt.
 */
function buildCoverAlt(title, motifKey) {
  const motif = COVER_ALT_BY_MOTIF[motifKey] || COVER_ALT_BY_MOTIF.fallback;
  let theme = String(title || "").split(/[:—–|]/)[0].trim();
  const budget = 125 - motif.length - 2; // ": "
  if (theme.length > budget) {
    theme = theme.slice(0, budget + 1);
    const cut = theme.lastIndexOf(" ");
    theme = (cut > 20 ? theme.slice(0, cut) : theme.slice(0, budget)).trim();
  }
  return theme ? `${theme}: ${motif}` : motif;
}

/**
 * Liefert Cover-Infos für einen Slug oder null, wenn das Bild-Paar fehlt.
 */
function resolveCover(slug, category, title) {
  const webp = join(COVERS_DIR, `${slug}.webp`);
  const jpg = join(COVERS_DIR, `${slug}.jpg`);
  if (!existsSync(webp) || !existsSync(jpg)) return null;
  const motifKey = coverMotifKey(slug, category);
  return {
    image: `/blog-covers/${slug}.webp`,
    fallback: `/blog-covers/${slug}.jpg`,
    alt: buildCoverAlt(title, motifKey),
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
  };
}

const AUTHOR_RENE = {
  "@type": "Person",
  "name": "René Ebert",
  "url": `${SITE_BASE}/uber-uns`,
  "image": `${SITE_BASE}/team/rene-ebert.png`,
};
const AUTHOR_SANJAYA = {
  "@type": "Person",
  "name": "Sanjaya Pattiyage",
  "url": `${SITE_BASE}/uber-uns`,
  "image": `${SITE_BASE}/team/sanjaya-pattiyage.png`,
};
const AUTHOR_SALVATORE = {
  "@type": "Person",
  "name": "Salvatore Anzaldi",
  "url": `${SITE_BASE}/uber-uns`,
  "image": `${SITE_BASE}/team/salvatore-anzaldi.png`,
};

// Slugs whose Author is Salvatore Anzaldi — parsed from src/config/blog-authors.ts
// (single source of truth shared with the UI AuthorBox).
const SALVATORE_SLUGS = (() => {
  const source = readFileSync(
    resolve(ROOT, "src/config/blog-authors.ts"),
    "utf-8",
  );
  const match = source.match(/SALVATORE_SLUGS\s*=\s*new\s+Set<string>\(\s*\[([\s\S]*?)\]\s*\)/);
  if (!match) {
    throw new Error("Could not parse SALVATORE_SLUGS from src/config/blog-authors.ts");
  }
  const slugs = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return new Set(slugs);
})();

const CONTENT_NODE_TYPES = new Set([
  "Article",
  "BlogPosting",
  "NewsArticle",
  "TechArticle",
  "ScholarlyArticle",
]);

function isContentNode(node) {
  const t = node["@type"];
  if (typeof t !== "string") return false;
  return CONTENT_NODE_TYPES.has(t) || t.endsWith("Article");
}

/**
 * Count words in HTML body (strip tags, decode entities, split on whitespace).
 */
function countWords(html) {
  if (!html) return 0;
  const text = decodeHtmlEntities(
    html.replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
  );
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

/**
 * Extract JSON-LD content from HTML. Returns the raw JSON string,
 * or "" if no <script type="application/ld+json"> block exists.
 * (Schema fixes are applied by the caller via fixJsonLdMeta.)
 */
function extractJsonLd(html) {
  const match = html.match(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i
  );
  if (!match) return "";
  return match[1].trim();
}

/**
 * Build a minimal Article skeleton when the source HTML has no JSON-LD block.
 * Author/publisher/image/mainEntityOfPage are stubs — fixJsonLdMeta fills them
 * with deterministic values afterwards.
 */
function buildFallbackJsonLd({ title, description, datePublished }) {
  const obj = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": "",
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": [],
    "publisher": { "@type": "Organization", "name": "Gastro Master" },
    "mainEntityOfPage": "",
  };
  return JSON.stringify(obj);
}

/**
 * Apply all schema corrections to a parsed jsonLd string.
 * ctx: { slug, bodyHtml, isSalvatore }
 *
 * Fixes:
 *   B.1 publisher.logo → deterministic logo URL with width/height
 *   B.2 mainEntityOfPage.@id → /de/blog/{slug}
 *   B.3 image → per-post cover ImageObject (Welle F); logo fallback wenn kein Cover
 *   B.4 inLanguage = "de-DE" on Article/BlogPosting nodes
 *   B.5 wordCount on Article/BlogPosting nodes
 *   B.6 Person.image for author objects
 *   B.7 author override based on isSalvatore flag
 *   B.8 headline sync — wenn ctx.title gesetzt ist, überschreibt es alle node.headline
 *       (Source-of-Truth: aktuelle post.title, nicht inline-jsonLd-headline)
 */
function fixJsonLdMeta(jsonLdStr, ctx) {
  if (!jsonLdStr) return jsonLdStr;
  try {
    const obj = JSON.parse(jsonLdStr);
    const { slug, bodyHtml, isSalvatore, title, cover } = ctx;
    const wordCount = countWords(bodyHtml);
    const correctAuthors = isSalvatore
      ? [AUTHOR_SALVATORE]
      : [AUTHOR_RENE, AUTHOR_SANJAYA];
    const canonicalUrl = `${SITE_BASE}/de/blog/${slug}`;

    const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];

    for (const node of nodes) {
      // B.8 — headline sync (only on Article/BlogPosting/etc., not Organization/FAQPage)
      if (title && typeof node["@type"] === "string"
          && (node["@type"].endsWith("Article") || node["@type"] === "BlogPosting" || node["@type"] === "NewsArticle")
          && typeof node.headline === "string"
          && node.headline !== title) {
        node.headline = title;
      }

      // B.1 — publisher.logo (on any node with publisher object)
      if (node.publisher && typeof node.publisher === "object" && !Array.isArray(node.publisher)) {
        node.publisher.logo = {
          "@type": "ImageObject",
          "url": LOGO_URL,
          "width": LOGO_WIDTH,
          "height": LOGO_HEIGHT,
        };
      }

      // B.1 (Organization-level logo)
      if (node["@type"] === "Organization") {
        if (typeof node.logo === "string" || (node.logo && typeof node.logo === "object")) {
          node.logo = {
            "@type": "ImageObject",
            "url": LOGO_URL,
            "width": LOGO_WIDTH,
            "height": LOGO_HEIGHT,
          };
        }
      }

      if (isContentNode(node)) {
        // B.9 — SpeakableSpecification (Welle C: AI-Citation-Boost)
        // Setzt cssSelector auf ".quotable" — alle <blockquote class="quotable">-Markups
        // im Body werden so für Voice-Assistants + LLM-Citation als zitierbar markiert.
        node.speakable = {
          "@type": "SpeakableSpecification",
          "cssSelector": [".quotable"],
        };

        // B.2 — mainEntityOfPage.@id (always Object format with @type: WebPage)
        if (typeof node.mainEntityOfPage === "string") {
          node.mainEntityOfPage = { "@type": "WebPage", "@id": canonicalUrl };
        } else if (node.mainEntityOfPage && typeof node.mainEntityOfPage === "object") {
          node.mainEntityOfPage["@id"] = canonicalUrl;
          node.mainEntityOfPage["@type"] = node.mainEntityOfPage["@type"] || "WebPage";
        } else {
          node.mainEntityOfPage = {
            "@type": "WebPage",
            "@id": canonicalUrl,
          };
        }

        // B.3 — image: per-post Cover-ImageObject (Welle F), Logo nur als Fallback
        node.image = cover
          ? {
              "@type": "ImageObject",
              "@id": `${SITE_BASE}${cover.image}#image`,
              "url": `${SITE_BASE}${cover.image}`,
              "contentUrl": `${SITE_BASE}${cover.image}`,
              "width": cover.width,
              "height": cover.height,
              "caption": cover.alt,
              "encodingFormat": "image/webp",
            }
          : {
              "@type": "ImageObject",
              "url": LOGO_URL,
              "width": LOGO_WIDTH,
              "height": LOGO_HEIGHT,
            };

        // B.4 — inLanguage
        node.inLanguage = "de-DE";

        // B.5 — wordCount
        if (wordCount > 0) {
          node.wordCount = wordCount;
        }

        // B.6 + B.7 — author with image
        node.author = correctAuthors;
      }
    }

    // GSC-Fix 2026-07-22 („Die Rezension hat mehrere zusammengefasste Bewertungen"):
    // Manche Post-@graphs enthalten eine self-serving Organization mit eigener
    // aggregateRating (stale 4,9). Diese dupliziert die site-weite Organization
    // (#organization, 5,0/131 aus dem Prerenderer) — gleiche Entität, zwei
    // aggregateRating → Google flaggt „mehrere Bewertungen". Die aggregateRating
    // gehört ausschließlich in den site-weiten Graph, nicht pro Blog-Post.
    if (Array.isArray(obj["@graph"])) {
      // Reine self-serving Organization-Knoten (nur zum Tragen der Rating) ganz raus.
      obj["@graph"] = obj["@graph"].filter(
        (n) => !(n && n["@type"] === "Organization" && "aggregateRating" in n),
      );
    }
    // Verbleibende aggregateRating (z. B. auf Article oder verschachtelter
    // Organization) rekursiv entfernen — pro Blog-Post darf es keine geben.
    const stripAggregateRating = (o) => {
      if (Array.isArray(o)) return o.forEach(stripAggregateRating);
      if (o && typeof o === "object") {
        delete o.aggregateRating;
        Object.values(o).forEach(stripAggregateRating);
      }
    };
    stripAggregateRating(obj);

    return JSON.stringify(obj, null, 2);
  } catch {
    return jsonLdStr;
  }
}

/**
 * Get the title from meta — prefers the longer `title` or `h1_title`, falls back to `meta_title`
 */
function getTitle(meta) {
  // Priorität: title > h1_title > h1_titel (deutsche Schreibweise — Legacy-Aliase
  // aus alten Batch-Meta-Files) > meta_title > slug-Fallback.
  return meta.title || meta.h1_title || meta.h1_titel || meta.meta_title || meta.slug || "";
}

/**
 * Get description from meta
 */
function getDescription(meta) {
  return (
    meta.meta_tags?.meta_description ||
    meta.meta_description ||
    getTitle(meta)
  );
}

/**
 * Get secondary keywords from meta (various formats)
 */
function getSecondaryKeywords(meta) {
  if (Array.isArray(meta.secondary_keywords)) return meta.secondary_keywords;
  return [];
}

/**
 * Get reading time
 */
function getReadingTime(meta) {
  return (
    meta.reading_time_minutes ||
    meta.reading_time_min ||
    meta.reading_time ||
    10
  );
}

/**
 * Get cluster/category — returns one of the 9 canonical labels
 */
function getCategory(meta) {
  if (meta.cluster) return normalizeCategory(simplifyCluster(meta.cluster));
  if (Array.isArray(meta.categories) && meta.categories.length > 0)
    return normalizeCategory(meta.categories[0]);
  return "Betrieb & Service";
}

/**
 * Parse a flat-Markdown file (Batch 21+ format): YAML-frontmatter + Markdown body.
 * Returns a normalized meta object + HTML-converted body, compatible with the
 * meta.json / wordpress.html pipeline used by Batches 1-20.
 *
 * Returns null if frontmatter is invalid (e.g., no slug).
 */
/**
 * Slugify a heading text into a stable anchor-id. Matches TOC-Listenpunkte
 * gegen H2-Headings: führendes "N. " wird entfernt, Umlaute transkribiert,
 * dann lowercase + dash-separated.
 *
 * Beispiel:
 *   slugifyHeading("1. Die kurze Antwort vorab") → "die-kurze-antwort-vorab"
 *   slugifyHeading("Die kurze Antwort vorab")    → "die-kurze-antwort-vorab"  (matcht!)
 *   slugifyHeading("Inhaltsverzeichnis")          → "inhaltsverzeichnis"
 */
function slugifyHeading(text) {
  return String(text)
    .replace(/^\s*\d+\.\s+/, "") // strip leading "1. ", "2. ", etc.
    .replace(/&amp;/g, "and")
    .replace(/&[a-z]+;/gi, "")    // strip remaining HTML entities
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

/**
 * Inject TOC-Anchor-Logic in flat-MD-converted HTML:
 *   1. Jeder <h2> bekommt id="<slug>" (slugifyHeading auf Heading-Text)
 *   2. Die <ol>, die direkt auf <h2 id="inhaltsverzeichnis">folgt,
 *      bekommt jedes <li> als <a href="#<slug>">...</a> umschlossen.
 *
 * Match-Regel: TOC-li-Text "Die kurze Antwort vorab" → slug "die-kurze-antwort-vorab",
 * matcht H2 "1. Die kurze Antwort vorab" weil slugifyHeading führende "N. " entfernt.
 */
function injectTocAnchors(html) {
  // Step 0: Explizite {#id}-Heading-Attribute (kramdown/pandoc-Stil) honorieren.
  // marked (headerIds:false) würde "{#id}" sonst als sichtbaren Text rendern, und
  // der Auto-Slug (Step 1) erzeugte eine andere id als die [text](#id)-TOC-Links →
  // tote Sprungmarken. Wir ziehen die id ins Element und entfernen das Literal.
  let result = html.replace(
    /<(h[1-6])((?:(?!\bid=)[^>])*)>([^<]*?)\s*\{#([A-Za-z0-9_-]+)\}\s*<\/\1>/g,
    (_, tag, attrs, text, id) => `<${tag}${attrs} id="${id}">${text}</${tag}>`,
  );

  // Step 1: add id to every <h2> without existing id-attribute
  result = result.replace(/<h2(?!\s+[^>]*id=)>([\s\S]*?)<\/h2>/g, (_, inner) => {
    // Strip nested HTML for slug-source, keep inner unchanged in output
    const text = inner.replace(/<[^>]+>/g, "");
    const id = slugifyHeading(text);
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // Step 2: wrap <li>-items in TOC ol with anchor links.
  // Anchor: erste <ol> nach <h2 id="inhaltsverzeichnis">.
  result = result.replace(
    /(<h2 id="inhaltsverzeichnis">[\s\S]*?<\/h2>\s*<ol>)([\s\S]*?)(<\/ol>)/,
    (_, prefix, listBody, suffix) => {
      const newBody = listBody.replace(
        /<li>([\s\S]*?)<\/li>/g,
        (__, itemText) => {
          // Explizite [text](#id)-TOC-Links (aus {#id}-Headings) unangetastet lassen —
          // sonst Doppel-Wrap <a><a>…</a></a> mit falscher äußerer id.
          if (/<a\s+href=/i.test(itemText)) return `<li>${itemText}</li>`;
          // Use the visible text content for slug-matching.
          const text = itemText.replace(/<[^>]+>/g, "").trim();
          const id = slugifyHeading(text);
          return `<li><a href="#${id}">${itemText}</a></li>`;
        },
      );
      return prefix + newBody + suffix;
    },
  );

  return result;
}

/**
 * Extract FAQ-Items aus dem Body-HTML.
 * Sucht eine H2 mit "FAQ"/"Häufige Fragen"-Pattern, liest dann alle nachfolgenden
 * H3+nachfolgende P-Inhalte als Q+A bis zur nächsten H2.
 *
 * Returns: [{ question, answer }, ...]   (leeres Array wenn keine FAQ-Sektion)
 */
function extractFaqsFromBody(bodyHtml) {
  if (!bodyHtml) return [];
  // Find FAQ-H2 (broad pattern: contains "FAQ" or "Häufige Fragen" / "Haeufige Fragen")
  const faqH2Re =
    /<h2[^>]*>([^<]*(?:FAQ|H[äa]ufige Fragen|F\.A\.Q|Q\s*&amp;\s*A|Q&amp;A)[^<]*)<\/h2>/i;
  const m = bodyHtml.match(faqH2Re);
  if (!m) return [];
  const startIdx = m.index + m[0].length;
  // Slice until next <h2> or end
  const rest = bodyHtml.substring(startIdx);
  const nextH2 = rest.search(/<h2[\s>]/i);
  const faqSection = nextH2 >= 0 ? rest.substring(0, nextH2) : rest;
  // Iterate H3 + first <p> after each H3
  const faqs = [];
  const itemRe = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi;
  let im;
  while ((im = itemRe.exec(faqSection)) !== null) {
    const qHtml = im[1];
    const aHtml = im[2];
    const question = decodeHtmlEntities(qHtml.replace(/<[^>]+>/g, "").trim());
    // Take first <p>...</p> as answer (may be multi-paragraph; concatenate first 1-2)
    const pMatches = [...aHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    if (pMatches.length === 0) continue;
    const answerHtml = pMatches.slice(0, 2).map((x) => x[1]).join(" ");
    const answer = decodeHtmlEntities(answerHtml.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    if (!question || !answer || answer.length < 20) continue;
    faqs.push({ question, answer });
  }

  // Fallback (Batch 22+): Q&A als **Frage:**/**Antwort:**-Absätze statt <h3>.
  // Wenn die <h3>-Schleife nichts fand, sequentiell <p>-Paare koppeln (Frage → Antwort).
  // Deckt beide Fett-Varianten ab: <strong>Frage:</strong> Q  UND  <strong>Frage: Q</strong>.
  if (faqs.length === 0) {
    const paras = [...faqSection.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((x) =>
      decodeHtmlEntities(x[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
    );
    let pendingQ = null;
    for (const text of paras) {
      const qm = text.match(/^Frage:\s*(.+)$/i);
      const am = text.match(/^Antwort:\s*(.+)$/i);
      if (qm) {
        pendingQ = qm[1].trim();
      } else if (am && pendingQ) {
        const answer = am[1].trim();
        if (answer.length >= 20) faqs.push({ question: pendingQ, answer });
        pendingQ = null;
      }
    }
  }
  return faqs;
}

/**
 * Inject a FAQPage node into a parsed JSON-LD @graph (or wrap into one).
 * If FAQPage already exists with mainEntity, this is a no-op (Source-Daten
 * haben Vorrang). Sonst: neue FAQPage hinzufügen.
 *
 * Returns updated jsonLd-String.
 */
function injectFaqPageInGraph(jsonLdStr, faqs, slug) {
  if (!jsonLdStr || faqs.length === 0) return jsonLdStr;
  let obj;
  try { obj = JSON.parse(jsonLdStr); } catch { return jsonLdStr; }

  const ensureGraph = () => {
    if (Array.isArray(obj["@graph"])) return obj["@graph"];
    const graph = [{ ...obj }];
    delete graph[0]["@context"];
    return obj["@graph"] = graph;
  };

  const nodes = Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
  const existingFaq = nodes.find(
    (n) => n["@type"] === "FAQPage" && Array.isArray(n.mainEntity) && n.mainEntity.length > 0,
  );
  if (existingFaq) {
    // Source hat schon FAQPage. Merge-Regel: wenn Body MEHR Items als Source hat
    // → Body gewinnt (Body ist die User-sichtbare Wahrheit). Sonst Source behalten.
    if (faqs.length > existingFaq.mainEntity.length) {
      existingFaq.mainEntity = faqs.map((q) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": { "@type": "Answer", "text": q.answer },
      }));
      return JSON.stringify(obj, null, 2);
    }
    return jsonLdStr;
  }

  const faqPageNode = {
    "@type": "FAQPage",
    "@id": `${SITE_BASE}/de/blog/${slug}#faq`,
    "mainEntity": faqs.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };

  if (!obj["@context"]) obj["@context"] = "https://schema.org";
  const graph = ensureGraph();
  graph.push(faqPageNode);
  return JSON.stringify(obj, null, 2);
}

/**
 * Coerce gray-matter's parsed YAML date (Date object) into "YYYY-MM-DD"
 * string format — matches the date-only format used by Batches 1-20.
 */
function toDateString(value) {
  if (!value) return null;
  if (value instanceof Date) {
    const yyyy = value.getUTCFullYear();
    const mm = String(value.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(value.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  // Already a string — accept as-is, strip any trailing time portion
  return String(value).split("T")[0];
}

function parseFlatMarkdownFile(filePath, batchDir) {
  const raw = readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data;
  if (!fm.slug) return null;

  // Convert MD body → HTML via marked. Inline HTML passes through unchanged.
  const bodyHtmlRaw = marked.parse(parsed.content);
  // Reuse existing cleanBodyHtml for whitespace + safety.
  const bodyHtmlClean = cleanBodyHtml(bodyHtmlRaw);
  // Inject id-Attribute auf H2 + Anchor-Links im TOC <ol>.
  const bodyHtml = injectTocAnchors(bodyHtmlClean);

  // Reading time: ceil(words / 250)
  const words = countWords(bodyHtml);
  const readingTime = Math.max(1, Math.ceil(words / 250));

  // Cluster override: slug-based mapping for batches whose YAML "cluster"
  // doesn't match a canonical category (e.g., Batch 21 → "21-migrations-altsite").
  const categoryOverride = FLAT_MD_CATEGORY_BY_SLUG[fm.slug];

  // Author: keep authors[] array; existing isSalvatore-Logik (in main loop)
  // erzeugt automatisch "René Ebert & Sanjaya Pattiyage" für non-Salvatore-Slugs.

  // Fallback focus_keyword → primary_keyword: Batch-22-Flat-MD setzt teils nur
  // `primary_keyword`. Ohne Fallback bekämen diese Posts main_keyword:null (bisher
  // 0× in generated.ts → Invariante wahren). Batch-21 hat immer focus_keyword → unberührt.
  const focusKw = fm.focus_keyword || fm.primary_keyword || null;

  return {
    meta: {
      slug: fm.slug,
      title: fm.title,
      meta_description: fm.meta_description,
      focus_keyword: focusKw,
      main_keyword: focusKw ? { term: focusKw } : null,
      secondary_keywords: Array.isArray(fm.secondary_keywords)
        ? fm.secondary_keywords
        : [],
      publish_date: toDateString(fm.date || fm.publish_date),
      modified_date: toDateString(fm.modified_date || fm.date || fm.publish_date),
      cluster: categoryOverride || fm.cluster,
      categories: categoryOverride ? [categoryOverride] : (fm.categories || []),
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      reading_time_minutes: readingTime,
      canonical_url: fm.canonical_url,
      authors: Array.isArray(fm.authors) ? fm.authors : null,
      old_url: fm.old_url || null,
      _source: "flat-md",
      _batchDir: batchDir,
    },
    bodyHtml,
  };
}

/**
 * Repariert Auto-Linker-Schäden: <a>-Tags, die von der internen Verlinkung
 * (Welle B) MITTEN IN Attributwerte injiziert wurden (cite="…", id="…").
 * Browser brechen das Attribut dann am nächsten `"` ab und rendern den Rest
 * als sichtbaren Rohtext (z.B. `lieferando-provision-2026">`).
 *
 * Muster: ="…prefix…<a href="…">TEXT</a>…  →  ="…prefix…TEXT…
 * Der Guard `[^"<>]*` stellt sicher, dass wir wirklich in einem noch offenen
 * Attributwert sind (kein `>`/`<`/`"` dazwischen) — legitime Links im
 * Fließtext bleiben unberührt. Läuft iterativ für Mehrfach-Treffer.
 */
function repairAttributeNestedLinks(html) {
  if (!html) return html;
  const pattern = /(="[^"<>]*)<a\s+href="[^"]*"[^>]*>([^<]*)<\/a>/g;
  let prev;
  do {
    prev = html;
    html = html.replace(pattern, "$1$2");
  } while (html !== prev);
  return html;
}

/**
 * Fakten-Korrekturen (Salvatore-Freigabe 2026-07-16, GEO-Audit Phase 1):
 * Ich-Perspektive-Claims in Alt-Content, die der realen Gründung (2021) und
 * Kundenzahl (800+) widersprechen. NUR Zahlen/Jahre — kein Umschreiben.
 * Byte-exakte Strings; werden Strings beim Regenerieren nicht gefunden,
 * landet eine Warnung in `errors` (Quelle hat sich geändert → Map prüfen).
 */
const CONTENT_FACT_FIXES = {
  "automatisierung-gastronomie": [
    ["seit über 20 Jahren Technologie-Partner für die deutsche Gastronomie", "seit 2021 Technologie-Partner für die deutsche Gastronomie"],
    ["Mehr als 2.500 Betriebe vertrauen unserer Hard- und Software", "Mehr als 800 Betriebe vertrauen unserer Hard- und Software"],
    ["mehr als 2.500 Betriebe haben uns vertraut", "mehr als 800 Betriebe haben uns vertraut"],
    ["Seit mehr als 20 Jahren begleiten wir Kassensystem-Projekte", "Seit 2021 begleiten wir Kassensystem-Projekte"],
    ["über 2.500 Gastronomie-Betriebe in DACH", "über 800 Gastronomie-Betriebe in DACH"],
  ],
  "eigene-lieferservice-app": [
    ["seit über 10 Jahren für deutsche Lieferdienste, Pizzerien und Cloud-Kitchens", "seit 2021 für deutsche Lieferdienste, Pizzerien und Cloud-Kitchens"],
  ],
  "catering-b2b-mittagstisch": [
    ["seit über 15 Jahren Digitalisierungslösungen für die Gastronomie", "seit 2021 Digitalisierungslösungen für die Gastronomie"],
  ],
  "mindestlohn-gastronomie-2026": [
    ["die wir seit 2018 mit Software begleiten", "die wir seit 2021 mit Software begleiten"],
  ],
  // Welle-I Fix 4 (Freigabe 2026-07-17): TSE-Pflicht korrekt konditionieren —
  // sie gilt nur für Betriebe mit elektronischem Kassensystem (§ 146a AO),
  // es gibt keine allgemeine Kassenpflicht. Ersetzt in Body UND FAQ-jsonLd.
  "cafe-gruenden": [
    [
      "Ja, ausnahmslos. § 146a AO und KassenSichV verlangen eine zertifizierte TSE.",
      "Ja, sobald du ein elektronisches Kassensystem einsetzt — § 146a AO und KassenSichV verlangen dann eine zertifizierte TSE.",
    ],
  ],
  "restaurant-eroeffnen-2026": [
    [
      "Ja. Nach KassenSichV und § 146a AO gilt die TSE-Pflicht ab dem ersten Umsatz.",
      "Ja, wenn du ein elektronisches Kassensystem einsetzt: Nach KassenSichV und § 146a AO gilt die TSE-Pflicht dann ab dem ersten Umsatz.",
    ],
  ],
};
// Hinweis: Der frühere Einzel-Fix für „versicherungen-restaurant-betrieb"
// (★ 4,9 / 5 → 5,0) ist entfallen — er wird jetzt vom globalen fixGoogleRating()
// mit abgedeckt (Welle-II-Nachfix), das ALLE 4,9-Rating-Erwähnungen behandelt.

/**
 * Welle-II Fix 2: WordPress-Migrations-Artefakt entfernen.
 * `[GOOGLE-REVIEWS-WIDGET-PLACEHOLDER]` (und die Kommentar-Variante
 * `[GOOGLE-REVIEWS-WIDGET-PLACEHOLDER: …]`) war ein nie ersetzter Shortcode-
 * Platzhalter → als sichtbarer Rohtext ausgeliefert. Ersetzt durch einen
 * neutralen Satz mit der autoritativen Bewertung (Quelle: google-reviews.json
 * meta totalRating 5,0 / totalCount 131, identisch zum Organization-Schema).
 */
const REVIEWS_SENTENCE =
  '<p>Unsere Kunden bewerten uns auf Google mit 5,0 von 5 Sternen (131 Bewertungen).</p>';
function replaceReviewsPlaceholder(html) {
  if (!html) return html;
  return html.replace(/\[GOOGLE-REVIEWS-WIDGET-PLACEHOLDER[^\]]*\]/g, REVIEWS_SENTENCE);
}

/**
 * Welle-II Nachfix (Salvatore-Freigabe 2026-07-17): Google-Bewertung ist 5,0
 * (131 Bewertungen), bestätigt gegen google-reviews.json + Organization-Schema.
 * Ersetzt veraltete „4,9"-Rating-Erwähnungen im Blog durch „5,0" — NUR in
 * Rating-Kontext (Stern-Glyphen, „/5", „von 5", „aus 131", „Sterne"). Preise
 * (4,95 €, 14,90 €) und Wachstums-Prozente (+4,9 %) bleiben unangetastet, da
 * die Muster ein Rating-Suffix verlangen. Läuft auf bodyHtml UND jsonLd.
 */
function fixGoogleRating(html) {
  if (!html) return html;
  return html
    .replace(/4,9(\s*\/\s*5)/g, '5,0$1')             // 4,9 / 5 · 4,9/5 · 4,9 / 5,0
    .replace(/4,9(\s+von\s+5)/g, '5,0$1')             // 4,9 von 5 (Sternen)
    .replace(/4,9(\s+aus\s+131)/g, '5,0$1')           // 4,9 aus 131
    .replace(/4,9(<\/strong>\s+aus)/g, '5,0$1')       // <strong>4,9</strong> aus <strong>131</strong>
    .replace(/4,9(\s*★)/g, '5,0$1')                   // 4,9 ★ (Stern nach Zahl)
    .replace(/4,9(\s+Sterne)/g, '5,0$1')              // 4,9 Sterne(n)
    .replace(/(Bewertung:\s*)4,9/g, '$15,0');         // Bewertung: 4,9
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const posts = [];
const errors = [];

/**
 * Build a post object from a normalized meta + bodyHtml + optional jsonLd input,
 * apply schema fixes, and push into the posts array.
 * Used by both the meta.json + wordpress.html path (Batches 1-20) and the
 * flat-MD path (Batch 21+).
 */
function buildAndPushPost({ meta, bodyHtml, jsonLdInput }) {
  const slug = meta.slug;
  const isSalvatore = SALVATORE_SLUGS.has(slug);

  // Attribut-Artefakte reparieren (Auto-Linker-Schäden aus Welle B)
  bodyHtml = repairAttributeNestedLinks(bodyHtml);

  // Welle-II Fix 2: Google-Reviews-Platzhalter durch neutralen Satz ersetzen
  bodyHtml = replaceReviewsPlaceholder(bodyHtml);

  // Welle-II Nachfix: Rating 4,9 → 5,0 (nur Rating-Kontext, nicht Preise/Prozente)
  bodyHtml = fixGoogleRating(bodyHtml);

  // Fakten-Korrekturen (freigegeben 2026-07-16): falsche Ich-Perspektive-Claims
  // die der Gründung 2021 + 800+ Kunden widersprechen. Nur Zahlen/Jahre,
  // kein Umschreiben (siehe CONTENT_FACT_FIXES).
  for (const [from, to] of CONTENT_FACT_FIXES[slug] ?? []) {
    if (!bodyHtml.includes(from)) {
      errors.push(`Fact-Fix nicht angewendet (String nicht gefunden): ${slug} → "${from.slice(0, 50)}…"`);
      continue;
    }
    bodyHtml = bodyHtml.split(from).join(to);
  }

  // Welle F — Cover auflösen (null wenn Bild-Paar in public/blog-covers/ fehlt)
  const cover = resolveCover(slug, getCategory(meta), getTitle(meta));

  let jsonLd = jsonLdInput || "";
  // Fact-Fixes auch aufs Quell-jsonLd anwenden (FAQ-Antworten stehen dort
  // als Kopie; still — nicht jeder Body-String existiert im jsonLd).
  for (const [from, to] of CONTENT_FACT_FIXES[slug] ?? []) {
    jsonLd = jsonLd.split(from).join(to);
  }
  // Welle-II Nachfix: Rating 4,9 → 5,0 auch im jsonLd (FAQ-Antworten als Kopie)
  jsonLd = fixGoogleRating(jsonLd);
  if (!jsonLd || jsonLd.trim() === "") {
    jsonLd = buildFallbackJsonLd({
      title: getTitle(meta),
      description: getDescription(meta),
      datePublished: meta.publish_date || "2026-01-01",
    });
  }
  jsonLd = fixJsonLdMeta(jsonLd, { slug, bodyHtml, isSalvatore, title: getTitle(meta), cover });

  // Auto-extract FAQs aus Body und in jsonLd injizieren, falls noch keine FAQPage da
  // (Source-Daten haben Vorrang — Auto-Inject ergänzt nur Lücken).
  const bodyFaqs = extractFaqsFromBody(bodyHtml);
  if (bodyFaqs.length > 0) {
    jsonLd = injectFaqPageInGraph(jsonLd, bodyFaqs, slug);
  }

  const productLinks = extractProductLinks(meta.internal_links || {});
  const internalLinks = productLinks
    .filter((url) => typeof url === "string" && url.startsWith("/"))
    .slice(0, 3)
    .map((url) => ({ title: urlToTitle(url), href: "/de" + url }));

  const secondaryKeywords = getSecondaryKeywords(meta);
  const mainKeywordTerm = meta.main_keyword?.term || meta.focus_keyword || "";
  const keywords = [mainKeywordTerm, ...secondaryKeywords].filter(Boolean);

  const post = {
    id: meta.post_id ? `post-${meta.post_id}` : `post-${slug}`,
    slug,
    title: getTitle(meta),
    description: getDescription(meta),
    excerpt: generateExcerpt(bodyHtml, getTitle(meta)),
    metaDescription: getDescription(meta),
    bodyHtml,
    jsonLd,
    author: isSalvatore ? "Salvatore Anzaldi" : "René Ebert & Sanjaya Pattiyage",
    publishedDate: meta.publish_date || "2026-01-01",
    category: getCategory(meta),
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    keywords,
    readingTime: getReadingTime(meta),
    featured: false,
    internalLinks,
    faqItems: [],
    sections: [],
    // Welle F — Cover-Felder (undefined wenn kein Bild-Paar existiert)
    coverImage: cover?.image,
    coverImageFallback: cover?.fallback,
    coverImageAlt: cover?.alt,
    coverImageWidth: cover?.width,
    coverImageHeight: cover?.height,
  };

  posts.push(post);
}

for (const batchDir of BATCH_DIRS) {
  const batchPath = join(BLOG_EXPORTS_DIR, batchDir);

  let files;
  try {
    files = readdirSync(batchPath);
  } catch (e) {
    errors.push(`Could not read directory: ${batchPath}`);
    continue;
  }

  // Path 1 — Batches 1-20: meta.json + wordpress.html
  const metaFiles = files.filter((f) => f.endsWith("-meta.json"));

  for (const metaFile of metaFiles) {
    let rawMeta;
    try {
      const metaContent = readFileSync(join(batchPath, metaFile), "utf-8");
      rawMeta = JSON.parse(metaContent);
    } catch (e) {
      errors.push(`Failed to parse ${metaFile}: ${e.message}`);
      continue;
    }

    // Normalize meta to handle nested formats
    const meta = normalizeMeta(rawMeta);

    const slug = meta.slug;
    if (!slug) {
      errors.push(`No slug in ${metaFile}`);
      continue;
    }

    // Find corresponding wordpress.html via slug match
    const wpFile = files.find(
      (f) => f.includes(slug) && f.endsWith("-wordpress.html")
    );

    let bodyHtml = "";
    let jsonLdInput = "";

    if (wpFile) {
      try {
        const wpContent = readFileSync(join(batchPath, wpFile), "utf-8");
        bodyHtml = cleanBodyHtml(wpContent);
        jsonLdInput = extractJsonLd(wpContent);
      } catch (e) {
        errors.push(`Failed to read ${wpFile}: ${e.message}`);
      }
    } else {
      errors.push(`No wordpress.html found for slug: ${slug} in ${batchDir}`);
    }

    buildAndPushPost({ meta, bodyHtml, jsonLdInput });
  }

  // Path 2 — Batch 21+: flat-MD (.md mit YAML-Frontmatter, kein -meta.json/-wordpress.html-Peer)
  // Filter: nur Files mit numerischem Prefix (z.B. "01-foo.md") — schließt BATCH-XX-*.md
  // README/Redirect-Notes aus, die keine Posts sind.
  const mdFiles = files.filter(
    (f) => f.endsWith(".md") && /^\d+-/.test(f),
  );
  for (const mdFile of mdFiles) {
    const baseName = mdFile.replace(/\.md$/, "");
    // Skip if a -meta.json peer with same prefix exists (handled by Path 1)
    const hasMetaJsonPeer = files.some(
      (f) => f.startsWith(baseName) && f.endsWith("-meta.json"),
    );
    if (hasMetaJsonPeer) continue;

    const result = parseFlatMarkdownFile(join(batchPath, mdFile), batchDir);
    if (!result) {
      errors.push(`Invalid flat-MD frontmatter: ${mdFile} in ${batchDir}`);
      continue;
    }
    buildAndPushPost({
      meta: result.meta,
      bodyHtml: result.bodyHtml,
      jsonLdInput: "",
    });
  }
}

// ─── Write output ─────────────────────────────────────────────────────────────

const postEntries = posts
  .map((post) => {
    const lines = [
      `  {`,
      `    id: ${JSON.stringify(post.id)},`,
      `    slug: ${JSON.stringify(post.slug)},`,
      `    title: ${JSON.stringify(post.title)},`,
      `    description: ${JSON.stringify(post.description)},`,
      `    excerpt: ${JSON.stringify(post.excerpt)},`,
      `    metaDescription: ${JSON.stringify(post.metaDescription)},`,
      `    bodyHtml: ${JSON.stringify(post.bodyHtml)},`,
      `    jsonLd: ${JSON.stringify(post.jsonLd)},`,
      `    author: ${JSON.stringify(post.author)},`,
      `    publishedDate: ${JSON.stringify(post.publishedDate)},`,
      `    category: ${JSON.stringify(post.category)},`,
      `    tags: ${JSON.stringify(post.tags)},`,
      `    keywords: ${JSON.stringify(post.keywords)},`,
      `    readingTime: ${post.readingTime},`,
      `    featured: ${post.featured},`,
      `    internalLinks: ${JSON.stringify(post.internalLinks)},`,
      `    faqItems: [],`,
      `    sections: [],`,
      // Welle F — Cover-Felder nur emittieren wenn vorhanden
      ...(post.coverImage
        ? [
            `    coverImage: ${JSON.stringify(post.coverImage)},`,
            `    coverImageFallback: ${JSON.stringify(post.coverImageFallback)},`,
            `    coverImageAlt: ${JSON.stringify(post.coverImageAlt)},`,
            `    coverImageWidth: ${post.coverImageWidth},`,
            `    coverImageHeight: ${post.coverImageHeight},`,
          ]
        : []),
      `  }`,
    ];
    return lines.join("\n");
  })
  .join(",\n");

const output = `// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-blog-posts.mjs
import type { BlogPost } from './blog-posts-types';

export const generatedBlogPosts: BlogPost[] = [
${postEntries}
];
`;

const outPath = resolve(ROOT, "src/data/blog-posts-generated.ts");
writeFileSync(outPath, output, "utf-8");

console.log(`✅ Generated ${posts.length} posts → ${outPath}`);

if (errors.length > 0) {
  console.warn(`\n⚠️  ${errors.length} warning(s):`);
  errors.forEach((e) => console.warn(`   - ${e}`));
}

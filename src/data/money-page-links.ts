// Batch 3 B5 — geteilte Auswahllogik für die kontextuellen Blog-Backlinks auf
// Money-Pages. Prerenderer (generate-prerendered-html.mjs) UND die React-
// Komponente (MoneyPageBacklinks.tsx) rufen dieselbe Funktion, damit statisches
// HTML und hydriertes DOM exakt dieselben Links tragen (kein Drift).
//
// Die Post-Liste wird als Parameter übergeben (nicht importiert): der Node-
// Type-Stripping-Loader des Prerenderers löst extensionslose .ts-Imports nicht
// auf. Beide Aufrufer haben die Liste ohnehin zur Hand (allBlogPosts bzw.
// blogPosts) — dieselbe Quelle blog-posts.ts, dieselben 172 Posts.

export interface MoneyBlogPost {
  slug: string;
  title: string;
  category?: string;
}

// route.key → relevante Blog-Kategorien (Reihenfolge = Priorität).
export const MONEY_BLOG_CATEGORIES: Record<string, string[]> = {
  "pos-system": ["Kassensysteme", "Recht & Compliance", "Finanzen"],
  "ordering-app": ["Bestellsysteme", "Lieferservice"],
  "online-shop": ["Bestellsysteme", "Lieferservice"],
  website: ["Website & Marketing", "Trends & Zukunft"],
  hardware: ["Kassensysteme", "Bestellsysteme"],
  restaurant: ["Betrieb & Service", "Gründung"],
  "cafe-bakery": ["Betrieb & Service", "Website & Marketing"],
  "start-delivery": ["Lieferservice", "Gründung"],
  delivery: ["Lieferservice", "Bestellsysteme"],
  franchise: ["Gründung", "Betrieb & Service"],
  "ghost-kitchen": ["Lieferservice", "Trends & Zukunft"],
};

// Index category → Posts, stabil nach slug sortiert (deterministische Auswahl).
function byCategory(posts: MoneyBlogPost[]): Map<string, MoneyBlogPost[]> {
  const map = new Map<string, MoneyBlogPost[]>();
  for (const p of posts) {
    const c = p.category || "";
    if (!map.has(c)) map.set(c, []);
    map.get(c)!.push(p);
  }
  for (const arr of map.values()) arr.sort((a, b) => (a.slug < b.slug ? -1 : 1));
  return map;
}

export interface MoneyBlogLink {
  slug: string;
  title: string;
}

// Bis zu 6 Posts für einen route.key: je Kategorie anteilig, dann auffüllen.
export function moneyPageBlogLinks(
  routeKey: string,
  posts: MoneyBlogPost[],
): MoneyBlogLink[] {
  const cats = MONEY_BLOG_CATEGORIES[routeKey];
  if (!cats) return [];
  return blogLinksForCategories(cats, posts);
}

// Batch 3b: Kernauswahl auch für die Blog-Landing-Routen nutzbar (Kategorien
// direkt statt über MONEY_BLOG_CATEGORIES) — dieselbe Logik, keine dritte
// Implementierung.
export function blogLinksForCategories(
  cats: string[],
  posts: MoneyBlogPost[],
): MoneyBlogLink[] {
  const byCat = byCategory(posts);
  const picked: MoneyBlogPost[] = [];
  const seen = new Set<string>();
  const perCat = Math.ceil(6 / cats.length);
  for (const c of cats) {
    let n = 0;
    for (const p of byCat.get(c) || []) {
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      picked.push(p);
      n += 1;
      if (n >= perCat || picked.length >= 6) break;
    }
    if (picked.length >= 6) break;
  }
  if (picked.length < 6) {
    for (const c of cats) {
      for (const p of byCat.get(c) || []) {
        if (seen.has(p.slug)) continue;
        seen.add(p.slug);
        picked.push(p);
        if (picked.length >= 6) break;
      }
      if (picked.length >= 6) break;
    }
  }
  // Ankertext = Thema, nicht Markenname → " | Gastro Master"-Suffix strippen.
  return picked.slice(0, 6).map((p) => ({
    slug: p.slug,
    title: p.title.replace(/\s*\|\s*Gastro Master\s*$/i, "").trim(),
  }));
}

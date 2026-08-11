// Batch 8 — „Weitere Artikel" als EINE QUELLE.
//
// Bis hierher gab es zwei Auswahlen: Der Prerenderer nahm einen Rotations-Ring
// über alle 172 Posts, die React-Seite die drei neuesten derselben Kategorie.
// Verschiedene Artikel, verschiedene Anzahl, verschiedene Überschrift — im
// rohen HTML standen sechs Titel, die im gerenderten DOM nicht vorkamen.
// Genau das Problem, das money-page-links.ts für die Money-Pages gelöst hat.
//
// Auswahlregel (Entscheidung Salvatore, Batch 8):
//   1. KATEGORIE ZUERST — thematische Nähe hilft Leser und Themen-Cluster.
//   2. AUFGEFÜLLT AUS DEM RING — damit kein Post aus dem Linkfluss fällt.
//   3. DETERMINISTISCH — gleiche Eingabe, gleiche Ausgabe, reproduzierbare Builds.

export interface RelatedPostLike {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
}

/**
 * Der Ring: erst nach Kategorie, dann nach Datum absteigend. Jeder Post hat
 * dadurch eine feste Position; „der nächste im Ring" ist immer derselbe.
 */
const buildRing = <T extends RelatedPostLike>(posts: T[]): T[] =>
  [...posts].sort((a, b) => {
    if (a.category !== b.category) return a.category < b.category ? -1 : 1;
    const d = new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    return d !== 0 ? d : a.slug < b.slug ? -1 : 1;
  });

/**
 * Bis zu `n` verwandte Posts: so viele wie möglich aus derselben Kategorie
 * (neueste zuerst), der Rest aus dem Ring — ohne Dubletten, ohne den Post selbst.
 */
export const relatedPostsFor = <T extends RelatedPostLike>(
  post: Pick<RelatedPostLike, "slug" | "category">,
  posts: T[],
  n = 6,
): T[] => {
  const ring = buildRing(posts);
  const taken = new Set<string>([post.slug]);
  const picks: T[] = [];

  // 1. Kategorie zuerst — neueste zuerst, Slug als stabiler Tiebreaker.
  const sameCategory = ring.filter((p) => p.category === post.category && p.slug !== post.slug);
  for (const p of sameCategory) {
    if (picks.length >= n) break;
    picks.push(p);
    taken.add(p.slug);
  }

  // 2. Auffüllen aus dem Ring ab der eigenen Position — deterministisch.
  const start = ring.findIndex((p) => p.slug === post.slug);
  if (start >= 0) {
    for (let k = 1; k <= ring.length && picks.length < n; k += 1) {
      const cand = ring[(start + k) % ring.length];
      if (taken.has(cand.slug)) continue;
      picks.push(cand);
      taken.add(cand.slug);
    }
  }
  return picks.slice(0, n);
};

/** Überschrift — identisch in beiden Ebenen. */
export const RELATED_POSTS_HEADLINE = "Weitere Artikel";

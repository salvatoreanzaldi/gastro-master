/**
 * Batch 6 Runde 3 — EINE Regel gegen Schema-Dubletten.
 *
 * Prerenderte Seiten tragen ihr JSON-LD im <head>. Alles, was der Client
 * zusätzlich einspeist — der useEffect-Inject in BlogPostDetailPage und die
 * <script type="application/ld+json">-Tags im JSX der Money-Pages — darf nur
 * Typen ergänzen, die dort noch NICHT stehen. Die Regel liest den Ist-Zustand
 * des Dokuments; es gibt keine Pflegeliste pro Seite, Post oder Typ.
 *
 * Sie greift ausschließlich, solange die Adresse noch die initial geladene ist:
 * Bei einer Client-Navigation beschreibt der prerenderte <head> die VORIGE
 * Seite und wäre kein gültiger Vergleichsmaßstab. Crawler laden jede URL frisch
 * — für sie gilt immer der Initialfall.
 */

/**
 * Einzige strukturelle Ausnahme zur reinen @type-Gleichheit: schema.org-
 * Subtypen besetzen denselben Slot wie ihr Obertyp. Der Prerenderer schreibt
 * BlogPosting, die generierten Alt-Daten (blog-posts-generated.ts) schreiben
 * Article — beides beschreibt dieselbe Seite, Google wertet das Nebeneinander
 * als Konflikt. Das ist eine Typ-Hierarchie, keine Seiten-Pflegeliste.
 */
const TYPE_FAMILY: Record<string, string> = {
  BlogPosting: "Article",
  NewsArticle: "Article",
  TechArticle: "Article",
  ScholarlyArticle: "Article",
  Report: "Article",
};

type JsonLdNode = Record<string, unknown>;

const INITIAL_PATH = typeof window !== "undefined" ? window.location.pathname : "";

/**
 * Die Root-Shell (/) wird für jede nicht prerenderte Adresse ausgeliefert und
 * leitet client-seitig auf die Sprach-Startseite um (/de). Dabei ändert sich der
 * Pfad, ohne dass ein neues Dokument geladen wird — der prerenderte <head>
 * beschreibt weiterhin genau diese Seite (Canonical zeigt auf /de). Ohne diese
 * Ausnahme liefe die Regel dort nie und die Startseite trüge Organization,
 * WebSite und BreadcrumbList doppelt (Batch 7, gemessen auf /).
 */
const SHELL_START = INITIAL_PATH === "/" || INITIAL_PATH === "";
const LANG_ROOT = /^\/(de|en|it|fa|si|ru)\/?$/;

const onReferencePath = (): boolean => {
  if (typeof window === "undefined") return true;
  const p = window.location.pathname;
  return p === INITIAL_PATH || (SHELL_START && LANG_ROOT.test(p));
};

const nodesOf = (parsed: unknown): JsonLdNode[] => {
  if (Array.isArray(parsed)) return parsed as JsonLdNode[];
  if (!parsed || typeof parsed !== "object") return [];
  const graph = (parsed as JsonLdNode)["@graph"];
  if (Array.isArray(graph)) return graph as JsonLdNode[];
  return [parsed as JsonLdNode];
};

const familiesOf = (node: JsonLdNode): string[] => {
  const raw = node?.["@type"];
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.map((t) => TYPE_FAMILY[String(t)] ?? String(t));
};

/** Typ-Familien, die der Prerenderer bereits in den <head> geschrieben hat. */
export const prerenderedFamilies = (doc: Document = document): Set<string> => {
  const out = new Set<string>();
  doc.querySelectorAll<HTMLScriptElement>('head script[type="application/ld+json"]').forEach((s) => {
    if (s.dataset.clientJsonld === "1") return;
    try {
      nodesOf(JSON.parse(s.textContent || "")).forEach((n) => familiesOf(n).forEach((f) => out.add(f)));
    } catch {
      /* nicht parsebares Fremd-Schema wird ignoriert, nie entfernt */
    }
  });
  return out;
};

/**
 * Reduziert eine JSON-LD-Payload auf die Knoten, deren Typ-Familie noch frei
 * ist. Rückgabe `null` = nichts Neues übrig (Skript nicht einfügen/entfernen).
 * Belegte Familien werden in `claimed` nachgetragen, damit zwei Client-Skripte
 * sich auch nicht gegenseitig duplizieren.
 */
export const filterJsonLdPayload = (raw: string, claimed: Set<string>): string | null => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return raw; // Unlesbares nie anfassen.
  }
  const nodes = nodesOf(parsed);
  if (nodes.length === 0) return raw;
  const kept = nodes.filter((n) => {
    const fams = familiesOf(n);
    if (fams.length > 0 && fams.some((f) => claimed.has(f))) return false;
    fams.forEach((f) => claimed.add(f));
    return true;
  });
  if (kept.length === 0) return null;
  if (kept.length === nodes.length) return raw;
  const obj = parsed as JsonLdNode;
  if (!Array.isArray(parsed) && Array.isArray(obj["@graph"])) {
    return JSON.stringify({ ...obj, "@graph": kept });
  }
  return JSON.stringify(Array.isArray(parsed) ? kept : kept[0]);
};

/**
 * Für Injektoren, die selbst entscheiden: liefert die zu injizierende Payload
 * oder null. Außerhalb des Initialpfads unverändert (siehe Modul-Kopf).
 */
export const filterClientJsonLd = (raw: string, doc: Document = document): string | null => {
  if (!onReferencePath()) return raw;
  return filterJsonLdPayload(raw, prerenderedFamilies(doc));
};

const isClientScript = (s: Element): boolean =>
  (s as HTMLScriptElement).dataset?.clientJsonld === "1" || !!s.closest("#root");

/**
 * Wendet die Regel auf alle client-seitigen JSON-LD-Skripte im Dokument an.
 *
 * WICHTIG: Von React gerenderte <script>-Knoten werden NIE aus dem DOM
 * entfernt, nur entwertet (type-Attribut). React nutzt Geschwister-Knoten als
 * Einfüge-Anker; ein entfernter Knoten lässt den nächsten Commit mit
 * „NotFoundError: insertBefore" abbrechen — der gesamte Baum stirbt und die
 * Seite wird weiß (beim Scrollen reproduziert, Batch 6 Runde 3). Ein
 * geändertes Attribut fasst React dagegen nicht wieder an, solange die Props
 * gleich bleiben, und kein Parser erkennt den Knoten noch als JSON-LD.
 */
const NEUTRALIZED_TYPE = "text/x-duplicate-jsonld";

export const dedupeClientJsonLd = (doc: Document = document): number => {
  const claimed = prerenderedFamilies(doc);
  let changed = 0;
  doc.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((s) => {
    if (!isClientScript(s)) return;
    const raw = s.textContent || "";
    const next = filterJsonLdPayload(raw, claimed);
    if (next === null) {
      if (s.dataset.clientJsonld === "1") s.remove(); // selbst erzeugt → sicher
      else s.setAttribute("type", NEUTRALIZED_TYPE);
      changed += 1;
    } else if (next !== raw) {
      s.textContent = next;
      changed += 1;
    }
  });
  return changed;
};

/**
 * Einmalig vor dem React-Mount aufrufen. Beobachtet neu eingefügte JSON-LD-
 * Skripte (JSX-Tags der Money-Pages, Suspense-Nachzügler, künftige Injektoren)
 * und wendet die Regel an, solange die initiale Adresse aktiv ist.
 */
export const installJsonLdDedupe = (doc: Document = document): void => {
  if (typeof MutationObserver === "undefined") return;
  let queued = false;
  const run = () => {
    queued = false;
    if (!onReferencePath()) return;
    dedupeClientJsonLd(doc);
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    setTimeout(run, 0);
  };
  const carriesJsonLd = (n: Node): boolean => {
    if (!(n instanceof Element)) return false;
    return (
      n.matches('script[type="application/ld+json"]') ||
      !!n.querySelector('script[type="application/ld+json"]')
    );
  };
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const n of Array.from(m.addedNodes)) {
        if (carriesJsonLd(n)) {
          schedule();
          return;
        }
      }
    }
  }).observe(doc.documentElement, { childList: true, subtree: true });
  schedule();
};

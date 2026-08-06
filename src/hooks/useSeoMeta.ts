import { useEffect } from "react";
import { SITE_URL } from "@/data/schemaOrg";

const DEFAULT_OG_IMAGE = "https://gastro-master.de/og-image.png";

interface SeoMetaProps {
  title: string;
  description: string;
  /**
   * @deprecated Wird zur Laufzeit ignoriert — die Canonical wird seit dem
   * Canonical-Fix (2026-07-23) IMMER aus window.location.pathname abgeleitet
   * (self-referenziell, deckt alle Sprachen automatisch). Neue Seiten müssen
   * dieses Feld NICHT mehr setzen. Dient nur noch als SSR-Fallback.
   */
  canonical?: string;
  ogImage?: string;
  // Welle F — optionale Bild-Details für page-spezifische Cover
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  twitterCard?: "summary" | "summary_large_image";
}

function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement("meta");
    const matches = selector.matchAll(/\[([^=\]]+)="([^"]+)"\]/g);
    for (const m of matches) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function removeMeta(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.remove();
}

export function useSeoMeta({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogImageWidth,
  ogImageHeight,
  ogImageType,
  type = "website",
  publishedTime,
  modifiedTime,
  twitterCard = "summary_large_image",
}: SeoMetaProps) {
  useEffect(() => {
    const prevTitle = document.title;

    // Canonical-Fix 2026-07-23: IMMER self-referenziell aus der aktuellen URL
    // ableiten — NIE aus dem hardcodierten `canonical`-Prop. Die Props ließen bei
    // ALLEN Sprachen den /lang/-Prefix weg (und zeigten bei Nicht-DE sogar auf die
    // falsche Sprache/den DE-Slug), wodurch der Client die korrekte prerenderte
    // Canonical post-JS überschrieb → GSC „Alternative Seite mit kanonischem Tag".
    // location.pathname deckt sich exakt mit dem Prerenderer, für alle 6 Sprachen.
    // `canonical`-Prop bleibt nur als SSR-Fallback (dort gibt es kein window).
    const canonicalHref =
      typeof window !== "undefined"
        ? `${SITE_URL}${window.location.pathname}`.replace(/\/+$/, "") || SITE_URL
        : canonical ?? SITE_URL;

    document.title = title;
    upsertMeta('meta[name="description"]', "content", description);
    upsertLink("canonical", canonicalHref);

    // Batch 4 (vorgezogen): Nicht-DE-Sprachen auf noindex,follow — spiegelt den
    // Prerenderer, damit die zweite Indexierungswelle (gerendertes DOM) dieselbe
    // Direktive sieht. Nur bei sprach-präfigierten Routen eingreifen, damit die
    // DE-Root-Duplikat-Stubs (z.B. /produkte/add-ons) ihr eigenes noindex behalten.
    const SUPPORTED_LANGS = ["de", "en", "it", "fa", "si", "ru"];
    const langSeg =
      typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "de";
    if (SUPPORTED_LANGS.includes(langSeg)) {
      if (langSeg !== "de") {
        upsertMeta('meta[name="robots"]', "content", "noindex, follow");
      } else {
        removeMeta('meta[name="robots"]');
      }
    }

    upsertMeta('meta[property="og:title"]', "content", title);
    upsertMeta('meta[property="og:description"]', "content", description);
    upsertMeta('meta[property="og:image"]', "content", ogImage);
    upsertMeta('meta[property="og:url"]', "content", canonicalHref);
    upsertMeta('meta[property="og:type"]', "content", type);
    upsertMeta('meta[property="og:locale"]', "content", "de_DE");

    // Welle F — Bild-Details nur setzen wenn übergeben (sonst Template-Werte lassen)
    if (ogImageAlt) {
      upsertMeta('meta[property="og:image:alt"]', "content", ogImageAlt);
      upsertMeta('meta[name="twitter:image:alt"]', "content", ogImageAlt);
    }
    if (ogImageWidth) upsertMeta('meta[property="og:image:width"]', "content", String(ogImageWidth));
    if (ogImageHeight) upsertMeta('meta[property="og:image:height"]', "content", String(ogImageHeight));
    if (ogImageType) upsertMeta('meta[property="og:image:type"]', "content", ogImageType);

    if (type === "article") {
      if (publishedTime) {
        upsertMeta('meta[property="article:published_time"]', "content", publishedTime);
      }
      if (modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', "content", modifiedTime);
      }
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
    }

    upsertMeta('meta[name="twitter:card"]', "content", twitterCard);
    upsertMeta('meta[name="twitter:title"]', "content", title);
    upsertMeta('meta[name="twitter:description"]', "content", description);
    upsertMeta('meta[name="twitter:image"]', "content", ogImage);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical, ogImage, ogImageAlt, ogImageWidth, ogImageHeight, ogImageType, type, publishedTime, modifiedTime, twitterCard]);
}

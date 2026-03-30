import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "https://gastro-master.de/og-image.png";

interface SeoMetaProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement("meta");
    // Parse selector attributes like [property="og:title"] or [name="description"]
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

export function useSeoMeta({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
}: SeoMetaProps) {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title;
    upsertMeta('meta[name="description"]', "content", description);
    upsertLink("canonical", canonical);
    upsertMeta('meta[property="og:title"]', "content", title);
    upsertMeta('meta[property="og:description"]', "content", description);
    upsertMeta('meta[property="og:image"]', "content", ogImage);
    upsertMeta('meta[property="og:url"]', "content", canonical);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical, ogImage]);
}

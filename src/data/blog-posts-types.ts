// Shared types for blog posts — imported by blog-posts.ts and blog-posts-generated.ts
export type SectionType = "h2" | "h3" | "p" | "ul" | "ol";

export interface ContentSection {
  type: SectionType;
  content: string | string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  title: string;
  href: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt?: string;  // Human-readable teaser for BlogCard (≤160 chars, no §-refs)
  sections: ContentSection[];
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  keywords: string[];
  metaDescription: string;
  /** Datum der letzten inhaltlichen Überarbeitung (ISO). Speist Schema.org
   *  dateModified; ohne Angabe fällt dateModified auf publishedDate zurück. */
  lastModified?: string;
  readingTime: number;
  featured: boolean;
  internalLinks: InternalLink[];
  faqItems: FAQItem[];
  bodyHtml?: string;   // HTML from wordpress.html
  jsonLd?: string;     // JSON-LD string for head injection
  // Welle F — per-post hero cover (generated, lives in /public/blog-covers/)
  coverImage?: string;          // "/blog-covers/{slug}.webp" (primary, website rendering)
  coverImageFallback?: string;  // "/blog-covers/{slug}.jpg" (og:image + legacy clients)
  coverImageAlt?: string;       // German alt text, ≤125 chars
  coverImageWidth?: number;     // 1200
  coverImageHeight?: number;    // 630
}

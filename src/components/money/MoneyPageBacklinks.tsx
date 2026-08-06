// Batch 3 B5 — client-seitige Entsprechung des Prerenderer-Backlink-Blocks.
// Rendert denselben Breadcrumb + dieselben 6 Blog-Backlinks wie
// relatedBlogLinksForMoney im Prerenderer, aus derselben Quelle
// (moneyPageBlogLinks). So sehen erste (HTML) und zweite (gerendertes DOM)
// Indexierungswelle identische Links — kein Drift. Nur DE (Blog ist DE-only).
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import { moneyPageBlogLinks } from "@/data/money-page-links";
import { blogPosts } from "@/data/blog-posts";

interface Props {
  routeKey: string;
  hub: "produkte" | "loesungen";
}

export function MoneyPageBacklinks({ routeKey, hub }: Props) {
  const { i18n } = useTranslation();
  const lp = useLangPath();
  // Exakt wie der Prerenderer: nur DE. Auf Nicht-DE rendert keine Ebene etwas.
  if (i18n.language !== "de") return null;
  const links = moneyPageBlogLinks(routeKey, blogPosts);
  if (links.length < 4) return null;
  const hubLabel = hub === "produkte" ? "Produkte" : "Lösungen";
  const hubPath = hub === "produkte" ? "/produkte" : "/loesungen";
  // Farben ausschließlich über Theme-Tokens (foreground/muted-foreground/border/
  // accent) — so passt sich der Block Light UND Dark Mode an. Der frühere
  // hardcodierte Navy-Ton (text-[#0A264A] ohne dark:-Variante) war auf dunklem
  // Grund unsichtbar (hidden text).
  return (
    <div className="max-w-[880px] mx-auto px-6">
      <nav aria-label="Brotkrumen" className="text-sm text-muted-foreground mt-8 mb-1">
        <Link to={lp("/")} className="hover:text-accent transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="mx-1.5">
          ›
        </span>
        <Link to={lp(hubPath)} className="hover:text-accent transition-colors">
          {hubLabel}
        </Link>
      </nav>
      <nav aria-label="Passende Beiträge" className="border-t border-border py-10 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Passende Beiträge
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-none p-0 m-0 text-[0.9rem]">
          {links.map((l) => (
            <li key={l.slug}>
              <Link
                to={lp(`/blog/${l.slug}`)}
                className="text-foreground hover:text-accent hover:underline transition-colors"
              >
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

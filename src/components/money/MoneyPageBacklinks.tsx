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
  // Der Untergrund variiert je Money-Page (Produktseiten: fester Navy-Root
  // bg-[#0A264A]; Lösungsseiten: weiß). Ein fester Textton würde also auf einem
  // der beiden unsichtbar. Lösung: der Block bringt seinen EIGENEN Navy-Grund
  // mit (identisch zum Footer-Navy) und nutzt dessen weiße Textfarben —
  // konsistent lesbar auf jeder Seite und optisch als Vorlauf zum Footer.
  return (
    <div className="bg-[#0A264A] text-primary-foreground">
    <div className="max-w-[880px] mx-auto px-6">
      <nav aria-label="Brotkrumen" className="text-sm text-primary-foreground/60 pt-5">
        <Link to={lp("/")} className="hover:text-primary-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="mx-1.5">
          ›
        </span>
        <Link to={lp(hubPath)} className="hover:text-primary-foreground transition-colors">
          {hubLabel}
        </Link>
      </nav>
      <nav
        aria-label="Passende Beiträge"
        className="border-t border-primary-foreground/10 mt-3 pt-5 pb-7"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-3">
          Passende Beiträge
        </p>
        {/* Einzeilige Links (truncate) halten den Block kompakt; der volle Titel
            bleibt als Ankertext im DOM (SEO), visuell abgeschnitten mit Ellipse. */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 list-none p-0 m-0 text-[0.9rem]">
          {links.map((l) => (
            <li key={l.slug} className="min-w-0">
              <Link
                to={lp(`/blog/${l.slug}`)}
                title={l.title}
                className="block truncate text-primary-foreground/90 hover:text-accent hover:underline transition-colors"
              >
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </div>
  );
}

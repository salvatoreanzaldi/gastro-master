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
  return (
    <section className="max-w-[880px] mx-auto px-6 my-8 text-[#0A264A]">
      <nav className="text-sm text-slate-600 mb-3">
        <Link to={lp("/")} className="text-slate-600 hover:underline">
          Home
        </Link>
        {" › "}
        <Link to={lp(hubPath)} className="text-slate-600 hover:underline">
          {hubLabel}
        </Link>
      </nav>
      <h2 className="text-xl font-extrabold mb-3">Passende Artikel aus dem Blog</h2>
      <ul className="list-none p-0 m-0">
        {links.map((l) => (
          <li key={l.slug} className="py-1">
            <Link
              to={lp(`/blog/${l.slug}`)}
              className="text-[#0A264A] font-semibold underline"
            >
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

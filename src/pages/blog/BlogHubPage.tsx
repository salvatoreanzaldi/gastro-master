// Batch 6 Phase 3 — Kategorie-Hub (/de/blog/thema/:hubSlug).
// Content kommt vollständig aus src/data/blog-hub-content.ts (eine Quelle für
// React UND Prerenderer — Muster money-page-links.ts / blog-landing-content.ts).
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useLangPath } from "@/components/LanguageLayout";
import { hubBySlug } from "@/data/blog-hub-content";
import { blogPosts } from "@/data/blog-posts";
import { stripMarkdown } from "@/lib/utils";

const BlogHubPage = () => {
  const { hubSlug } = useParams();
  const lp = useLangPath();
  const hub = hubSlug ? hubBySlug(hubSlug) : null;

  useSeoMeta({
    title: hub?.metaTitle ?? "Blog | Gastro Master",
    description: hub?.description ?? "",
    canonical: hub ? `https://gastro-master.de/de/blog/thema/${hub.slug}` : undefined,
  });

  if (!hub) return <Navigate to="/de/blog" replace />;

  const categoryPosts = blogPosts
    .filter((p) => p.category === hub.category)
    .map((p) => ({ slug: p.slug, title: stripMarkdown(p.title).replace(/\s*\|\s*Gastro Master\s*$/i, "").trim() }))
    .sort((a, b) => (a.slug < b.slug ? -1 : 1));
  const titleOf = (slug: string) => categoryPosts.find((p) => p.slug === slug)?.title ?? slug;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A264A" }}>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />

      {/* ── Hero ── */}
      <section className="mesh-gradient px-5 md:px-8 lg:px-16 pt-28 pb-14 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8 flex-wrap" aria-label="Brotkrumen">
            <Link to={lp("/")} className="hover:text-white/70 transition-colors">Startseite</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to={lp("/blog")} className="hover:text-white/70 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white/60">{hub.category}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">{hub.title}</h1>
          <p className="text-lg text-white/60 leading-relaxed">{hub.description}</p>
        </div>
      </section>

      {/* ── Body ── */}
      <article className="px-5 md:px-8 lg:px-16 py-14 bg-[#091A33]">
        <div className="max-w-3xl mx-auto space-y-6 text-white/65 text-base leading-relaxed">
          {hub.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {/* Vergleichstabelle */}
          <h2 className="text-white text-2xl font-black mt-12 mb-4">{hub.lawTableTitle}</h2>
          <div className="overflow-x-auto -mx-5 md:mx-0">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr>
                  {["Thema", "Gesetzliche Grundlage", "Frist / Grenzwert", "Häufigster Fehler"].map((h) => (
                    <th key={h} className="text-left py-3 px-3 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {hub.lawTable.map((r) => (
                  <tr key={r.sourceSlug} className="hover:bg-white/[0.02] transition-colors align-top">
                    <td className="py-3 px-3">
                      <Link to={lp(`/blog/${r.sourceSlug}`)} className="text-cyan-brand hover:underline font-semibold text-xs">{r.thema}</Link>
                    </td>
                    <td className="py-3 px-3 text-white/70 text-xs">{r.grundlage}</td>
                    <td className="py-3 px-3 text-white/70 text-xs">{r.grenzwert}</td>
                    <td className="py-3 px-3 text-white/50 text-xs">{r.fehler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Entscheidungspfad */}
          <h2 className="text-white text-2xl font-black mt-12 mb-2">{hub.decisionTitle}</h2>
          <p>{hub.decisionIntro}</p>
          <div className="space-y-4 mt-6">
            {hub.decisionPath.map((step) => (
              <div key={step.frage} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-white text-base font-bold mb-2 mt-0">{step.frage}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-3">{step.antwort}</p>
                <ul className="space-y-1.5 list-none p-0 m-0">
                  {step.slugs.map((s) => (
                    <li key={s} className="min-w-0">
                      <Link to={lp(`/blog/${s}`)} className="text-cyan-brand hover:underline text-sm block truncate" title={titleOf(s)}>
                        → {titleOf(s)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="text-white text-2xl font-black mt-12 mb-4">{hub.faqTitle}</h2>
          <div className="space-y-4">
            {hub.faq.map((f) => (
              <div key={f.q} className="rounded-xl bg-white/[0.03] border border-white/8 p-5">
                <h3 className="text-white/85 text-sm font-semibold mb-1.5 mt-0">{f.q}</h3>
                <p className="text-white/50 text-sm leading-relaxed m-0">{f.a}</p>
              </div>
            ))}
          </div>

          {hub.outro.map((p, i) => (
            <p key={`o${i}`}>{p}</p>
          ))}

          {/* Alle Ratgeber der Kategorie */}
          <h2 className="text-white text-2xl font-black mt-12 mb-4">Alle Ratgeber zu {hub.category}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-none p-0 m-0 text-[0.9rem]">
            {categoryPosts.map((p) => (
              <li key={p.slug} className="min-w-0">
                <Link to={lp(`/blog/${p.slug}`)} title={p.title} className="block truncate text-white/80 hover:text-accent hover:underline transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-8">
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenloses Erstgespräch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogHubPage;

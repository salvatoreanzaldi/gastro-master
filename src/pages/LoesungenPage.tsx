import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Star,
  UtensilsCrossed, Coffee, Truck, Store, Building2,
  ShoppingCart, Smartphone, Globe, Monitor, Percent,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TargetGroupSection from "@/components/landing/TargetGroupSection";

/* ─── Helpers ────────────────────────────────────────────── */

function renderWithLinks(text: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link key={key++} to={match[2]} className="text-cyan-brand hover:underline font-medium">
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

const plainText = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/* ─── Data ───────────────────────────────────────────────── */

const SOLUTION_HREFS: Record<string, string> = {
  lieferdienst: "/loesungen/lieferdienst",
  franchise: "/loesungen/franchise",
  ghost: "/loesungen/lieferservice-gruenden",
  einzelhandel: "/loesungen/restaurant",
  baeckerei: "/loesungen/cafe-baeckerei",
  pizzeria: "/loesungen/lieferdienst",
  asiatisch: "/loesungen/lieferdienst",
  indisch: "/loesungen/lieferdienst",
  burger: "/loesungen/lieferdienst",
  eis: "/loesungen/cafe-baeckerei",
  "baeckerei-sub": "/loesungen/cafe-baeckerei",
  "franchise-sub": "/loesungen/franchise",
};

const SOLUTIONS = [
  {
    Icon: UtensilsCrossed,
    label: "Restaurant",
    problem: "Du brauchst ein Kassensystem, das einfach funktioniert?",
    tagline: "TSE-konforme Kasse, Online-Bestellungen, alles aus einer Hand.",
    href: "/loesungen/restaurant",
  },
  {
    Icon: Coffee,
    label: "Café & Bäckerei",
    problem: "Lange Schlangen und keine Online-Vorbestellungen?",
    tagline: "Schnell kassieren, Torten vorbestellen, Click & Collect.",
    href: "/loesungen/cafe-baeckerei",
  },
  {
    Icon: Truck,
    label: "Lieferdienst gründen",
    problem: "Du willst deinen eigenen Lieferdienst starten — ohne Lieferando?",
    tagline: "Eigenes Bestellsystem, 0 % Provision, live in 2–3 Wochen.",
    href: "/loesungen/lieferservice-gruenden",
  },
  {
    Icon: Store,
    label: "Lieferdienst erweitern",
    problem: "Du hast schon ein Lokal und willst auch liefern?",
    tagline: "Bestellsystem und Fahrer-App, 0 % Provision, für bestehende Betriebe.",
    href: "/loesungen/lieferdienst",
  },
  {
    Icon: Building2,
    label: "Franchise",
    problem: "Du willst dein Konzept auf mehrere Standorte ausweiten?",
    tagline: "App, Shop, Kasse und Webseite — einheitlich, zentral gesteuert.",
    href: "/loesungen/franchise",
  },
];

const PRODUCTS_QUICK = [
  { Icon: Monitor,      name: "Kassensystem",    tagline: "TSE-konform, ab 69 €/Monat",     href: "/produkte/kassensystem"       },
  { Icon: ShoppingCart, name: "Online Shop",      tagline: "0 % Provision, ab 79 €/Monat",  href: "/produkte/webshop"            },
  { Icon: Smartphone,   name: "App System",       tagline: "iOS & Android, ab 149 €/Monat", href: "/produkte/app"                },
  { Icon: Globe,        name: "Webseite",          tagline: "Professionell, ab 49 €/Monat",  href: "/produkte/webseite"           },
  { Icon: Percent,      name: "Zahlungsgebühren", tagline: "Kein Abzug vom Umsatz",         href: "/produkte/transaktionsumlage" },
];

interface FaqItem { q: string; a: string; }

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Welche Software brauche ich für mein Restaurant?",
    a: "Für ein Restaurant empfehlen wir das [Gastro Master Kassensystem](/produkte/kassensystem) ab 69 €/Monat. Es ist TSE-konform und hat Tischverwaltung. Du kannst zusätzlich einen [Online-Shop](/produkte/webshop) oder eine [App](/produkte/app) dazu nehmen.",
  },
  {
    q: "Was kostet ein digitales Bestellsystem für die Gastronomie?",
    a: "Der [Online-Shop](/produkte/webshop) kostet ab 79 €/Monat, die [App](/produkte/app) ab 149 €/Monat, die [Webseite](/produkte/webseite) ab 49 €/Monat und das [Kassensystem](/produkte/kassensystem) ab 69 €/Monat. Die Einrichtung wird individuell besprochen. Du zahlst 0 % Provision.",
  },
  {
    q: "Bietet Gastro Master Lösungen für Cafés und Bäckereien?",
    a: "Ja. Wir haben eine [eigene Lösung für Cafés und Bäckereien](/loesungen/cafe-baeckerei). Dazu gehören ein TSE-konformes [Kassensystem](/produkte/kassensystem), ein [Online-Shop für Vorbestellungen](/produkte/webshop) und eine [App für deine Stammkunden](/produkte/app).",
  },
  {
    q: "Kann ich mit Gastro Master einen eigenen Lieferdienst starten?",
    a: "Ja. Du bekommst ein [Bestellsystem](/produkte/webshop), eine [App](/produkte/app) und bei Bedarf eine Fahrer-App. Keine Provision. In 2–3 Wochen bist du live. Alles zur [Lieferdienst-Gründung](/loesungen/lieferservice-gruenden).",
  },
  {
    q: "Gibt es eine Franchise-Lösung von Gastro Master?",
    a: "Ja. Alle Standorte arbeiten mit demselben System — einheitliches Branding, zentrale Verwaltung, 0 % Provision. Details zur [Franchise-Lösung](/loesungen/franchise).",
  },
];

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": plainText(a) },
  })),
};

const SCHEMA_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Digitale Lösungen für die Gastronomie 2026 — Restaurant, Café, Lieferdienst, Franchise",
  "description": "Gastro Master bietet digitale Komplettlösungen für Gastronomie: Kassensystem, Online-Bestellshop, App und Webseite.",
  "url": "https://gastro-master.de/loesungen",
  "publisher": { "@type": "Organization", "name": "Gastro Master", "url": "https://gastro-master.de" },
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-29",
};

const TRUST_ITEMS = [
  { value: "700+",             label: "Gastro-Betriebe vertrauen uns" },
  { value: "5,0 ★",           label: "Kundenbewertung auf Google" },
  { value: "TSE-konform",     label: "Alle Systeme zertifiziert" },
  { value: "Persönl. Support", label: "Euer Team hilft direkt" },
];

/* ─── Page ───────────────────────────────────────────────── */

const LoesungenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Digitale Lösungen für die Gastronomie 2026 | Gastro Master",
    description: "Gastro Master bietet digitale Komplettlösungen für Gastronomie: Kassensystem, Online-Bestellshop, App und Webseite. Für Restaurants, Cafés, Lieferdienste und Franchise. Jetzt kostenlos beraten lassen.",
    canonical: "https://gastro-master.de/loesungen",
  });

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }}
      />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────────── */}
      <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.12), transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-cyan-brand" />
              Gastronomie Software · Digitale Lösungen
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Finde deine{" "}
              <span className="text-gradient-brand">Lösung.</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
              Egal ob Restaurant, Café, Lieferdienst oder Franchise —
              wir haben die passende Lösung für dich.
            </p>

            {/* GEO Definition Block */}
            <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border border-white/10 bg-white/5 text-left">
              <p className="text-white/40 text-xs leading-relaxed">
                <span className="text-white/60 font-semibold">Gastro Master</span>{" "}
                bietet digitale Komplettlösungen für die Gastronomie — vom TSE-konformen
                Kassensystem über Online-Bestellshops bis zur eigenen Bestell-App. 700+ Gastronomen
                in Deutschland nutzen Gastro Master für Restaurant, Café, Bäckerei, Lieferdienst
                und Franchise-Systeme.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/kontakt"
                className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2 shadow-lg"
              >
                Kostenloses Beratungsgespräch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <p className="text-white/40 text-sm mt-5">
              700+ Gastronomen nutzen Gastro Master — finde heraus warum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: TARGET GROUP SECTION ─────────────────────────────── */}
      <TargetGroupSection
        getSolutionHref={(group, sub) => SOLUTION_HREFS[sub ?? group] ?? null}
        ctaLabel="Zur Lösung"
      />

      {/* ── S3: LÖSUNGS-CARDS ────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
              Lösungen
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              Was ist dein Problem?
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/45 text-base max-w-xl mx-auto">
              Klick auf die Lösung, die zu dir passt. Du siehst sofort alles, was du brauchst.
            </p>
          </motion.div>

          {/* SEO/GEO text */}
          <div className="max-w-3xl mx-auto mb-12 p-4 rounded-xl border border-[#0A264A]/[0.07] dark:border-white/[0.07] bg-[#f8fafc] dark:bg-white/[0.03] text-left">
            <p className="text-[#0A264A]/50 dark:text-white/40 text-xs leading-relaxed">
              Gastro Master bietet digitale Komplettlösungen für alle Bereiche der Gastronomie —
              vom Restaurant und Café über den Lieferdienst bis zum Franchise-System.
              Alle Lösungen nutzen dieselben Produkte: Kassensystem, Online-Bestellshop, App und Webseite.
              Du kannst einzelne Produkte einsetzen oder kombinieren — je nachdem, was dein Betrieb braucht.
            </p>
          </div>

          {/* 3+2 grid — 5 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`group rounded-2xl bg-[#0A264A]/[0.03] dark:bg-white/[0.04] border border-[#0A264A]/[0.08] dark:border-white/[0.07] hover:border-cyan-brand/30 hover:bg-[#0A264A]/[0.05] dark:hover:bg-white/[0.07] transition-all duration-300 p-7 flex flex-col lg:col-span-2 ${
                  i === 3 ? "lg:col-start-2" : i === 4 ? "lg:col-start-4" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-brand/10 flex items-center justify-center flex-shrink-0">
                    <s.Icon className="w-6 h-6 text-cyan-brand" />
                  </div>
                  <span className="text-xs font-bold text-[#0A264A]/40 dark:text-white/35 uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white leading-snug mb-3 flex-1">
                  {s.problem}
                </h3>
                <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed mb-6">
                  {s.tagline}
                </p>

                <Link
                  to={s.href}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform w-full md:w-auto self-start"
                >
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKT-SCHNELLÜBERSICHT ─────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">
              Produkte
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              Alle Produkte auf einen Blick
            </h2>
            <p className="text-white/45 text-sm max-w-xl mx-auto">
              Hinter jeder Lösung stecken diese Produkte. Du kannst sie einzeln oder kombiniert einsetzen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRODUCTS_QUICK.map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={p.href}
                  className="group block rounded-2xl bg-white/[0.06] border border-white/[0.09] hover:border-cyan-brand/30 hover:bg-white/[0.09] transition-all duration-300 p-5 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-brand/15 flex items-center justify-center mx-auto mb-3">
                    <p.Icon className="w-5 h-5 text-cyan-brand" />
                  </div>
                  <h3 className="font-black text-white text-sm mb-1">{p.name}</h3>
                  <p className="text-white/45 text-xs leading-snug">{p.tagline}</p>
                  <div className="mt-3 text-cyan-brand text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 justify-center">
                    Mehr erfahren <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/produkte" className="text-cyan-brand font-semibold hover:underline text-sm">
              Alle Produkte ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: IMPULS-CTA ───────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
              Nicht sicher, was zu dir passt?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
              Wir finden zusammen<br className="hidden md:block" /> die richtige Lösung.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              In einem kostenlosen Gespräch schauen wir uns deinen Betrieb an.
              Du bekommst eine klare Empfehlung — ohne Verpflichtung.
            </p>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/kontakt"
                className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/20"
              >
                Kostenloses Beratungsgespräch buchen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── S6: TRUST-STRIP ──────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-10 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((t, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-white mb-1">{t.value}</p>
                <p className="text-white/50 text-xs leading-snug">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              Häufige Fragen
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-base max-w-xl mx-auto">
              Kurze Antworten auf die Fragen, die am häufigsten kommen.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#0A264A]/10 dark:border-white/10 bg-[#f8fafc] dark:bg-white/5 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-[#0A264A] dark:text-white text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0A264A]/40 dark:text-white/40 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-6 pb-5 text-[#0A264A]/60 dark:text-white/60 text-sm leading-relaxed">
                        {renderWithLinks(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoesungenPage;

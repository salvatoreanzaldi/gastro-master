import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Building2, ClipboardList, Target, Monitor,
  ChevronDown, ExternalLink, ShoppingCart, Smartphone, Globe, Percent,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import imgWebshop     from "@/assets/screenshots/take-startbild.jpeg";
import imgApp         from "@/assets/mockups/Mock Up - Branding Hero.png";
import imgKasse       from "@/assets/heroes/hero-pos-system.png";
import imgWebseite    from "@/assets/heroes/Hero - Gastro Master.PNG";
import imgTransaktion from "@/assets/addons/9 - Zahlungsmethoden.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  source: string;
  href: string;
}

interface StepItem {
  num: string;
  icon: LucideIcon;
  title: string;
  text: string;
  highlight: string;
  featured?: boolean;
  products?: Array<{ label: string; href: string }>;
}

interface CompareRow {
  label: string;
  own: string;
  ownGood: boolean;
  platform: string;
  platformBad: boolean;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const STATS: StatItem[] = [
  {
    value: "6,1 Mrd. €",
    label: "Online-Bestellungen Deutschland (2023)",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "9,9 Mrd. €",
    label: "Erwarteter Umsatz bis 2028 — 62\u202f% Wachstum",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "bis 30 %",
    label: "Provision, die Lieferando von dir nimmt",
    source: "Berliner Abendblatt",
    href: "https://berliner-abendblatt.de/berlin-news/lieferando-hoehere-provisionen-fuer-restaurants-id162852",
  },
  {
    value: "ab 79 €",
    label: "pro Monat — eigenes Bestellsystem, sofort startklar",
    source: "Gastro Master",
    href: "https://gastro-master.de/produkte/webshop",
  },
];

export const STEPS: StepItem[] = [
  {
    num: "01",
    icon: Monitor,
    title: "Dein Bestellsystem einrichten",
    text: "Hier entscheidest du: Provision für immer — oder ab jetzt 0 %? Mit Gastro Master bekommst du Webshop, App und Kassensystem. Kein Vorwissen nötig, live in 2–3 Wochen.",
    highlight: "0 % Provision ab dem ersten Auftrag. Persönliche Einrichtungsbegleitung.",
    featured: true,
    products: [
      { label: "Webshop (0 % Provision)", href: "/produkte/webshop" },
      { label: "Bestell-App",             href: "/produkte/app" },
      { label: "Zahlungsgebühren",         href: "/produkte/transaktionsumlage" },
      { label: "Webseite",                href: "/produkte/webseite" },
    ],
  },
  {
    num: "02",
    icon: Target,
    title: "Eine Nische wählen — nicht alles anbieten",
    text: "Fokus schlägt breites Angebot. Ein Lieferdienst für vegane Bowls gewinnt schneller Stammkunden als ein Rundum-Anbieter. Starte mit einer Küchenkategorie.",
    highlight: "Empfehlung zum Start: 1 Küchen-Kategorie, 8–12 Gerichte, 1 Liefergebiet.",
  },
  {
    num: "03",
    icon: Building2,
    title: "Geschäftsmodell wählen",
    text: "Eigenproduktion, Ghost Kitchen (Küche ohne Gastraum) oder Vermittlung? Eine Ghost Kitchen spart 60–80 % Mietkosten.",
    highlight: "Ghost Kitchen: 60–80 % weniger Mietkosten als ein klassisches Restaurant",
  },
  {
    num: "04",
    icon: ClipboardList,
    title: "Gewerbe anmelden",
    text: "Die Gewerbeanmeldung kostet 20–60 € und ist in wenigen Tagen erledigt. Du brauchst außerdem eine Hygiene-Schulung (HACCP) und ein Gesundheitszeugnis. Keine Gaststättenerlaubnis nötig.",
    highlight: "Kosten: 20–60 €. Dauer: 1–2 Wochen. Kein Führerschein nötig.",
  },
];

export const COMPARE_ROWS: CompareRow[] = [
  { label: "Provision pro Bestellung",    own: "0 %",                        ownGood: true,  platform: "13–30 %",                 platformBad: true  },
  { label: "Kundendaten gehören dir",     own: "✓ Vollständig",              ownGood: true,  platform: "✗ Gehören der Plattform", platformBad: true  },
  { label: "Eigene Marke & App",          own: "✓ Eigene Domain & App",      ownGood: true,  platform: "✗ Plattform-Branding",    platformBad: true  },
  { label: "Preisgestaltung",             own: "✓ Vollständig frei",         ownGood: true,  platform: "Eingeschränkt",            platformBad: false },
  { label: "Monatliche Kosten",           own: "ab 79 €/Monat",             ownGood: true,  platform: "% vom Umsatz (variabel)",  platformBad: false },
  { label: "Sichtbarkeit",               own: "Eigene Webseite & Werbung",  ownGood: false, platform: "✓ In der Plattform",       platformBad: false },
  { label: "Kundenbewertungen",           own: "✓ Direkt & vollständig",     ownGood: true,  platform: "Nur über Plattform",       platformBad: false },
  { label: "Betreuung & Einrichtung",     own: "✓ Persönlich (700+ Kunden)", ownGood: true,  platform: "Ticket-System",            platformBad: false },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Lohnt sich ein eigener Lieferdienst 2026?",
    a: "Ja — der Markt wächst laut Statista von 6,1\u202fMrd.\u202f€ (2023) auf 9,9\u202fMrd.\u202f€ bis 2028. Wer früh ein eigenes System aufbaut, zahlt keine Provision mehr. Mit einem [digitalen Bestellsystem für Gastronomie](/produkte/webshop) startest du ab 79\u202f€/Monat — statt bis zu 30\u202f% auf jeden Auftrag.",
  },
  {
    q: "Was kostet es, einen Lieferdienst zu gründen?",
    a: "Das hängt davon ab, wie du starten willst. Die Gewerbeanmeldung kostet 20–60 €. Für eine Ghost Kitchen (Küche ohne Gastraum) sind Startkosten ab 2.000–5.000 € realistisch. Das Bestellsystem — [Webshop](/produkte/webshop) und [eigene Bestell-App](/produkte/app) — kostet ab 79 €/Monat. Das meiste Geld sparst du im laufenden Betrieb: keine Gebühren von 13–30 % auf jeden Auftrag. Alle Kosten im Überblick findest du in der [vollständigen Preisübersicht](/preise).",
  },
  {
    q: "Brauche ich ein Restaurant, um einen Lieferdienst zu starten?",
    a: "Nein. Du kannst als Ghost Kitchen starten — das ist eine Küche ohne Gastraum, nur für Lieferungen. Das spart viel Miete und macht den Start günstiger. Du brauchst nur eine Gewerbeanmeldung und musst die Hygiene-Regeln für Lebensmittel einhalten. Wenn du ein bestehendes Restaurant hast, findest du passende Lösungen auf der [Seite für Restaurants](/loesungen/restaurant).",
  },
  {
    q: "Wie viel Provision nimmt Lieferando?",
    a: "Lieferando nimmt 13\u202f% Provision, wenn du eigene Fahrer hast. Mit Lieferando-Fahrern steigt das auf bis zu 30\u202f% pro Bestellung. Bei Wolt und Uber Eats sind es ähnlich 15–30\u202f%. Quelle: Berliner Abendblatt. Mit einem [eigenen Lieferdienst ohne Provision](/loesungen/lieferdienst) zahlst du stattdessen einen festen Monatsbetrag — ohne Abzüge auf jede Bestellung.",
  },
  {
    q: "Welche Genehmigungen brauche ich für einen Lieferdienst?",
    a: "Du brauchst: (1) Gewerbeanmeldung beim Gewerbeamt (20–60\u202f€), (2) Hygiene-Schulung (HACCP) — online möglich, ca.\u202f20–50\u202f€, (3) Gesundheitszeugnis für alle, die mit Lebensmitteln arbeiten (ca.\u202f30\u202f€). Eine Gaststättenerlaubnis brauchst du nicht, wenn du nur lieferst. Unser Team berät dich kostenlos — schreib uns einfach über das [Kontaktformular](/kontakt).",
  },
];

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
  })),
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://gastro-master.de/" },
    { "@type": "ListItem", "position": 2, "name": "Lösungen", "item": "https://gastro-master.de/loesungen" },
    { "@type": "ListItem", "position": 3, "name": "Lieferservice gründen", "item": "https://gastro-master.de/loesungen/lieferservice-gruenden" },
  ],
};

const SCHEMA_HOWTO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Eigenen Lieferdienst gründen — in 4 Schritten",
  "description": "Schritt-für-Schritt Anleitung zum Aufbau eines eigenen Lieferdienstes ohne Plattformabhängigkeit — von der Gewerbeanmeldung bis zum ersten Auftrag.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Bestellsystem einrichten",
      "text": "Mit Gastro Master bekommst du Webshop, App und Kassensystem. Kein Vorwissen nötig, live in 2–3 Wochen. 0 % Provision ab dem ersten Auftrag.",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Eine Nische wählen",
      "text": "Starte mit einer Küchenkategorie, 8–12 Gerichten und einem Liefergebiet. Fokus schlägt breites Angebot.",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Geschäftsmodell wählen",
      "text": "Eigenproduktion, Ghost Kitchen (Küche ohne Gastraum) oder Vermittlung wählen. Eine Ghost Kitchen spart 60–80 % Mietkosten.",
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Gewerbe anmelden",
      "text": "Die Gewerbeanmeldung kostet 20–60 € und ist in wenigen Tagen erledigt. Zusätzlich: Hygiene-Schulung (HACCP) und Gesundheitszeugnis. Keine Gaststättenerlaubnis nötig.",
    },
  ],
};

const SCHEMA_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Eigenen Lieferdienst gründen — der komplette Leitfaden für 2026",
  "description": "Schritt-für-Schritt Anleitung zum Aufbau eines eigenen Lieferdienstes ohne Plattformabhängigkeit.",
  "author":    { "@type": "Organization", "name": "Gastro Master", "url": "https://gastro-master.de" },
  "publisher": { "@type": "Organization", "name": "Gastro Master", "url": "https://gastro-master.de" },
  "datePublished": "2026-01-01",
  "dateModified":  "2026-03-28",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://gastro-master.de/loesungen/lieferservice-gruenden",
  },
};

// ─── renderFaqLinks ────────────────────────────────────────────────────────────
const renderFaqLinks = (text: string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={m[2]} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

// ─── Page Component ───────────────────────────────────────────────────────────

const LieferserviceGruendenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Lieferdienst gründen 2026 — Kompletter Leitfaden | Gastro Master",
    description: "Eigenen Lieferdienst aufbauen ohne Lieferando. Schritt-für-Schritt: Gewerbeanmeldung, Kosten, Bestellsystem — 0 % Provision mit Gastro Master.",
    canonical: "https://gastro-master.de/loesungen/lieferservice-gruenden",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A264A]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }}
      />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] pt-36 pb-24 px-5 md:px-8 lg:px-16">
        {/* Background glow */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <p className="text-white/35 text-sm font-medium mb-5">
            Lösungen{" "}
            <span className="text-white/20 mx-2">→</span>
            <span className="text-cyan-brand">Lieferdienst gründen</span>
          </p>

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            Lieferdienst gründen 2026
          </motion.span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Starte deinen eigenen Lieferdienst —{" "}
            <span className="text-gradient-brand">
              ohne Lieferando, ohne 30&nbsp;% Provision
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8"
          >
            Du bekommst dein eigenes Bestellsystem — keine Provision, kein Vorwissen nötig,
            live in 2–3 Wochen. So wie 700+ Gastronomen vor dir.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              Kostenlose Beratung anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#steps"
              className="text-white/50 text-sm font-medium inline-flex items-center gap-1.5 hover:text-white/70 transition-colors"
            >
              In 4 Schritten zum Lieferdienst ↓
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {["0 % Provision", "700+ Kunden", "In 2–3 Wochen live", "Persönlicher Support"].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.10] text-white/65 text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand flex-shrink-0" />
                {pill}
              </span>
            ))}
          </motion.div>

          {/* GEO Definition Block — kompakter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="border-l-2 border-cyan-brand/50 bg-white/[0.04] rounded-r-lg px-4 py-3 max-w-2xl"
          >
            <span className="text-cyan-brand/70 text-[10px] font-bold uppercase tracking-widest block mb-1">
              Definition
            </span>
            <p className="text-white/45 text-xs leading-relaxed">
              Eigener Lieferdienst bedeutet: Kunden bestellen auf deiner Webseite oder App.
              Du zahlst keine Provision an Lieferando oder Wolt.{" "}
              <strong className="text-white/65 font-semibold">Du behältst 100&nbsp;% deines Umsatzes.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: MARKTSTATISTIKEN ───────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-20 md:py-28 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              Marktdaten
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              Immer mehr Menschen bestellen online — das ist deine Chance
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg">
              Der Markt wächst. Wer jetzt startet, ist früh dabei.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-2xl p-6 border ${
                  i === 0
                    ? "bg-[#0A264A] border-transparent"
                    : "bg-white dark:bg-white/[0.04] border-[#0A264A]/[0.08] dark:border-white/[0.08]"
                }`}
              >
                <p
                  className={`text-3xl md:text-4xl font-black tracking-tight leading-none mb-2 ${
                    i === 0 ? "text-cyan-brand" : "text-[#0A264A] dark:text-white"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-sm leading-snug mb-4 ${
                    i === 0 ? "text-white/55" : "text-[#0A264A]/50 dark:text-white/50"
                  }`}
                >
                  {stat.label}
                </p>
                <a
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] underline underline-offset-2 inline-flex items-center gap-1 ${
                    i === 0
                      ? "text-white/25 hover:text-cyan-brand"
                      : "text-[#0A264A]/25 dark:text-white/25 hover:text-cyan-brand"
                  } transition-colors`}
                >
                  Quelle: {stat.source}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Mini CTA */}
          <div className="text-center mt-10">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 text-[#0A264A] dark:text-white font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              Jetzt eigenen Lieferdienst aufbauen
              <ArrowRight className="w-4 h-4 text-cyan-brand" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S3: PRODUKT-BUNDLE ────────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] py-20 md:py-28 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              Komplettlösung · Gastro Master
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Alles was du brauchst — aus einer Hand
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Fünf Produkte, die perfekt zusammenpassen. Du entscheidest, was du brauchst.
            </p>
          </div>

          {/* Top 3 — large image cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { img: imgWebshop,  title: "Online Shop",   alt: "Online Bestellshop für Gastronomie — 0 % Provision mit Gastro Master",  tagline: "So sieht dein Online Shop aus",               href: "/produkte/webshop" },
              { img: imgApp,      title: "Bestell-App",   alt: "Eigene Bestell-App für Restaurants und Lieferdienste — Gastro Master",   tagline: "Deine eigene Bestell-App",                    href: "/produkte/app"     },
              { img: imgKasse,    title: "Kassensystem",  alt: "TSE-konformes Kassensystem für Gastronomen — Gastro Master POS",         tagline: "Dein Kassensystem — übersichtlich & einfach", href: "/produkte/kassensystem" },
            ].map(({ img, title, alt, tagline, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img src={img} alt={alt} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A]/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-white font-bold text-base mb-1">{title}</p>
                  <p className="text-white/55 text-xs mb-3">{tagline}</p>
                  <Link to={href} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">
                    Mehr erfahren <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom 2 — centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { img: imgWebseite,    title: "Webseite",           alt: "Professionelle Webseite für Gastronomie — gefunden auf Google",  tagline: "Deine Webseite — gefunden auf Google",      href: "/produkte/webseite"          },
              { img: imgTransaktion, title: "Zahlungsgebühren weitergeben", alt: "Transaktionsumlage — Zahlungsgebühren transparent an Kunden weitergeben",  tagline: "Deine Kunden zahlen die Gebühren — automatisch",  href: "/produkte/transaktionsumlage"},
            ].map(({ img, title, alt, tagline, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24 + i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-40">
                  <img src={img} alt={alt} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A]/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-white font-bold text-base mb-1">{title}</p>
                  <p className="text-white/55 text-xs mb-3">{tagline}</p>
                  <Link to={href} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">
                    Mehr erfahren <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-amber text-[#0A264A] font-bold text-base shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
            >
              Kostenlos beraten lassen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S4: VERGLEICHSTABELLE ───────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              Vergleich
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              Was ist besser: Eigenes System oder Lieferando?
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg max-w-xl mx-auto">
              Warum 700+ Gastronomen auf ihr eigenes Bestellsystem gewechselt haben
            </p>
          </div>

          {/* Table — horizontal scroll on mobile */}
          <div className="overflow-x-auto rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] shadow-lg">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/45 dark:text-white/30 font-semibold text-xs uppercase tracking-wider text-left px-6 py-4 w-[38%]">
                    Kriterium
                  </th>
                  <th className="bg-[#0A264A] px-6 py-4 text-center">
                    <span className="text-cyan-brand text-[10px] font-bold uppercase tracking-widest block mb-0.5">
                      Empfohlen
                    </span>
                    <span className="text-white font-bold text-sm">Eigener Lieferdienst</span>
                    <span className="text-white/40 text-xs font-normal block">mit Gastro Master</span>
                  </th>
                  <th className="bg-[#fff8f0] dark:bg-amber-950/30 px-6 py-4 text-center">
                    <span className="text-amber-800 dark:text-amber-400 font-bold text-sm">
                      Lieferando / Wolt / Uber Eats
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#fafafa] dark:bg-white/[0.02]"}
                  >
                    <td className="px-6 py-4 text-sm text-[#0A264A]/60 dark:text-white/50 font-medium border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">
                      {row.label}
                    </td>
                    <td className="px-6 py-4 text-center text-sm border-b border-[#0A264A]/[0.05] dark:border-white/[0.05] bg-[#0A264A]/[0.02] dark:bg-white/[0.01]">
                      <span className={row.ownGood ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-[#0A264A]/55 dark:text-white/45"}>
                        {row.own}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm border-b border-[#0A264A]/[0.05] dark:border-white/[0.05] bg-amber-50/50 dark:bg-amber-950/10">
                      <span className={row.platformBad ? "text-red-500 font-bold" : "text-[#0A264A]/55 dark:text-white/45"}>
                        {row.platform}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Savings Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-[#0A264A] to-[#0D3266] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10"
          >
            {/* Left: Rechenbeispiel */}
            <div className="flex-1">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                Rechenbeispiel
              </p>
              <p className="text-white text-xl md:text-2xl font-black leading-snug mb-3">
                Bei 3.000&nbsp;€ Monatsumsatz zahlst du an Lieferando{" "}
                <span className="text-amber-400">bis zu 900&nbsp;€ Provision</span> — jeden Monat.
              </p>
              <p className="text-white/55 text-sm">
                Mit Gastro Master: nur 79&nbsp;€/Monat, 0&nbsp;% Provision auf deine Bestellungen.{" "}
                <Link to="/preise" className="text-cyan-brand/70 underline underline-offset-2 hover:text-cyan-brand transition-colors">
                  Alle Kosten im Überblick →
                </Link>
              </p>
            </div>
            {/* Right: Ersparnis + CTA */}
            <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <div className="md:text-right">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                  Was du im Jahr sparst
                </p>
                <p className="text-5xl font-black text-cyan-brand leading-none">9.852&nbsp;€</p>
                <p className="text-white/35 text-xs mt-1">bei 3.000&nbsp;€ Monatsumsatz</p>
              </div>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-amber text-[#0A264A] font-bold text-sm whitespace-nowrap hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
              >
                Jetzt starten — 0 % Provision
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S5: SCHRITT-FÜR-SCHRITT ─────────────────────────────────────────── */}
      <section id="steps" className="bg-[#0A264A] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-10 bg-white/15" />
            <span className="text-white/35 text-xs font-bold uppercase tracking-widest">
              Gründungsanleitung
            </span>
            <div className="h-px w-10 bg-white/15" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            In 4 Schritten zum eigenen Lieferdienst
          </h2>
          <p className="text-white/50 text-lg max-w-xl mb-14">
            Von der Idee bis zum ersten Auftrag — was du wirklich brauchst
          </p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-2xl p-7 md:p-8 overflow-hidden ${
                    step.featured
                      ? "border border-cyan-brand/30 bg-cyan-brand/[0.06]"
                      : "border border-white/[0.08] bg-white/[0.04]"
                  }`}
                >
                  {/* Watermark number */}
                  <span className="absolute top-3 right-5 text-7xl font-black text-white/[0.04] leading-none select-none pointer-events-none">
                    {step.num}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-cyan-brand" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-7 mb-4">{step.text}</p>

                  {/* Highlight box */}
                  <div className="rounded-xl bg-cyan-brand/[0.08] border border-cyan-brand/[0.15] px-4 py-3 text-cyan-brand text-sm font-medium">
                    {step.highlight}
                  </div>

                  {/* Product link chips (step 4 only) */}
                  {step.products && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {step.products.map((p) => (
                        <Link
                          key={p.href}
                          to={p.href}
                          className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-1.5 text-white/65 text-xs font-medium hover:border-cyan-brand hover:text-cyan-brand transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand opacity-60 flex-shrink-0" />
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] py-8 px-5 md:px-8 lg:px-16 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "700+",             label: "Gastro-Betriebe vertrauen auf Gastro Master" },
              { value: "5,0 ★",           label: "Kundenbewertung auf Google" },
              { value: "TSE-konform",     label: "Alle Systeme TSE-zertifiziert" },
              { value: "Persönl. Support", label: "Euer Team hilft direkt" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="text-cyan-brand font-black text-lg leading-none">{value}</span>
                <span className="text-white/40 text-sm leading-snug max-w-[120px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              Häufige Fragen zum Thema Lieferdienst gründen
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-base">
              Die Fragen, die Gründer an Google und KI-Assistenten stellen
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/[0.04] rounded-2xl border border-[#0A264A]/[0.07] dark:border-white/[0.07] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-[#0A264A] dark:text-white text-[15px] pr-4 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-brand flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-[#0A264A]/65 dark:text-white/55 leading-7 border-t border-[#0A264A]/[0.05] dark:border-white/[0.05] pt-4">
                        {renderFaqLinks(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: CTA-ABSCHLUSS ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] py-24 md:py-32 px-5 md:px-8 lg:px-16 text-center">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }}
        />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.08] text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
            Kostenlose Beratung
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5"
          >
            Wir helfen dir,{" "}
            <span className="text-cyan-brand">deinen Lieferdienst zu starten</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10"
          >
            700+ Gastronomen haben aufgehört, Provision zu zahlen.
            Wir zeigen dir, was du brauchst — kostenlos und unverbindlich.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              Kostenloses Gespräch buchen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {[
              ["0 %", "Provision"],
              ["700+", "aktive Kunden"],
              ["5,0 ★", "Google Bewertung"],
              ["Persönlicher", "Support"],
            ].map(([val, label]) => (
              <div key={label} className="flex items-center gap-1.5 text-sm">
                <span className="text-white/70 font-semibold">{val}</span>
                <span className="text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LieferserviceGruendenPage;

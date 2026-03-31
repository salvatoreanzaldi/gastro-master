import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Monitor,
  ShoppingCart,
  Smartphone,
  Globe,
  Percent,
  ClipboardX,
  BarChart2,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

function renderWithLinks(text: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<Link key={key++} to={match[2]} className="text-cyan-brand hover:underline font-medium">{match[1]}</Link>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
const plainText = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

import imgKasse       from "@/assets/hardware/kassenhardware.png";
import imgWebshop     from "@/assets/screenshots/take-startbild.jpeg";
import imgWebseite    from "@/assets/heroes/Hero - Gastro Master.PNG";
import imgApp         from "@/assets/mockups/Mock Up - Branding Hero.png";
import imgTransaktion from "@/assets/addons/9 - Zahlungsmethoden.png";

// ─── Data ────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  source: string;
  href: string;
  isCta?: boolean;
}

const STATS: StatItem[] = [
  {
    value: "72 %",
    label: "der Gäste erwarten digitale Services — Online-Bestellung oder mobiles Zahlen",
    source: "g-wie-gastro.de",
    href: "https://g-wie-gastro.de/top-themen/digitalisierung/digitalisierung-in-der-gastronomie-der-ultimative-guide-fuer-2026/",
  },
  {
    value: "7 % MwSt.",
    label: "auf Speisen seit Januar 2026 — der reduzierte Steuersatz gilt dauerhaft",
    source: "DEHOGA Bundesverband",
    href: "https://www.dehoga-bundesverband.de/zahlen-fakten/",
  },
  {
    value: "25.000 €",
    label: "Bußgeld bei fehlender TSE-Kasse — das kannst du vermeiden",
    source: "get-sides.de",
    href: "https://www.get-sides.de/blog/kassensicherungsverordnung-gastronomie/",
  },
  {
    value: "ab 69 €",
    label: "pro Monat — dein komplettes Kassensystem, TSE-konform und sofort startklar",
    source: "Gastro Master",
    href: "/kontakt",
    isCta: true,
  },
];

interface CompareRow {
  label: string;
  gm: string;
  gmGood: boolean;
  other: string;
  otherBad: boolean;
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "TSE-konform",              gm: "✓ Immer dabei",           gmGood: true,  other: "Oft extra kosten",          otherBad: true  },
  { label: "Tischverwaltung",          gm: "✓ Inklusive",             gmGood: true,  other: "Meist teurer Zusatz",       otherBad: true  },
  { label: "Online-Bestellungen",      gm: "✓ Direkt integriert",     gmGood: true,  other: "Meistens nicht dabei",      otherBad: true  },
  { label: "Küchenmonitor",            gm: "✓ Verfügbar",             gmGood: true,  other: "Extra buchbar",             otherBad: true  },
  { label: "Fahrer-App",               gm: "✓ Verfügbar",             gmGood: true,  other: "Nicht dabei",               otherBad: true  },
  { label: "Support",                  gm: "✓ Persönlich",            gmGood: true,  other: "Nur per Hotline",           otherBad: true  },
  { label: "Monatliche Kosten",        gm: "Ab 69 €/Monat",           gmGood: true,  other: "Oft deutlich mehr",         otherBad: true  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Welches Kassensystem brauche ich für mein Restaurant?",
    a: "Du brauchst ein [Kassensystem](/produkte/kassensystem), das TSE-konform ist. Das ist seit Januar 2023 Pflicht. Tischverwaltung ist im Grundpaket dabei. Küchenmonitor und Fahrer-App kannst du dazu buchen. Gastro Master hat alles davon — ab 69 € pro Monat.",
  },
  {
    q: "Was ist eine TSE und brauche ich die?",
    a: "TSE steht für Technische Sicherheitseinrichtung. Das ist eine Technik, die deine Kasse absichert. Damit werden alle Buchungen sicher gespeichert. Das Finanzamt kann das prüfen. Seit dem 1. Januar 2023 ist die TSE Pflicht. Ohne TSE drohen Bußgelder bis zu 25.000 €. Alle [Kassensysteme von Gastro Master](/produkte/kassensystem) sind TSE-konform.",
  },
  {
    q: "Was kostet ein Kassensystem für die Gastronomie?",
    a: "Das [Kassensystem von Gastro Master](/produkte/kassensystem) kostet ab 69 € pro Monat. Darin sind TSE und Tischverwaltung inklusive. Küchenmonitor und Fahrer-App kannst du dazu buchen. Keine versteckten Kosten. Keine lange Bindung.",
  },
  {
    q: "Wie mache ich mein Restaurant online sichtbar?",
    a: "Du brauchst eine [Webseite](/produkte/webseite) — damit Gäste dich bei Google finden. Und ein [Online-Bestellsystem](/produkte/webshop) — damit sie direkt bei dir bestellen können. Gastro Master macht beides für dich. Du zahlst keine Provision an Lieferando oder andere Plattformen.",
  },
  {
    q: "Muss ich als Restaurant ein Kassensystem haben?",
    a: "Ja. Seit 2023 gilt in Deutschland die Kassensicherungsverordnung. Du brauchst eine TSE-konforme [Kasse](/produkte/kassensystem) und musst Bons ausgeben. Wer das nicht hat, riskiert hohe Bußgelder. Gastro Master hilft dir, alles schnell und korrekt einzurichten.",
  },
];

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
  })),
};

const SCHEMA_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Kassensystem Restaurant 2026 — TSE-konform, Tischverwaltung & Online-Shop | Gastro Master",
  description:
    "Das richtige Kassensystem für dein Restaurant: TSE-konform, mit Tischverwaltung, Küchenmonitor und Online-Bestellsystem. Ab 49 €/Monat. Jetzt kostenlos beraten lassen.",
  url: "https://gastro-master.de/loesungen/restaurant",
  author: { "@type": "Organization", name: "Gastro Master" },
  publisher: { "@type": "Organization", name: "Gastro Master" },
};

interface ProductCard {
  img: string;
  title: string;
  tagline: string;
  href: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const PRODUCTS: ProductCard[] = [
  {
    img: imgKasse,
    title: "Kassensystem",
    tagline: "TSE-konform. Mit Tischverwaltung, Küchenmonitor und Fahrer-App.",
    href: "/produkte/kassensystem",
    icon: <Monitor className="w-4 h-4" />,
    featured: true,
  },
  {
    img: imgWebshop,
    title: "Online Shop",
    tagline: "Gäste bestellen direkt bei dir — 0 % Provision.",
    href: "/produkte/webshop",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    img: imgWebseite,
    title: "Webseite",
    tagline: "Damit dein Restaurant bei Google gefunden wird.",
    href: "/produkte/webseite",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    img: imgApp,
    title: "App System",
    tagline: "Deine eigene Bestell-App für treue Stammkunden.",
    href: "/produkte/app",
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    img: imgTransaktion,
    title: "Zahlungsgebühren",
    tagline: "Zahlungsgebühren? Können deine Gäste übernehmen.",
    href: "/produkte/transaktionsumlage",
    icon: <Percent className="w-4 h-4" />,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const RestaurantPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Kassensystem Restaurant 2026 — TSE-konform & Tischverwaltung | Gastro Master",
    description: "Das richtige Kassensystem für dein Restaurant: TSE-konform, mit Tischverwaltung, Küchenmonitor und Online-Bestellsystem. Ab 49 €/Monat. Jetzt kostenlos beraten lassen.",
    canonical: "https://gastro-master.de/loesungen/restaurant",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }}
      />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-24"
        style={{ background: "linear-gradient(135deg, #061830 0%, #0A264A 50%, #0D3266 100%)" }}
      >
        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007DCF]/10 blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            Restaurant · Gastronomie 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-6"
          >
            Dein Restaurant.{" "}
            <span className="text-gradient-brand block mt-2">
              Die richtige Technik.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Kassensystem, Webseite, Online-Shop — alles aus einer Hand.
            <br className="hidden md:block" />
            Einfach einrichten. Sofort loslegen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenloses Beratungsgespräch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#produkte"
              className="text-white/60 hover:text-white text-base font-medium transition-colors"
            >
              Was du bekommst ↓
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["700+ Betriebe", "TSE-konform", "Ab 69 €/Monat", "Persönlicher Support"].map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-sm font-medium"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* GEO Definition Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 text-left max-w-2xl mx-auto border border-cyan-brand/20 rounded-2xl bg-cyan-brand/5 px-7 py-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-brand mb-2">
              Was ist Gastro Master für Restaurants?
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Gastro Master bietet Restaurantbesitzern ein vollständiges Digitalsystem:
              TSE-konformes Kassensystem mit Tischverwaltung und Küchenmonitor, ein
              Online-Bestellsystem ohne Provision sowie Webseite und Bestell-App — alles
              aus einer Hand, ab 69 € pro Monat. Seit 2023 ist eine TSE-zertifizierte Kasse
              in Deutschland gesetzlich vorgeschrieben (Kassensicherungsverordnung).
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Das solltest du wissen — bevor du startest
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Zahlen, die deinen Erfolg als Restaurantbesitzer direkt beeinflussen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-6 flex flex-col gap-3 ${
                  i === 0
                    ? "bg-[#0A264A] text-white"
                    : s.isCta
                    ? "border-2 border-cyan-brand bg-cyan-brand/5"
                    : "border border-border bg-background"
                }`}
              >
                <p
                  className={`text-2xl font-black leading-tight ${
                    i === 0 ? "text-white" : s.isCta ? "text-cyan-brand" : "text-foreground"
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`text-sm leading-snug ${
                    i === 0 ? "text-white/70" : "text-foreground/60"
                  }`}
                >
                  {s.label}
                </p>
                <a
                  href={s.href}
                  target={s.isCta ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`text-xs mt-auto flex items-center gap-1 transition-colors ${
                    i === 0
                      ? "text-white/40 hover:text-white/70"
                      : s.isCta
                      ? "text-cyan-brand font-semibold hover:text-cyan-brand/80"
                      : "text-foreground/30 hover:text-foreground/60"
                  }`}
                >
                  {s.isCta ? (
                    <>Jetzt kostenlos beraten lassen <ArrowRight className="w-3 h-3" /></>
                  ) : (
                    <>{s.source} <ExternalLink className="w-3 h-3" /></>
                  )}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: PROBLEM ──────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              Das kennen viele Restaurants
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Ohne das richtige System verlierst du Geld und Zeit
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Diese Probleme löst Gastro Master — damit du dich auf dein Essen konzentrieren kannst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ClipboardX className="w-6 h-6" />,
                title: "Chaos bei Bestellungen",
                text: "Zettel, Rufen, Fehler. Bestellungen gehen verloren. Gäste warten zu lang. Das kostet dich Geld und Nerven.",
              },
              {
                icon: <BarChart2 className="w-6 h-6" />,
                title: "Kein Überblick über Zahlen",
                text: "Du weißt am Ende des Tages nicht, was du verdient hast. Keine Auswertung. Kein Überblick. Entscheidungen auf gut Glück.",
              },
              {
                icon: <ShieldAlert className="w-6 h-6" />,
                title: "Stress mit dem Finanzamt",
                text: "Ohne TSE-Kasse drohen Bußgelder bis 25.000 €. Die TSE ist seit 2023 Pflicht — und viele Kassen erfüllen sie nicht.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKTE ─────────────────────────────────────────────────── */}
      <section
        id="produkte"
        className="px-5 md:px-8 lg:px-16 py-20"
        style={{ backgroundColor: "#0A264A" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              Alles was dein Restaurant braucht
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Fünf Produkte. Alles aus einer Hand.
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Von der Kasse bis zur Webseite — du bekommst alles fertig eingerichtet.
            </p>
          </div>

          {/* Featured: Kassensystem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <Link
              to="/produkte/kassensystem"
              className="group relative rounded-2xl overflow-hidden bg-white/5 border-2 border-cyan-brand/30 hover:border-cyan-brand/60 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden shrink-0">
                <img
                  src={imgKasse}
                  alt="Kassensystem"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A264A] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A] via-[#0A264A]/30 to-transparent md:hidden" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-brand/20 backdrop-blur-sm border border-cyan-brand/30 text-cyan-brand text-xs font-bold">
                  Hauptprodukt
                </div>
              </div>
              {/* Content */}
              <div className="p-7 flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-5 h-5 text-cyan-brand" />
                  <span className="text-cyan-brand text-sm font-bold">Kassensystem</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-3 leading-tight">
                  TSE-konforme Kasse. Alles dabei.
                </h3>
                <p className="text-white/65 text-base leading-relaxed mb-5">
                  Unsere Kasse ist vom Finanzamt zugelassen — das nennt man TSE-konform. Das ist seit 2023 Pflicht.
                  Tischverwaltung ist dabei. Küchenmonitor und Fahrer-App buchst du dazu, wenn du sie brauchst.
                  Du kannst sogar Self-Checkout-Terminals anschließen — deine Gäste bestellen und bezahlen dann selbst.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["TSE-konform", "Tischverwaltung", "Küchenmonitor", "Fahrer-App", "Ab 69 €/Monat"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/60 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-cyan-brand text-sm font-semibold group-hover:gap-3 transition-all">
                  Kassensystem ansehen <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 2 + 2 grid for remaining products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {PRODUCTS.slice(1, 3).map((p, i) => (
              <SmallProductCard key={i} product={p} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRODUCTS.slice(3).map((p, i) => (
              <SmallProductCard key={i} product={p} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Jetzt Beratung holen — kostenlos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: PROZESS ──────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              So einfach geht es
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              In 3 Schritten startklar
            </h2>
            <p className="text-foreground/60 text-lg max-w-xl mx-auto">
              Du musst kein Technik-Experte sein. Wir machen das für dich.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line — desktop */}
            <div className="hidden md:block absolute top-[2.25rem] left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-cyan-brand/25 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  num: "01",
                  title: "Kostenloses Gespräch",
                  text: "Wir schauen uns zusammen an, was du brauchst. Kein Druck. Keine Kosten.",
                },
                {
                  num: "02",
                  title: "Wir richten alles ein",
                  text: "Kasse, Webseite, Shop — alles fertig. Du musst nichts selbst einrichten.",
                },
                {
                  num: "03",
                  title: "Du startest",
                  text: "Dein Restaurant ist startklar. Wir sind weiter für dich da, wenn du uns brauchst.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-[#0A264A] border-2 border-cyan-brand/30 flex items-center justify-center mb-5 relative z-10 shrink-0">
                    <span className="text-cyan-brand font-black text-lg">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{step.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: VERGLEICHSTABELLE ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-foreground/8 text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">
              Vergleich
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Gastro Master vs. andere Kassensysteme
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Viele Kassensysteme können nur kassieren. Gastro Master kann mehr.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/40 font-semibold w-[40%]">Was du brauchst</th>
                  <th className="p-4 text-center w-[30%]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-brand/15 text-cyan-brand text-[10px] font-bold uppercase tracking-wider">
                        Empfohlen
                      </span>
                      <span className="font-black text-foreground text-base">Gastro Master</span>
                    </div>
                  </th>
                  <th className="p-4 text-center text-foreground/60 font-semibold w-[30%]">
                    Andere Kassensysteme
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}
                  >
                    <td className="p-4 text-foreground/70 font-medium">{row.label}</td>
                    <td className="p-4 text-center">
                      <span className={`font-semibold ${row.gmGood ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                        {row.gm}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`${row.otherBad ? "text-red-500" : "text-foreground/70"}`}>
                        {row.other}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenlose Beratung anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S7: TRUST-STRIP ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0A264A" }} className="py-10 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-white/40 text-xs uppercase tracking-widest font-bold mb-6">
            700+ Restaurants und Gastro-Betriebe nutzen Gastro Master
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "700+",        label: "Betriebe in Deutschland und Österreich" },
              { value: "5,0 ★",      label: "Google Bewertung" },
              { value: "TSE-konform", label: "Gesetzlich zertifiziert — kein Bußgeld-Risiko" },
              { value: "ab 69 €",    label: "pro Monat — Kassensystem startklar" },
            ].map((item) => (
              <div key={item.value}>
                <p className="text-2xl md:text-3xl font-black text-white">{item.value}</p>
                <p className="text-white/50 text-xs mt-1 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S8: EPIT PAY TEASER ──────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-14">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-brand/20 bg-gradient-to-br from-[#0A264A]/60 to-[#0A264A]/30 dark:from-[#0A264A]/80 dark:to-[#061830]/60 p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white font-black text-xl tracking-tight">Epit Pay</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-brand/20 text-cyan-brand text-[10px] font-bold uppercase tracking-widest">
                  Bald verfügbar
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Bald brauchst du keinen extra Zahlungsanbieter mehr. Mit Epit Pay bekommst du
                Kasse, Bestellsystem und Zahlungsabwicklung aus einer Hand. Alles zusammen — einfach.
              </p>
            </div>
            <div className="shrink-0 w-12 h-12 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center">
              <span className="text-cyan-brand font-black text-sm">EP</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S9: FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Häufige Fragen zum Kassensystem
            </h2>
            <p className="text-foreground/60 text-lg">
              Einfache Antworten auf die wichtigsten Fragen.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-foreground/[0.02] transition-colors"
                >
                  <span className="font-semibold text-foreground text-base leading-snug">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-foreground/40"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-foreground/65 text-sm leading-relaxed border-t border-border pt-4">
                        {renderWithLinks(item.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S10: CTA-ABSCHLUSS ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 md:px-8 lg:px-16 py-24"
        style={{ background: "linear-gradient(135deg, #061830 0%, #0A264A 50%, #0D3266 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 120%, hsl(196, 100%, 40%), transparent 55%)" }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            Kostenlose Beratung
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          >
            Wir helfen dir, dein Restaurant startklar zu machen.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg leading-relaxed mb-10"
          >
            Kasse, Webseite, Shop — wir richten alles für dich ein.
            <br />
            Du brauchst keine Technik-Erfahrung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-12 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenloses Gespräch buchen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-white/40 text-sm"
          >
            {["TSE-konform", "700+ Betriebe", "5,0 ★ Google", "Persönlicher Support"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// ─── Small Product Card ───────────────────────────────────────────────────────

const SmallProductCard = ({ product }: { product: ProductCard }) => (
  <Link
    to={product.href}
    className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-brand/40 transition-all duration-300 block"
  >
    <div className="relative h-44 overflow-hidden">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A] via-[#0A264A]/40 to-transparent" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
        {product.icon}
        {product.title}
      </div>
    </div>
    <div className="p-4">
      <p className="text-white/70 text-sm leading-snug group-hover:text-white/90 transition-colors">
        {product.tagline}
      </p>
      <div className="flex items-center gap-1.5 mt-3 text-cyan-brand text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Mehr erfahren <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </Link>
);

export default RestaurantPage;

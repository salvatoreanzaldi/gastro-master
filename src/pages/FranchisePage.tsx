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
  GitBranch,
  BarChart3,
  AlertTriangle,
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

import imgApp         from "@/assets/Mock Up - Branding Hero.png";
import imgWebshop     from "@/assets/take-startbild.jpeg";
import imgKasse       from "@/assets/hero-pos-system.png";
import imgWebseite    from "@/assets/Hero - Gastro Master.PNG";
import imgTransaktion from "@/assets/9 - Zahlungsmethoden.png";

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
    value: "149,2 Mrd. €",
    label: "Gesamtumsatz der Franchisewirtschaft 2024",
    source: "Deutscher Franchise-Verband",
    href: "https://www.franchiseverband.com/services-nutzen/studien-und-statistiken",
  },
  {
    value: "193.920",
    label: "Aktive Franchisebetriebe in Deutschland — +2,0 % zum Vorjahr",
    source: "Deutscher Franchise-Verband",
    href: "https://www.franchiseverband.com/services-nutzen/studien-und-statistiken",
  },
  {
    value: "35 Mrd. €",
    label: "Umsatz Systemgastronomie 2024 — 40 % der gesamten Gastronomie",
    source: "Bundesverband Systemgastronomie",
    href: "https://www.bundesverband-systemgastronomie.de/die-systemgastronomie/branchendaten.html",
  },
  {
    value: "Alles aus einer Hand",
    label: "App, Shop, Kasse, Webseite — zentral für alle Standorte",
    source: "Gastro Master",
    href: "/kontakt",
    isCta: true,
  },
];

interface CompareRow {
  label: string;
  gm: string;
  gmGood: boolean;
  eigen: string;
  eigenBad: boolean;
  mix: string;
  mixBad: boolean;
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "Einrichtungszeit",        gm: "2–3 Wochen",          gmGood: true,  eigen: "6–18 Monate",         eigenBad: true,  mix: "1–3 Monate",        mixBad: false },
  { label: "Laufende Kosten",         gm: "Fester Monatsbetrag", gmGood: true,  eigen: "Hohe Wartungskosten",  eigenBad: true,  mix: "Mehrfach-Abos",      mixBad: true  },
  { label: "Einheitliches Branding",  gm: "✓ Alle Standorte",    gmGood: true,  eigen: "✓ Möglich",            eigenBad: false, mix: "✗ Unterschiedlich",  mixBad: true  },
  { label: "Zentrale Verwaltung",     gm: "✓ Ein Dashboard",     gmGood: true,  eigen: "✓ Möglich",            eigenBad: false, mix: "✗ Kein Überblick",   mixBad: true  },
  { label: "Skalierbarkeit",          gm: "✓ Beliebig viele",    gmGood: true,  eigen: "Aufwändig",            eigenBad: false, mix: "Begrenzt",           mixBad: true  },
  { label: "Kundendaten-Kontrolle",   gm: "✓ Vollständig",       gmGood: true,  eigen: "✓ Vollständig",        eigenBad: false, mix: "Aufgeteilt",         mixBad: true  },
  { label: "Support & Wartung",       gm: "✓ Persönlich",        gmGood: true,  eigen: "Eigenes IT-Team nötig",eigenBad: true,  mix: "Mehrere Anbieter",   mixBad: true  },
  { label: "Provisionen",             gm: "0 %",                 gmGood: true,  eigen: "0 %",                  eigenBad: false, mix: "Oft % pro Bestellung",mixBad: true },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Wie baue ich ein Franchise-System in der Gastronomie auf?",
    a: "Der Aufbau eines Gastro-Franchise-Systems beginnt mit einem bewährten Konzept, das standardisiert werden kann. Sie benötigen ein einheitliches Markenkonzept, standardisierte Prozesse sowie eine digitale Infrastruktur, die alle Standorte verbindet. Gastro Master liefert die technische Basis: [App](/produkte/app), [Bestellshop](/produkte/webshop), [Kassensystem](/produkte/kassensystem) und [Webseite](/produkte/webseite) — zentral verwaltet, einheitlich gebrandet. So konzentrieren Sie sich auf das Konzept, wir kümmern uns um die Technik.",
  },
  {
    q: "Welche Software braucht man für ein Gastro-Franchise?",
    a: "Für ein professionelles Gastro-Franchise-System benötigen Sie mindestens: ein zentrales [Kassensystem](/produkte/kassensystem) für alle Filialen, eine eigene [Bestell-App](/produkte/app) oder einen [Webshop](/produkte/webshop) (0 % Provision), eine einheitliche [Webpräsenz](/produkte/webseite) und ein Verwaltungssystem für Menüs, Preise und Auswertungen. Gastro Master bietet all das aus einer Hand — ohne Mehrfach-Abos und ohne technische Fragmentierung.",
  },
  {
    q: "Was kostet die digitale Infrastruktur für ein Franchise-System?",
    a: "Die Kosten hängen von der Anzahl der Standorte und dem gewünschten Funktionsumfang ab. Gastro Master arbeitet mit einem festen Monatsbetrag pro Standort — keine versteckten Gebühren, keine Provisionen. Im Gegensatz zur Eigenentwicklung (6–18 Monate, eigenes IT-Team) oder einem Anbieter-Mix (mehrere Abos, keine zentrale Kontrolle) erhalten Sie alles aus einer Hand. Alle Optionen und Konditionen finden Sie in der [Preisübersicht](/preise) oder sprechen Sie uns für ein individuelles Angebot an.",
  },
  {
    q: "Wie manage ich Bestellungen über mehrere Franchise-Standorte?",
    a: "Mit Gastro Master verwalten Sie alle Standorte über ein zentrales Dashboard. Menüs, Preise und Öffnungszeiten lassen sich standortübergreifend oder individuell steuern. Bestellungen laufen direkt in das jeweilige [Kassensystem](/produkte/kassensystem) — ohne Drittanbieter, ohne Provision. Die konsolidierten Auswertungen geben Ihnen jederzeit einen vollständigen Überblick über das gesamte Franchise-Netzwerk.",
  },
  {
    q: "Braucht jeder Franchise-Standort eine eigene App?",
    a: "Nein. Mit Gastro Master nutzen alle Standorte Ihres Franchise-Systems dieselbe [App](/produkte/app)-Plattform — einheitlich gebrandet, aber mit standortspezifischen Menüs und Preisen. Ihre Kunden laden einmalig die App herunter und können bei jedem Standort bestellen. Das stärkt die Markenbindung und vermeidet, dass jeder Franchisenehmer eine eigene technische Lösung aufbaut.",
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
  headline: "Gastro Franchise digitalisieren 2026 — App, Shop & Kasse für alle Standorte",
  description:
    "Franchise-System in der Gastronomie skalieren: einheitliche App, Webshop und Kassensystem für alle Standorte. 0 % Provision, zentrale Verwaltung.",
  url: "https://gastro-master.de/loesungen/franchise",
  author: { "@type": "Organization", name: "Gastro Master" },
  publisher: { "@type": "Organization", name: "Gastro Master" },
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de/" },
    { "@type": "ListItem", position: 2, name: "Lösungen", item: "https://gastro-master.de/loesungen" },
    { "@type": "ListItem", position: 3, name: "Franchise", item: "https://gastro-master.de/loesungen/franchise" },
  ],
};

const SCHEMA_HOWTO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "In vier Schritten zur digitalen Franchise-Infrastruktur",
  description: "Gastro Master richtet die komplette digitale Infrastruktur für Ihr Gastro-Franchise ein — von der Beratung bis zum laufenden Support.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Beratungsgespräch", text: "Wir analysieren Ihr Konzept, Ihre Standortstruktur und entwickeln gemeinsam die passende digitale Infrastruktur für Ihr Franchise-System." },
    { "@type": "HowToStep", position: 2, name: "Setup & Branding", text: "Wir richten App, Bestellshop, Kassensystem und Webseite ein — vollständig in Ihrem Corporate Design, einheitlich für alle Standorte." },
    { "@type": "HowToStep", position: 3, name: "Rollout", text: "Standort für Standort geht live. Jeder Franchisenehmer wird persönlich eingeführt und begleitet." },
    { "@type": "HowToStep", position: 4, name: "Laufender Support", text: "Ein persönlicher Ansprechpartner bei Gastro Master. Zentrales Dashboard, regelmäßige Updates, kein IT-Aufwand Ihrerseits." },
  ],
};

interface ProductCard {
  img: string;
  title: string;
  alt: string;
  tagline: string;
  href: string;
  icon: React.ReactNode;
}

const PRODUCTS: ProductCard[] = [
  { img: imgApp,         title: "App System",       alt: "Eigene Bestell-App für Franchise-Gastronomie — einheitlich gebrandet für alle Standorte",          tagline: "Ihre eigene Bestell-App — einheitlich gebrandet für alle Standorte",             href: "/produkte/app",                icon: <Smartphone className="w-4 h-4" /> },
  { img: imgWebshop,     title: "Online Shop",      alt: "Zentrales Bestellsystem für Franchise-Standorte — 0 % Provision mit Gastro Master",                 tagline: "Zentrales Bestellsystem für alle Standorte — 0 % Provision an Dritte",           href: "/produkte/webshop",             icon: <ShoppingCart className="w-4 h-4" /> },
  { img: imgKasse,       title: "Kassensystem",     alt: "TSE-konformes Kassensystem für alle Franchise-Filialen — einheitliche POS-Lösung",                  tagline: "Einheitliches POS-System für alle Filialen — konsolidierte Auswertung",          href: "/produkte/kassensystem",        icon: <Monitor className="w-4 h-4" /> },
  { img: imgWebseite,    title: "Webseite",         alt: "Professionelle Webseite für Franchise-Gastronomie — einheitliches Branding für alle Standorte",     tagline: "Professionelle Online-Präsenz für Ihr gesamtes Franchise-Netzwerk",              href: "/produkte/webseite",            icon: <Globe className="w-4 h-4" /> },
  { img: imgTransaktion, title: "Zahlungsgebühren", alt: "Transaktionsumlage für Franchise-Systeme — Zahlungsgebühren standortübergreifend steuern",          tagline: "Transaktionsgebühren transparent steuern — standortübergreifend konfigurierbar", href: "/produkte/transaktionsumlage",  icon: <Percent className="w-4 h-4" /> },
];

interface StepItem {
  num: string;
  title: string;
  text: string;
}

const ONBOARDING_STEPS: StepItem[] = [
  {
    num: "01",
    title: "Beratungsgespräch",
    text: "Wir analysieren Ihr Konzept, Ihre Standortstruktur und entwickeln gemeinsam die passende digitale Infrastruktur.",
  },
  {
    num: "02",
    title: "Setup & Branding",
    text: "Wir richten App, Bestellshop, Kassensystem und Webseite ein — vollständig in Ihrem Corporate Design, einheitlich für alle Standorte.",
  },
  {
    num: "03",
    title: "Rollout",
    text: "Standort für Standort geht live. Jeder Franchisenehmer wird persönlich eingeführt und begleitet.",
  },
  {
    num: "04",
    title: "Laufender Support",
    text: "Ein persönlicher Ansprechpartner bei Gastro Master. Zentrales Dashboard, regelmäßige Updates, kein IT-Aufwand Ihrerseits.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const FranchisePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Franchise Gastronomie Software — zentral | Gastro Master",
    description: "Franchise-System digital aufbauen: einheitliche App, Webshop und Kassensystem für alle Standorte. Zentral gesteuert, 0 % Provision. Jetzt Beratung sichern.",
    canonical: "https://gastro-master.de/loesungen/franchise",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }}
      />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-24"
        style={{ background: "linear-gradient(135deg, #061830 0%, #0A264A 50%, #0D3266 100%)" }}
      >
        {/* Glow */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007DCF]/12 blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            Franchise · Gastronomie 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-6"
          >
            Ihr Konzept.{" "}
            <br className="hidden md:block" />
            Jeder Standort.{" "}
            <span className="text-gradient-brand block mt-2">
              Einheitlich digitalisiert — zentral gesteuert.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Gastro Master liefert die komplette digitale Infrastruktur für Ihr Franchise-System —
            App, Bestellshop, Kassensystem und Webseite, zentral verwaltet, einheitlich gebrandet.
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
              href="#infrastruktur"
              className="text-white/60 hover:text-white text-base font-medium transition-colors"
            >
              Ihre Infrastruktur ansehen ↓
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["700+ Betriebe", "Deutschlandweit", "Zentrale Verwaltung", "Persönlicher Support"].map(
              (pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-sm font-medium"
                >
                  {pill}
                </span>
              )
            )}
          </motion.div>

          {/* GEO Definition Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 text-left max-w-2xl mx-auto border border-cyan-brand/20 rounded-2xl bg-cyan-brand/5 px-7 py-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-brand mb-2">
              Definition
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Ein <strong className="text-white">Franchise-System in der Gastronomie</strong> ermöglicht es
              erfolgreichen Gastronomen, ihr bewährtes Konzept über mehrere Standorte zu skalieren —
              mit einheitlichem Branding, zentraler Steuerung und standardisierten Prozessen. Die
              Franchisewirtschaft erzielte 2024 in Deutschland einen Gesamtumsatz von 149,2 Mrd. Euro
              bei 193.920 aktiven Betrieben (Quelle: Deutscher Franchise-Verband).
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Der Markt wächst — Ihr System muss mithalten
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Franchise-Gastronomie ist eines der stabilsten Wachstumssegmente der deutschen Wirtschaft —
              auch für Gastronomen, die{" "}
              <Link to="/loesungen/lieferservice-gruenden" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">
                einen eigenen Lieferdienst aufbauen
              </Link>{" "}
              und skalieren wollen.
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
                    <>Jetzt Franchise-System aufbauen <ArrowRight className="w-3 h-3" /></>
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
              Die Herausforderung
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Ohne einheitliche Technik: kein echtes Franchise-System
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Wer skaliert, ohne die Infrastruktur mitzuskalieren, verliert die Kontrolle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <GitBranch className="w-6 h-6" />,
                title: "Fragmentierte Systeme",
                text: "Jeder Standort ein anderes System — kein einheitliches Branding, keine zentrale Kontrolle über Menüs, Preise oder Öffnungszeiten. Ein [einheitliches Kassensystem für alle Filialen](/produkte/kassensystem) schafft hier die Basis.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Keine Gesamtübersicht",
                text: "Keine konsolidierten Umsatzdaten — Auswertungen sind nur standortweise möglich, strategische Entscheidungen werden zum Ratespiel.",
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: "Wachstum blockiert",
                text: "Jeder neue Standort bedeutet neuen Setup-Aufwand. Die Technik wird zur Bremse statt zum Hebel für Skalierung.",
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
                <p className="text-foreground/60 text-sm leading-relaxed">{renderWithLinks(item.text)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKT-BUNDLE ───────────────────────────────────────────── */}
      <section
        id="infrastruktur"
        className="px-5 md:px-8 lg:px-16 py-20"
        style={{ backgroundColor: "#0A264A" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              Ihre Franchise-Infrastruktur · Gastro Master
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Alles aus einer Hand — für jeden Standort
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Fünf aufeinander abgestimmte Produkte. Einheitlich gebrandet. Zentral gesteuert.
            </p>
          </div>

          {/* 3 + 2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {PRODUCTS.slice(0, 3).map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {PRODUCTS.slice(3).map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>

          {/* Branding note */}
          <p className="text-center text-white/35 text-xs mt-8 max-w-xl mx-auto leading-relaxed">
            Die gezeigten Mockups illustrieren ein Beispiel-Branding. Ihre App, Ihr Shop und Ihre
            Webseite erscheinen vollständig in Ihrem Corporate Design — einheitlich für alle Standorte.
          </p>

          <div className="text-center mt-6">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 text-cyan-brand font-semibold hover:text-white transition-colors text-base"
            >
              In einem persönlichen Gespräch entwickeln wir Ihre Infrastruktur
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: VERGLEICHSTABELLE ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-foreground/8 text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">
              Vergleich
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Gastro Master vs. Eigenentwicklung vs. Anbieter-Mix
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Warum führende Franchise-Geber auf eine integrierte Lösung setzen
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/40 font-semibold w-[30%]">Kriterium</th>
                  <th className="p-4 text-center w-[23%]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-brand/15 text-cyan-brand text-[10px] font-bold uppercase tracking-wider">
                        Empfohlen
                      </span>
                      <span className="font-black text-foreground text-base">Gastro Master</span>
                      <span className="text-foreground/40 text-xs font-normal">Ihre Franchise-Infrastruktur</span>
                    </div>
                  </th>
                  <th className="p-4 text-center text-foreground/70 font-semibold w-[23%]">
                    Eigenentwicklung
                  </th>
                  <th className="p-4 text-center w-[24%]">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                      Anbieter-Mix
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}>
                    <td className="p-4 text-foreground/70 font-medium">{row.label}</td>
                    <td className="p-4 text-center">
                      <span className={`font-semibold ${row.gmGood ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                        {row.gm}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`${row.eigenBad ? "text-red-500" : "text-foreground/70"}`}>
                        {row.eigen}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`${row.mixBad ? "text-red-500" : "text-foreground/70"}`}>
                        {row.mix}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Callout box */}
          <div className="mt-8 rounded-2xl bg-[#0A264A] p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
            <p className="text-white/70 text-sm leading-relaxed flex-1">
              Franchise-Geber, die auf Eigenentwicklung setzen, investieren im Schnitt{" "}
              <strong className="text-white">6–18 Monate Entwicklungszeit</strong> und benötigen ein
              eigenes IT-Team für Wartung und Weiterentwicklung — bevor der erste neue Standort live geht.{" "}
              <Link to="/preise" className="text-cyan-brand/70 underline underline-offset-2 hover:text-cyan-brand transition-colors">
                Alle Konditionen im Überblick →
              </Link>
            </p>
            <Link
              to="/kontakt"
              className="shrink-0 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              Jetzt Infrastruktur analysieren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5.5: SO STARTEN SIE ─────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              So läuft die Zusammenarbeit
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              In vier Schritten zur digitalen Franchise-Infrastruktur
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Klar strukturiert. Persönlich begleitet. Ohne technischen Aufwand Ihrerseits.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-[2.2rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-cyan-brand/25 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {ONBOARDING_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number circle */}
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-[#0A264A] border-2 border-cyan-brand/30 flex items-center justify-center mb-5 relative z-10 shrink-0">
                    <span className="text-cyan-brand font-black text-lg">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{step.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Beratungsgespräch vereinbaren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S6: TRUST-STRIP ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0A264A" }} className="py-10 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "700+",       label: "Betriebe vertrauen auf Gastro Master" },
              { value: "5,0 ★",     label: "Google Bewertung" },
              { value: "1 Partner", label: "Persönlicher Ansprechpartner für Ihr gesamtes Franchise-Netzwerk" },
              { value: "Rollout",   label: "Schnell skalierbar — Standort für Standort live" },
            ].map((item) => (
              <div key={item.value}>
                <p className="text-3xl font-black text-white">{item.value}</p>
                <p className="text-white/50 text-xs mt-1 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Häufige Fragen zum Thema Gastro-Franchise
            </h2>
            <p className="text-foreground/60 text-lg">
              Die Fragen, die Franchise-Geber stellen — und unsere Antworten
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

      {/* ── S8: CTA-ABSCHLUSS ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 md:px-8 lg:px-16 py-24"
        style={{ background: "linear-gradient(135deg, #061830 0%, #0A264A 50%, #0D3266 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 120%, hsl(196, 100%, 40%), transparent 55%)" }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6"
          >
            Kostenloses Beratungsgespräch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          >
            Wir entwickeln die Infrastruktur für Ihr Franchise-System
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            In einem persönlichen Gespräch analysieren wir Ihr Konzept und entwickeln die passende
            digitale Infrastruktur — App, Bestellshop, Kasse, Webseite, einheitlich für alle Standorte.
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
              Beratungsgespräch vereinbaren
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-white/40 text-sm"
          >
            {["Zentrale Verwaltung aller Standorte", "700+ Betriebe", "5,0 ★ Google", "Persönlicher Ansprechpartner"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({ product }: { product: ProductCard }) => (
  <Link
    to={product.href}
    className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-brand/40 transition-all duration-300 block"
  >
    <div className="relative h-52 overflow-hidden">
      <img
        src={product.img}
        alt={product.alt}
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

export default FranchisePage;

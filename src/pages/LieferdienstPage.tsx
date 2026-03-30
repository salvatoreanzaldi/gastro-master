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
  PenLine,
  TrendingDown,
  HelpCircle,
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

import imgWebshop     from "@/assets/take-startbild.jpeg";
import imgApp         from "@/assets/Mock Up - Branding Hero.png";
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
    value: "9,9 Mrd. €",
    label: "prognostizierter Umsatz im Online-Liefermarkt Deutschland bis 2028",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "9,41 %",
    label: "jährliches Wachstum im Online-Liefermarkt 2025–2028 — der Markt wächst weiter",
    source: "Statista",
    href: "https://de.statista.com/outlook/dmo/online-food-delivery/deutschland",
  },
  {
    value: "bis 30 %",
    label: "Provision nimmt Lieferando pro Bestellung — das ist dein Gewinn, den du abgibst",
    source: "metro.de",
    href: "https://www.metro.de/blog/lieferdienste",
  },
  {
    value: "0 % Provision",
    label: "mit deinem eigenen Bestellsystem — kein Cent an Lieferando",
    source: "Gastro Master",
    href: "/kontakt",
    isCta: true,
  },
];

interface CompareRow {
  label: string;
  gm: string;
  gmGood: boolean;
  platform: string;
  platformBad: boolean;
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "Provision pro Bestellung",    gm: "0 %",                       gmGood: true,  platform: "13 bis 30 %",             platformBad: true  },
  { label: "Dein eigenes Design",         gm: "✓ Ja",                      gmGood: true,  platform: "✗ Nein",                  platformBad: true  },
  { label: "Kundendaten gehören dir",     gm: "✓ Ja",                      gmGood: true,  platform: "✗ Nein",                  platformBad: true  },
  { label: "Eigene App im App Store",     gm: "✓ Verfügbar",               gmGood: true,  platform: "✗ Nicht möglich",         platformBad: true  },
  { label: "Du entscheidest alles",       gm: "✓ Immer",                   gmGood: true,  platform: "✗ Plattform entscheidet", platformBad: true  },
  { label: "Monatliche Grundkosten",      gm: "Ab 69 €/Monat",             gmGood: true,  platform: "Keine — aber Provision",  platformBad: true  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Wie biete ich einen Lieferservice in meinem Restaurant an?",
    a: "Du brauchst ein [Online-Bestellsystem](/produkte/webshop). Damit können deine Kunden direkt bei dir bestellen. Gastro Master richtet das für dich ein — mit deinem Logo, deinen Farben, deinem Menü. Alles läuft über dein System. Keine Provision an Lieferando. Mehr zur [Lieferdienst-Lösung](/loesungen/lieferdienst).",
  },
  {
    q: "Was kostet ein eigenes Bestellsystem für Lieferdienste?",
    a: "Der [Bestellshop von Gastro Master](/produkte/webshop) kostet 79 € pro Monat. Dein Shop ist mit deinem Branding eingerichtet. Du zahlst keine Provision — jede Bestellung gehört dir zu 100 %. Wir richten alles für dich ein. Du musst nichts selbst programmieren.",
  },
  {
    q: "Wie viel Provision nimmt Lieferando?",
    a: "Lieferando nimmt 13 % wenn du eigene Fahrer hast. Mit Lieferando-Fahrern sind es bis zu 30 %. Bei 3.000 € Monatsumsatz zahlst du bis zu 900 € Provision — jeden Monat. Das ist Geld, das du behalten könntest.",
  },
  {
    q: "Lohnt sich ein eigener Lieferservice statt Lieferando?",
    a: "Ja — besonders wenn du schon Stammkunden hast. Deine Stammkunden bestellen gerne direkt bei dir. Du behältst alle Daten, du behältst die Kontrolle. Und du zahlst keine Provision. Besonders bei Speisen mit geringem Wareneinsatz — zum Beispiel Pizza oder Sushi — lohnt sich ein eigener [Lieferdienst](/loesungen/lieferdienst) sehr.",
  },
  {
    q: "Brauche ich eine eigene App für meinen Lieferdienst?",
    a: "Nicht unbedingt. Der [Bestellshop](/produkte/webshop) funktioniert auch ohne App — im Browser, auf dem Handy. Aber eine eigene [App](/produkte/app) hat einen großen Vorteil: Stammkunden bestellen mit einem Klick. Sie sehen dein Logo auf ihrem Handy. Das stärkt die Bindung an dein Restaurant.",
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
  headline: "Eigener Lieferservice ohne Lieferando — 0 % Provision für Restaurants und Lieferdienste",
  description:
    "Lieferservice einrichten ohne Lieferando: eigenes Bestellsystem, 0 % Provision, Fahrer-App mit GPS. Für bestehende Restaurants, Imbisse und Pizzerien. Ab 69 €/Monat.",
  url: "https://gastro-master.de/loesungen/lieferdienst",
  author: { "@type": "Organization", name: "Gastro Master" },
  publisher: { "@type": "Organization", name: "Gastro Master" },
};

interface ProductCard {
  img: string;
  title: string;
  tagline: string;
  href: string;
  icon: React.ReactNode;
  features?: string[];
}

const PRODUCTS: ProductCard[] = [
  {
    img: imgApp,
    title: "App System",
    tagline: "Deine eigene App im App Store. Stammkunden bestellen mit einem Klick.",
    href: "/produkte/app",
    icon: <Smartphone className="w-4 h-4" />,
    features: [
      "Push-Nachrichten — direkt aufs Handy deiner Kunden",
      "Dein Logo und deine Farben in der App",
      "Online-Bezahlung direkt in der App",
      "Speisekarte jederzeit aktualisieren",
    ],
  },
  {
    img: imgKasse,
    title: "Kassensystem",
    tagline: "Alle Bestellungen landen direkt in der Kasse. Mit dem Kassensystem kannst du auch die Fahrer-App nutzen — deine Fahrer sehen Routen und Bestellungen direkt auf dem Handy.",
    href: "/produkte/kassensystem",
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    img: imgWebseite,
    title: "Webseite",
    tagline: "Damit neue Kunden dein Restaurant bei Google finden.",
    href: "/produkte/webseite",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    img: imgTransaktion,
    title: "Zahlungsgebühren",
    tagline: "Zahlungsgebühren? Können deine Kunden übernehmen.",
    href: "/produkte/transaktionsumlage",
    icon: <Percent className="w-4 h-4" />,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const LieferdienstPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Lieferservice einrichten ohne Lieferando — 0 % Provision | Gastro Master",
    description: "Du hast schon dein Restaurant? Jetzt lieferst du auch — ohne Lieferando und ohne Provision. Eigenes Bestellsystem, Fahrer-App und App im Store. Jetzt kostenlos beraten lassen.",
    canonical: "https://gastro-master.de/loesungen/lieferdienst",
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
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007DCF]/10 blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            Lieferdienst · Bestehende Betriebe 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-6"
          >
            Du hast schon dein Lokal.{" "}
            <span className="text-gradient-brand block mt-2">
              Jetzt lieferst du auch.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Deine Küche ist schon da. Deine Stammkunden auch.
            <br className="hidden md:block" />
            Mit Gastro Master erreichst du sie auch zuhause — ohne Lieferando, ohne Provision.
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
              href="#bestellsystem"
              className="text-white/60 hover:text-white text-base font-medium transition-colors"
            >
              Wie es funktioniert ↓
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {["700+ Betriebe", "0 % Provision", "Eigene App", "Persönlicher Support"].map((pill) => (
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
            className="text-left max-w-2xl mx-auto border border-cyan-brand/20 rounded-2xl bg-cyan-brand/5 px-7 py-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-brand mb-2">
              Was bedeutet eigener Lieferdienst?
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Ein <strong className="text-white">eigener Lieferdienst</strong> bedeutet: Deine Kunden
              bestellen direkt bei dir — über deinen eigenen Bestellshop oder deine eigene App. Du zahlst
              keine Provision an Lieferando, Wolt oder Uber Eats. Die Kundendaten gehören dir. Du
              entscheidest selbst über Preise, Liefergebiete und Öffnungszeiten. Gastro Master liefert
              dafür die komplette Technik — ab 69 € pro Monat, ohne versteckte Gebühren.
            </p>
          </motion.div>

          {/* Internal link for newcomers */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-white/35 text-xs mt-6 text-center"
          >
            Du hast noch kein eigenes Lokal?{" "}
            <Link to="/loesungen/lieferservice-gruenden" className="text-cyan-brand/70 hover:text-cyan-brand underline underline-offset-2 transition-colors">
              Hier ist unser Gründer-Leitfaden →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ── S2: STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Der Markt wächst — und Lieferando verdient mit
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Die Zahlen zeigen: Wer jetzt liefert, gewinnt. Wer weiter Provision zahlt, verliert.
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
              Das kennen viele Gastronomen
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Du hast schon Stammkunden — aber erreichst du sie auch zuhause?
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Diese drei Probleme stehen deinem eigenen Lieferdienst im Weg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <PenLine className="w-6 h-6" />,
                title: "Telefon und Zettel",
                text: "Kunden rufen an. Du schreibst alles auf Zettel. Fehler passieren. Bestellungen gehen verloren. Das kostet dich Zeit und Geld.",
              },
              {
                icon: <TrendingDown className="w-6 h-6" />,
                title: "30 % Provision an Lieferando",
                text: "Du bist bei Lieferando — aber 30 % von jeder Bestellung behält die Plattform. Bei 3.000 € Umsatz verlierst du bis zu 900 € im Monat.",
              },
              {
                icon: <HelpCircle className="w-6 h-6" />,
                title: "Technik ist unklar",
                text: "Du willst selbst liefern, aber weißt nicht wie. Eigene App, eigener Shop — das klingt kompliziert. Ist es nicht. Wir machen das für dich.",
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
        id="bestellsystem"
        className="px-5 md:px-8 lg:px-16 py-20"
        style={{ backgroundColor: "#0A264A" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              So lieferst du selbst — ohne Lieferando
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Dein eigenes System. Alles aus einer Hand.
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Von der Bestellung bis zur Lieferung — wir richten alles für dich ein.
            </p>
          </div>

          {/* Featured: Online Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <Link
              to="/produkte/webshop"
              className="group relative rounded-2xl overflow-hidden bg-white/5 border-2 border-cyan-brand/30 hover:border-cyan-brand/60 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden shrink-0">
                <img
                  src={imgWebshop}
                  alt="Online Bestellshop"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
                  <ShoppingCart className="w-5 h-5 text-cyan-brand" />
                  <span className="text-cyan-brand text-sm font-bold">Online Shop</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-3 leading-tight">
                  Dein eigener Bestellshop. 0 % Provision.
                </h3>
                <p className="text-white/65 text-base leading-relaxed mb-5">
                  Deine Kunden bestellen direkt bei dir — über deinen Shop, mit deinem Logo.
                  Du zahlst keine Gebühren an Lieferando. Jede Bestellung gehört dir zu 100 %.
                  Wir richten den Shop ein — mit deinem Menü, deinen Preisen, deinen Liefergebieten.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["0 % Provision", "Dein Branding", "Liefergebiete", "Eigene Preise", "Ab 69 €/Monat"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/8 border border-white/10 text-white/60 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-cyan-brand text-sm font-semibold group-hover:gap-3 transition-all">
                  Online Shop ansehen <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 2 + 2 grid for remaining products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {PRODUCTS.slice(0, 2).map((p, i) => (
              <SmallProductCard key={i} product={p} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRODUCTS.slice(2).map((p, i) => (
              <SmallProductCard key={i} product={p} />
            ))}
          </div>

          <div className="text-center mt-10">
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

      {/* ── S5: VERGLEICHSTABELLE ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-foreground/8 text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">
              Vergleich
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Warum ein eigenes System statt Lieferando?
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Gastro Master vs. Lieferando, Wolt und Uber Eats — der direkte Vergleich.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/40 font-semibold w-[40%]">Was zählt</th>
                  <th className="p-4 text-center w-[30%]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-brand/15 text-cyan-brand text-[10px] font-bold uppercase tracking-wider">
                        Empfohlen
                      </span>
                      <span className="font-black text-foreground text-base">Gastro Master</span>
                      <span className="text-foreground/40 text-xs font-normal">Eigenes System</span>
                    </div>
                  </th>
                  <th className="p-4 text-center w-[30%]">
                    <span className="font-semibold text-foreground/60">Lieferando / Wolt / Uber Eats</span>
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
                      <span className={`${row.platformBad ? "text-red-500" : "text-foreground/70"}`}>
                        {row.platform}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rechenbeispiel */}
          <div className="mt-6 rounded-2xl bg-[#0A264A] p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Rechenbeispiel</p>
              <p className="text-white font-black text-lg leading-snug mb-1">
                Bei 3.000 € Monatsumsatz zahlst du an Lieferando{" "}
                <span className="text-red-400">bis zu 900 €</span> Provision — jeden Monat.
              </p>
              <p className="text-white/60 text-sm">
                Mit Gastro Master: <strong className="text-emerald-400">0 €</strong> Provision.
                Das sind <strong className="text-white">10.800 € im Jahr</strong>, die du behältst.
              </p>
            </div>
            <Link
              to="/kontakt"
              className="shrink-0 bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              Kostenlose Beratung
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S6: PROZESS ──────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              So einfach geht es
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              In 3 Schritten zum eigenen Lieferdienst
            </h2>
            <p className="text-foreground/60 text-lg max-w-xl mx-auto">
              Du brauchst keine Technik-Kenntnisse. Wir machen das für dich.
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
                  text: "Wir schauen uns deinen Betrieb an. Kein Druck. Keine Kosten.",
                },
                {
                  num: "02",
                  title: "Wir richten alles ein",
                  text: "Shop, App und Kasse — alles fertig mit deinem Branding. Du musst nichts selbst machen.",
                },
                {
                  num: "03",
                  title: "Du lieferst los",
                  text: "Dein Lieferdienst läuft. Wir sind weiter für dich da, wenn du uns brauchst.",
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

      {/* ── S7: TRUST-STRIP ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0A264A" }} className="py-10 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-white/40 text-xs uppercase tracking-widest font-bold mb-6">
            700+ Gastro-Betriebe liefern schon mit Gastro Master
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "700+",      label: "Betriebe in Deutschland und Österreich" },
              { value: "5,0 ★",    label: "Google Bewertung" },
              { value: "0 %",      label: "Provision — jede Bestellung gehört dir" },
              { value: "Eigene App", label: "Im App Store — mit deinem Logo" },
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
                Bestellsystem und Zahlungsabwicklung aus einer Hand. Alles zusammen — einfach.
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
              Häufige Fragen zum eigenen Lieferdienst
            </h2>
            <p className="text-foreground/60 text-lg">
              Einfache Antworten — damit du sofort loslegen kannst.
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
            Wir helfen dir, deinen Lieferdienst zu starten.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg leading-relaxed mb-10"
          >
            Shop, App, Kasse — wir richten alles ein.
            <br />
            0 % Provision. Dein Branding. Deine Kunden.
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
            {["0 % Provision", "700+ Betriebe", "5,0 ★ Google", "Persönlicher Support"].map((t) => (
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
        <span className="ml-0.5">{product.title}</span>
      </div>
    </div>
    <div className="p-4">
      <p className="text-white/70 text-sm leading-snug group-hover:text-white/90 transition-colors">
        {product.tagline}
      </p>
      {product.features && (
        <ul className="mt-3 space-y-1.5">
          {product.features.map((f) => (
            <li key={f} className="text-white/55 text-xs flex items-start gap-1.5">
              <span className="text-cyan-brand shrink-0 mt-px">✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-1.5 mt-3 text-cyan-brand text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        {product.features ? "Alle Features ansehen" : "Mehr erfahren"} <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </Link>
);

export default LieferdienstPage;

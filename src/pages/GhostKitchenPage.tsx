import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, ExternalLink, Monitor, ShoppingCart,
  Smartphone, Globe, Percent, Flame, Eye, Layers,
  MessageCircle, Settings, Rocket, Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

import imgWebshop     from "@/assets/screenshots/take-startbild.jpeg";
import imgApp         from "@/assets/mockups/Mock Up - Branding Hero.png";
import imgKasse       from "@/assets/heroes/hero-pos-system.png";
import imgWebseite    from "@/assets/heroes/Hero - Gastro Master.PNG";
import imgTransaktion from "@/assets/addons/9 - Zahlungsmethoden.png";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Data ────────────────────────────────────────────────────────────────────

interface StatItem { value: string; label: string; source: string; href: string; isCta?: boolean }

const STATS: StatItem[] = [
  { value: "$197 Mrd.", label: "Globaler Ghost Kitchen Markt bis 2032", source: "Precedence Research", href: "https://www.precedenceresearch.com/ghost-kitchen-market" },
  { value: "19 %", label: "Jährliches Wachstum in Europa. Deutschland ist der größte Markt", source: "Statista", href: "https://de.statista.com/outlook/dmo/online-food-delivery/deutschland" },
  { value: "bis 30 %", label: "Provision an Lieferplattformen wie Lieferando oder Uber Eats", source: "metro.de", href: "https://www.metro.de/blog/lieferdienste" },
  { value: "ab 79 €", label: "pro Monat mit Gastro Master. 0 % Provision. Volle Kontrolle", source: "Gastro Master", href: "/kontakt", isCta: true },
];

const PROBLEMS = [
  { icon: Flame, title: "Plattform-Abhängigkeit", text: "Lieferando und Uber Eats nehmen 25 bis 30 % Provision. Bei jedem Auftrag verlierst du Marge. Du bist abhängig von deren Algorithmus und Regeln." },
  { icon: Eye, title: "Kein eigenes Branding", text: "Auf Plattformen bist du einer von tausenden. Deine Marke geht unter. Kunden erinnern sich an Lieferando, nicht an dich." },
  { icon: Layers, title: "Multi-Brand Chaos", text: "Mehrere Marken über verschiedene Systeme und Tablets managen ist ineffizient. Bestellungen kommen aus 5 Kanälen, aber nichts läuft zentral." },
];

interface CompareRow { label: string; gm: string; gmGood: boolean; platform: string; platformBad: boolean }

const COMPARE_ROWS: CompareRow[] = [
  { label: "Provision pro Bestellung",  gm: "0 %",                     gmGood: true,  platform: "25 bis 30 %",            platformBad: true },
  { label: "Eigene Marke",              gm: "✓ Volle Kontrolle",       gmGood: true,  platform: "✗ Plattform-Branding",   platformBad: true },
  { label: "Multi-Brand",              gm: "✓ Mehrere Marken möglich", gmGood: true,  platform: "Eingeschränkt",           platformBad: true },
  { label: "Eigene App",               gm: "✓ Im App Store",           gmGood: true,  platform: "✗ Nicht möglich",         platformBad: true },
  { label: "Kundendaten",              gm: "✓ Volle Kontrolle",        gmGood: true,  platform: "✗ Plattform behält alles",platformBad: true },
  { label: "Bestellsystem",            gm: "✓ Eigenes System",         gmGood: true,  platform: "Plattform-abhängig",      platformBad: true },
  { label: "Support",                  gm: "✓ Persönlich, Deutsch",    gmGood: true,  platform: "Ticket-System",           platformBad: false },
];

const CONCEPT_COMPARE = [
  { label: "Präsenz",         restaurant: "Physischer Gastraum",      lieferdienst: "Restaurant mit Versand-Fokus", ghost: "Nur Küche" },
  { label: "Lage",            restaurant: "Teure A-Lage",             lieferdienst: "Gute Erreichbarkeit",          ghost: "Günstige B-Lage" },
  { label: "Kundenkontakt",   restaurant: "Persönlich vor Ort",       lieferdienst: "Telefon / App",                ghost: "Rein digital" },
  { label: "Marken",          restaurant: "Eine feste Marke",         lieferdienst: "Eine Marke",                   ghost: "Multi-Brand möglich" },
  { label: "Kostenstruktur",  restaurant: "Hoch (Personal, Miete)",   lieferdienst: "Mittel",                       ghost: "Niedrig (nur Küche)" },
  { label: "Skalierbarkeit",  restaurant: "Begrenzt",                 lieferdienst: "Mittel",                       ghost: "Hoch" },
  { label: "Flexibilität",    restaurant: "Gering (Umbau nötig)",     lieferdienst: "Mittel",                       ghost: "Sehr hoch (digital)" },
];

const STEPS = [
  { num: "01", icon: MessageCircle, title: "Kostenloses Beratungsgespräch", text: "Wir lernen dein Konzept kennen. Wie viele Marken? Welche Kanäle? Was brauchst du?" },
  { num: "02", icon: Settings,      title: "Marken & Systeme konfigurieren", text: "Wir richten deine Marken ein und konfigurieren Webshops, Apps und das Kassensystem." },
  { num: "03", icon: Rocket,        title: "Setup & Go Live",               text: "Alles wird technisch eingerichtet. Training für dein Team. Dann gehst du live." },
  { num: "04", icon: Headphones,    title: "Laufender Support",             text: "24/7 Support auf Deutsch. Neue Marken? Neue Features? Wir sind da." },
];

interface FaqItem { q: string; a: string }

const FAQ_ITEMS: FaqItem[] = [
  { q: "Was ist eine Ghost Kitchen und wie funktioniert sie?", a: "Eine Ghost Kitchen (auch Cloud Kitchen oder Dark Kitchen) ist eine Küche ohne Gastraum. Du produzierst Essen ausschließlich für Lieferung und Abholung. Mehrere Marken können aus einer Küche betrieben werden. Das senkt Kosten und erhöht die Flexibilität." },
  { q: "Brauche ich für jede Marke eine eigene App oder einen eigenen Webshop?", a: "Nein. Mit Gastro Master kannst du mehrere Marken über ein System verwalten. Jede Marke bekommt ihren eigenen [Bestellshop](/produkte/webshop) und optional eine eigene [App](/produkte/app). Die Bestellungen laufen zentral in einem [Kassensystem](/produkte/kassensystem) zusammen." },
  { q: "Wie viel spare ich ohne Lieferando?", a: "Bei 3.000 € Monatsumsatz zahlst du an Lieferando bis zu 900 € Provision pro Monat. Mit Gastro Master: 0 € Provision. Du zahlst nur den festen Monatsbeitrag. Alle Konditionen findest du in der [Preisübersicht](/preise)." },
  { q: "Kann ich mit einer Marke starten und später erweitern?", a: "Ja, absolute Flexibilität. Du startest mit einer Marke und fügst jederzeit weitere Webshops, Apps oder Marken hinzu. Kein neues System nötig, alles läuft über dein bestehendes Gastro Master Setup." },
  { q: "Welche Technik brauche ich für eine Ghost Kitchen?", a: "Nur ein Tablet oder Laptop und eine Internetverbindung. Das [Kassensystem](/produkte/kassensystem) läuft cloudbasiert. Dazu optional einen Drucker für Bestellbons. Wir richten alles für dich ein und schulen dein Team." },
];

interface ProductCard { img: string; title: string; tagline: string; href: string; icon: React.ReactNode }

const PRODUCTS: ProductCard[] = [
  { img: imgWebshop,     title: "Eigener Webshop",        tagline: "0 % Provision, eigene Marke. Deine Kunden bestellen direkt bei dir.",                          href: "/produkte/webshop",            icon: <ShoppingCart className="w-4 h-4" /> },
  { img: imgApp,         title: "Multi-Brand App",        tagline: "Verschiedene Marken, eine Küche, eine App. Oder pro Marke eine eigene App.",                   href: "/produkte/app",                icon: <Smartphone className="w-4 h-4" /> },
  { img: imgKasse,       title: "Kassensystem",           tagline: "Alle Bestellungen aller Marken zentral auf einer Kasse. TSE-konform.",                          href: "/produkte/kassensystem",       icon: <Monitor className="w-4 h-4" /> },
  { img: imgTransaktion, title: "Zahlungsabwicklung",     tagline: "Zahlungsgebühren transparent an Kunden weitergeben. Volle Kontrolle über dein Geld.",           href: "/produkte/transaktionsumlage", icon: <Percent className="w-4 h-4" /> },
  { img: imgWebseite,    title: "Webseite",               tagline: "Für jede Marke eine professionelle Online-Präsenz. Gefunden auf Google.",                      href: "/produkte/webseite",           icon: <Globe className="w-4 h-4" /> },
];

// ─── Schema ──────────────────────────────────────────────────────────────────

const SCHEMA_FAQ = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: plainText(a) } })),
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de/" },
    { "@type": "ListItem", position: 2, name: "Lösungen", item: "https://gastro-master.de/loesungen" },
    { "@type": "ListItem", position: 3, name: "Ghost Kitchen", item: "https://gastro-master.de/loesungen/ghost-kitchen" },
  ],
};

const SCHEMA_HOWTO = {
  "@context": "https://schema.org", "@type": "HowTo",
  name: "In 4 Schritten zur eigenen Ghost Kitchen",
  description: "So startest du deine Ghost Kitchen mit Gastro Master. Von der Beratung bis zum Go Live.",
  step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
};

// ─── Page ────────────────────────────────────────────────────────────────────

const GhostKitchenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Ghost Kitchen starten — 0 % Provision, Multi-Brand | Gastro Master",
    description: "Starte deine Ghost Kitchen ohne Plattform-Abhängigkeit. Multi-Brand, eigene App, eigener Webshop. 0 % Provision. Persönlicher Support auf Deutsch.",
    canonical: "https://gastro-master.de/loesungen/ghost-kitchen",
  });

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] pt-36 pb-24 px-5 md:px-8 lg:px-16">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-white/35 text-sm font-medium mb-5">
            Lösungen <span className="text-white/20 mx-2">→</span> <span className="text-cyan-brand">Ghost Kitchen</span>
          </p>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6">
            Ghost Kitchen · Cloud Kitchen · Dark Kitchen
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Deine Ghost Kitchen. Dein System.{" "}<span className="text-gradient-brand">Null Provision.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
            Multi-Brand, Multi-Channel, eine Kasse. Alles was du brauchst, um deine Ghost Kitchen profitabel zu betreiben. Ohne Plattform-Abhängigkeit.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-8">
            <Link to="/kontakt" className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              Kostenlose Beratung <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#produkte" className="text-white/50 text-sm font-medium inline-flex items-center gap-1.5 hover:text-white/70 transition-colors">Produkte ansehen ↓</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-3">
            {["0 % Provision", "Multi-Brand", "Eigene App", "Persönlicher Support"].map(pill => (
              <span key={pill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.10] text-white/65 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand flex-shrink-0" />{pill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S2: MARKET STATS ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-20 md:py-28 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">Marktdaten</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">Der Ghost Kitchen Markt wächst rasant</h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg">Die Chance ist riesig. Das Risiko auch, wenn du auf Provisionsmodelle setzt.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-2xl p-6 border ${i === 0 ? "bg-[#0A264A] border-transparent" : stat.isCta ? "border-2 border-cyan-brand bg-cyan-brand/5" : "bg-white dark:bg-white/[0.04] border-[#0A264A]/[0.08] dark:border-white/[0.08]"}`}>
                <p className={`text-3xl md:text-4xl font-black tracking-tight leading-none mb-2 ${i === 0 ? "text-cyan-brand" : stat.isCta ? "text-cyan-brand" : "text-[#0A264A] dark:text-white"}`}>{stat.value}</p>
                <p className={`text-sm leading-snug mb-4 ${i === 0 ? "text-white/55" : "text-[#0A264A]/50 dark:text-white/50"}`}>{stat.label}</p>
                <a href={stat.href} target={stat.isCta ? "_self" : "_blank"} rel="noopener noreferrer"
                  className={`text-[11px] underline underline-offset-2 inline-flex items-center gap-1 transition-colors ${i === 0 ? "text-white/25 hover:text-cyan-brand" : stat.isCta ? "text-cyan-brand font-semibold hover:text-cyan-brand/80" : "text-[#0A264A]/25 dark:text-white/25 hover:text-cyan-brand"}`}>
                  {stat.isCta ? <>Jetzt starten <ArrowRight className="w-3 h-3" /></> : <>{stat.source} <ExternalLink className="w-2.5 h-2.5" /></>}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: PROBLEMS ──────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Die Herausforderung</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Ohne das richtige System verlierst du Marge und Kontrolle</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Diese drei Probleme kennt jede Ghost Kitchen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4"><Icon className="w-6 h-6" /></div>
                  <h3 className="font-bold text-foreground text-base mb-2">{p.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{p.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUCT SHOWCASE ──────────────────────────────────────── */}
      <section id="produkte" className="px-5 md:px-8 lg:px-16 py-20 md:py-28" style={{ backgroundColor: "#0A264A" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">Deine Ghost Kitchen Infrastruktur</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Alles aus einer Hand</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Fünf Produkte, die perfekt zusammenpassen. Multi-Brand ready.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {PRODUCTS.slice(0, 3).map((p, i) => (
              <motion.div key={p.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group">
                <div className="relative overflow-hidden h-48">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">{p.icon}{p.title}</div>
                </div>
                <div className="p-5">
                  <p className="text-white/70 text-sm leading-snug mb-3">{p.tagline}</p>
                  <Link to={p.href} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">Mehr erfahren <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {PRODUCTS.slice(3).map((p, i) => (
              <motion.div key={p.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 + i * 0.08, duration: 0.4 }}
                className="bg-white/[0.06] border border-white/[0.10] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300 group">
                <div className="relative overflow-hidden h-40">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">{p.icon}{p.title}</div>
                </div>
                <div className="p-5">
                  <p className="text-white/70 text-sm leading-snug mb-3">{p.tagline}</p>
                  <Link to={p.href} className="inline-flex items-center gap-1 text-cyan-brand text-xs font-semibold hover:gap-2 transition-all duration-200">Mehr erfahren <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: GHOST KITCHEN ERKLÄRT ─────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">Das Konzept</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-4">Was ist eine Ghost Kitchen? Die Zukunft der Gastronomie.</h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg max-w-2xl mx-auto">Auch bekannt als Cloud Kitchen oder Dark Kitchen. Das Konzept, das die Gastronomie revolutioniert.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {[
              { title: "Das Multi-Brand-Konzept", text: "In einer einzigen Ghost Kitchen können mehrere Restaurants gleichzeitig betrieben werden. Aus derselben Küche kommen Pizza, Bowls, Burger und Sushi. Jeweils unter einer eigenen Marke. Der Vorteil: Du deckst verschiedene Nischen ab, ohne für jedes Konzept ein neues Lokal mieten zu müssen." },
              { title: "Radikale Kostenoptimierung", text: "Kein Servicepersonal für den Gastraum. Geringe Mieten in B-Lagen. Arbeitsabläufe sind rein auf Geschwindigkeit und Effizienz getrimmt. Eine Ghost Kitchen braucht 60 bis 80 % weniger Fläche als ein klassisches Restaurant." },
              { title: "Datenbasierte Menü-Anpassung", text: "Eine Ghost Kitchen sieht in den Daten, was gerade trendet, erstellt innerhalb von 48 Stunden ein digitales Branding und geht live. Flops werden einfach gelöscht, Erfolge sofort skaliert. Kein Umbau, keine neue Speisekarte drucken." },
              { title: "Entkopplung von der Atmosphäre", text: "In der Ghost Kitchen zählt nur das Produkt und die Logistik. Der Fokus liegt zu 100 % darauf, wie das Essen beim Kunden ankommt. Gastronomie wie ein Software-Startup: schnell, skalierbar und extrem datenfokussiert." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] p-7 bg-[#f8fafc] dark:bg-white/[0.03]">
                <h3 className="text-lg font-bold text-[#0A264A] dark:text-white mb-3">{item.title}</h3>
                <p className="text-[#0A264A]/60 dark:text-white/50 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Concept Comparison Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h3 className="text-2xl font-black text-[#0A264A] dark:text-white text-center mb-8">Restaurant vs. Lieferdienst vs. Ghost Kitchen</h3>
          </motion.div>
          <div className="overflow-x-auto rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] shadow-lg">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/45 dark:text-white/30 font-semibold text-xs uppercase tracking-wider text-left px-6 py-4 w-[25%]">Merkmal</th>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/70 dark:text-white/60 font-semibold px-6 py-4 text-center">Restaurant</th>
                  <th className="bg-[#f8fafc] dark:bg-white/[0.03] text-[#0A264A]/70 dark:text-white/60 font-semibold px-6 py-4 text-center">Lieferdienst</th>
                  <th className="bg-[#0A264A] px-6 py-4 text-center">
                    <span className="text-cyan-brand text-[10px] font-bold uppercase tracking-widest block mb-0.5">Empfohlen</span>
                    <span className="text-white font-bold">Ghost Kitchen</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {CONCEPT_COMPARE.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#fafafa] dark:bg-white/[0.02]"}>
                    <td className="px-6 py-4 text-[#0A264A]/60 dark:text-white/50 font-medium border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">{row.label}</td>
                    <td className="px-6 py-4 text-center text-[#0A264A]/55 dark:text-white/45 border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">{row.restaurant}</td>
                    <td className="px-6 py-4 text-center text-[#0A264A]/55 dark:text-white/45 border-b border-[#0A264A]/[0.05] dark:border-white/[0.05]">{row.lieferdienst}</td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-bold border-b border-[#0A264A]/[0.05] dark:border-white/[0.05] bg-[#0A264A]/[0.02] dark:bg-white/[0.01]">{row.ghost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── S6: COMPARISON TABLE (GM vs Plattformen) ──────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-foreground/8 text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">Vergleich</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Gastro Master vs. Lieferplattformen</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Warum Ghost Kitchen Betreiber auf Gastro Master setzen.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-lg">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/40 font-semibold w-[35%]">Merkmal</th>
                  <th className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-brand/15 text-cyan-brand text-[10px] font-bold uppercase tracking-wider block mb-1">Empfohlen</span>
                    <span className="font-black text-foreground text-base">Gastro Master</span>
                  </th>
                  <th className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-semibold">Lieferando / Uber Eats</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}>
                    <td className="p-4 text-foreground/70 font-medium">{row.label}</td>
                    <td className="p-4 text-center"><span className={`font-semibold ${row.gmGood ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>{row.gm}</span></td>
                    <td className="p-4 text-center"><span className={row.platformBad ? "text-red-500" : "text-foreground/70"}>{row.platform}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Savings Callout */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-[#0A264A] to-[#0D3266] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10">
            <div className="flex-1">
              <p className="text-white text-xl md:text-2xl font-black leading-snug mb-3">
                Bei 3.000 € Monatsumsatz zahlst du an Lieferando <span className="text-amber-400">bis zu 900 € Provision</span>. Jeden Monat.
              </p>
              <p className="text-white/55 text-sm">Mit Gastro Master: nur 79 €/Monat, 0 % Provision.</p>
            </div>
            <Link to="/kontakt" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-amber text-[#0A264A] font-bold text-sm whitespace-nowrap hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              Kostenlose Beratung <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── S7: IMPLEMENTATION STEPS ──────────────────────────────────── */}
      <section className="bg-[#0A264A] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-10 bg-white/15" /><span className="text-white/35 text-xs font-bold uppercase tracking-widest">So startest du</span><div className="h-px w-10 bg-white/15" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">In 4 Schritten zur eigenen Ghost Kitchen</h2>
          <p className="text-white/50 text-lg max-w-xl mb-14">Wir machen es dir einfach. Von der Beratung bis zum Go Live.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-2xl p-7 md:p-8 overflow-hidden ${i === 0 ? "border border-cyan-brand/30 bg-cyan-brand/[0.06]" : "border border-white/[0.08] bg-white/[0.04]"}`}>
                  <span className="absolute top-3 right-5 text-7xl font-black text-white/[0.04] leading-none select-none pointer-events-none">{step.num}</span>
                  <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5"><Icon className="w-5 h-5 text-cyan-brand" /></div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                  <p className="text-sm text-white/55 leading-7">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S8: TRUST STRIP ───────────────────────────────────────────── */}
      <section className="bg-[#0A264A] py-8 px-5 md:px-8 lg:px-16 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "700+", label: "Gastro-Betriebe vertrauen auf Gastro Master" },
              { value: "5,0 ★", label: "Kundenbewertung auf Google" },
              { value: "0 %", label: "Provision auf alle Bestellungen" },
              { value: "Multi-Brand", label: "Mehrere Marken, ein System" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="text-cyan-brand font-black text-lg leading-none">{value}</span>
                <span className="text-white/40 text-sm leading-snug max-w-[120px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S9: FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/10 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3">Häufige Fragen zum Thema Ghost Kitchen</h2>
            <p className="text-foreground/50 text-base">Die Fragen, die Ghost Kitchen Gründer stellen.</p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-background overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                  <span className="font-semibold text-foreground text-[15px] pr-4 leading-snug">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-brand flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div key="content" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm text-foreground/65 leading-7 border-t border-border pt-4">{renderWithLinks(item.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S10: CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] py-24 md:py-32 px-5 md:px-8 lg:px-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Wir helfen dir, deine Ghost Kitchen <span className="text-cyan-brand">startklar zu machen</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10">
            Webshop, App, Kassensystem. Alles aus einer Hand. 0 % Provision. Persönlicher Support.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/kontakt" className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              Kostenlose Beratung <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {[["0 %", "Provision"], ["700+", "Restaurants"], ["5,0 ★", "Google Bewertung"], ["Persönlicher", "Support"]].map(([val, label]) => (
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

export default GhostKitchenPage;

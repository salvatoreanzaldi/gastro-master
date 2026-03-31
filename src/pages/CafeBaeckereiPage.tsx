import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, ExternalLink,
  Clock, ShoppingCart, Users,
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

/* ─── Data ───────────────────────────────────────────────── */

const STATS = [
  {
    value: "17,92 Mrd. €",
    label: "Umsatz des deutschen Backgewerbes 2024",
    source: "Zentralverband des Deutschen Bäckerhandwerks",
    href: "https://www.baeckerhandwerk.de/baeckerhandwerk/zahlen-fakten/",
  },
  {
    value: "44.000",
    label: "Verkaufsstellen im deutschen Bäckerhandwerk",
    source: "Zentralverband des Deutschen Bäckerhandwerks",
    href: "https://www.baeckerhandwerk.de/baeckerhandwerk/zahlen-fakten/",
  },
  {
    value: "25.000 €",
    label: "Bußgeld bei fehlender TSE-Kassenpflicht",
    source: "Bundeszentralamt für Steuern",
    href: "https://www.bzst.de/DE/Unternehmen/Aussenpruefungen/DigitaleSchnittstelleFinanzVerwaltungKassen/digitaleschnittstellefinanzverwaltungkassen_node.html",
  },
  {
    value: "ab 69 €/Monat",
    label: "Gastro Master Kassensystem — alles inklusive",
    source: "Gastro Master",
    href: "https://gastro-master.de/kontakt",
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
  { label: "TSE-konform (gesetzliche Pflicht)", gm: "✓ Inklusive",    gmGood: true,  other: "Oft teurer Extra-Vertrag",   otherBad: true  },
  { label: "Online-Vorbestellung",              gm: "✓ Inklusive",    gmGood: true,  other: "Separates System nötig",     otherBad: true  },
  { label: "QR-Tischbestellung",                gm: "✓ Verfügbar",    gmGood: true,  other: "Meist nicht vorhanden",      otherBad: true  },
  { label: "Self-Checkout Terminal",            gm: "✓ Verfügbar",    gmGood: true,  other: "Nur bei Großanbietern",      otherBad: true  },
  { label: "Monatliche Kosten",                 gm: "Ab 69 €/Monat", gmGood: true,  other: "80–200 €/Monat",             otherBad: true  },
  { label: "Einrichtungszeit",                  gm: "2–3 Wochen",    gmGood: true,  other: "4–12 Wochen",                otherBad: true  },
  { label: "Support",                           gm: "Persönlich",    gmGood: true,  other: "Hotline / Ticket-System",    otherBad: false },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Braucht mein Café eine TSE-konforme Kasse?",
    a: "Ja. Seit 2020 ist jede Kasse in Deutschland gesetzlich dazu verpflichtet, eine TSE-Zertifizierung zu haben. Das Finanzamt kann das jederzeit prüfen. Bei Verstoß drohen Bußgelder bis zu 25.000 €. Das [Gastro Master Kassensystem](/produkte/kassensystem) erfüllt alle Anforderungen — das regeln wir für dich.",
  },
  {
    q: "Kann ich über Gastro Master Online-Vorbestellungen annehmen?",
    a: "Ja. Deine Kunden können über deinen [Online-Shop](/produkte/webshop) oder deine [App](/produkte/app) im Voraus bestellen und bezahlen. Ideal für die Mittagspause oder das Wochenend-Frühstück. Du siehst alle Bestellungen direkt auf deiner Kasse.",
  },
  {
    q: "Was kostet ein Kassensystem für eine Bäckerei bei Gastro Master?",
    a: "Das [Kassensystem](/produkte/kassensystem) kostet ab 69 € pro Monat. Darin enthalten: TSE-Modul, Speisekartenverwaltung, Tagesabschluss und persönlicher Support. Die Einrichtung wird individuell auf deinen Betrieb abgestimmt.",
  },
  {
    q: "Funktioniert die Kasse auch ohne Internet?",
    a: "Ja. Die Gastro Master [Kasse](/produkte/kassensystem) arbeitet auch offline. Alle Daten werden lokal gespeichert und nach der Verbindung automatisch synchronisiert.",
  },
  {
    q: "Kann ich mehrere Filialen über ein System verwalten?",
    a: "Ja. Du verwaltest alle Filialen über ein zentrales Dashboard. Speisekarte, Statistiken und Einstellungen — alles an einem Ort. Ideal wenn du mehrere Standorte hast oder planst. Für Franchise-Systeme gibt es die [Franchise-Lösung](/loesungen/franchise).",
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
  "headline": "Kassensystem für Café & Bäckerei 2026 — TSE-konform, Online-Vorbestellung",
  "description": "TSE-konformes Kassensystem, Online-Vorbestellung und QR-Tischbestellung für Café und Bäckerei. Ab 69 €/Monat.",
  "url": "https://gastro-master.de/loesungen/cafe-baeckerei",
  "publisher": { "@type": "Organization", "name": "Gastro Master", "url": "https://gastro-master.de" },
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-29",
};

interface ProblemItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Lange Schlangen an der Kasse",
    desc: "Besonders morgens und mittags. Kunden haben keine Zeit — und gehen zur Konkurrenz.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Keine Online-Vorbestellung",
    desc: "Wer nicht vorbestellen kann, wartet oder kommt nicht. Online-Bestellung wird heute erwartet.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Fachkräftemangel trifft die Kasse zuerst",
    desc: "Jede Minute, die dein Personal an der Kasse verbringt, fehlt woanders. Technik kann das auffangen.",
  },
];

interface ProductCard {
  img: string;
  title: string;
  tagline: string;
  href: string;
  features?: string[];
}

const SMALL_PRODUCTS: ProductCard[] = [
  {
    img: imgWebshop,
    title: "Online Shop",
    tagline: "Kunden bestellen Torten, Catering oder Frühstücks-Pakete online vor.",
    href: "/produkte/webshop",
    features: [
      "Vorbestellungen für Torten und Catering",
      "Kein Warten — du bereitest alles vor",
      "Bestellungen kommen direkt auf die Kasse",
    ],
  },
  {
    img: imgWebseite,
    title: "Webseite",
    tagline: "Dein Café online — Google findet dich, Kunden kommen zu dir.",
    href: "/produkte/webseite",
    features: [
      "Speisekarte jederzeit selbst aktualisieren",
      "Öffnungszeiten und Standort für alle sichtbar",
      "Mehr Laufkundschaft durch bessere Sichtbarkeit",
    ],
  },
  {
    img: imgApp,
    title: "App System",
    tagline: "Deine eigene Bestell-App — Push-Nachrichten inklusive.",
    href: "/produkte/app",
    features: [
      "Stammkunden per Nachricht informieren",
      "\"Frische Croissants da!\" — direkt aufs Handy",
      "Dein Logo und deine Farben in der App",
    ],
  },
  {
    img: imgTransaktion,
    title: "Zahlungsgebühren",
    tagline: "Zahlungsgebühren? Können deine Kunden übernehmen.",
    href: "/produkte/transaktionsumlage",
    features: [
      "Kein Abzug von deinem Umsatz",
      "Kunden zahlen die Gebühr direkt",
      "Standard in vielen europäischen Ländern",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Kostenloses Gespräch",
    desc: "In 30 Minuten erklären wir dir alles — online oder vor Ort.",
  },
  {
    num: "02",
    title: "Einrichtung in 2–3 Wochen",
    desc: "Wir richten alles ein. Du machst weiter wie gewohnt.",
  },
  {
    num: "03",
    title: "Direkt loslegen",
    desc: "Deine Kasse ist sofort bereit. TSE-konform. Fertig.",
  },
];

const TRUST_ITEMS = [
  { value: "700+",             label: "Gastro-Betriebe vertrauen auf Gastro Master" },
  { value: "5,0 ★",           label: "Kundenbewertung auf Google" },
  { value: "TSE-konform",     label: "Alle Systeme TSE-zertifiziert" },
  { value: "Persönl. Support", label: "Euer Team hilft direkt" },
];

/* ─── SmallProductCard ───────────────────────────────────── */

const SmallProductCard = ({ product }: { product: ProductCard }) => (
  <Link
    to={product.href}
    className="group relative rounded-2xl overflow-hidden bg-white/8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
  >
    <div className="relative h-40 overflow-hidden">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A264A] via-[#0A264A]/30 to-transparent" />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="font-bold text-white text-base mb-1">{product.title}</h3>
      <p className="text-white/55 text-xs leading-relaxed flex-1">{product.tagline}</p>
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
        Mehr erfahren <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </Link>
);

/* ─── Page ───────────────────────────────────────────────── */

const CafeBaeckereiPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Kassensystem Café & Bäckerei 2026 — TSE-konform, Online-Vorbestellung | Gastro Master",
    description: "TSE-konformes Kassensystem, Online-Vorbestellung und QR-Tischbestellung für Café und Bäckerei. Ab 69 €/Monat. Jetzt kostenlose Beratung sichern.",
    canonical: "https://gastro-master.de/loesungen/cafe-baeckerei",
  });

  return (
    <div className="min-h-screen bg-[#0A264A]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }}
      />

      <Navbar />

      {/* ── S1: HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] min-h-screen flex items-center px-5 md:px-8 lg:px-16 pt-36 pb-24 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-brand/6 blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            Café & Bäckerei · Gastro Master
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-8"
          >
            Schnell kassieren.{" "}
            <span className="text-gradient-brand">Online vorbestellen.</span>
            <br />Alles für dein Café.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed mb-6"
          >
            TSE-konforme Kasse, Online-Vorbestellung und QR-Tischbestellung —
            einfach einzurichten, sofort einsatzbereit.
          </motion.p>

          {/* GEO Definition Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-10 p-4 rounded-xl border border-white/10 bg-white/5 text-left"
          >
            <p className="text-white/40 text-xs leading-relaxed">
              <span className="text-white/60 font-semibold">TSE-Kassenpflicht:</span>{" "}
              Seit dem 1. Januar 2020 müssen alle Kassensysteme in Deutschland mit einer zertifizierten
              technischen Sicherheitseinrichtung (TSE) ausgestattet sein. Das Finanzamt kann die Konformität
              jederzeit prüfen — bei Verstößen drohen Bußgelder bis zu 25.000 €. Cafés und Bäckereien, die
              zusätzlich Online-Vorbestellsysteme einsetzen, reduzieren Wartezeiten und erhöhen den
              durchschnittlichen Bestellwert nachweislich.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenloses Beratungsgespräch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#produkte"
              className="px-8 py-5 rounded-xl text-lg font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all text-center"
            >
              Produkte ansehen ↓
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {["700+ Betriebe", "TSE-konform", "Persönliche Einrichtung", "Persönlicher Support"].map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full bg-white/8 border border-white/10 text-white/60 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S2: STATS ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              Das Bäckerhandwerk wächst — Technik muss mithalten
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              Millionen Kunden kaufen täglich in Bäckereien und Cafés. Wer jetzt digitalisiert, ist vorne.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 flex flex-col gap-3 ${
                  i === 0
                    ? "bg-[#0A264A] text-white"
                    : i === 3
                    ? "bg-[#0A264A]/5 dark:bg-white/5 border-2 border-cyan-brand/40"
                    : "bg-white dark:bg-white/5 border border-[#0A264A]/10 dark:border-white/10"
                }`}
              >
                <p
                  className={`text-3xl font-black ${
                    i === 0
                      ? "text-white"
                      : i === 3
                      ? "text-cyan-brand"
                      : "text-[#0A264A] dark:text-white"
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`text-sm leading-snug ${
                    i === 0 ? "text-white/70" : "text-[#0A264A]/60 dark:text-white/60"
                  }`}
                >
                  {s.label}
                </p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs flex items-center gap-1 mt-auto transition-colors ${
                    i === 0
                      ? "text-white/40 hover:text-white/70"
                      : "text-[#0A264A]/30 dark:text-white/30 hover:text-[#0A264A]/60 dark:hover:text-white/60"
                  }`}
                >
                  {s.source} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/kontakt" className="text-cyan-brand font-semibold hover:underline text-sm">
              Jetzt Kassensystem einrichten →
            </Link>
          </div>
        </div>
      </section>

      {/* ── S3: PROBLEM ──────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              Die Herausforderung
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              Drei Probleme, die viele Cafés und Bäckereien kennen
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              Technik kann helfen — wenn sie einfach zu bedienen ist.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-white/5 border border-amber-200 dark:border-amber-500/20 p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-bold text-[#0A264A] dark:text-white text-lg mb-2">{p.title}</h3>
                <p className="text-[#0A264A]/55 dark:text-white/55 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: PRODUKTE ─────────────────────────────────────────── */}
      <section id="produkte" className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              Deine Produkte · Gastro Master
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Alles, was dein Café braucht — aus einer Hand
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              Kasse, Online-Shop, Webseite und App — aufeinander abgestimmt. Kein Flickenteppich.
            </p>
          </div>

          {/* Featured Card: Kassensystem */}
          <div className="rounded-2xl overflow-hidden bg-white/8 border border-white/10 mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={imgKasse}
                  alt="Kassensystem für Café und Bäckerei"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A264A]/20 hidden lg:block" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-brand text-[#0A264A] text-xs font-black uppercase tracking-wider">
                    Empfohlen
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                    Ab 69 €/Monat
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Kassensystem</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-5">
                  Unsere Kasse ist vom Finanzamt zugelassen — das nennt man TSE-konform.
                  QR-Tischbestellung und Self-Checkout Terminal sind verfügbar.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "TSE-konform — vom Finanzamt zugelassen",
                    "Scannerintegration für Backwaren und Getränke",
                    "Tagesabschluss auf Knopfdruck",
                    "Self-Checkout Terminal verfügbar",
                    "QR-Tischbestellung für Cafébesuche verfügbar",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-white/65 text-sm">
                      <span className="text-cyan-brand shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/produkte/kassensystem"
                  className="inline-flex items-center gap-2 text-cyan-brand font-semibold hover:gap-3 transition-all text-sm"
                >
                  Kassensystem ansehen <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <p className="text-white/30 text-xs text-center mb-5">
            Alle Produkte werden in deinen Farben und mit deinem Logo eingerichtet.
          </p>

          {/* SmallProductCards 2+2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SMALL_PRODUCTS.map((p) => (
              <SmallProductCard key={p.href} product={p} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Kostenloses Beratungsgespräch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S5: VERGLEICH ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0A264A]/10 dark:bg-white/10 text-[#0A264A] dark:text-white text-xs font-bold uppercase tracking-widest mb-4">
              Vergleich
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              Gastro Master vs. andere Kassensysteme
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              Warum immer mehr Cafés und Bäckereien auf Gastro Master setzen.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#0A264A]/10 dark:border-white/10">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#0A264A] text-white">
              <div className="py-4 px-5 text-sm font-semibold text-white/50">Kriterium</div>
              <div className="py-4 px-5 text-sm font-bold text-center border-x border-white/10">
                <span className="text-cyan-brand">Gastro Master</span>
              </div>
              <div className="py-4 px-5 text-sm font-semibold text-center text-white/50">
                Andere Kassen
              </div>
            </div>
            {/* Rows */}
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-[#0A264A]/8 dark:border-white/8 ${
                  i % 2 === 0 ? "bg-white dark:bg-white/3" : "bg-[#f8fafc] dark:bg-white/2"
                }`}
              >
                <div className="py-4 px-5 text-sm font-medium text-[#0A264A] dark:text-white">
                  {row.label}
                </div>
                <div
                  className={`py-4 px-5 text-sm text-center font-semibold border-x border-[#0A264A]/8 dark:border-white/8 ${
                    row.gmGood ? "text-emerald-600 dark:text-emerald-400" : "text-[#0A264A] dark:text-white"
                  }`}
                >
                  {row.gm}
                </div>
                <div
                  className={`py-4 px-5 text-sm text-center ${
                    row.otherBad ? "text-red-500 dark:text-red-400" : "text-[#0A264A]/60 dark:text-white/60"
                  }`}
                >
                  {row.other}
                </div>
              </div>
            ))}
          </div>

          {/* CTA after compare */}
          <div className="mt-8 p-6 rounded-2xl bg-[#0A264A] text-white flex flex-col md:flex-row gap-4 items-center justify-between">
            <p className="text-white/75 text-sm leading-relaxed md:max-w-sm">
              Viele Bäckereien zahlen mehr als nötig — für Systeme, die weniger können.
            </p>
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              Kostenloses Gespräch buchen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S6: PROZESS ─────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4">
              So geht's
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              In 3 Schritten live gehen
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-2xl mx-auto">
              Kein IT-Wissen nötig. Wir machen das für dich.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-white dark:bg-white/5 border border-[#0A264A]/10 dark:border-white/10 p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A264A] text-white flex items-center justify-center font-black text-lg mb-4">
                  {s.num}
                </div>
                <h3 className="font-bold text-[#0A264A] dark:text-white text-lg mb-2">{s.title}</h3>
                <p className="text-[#0A264A]/55 dark:text-white/55 text-sm leading-relaxed">{s.desc}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 text-[#0A264A]/20 dark:text-white/20 text-xl z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: TRUST-STRIP ──────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-10">
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

      {/* ── S8: EPIT PAY TEASER ──────────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-[#0A264A] p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Bald verfügbar
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                Epit Pay — bald mit eigener Zahlungsabwicklung
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Bald brauchst du keinen extra Zahlungsanbieter mehr.
                Mit Epit Pay bekommst du Kasse, Bestellsystem und Zahlungsabwicklung aus einer Hand.
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-6 py-3 rounded-xl border border-white/20 text-white/40 text-sm font-semibold cursor-default select-none">
                Mehr erfahren →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── S9: FAQ ─────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0A264A]/10 dark:bg-white/10 text-[#0A264A] dark:text-white text-xs font-bold uppercase tracking-widest mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-3">
              Häufige Fragen von Café- und Bäckerei-Betreibern
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/55 text-lg max-w-xl mx-auto">
              Die Antworten auf die Fragen, die uns am häufigsten erreichen.
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
                  <span className="font-bold text-[#0A264A] dark:text-white text-base">{item.q}</span>
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

      {/* ── S10: CTA ABSCHLUSS ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8">
            Kostenloses Beratungsgespräch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Wir helfen dir, dein Café oder<br />deine Bäckerei startklar zu machen.
          </h2>
          <p className="text-xl text-white/55 max-w-xl mx-auto leading-relaxed mb-10">
            Kassensystem, Online-Vorbestellung, Webseite — alles aus einer Hand.
            Kein Stress mit Technik.
          </p>
          <Link
            to="/kontakt"
            className="bg-gradient-amber text-[#0A264A] font-bold px-12 py-5 rounded-xl text-xl inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20 mb-10"
          >
            Kostenloses Gespräch buchen
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-white/40 text-sm">
            {["0 % Provision", "700+ Betriebe", "5,0 ★ Google", "TSE-konform"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CafeBaeckereiPage;

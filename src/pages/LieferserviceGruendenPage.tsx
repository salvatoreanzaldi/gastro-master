import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Building2, ClipboardList, Target, Monitor,
  ChevronDown, ExternalLink, type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

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
    label: "Online Food Delivery Umsatz Deutschland (2023)",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "9,9 Mrd. €",
    label: "Prognostizierter Umsatz bis 2028 — Wachstum +62 %",
    source: "Statista",
    href: "https://de.statista.com/prognosen/642308/online-food-delivery-umsatz-in-deutschland",
  },
  {
    value: "bis 30 %",
    label: "Provision Lieferando bei Plattform-Fahrern",
    source: "Berliner Abendblatt",
    href: "https://berliner-abendblatt.de/berlin-news/lieferando-hoehere-provisionen-fuer-restaurants-id162852",
  },
  {
    value: "20–60 €",
    label: "Kosten für die Gewerbeanmeldung eines Lieferdienstes",
    source: "gewerbeanmeldung.de",
    href: "https://www.gewerbeanmeldung.de/gewerbe-anmelden/lieferservice",
  },
];

export const STEPS: StepItem[] = [
  {
    num: "01",
    icon: Building2,
    title: "Geschäftsmodell wählen",
    text: "Eigene Produktion, Ghost Kitchen oder Vermittlung? Jedes Modell hat andere Anforderungen an Kapital, Fläche und Personal. Ghost Kitchens liefern ohne Gastraum — mit 60–80 % niedrigeren Mietkosten.",
    highlight: "Ghost Kitchens: 60–80 % niedrigere Mietkosten vs. klassisches Restaurant",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Gewerbe anmelden & Rechtliches klären",
    text: "Du benötigst: Gewerbeanmeldung beim Gewerbeamt (20–60 €), Lebensmittelhygiene-Schulung nach HACCP-Standard und ein Gesundheitszeugnis vom Gesundheitsamt für alle Personen mit Lebensmittelkontakt.",
    highlight: "Kosten: 20–60 €. Dauer: 1–2 Wochen. Kein Führerschein oder Gaststättenkonzession nötig.",
  },
  {
    num: "03",
    icon: Target,
    title: "Spezialisierung statt breites Angebot",
    text: "Spezialisten gewinnen: Ein Lieferdienst für vegane Bowls baut schneller Stammkunden auf als ein generischer Anbieter. Nischenpositionierung schützt vor dem Preiskampf mit Plattformen.",
    highlight: "Empfehlung zum Start: 1 Küchen-Kategorie, 8–12 Gerichte, 1 Liefergebiet.",
  },
  {
    num: "04",
    icon: Monitor,
    title: "Technik & Bestellsystem aufbauen",
    text: "Hier entscheidet sich, ob du auf ewig Provision zahlst oder 100 % deines Umsatzes behältst. Mit Gastro Master bekommst du eigenen Webshop, App und Kassensystem — ohne technisches Vorwissen, live in 2–3 Wochen.",
    highlight: "0 % Provision ab dem ersten Auftrag. Keine Einrichtungskosten.",
    featured: true,
    products: [
      { label: "Webshop (0 % Provision)", href: "/produkte/webshop" },
      { label: "Bestell-App",             href: "/produkte/app" },
      { label: "Transaktionsumlage",      href: "/produkte/transaktionsumlage" },
      { label: "Webseite",                href: "/produkte/webseite" },
    ],
  },
];

export const COMPARE_ROWS: CompareRow[] = [
  { label: "Provision pro Bestellung",    own: "0 %",                        ownGood: true,  platform: "13–30 %",                 platformBad: true  },
  { label: "Kundendaten gehören dir",     own: "✓ Vollständig",              ownGood: true,  platform: "✗ Gehören der Plattform", platformBad: true  },
  { label: "Eigenes Branding & App",      own: "✓ Eigene Domain & App",      ownGood: true,  platform: "✗ Plattform-Branding",    platformBad: true  },
  { label: "Preisgestaltung",             own: "✓ Vollständig frei",         ownGood: true,  platform: "Eingeschränkt",            platformBad: false },
  { label: "Monatliche Fixkosten",        own: "ab 49 €/Monat",             ownGood: true,  platform: "% vom Umsatz (variabel)",  platformBad: false },
  { label: "Plattform-Sichtbarkeit",      own: "Eigene SEO / Ads",           ownGood: false, platform: "✓ In der Plattform",       platformBad: false },
  { label: "Direktes Kundenfeedback",     own: "✓ Direkt & vollständig",     ownGood: true,  platform: "Nur über Plattform",       platformBad: false },
  { label: "Support & Onboarding",        own: "✓ Persönlich (700+ Kunden)", ownGood: true,  platform: "Ticket-System",            platformBad: false },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Was kostet es, einen Lieferdienst zu gründen?",
    a: "Die Gründungskosten variieren je nach Modell. Die Gewerbeanmeldung kostet 20–60 €. Für eine Ghost Kitchen ohne eigene Produktion sind Startkosten ab 2.000–5.000 € realistisch. Das Bestellsystem (Webshop + App) ist ab 49 €/Monat erhältlich. Das größte Sparpotenzial liegt im laufenden Betrieb: Kein Plattformanteil von 13–30 % auf jeden Auftrag.",
  },
  {
    q: "Brauche ich ein Restaurant, um einen Lieferdienst zu starten?",
    a: "Nein. Du kannst als sogenannte Ghost Kitchen starten — eine Küche, die ausschließlich für die Lieferung produziert, ohne Gastraum. Das spart erhebliche Mietkosten und macht den Einstieg deutlich günstiger. Wichtig ist nur eine Gewerbeanmeldung und die Einhaltung der Lebensmittelhygiene-Vorschriften.",
  },
  {
    q: "Wie viel Provision nimmt Lieferando?",
    a: "Lieferando verlangt 13 % Provision, wenn du deine eigenen Fahrer einsetzt. Nutzt du die Lieferando-Fahrer, steigt die Provision auf bis zu 30 % pro Bestellung. Bei Wolt und Uber Eats liegen die Sätze ähnlich: 15–30 % je nach Vertrag und Service-Level. Quelle: Berliner Abendblatt, leaf-systems.eu.",
  },
  {
    q: "Lohnt sich ein eigener Lieferdienst 2026?",
    a: "Ja — der Markt wächst laut Statista von 6,1 Mrd. € (2023) auf prognostizierte 9,9 Mrd. € bis 2028. Wer früh ein eigenes System aufbaut, profitiert doppelt: vom Marktwachstum und vom Wegfall der Plattformprovisionen. Mit einem eigenen Bestellsystem zahlst du ab 49 €/Monat statt bis zu 30 % Provision.",
  },
  {
    q: "Welche Genehmigungen brauche ich für einen Lieferdienst?",
    a: "Du benötigst: (1) Gewerbeanmeldung beim lokalen Gewerbeamt (20–60 €), (2) Lebensmittelhygiene-Schulung nach HACCP-Standard (online möglich, ca. 20–50 €), (3) Gesundheitszeugnis vom Gesundheitsamt für alle Personen mit Lebensmittelkontakt (einmalig, ca. 30 €). Eine Gaststättenerlaubnis ist für reine Lieferdienste ohne Gastraum nicht erforderlich.",
  },
];

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
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

// ─── Page Component ───────────────────────────────────────────────────────────

const LieferserviceGruendenPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title =
      "Lieferdienst gründen 2026 — Kompletter Leitfaden | Gastro Master";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Eigenen Lieferdienst aufbauen ohne Lieferando. Schritt-für-Schritt: Gewerbeanmeldung, Kosten, Bestellsystem — 0 % Provision mit Gastro Master."
      );
  }, []);

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
            Ratgeber 2026 · Lieferdienst gründen
          </motion.span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Eigenen Lieferdienst gründen —{" "}
            <span className="text-gradient-brand">
              der komplette Leitfaden für 2026
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8"
          >
            Ohne Lieferando. Ohne 30 % Provision. Mit einem eigenen System, das dir gehört.
            Dieser Leitfaden erklärt dir Schritt für Schritt, wie du deinen Lieferdienst aufbaust —
            von der Gewerbeanmeldung bis zum ersten Auftrag.
          </motion.p>

          {/* GEO Definition Block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="border-l-2 border-cyan-brand bg-white/[0.05] rounded-r-xl px-5 py-4 max-w-2xl mb-10"
          >
            <span className="text-cyan-brand text-[10px] font-bold uppercase tracking-widest block mb-1.5">
              Definition
            </span>
            <p className="text-white/60 text-sm leading-relaxed">
              Ein eigener Lieferdienst ermöglicht es Gründern, ohne hohe Fixkosten in den
              boomenden Food-Delivery-Markt einzusteigen — unabhängig von Plattformen wie
              Lieferando, Wolt oder Uber Eats. Statt 15–30 % Provision zu zahlen, behältst
              du{" "}
              <strong className="text-white/85 font-semibold">
                100 % deines Umsatzes.
              </strong>
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4"
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
              Zur Anleitung ↓
            </a>
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
              Food Delivery Deutschland — Marktüberblick 2026
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg">
              Warum jetzt der richtige Zeitpunkt ist, deinen eigenen Lieferdienst zu starten
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
        </div>
      </section>

      {/* ── S3: SCHRITT-FÜR-SCHRITT ─────────────────────────────────────────── */}
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

      {/* ── S4: VERGLEICHSTABELLE ───────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] py-24 md:py-32 px-5 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              Vergleich
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white tracking-tight mb-3">
              Eigenes System vs. Plattform-Abhängigkeit
            </h2>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-lg max-w-xl mx-auto">
              Warum 700+ Gastronomen Lieferando & Co. den Rücken gekehrt haben
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

          {/* Conversion box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-[#0A264A] to-[#0D3266] rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <p className="text-white font-bold text-xl md:text-2xl leading-snug mb-2">
                Bei 3.000 € Monatsumsatz zahlt Lieferando bis zu{" "}
                <span className="text-cyan-brand">900 € Provision</span> — jeden Monat.
              </p>
              <p className="text-white/50 text-base">
                Mit Gastro Master zahlst du{" "}
                <strong className="text-white/80">49 €</strong> — und behältst den Rest.
              </p>
            </div>
            <Link
              to="/kontakt"
              className="flex-shrink-0 bg-gradient-amber text-[#0A264A] font-bold px-7 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              Jetzt kostenlos testen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── S5: FAQ ─────────────────────────────────────────────────────────── */}
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
                        {item.a}
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
            <span className="text-cyan-brand">deinen Lieferdienst zu planen</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10"
          >
            700+ Gastronomen haben mit Gastro Master ihre Plattformabhängigkeit beendet.
            Lass uns gemeinsam herausfinden, welches System für deinen Lieferdienst passt.
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
              Kostenloses Erstgespräch vereinbaren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {[
              ["0 €", "Einrichtungskosten"],
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

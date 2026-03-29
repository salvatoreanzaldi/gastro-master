import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2, Star,
  Globe, Images, Instagram, Mail, Users, Briefcase,
  Building2, Link2, Search, MapPin, TrendingUp,
  UtensilsCrossed, Coffee, Wrench, GraduationCap,
  ConciergeBell, Store, Hotel, Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

// ─── Assets ───────────────────────────────────────────────────────────────────
import heroGastroMaster from "@/assets/Hero - Gastro Master.PNG";
import heroBaeckerei    from "@/assets/Hero - Bäckerei Zimmer.PNG";
import heroEtManus      from "@/assets/Hero - Et Manus.PNG";
import heroDT           from "@/assets/Hero - DT.PNG";
import heroDandT        from "@/assets/Hero - D&T.PNG";
import logoKojo         from "@/assets/logo-kojo-sushi.png";
import logoIlSorriso    from "@/assets/logo-il-sorriso.png";
import logoBurger       from "@/assets/logo-burger-brothers.png";
import logoArtemis      from "@/assets/logo-artemis.png";
import teamReneImg      from "@/assets/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team-andrej-krutsch.png";

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Wie lange dauert die Erstellung einer Webseite?",
    a: "Eine einfache Webseite (Onepager) ist in der Regel innerhalb weniger Tage online. Für umfangreiche Mehrseiter mit individuellen Funktionen planen wir gemeinsam einen realistischen Zeitrahmen im Beratungsgespräch. Die Entwicklung startet sofort nach Freigabe der Inhalte.",
  },
  {
    q: "Was ist der Unterschied zwischen Abo (49 €/Monat) und Einmalkauf?",
    a: "Beim monatlichen Abo (49 €/Monat) übernehmen wir dauerhaft Hosting, Domain, technischen Support und Updates – du zahlst monatlich und kannst jederzeit kündigen. Beim Einmalkauf (ab 990 €) erwirbst du die vollständige Webseite und betreibst sie eigenständig. Für einfache Onepager beginnt der Preis bei 990 € – für individuelle Mehrseiter wird der Preis gemeinsam im Beratungsgespräch ermittelt.",
  },
  {
    q: "Brauche ich Technikkenntnisse, um meine Webseite zu pflegen?",
    a: "Nein. Im monatlichen Abo kümmern wir uns um alle technischen Aspekte. Inhaltliche Änderungen (Texte, Bilder, Öffnungszeiten) koordinierst du einfach mit unserem Team – schnell und unkompliziert per WhatsApp oder E-Mail.",
  },
  {
    q: "Kann ich meine Webseite mit dem Gastro Master Webshop oder der App verknüpfen?",
    a: "Ja. Deine Gastro Master Webseite lässt sich nahtlos mit dem Online-Bestellshop und der Bestell-App verknüpfen. Kunden landen auf deiner Webseite und können von dort direkt eine Bestellung aufgeben – ohne Plattformwechsel.",
  },
  {
    q: "Was bedeutet DSGVO-konform, und warum ist das wichtig?",
    a: "DSGVO-konform bedeutet, dass deine Webseite alle Anforderungen der europäischen Datenschutz-Grundverordnung erfüllt: korrektes Impressum, Datenschutzerklärung, Cookie-Hinweis und sichere Verarbeitung von Kontaktformulardaten. Ohne DSGVO-Konformität riskierst du Abmahnungen und Bußgelder. Bei uns ist alles voreingestellt und rechtlich einwandfrei.",
  },
  {
    q: "Für welche Branchen bauen Sie Webseiten?",
    a: "Unser Schwerpunkt liegt auf der Gastronomie (Restaurants, Cafés, Bäckereien, Lieferdienste), aber wir bauen Webseiten für jede Branche: Handwerker, Schulen, Bildungseinrichtungen, Hotels, Dienstleister, Einzelhandel und Franchise-Unternehmen. Jede Webseite wird individuell auf die Branche und den Betrieb zugeschnitten.",
  },
  {
    q: "Was ist im monatlichen Abo enthalten?",
    a: "Das monatliche Abo (49 €/Monat netto) umfasst: professionelles Webdesign, eigene Domain (z.B. deinbetrieb.de), zuverlässiges Hosting, 2 E-Mail-Postfächer, DSGVO-konforme Einrichtung, technischen Support und laufende Updates. Keine versteckten Kosten, monatlich kündbar.",
  },
];

const SCHEMA_PRODUCT = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professionelle Webseite für Gastronomie und weitere Branchen",
  "description": "Professionelle Webseite ab 49 €/Monat oder Einmalkauf ab 990 €. Für Gastronomen, Handwerker, Schulen und alle weiteren Branchen. Inkl. Domain, Hosting, DSGVO-konform.",
  "brand": { "@type": "Brand", "name": "Gastro Master" },
  "offers": [
    {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingIncrement": 1,
        "unitCode": "MON",
      },
      "seller": { "@type": "Organization", "name": "Gastro Master Deutschland" },
    },
    {
      "@type": "Offer",
      "price": "990",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "description": "Simple Website (Onepager) Einmalkauf ab 990 €",
      "seller": { "@type": "Organization", "name": "Gastro Master Deutschland" },
    },
  ],
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  { initials: "HL", quote: "In der Zukunft wird immer mehr online bestellt und wir wollen auch dabei sein.", name: "Ha Lim Lee", restaurant: "Kojo Sushi", logo: logoKojo },
  { initials: "MG", quote: "Also der Support ist einfach 1a und den würdest du nirgend wo anders so bekommen!", name: "Marco Greco", restaurant: "Pizzeria Il Sorriso", logo: logoIlSorriso },
  { initials: "SH", quote: "Man hat hier einen schnellen und guten WhatsApp Support und die Möglichkeit seinen Betrieb zu strukturieren.", name: "Sven Heinrich", restaurant: "61 Burger & More", logo: logoBurger },
  { initials: "GM", quote: "Wir haben durch die App viel mehr Kunden und Reichweite gewonnen.", name: "Georgios Madatsidis", restaurant: "Artemis Grill", logo: logoArtemis },
];

const teamMembers = [
  { img: teamReneImg,      name: "René Ebert",        role: "Gründer & Geschäftsführer" },
  { img: teamSalvatoreImg, name: "Salvatore Anzaldi",  role: "Head of Sales" },
  { img: teamAndrejImg,    name: "Andrej Krutsch",     role: "Head of Operations" },
];

const PORTFOLIO = [
  { img: heroGastroMaster, label: "Gastronomie",  name: "Gastro Master" },
  { img: heroBaeckerei,    label: "Bäckerei",      name: "Bäckerei Zimmer" },
  { img: heroEtManus,      label: "Restaurant",    name: "Et Manus" },
  { img: heroDT,           label: "Dienstleister", name: "D&T" },
  { img: heroDandT,        label: "Gastronomie",   name: "D&T Gastro" },
];

const BRANCHEN = [
  { icon: UtensilsCrossed, label: "Restaurant" },
  { icon: Coffee,          label: "Café & Bäckerei" },
  { icon: Wrench,          label: "Handwerker" },
  { icon: GraduationCap,   label: "Schule & Bildung" },
  { icon: ConciergeBell,   label: "Dienstleister" },
  { icon: Building2,       label: "Franchise" },
  { icon: Hotel,           label: "Hotel & Pension" },
  { icon: Store,           label: "Einzelhandel" },
];

// ─── Inline Components ────────────────────────────────────────────────────────
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="text-white font-semibold text-base md:text-lg leading-snug group-hover:text-cyan-brand transition-colors duration-200">{q}</span>
        <span className="flex-shrink-0 mt-0.5 text-white/40 group-hover:text-cyan-brand transition-colors duration-200">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TeamCTA = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % teamMembers.length), 4000);
    return () => clearInterval(t);
  }, []);
  const member = teamMembers[current];
  return (
    <section className="bg-[#F0F4F8] dark:bg-[#060e1a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-[#0d1f35] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40 grid lg:grid-cols-2"
        >
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#0A264A]/[0.07] dark:bg-white/10 text-[#0A264A] dark:text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-8 w-fit">
              Jetzt durchstarten
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
              Buche jetzt dein<br />kostenloses Beratungsgespräch.
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">Das erwartet dich:</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              In einem kostenlosen Erstgespräch besprechen wir deine Wünsche, Ziele und den Umfang deiner neuen Webseite – und erstellen ein individuelles Angebot, das genau zu deinem Betrieb und Budget passt.
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              Danach geht es schnell: In der Regel ist deine Webseite innerhalb weniger Tage online.
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { label: "Deutsch",       flag: "🇩🇪", color: "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300" },
                { label: "Englisch",      flag: "🇬🇧", color: "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300" },
                { label: "Italienisch",   flag: "🇮🇹", color: "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300" },
                { label: "Persisch",      flag: "🇮🇷", color: "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300" },
                { label: "Russisch",      flag: "🇷🇺", color: "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300" },
                { label: "Singhalesisch", flag: "🇱🇰", color: "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300" },
              ].map((lang, i) => (
                <motion.div
                  key={lang.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#0A264A]/10 dark:border-white/10 bg-[#0A264A]/[0.03] dark:bg-white/[0.04] text-[#0A264A] dark:text-white font-semibold text-xs cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${lang.color}`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  {lang.label}
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => { window.location.href = "/kontakt"; }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group w-fit"
            >
              Kostenloses Beratungsgespräch
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
          <div className="relative min-h-[380px] lg:min-h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={member.img}
                alt={member.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-8 py-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white font-bold text-lg leading-tight">{member.name}</p>
                  <p className="text-white/70 text-sm">{member.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute top-5 right-5 flex gap-2">
              {teamMembers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const WebseitePage = () => {
  useEffect(() => {
    document.title = "Professionelle Webseite für Gastronomie – ab 49 €/Monat | Gastro Master";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Professionelle Webseite für Restaurants, Cafés, Handwerker und mehr – ab 49 €/Monat oder Einmalkauf ab 990 €. Eigene Domain, DSGVO-konform, inkl. Hosting & Support. In wenigen Tagen online.");
    return () => { document.title = "Gastro Master"; };
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_PRODUCT) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* ── S1: HERO ───────────────────────────────────────────────────────── */}
        <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.12), transparent 70%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5" />
                Professionelle Webseite · ab 49 €/Monat
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                Deine professionelle Webseite –{" "}
                <span className="text-gradient-brand">online</span>
                {" "}in wenigen Tagen
              </h1>

              {/* Definition Block (GEO-optimiert) */}
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                Eine professionelle Webseite ist die Grundlage jeder digitalen Präsenz. Sie eröffnet dir die Möglichkeit, weit über deinen Standort hinaus neue Kunden zu erreichen – über Google, Social Media und Weiterempfehlungen. Für Gastronomie, Handwerk, Schulen und alle weiteren Branchen.
              </p>
              <p className="text-white/45 text-base max-w-2xl mx-auto mb-10">
                DSGVO-konform. Eigene Domain. Inkl. Hosting & Support.
              </p>

              {/* Trust Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {[
                  { icon: Globe,        label: "Eigene Domain" },
                  { icon: CheckCircle2, label: "DSGVO-konform" },
                  { icon: Handshake,    label: "Für alle Branchen" },
                  { icon: Star,         label: "Kein Technik-Know-how nötig" },
                ].map((pill) => (
                  <div key={pill.label} className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-white/80 text-sm font-medium">
                    <pill.icon className="w-4 h-4 text-cyan-brand" />
                    {pill.label}
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => { window.location.href = "/kontakt"; }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2 shadow-lg"
              >
                Kostenloses Beratungsgespräch
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ── S2: TRUST BAR ─────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {[
              {
                value: "75 %",
                label: "der Nutzer beurteilen die Glaubwürdigkeit eines Unternehmens anhand seiner Webseite",
                source: "Stanford Web Credibility Research",
                url: "https://credibility.stanford.edu/",
              },
              {
                value: "97 %",
                label: "der Verbraucher suchen online nach lokalen Unternehmen und Dienstleistungen",
                source: "Google Consumer Insights",
                url: "https://www.thinkwithgoogle.com/",
              },
              {
                value: "700+",
                label: "Unternehmen setzen bereits auf Gastro Master für ihre digitale Präsenz",
                source: null,
                url: null,
              },
            ].map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white mb-2 leading-none">{s.value}</p>
                <p className="text-[#0A264A]/55 dark:text-white/45 text-sm leading-snug mb-2">{s.label}</p>
                {s.source && (
                  <a href={s.url!} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-brand/70 hover:text-cyan-brand underline transition-colors">
                    Quelle: {s.source}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── S3: WARUM ONLINE PRÄSENZ ──────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Online-Sichtbarkeit</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
                Wer nicht online ist, verliert<br className="hidden md:block" /> jeden Tag Neukunden.
              </h2>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                Eine Webseite öffnet dir den Zugang zu Kunden, die weit über deinen Standort hinaus nach deinen Leistungen suchen. Neukunden finden dich über Google – nicht nur durch Mundpropaganda. Das gilt für die Gastronomie genauso wie für Handwerker, Schulen oder Dienstleister.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  icon: TrendingUp,
                  value: "88 %",
                  desc: "der Nutzer kehren nach einem schlechten Website-Erlebnis nicht mehr zurück.",
                  source: "HubSpot Research",
                  url: "https://www.hubspot.com/",
                  color: "text-red-500",
                },
                {
                  icon: MapPin,
                  value: "46 %",
                  desc: "aller Google-Suchen haben einen lokalen Bezug – deine Kunden suchen dich.",
                  source: "Google Search Statistics",
                  url: "https://www.thinkwithgoogle.com/",
                  color: "text-cyan-brand",
                },
                {
                  icon: Search,
                  value: "2,8×",
                  desc: "mehr Umsatzwachstum erzielen Unternehmen mit starker Online-Präsenz.",
                  source: "Deloitte Digital",
                  url: "https://www2.deloitte.com/",
                  color: "text-emerald-500",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0A264A]/[0.03] dark:bg-white/[0.04] border border-[#0A264A]/[0.07] dark:border-white/[0.07] rounded-2xl p-8"
                >
                  <stat.icon className={`w-7 h-7 mb-4 ${stat.color}`} />
                  <p className={`text-4xl font-black mb-3 ${stat.color}`}>{stat.value}</p>
                  <p className="text-[#0A264A]/65 dark:text-white/55 text-sm leading-relaxed mb-3">{stat.desc}</p>
                  <a href={stat.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0A264A]/35 dark:text-white/30 hover:text-cyan-brand underline transition-colors">
                    Quelle: {stat.source}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.button
                onClick={() => { window.location.href = "/kontakt"; }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base shadow-lg"
              >
                Jetzt Sichtbarkeit aufbauen
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* ── S4: FEATURES / BENTO ──────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Funktionsumfang</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                Alles, was deine Online-Präsenz braucht.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tile 1 – Groß */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="col-span-2 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.09] transition-colors"
              >
                <Images className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Bildergalerie</h3>
                <p className="text-white/50 text-sm leading-relaxed">Professionelle Foto- und Videogalerie, die Besucher überzeugt. Zeige dein Ambiente, deine Gerichte oder deine Leistungen in bestem Licht.</p>
              </motion.div>
              {/* Tile 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-1 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.09] transition-colors"
              >
                <Instagram className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-base mb-2">Instagram-Feed</h3>
                <p className="text-white/50 text-sm leading-relaxed">Dein aktueller Instagram-Feed direkt auf der Webseite synchronisiert – immer aktuell.</p>
              </motion.div>
              {/* Tile 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="col-span-1 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.09] transition-colors"
              >
                <Mail className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-base mb-2">Kontaktformular</h3>
                <p className="text-white/50 text-sm leading-relaxed">Kundenanfragen landen direkt in deinem Postfach – DSGVO-konform und einfach.</p>
              </motion.div>
              {/* Tile 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-1 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.09] transition-colors"
              >
                <Users className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-base mb-2">Über uns</h3>
                <p className="text-white/50 text-sm leading-relaxed">Deine Geschichte, dein Team, deine Werte. Schaffe Vertrauen bei jedem Besucher.</p>
              </motion.div>
              {/* Tile 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="col-span-1 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.09] transition-colors"
              >
                <Briefcase className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-base mb-2">Karriere-Seite</h3>
                <p className="text-white/50 text-sm leading-relaxed">Offene Stellen und Bewerbungsformular – finde die richtigen Mitarbeiter.</p>
              </motion.div>
              {/* Tile 6 – Groß */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="col-span-2 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.09] transition-colors"
              >
                <Building2 className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Franchise-Seite</h3>
                <p className="text-white/50 text-sm leading-relaxed">Überzeuge potenzielle Franchise-Partner mit einer professionellen eigenen Unterseite – inklusive Bewerbungsformular und allen wichtigen Informationen zu deinem Franchise-Konzept.</p>
              </motion.div>
              {/* Tile 7 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="col-span-2 lg:col-span-4 bg-cyan-brand/10 border border-cyan-brand/20 rounded-2xl p-7 hover:bg-cyan-brand/[0.13] transition-colors"
              >
                <Link2 className="w-7 h-7 text-cyan-brand mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Mit Webshop & App verknüpfbar</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">Deine Webseite und dein Gastro Master Bestell-System aus einem Guss. Kunden landen auf deiner Webseite und können direkt eine Bestellung aufgeben – nahtlos, ohne Plattformwechsel.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── S5: PORTFOLIO SHOWCASE ────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Portfolio</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
                Websites, die wir gebaut haben.
              </h2>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-lg max-w-xl mx-auto">
                Für Gastronomie, Bäckereien und weitere Branchen – jede Webseite individuell auf den Betrieb zugeschnitten.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PORTFOLIO.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-default"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-cyan-brand/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                      {item.label}
                    </span>
                    <p className="text-white font-bold text-base">{item.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.button
                onClick={() => { window.location.href = "/kontakt"; }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base shadow-lg"
              >
                Deine Webseite anfragen
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* ── S6: FÜR ALLE BRANCHEN ─────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Zielgruppe</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                Nicht nur für die Gastronomie.
              </h2>
              <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
                Unser Schwerpunkt liegt auf der Gastronomie, aber wir bauen Webseiten für jede Branche. Jede Website wird individuell auf den Betrieb und seine Zielgruppe zugeschnitten.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BRANCHEN.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="flex flex-col items-center justify-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6 text-center cursor-default hover:bg-white/[0.1] transition-colors"
                >
                  <b.icon className="w-8 h-8 text-cyan-brand" />
                  <span className="text-white font-semibold text-sm">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S7: WIE ES FUNKTIONIERT ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">So läuft's ab</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
                In 3 Schritten zu deiner professionellen Webseite.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "Kostenloses Beratungsgespräch", desc: "Wir besprechen deine Wünsche, Ziele, Zielgruppe und den gewünschten Umfang – und erstellen ein individuelles Angebot." },
                { num: "02", title: "Design & Umsetzung", desc: "Unser Team baut deine Webseite professionell, DSGVO-konform und optimiert für alle Geräte. Du wirst während des Prozesses eingebunden." },
                { num: "03", title: "Go-Live", desc: "Deine neue Webseite ist in wenigen Tagen online – mit eigener Domain, Hosting und vollem Support von unserem Team." },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="text-[120px] font-black leading-none text-[#0A264A]/[0.05] dark:text-white/[0.05] select-none mb-4 -mt-6">{step.num}</div>
                  <h3 className="text-[#0A264A] dark:text-white font-bold text-xl mb-3 -mt-6">{step.title}</h3>
                  <p className="text-[#0A264A]/55 dark:text-white/50 text-base leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S8: PREISE ────────────────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Transparente Preise</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                Du entscheidest, wie du starten willst.
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Abo oder Einmalkauf – beide Wege führen zu deiner professionellen Online-Präsenz.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Karte 1 – Monatliches Abo (Beliebt) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="relative bg-white rounded-3xl p-8 flex flex-col shadow-2xl shadow-black/20 border-2 border-[#ED8400]/40"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#ED8400] text-white text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                    Beliebt
                  </span>
                </div>
                <p className="text-[#0A264A]/50 text-xs font-bold uppercase tracking-widest mb-3">Monatliches Abo</p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-[#0A264A]">49 €</span>
                  <span className="text-[#0A264A]/50 text-base font-medium ml-2">/Monat</span>
                </div>
                <p className="text-[#0A264A]/40 text-xs mb-7">zzgl. MwSt. · monatlich kündbar</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Professionelles Webdesign",
                    "Eigene Domain inklusive",
                    "Zuverlässiges Hosting",
                    "2 E-Mail-Postfächer",
                    "DSGVO-konform eingerichtet",
                    "Technischer Support",
                    "Laufende Updates",
                    "Monatlich kündbar",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[#0A264A]/75 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => { window.location.href = "/kontakt"; }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 24px 6px rgba(237,132,0,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#ED8400] text-white font-bold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  Jetzt starten
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Karte 2 – Simple Website Einmalkauf */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.07] border border-white/[0.12] rounded-3xl p-8 flex flex-col"
              >
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Simple Website · Einmalkauf</p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">ab 990 €</span>
                </div>
                <p className="text-white/35 text-xs mb-2">einmalig · zzgl. MwSt.</p>
                <p className="text-[#ED8400]/80 text-xs font-semibold mb-7">Auch in 3 bequemen Raten möglich</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Ideal für Betriebe, die schnell und günstig online sichtbar sein wollen. Ein professioneller Onepager mit allem, was du brauchst:
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Startseite mit allen wichtigen Infos",
                    "Kontaktformular",
                    "Impressum & Datenschutz",
                    "Mobiloptimiertes Design",
                    "DSGVO-konform",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => { window.location.href = "/kontakt"; }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
                >
                  Angebot anfragen
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Karte 3 – Individuelle Website */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="bg-white/[0.07] border border-white/[0.12] rounded-3xl p-8 flex flex-col"
              >
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Individuelle Website · Mehrseiter</p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">Auf Anfrage</span>
                </div>
                <p className="text-white/35 text-xs mb-7">Preis je nach Umfang · Einmalkauf oder Abo</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Für umfangreichere Projekte mit mehreren Unterseiten und individuellen Funktionen. Der Preis wird gemeinsam im Beratungsgespräch ermittelt.
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Mehrere Unterseiten",
                    "Bildergalerie",
                    "Instagram-Feed-Integration",
                    "Karriere- & Franchise-Seite",
                    "Video-Einbindung",
                    "Individuelle Features auf Anfrage",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => { window.location.href = "/kontakt"; }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
                >
                  Angebot anfragen
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── S9: TESTIMONIALS ──────────────────────────────────────────────── */}
        <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Kundenstimmen</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                700+ Unternehmen,<br className="hidden md:block" /> die bereits auf Gastro Master vertrauen.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.05] border border-white/[0.07] rounded-2xl p-7"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#ED8400] text-[#ED8400]" />)}
                  </div>
                  <p className="text-white/80 text-base leading-relaxed mb-5">„{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-brand/20 flex items-center justify-center text-cyan-brand font-bold text-sm flex-shrink-0">{t.initials}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-white/45 text-xs">{t.restaurant}</p>
                    </div>
                    <img src={t.logo} alt={t.restaurant} className="h-7 object-contain ml-auto opacity-60" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "700+",       label: "Unternehmen vertrauen Gastro Master" },
                { value: "Tage",       label: "Nicht Wochen – so schnell bist du online" },
                { value: "Alle",       label: "Branchen & Betriebsgrößen" },
                { value: "Inkl.",      label: "Support, Hosting & Domain im Abo" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 text-center"
                >
                  <p className="text-2xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-white/40 text-xs leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S10: FAQ ──────────────────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-32"
              >
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">FAQ</span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  Häufige Fragen zur Gastro Master Webseite
                </h2>
                <p className="text-white/45 text-base leading-relaxed">
                  Du hast weitere Fragen? Wir beraten dich gern persönlich – kostenlos und unverbindlich.
                </p>
                <motion.button
                  onClick={() => { window.location.href = "/kontakt"; }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/15 transition-colors"
                >
                  Beratung anfragen
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {FAQ_ITEMS.map(item => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── S11: TEAM CTA ─────────────────────────────────────────────────── */}
        <TeamCTA />

      </div>
      <Footer />
    </>
  );
};

export default WebseitePage;

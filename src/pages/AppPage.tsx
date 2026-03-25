import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Smartphone, Bell, Palette, Star, RefreshCw, Users, Download,
  ArrowRight, Plus, Minus, CheckCircle2, ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ProductBentoGrid from "@/components/product/ProductBentoGrid";
import ProductSocialProof from "@/components/product/ProductSocialProof";

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Wie lange dauert die Entwicklung meiner eigenen Restaurant App?",
    a: "Nach unserem ersten Beratungsgespräch und der Übergabe deines Brandings ist deine App in der Regel innerhalb von 2–3 Wochen live – sowohl im Apple App Store als auch im Google Play Store. Wir begleiten dich durch den gesamten Prozess.",
  },
  {
    q: "Was kostet eine eigene App für mein Restaurant?",
    a: "Die eigene Restaurant App ist im Standard-Paket ab 150 €/Monat enthalten. Es gibt keine einmaligen Entwicklungskosten, keine Agentur-Rechnungen. Du zahlst eine monatliche Pauschale – alles inklusive.",
  },
  {
    q: "Wird die App wirklich unter meinem Namen im App Store veröffentlicht?",
    a: "Ja. Deine App erscheint mit deinem Restaurant-Namen, deinem Logo und deiner Beschreibung im Apple App Store und Google Play Store. Deine Gäste sehen nur deine Marke – kein \"Powered by Gastro Master\".",
  },
  {
    q: "Kann ich Push-Benachrichtigungen selbst versenden?",
    a: "Absolut. Über dein Dashboard kannst du jederzeit Push-Benachrichtigungen an alle App-Nutzer senden – für Tagesspecials, neue Gerichte, Rabattaktionen oder saisonale Highlights.",
  },
  {
    q: "Was passiert mit meinen Kundendaten?",
    a: "Alle Bestelldaten, Kundendaten und Nutzerdaten gehören dir. Wir haben keinen Zugriff auf deine Kundenbeziehungen. Du kannst deine Daten jederzeit exportieren.",
  },
  {
    q: "Kann ich die App auch für mehrere Standorte nutzen?",
    a: "Ja. Für Franchises und Ketten bieten wir eine Multi-Location-Lösung an, bei der du alle Standorte zentral steuerst – mit lokaler Flexibilität für Speisekarte und Preise.",
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="text-white font-semibold text-base md:text-lg leading-snug group-hover:text-cyan-brand transition-colors duration-200">
          {q}
        </span>
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
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "100+",   label: "Restaurants vertrauen uns" },
  { value: "0 %",    label: "Provision auf Bestellungen" },
  { value: "iOS & Android", label: "Native in beiden Stores" },
  { value: "2–3 Wo.", label: "bis deine App live ist" },
];

// ─── Process steps ────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Kostenloses Beratungsgespräch",
    text: "Wir lernen dein Restaurant kennen – Konzept, Zielgruppe, Ziele. Kein Skript, kein Verkaufsdruck. Nur ein ehrliches Gespräch darüber, ob und wie die App zu dir passt.",
  },
  {
    num: "02",
    title: "Dein Branding, deine App",
    text: "Du sendest uns dein Logo, deine Farben und Wunsch-Texte. Wir richten die App auf deinen Namen ein und bereiten die Veröffentlichung im Apple App Store und Google Play Store vor.",
  },
  {
    num: "03",
    title: "Live – in 2 bis 3 Wochen",
    text: "Deine App ist veröffentlicht. Deine Gäste können sie finden, herunterladen und direkt bestellen. Du verwaltest Menü, Preise und Push-Nachrichten selbst – in Echtzeit.",
  },
];

// ─── Bento tiles ─────────────────────────────────────────────────────────────

const bentoTiles = [
  {
    id: "native",
    size: "lg" as const,
    icon: Smartphone,
    title: "Native iOS & Android App",
    description:
      "Professionell entwickelt und in deinem Namen veröffentlicht. Deine Gäste laden deine App herunter – nicht eine generische Plattform-App.",
    accent: true,
  },
  {
    id: "push",
    size: "sm" as const,
    icon: Bell,
    title: "Push-Benachrichtigungen",
    description:
      "Reaktiviere Kunden direkt aufs Smartphone – mit Tagesspecials, Rabatten und neuen Gerichten.",
  },
  {
    id: "branding",
    size: "sm" as const,
    icon: Palette,
    title: "100 % dein Branding",
    description:
      "Dein Logo, deine Farben, dein Name im App Store. Keine Fremd-Logos, keine Ablenkung.",
  },
  {
    id: "loyalty",
    size: "lg" as const,
    icon: Star,
    title: "Eingebautes Treueprogramm",
    description:
      "Punkte sammeln, Prämien einlösen – direkt in der App. Stammkunden kommen häufiger und bestellen mehr.",
  },
  {
    id: "updates",
    size: "sm" as const,
    icon: RefreshCw,
    title: "Automatische Updates",
    description:
      "Immer die neueste Version – ohne Aufpreis, ohne Techniker.",
  },
  {
    id: "customers",
    size: "sm" as const,
    icon: Users,
    title: "Eigene Kundendaten",
    description:
      "Bestellhistorien, Adressen, Präferenzen – alles gehört dir.",
  },
  {
    id: "stores",
    size: "sm" as const,
    icon: Download,
    title: "App Store & Google Play",
    description:
      "Beide Stores. Maximale Reichweite. Ein einheitliches Markenerlebnis.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const AppPage = () => (
  <div className="min-h-screen" style={{ backgroundColor: "#0A264A" }}>
    <Navbar />

    {/* ── HERO ──────────────────────────────────────────────── */}
    <section className="mesh-gradient min-h-[90vh] flex items-center px-5 md:px-8 lg:px-16 pt-36 pb-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#007DCF]/8 blur-[160px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            App System
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-8"
          >
            Deine eigene{" "}
            <span className="text-gradient-brand">Restaurant App</span>
            {" "}–{" "}
            0&nbsp;% Provision.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/55 max-w-xl leading-relaxed mb-12"
          >
            Lass deine Gäste direkt bei dir bestellen – mit einer nativen iOS- und Android-App unter deinem Namen, deinem Logo und deinen Preisen. Keine Provision. Keine Plattform dazwischen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => { window.location.href = "/#kontakt"; }}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Jetzt kostenlos beraten lassen
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/produkte/webshop"
              className="border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 transition-all"
            >
              Zum Online Shop
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── STATS ─────────────────────────────────────────────── */}
    <section className="bg-[#081628] border-y border-white/[0.06] px-5 md:px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-3xl md:text-4xl font-black text-white mb-1.5">{s.value}</p>
            <p className="text-white/40 text-sm leading-snug">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── BENTO FEATURES ────────────────────────────────────── */}
    <ProductBentoGrid
      headline="Was deine App alles kann."
      sub="Eine vollständige Bestell-App – professionell entwickelt, vollständig in deiner Hand."
      tiles={bentoTiles}
    />

    {/* ── WHY OWN APP ───────────────────────────────────────── */}
    <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
              Warum eine eigene App?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-8">
              Deine Gäste bestellen. Dein Gewinn bleibt{" "}
              <span className="text-gradient-brand">bei dir.</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-6">
              Jede Bestellung über Lieferando, Wolt oder Uber Eats kostet dich 15–30 % Provision. Bei 5.000 € Monatsumsatz über eine Plattform zahlst du bis zu <strong className="text-white">1.500 € im Monat</strong> – nur für die Vermittlung.
            </p>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              Mit deiner eigenen Restaurant App bestellst du deine Gäste direkt – ohne Zwischenhändler, ohne Provision. Die App trägt deinen Namen, dein Branding und erscheint im App Store. Deine Kunden laden <em>deine</em> App herunter – nicht die App einer Plattform.
            </p>
            <ul className="space-y-3">
              {[
                "0 % Provision auf jede Bestellung",
                "Vollständig unter deinem Markennamen",
                "Push-Benachrichtigungen direkt an deine Gäste",
                "Kundendaten gehören dir – nicht der Plattform",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-white/70 text-base">
                  <CheckCircle2 className="w-5 h-5 text-cyan-brand mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-10 md:p-12">
              <p className="text-white/35 text-xs uppercase tracking-widest mb-8 font-semibold">
                Kostenvergleich pro Monat
              </p>
              <div className="space-y-6">
                {[
                  { label: "Lieferando (25 % Provision)", cost: "≈ 1.250 €", bad: true },
                  { label: "Wolt (22 % Provision)",       cost: "≈ 1.100 €", bad: true },
                  { label: "Gastro Master App",           cost: "ab 150 €",  bad: false },
                ].map(row => (
                  <div key={row.label} className={`flex items-center justify-between py-4 border-b border-white/[0.06] last:border-0`}>
                    <span className={`text-sm font-medium ${row.bad ? "text-white/45" : "text-white"}`}>
                      {row.label}
                    </span>
                    <span className={`text-base font-black ${row.bad ? "text-white/30" : "text-[#FBA200]"}`}>
                      {row.cost}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-white/25 text-xs mt-8 leading-relaxed">
                Beispielrechnung: 5.000 € Monatsumsatz über Bestellplattformen
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── HOW IT WORKS ──────────────────────────────────────── */}
    <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            So funktioniert's
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            In 3 Schritten zur eigenen App.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative"
            >
              <span className="text-[72px] md:text-[88px] font-black text-white/[0.06] leading-none block mb-6 select-none">
                {step.num}
              </span>
              <h3 className="text-xl font-bold text-white mb-4 leading-snug -mt-8 relative z-10">
                {step.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-base relative z-10">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── SOCIAL PROOF ──────────────────────────────────────── */}
    <ProductSocialProof label="Über 100 Gastronomen nutzen bereits ihr eigenes System" />

    {/* ── FAQ ───────────────────────────────────────────────── */}
    <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Häufige{" "}
              <br className="hidden md:block" />
              Fragen.
            </h2>
            <p className="text-white/40 mt-6 text-base leading-relaxed">
              Weitere Fragen? Ruf uns an oder schreib uns – wir antworten innerhalb von 24 Stunden.
            </p>
            <button
              onClick={() => { window.location.href = "/#kontakt"; }}
              className="mt-8 text-cyan-brand text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Direkt anfragen <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right FAQ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {faqs.map(faq => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── CTA ───────────────────────────────────────────────── */}
    <section className="bg-gradient-amber px-5 md:px-8 lg:px-16 py-24 md:py-28">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A264A] leading-tight mb-6">
            Deine App.<br />Dein Erfolg.
          </h2>
          <p className="text-[#0A264A]/60 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Starte mit deiner eigenen Restaurant App und baue dir eine loyale Stammkundschaft auf – ohne Provision, ohne Mittelsmänner.
          </p>
          <button
            onClick={() => { window.location.href = "/#kontakt"; }}
            className="bg-[#0A264A] text-white font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:bg-[#0A264A]/90 transition-colors shadow-2xl shadow-[#0A264A]/20"
          >
            Kostenloses Beratungsgespräch
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AppPage;

import React, { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ShoppingCart,
  Smartphone,
  Globe,
  Monitor,
  Percent,
  Truck,
  QrCode,
  ShoppingBag,
  Link2,
  Zap,
  MessageCircle,
  FileCheck,
  Gift,
  Infinity,
  TrendingUp,
  Plus,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SlimPricingSection from "@/components/landing/SlimPricingSection";
import imgWebshop     from "@/assets/take-startbild.jpeg";
import imgApp         from "@/assets/Mock Up - Branding Hero.png";
import imgKasse       from "@/assets/hero-pos-system.png";
import imgWebseite    from "@/assets/Hero - Gastro Master.PNG";
import imgFahrerApp   from "@/assets/addon-frankfurt-gps.png";
import imgQrTisch     from "@/assets/addon-qr-tischsystem.png";
import imgSelfOrder   from "@/assets/selfordering-terminals.png";
import imgKasseHW     from "@/assets/kassenhardware.png";
import imgQrFlyer     from "@/assets/Flyer - Mock Up.png";
import payPaypal      from "@/assets/partner-paypal.png";
import payStripe      from "@/assets/partner-stripe.png";
import payApple       from "@/assets/Logo - Apple Pay.png";
import payGoogle      from "@/assets/pay-google.png";
import payVisa        from "@/assets/pay-visa.png";
import payMastercard  from "@/assets/pay-mastercard.png";
import payKlarna      from "@/assets/pay-klarna.png";

// ─── SEO / Schema ───────────────────────────────────────────────────────────

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Preise", item: "https://gastro-master.de/preise" },
  ],
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet das Kassensystem von Gastro Master?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Gastro Master Kassensystem ist ab 69 € pro Monat (netto) erhältlich. Die Cloud-Kassensoftware ist monatlich kündbar, läuft auf Windows-Computern und beinhaltet TSE-Zertifizierung, GoBD-Konformität sowie persönlichen Support.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hoch sind die Einrichtungskosten bei Gastro Master?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Einrichtungskosten besprechen wir individuell im persönlichen Beratungsgespräch — je nach Umfang deines Betriebs. Es gibt keine Mindestlaufzeit. Alle Pakete sind monatlich kündbar.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Webseite und Bestellsystem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Webseite (49 €/Monat) ist eine professionelle Restaurant-Website ohne Bestellfunktion – ideal als digitale Visitenkarte. Das Bestellsystem (79 €/Monat) enthält zusätzlich einen Online-Bestellshop mit 0 % Provision, über den deine Kunden direkt bestellen können.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich mit einem Paket mehrere Standorte betreiben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Pakete unterstützen mehrere Standorte und Filialen. Beim Kassensystem sind bis zu 4 Kassen mit einer Lizenz inklusive. Für größere Franchise-Systeme gibt es individuelle Lösungen.",
      },
    },
    {
      "@type": "Question",
      name: "Fallen Transaktionsgebühren an?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gastro Master erhebt 0 % Provision. Die Zahlungsanbieter (Stripe, PayPal etc.) erheben eigene Transaktionsgebühren. Mit der optionalen Transaktions-Umlage kannst du diese transparent an deine Kunden weitergeben.",
      },
    },
    {
      "@type": "Question",
      name: "Welches Paket ist das Richtige für meinen Betrieb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für eine reine Online-Präsenz eignet sich die Webseite (49 €/Monat). Willst du online Bestellungen entgegennehmen, ist das Bestellsystem (79 €/Monat) die Wahl. Für die eigene Bestell-App empfehlen wir App + Bestellsystem für 149 €/Monat. Das Kassensystem (ab 69 €/Monat) ergänzt alle Pakete für den stationären Betrieb.",
      },
    },
  ],
};

interface AddonItem {
  badge: string;
  icon: React.ElementType;
  img: string;
  imgWrapperClass: string;
  imgClass: string;
  title: string;
  price: string;
  priceDetail: string;
  features: string[];
  dark?: boolean;
}

const KASSEN_ADDONS: AddonItem[] = [
  {
    badge: "Add-on",
    icon: Truck,
    img: imgFahrerApp,
    imgWrapperClass: "aspect-[4/3] mb-5 rounded-xl overflow-hidden bg-white flex items-center justify-center",
    imgClass: "w-full h-full object-contain scale-110",
    title: "Fahrer-App mit GPS",
    price: "+ 10 €",
    priceDetail: "/ Monat pro Fahrer (netto)",
    features: [
      "Live-GPS-Tracking für Fahrer",
      "Automatische Routen-Optimierung",
      "Direkte Kommunikation mit Küche",
      "Lieferzeit-Schätzung für Kunden",
    ],
    dark: false,
  },
  {
    badge: "Add-on",
    icon: QrCode,
    img: imgQrTisch,
    imgWrapperClass: "aspect-[4/3] mb-5 rounded-xl overflow-hidden",
    imgClass: "w-full h-full object-cover",
    title: "QR-Tischsystem",
    price: "+ 50 €",
    priceDetail: "/ Monat für 5 Tische, +5 € je weiteren",
    features: [
      "Bestellen per QR-Code am Tisch",
      "Kein App-Download nötig",
      "Direkt in Kassensystem integriert",
      "Bar-System inklusive",
    ],
    dark: false,
  },
  {
    badge: "Add-on",
    icon: ShoppingBag,
    img: imgSelfOrder,
    imgWrapperClass: "aspect-[4/3] mb-5 rounded-xl overflow-hidden bg-[#061830]/60 flex items-center justify-center",
    imgClass: "w-full h-full object-contain p-4",
    title: "Self-Ordering Terminal",
    price: "Auf Anfrage",
    priceDetail: "Hardware individuell konfigurierbar",
    features: [
      "Kiosk-System für Selbstbestellung",
      "Reduziert Wartezeiten",
      "Voll integriert in POS",
      "Individuell gebrandetes Display",
    ],
    dark: true,
  },
];

const INTEGRATION_STEPS = [
  {
    icon: Globe,
    title: "Webseite",
    text: "Deine digitale Visitenkarte – Google-optimiert, professionell.",
    href: "/produkte/webseite",
    color: "border-cyan-brand/30 bg-[#0A264A]/5 dark:bg-[#0A264A]/40",
  },
  {
    icon: ShoppingCart,
    title: "Bestellsystem",
    text: "Online-Shop mit 0 % Provision auf deiner eigenen Domain.",
    href: "/produkte/webshop",
    color: "border-[#ED8400]/30 bg-[#ED8400]/5 dark:bg-[#ED8400]/10",
  },
  {
    icon: Smartphone,
    title: "App",
    text: "Deine eigene App unter deinem Namen im App Store.",
    href: "/produkte/app",
    color: "border-cyan-brand/30 bg-[#0A264A]/5 dark:bg-[#0A264A]/40",
  },
  {
    icon: Monitor,
    title: "Kassensystem",
    text: "TSE-konforme Cloud-Kasse für Tisch, Abholung & Lieferung.",
    href: "/produkte/kassensystem",
    color: "border-[#ED8400]/30 bg-[#ED8400]/5 dark:bg-[#ED8400]/10",
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Was kostet das Kassensystem von Gastro Master?",
    a: "Das [Gastro Master Kassensystem](/produkte/kassensystem) ist ab 69 € pro Monat (netto) erhältlich. Die Cloud-Kassensoftware ist monatlich kündbar, läuft auf Windows-Computern und beinhaltet TSE-Zertifizierung (§146a AO), GoBD-Konformität sowie persönlichen Support via WhatsApp.",
  },
  {
    q: "Wie hoch sind die Einrichtungskosten?",
    a: "Die Einrichtungskosten besprechen wir individuell in einem persönlichen Beratungsgespräch — je nach Umfang deines Betriebs. Es gibt keine Mindestlaufzeit. Alle Pakete sind monatlich kündbar, ohne Provision, ohne Überraschungen.",
  },
  {
    q: "Was ist der Unterschied zwischen Webseite und Bestellsystem?",
    a: "Die Webseite (49 €/Monat) ist eine professionelle Restaurant-Website ohne Bestellfunktion – dein digitales Aushängeschild für Google und Neukunden. Das Bestellsystem (79 €/Monat) enthält zusätzlich den [Online-Bestellshop mit 0 % Provision](/produkte/webshop), über den deine Kunden direkt bestellen können.",
  },
  {
    q: "Kann ich mit einem Paket mehrere Standorte betreiben?",
    a: "Ja. Die Pakete unterstützen mehrere Standorte und Filialen. Beim Kassensystem sind bis zu 4 Kassen mit einer Lizenz inklusive – ohne Aufpreis. Für Franchise-Systeme mit vielen Standorten entwickeln wir individuelle Infrastrukturen.",
  },
  {
    q: "Fallen Transaktionsgebühren an?",
    a: "Gastro Master erhebt 0 % Provision. Die Zahlungsanbieter (Stripe, PayPal, Klarna etc.) erheben eigene Transaktionsgebühren. Mit der optionalen Transaktions-Umlage kannst du diese transparent und rechtssicher an deine Kunden weitergeben – so trägst du keinen Eigenanteil.",
  },
  {
    q: "Welches Paket ist das Richtige für meinen Betrieb?",
    a: "Für eine reine Online-Präsenz eignet sich die Webseite (49 €/Monat). Willst du online Bestellungen entgegennehmen, ist das Bestellsystem (79 €/Monat) die richtige Wahl. Für eine [eigene Bestell-App](/produkte/app) empfehlen wir App + Bestellsystem für 149 €/Monat. Das Kassensystem (ab 69 €/Monat) ergänzt alle Pakete für den stationären Betrieb. Wer seinen [eigenen Lieferdienst aufbauen](/loesungen/lieferservice-gruenden) möchte, findet in unserem Ratgeber alle Schritte. Im kostenlosen Beratungsgespräch finden wir gemeinsam die passende Kombination.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FLYER_TIERS = [
  { qty: "2.500 Stück",  price: "65,00 €"    },
  { qty: "5.000 Stück",  price: "117,00 €"   },
  { qty: "7.500 Stück",  price: "175,50 €"   },
  { qty: "10.000 Stück", price: "234,00 €"   },
  { qty: "12.500 Stück", price: "295,50 €"   },
  { qty: "15.000 Stück", price: "351,00 €"   },
  { qty: "20.000 Stück", price: "468,00 €"   },
  { qty: "30.000 Stück", price: "702,00 €"   },
  { qty: "40.000 Stück", price: "936,00 €"   },
  { qty: "50.000 Stück", price: "1.117,00 €" },
];

const FlyerPriceList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-auto relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-cyan-brand text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
      >
        Preisliste {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 z-30 mb-2 rounded-xl bg-white dark:bg-[#111827] border border-[#0A264A]/10 dark:border-white/10 shadow-xl p-4 space-y-1.5"
          >
            {FLYER_TIERS.map(t => (
              <div key={t.qty} className="flex justify-between text-xs text-[#0A264A]/60 dark:text-white/50">
                <span>{t.qty}</span>
                <span className="font-semibold">{t.price}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const renderFaqLinks = (text: string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={m[2]} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

const FaqAccordion = ({ item }: { item: FaqItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-semibold text-base leading-snug pr-2">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-cyan-brand flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-sm leading-relaxed pb-5">{renderFaqLinks(item.a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const PreisePage = () => {
  useSeoMeta({
    title: "Gastronomie Software Preise 2026 — ab 49 € | Gastro Master",
    description: "Webshop ab 79 €, Webseite ab 49 €, Kasse ab 69 € — 0 % Provision, persönliche Einrichtungsbegleitung, monatlich kündbar. Jetzt kostenlos beraten lassen.",
    canonical: "https://gastro-master.de/preise",
  });

  const [calcOrders, setCalcOrders] = useState(300);
  const [calcCart,   setCalcCart]   = useState(30);
  const paypalFee  = calcOrders * 0.5 * (calcCart * 0.0299 + 0.39);
  const stripeFee  = calcOrders * 0.5 * (calcCart * 0.015  + 0.25);
  const totalFees  = Math.round(paypalFee + stripeFee);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a] text-[#0A264A] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }}
      />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] pt-28 pb-20 md:pt-36 md:pb-28 px-5 md:px-8 lg:px-16 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-brand/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ED8400]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Preise 2026 · Gastro Master
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Gastro Master Preise —{" "}
              <span className="bg-gradient-to-r from-cyan-brand to-[#007DCF] bg-clip-text text-transparent">
                transparent, fair & klar.
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Alle Pakete inklusive Einrichtung, Support und Updates — monatlich kündbar.
              Keine Provision, keine Überraschungen.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {["Persönliche Einrichtungsbegleitung", "Monatlich kündbar", "700+ Betriebe", "Persönlicher Support"].map((pill) => (
                <span key={pill} className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3 text-cyan-brand flex-shrink-0" />
                  {pill}
                </span>
              ))}
            </div>

            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-8 py-3.5 rounded-xl text-base shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform"
            >
              Kostenloses Beratungsgespräch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── S2: PRICING CARDS (identical to homepage) ─────────── */}
      <SlimPricingSection />

      {/* ── S3: EMPFEHLUNGSPROGRAMM ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-14 md:py-20">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ED8400]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 px-4 py-1.5 rounded-full mb-5">
              <Gift className="w-4 h-4 text-[#ED8400]" strokeWidth={1.75} />
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest">Empfehlungsprogramm</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              <span className="bg-gradient-to-r from-[#ED8400] to-[#f5a623] bg-clip-text text-transparent">Empfiehl</span>{" "}
              uns weiter — spare jeden Monat.
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
              Für jede erfolgreiche Empfehlung bekommst du einen kompletten Monat gratis.
            </p>
          </motion.div>

          {/* 3 Steps */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { num: "1", icon: MessageCircle, title: "Empfehlen", text: "Du empfiehlst Gastro Master an einen anderen Gastronomen." },
              { num: "2", icon: FileCheck,    title: "Vertrag",    text: "Deine Empfehlung schließt einen Vertrag ab und nennt deinen Namen." },
              { num: "3", icon: Gift,         title: "Gratis-Monat", text: "Du bekommst einen kompletten Monat gratis. Automatisch." },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white/[0.06] border border-white/10 rounded-2xl px-6 py-5 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#ED8400]/15 border border-[#ED8400]/25 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#ED8400]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-0.5">Schritt {step.num}</span>
                    <h3 className="text-white font-black text-base mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Klarstellung + Kein Limit — nebeneinander */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0 text-white font-black text-xs mt-0.5">!</span>
              <p className="text-white/60 text-sm leading-relaxed">
                <span className="text-white font-semibold">Wichtig: </span>
                Dein Gratis-Monat wird erst gutgeschrieben, wenn deine Empfehlung einen Vertrag abschließt. Eine Empfehlung allein reicht nicht.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="bg-[#ED8400]/10 border border-[#ED8400]/20 rounded-2xl px-5 py-4 flex items-center gap-3"
            >
              <Infinity className="w-6 h-6 text-[#ED8400] flex-shrink-0" strokeWidth={2} />
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-white font-black">Kein Limit.</span>{" "}
                5 Empfehlungen = 5 Gratis-Monate. Je mehr du empfiehlst, desto mehr sparst du.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-[#ED8400]/25 hover:scale-[1.02] transition-transform"
            >
              Du kennst jemanden? Schreib uns einfach
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── S3: BESTELLSYSTEM ADD-ONS ────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Add-ons · Bestellsystem</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
              Bestellsystem erweitern
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg max-w-xl">
              Ergänze dein Bestellsystem nach Bedarf — jederzeit zuschaltbar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">

            {/* ── Karte 1: Transaktionsumlage-Rechner ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1a2332] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-cyan-brand" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-brand">Add-on · Top-Seller</span>
              </div>
              <h3 className="text-[#0A264A] dark:text-white font-black text-xl mb-1">Transaktionsumlage</h3>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-sm leading-relaxed mb-6">
                Gib Zahlungsgebühren automatisch und transparent an deine Kunden weiter — du behältst 100 % deines Nettoumsatzes.
              </p>

              {/* Mini-Rechner */}
              <div className="bg-white dark:bg-[#0d1a2d] border border-[#0A264A]/10 dark:border-white/10 rounded-xl p-5 mb-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0A264A]/40 dark:text-white/35 mb-5">
                  Gebühren-Rechner
                </p>
                <div className="space-y-5 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#0A264A]/60 dark:text-white/50">Bestellungen / Monat</span>
                      <span className="font-bold text-[#0A264A] dark:text-white">{calcOrders}</span>
                    </div>
                    <input
                      type="range" min={50} max={2000} step={50} value={calcOrders}
                      onChange={(e) => setCalcOrders(Number(e.target.value))}
                      className="w-full accent-cyan-brand"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#0A264A]/60 dark:text-white/50">Ø Warenkorbwert</span>
                      <span className="font-bold text-[#0A264A] dark:text-white">{calcCart} €</span>
                    </div>
                    <input
                      type="range" min={10} max={80} step={1} value={calcCart}
                      onChange={(e) => setCalcCart(Number(e.target.value))}
                      className="w-full accent-cyan-brand"
                    />
                  </div>
                </div>
                <div className="bg-[#0A264A]/[0.06] dark:bg-white/5 border border-[#0A264A]/10 dark:border-white/10 rounded-lg p-4 mb-3">
                  <p className="text-[#0A264A]/50 dark:text-white/40 text-xs mb-1">Zahlungsgebühren pro Monat</p>
                  <p className="text-3xl font-black text-[#0A264A] dark:text-white">~{totalFees.toLocaleString("de-DE")} €</p>
                </div>
                <div className="space-y-1 text-[11px] text-[#0A264A]/40 dark:text-white/35">
                  <p>PayPal: 2,99 % + 0,39 € pro Transaktion</p>
                  <p>Stripe (Apple Pay, Visa, MC, Klarna): 1,5 % + 0,25 €</p>
                  <p className="text-cyan-brand font-medium pt-1">Mit Umlage trägst du davon 0 €.</p>
                </div>
              </div>

              {/* Zahlungs-Logos + Link */}
              <div className="mt-auto space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { src: payPaypal,     alt: "PayPal",      h: "h-7"  },
                    { src: payStripe,     alt: "Stripe",      h: "h-5"  },
                    { src: payApple,      alt: "Apple Pay",   h: "h-7"  },
                    { src: payGoogle,     alt: "Google Pay",  h: "h-6"  },
                    { src: payVisa,       alt: "Visa",        h: "h-5"  },
                    { src: payMastercard, alt: "Mastercard",  h: "h-6"  },
                    { src: payKlarna,     alt: "Klarna",      h: "h-6"  },
                  ].map((p) => (
                    <img key={p.alt} src={p.src} alt={p.alt} className={`${p.h} object-contain opacity-70 hover:opacity-100 transition-opacity`} />
                  ))}
                </div>
                <Link to="/produkte/transaktionsumlage" className="text-cyan-brand text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* ── Karte 2: QR-Code Flyer ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1a2332] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-brand">Add-on · App & Webshop</span>
              </div>
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="text-[#0A264A] dark:text-white font-black text-xl">QR-Code Flyer</h3>
                <div className="text-right flex-shrink-0">
                  <span className="text-[#ED8400] font-black text-2xl">ab 65 €</span>
                  <span className="text-[#0A264A]/40 dark:text-white/40 text-xs block">/ 2.500 Stück</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#0A264A]/5 dark:bg-white/5 mb-5 flex items-center justify-center p-2 h-[300px]">
                <img src={imgQrFlyer} alt="QR-Code Flyer" className="h-full w-auto object-contain scale-[1.15]" />
              </div>

              {/* Highlight */}
              <div className="bg-cyan-brand/10 border border-cyan-brand/20 rounded-xl px-4 py-3 mb-5">
                <p className="text-cyan-brand text-sm font-semibold">
                  Die ersten 2.500 Flyer sind bei jedem Abo-Abschluss kostenlos inklusive.
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {["DIN-A6, doppelseitig gedruckt", "Eigenes Branding inklusive", "Weitere Mengen jederzeit nachbestellbar"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#0A264A]/65 dark:text-white/60">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-brand" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <FlyerPriceList />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── S4: KASSENSYSTEM FEATURED ──────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Kassensystem</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Die Gastro Master Cloud-Kasse
            </h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">
              TSE-konform, GoBD-zertifiziert — für Restaurant, Lieferdienst und Abholung.
            </p>
            <p className="text-white/30 text-xs italic mt-2 max-w-xl mx-auto">
              TSE-Pflicht seit 01.01.2020 (§146a AO, KassenSichV) — Bußgelder bis 25.000 € bei fehlendem Nachweis.
            </p>
          </motion.div>

          <div className="rounded-3xl border border-cyan-brand/20 overflow-hidden bg-[#061830]">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="p-8 md:p-12"
              >
                <span className="inline-block bg-cyan-brand/10 text-cyan-brand text-xs font-bold px-3 py-1 rounded-full mb-4">
                  Cloud-Kassensoftware
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-[#ED8400] font-black text-5xl leading-none">ab 69 €</span>
                  <span className="text-white/40 text-sm mb-1">/ Monat (netto)</span>
                </div>
                <p className="text-white/35 text-xs mb-8">monatlich kündbar · persönliche Einrichtungsbegleitung</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "TSE-konforme Cloud-Kassensoftware",
                    "GoBD-konform — rechtssicher für Betriebsprüfungen",
                    "Bis zu 4 Kassen pro Lizenz",
                    "Tisch-, Liefer- & Abholbetrieb",
                    "Cloud-Backoffice & Statistiken",
                    "Persönlicher Support per WhatsApp",
                    "Monatlich kündbar",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-brand flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-white/80 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform"
                >
                  Kostenlose Beratung
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="relative flex justify-center items-center p-8 md:p-12"
              >
                <div className="absolute inset-0 bg-[#007DCF]/10 blur-[80px] rounded-full scale-75 pointer-events-none" />
                <img
                  src={imgKasseHW}
                  alt="Gastro Master Cloud-Kassensystem Hardware"
                  className="relative z-10 w-full max-w-sm drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S5: KASSENSYSTEM ADD-ONS ─────────────────────────────── */}
      <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Add-ons · Kassensystem</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
              Kassensystem erweitern
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg max-w-xl">
              Modulare Add-ons für deinen Betrieb — nur was du wirklich brauchst.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {KASSEN_ADDONS.map((addon, i) => {
              return (
                <motion.div
                  key={addon.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl p-7 flex flex-col ${
                    addon.dark
                      ? "bg-[#0A264A] border border-cyan-brand/20"
                      : "bg-white dark:bg-[#1a2332] border border-[#0A264A]/10 dark:border-white/[0.08]"
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${addon.dark ? "text-cyan-brand" : "text-cyan-brand"}`}>
                    Add-on
                  </span>
                  <div className={addon.imgWrapperClass}>
                    <img src={addon.img} alt={addon.title} className={addon.imgClass} />
                  </div>
                  <h3 className={`font-black text-lg mb-1 ${addon.dark ? "text-white" : "text-[#0A264A] dark:text-white"}`}>
                    {addon.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`font-black text-xl ${addon.dark ? "text-[#ED8400]" : "text-[#0A264A] dark:text-white"}`}>
                      {addon.price}
                    </span>
                    <span className={`text-xs ${addon.dark ? "text-white/40" : "text-[#0A264A]/40 dark:text-white/40"}`}>
                      {addon.priceDetail}
                    </span>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {addon.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${addon.dark ? "text-white/70" : "text-[#0A264A]/65 dark:text-white/60"}`}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-brand" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-[#0A264A]/35 dark:text-white/25 text-xs mt-8">
            Alle Preise zzgl. MwSt. · Hardware und Sonderanforderungen nach Bedarf.
          </p>
        </div>
      </section>

      {/* ── S6: SO ARBEITEN PRODUKTE ZUSAMMEN ──────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Integration</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
              So arbeiten die Produkte zusammen
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg max-w-xl mx-auto">
              Alle Produkte sind nativ miteinander verknüpft — kein manuelles Übertragen, kein Chaos.
            </p>
          </motion.div>

          {/* Integration visual */}
          <div className="relative">
            {/* Center hub */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-2xl bg-[#0A264A] dark:bg-[#0A264A] border border-cyan-brand/30 flex flex-col items-center justify-center shadow-xl shadow-[#0A264A]/20"
              >
                <Zap className="w-7 h-7 text-cyan-brand mb-0.5" strokeWidth={1.75} />
                <span className="text-white text-[9px] font-bold uppercase tracking-widest">Zentral</span>
              </motion.div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INTEGRATION_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                  >
                    <Link
                      to={step.href}
                      className={`block rounded-2xl border p-5 text-center hover:scale-[1.02] transition-transform ${step.color}`}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0A264A]/10 dark:bg-white/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#0A264A] dark:text-white" strokeWidth={1.75} />
                        </div>
                      </div>
                      <h3 className="text-[#0A264A] dark:text-white font-black text-sm mb-1.5">{step.title}</h3>
                      <p className="text-[#0A264A]/55 dark:text-white/45 text-xs leading-relaxed">{step.text}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Connector description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 bg-[#0A264A]/[0.04] dark:bg-[#0A264A]/40 border border-[#0A264A]/10 dark:border-cyan-brand/10 rounded-2xl p-6 flex items-center gap-4"
            >
              <Link2 className="w-8 h-8 text-cyan-brand flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[#0A264A] dark:text-white font-semibold text-sm mb-1">
                  Alles in einem System — zentral gesteuert
                </p>
                <p className="text-[#0A264A]/55 dark:text-white/45 text-xs leading-relaxed">
                  Bestellungen aus dem Webshop, der App und der Kasse laufen in einem zentralen Dashboard zusammen.
                  Alle Statistiken, alle Standorte, ein Login.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S7: PREIS-FAQ ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Häufige Fragen zu den Preisen
            </h2>
            <p className="text-white/50 text-base">
              Weitere Fragen? Unser Team antwortet innerhalb von 24 Stunden.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/10 overflow-hidden px-6"
          >
            {FAQ_ITEMS.map((item) => (
              <FaqAccordion key={item.q} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S8: CTA-ABSCHLUSS ─────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0a0f1a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#0A264A]/8 dark:bg-white/8 border border-[#0A264A]/10 dark:border-white/10 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Kostenloses Beratungsgespräch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              Nicht sicher, welches Paket passt?
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-lg leading-relaxed mb-8">
              In einem 20-minütigen Gespräch zeigen wir dir die beste Kombination für deinen Betrieb —
              kostenlos, unverbindlich und auf dich zugeschnitten.
            </p>

            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform mb-8"
            >
              Beratungsgespräch vereinbaren
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              {[
                "0 % Provision",
                "700+ Betriebe",
                "5,0 ★ Google",
                "Monatlich kündbar",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[#0A264A]/50 dark:text-white/40 text-sm">
                  <Check className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PreisePage;

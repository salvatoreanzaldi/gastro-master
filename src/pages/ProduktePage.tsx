import { useEffect, useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ShoppingCart, Smartphone, Globe,
  Monitor, Percent, CheckCircle2, Star,
  Truck, QrCode, Plus, ShoppingBag, Zap, ChevronDown,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

// ─── Logos ───────────────────────────────────────────────────────────────────
import logoKojo      from "@/assets/logo-kojo-sushi.png";
import logoIlSorriso from "@/assets/logo-il-sorriso.png";
import logoBurger    from "@/assets/logo-burger-brothers.png";
import logoArtemis   from "@/assets/logo-artemis.png";
import logoTake      from "@/assets/logo-take.png";

// ─── Produkt-Daten ────────────────────────────────────────────────────────────
const MAIN_PRODUCTS = [
  {
    icon: ShoppingCart,
    badge: "Online-Bestellshop",
    title: "Online Shop",
    price: "ab 79 €/Monat",
    desc: "Dein eigener Online-Bestellshop – ohne App, ohne Provision. Kunden bestellen direkt über deine Website, du behältst 100 % des Umsatzes.",
    benefits: ["0 % Provision", "Eigene Domain & Branding", "PayPal, Kreditkarte & mehr"],
    href: "/produkte/webshop",
  },
  {
    icon: Smartphone,
    badge: "iOS & Android App",
    title: "App System",
    price: "ab 149 €/Monat",
    desc: "Deine eigene Bestell-App im App Store und Google Play – unter deinem Namen, mit deinem Logo, vollständig provisionsfrei.",
    benefits: ["iOS & Android", "Push-Benachrichtigungen", "Multi-Standort fähig"],
    href: "/produkte/app",
  },
  {
    icon: Globe,
    badge: "Professionelle Webseite",
    title: "Webseite",
    price: "ab 49 €/Monat",
    desc: "Professionelle Online-Präsenz in wenigen Tagen – mit eigener Domain, Galerie, Kontaktformular und DSGVO-konformer Einrichtung. Für alle Branchen.",
    benefits: ["Eigene Domain inklusive", "DSGVO-konform", "Für alle Branchen"],
    href: "/produkte/webseite",
  },
  {
    icon: Monitor,
    badge: "POS-System",
    title: "Kassensystem",
    price: "ab 69 €/Monat",
    desc: "TSE-konformes Kassensystem für die Gastronomie – mit Tischverwaltung, Fahrer-App, Statistiken und nahtloser Integration ins Bestell-System.",
    benefits: ["TSE-konform (GoBD)", "Tisch- & Lieferverwaltung", "Cloud-basierte Updates"],
    href: "/produkte/kassensystem",
  },
];

const ADD_ONS = [
  {
    icon: Percent,
    badge: "Add-On · Top-Seller",
    title: "Transaktionsumlage",
    price: "Individuell",
    desc: "Gib PayPal-, Kreditkarten- und weitere Zahlungsgebühren automatisch und transparent an deine Kunden weiter. Du behältst 100 % deines Nettoumsatzes – rechtssicher, automatisch beim Checkout.",
    benefits: ["PayPal, Visa, Mastercard", "Apple Pay, Google Pay, Klarna", "Rechtssicher & transparent"],
    href: "/produkte/transaktionsumlage",
  },
  {
    icon: QrCode,
    badge: "Add-On · App & Webshop",
    title: "QR-Code Flyer",
    price: "ab 65 € / 2.500 Stück",
    desc: "Flyer sind das wirksamste Mittel, um Kunden zum Scannen deines QR-Codes zu bewegen. Professionell doppelseitig gedruckte DIN-A6-Flyer mit deinem Branding – ideal als Lieferbeigabe, an der Kasse oder zum Verteilen. Die ersten 2.500 Flyer sind mit jedem Abo kostenfrei inklusive.",
    benefits: ["Erste 2.500 Flyer kostenlos", "DIN-A6, doppelseitig gedruckt", "Eigenes Branding inklusive"],
    href: "/produkte/app",
  },
];

const KASSEN_ADD_ONS = [
  {
    icon: Truck,
    badge: "Kassen-Add-On · Lieferdienst",
    title: "Fahrer-App mit GPS",
    price: "+10 € / Monat pro Fahrer",
    desc: "Die Fahrer-App für Gastronomen mit eigenem Lieferdienst: Echtzeit-GPS-Tracking, automatische Routenoptimierung und Dispositionsübersicht direkt im Kassensystem. Fahrer sehen ihre Touren live auf dem Smartphone, der Betreiber behält jederzeit den Überblick.",
    benefits: ["Echtzeit-GPS-Tracking für alle Fahrer", "Automatische Routenoptimierung", "Nahtlose Integration ins Kassensystem"],
    href: "/produkte/kassensystem",
  },
  {
    icon: QrCode,
    badge: "Kassen-Add-On · Tischservice",
    title: "QR-Code Tischsystem",
    price: "+50 € / 5 Tische, +5 € je weiterem",
    desc: "Mit dem QR-Code Tischsystem bestellen Gäste direkt am Tisch – ohne Kellner, ohne Wartezeit. Jeder Tisch bekommt einen individuellen QR-Code; Bestellungen landen sofort im Kassensystem. Ideal für Restaurants, die Wartezeiten reduzieren und die Tischumschlagrate steigern möchten.",
    benefits: ["QR-Code-Bestellung am Tisch", "Direkte Übertragung ins Kassensystem", "Weniger Wartezeit, höhere Tischumschlagrate"],
    href: "/produkte/kassensystem",
  },
  {
    icon: Monitor,
    badge: "Kassen-Add-On · Bildschirme",
    title: "Bildschirmfunktion",
    price: "auf Anfrage",
    desc: "Pick-Up Screen und Küchenmonitor optimieren den Bestellfluss ohne zusätzliche Absprachen. Der Pick-Up Screen zeigt Abholkunden ihre Bestellnummer an – der Küchenmonitor gibt dem Küchenteam jederzeit den aktuellen Bestellstatus. Verfügbar als Counter, Freestanding oder Outdoor-Variante.",
    benefits: ["Pick-Up Screen für Abholkunden", "Küchenmonitor für den Bestellstatus", "Counter, Freestanding & Outdoor verfügbar"],
    href: "/produkte/kassensystem",
  },
];

const SYNERGY = [
  {
    a: { icon: ShoppingCart, label: "Webshop" },
    b: { icon: Percent, label: "Transaktionsumlage" },
    title: "Gebühren automatisch weitergeben",
    desc: "Zahlungsgebühren (PayPal, Kreditkarte) werden beim Checkout automatisch und transparent an Kunden weitergegeben – du behältst 100 % deines Nettoumsatzes.",
  },
  {
    a: { icon: Smartphone, label: "App System" },
    b: { icon: ShoppingCart, label: "Online Shop" },
    title: "Zwei Kanäle, ein Backend",
    desc: "Bestellungen aus App und Webshop laufen in einem gemeinsamen System zusammen – kein manuelles Abgleichen, keine doppelten Menüpflegungen.",
  },
  {
    a: { icon: Monitor, label: "Kassensystem" },
    b: { icon: ShoppingBag, label: "Webshop & App" },
    title: "Vollständige Synchronisation",
    desc: "Menü, Preise und Bestellungen synchronisieren sich automatisch zwischen Kasse und Online-Kanälen – in Echtzeit, ohne Schnittstellen-Aufwand.",
  },
];

const LOGOS = [
  { src: logoKojo,      alt: "Kojo Sushi" },
  { src: logoIlSorriso, alt: "Pizzeria Il Sorriso" },
  { src: logoBurger,    alt: "Burger Brothers" },
  { src: logoArtemis,   alt: "Artemis Grill" },
  { src: logoTake,      alt: "TAKE The Good Food" },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://gastro-master.de/" },
    { "@type": "ListItem", "position": 2, "name": "Produkte", "item": "https://gastro-master.de/produkte" },
  ],
};

const SCHEMA_PRODUCT_LIST = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Gastro Master Produkte – Digitale Lösungen für Gastronomie",
  "description": "Gastro Master bietet digitale Lösungen für die Gastronomie: Online-Bestellshop, eigene Bestell-App, professionelle Webseite, TSE-konformes Kassensystem und Transaktionsumlage als Add-On.",
  "url": "https://gastro-master.de/produkte",
  "numberOfItems": 5,
  "itemListElement": [
    ...MAIN_PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.title,
      "url": `https://gastro-master.de${p.href}`,
    })),
    { "@type": "ListItem", "position": 5, "name": ADD_ONS[0].title, "url": `https://gastro-master.de${ADD_ONS[0].href}` },
  ],
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Was ist der Unterschied zwischen Webshop und Webseite bei Gastro Master?",
    a: "Der [Webshop ab 79 €/Monat](/produkte/webshop) ist ein vollständiges Online-Bestellsystem — deine Kunden bestellen direkt, du behältst 100 % der Einnahmen ohne Provision. Die [professionelle Webseite ab 49 €/Monat](/produkte/webseite) ist deine Online-Präsenz ohne Bestellfunktion: mit eigener Domain, Galerie, Speisekarte und Kontaktformular. Willst du Direktbestellungen annehmen, ist der Webshop die richtige Wahl. Willst du einfach online gefunden werden, reicht die Webseite.",
  },
  {
    q: "Wie lange dauert die Einrichtung — wann kann ich live gehen?",
    a: "Für Webshop und Webseite planen wir 2–3 Wochen von Vertragsabschluss bis Go-Live — inklusive Design, Einrichtung und Testphase. Das Kassensystem erfordert zusätzlich die Hardware-Lieferung und Vor-Ort-Einrichtung. Wir übernehmen das komplette Setup für dich — du musst kein technisches Vorwissen mitbringen. Dein [Online-Bestellshop](/produkte/webshop) ist schneller live als du denkst.",
  },
  {
    q: "Kann ich Webshop, App und Kassensystem kombinieren?",
    a: "Ja — alle Gastro Master Produkte sind aufeinander abgestimmt und lassen sich flexibel kombinieren. Bestellungen aus Webshop und App laufen in einem gemeinsamen Backend zusammen. Menü, Preise und Bestellstatus synchronisieren sich automatisch mit der [Cloud-Kassensoftware](/produkte/kassensystem) — ohne manuelle Übertragung, ohne zusätzliche Schnittstellen. Du verwaltest alles zentral über ein einziges Dashboard.",
  },
  {
    q: "Was kostet das Kassensystem — und was ist im Preis enthalten?",
    a: "Das Kassensystem kostet ab 69 €/Monat (zzgl. MwSt.) und läuft auf Windows-Computern. Enthalten sind: TSE-konforme Cloud-Kassensoftware, regelmäßige Updates, Cloud-Backoffice, Auswertungen und persönlicher Support per WhatsApp. Add-Ons wie Fahrer-App (+10 €/Monat pro Fahrer) und QR-Code Tischsystem sind optional buchbar. Alle Infos auf der [Kassensystem-Übersicht](/produkte/kassensystem).",
  },
  {
    q: "Brauche ich eine TSE — und was kostet ein Verstoß?",
    a: "Ja. Seit dem 1. Januar 2020 ist eine TSE (Technische Sicherheitseinrichtung) für alle elektronischen Kassen in Deutschland Pflicht — geregelt in §146a der Abgabenordnung (AO) und der Kassensicherungsverordnung (KassenSichV). Bei Verstößen drohen Bußgelder bis 25.000 €. Zusätzlich gilt seit dem 1. Juli 2025 die Kassenmeldepflicht: Alle Kassen müssen über ELSTER beim Finanzamt gemeldet werden. Die Gastro Master [TSE-Kassenlösung](/produkte/kassensystem) ist von Anfang an gesetzeskonform und meldereif.",
  },
  {
    q: "Was ist der Unterschied zwischen der Bestell-App und dem Webshop?",
    a: "Der Webshop ist browser-basiert — deine Kunden bestellen über die Website, ohne eine App zu installieren. Die [eigene Bestell-App](/produkte/bestellapp) erscheint als native iOS- und Android-App im App Store und Google Play — unter deinem Namen und Logo. Die App ermöglicht Push-Benachrichtigungen und bindet Stammkunden dauerhaft. Beide Kanäle laufen in einem gemeinsamen Backend und können parallel betrieben werden.",
  },
  {
    q: "Welche Zahlungsarten werden unterstützt?",
    a: "Gastro Master unterstützt PayPal, Stripe, Kreditkarte (Visa, Mastercard), Apple Pay, Google Pay und Klarna. Mit der [Transaktionsumlage](/produkte/transaktionsumlage) gibst du Zahlungsgebühren automatisch und transparent an deine Kunden weiter — du behältst 100 % deines Nettoumsatzes. Die Umlage ist rechtssicher, wird beim Checkout ausgewiesen und muss nicht manuell abgerechnet werden.",
  },
  {
    q: "Welche technischen Voraussetzungen gibt es?",
    a: "Für das Kassensystem benötigst du einen Windows-PC (Windows 10 oder neuer) — keine speziellen Hardware-Mindestanforderungen. Webshop und App laufen vollständig in der Cloud: Du brauchst lediglich einen Browser und eine stabile Internetverbindung. Wir übernehmen Hosting, Domain und das komplette Setup. Bei Fragen helfen wir dir per WhatsApp, Telefon oder E-Mail weiter.",
  },
];

const SCHEMA_FAQ_PRODUKTE = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
    },
  })),
};

const renderFaqLinks = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const [, anchor, href] = match;
      return (
        <Link key={i} to={href} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">
          {anchor}
        </Link>
      );
    }
    return part;
  });
};

// ─── Card component (shared) ──────────────────────────────────────────────────
const ProductCard = ({
  p,
  dark = false,
  delay = 0,
  badge: badgeOverride,
}: {
  p: typeof MAIN_PRODUCTS[0];
  dark?: boolean;
  delay?: number;
  badge?: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`group relative rounded-2xl p-8 hover:border-cyan-brand/30 transition-all duration-300 ${
      dark
        ? "bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.09]"
        : "bg-[#0A264A]/[0.03] dark:bg-white/[0.04] border border-[#0A264A]/[0.08] dark:border-white/[0.07] hover:bg-[#0A264A]/[0.05] dark:hover:bg-white/[0.07]"
    }`}
  >
    {badgeOverride && (
      <div className="absolute -top-3.5 left-8">{badgeOverride}</div>
    )}

    <div className={`flex items-start justify-between gap-4 mb-5 ${badgeOverride ? "mt-2" : ""}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${dark ? "bg-cyan-brand/15" : "bg-cyan-brand/10"}`}>
        <p.icon className="w-6 h-6 text-cyan-brand" />
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${dark ? "text-white/35 bg-white/[0.07]" : "text-[#0A264A]/40 dark:text-white/35 bg-[#0A264A]/[0.05] dark:bg-white/[0.05]"}`}>
        {p.price}
      </span>
    </div>

    <p className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-1">{p.badge}</p>
    <h3 className={`font-black text-2xl mb-3 ${dark ? "text-white" : "text-[#0A264A] dark:text-white"}`}>{p.title}</h3>
    <p className={`text-sm leading-relaxed mb-5 ${dark ? "text-white/55" : "text-[#0A264A]/60 dark:text-white/55"}`}>{p.desc}</p>

    <ul className="space-y-1.5 mb-7">
      {p.benefits.map(b => (
        <li key={b} className={`flex items-center gap-2 text-sm ${dark ? "text-white/55" : "text-[#0A264A]/65 dark:text-white/55"}`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          {b}
        </li>
      ))}
    </ul>

    <Link
      to={p.href}
      className="inline-flex items-center gap-2 text-cyan-brand font-bold text-sm group-hover:gap-3 transition-all duration-200"
    >
      Mehr erfahren
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  </motion.div>
);

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="bg-[#f8fafc] dark:bg-[#0f172a] px-5 md:px-8 lg:px-16 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Häufige Fragen</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-3">
            Deine Fragen zu unseren Produkten
          </h2>
          <p className="text-[#0A264A]/50 dark:text-white/45 text-base max-w-xl">
            Alles was du wissen musst — bevor du entscheidest.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.04] overflow-hidden"
            >
              <h3 className="text-base">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                >
                  <span className="font-bold text-[#0A264A] dark:text-white text-base leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#0A264A]/35 dark:text-white/35 shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-[#0A264A]/60 dark:text-white/55 text-sm leading-relaxed">
                        {renderFaqLinks(item.a)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProduktePage = () => {
  useSeoMeta({
    title: "Gastronomie Software & digitale Lösungen | Gastro Master",
    description: "Webshop, App, Kassensystem & Webseite für die Gastronomie – 0 % Provision, keine versteckten Gebühren. Digitale Komplettlösung von Gastro Master. Jetzt beraten lassen.",
    canonical: "https://gastro-master.de/produkte",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_PRODUCT_LIST) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ_PRODUKTE) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="mesh-gradient relative overflow-hidden px-5 md:px-8 lg:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,125,207,0.12), transparent 70%)" }} />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-cyan-brand/10 border border-cyan-brand/20 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Star className="w-3.5 h-3.5 fill-cyan-brand" />
                Gastronomie Software · Digitale Lösungen
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                Gastronomie Software —{" "}
                <span className="text-gradient-brand">alle Produkte</span>
              </h1>

              {/* GEO Definition Block */}
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                Gastro Master bietet digitale Komplettlösungen für die Gastronomie – und darüber hinaus. Vom provisionslosen Online-Bestellshop über eine{" "}
                <Link to="/produkte/app" className="text-white/90 underline underline-offset-2 hover:text-white transition-colors">eigene iOS & Android App</Link>{" "}
                bis hin zu professionellen Webseiten und{" "}
                <Link to="/produkte/kassensystem" className="text-white/90 underline underline-offset-2 hover:text-white transition-colors">TSE-konformen Kassensystemen</Link>.
                Alle Produkte sind aufeinander abgestimmt und lassen sich flexibel kombinieren.
              </p>
              <p className="text-white/40 text-base max-w-2xl mx-auto mb-10">
                Für Restaurants, Lieferdienste, Cafés, Bäckereien und alle weiteren Branchen.
              </p>

              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  to="/kontakt"
                  className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-2 shadow-lg"
                >
                  Kostenloses Beratungsgespräch
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── HAUPTPRODUKTE ─────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Produkte</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight">
                Digitale Produkte für die Gastronomie
              </h2>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-base mt-3 max-w-xl">
                Jedes Produkt funktioniert für sich allein – und entfaltet seine volle Stärke in Kombination.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MAIN_PRODUCTS.map((p, i) => (
                <ProductCard key={p.title} p={p} delay={i * 0.07} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ADD-ON: TRANSAKTIONSUMLAGE ─────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Erweiterung</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Erweiterungen für Webshop und App
              </h2>
              <p className="text-white/45 text-base mt-3 max-w-xl">
                Ergänze deinen Webshop oder deine App mit diesen beliebten Add-Ons.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ProductCard
                p={ADD_ONS[0]}
                dark
                delay={0}
                badge={
                  <span className="bg-[#ED8400] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Top-Seller Add-On
                  </span>
                }
              />
              <ProductCard p={ADD_ONS[1]} dark delay={0.07} />
            </div>
          </div>
        </section>

        {/* ── KASSEN ADD-ONS ─────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Kassensystem-Erweiterungen</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight">
                Kassen-Add-Ons
              </h2>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-base mt-3 max-w-xl">
                Nur in Kombination mit dem Kassensystem – aktivierbar im laufenden Betrieb. Besonders geeignet für{" "}
                <Link to="/loesungen/lieferdienst" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">Lieferdienste mit eigenem Fahrerteam</Link>.
              </p>
              <div className="inline-flex items-center gap-1.5 mt-4 bg-[#0A264A]/[0.06] dark:bg-white/[0.06] border border-[#0A264A]/[0.1] dark:border-white/[0.1] text-[#0A264A]/60 dark:text-white/50 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Monitor className="w-3 h-3" />
                Erfordert Kassensystem
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {KASSEN_ADD_ONS.map((p, i) => (
                <ProductCard key={p.title} p={p} delay={i * 0.07} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SYNERGY ────────────────────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Kombinationen</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                So arbeiten unsere Produkte zusammen
              </h2>
              <p className="text-white/45 text-base mt-3 max-w-xl">
                Gastro Master Produkte sind für sich alleine stark – kombiniert entfalten sie ihr volles Potenzial.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SYNERGY.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.05] border border-white/[0.09] rounded-2xl p-7"
                >
                  {/* Kombinations-Badges */}
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-cyan-brand/15 text-cyan-brand text-xs font-bold px-3 py-1.5 rounded-lg">
                      <s.a.icon className="w-3.5 h-3.5" />
                      {s.a.label}
                    </div>
                    <Plus className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                    <div className="flex items-center gap-1.5 bg-cyan-brand/15 text-cyan-brand text-xs font-bold px-3 py-1.5 rounded-lg">
                      <s.b.icon className="w-3.5 h-3.5" />
                      {s.b.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-[#ED8400] flex-shrink-0" />
                    <h3 className="text-white font-black text-base">{s.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ───────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Vertrauen</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-4">
                700+ Betriebe vertrauen auf Gastro Master
              </h2>
              <p className="text-[#0A264A]/50 dark:text-white/45 text-sm max-w-xl mx-auto">
                Über 50 % aller deutschen Restaurants nutzen bereits digitale Kassensysteme – Tendenz steigend.
              </p>
              <p className="text-[#94A3B8] text-xs italic mt-1">
                Quelle:{" "}
                <a
                  href="https://www.statista.com/outlook/emo/online-food-delivery/germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-cyan-brand transition-colors"
                >
                  Statista, Online Food Delivery Outlook Deutschland 2025
                </a>
              </p>
            </motion.div>

            {/* Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12"
            >
              {LOGOS.map(({ src, alt }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className="h-10 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="max-w-2xl mx-auto bg-[#0A264A] rounded-2xl p-8 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ED8400] text-[#ED8400]" />
                ))}
              </div>
              <blockquote className="text-white text-lg font-semibold leading-relaxed mb-5">
                „Also der Support ist einfach 1A und den würdest du nirgendwo anders bekommen!"
              </blockquote>
              <div className="flex items-center gap-3">
                <img src={logoIlSorriso} alt="Pizzeria Il Sorriso" className="h-8 object-contain" />
                <div>
                  <p className="text-white font-bold text-sm">Marco Greco</p>
                  <p className="text-white/45 text-xs">Pizzeria Il Sorriso</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────────── */}
        <FaqSection />

        {/* ── ABSCHLIESSENDER CTA ───────────────────────────────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Einstieg</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                Nicht sicher, welches Produkt<br className="hidden md:block" /> zu dir passt?
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                In einem kostenlosen Beratungsgespräch analysieren wir gemeinsam deinen Betrieb und empfehlen die passende Kombination – ohne Verpflichtung.
              </p>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  to="/kontakt"
                  className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30"
                >
                  Kostenloses Beratungsgespräch anfragen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default ProduktePage;

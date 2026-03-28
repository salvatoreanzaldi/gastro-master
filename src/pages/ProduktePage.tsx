import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ShoppingCart, Smartphone, Globe,
  Monitor, Percent, CheckCircle2, Star,
  Truck, QrCode, Plus, ShoppingBag, Zap,
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

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProduktePage = () => {
  useEffect(() => {
    document.title = "Gastronomie Software & Digitale Lösungen – Alle Produkte | Gastro Master";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Gastro Master bietet digitale Lösungen für die Gastronomie: Online-Bestellshop ab 79 €/Monat, eigene Bestell-App, professionelle Webseite, TSE-konformes Kassensystem ab 69 €/Monat und Transaktionsumlage. Ohne Provision, ohne Abhängigkeit.");
    return () => { document.title = "Gastro Master"; };
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_PRODUCT_LIST) }} />

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
                Alle Produkte auf{" "}
                <span className="text-gradient-brand">einen Blick</span>
              </h1>

              {/* GEO Definition Block */}
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                Gastro Master bietet digitale Komplettlösungen für die Gastronomie – und darüber hinaus. Vom provisionslosen Online-Bestellshop über eine eigene iOS & Android App bis hin zu professionellen Webseiten und TSE-konformen Kassensystemen. Alle Produkte sind aufeinander abgestimmt und lassen sich flexibel kombinieren.
              </p>
              <p className="text-white/40 text-base max-w-2xl mx-auto mb-10">
                Für Restaurants, Lieferdienste, Cafés, Bäckereien und alle weiteren Branchen.
              </p>

              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 4px 18px 0px rgba(237,132,0,0.45)" }}
                whileTap={{ scale: 0.97 }}
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
                Eigenständige Produkte
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
                Add-On
              </h2>
              <p className="text-white/45 text-base mt-3 max-w-xl">
                Ergänze deinen Webshop oder deine App mit diesen beliebten Erweiterungen.
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
                Nur in Kombination mit dem Kassensystem – aktivierbar im laufenden Betrieb.
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
                Laut einer Studie von{" "}
                <a
                  href="https://www.statista.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-brand underline underline-offset-2"
                >
                  Statista
                </a>{" "}
                nutzen bereits über 50 % aller deutschen Restaurants digitale Kassensysteme – Tendenz steigend.
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

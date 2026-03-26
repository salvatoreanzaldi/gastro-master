import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2,
  Bell, Star, RefreshCw, Users, ChevronLeft, ChevronRight,
  CreditCard, MapPin, Smartphone,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CalculatorSection from "@/components/landing/CalculatorSection";
import TargetGroupSection from "@/components/landing/TargetGroupSection";

// ─── Assets ──────────────────────────────────────────────────────────────────
import takeLogoImg   from "@/assets/logo-take.png";
import takeLogin     from "@/assets/take-benutzerkonto.jpeg";
import takeOrder     from "@/assets/take-bestellart.jpeg";
import takeBranches  from "@/assets/take-filialen.jpeg";
import takeMenu      from "@/assets/take-menu.jpeg";
import takeSplash    from "@/assets/take-startbild.jpeg";
import iosIcon          from "@/assets/IOS 26 icon.png";
import androidIcon      from "@/assets/Android Icon.png";
import heroGastroMaster from "@/assets/Hero - Gastro Master.PNG";
import heroEtManus      from "@/assets/Hero - Et Manus.PNG";
import heroDT           from "@/assets/Hero - DT.PNG";
import heroBaeckerei    from "@/assets/Hero - Bäckerei Zimmer.PNG";
import logoKojo      from "@/assets/logo-kojo-sushi.png";
import logoIlSorriso from "@/assets/logo-il-sorriso.png";
import logoBurger    from "@/assets/logo-burger-brothers.png";
import logoArtemis   from "@/assets/logo-artemis.png";
import payPaypal     from "@/assets/partner-paypal.png";
import payApple      from "@/assets/Logo - Apple Pay.png";
import mockMenu      from "@/assets/Mock Up - Menu.png";
import mockLieferart from "@/assets/Mock Up - Lieferart.png";
import mockFilialen  from "@/assets/Mock Up - Filialen.png";
import mockLogin     from "@/assets/Mock Up - Registrierung.png";
import mockPush      from "@/assets/Mock Up - Push.png";
import mockZahlung   from "@/assets/Mock Up - Zahlung.png";
import mockAppStore  from "@/assets/Mock Up - App Store.png";
import payGoogle     from "@/assets/pay-google.png";
import payVisa       from "@/assets/pay-visa.png";
import payMastercard from "@/assets/pay-mastercard.png";
import payKlarna     from "@/assets/pay-klarna.png";

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Wie lange dauert die Einrichtung einer eigenen Bestell-App?",
    a: "In der Regel dauert es 2–3 Wochen, bis deine App live im Apple App Store und Google Play Store verfügbar ist. In dieser Zeit konfigurieren wir gemeinsam mit dir das Design, die Speisekarte, Liefergebiete und Zahlungsmethoden. Du musst nichts selbst programmieren.",
  },
  {
    q: "Was kostet eine eigene Gastro-App?",
    a: "Die Gastro Master App inklusive Webshop kostet 150 € pro Monat (netto). Darin enthalten sind App-Hosting, App Store-Verwaltung, laufende Updates und Support. Es gibt keine Provision pro Bestellung – nur den festen Monatsbeitrag. Den Webshop ohne App gibt es bereits ab 79 € / Monat.",
  },
  {
    q: "Läuft die App unter meinem eigenen Namen im App Store?",
    a: "Ja, absolut. Deine App wird unter deinem Betriebsnamen, mit deinem Logo und deinen Farben im Apple App Store und Google Play Store veröffentlicht. Kein Gastro Master-Branding ist für deine Kunden sichtbar. Das nennt sich White-Label-App.",
  },
  {
    q: "Kann ich die App auch für mehrere Standorte nutzen?",
    a: "Ja. Die Gastro Master App ist für Einzelbetriebe und Franchise-Konzepte mit mehreren Standorten geeignet. Kunden wählen direkt in der App ihren Standort aus und bestellen dort. TAKE – The Good Food betreibt 4 Standorte in Düsseldorf und Mönchengladbach – alle über eine einzige eigenbrandete App.",
  },
  {
    q: "Gibt es Push Notifications und ein Kundenbindungsprogramm?",
    a: "Ja. Du kannst deinen Kunden jederzeit Push Notifications schicken – für Angebote, neue Gerichte oder Rabattaktionen. Zusätzlich bietet die App ein Kundenpunkte-System: Kunden sammeln Punkte bei jeder Bestellung und lösen sie gegen Prämien ein.",
  },
  {
    q: "Kann ich die App vor dem Kauf testen?",
    a: "Ja. Du kannst unsere Demo-App direkt herunterladen und die Nutzererfahrung selbst erleben – im Apple App Store oder Google Play Store (Suche: \"Gastro Master App\").",
  },
  {
    q: "Brauche ich technisches Know-how, um die App zu betreiben?",
    a: "Nein. Die App wird vollständig von uns eingerichtet und gepflegt. Du pflegst deine Speisekarte, Preise und Angebote über ein einfaches Backend – ohne Programmierung. Bei Fragen steht dir unser Support-Team direkt zur Verfügung.",
  },
];

// ─── Cursor-Tracking Glow Card ────────────────────────────────────────────────
const GlowCard = ({
  children,
  glowRgb,
  className,
  motionProps,
}: {
  children: React.ReactNode;
  glowRgb: string; // e.g. "239,68,68"
  className?: string;
  motionProps?: React.ComponentProps<typeof motion.div>;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...motionProps}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        boxShadow: hovered
          ? `0 0 70px 10px rgba(${glowRgb},0.22)`
          : "0 0 0 0 transparent",
        transition: "box-shadow 0.1s ease-out",
      }}
    >
      {/* Cursor-following inner glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.1s ease-out",
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(${glowRgb},0.18), transparent 60%)`,
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />
      {children}
    </motion.div>
  );
};

const FlyerPriceList = () => {
  const [open, setOpen] = useState(false);
  const tiers = [
    { qty: "2.500 Stück",   price: "65,00 €"    },
    { qty: "5.000 Stück",   price: "117,00 €"   },
    { qty: "7.500 Stück",   price: "175,50 €"   },
    { qty: "10.000 Stück",  price: "234,00 €"   },
    { qty: "12.500 Stück",  price: "295,50 €"   },
    { qty: "15.000 Stück",  price: "351,00 €"   },
    { qty: "20.000 Stück",  price: "468,00 €"   },
    { qty: "30.000 Stück",  price: "702,00 €"   },
    { qty: "40.000 Stück",  price: "936,00 €"   },
    { qty: "50.000 Stück",  price: "1.117,00 €" },
  ];
  return (
    <div className="mt-4 relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
      >
        Nachbestell-Preisliste {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
            {tiers.map(t => (
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

// ─── Hero Phone Spread (Apple-Style) ─────────────────────────────────────────
const heroPhones = [
  { img: heroGastroMaster, alt: "Gastro Master App" },
  { img: heroEtManus,      alt: "Et Manus – Burger & Hot Dog App" },
  { img: takeSplash,       alt: "TAKE – The Good Food App" },
  { img: heroDT,           alt: "D&T Restaurants App" },
  { img: heroBaeckerei,    alt: "Bäckerei Zimmer App" },
];

const phoneSpread = [
  { x: -370, scale: 0.80, zIndex: 1 },
  { x: -185, scale: 0.90, zIndex: 3 },
  { x:    0, scale: 1.00, zIndex: 5 },
  { x:  185, scale: 0.90, zIndex: 3 },
  { x:  370, scale: 0.80, zIndex: 1 },
];

const HeroPhoneSpread = () => (
  <div className="relative h-[420px] md:h-[480px] w-full flex items-center justify-center overflow-visible">
    {/* Glow beneath center phone */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[480px] bg-cyan-brand/12 blur-[90px] rounded-full pointer-events-none z-0" />
    {heroPhones.map((phone, i) => (
      <motion.div
        key={i}
        initial={{ x: phoneSpread[i].x * 0.04, scale: 0.76, opacity: 0 }}
        animate={{ x: phoneSpread[i].x, scale: phoneSpread[i].scale, opacity: 1 }}
        transition={{ delay: 0.5, duration: 2.4, ease: [0.25, 1, 0.5, 1] }}
        style={{ zIndex: phoneSpread[i].zIndex, position: "absolute" }}
      >
        <div className="w-[148px] md:w-[168px] lg:w-[190px] rounded-[1rem] overflow-hidden border-[3px] border-white/18 shadow-2xl shadow-black/70 aspect-[9/19.5]">
          <img
            src={phone.img}
            alt={phone.alt}
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>
      </motion.div>
    ))}
  </div>
);

// ─── Take Screenshots (TAKE Case Study) ──────────────────────────────────────
const takeSlides = [
  { img: takeSplash,   alt: "TAKE App – Splash Screen" },
  { img: takeLogin,    alt: "TAKE App – Benutzerkonto" },
  { img: takeOrder,    alt: "TAKE App – Bestellart wählen" },
  { img: takeBranches, alt: "TAKE App – 4 Standorte" },
  { img: takeMenu,     alt: "TAKE App – Speisekarte" },
];

// ─── Feature Cards with Screenshots ──────────────────────────────────────────
const featureCards: {
  img: string | null;
  imgAlt?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
}[] = [
  {
    img: mockMenu,
    imgAlt: "Gastro Master App – Dynamische Speisekarte",
    icon: RefreshCw,
    title: "Dynamische Speisekarte",
    text: "Preise, Gerichte und Verfügbarkeiten in Echtzeit ändern – kein Entwickler, kein Ticket, kein Warten.",
  },
  {
    img: mockLieferart,
    imgAlt: "Gastro Master App – Lieferung oder Abholung wählen",
    icon: MapPin,
    title: "Lieferung & Abholung",
    text: "Kunden wählen selbst. Lieferzonen, Mindestbestellwerte und Öffnungszeiten stellst du einfach selbst ein.",
  },
  {
    img: mockFilialen,
    imgAlt: "Gastro Master App – Mehrere Standorte / Filialen",
    icon: Users,
    title: "Mehrere Standorte",
    text: "Alle Filialen in einer App. Kunden wählen ihren Standort – du steuerst alles zentral.",
  },
  {
    img: mockLogin,
    imgAlt: "Gastro Master App – Kunden-Login & Registrierung",
    icon: Star,
    title: "Kunden-Login & Treue",
    text: "Bestellhistorie, Punkte sammeln, Prämien einlösen – direkt in der App. Stammkunden kommen öfter.",
  },
  {
    img: mockPush,
    imgAlt: "Gastro Master App – Push Notifications",
    icon: Bell,
    title: "Push Notifications",
    text: "Erinnere deine Kunden an Angebote, neue Gerichte und Aktionen – direkt auf ihr Smartphone. Kostenlos, in Echtzeit.",
  },
  {
    img: mockZahlung,
    imgAlt: "Gastro Master App – Online-Zahlung & Kasse",
    icon: CreditCard,
    title: "Online-Zahlung & Kasse",
    text: "Apple Pay, Google Pay, Kreditkarte und PayPal – alle gängigen Zahlungsarten direkt in der App. Sicher, schnell, ohne Umwege.",
  },
  {
    img: mockAppStore,
    imgAlt: "Gastro Master App – Eigene App im Apple App Store und Google Play Store",
    icon: Smartphone,
    title: "Deine App im App Store",
    text: "Deine App erscheint unter deinem Namen im Apple App Store und Google Play Store – vollständig eigenes Branding, 0 % Gastro Master sichtbar für deine Kunden.",
  },
];

const featurePills = [
  { icon: Bell,       label: "Push Notifications", iosAndroid: false },
  { icon: CreditCard, label: "Online-Bezahlung",   iosAndroid: false },
  { icon: null,       label: "iOS & Android",      iosAndroid: true  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { initials: "HL", quote: "In der Zukunft wird immer mehr online bestellt und wir wollen auch dabei sein.", name: "Ha Lim Lee", restaurant: "Kojo Sushi", logo: logoKojo },
  { initials: "MG", quote: "Also der Support ist einfach 1a und den würdest du nirgend wo anders so bekommen!", name: "Marco Greco", restaurant: "Pizzeria Il Sorriso", logo: logoIlSorriso },
  { initials: "SH", quote: "Man hat hier einen schnellen und guten WhatsApp Support und die Möglichkeit seinen Betrieb zu strukturieren.", name: "Sven Heinrich", restaurant: "61 Burger & More", logo: logoBurger },
  { initials: "GM", quote: "Wir haben durch die App viel mehr Kunden und Reichweite gewonnen.", name: "Georgios Madatsidis", restaurant: "Artemis Grill", logo: logoArtemis },
];

// ─── Steps ────────────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Beratungsgespräch & Konfiguration", text: "Wir besprechen gemeinsam, wie deine App aussehen soll: Name, Logo, Farben, Speisekarte, Liefergebiete, Zahlungsmethoden. Kein Technik-Vorwissen nötig." },
  { num: "02", title: "Wir richten alles ein", text: "Unser Team konfiguriert deine App, richtet den Webshop ein und stellt sicher, dass alles reibungslos läuft. Du musst nichts selbst programmieren oder hochladen." },
  { num: "03", title: "Live im App Store & erste Bestellungen", text: "Nach 2–3 Wochen ist deine App live im Apple App Store und Google Play Store. Ab sofort bestellst du direkt – 0 % Provision, 100 % dein Umsatz." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const AppPage = () => {
  useEffect(() => {
    document.title = "Eigene Bestell-App für die Gastronomie – 0 % Provision | Gastro Master";
  }, []);

  return (
    <div className="min-h-screen bg-[#0A264A]">
      <Navbar />

      {/* ── S1: HERO ────────────────────────────────────────────── */}
      <section className="mesh-gradient flex flex-col pt-24 md:pt-28 pb-6 relative overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#007DCF]/10 blur-[160px] pointer-events-none" />

        {/* ── Headline ── */}
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10 pb-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5"
          >
            Bestell-App für Gastronomie
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight"
          >
            Deine eigene Bestell App –{" "}
            <span className="text-gradient-brand">ohne Provision,</span>{" "}
            ohne Abhängigkeit.
          </motion.h1>
        </div>

        {/* ── 5 iPhone Mockups – full width ── */}
        <div className="relative z-10 w-full">
          <HeroPhoneSpread />
        </div>

        {/* ── Subtitle + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl mx-auto px-5 text-center relative z-10 pt-2 pb-4 flex flex-col items-center gap-6"
        >
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Über 700 Gastronomen bestellen bereits über ihre eigene App – inklusive iOS & Android App, Webshop und eigenem Branding.
          </p>

          <motion.button
            onClick={() => { window.location.href = "/#kontakt"; }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group"
          >
            Kostenlose Beratung
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </section>

      {/* ── S2: TRUST BAR ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 md:gap-6 items-center">
          {/* Links: 0 % */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1.5 leading-none">0 %</p>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">Provision auf Bestellungen</p>
          </motion.div>

          {/* Mitte: iOS + Android Icons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07, duration: 0.5 }}
            className="text-center flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-4">
              <img src={iosIcon}     alt="Apple App Store"   className="w-20 h-20 md:w-24 md:h-24 object-contain" />
              <img src={androidIcon} alt="Google Play Store" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
            </div>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">App Store & Play Store</p>
          </motion.div>

          {/* Rechts: 700+ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1.5 leading-none">700+</p>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">Aktive Kunden</p>
          </motion.div>
        </div>
      </section>

      {/* ── S3: VERGLEICH ───────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Vergleich</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Alle Vorteile auf einen Blick.
            </h2>
            <p className="text-white/45 mt-5 text-lg leading-relaxed max-w-2xl mx-auto">
              Wer über Lieferando, Wolt oder Uber Eats verkauft, zahlt bis zu 30 % Provision – jeden Monat, automatisch, ohne Verhandlung. Mit Gastro Master behältst du 100 % deines Umsatzes.
            </p>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* LEFT – Andere Plattformen */}
            <GlowCard
              glowRgb="239,68,68"
              className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#1a0a0a]/80 to-[#0d0808]/60 backdrop-blur-xl p-6 md:p-8"
              motionProps={{
                initial: { opacity: 0, x: -24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-red-500/15 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-white mb-5 relative z-10">
                Andere Lieferplattformen
              </h3>
              <ul className="space-y-3 relative z-10">
                {[
                  "Lange Vertragsbindung – oft 12 bis 24 Monate",
                  "14–30 % Gewinnverlust durch Provisionen pro Bestellung",
                  "Komplizierter Support, häufig im Ausland",
                  "Vollständig abhängig von Plattform-Regeln und Preisen",
                  "Schwer erreichbar – kein persönlicher Ansprechpartner",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mt-0.5">
                      <span className="text-red-400 text-xs font-black leading-none">✕</span>
                    </span>
                    <span className="text-white/65 text-sm md:text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>

            {/* RIGHT – Mit Gastro Master */}
            <GlowCard
              glowRgb="34,197,94"
              className="rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#071a10]/80 to-[#040f0a]/60 backdrop-blur-xl p-6 md:p-8"
              motionProps={{
                initial: { opacity: 0, x: 24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/12 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-white mb-5 relative z-10">
                Mit Gastro Master
              </h3>
              <ul className="space-y-3 relative z-10">
                {[
                  "Monatliche Kündigung möglich – keine Mindestlaufzeit",
                  "0 % Provision auf alle Bestellungen – du behältst deinen Umsatz",
                  "100 % unabhängig – volle Kontrolle über dein System und deine Preise",
                  "Support direkt in Deutschland – schnell und persönlich",
                  "Persönliche Hilfe per Telefon und WhatsApp",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                      <span className="text-emerald-400 text-xs font-black leading-none">✓</span>
                    </span>
                    <span className="text-white/65 text-sm md:text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </div>
      </section>

      <CalculatorSection />

      {/* ── PREISE ──────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-7 max-w-2xl"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Transparente Preise</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              Alles inklusive. Keine versteckten Kosten.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed">
              Ein fester Monatsbeitrag – keine Provision, keine Mindestlaufzeit, keine Abhängigkeit.
            </p>
          </motion.div>

          {/* Haupt-Paket – volle Breite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl bg-[#0A264A] border border-cyan-brand/20 p-8 md:p-10 mb-5"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              {/* Preis */}
              <div className="md:w-64 flex-shrink-0">
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Hauptpaket</span>
                <h3 className="text-white font-black text-2xl mb-3">App + Webshop</h3>
                <div className="flex items-end gap-2">
                  <span className="text-[#ED8400] font-black text-5xl leading-none">150 €</span>
                  <span className="text-white/40 text-sm mb-1">/ Monat (netto)</span>
                </div>
              </div>

              {/* Feature-Liste – einzelne Spalte */}
              <div className="flex-1">
                <ul className="space-y-2.5">
                  {[
                    "iOS & Android App",
                    "Webshop",
                    "Push Notifications",
                    "Kundenpunkte-System",
                    "Multi-Standort",
                    "Eigenes Branding",
                    "Support inklusive",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-white/75 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* iOS & Android Icons – eigene Spalte, zentriert zwischen Features und Button */}
              <div className="flex-shrink-0 flex items-center gap-5">
                {[
                  { src: iosIcon,     alt: "Apple App Store"   },
                  { src: androidIcon, alt: "Google Play Store" },
                ].map(icon => (
                  <div key={icon.alt} className="relative">
                    <div className="absolute inset-0 rounded-full bg-cyan-brand/35 blur-3xl scale-[2] pointer-events-none" />
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="relative w-32 h-32 object-contain drop-shadow-[0_0_24px_rgba(0,125,207,0.85)]"
                    />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <motion.button
                  onClick={() => { window.location.href = "/#kontakt"; }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#ED8400] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#ED8400]/30 whitespace-nowrap"
                >
                  Kostenlose Beratung
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 3 Add-ons */}
          <div className="grid md:grid-cols-3 gap-5">

            {/* Add-on 1: Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Add-on</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">Professionelle Website</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">+ 49 €</span>
                <span className="text-[#0A264A]/40 dark:text-white/40 text-sm"> / Monat</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed flex-1">
                Dein digitales Aushängeschild – eine eigenständige Gastro-Website mit Bildergalerie, Kontaktformular und Google Maps. Anders als der Webshop informiert die Website über dein Restaurant, während der Webshop direkt Bestellungen entgegennimmt.
              </p>
              <button
                onClick={() => { window.location.href = "/produkte/webseite"; }}
                className="mt-5 text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Add-on 2: Transaktionsumlage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Add-on</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">Transaktions-Umlage</h3>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed mb-5 flex-1">
                Die Transaktionsgebühren der Zahlungsanbieter trägt nicht du als Betreiber – sondern dein Kunde. Die Gebühr wird transparent beim Checkout ausgewiesen. Du erhältst deinen vollen Umsatz, ohne versteckte Kosten.
              </p>
              {/* Payment Logos */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {[
                  { src: payPaypal,     alt: "PayPal",      h: "h-9"  },
                  { src: payApple,      alt: "Apple Pay",   h: "h-9"  },
                  { src: payGoogle,     alt: "Google Pay",  h: "h-7"  },
                  { src: payVisa,       alt: "Visa",        h: "h-7"  },
                  { src: payMastercard, alt: "Mastercard",  h: "h-7"  },
                  { src: payKlarna,     alt: "Klarna",      h: "h-7"  },
                ].map(p => (
                  <motion.img
                    key={p.alt}
                    src={p.src}
                    alt={p.alt}
                    className={`${p.h} object-contain`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  />
                ))}
              </div>
              <button
                onClick={() => { window.location.href = "/produkte/transaktionsumlage"; }}
                className="text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Add-on 3: QR-Code Flyer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest">Add-on</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">2.500 gratis</span>
              </div>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">QR-Code Flyer</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">ab 65 €</span>
                <span className="text-[#0A264A]/40 dark:text-white/40 text-sm"> / 2.500 Stück</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed flex-1">
                Flyer sind das wirksamste Mittel, um Kunden zum Scannen deines QR-Codes zu bewegen. Professionell doppelseitig gedruckte DIN-A6-Flyer mit deinem Branding – ideal als Lieferbeigabe, für den Mitnehm-Bereich an der Kasse oder zum Verteilen. Die ersten 2.500 Flyer sind mit jedem Abo kostenfrei, inklusive kostenloser PDF-Vorlage. Wenn du nachbestellst, sobald dein Vorrat zur Neige geht:
              </p>
              <FlyerPriceList />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── S4: FEATURES ────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-10 max-w-2xl"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Funktionsumfang</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              Was deine Gastro Master Bestell-App kann.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed">
              Deine App – mit deinem Namen, deinem Branding und den Funktionen, die Lieferdienste und Restaurants im Alltag wirklich brauchen.
            </p>
          </motion.div>

          {/* 7 Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-7">
            {featureCards.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] rounded-2xl overflow-hidden hover:border-cyan-brand/30 transition-all duration-300"
              >
                {/* Screenshot oder Icon-Container */}
                {f.img ? (
                  <div className="aspect-[9/14] overflow-hidden bg-white dark:bg-black">
                    <img
                      src={f.img}
                      alt={f.imgAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[9/14] flex items-center justify-center bg-cyan-brand/10 dark:bg-cyan-brand/5">
                    <f.icon className="w-12 h-12 text-cyan-brand opacity-60" strokeWidth={1.5} />
                  </div>
                )}
                {/* Text */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <f.icon className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                    <h3 className="text-[#0A264A] dark:text-white font-bold text-sm leading-snug">{f.title}</h3>
                  </div>
                  <p className="text-[#0A264A]/55 dark:text-white/45 text-sm leading-relaxed">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {featurePills.map(p => (
              <div
                key={p.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A264A]/[0.06] dark:bg-white/[0.07] border border-[#0A264A]/10 dark:border-white/10 text-[#0A264A]/70 dark:text-white/60 text-sm"
              >
                {p.iosAndroid ? (
                  <>
                    <img src={iosIcon}     alt="iOS"     className="w-3.5 h-3.5 object-contain" />
                    <img src={androidIcon} alt="Android" className="w-3.5 h-3.5 object-contain" />
                  </>
                ) : (
                  p.icon && <p.icon className="w-3.5 h-3.5 text-cyan-brand" strokeWidth={2} />
                )}
                {p.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TARGET GROUP ────────────────────────────────────────── */}
      <TargetGroupSection />

      {/* ── S5: HOW IT WORKS ────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">So einfach geht's</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              In 3 Schritten zu deiner eigenen Gastro-App.
            </h2>
            <p className="text-white/45 mt-5 text-lg max-w-xl mx-auto leading-relaxed">
              Du musst kein Entwickler sein. Wir übernehmen alles – du gibst die Richtung vor.
            </p>
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
                <span className="text-[80px] md:text-[96px] font-black text-white/[0.05] leading-none block mb-5 select-none">{step.num}</span>
                <div className="w-8 h-8 rounded-lg bg-cyan-brand/15 border border-cyan-brand/30 flex items-center justify-center mb-4 -mt-10 relative z-10">
                  <span className="text-cyan-brand text-xs font-black">{parseInt(step.num)}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">{step.title}</h3>
                <p className="text-white/50 leading-relaxed text-base">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: TAKE CASE STUDY + TESTIMONIALS ──────────────────── */}
      <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Social Proof</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              700+ Gastronomen, die bereits ihre eigene App betreiben.
            </h2>
          </motion.div>

          {/* TAKE Case Study — Visual Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#0A264A]/50 border border-white/[0.08] rounded-3xl p-8 md:p-12 mb-16"
          >
            {/* Logo + Headline */}
            <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
              <img src={takeLogoImg} alt="TAKE – The Good Food Logo" className="h-10 object-contain" loading="lazy" />
              <div>
                <p className="text-white font-black text-xl md:text-2xl leading-tight">4 Standorte. Eine App. Komplett eigenes Branding.</p>
              </div>
            </div>

            {/* Location Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "📍 Düsseldorf – Flügelstraße",
                "📍 Düsseldorf – Bolkerstraße",
                "📍 MG – Waldnieler Str.",
                "📍 MG – Wilhelm-Schiffer-Str.",
              ].map(loc => (
                <span key={loc} className="rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-white/70 text-sm">
                  {loc}
                </span>
              ))}
            </div>

            {/* Horizontal Screenshot Scroll */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4 w-max">
                {[takeSplash, takeLogin, takeOrder, takeBranches, takeMenu].map((img, i) => (
                  <div key={i} className="w-[110px] md:w-[130px] flex-shrink-0 rounded-[1.8rem] overflow-hidden border-[4px] border-white/10 shadow-lg shadow-black/30 aspect-[9/19]">
                    <img src={img} alt={`TAKE App Screenshot ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Testimonials 2x2 */}
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#FBA200] text-[#FBA200]" />
                  ))}
                </div>
                <p className="text-white/70 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {/* Initialen Avatar */}
                  <div className="w-10 h-10 rounded-full bg-cyan-brand/20 border border-cyan-brand/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-brand text-xs font-black">{t.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.restaurant}</p>
                  </div>
                  <img src={t.logo} alt={t.restaurant} className="h-6 object-contain opacity-50 flex-shrink-0" loading="lazy" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "700+",       label: "aktive Gastro Master Kunden" },
              { value: "0 %",        label: "Provision auf Direktbestellungen" },
              { value: "2–3 Wo.",    label: "bis zur fertigen App im Store" },
              { value: "150 € / Mo", label: "App + Webshop, netto" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl py-6 px-4"
              >
                <p className="text-2xl md:text-3xl font-black text-white mb-1.5 leading-none">{s.value}</p>
                <p className="text-white/40 text-xs leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: FAQ ─────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Häufige Fragen zur Gastro Master Bestell-App.
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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S8: FINAL CTA ───────────────────────────────────────── */}
      <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A264A] via-[#081628] to-[#020c1b] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#007DCF]/8 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-6 block">Jetzt starten</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.06] mb-6">
              Bereit, endlich ohne<br className="hidden md:block" /> Provision zu verkaufen?
            </h2>
            <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Mehr als 700 Gastronomen haben den Schritt gemacht. Deine eigene Bestell-App, im App Store unter deinem Namen, in 2–3 Wochen live.
            </p>
            <motion.button
              onClick={() => { window.location.href = "/#kontakt"; }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px 12px rgba(237,132,0,0.5), 0 0 80px 20px rgba(237,132,0,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ED8400] text-white font-black px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 shadow-xl shadow-[#ED8400]/30 group mb-8"
            >
              Jetzt kostenlose Demo anfragen
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12">
              {["Keine Langzeitbindung", "Keine Einrichtungsgebühr", "Persönliche Beratung auf Deutsch"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-white/40 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-brand" strokeWidth={2} /> {t}
                </span>
              ))}
            </div>
            <p className="text-white/30 text-sm">
              Du möchtest die App erst ausprobieren?{" "}
              <a href="https://apps.apple.com/us/app/gastro-master-app/id1459431720" target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:text-cyan-brand/80 underline transition-colors">Demo-App im App Store</a>{" "}
              oder{" "}
              <a href="https://play.google.com/store/apps/details?id=com.epitglobal.gastromasterapp" target="_blank" rel="noopener noreferrer" className="text-cyan-brand hover:text-cyan-brand/80 underline transition-colors">Google Play Store</a>{" "}
              kostenlos herunterladen.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppPage;

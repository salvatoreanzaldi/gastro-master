import React, { useState, useEffect } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2,
  Star, CreditCard, Globe, FileText, MapPin, Users, RefreshCw, Search, type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CalculatorSection from "@/components/landing/CalculatorSection";
import TargetGroupSection from "@/components/landing/TargetGroupSection";

// ─── Assets ──────────────────────────────────────────────────────────────────
import phone1 from "@/assets/mockups/1 - Mock Up Small.png";
import phone2 from "@/assets/mockups/2 - Mock Up - Medium.png";
import phone3 from "@/assets/mockups/3 - Mock Up - Large.png";
import phone4 from "@/assets/mockups/4 - Mock Up Medium.png";
import phone5 from "@/assets/mockups/5 - Mock Up Small.png";
import heroWebshop from "@/assets/heroes/Hero - Webshop.png";
import logoKojo      from "@/assets/logos/kunden/logo-kojo-sushi.png";
import logoIlSorriso from "@/assets/logos/kunden/logo-il-sorriso.png";
import logoBurger    from "@/assets/logos/kunden/logo-burger-brothers.png";
import logoArtemis   from "@/assets/logos/kunden/logo-artemis.png";
import payPaypal     from "@/assets/logos/partner/partner-paypal.png";
import payApple      from "@/assets/logos/payment/Logo - Apple Pay.png";
import payGoogle     from "@/assets/logos/payment/pay-google.png";
import payVisa       from "@/assets/logos/payment/pay-visa.png";
import payMastercard from "@/assets/logos/payment/pay-mastercard.png";
import payKlarna     from "@/assets/logos/payment/pay-klarna.png";
import mockStart     from "@/assets/screenshots/take-startbild.jpeg";
import mockMenu      from "@/assets/screenshots/take-menu.jpeg";
import mockBestart   from "@/assets/screenshots/take-bestellart.jpeg";
import mockFilialen  from "@/assets/screenshots/take-filialen.jpeg";
import teamReneImg      from "@/assets/team/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team/team-andrej-krutsch.png";
import teamMohammadImg  from "@/assets/team/team-mohammad-motakalemi.png";

// ─── Schema ──────────────────────────────────────────────────────────────────
const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
    { "@type": "ListItem", position: 3, name: "Webshop", item: "https://gastro-master.de/produkte/webshop" },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Brauche ich eine eigene Domain für meinen Webshop?",
    a: "Nein, eine eigene Domain ist keine Voraussetzung. Du kannst deinen Webshop direkt über eine Gastro Master Subdomain starten. Wenn du jedoch eine eigene Domain nutzen möchtest – z.B. pizza-xyz.de/bestellen – richten wir das für dich ein. Eine eigene Domain stärkt dein Branding und verbessert dein Google-Ranking.",
  },
  {
    q: "Kann ich die Speisekarte jederzeit selbst ändern?",
    a: "Ja. Preise, Gerichte, Kategorien und Verfügbarkeiten kannst du jederzeit über das einfache Backend in Echtzeit ändern – ohne Programmierkenntnisse und ohne Wartezeit. Kein Ticket, kein Support nötig.",
  },
  {
    q: "Welche Zahlungsmethoden werden unterstützt?",
    a: "Dein Webshop unterstützt alle gängigen Zahlungsmethoden: Apple Pay, Google Pay, Kreditkarte (Visa, Mastercard), PayPal und Klarna. Die Transaktionsgebühren können optional über die Transaktions-Umlage an den Kunden weitergegeben werden.",
  },
  {
    q: "Wie lange dauert die Einrichtung des Webshops?",
    a: "In der Regel dauert die Einrichtung 3–7 Werktage. In dieser Zeit konfigurieren wir gemeinsam dein Design, die Speisekarte, Liefergebiete und Zahlungsmethoden. Du musst nichts selbst programmieren – wir übernehmen alles.",
  },
  {
    q: "Gibt es einen Vertrag mit Mindestlaufzeit?",
    a: "Nein. Du kannst monatlich kündigen – ohne Mindestlaufzeit. Es gibt keine versteckten Gebühren und keine Provision pro Bestellung. Nur der feste Monatsbeitrag von 79 € (netto). Eine Übersicht aller Pakete findest du auf der [Preisseite](/preise).",
  },
  {
    q: "Was ist der Unterschied zwischen Webshop und App?",
    a: "Der Webshop öffnet direkt im Browser – deine Kunden müssen nichts herunterladen. Die [eigene Bestell-App](/produkte/app) erscheint dagegen unter deinem Namen im Apple App Store und Google Play Store. Beide Produkte nutzen dasselbe Bestellsystem. Viele unserer Kunden starten mit dem Webshop und upgraden später auf die App. App + Webshop zusammen gibt es ab 149 € / Monat.",
  },
  {
    q: "Helft ihr mir auch dabei, auf Google besser gefunden zu werden?",
    a: "Ja. Dein Webshop ist technisch SEO-optimiert – mit Titel-Tags, Meta-Beschreibungen und strukturierten Daten, die Google versteht. Wir unterstützen dich außerdem beim Einrichten oder Optimieren deines Google Business Profils, sodass Kunden deinen Shop direkt aus der Google-Suche aufrufen können.",
  },
];

// ─── FAQPage Schema (built after faqs array) ─────────────────────────────────
const SCHEMA_FAQ_WEBSHOP = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── Cursor-Tracking Glow Card ────────────────────────────────────────────────
const GlowCard = ({
  children,
  glowRgb,
  className,
  motionProps,
}: {
  children: React.ReactNode;
  glowRgb: string;
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

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const renderFaqLinks = (text: string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={m[2]} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

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
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl">{renderFaqLinks(a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Hero Phone Spread (Scroll-driven) ───────────────────────────────────────
const heroPhoneData = [
  { src: phone1, alt: "Gastro Master Webshop – Startseite",       targetX: -330, targetScale: 0.80, zIndex: 1 },
  { src: phone2, alt: "Gastro Master Webshop – Speisekarte",      targetX: -165, targetScale: 0.90, zIndex: 3 },
  { src: phone3, alt: "Gastro Master Webshop – Online bestellen", targetX:    0, targetScale: 1.00, zIndex: 5 },
  { src: phone4, alt: "Gastro Master Webshop – Bestellart",       targetX:  165, targetScale: 0.90, zIndex: 3 },
  { src: phone5, alt: "Gastro Master Webshop – Filialen",         targetX:  330, targetScale: 0.80, zIndex: 1 },
];

function PhoneScrollItem({
  src, alt, targetX, targetScale, zIndex, spread,
}: {
  src: string; alt: string; targetX: number; targetScale: number; zIndex: number;
  spread: MotionValue<number>;
}) {
  const x     = useTransform(spread, [0, 250], [targetX * 0.55, targetX]);
  const scale = useTransform(spread, [0, 250], [targetScale * 0.92, targetScale]);
  return (
    <motion.div
      style={{ x, scale, zIndex, position: "absolute" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-[190px] md:w-[220px] lg:w-[260px] object-contain drop-shadow-2xl"
        loading="eager"
      />
    </motion.div>
  );
}

function HeroPhoneSpread() {
  const { scrollY } = useScroll();
  return (
    <div className="relative h-[420px] md:h-[480px] w-full flex items-center justify-center overflow-visible">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[480px] bg-cyan-brand/12 blur-[90px] rounded-full pointer-events-none z-0" />
      {heroPhoneData.map((p, i) => (
        <PhoneScrollItem key={i} spread={scrollY} {...p} />
      ))}
    </div>
  );
}

// ─── Feature Cards ────────────────────────────────────────────────────────────
const featureCards: {
  img: string | null;
  imgAlt?: string;
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    img: mockStart,
    imgAlt: "Gastro Master Webshop – Eigene Bestellseite",
    icon: Globe,
    title: "Deine eigene Bestellseite",
    text: "Deine Kunden bestellen direkt auf deiner Seite – z.B. pizza-xyz.de/bestellen. Keine App, kein Umweg über Drittanbieter.",
  },
  {
    img: mockMenu,
    imgAlt: "Gastro Master Webshop – Kein App-Download nötig",
    icon: Globe,
    title: "Kein App-Download nötig",
    text: "Der Webshop öffnet direkt im Browser – auf Smartphone, Tablet oder Desktop. Einfach Link teilen, fertig bestellt.",
  },
  {
    img: mockBestart,
    imgAlt: "Gastro Master Webshop – Lieferung und Abholung",
    icon: MapPin,
    title: "Lieferung & Abholung",
    text: "Deine Kunden wählen selbst: direkt nach Hause liefern oder im Restaurant abholen. Lieferzonen und Öffnungszeiten stellst du selbst ein.",
  },
  {
    img: mockFilialen,
    imgAlt: "Gastro Master Webshop – Filialen verwalten",
    icon: Users,
    title: "Multi-Standort & Filialen",
    text: "Mehrere Standorte? Kein Problem. Verwalte alle Filialen zentral über eine Oberfläche – ideal für Franchise-Konzepte.",
  },
  {
    img: null,
    icon: CreditCard,
    title: "Online-Zahlung",
    text: "Apple Pay, Google Pay, Kreditkarte und PayPal – alle gängigen Zahlungsarten direkt im Shop. Sicher, schnell, ohne Umwege.",
  },
  {
    img: null,
    icon: Globe,
    title: "Eigenes Branding",
    text: "Dein Logo, deine Farben, dein Name – der Webshop erscheint vollständig unter deiner Marke. 0 % Gastro Master sichtbar für deine Kunden.",
  },
  {
    img: null,
    icon: RefreshCw,
    title: "Speisekarte selbst verwalten",
    text: "Preise, Artikel und Kategorien jederzeit in Echtzeit ändern – kein Entwickler nötig, kein Warten auf Support.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { initials: "HL", quote: "In der Zukunft wird immer mehr online bestellt und wir wollen auch dabei sein.", name: "Ha Lim Lee", restaurant: "Kojo Sushi", logo: logoKojo },
  { initials: "MG", quote: "Also der Support ist einfach 1a und den würdest du nirgend wo anders so bekommen!", name: "Marco Greco", restaurant: "Pizzeria Il Sorriso", logo: logoIlSorriso },
  { initials: "SH", quote: "Man hat hier einen schnellen und guten WhatsApp Support und die Möglichkeit seinen Betrieb zu strukturieren.", name: "Sven Heinrich", restaurant: "61 Burger & More", logo: logoBurger },
  { initials: "GM", quote: "Wir haben durch die App viel mehr Kunden und Reichweite gewonnen.", name: "Georgios Madatsidis", restaurant: "Artemis Grill", logo: logoArtemis },
];

// ─── How it Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Kostenlose Beratung", text: "Wir besprechen gemeinsam, wie dein Webshop aussehen soll: Name, Logo, Farben, Speisekarte, Liefergebiete und Zahlungsmethoden. Kein Technik-Vorwissen nötig." },
  { num: "02", title: "Wir richten alles ein", text: "Unser Team konfiguriert deinen Webshop, richtet dein Branding ein und stellt sicher, dass alles reibungslos läuft. Du musst nichts selbst programmieren." },
  { num: "03", title: "Live – Kunden bestellen direkt", text: "Nach wenigen Werktagen ist dein Webshop live. Kunden bestellen direkt über den Link – kein Download, 0 % Provision, 100 % dein Umsatz." },
];

// ─── Team CTA ─────────────────────────────────────────────────────────────────
const teamMembers = [
  { img: teamReneImg,      name: "René Ebert",         role: "Gründer & Geschäftsführer" },
  { img: teamSalvatoreImg, name: "Salvatore Anzaldi",   role: "Head of Sales" },
  { img: teamAndrejImg,    name: "Andrej Krutsch",      role: "Head of Operations" },
  { img: teamMohammadImg,  name: "Mohammad Motakalemi", role: "Customer Success" },
];

const WebshopTeamCTA = () => {
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
          {/* Left: Text */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#0A264A]/[0.07] dark:bg-white/10 text-[#0A264A] dark:text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-8 w-fit">
              Jetzt durchstarten
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
              Bereit für deinen eigenen<br />Online-Bestellshop?
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">Das erwartet dich:</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              In einem kostenlosen Erstgespräch entwickelt einer unserer Experten ein individuelles Konzept für deinen eigenen Online-Bestellshop – mit deinem Branding, deiner Speisekarte und 0 % Provision. Unverbindlich und komplett kostenlos.
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              Dein Webshop kann bereits in wenigen Werktagen live sein. Keine Programmierkenntnisse nötig – wir übernehmen alles.
            </p>
            {/* Language pills */}
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
              Kostenlose Beratung anfragen
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Right: Team Slideshow */}
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
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
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
const WebshopPage = () => {
  useSeoMeta({
    title: "Bestellsystem Gastronomie — eigener Webshop ab 79 € | Gastro Master",
    description: "Digitales Bestellsystem für die Gastronomie ab 79 €/Monat — 0 % Provision, eigenes Branding. Unabhängig von Lieferando. Jetzt kostenlos beraten lassen.",
    canonical: "https://gastro-master.de/produkte/webshop",
  });

  return (
    <div className="min-h-screen bg-[#0A264A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ_WEBSHOP) }} />
      <Navbar />

      {/* ── S1: HERO ────────────────────────────────────────────── */}
      <section className="mesh-gradient flex flex-col pt-24 md:pt-28 pb-6 relative overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#007DCF]/10 blur-[160px] pointer-events-none" />

        {/* Headline */}
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10 pb-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5"
          >
            Online-Bestellshop für Gastronomie
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight"
          >
            Dein Bestellsystem für die Gastronomie –{" "}
            <span className="text-gradient-brand">ohne App, ohne Provision.</span>
          </motion.h1>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full mt-8 md:mt-12 px-5 md:px-8"
        >
          <img
            src={heroWebshop}
            alt="Gastro Master Bestellsystem auf Desktop, Laptop, Tablet und Smartphone"
            className="w-full max-w-5xl mx-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Subtitle + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl mx-auto px-5 text-center relative z-10 pt-8 md:pt-10 pb-4 flex flex-col items-center gap-6"
        >
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Ab 79 € pro Monat. Sofort online. Kein App-Download. Eigene Domain. Deine Kunden bestellen direkt – 0 % Provision, 100 % dein Umsatz.
          </p>

          <motion.button
            onClick={() => { window.location.href = "/kontakt"; }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group"
          >
            Kostenlose Beratung
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-1">
            {[
              "700+ aktive Kunden",
              "Kein Einrichtungsaufwand",
              "Ab 79 € / Monat",
              "Kein App-Download nötig",
            ].map(item => (
              <span key={item} className="flex items-center gap-1.5 text-white/40 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── S2: TRUST BAR ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-3 md:gap-6 items-center">
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

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07, duration: 0.5 }}
            className="text-center flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-cyan-brand/10 flex items-center justify-center">
              <Globe className="w-7 h-7 md:w-8 md:h-8 text-cyan-brand" strokeWidth={1.5} />
            </div>
            <p className="text-[#0A264A]/45 dark:text-white/40 text-sm leading-snug">Kein App-Download nötig</p>
          </motion.div>

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

      {/* ── S3: FEATURES ────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 pt-12 md:pt-16 pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-10 max-w-2xl"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Funktionsumfang</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              Was dein Gastro Master Webshop kann.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed">
              Dein Webshop – mit deinem Namen, deinem Branding und den Funktionen, die Gastronomen im Alltag wirklich brauchen. Kein App-Download, direkt im Browser.
            </p>
          </motion.div>

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
        </div>
      </section>

      {/* ── S4: SEO / ONLINE-PRÄSENZ ─────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-14 md:mb-20"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Online-Sichtbarkeit</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Wer nicht online ist, verliert jeden Tag Umsatz.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              9 von 10 Kunden suchen ein Restaurant zuerst bei Google, bevor sie bestellen. Restaurants ohne eigene Bestellseite sind für diese Kunden unsichtbar – und verlieren täglich Bestellungen an Wettbewerber, die online präsent sind. Mit deinem Gastro Master Webshop änderst du das. Wer zusätzlich einen{" "}
              <Link to="/loesungen/lieferservice-gruenden" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">eigenen Lieferdienst aufbauen</Link>{" "}
              möchte, findet in unserem Ratgeber alle Schritte.
            </p>
          </motion.div>

          {/* 3 Stats */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              { stat: "91 %",   desc: "der Kunden suchen ein Restaurant zuerst bei Google, bevor sie bestellen" },
              { stat: "+ 40 %", desc: "mehr Bestellungen erzielen Restaurants mit eigener Online-Bestellseite im Vergleich zu solchen ohne" },
              { stat: "28 %",   desc: "aller Google-Klicks entfallen auf den ersten Treffer – dein SEO-optimierter Webshop hilft dir dorthin" },
            ].map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-cyan-brand mb-4 leading-none">{item.stat}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-white/25 text-xs italic text-center mt-2 mb-12">
            Quellen: Think with Google Consumer Insights, Statista Online Food Delivery Outlook Deutschland 2025
          </p>

          {/* 3 Feature Bullets */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Search,
                title: "SEO-optimierte Bestellseite",
                text: "Dein Webshop ist von Google vollständig indexierbar – mit Titel-Tags, Meta-Beschreibungen und strukturierten Daten. Kunden finden dich direkt über die Suchmaschine.",
              },
              {
                Icon: MapPin,
                title: "Google Business Profile",
                text: "Wir helfen dir, deinen Google-Unternehmenseintrag zu optimieren, damit Kunden aus der Google-Suche direkt auf deinen Bestellshop klicken können.",
              },
              {
                Icon: Globe,
                title: "Eigene Domain",
                text: "Deine Bestellseite unter deiner eigenen Adresse – z.B. pizza-xyz.de/bestellen. Eine eigene Domain steigert das Vertrauen deiner Kunden und verbessert dein Google-Ranking.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-brand/15 flex items-center justify-center flex-shrink-0">
                  <item.Icon className="w-6 h-6 text-cyan-brand" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-14"
          >
            <motion.button
              onClick={() => { window.location.href = "/kontakt"; }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group"
            >
              Jetzt Sichtbarkeit steigern
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── S5: ZIELGRUPPE ──────────────────────────────────────── */}
      <TargetGroupSection />

      {/* ── S6: VERGLEICH ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Vergleich</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
              Alle Vorteile auf einen Blick.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 mt-5 text-lg leading-relaxed max-w-2xl mx-auto">
              Wer über Lieferando, Wolt oder Uber Eats verkauft, zahlt bis zu 30 % Provision – jeden Monat, automatisch, ohne Verhandlung. Mit Gastro Master behältst du 100 % deines Umsatzes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            <GlowCard
              glowRgb="239,68,68"
              className="rounded-3xl border border-red-400/40 bg-gradient-to-br from-red-100 to-red-50 dark:from-[#1a0a0a]/80 dark:to-[#0d0808]/60 backdrop-blur-xl p-6 md:p-8"
              motionProps={{
                initial: { opacity: 0, x: -24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-red-500/10 dark:bg-red-500/15 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white mb-5 relative z-10">
                Andere Lieferplattformen
              </h3>
              <ul className="space-y-3 relative z-10">
                {[
                  "Lange Vertragsbindung – oft 12 bis 24 Monate",
                  "14–30 % Gewinnverlust durch Provisionen pro Bestellung",
                  "Komplizierter Support, häufig im Ausland",
                  "Vollständig abhängig von Plattform-Regeln und Preisen",
                  "Kein Google-SEO-Vorteil für dein Restaurant",
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
                      <span className="text-red-500 dark:text-red-400 text-xs font-black leading-none">✕</span>
                    </span>
                    <span className="text-[#0A264A]/70 dark:text-white/65 text-sm md:text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>

            <GlowCard
              glowRgb="34,197,94"
              className="rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-[#071a10]/80 dark:to-[#040f0a]/60 backdrop-blur-xl p-6 md:p-8"
              motionProps={{
                initial: { opacity: 0, x: 24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/12 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-[#0A264A] dark:text-white mb-5 relative z-10">
                Mit Gastro Master Webshop
              </h3>
              <ul className="space-y-3 relative z-10">
                {[
                  "Monatliche Kündigung möglich – keine Mindestlaufzeit",
                  "0 % Provision auf alle Bestellungen – du behältst deinen Umsatz",
                  "100 % unabhängig – volle Kontrolle über dein System und deine Preise",
                  "Support direkt in Deutschland – schnell und persönlich",
                  "SEO-optimiert – dein Webshop wird von Google gefunden",
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
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-black leading-none">✓</span>
                    </span>
                    <span className="text-[#0A264A]/70 dark:text-white/65 text-sm md:text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ── S7: CALCULATOR ──────────────────────────────────────── */}
      <div className="relative">
        <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10">
          <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
            Mit Lieferando
          </span>
        </div>
        <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center z-10">
          <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
            Mit Gastro Master
          </span>
        </div>
        <CalculatorSection />
      </div>

      {/* ── S8: TESTIMONIALS ────────────────────────────────────── */}
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
              700+ Gastronomen, die bereits direkt online bestellen lassen.
            </h2>
          </motion.div>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "700+",      label: "aktive Gastro Master Kunden" },
              { value: "0 %",       label: "Provision auf Direktbestellungen" },
              { value: "3–7 Tage",  label: "bis der Webshop live ist" },
              { value: "79 € / Mo", label: "Online-Bestellshop, netto" },
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

      {/* ── S9: PREISE ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
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
              Ein fester Monatsbeitrag – keine Provision, keine Mindestlaufzeit, keine Abhängigkeit. Für den Tischbetrieb ergänzt das{" "}
              <Link to="/produkte/kassensystem" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">TSE-konforme Kassensystem</Link>{" "}
              deinen Webshop perfekt.
            </p>
          </motion.div>

          {/* Hauptpaket */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl bg-[#0A264A] border border-cyan-brand/20 p-8 md:p-10 mb-5 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="md:w-64 flex-shrink-0">
                <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Hauptpaket</span>
                <h3 className="text-white font-black text-2xl mb-3">Online-Bestellshop</h3>
                <div className="flex items-end gap-2">
                  <span className="text-[#ED8400] font-black text-5xl leading-none">79 €</span>
                  <span className="text-white/40 text-sm mb-1">/ Monat (netto)</span>
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-2.5">
                  {[
                    "Eigene Bestellseite (deine Domain)",
                    "Eigenes Branding (Logo, Farben, Name)",
                    "Alle gängigen Zahlungsarten",
                    "Lieferung & Abholung",
                    "Multi-Standort & Filialen",
                    "SEO-optimiert für Google",
                    "Support inklusive",
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2 text-white/75 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-brand flex-shrink-0" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-shrink-0">
                <motion.button
                  onClick={() => { window.location.href = "/kontakt"; }}
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

          {/* Add-ons */}
          <div className="grid md:grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Upgrade</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">iOS & Android App</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">+ 70 €</span>
                <span className="text-[#0A264A]/40 dark:text-white/40 text-sm"> / Monat</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed flex-1">
                Upgrade auf die vollständige App-Lösung: deine eigene App erscheint unter deinem Namen im Apple App Store und Google Play Store. Gemeinsam mit dem Webshop für 149 € / Monat.
              </p>
              <button
                onClick={() => { window.location.href = "/produkte/bestellapp"; }}
                className="mt-5 text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Add-on</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">Professionelle Website</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">+ 49 €</span>
                <span className="text-[#0A264A]/40 dark:text-white/40 text-sm"> / Monat</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed flex-1">
                Dein digitales Aushängeschild – eine eigenständige Restaurant-Website mit Bildergalerie, Kontaktformular und Google Maps. Informiert Besucher, während der Webshop Bestellungen entgegennimmt.
              </p>
              <button
                onClick={() => { window.location.href = "/produkte/webseite"; }}
                className="mt-5 text-cyan-brand text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="rounded-2xl bg-[#0A264A]/[0.04] dark:bg-[#1f2937] border border-[#0A264A]/10 dark:border-white/[0.08] p-7 flex flex-col"
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Add-on</span>
              <h3 className="text-[#0A264A] dark:text-white font-black text-lg mb-2">Transaktions-Umlage</h3>
              <div className="my-3">
                <span className="text-[#0A264A] dark:text-white font-black text-2xl">Variabel</span>
              </div>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-sm leading-relaxed mb-5 flex-1">
                Die Transaktionsgebühren der Zahlungsanbieter trägt nicht du als Betreiber – sondern dein Kunde. Die Gebühr wird transparent beim Checkout ausgewiesen.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {[
                  { src: payPaypal,     alt: "PayPal",     h: "h-12" },
                  { src: payApple,      alt: "Apple Pay",  h: "h-12" },
                  { src: payGoogle,     alt: "Google Pay", h: "h-7"  },
                  { src: payVisa,       alt: "Visa",       h: "h-7"  },
                  { src: payMastercard, alt: "Mastercard", h: "h-7"  },
                  { src: payKlarna,     alt: "Klarna",     h: "h-7"  },
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
          </div>
        </div>
      </section>

      {/* ── S10: HOW IT WORKS ───────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">So einfach geht's</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight">
              In 3 Schritten zu deiner eigenen Bestellseite.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 mt-5 text-lg max-w-xl mx-auto leading-relaxed">
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
                className="relative group"
              >
                <span className="text-[96px] md:text-[112px] font-black leading-none block mb-3 select-none text-cyan-brand/25 group-hover:text-cyan-brand/60 transition-colors duration-300 group-hover:drop-shadow-[0_0_40px_rgba(0,125,207,0.7)]">{step.num}</span>
                <h3 className="text-xl font-bold text-[#0A264A] dark:text-white mb-4 leading-snug -mt-4">{step.title}</h3>
                <p className="text-[#0A264A]/60 dark:text-white/50 leading-relaxed text-base">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S11: FAQ ────────────────────────────────────────────── */}
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
                Häufige Fragen zum Gastro Master Webshop.
              </h2>
              <p className="text-white/40 mt-6 text-base leading-relaxed">
                Weitere Fragen? Ruf uns an oder schreib uns – wir antworten innerhalb von 24 Stunden.
              </p>
              <button
                onClick={() => { window.location.href = "/kontakt"; }}
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

      {/* ── S12: FINAL CTA ──────────────────────────────────────── */}
      <WebshopTeamCTA />

      <Footer />
    </div>
  );
};

export default WebshopPage;

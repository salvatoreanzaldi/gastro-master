import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight, Plus, Minus, CheckCircle2,
  Bell, Star, RefreshCw, Users,
  CreditCard, MapPin, Smartphone, Palette, type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CalculatorSection from "@/components/landing/CalculatorSection";
import TargetGroupSection from "@/components/landing/TargetGroupSection";

// ─── Assets ──────────────────────────────────────────────────────────────────
import iosIcon          from "@/assets/IOS 26 icon.png";
import androidIcon      from "@/assets/Android Icon.png";
import phone1 from "@/assets/1 - Mock Up Small.png";
import phone2 from "@/assets/2 - Mock Up - Medium.png";
import phone3 from "@/assets/3 - Mock Up - Large.png";
import phone4 from "@/assets/4 - Mock Up Medium.png";
import phone5 from "@/assets/5 - Mock Up Small.png";
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
import mockBranding  from "@/assets/Mock Up - Branding Hero.png";
import payGoogle     from "@/assets/pay-google.png";
import payVisa       from "@/assets/pay-visa.png";
import payMastercard from "@/assets/pay-mastercard.png";
import payKlarna     from "@/assets/pay-klarna.png";
import appVideo          from "@/assets/App Werbe Video.mp4";
import iconAppStore      from "@/assets/Icon - Apple App Store.png";
import iconGooglePlay    from "@/assets/Icon - Google Play Store.png";
import socialInstagram from "@/assets/Icon - Instagram.png";
import socialFacebook  from "@/assets/Icon - Facebook.png";
import socialTikTok    from "@/assets/Icon - TikTok.png";
import socialYoutube   from "@/assets/Icon - Youtube.png";
import teamReneImg      from "@/assets/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team-andrej-krutsch.png";

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Wie lange dauert die Einrichtung einer eigenen Bestell-App?",
    a: "In der Regel dauert es 2–3 Wochen, bis deine App live im Apple App Store und Google Play Store verfügbar ist. In dieser Zeit konfigurieren wir gemeinsam mit dir das Design, die Speisekarte, Liefergebiete und Zahlungsmethoden. Du musst nichts selbst programmieren.",
  },
  {
    q: "Was kostet eine eigene Gastro-App?",
    a: "Die Gastro Master App inklusive Webshop kostet 149 € pro Monat (netto). Darin enthalten sind App-Hosting, App Store-Verwaltung, laufende Updates und Support. Es gibt keine Provision pro Bestellung – nur den festen Monatsbeitrag. Den Webshop ohne App gibt es bereits ab 79 € / Monat.",
  },
  {
    q: "Läuft die App unter meinem eigenen Namen im App Store?",
    a: "Ja, absolut. Deine App wird unter deinem Betriebsnamen, mit deinem Logo und deinen Farben im Apple App Store und Google Play Store veröffentlicht. Kein Gastro Master-Branding ist für deine Kunden sichtbar.",
  },
  {
    q: "Kann ich die App auch für mehrere Standorte nutzen?",
    a: "Ja. Die Gastro Master App ist für Einzelbetriebe und Franchise-Konzepte mit mehreren Standorten geeignet. Kunden wählen direkt in der App ihren Standort aus und bestellen dort. Die Plattform ist auf bis zu 100 Standorte ausgelegt – viele unserer Kunden betreiben bereits 10 oder mehr Filialen über eine einzige eigenbrandete App.",
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

// ─── Hero Phone Spread (Scroll-driven) ───────────────────────────────────────
const heroPhoneData = [
  { src: phone1, alt: "Gastro Master App",         targetX: -330, targetScale: 0.80, zIndex: 1 },
  { src: phone2, alt: "Et Manus Burger App",        targetX: -165, targetScale: 0.90, zIndex: 3 },
  { src: phone3, alt: "TAKE – The Good Food App",   targetX:    0, targetScale: 1.00, zIndex: 5 },
  { src: phone4, alt: "D&T Restaurants App",        targetX:  165, targetScale: 0.90, zIndex: 3 },
  { src: phone5, alt: "Bäckerei Zimmer App",        targetX:  330, targetScale: 0.80, zIndex: 1 },
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

// ─── Take Screenshots (TAKE Case Study) ──────────────────────────────────────

// ─── Feature Cards with Screenshots ──────────────────────────────────────────
const featureCards: {
  img: string | null;
  imgAlt?: string;
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    img: mockPush,
    imgAlt: "Gastro Master App – Push Notifications",
    icon: Bell,
    title: "Push Notifications",
    text: "Erinnere deine Kunden an Angebote, neue Gerichte und Aktionen – direkt auf ihr Smartphone. Kostenlos, in Echtzeit.",
  },
  {
    img: mockBranding,
    imgAlt: "Gastro Master App – Eigenes Branding, Logo und Farben",
    icon: Palette,
    title: "100 % Dein Branding",
    text: "Dein Logo, deine Farben, dein Name – die App sieht aus wie deine Marke. Kein fremdes Logo, kein Fremdbranding. Deine Kunden sehen nur dich.",
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
    img: mockMenu,
    imgAlt: "Gastro Master App – Dynamische Speisekarte",
    icon: RefreshCw,
    title: "Dynamische Speisekarte",
    text: "Preise, Gerichte und Verfügbarkeiten in Echtzeit ändern – kein Entwickler, kein Ticket, kein Warten.",
  },
  {
    img: mockLogin,
    imgAlt: "Gastro Master App – Kunden-Login & Registrierung",
    icon: Star,
    title: "Kunden-Login & Treue",
    text: "Bestellhistorie, Punkte sammeln, Prämien einlösen – direkt in der App. Stammkunden kommen öfter.",
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
const appTeamMembers = [
  { img: teamReneImg,      name: "René Ebert",       role: "Gründer & Geschäftsführer" },
  { img: teamSalvatoreImg, name: "Salvatore Anzaldi", role: "Head of Sales" },
  { img: teamAndrejImg,    name: "Andrej Krutsch",    role: "Head of Operations" },
];

const AppTeamCTA = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % appTeamMembers.length), 4000);
    return () => clearInterval(t);
  }, []);
  const member = appTeamMembers[current];
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
              Buche jetzt dein<br />kostenloses Beratungsgespräch.
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">Das erwartet dich:</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              In einem kostenlosen Erstgespräch entwickelt einer unserer App-Experten ein individuelles Konzept für deine eigene Bestell-App – mit deinem Branding, deiner Speisekarte und 0 % Provision. Unverbindlich und komplett kostenlos.
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              Deine App kann bereits in 2–3 Wochen live im Apple App Store und Google Play Store sein. Keine Programmierkenntnisse nötig – wir übernehmen alles.
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
              {appTeamMembers.map((_, i) => (
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

// ─── Video Section (iPhone Mockup + Play Button) ─────────────────────────────
const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* iPhone Mockup with Video */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center"
          >
            {/* iPhone frame */}
            <div className="relative w-[260px] md:w-[300px]">
              {/* Outer shell */}
              <div className="relative rounded-[44px] bg-[#1a1a1a] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
                {/* Side button highlights */}
                <div className="absolute -right-[3px] top-[100px] w-[3px] h-[40px] bg-[#2a2a2a] rounded-r-sm" />
                <div className="absolute -left-[3px] top-[90px] w-[3px] h-[32px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute -left-[3px] top-[134px] w-[3px] h-[32px] bg-[#2a2a2a] rounded-l-sm" />

                {/* Screen bezel */}
                <div className="rounded-[36px] overflow-hidden bg-black relative aspect-[9/19.5]">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[88px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a]" />
                  </div>

                  {/* Video */}
                  <video
                    ref={videoRef}
                    src={appVideo}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onEnded={() => setPlaying(false)}
                  />

                  {/* Play/Pause overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center z-10 cursor-pointer transition-all duration-300 ${playing ? "bg-transparent opacity-0 hover:opacity-100" : "bg-black/40"}`}
                    onClick={toggle}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
                      {playing ? (
                        <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                      ) : (
                        <svg className="w-6 h-6 text-white fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow below phone */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-cyan-brand/20 blur-2xl rounded-full pointer-events-none" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">Deine App in Aktion</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
              Sieh deine App in&nbsp;Aktion.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed mb-8">
              Über 700 Gastronomen in Deutschland nutzen bereits ihre eigene White-Label Bestell-App – mit eigenem Logo, eigenem Branding und 0&nbsp;% Provision. Sieh selbst, wie einfach und überzeugend eine eigene Bestell-App für deine Gäste ist.
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

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
        <div className="relative z-10 w-full mt-6 md:mt-8">
          <HeroPhoneSpread />
        </div>

        {/* ── Subtitle + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl mx-auto px-5 text-center relative z-10 pt-8 md:pt-10 pb-4 flex flex-col items-center gap-6"
        >
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Über 700 Gastronomen bestellen bereits über ihre eigene App – inklusive iOS & Android App, Webshop und eigenem Branding.
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

      {/* ── S3: VIDEO ───────────────────────────────────────────── */}
      <VideoSection />

      {/* ── S4: FEATURES ────────────────────────────────────────── */}
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
              Was deine Gastro Master Bestell-App kann.
            </h2>
            <p className="text-[#0A264A]/55 dark:text-white/50 text-lg leading-relaxed">
              Deine App – mit deinem Namen, deinem Branding und den Funktionen, die Lieferdienste und Restaurants im Alltag wirklich brauchen.
            </p>
          </motion.div>

          {/* 8 Feature Cards */}
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

      {/* ── S5: DEMO ────────────────────────────────────────────── */}
      <section className="bg-[#F0F4F8] dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-3 block">Demo verfügbar</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white leading-tight mb-2">
                Erlebe die App selbst – einfach herunterladen.
              </h2>
              <p className="text-[#0A264A]/55 dark:text-white/50 text-base leading-relaxed max-w-xl">
                Unsere Demo-App ist im Apple App Store und Google Play Store verfügbar. Lade sie herunter und erlebe die Bestellerfahrung deiner zukünftigen Kunden – direkt auf deinem Smartphone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="https://apps.apple.com/us/app/gastro-master-app/id1459431720"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-200"
              >
                <img src={iconAppStore} alt="Download im App Store" className="h-14 object-contain" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.epitglobal.gastromasterapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-200"
              >
                <img src={iconGooglePlay} alt="Jetzt bei Google Play" className="h-14 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: SOCIAL MEDIA ─────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
          >
            {/* Text */}
            <div className="flex-1">
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">Social Media Integration</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                Deine Social-Media-Kanäle direkt in deiner App.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                Verbinde Instagram, Facebook und TikTok mit deiner eigenen Bestell-App – und bleib mit deinen Gästen in Kontakt, auch nach der Bestellung. Mehr Reichweite, mehr Stammkunden, mehr Umsatz: Wer dir folgt, bestellt wieder. Eine starke Social-Media-Präsenz erhöht nachweislich die Wiederbestellrate und stärkt deine Marke langfristig.
              </p>
            </div>

            {/* Icons 2×2 Grid */}
            <div className="grid grid-cols-2 gap-5 flex-shrink-0">
              {[
                { src: socialInstagram, alt: "Instagram", label: "Instagram" },
                { src: socialFacebook,  alt: "Facebook",  label: "Facebook"  },
                { src: socialTikTok,    alt: "TikTok",    label: "TikTok"    },
                { src: socialYoutube,   alt: "YouTube",   label: "YouTube"   },
              ].map((s, i) => (
                <motion.div
                  key={s.alt}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.45 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="flex flex-col items-center gap-2 group cursor-default"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
                    <img
                      src={s.src}
                      alt={s.alt}
                      className="relative w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    />
                  </div>
                  <span className="text-white/50 text-xs font-medium group-hover:text-white/85 transition-colors duration-200">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S7: TARGET GROUP ────────────────────────────────────── */}
      <TargetGroupSection />

      {/* ── S8: VERGLEICH ───────────────────────────────────────── */}
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

      {/* ── S9: CALCULATOR ──────────────────────────────────────── */}
      <CalculatorSection />

      {/* ── S10: TESTIMONIALS ───────────────────────────────────── */}
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
              { value: "700+",       label: "aktive Gastro Master Kunden" },
              { value: "0 %",        label: "Provision auf Direktbestellungen" },
              { value: "2–3 Wo.",    label: "bis zur fertigen App im Store" },
              { value: "149 € / Mo", label: "App + Webshop, netto" },
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

      {/* ── S11: PREISE ─────────────────────────────────────────── */}
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
              Ein fester Monatsbeitrag – keine Provision, keine Mindestlaufzeit, keine Abhängigkeit.
            </p>
          </motion.div>

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
                <h3 className="text-white font-black text-2xl mb-3">App + Webshop</h3>
                <div className="flex items-end gap-2">
                  <span className="text-[#ED8400] font-black text-5xl leading-none">149 €</span>
                  <span className="text-white/40 text-sm mb-1">/ Monat (netto)</span>
                </div>
              </div>

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

          <div className="grid md:grid-cols-3 gap-5">
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
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {[
                  { src: payPaypal,     alt: "PayPal",      h: "h-12" },
                  { src: payApple,      alt: "Apple Pay",   h: "h-12" },
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

      {/* ── S12: HOW IT WORKS ───────────────────────────────────── */}
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
              In 3 Schritten zu deiner eigenen Gastro-App.
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

      {/* ── S13: FAQ ────────────────────────────────────────────── */}
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

      {/* ── S14: FINAL CTA ──────────────────────────────────────── */}
      <AppTeamCTA />

      <Footer />
    </div>
  );
};

export default AppPage;

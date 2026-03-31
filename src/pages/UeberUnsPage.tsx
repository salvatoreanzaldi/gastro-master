import { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Rocket, Users, Building2, CreditCard, Monitor,
  Sparkles, Globe, Linkedin, UtensilsCrossed, MapPin, UserCheck,
  Star, Wallet, Diamond, Handshake, Zap, ShieldCheck,
  MessageCircle, Settings, GraduationCap, Headphones, Play,
  Plus, Minus, ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

import imgUsingen from "@/assets/ueber-uns/Über uns - Usingen.png";
import heroUeberUns from "@/assets/heroes/Hero - Über Uns.png";
import imgKunde1  from "@/assets/ueber-uns/Über Uns + Kunden Zusammenarbeit.jpeg";
import imgKunde2  from "@/assets/ueber-uns/Über uns + Kundenzusammenarbeit 2.jpeg";
import imgRene      from "@/assets/team/ceo-rene-ebert.png";
import imgSanjaya   from "@/assets/team/team-sanjaya-pattiyage.png";
import imgSalvatore from "@/assets/team/team-salvatore-anzaldi.png";
import imgAndrej    from "@/assets/team/team-andrej-krutsch.png";
import imgMohammad  from "@/assets/team/team-mohammad-motakalemi.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const milestoneIcons = [Sparkles, Users, Building2, Users, Monitor, CreditCard];

const MILESTONES = [
  { year: "2021", title: "Erster Tag und Gründung",                text: "Der Grundstein für eine neue Ära der Gastro-Digitalisierung" },
  { year: "2022", title: "Erste 100 Kunden",                       text: "Vertrauen aufgebaut – Wort für Wort, Kunde für Kunde" },
  { year: "2023", title: "Gründung der Epit Global GmbH",          text: "Strukturen für Wachstum und internationale Skalierung" },
  { year: "2024", title: "Erste 500 Kunden",                       text: "Ein starkes Netzwerk aus Partnern in der Gastronomie" },
  { year: "2025", title: "Eigenes Kassensystem",                   text: "Cloud-Kasse, Self-Order, Pick-Up – alles aus einer Hand" },
  { year: "2026", title: "Eigene Zahlungsabwicklung (Epit Pay)",   text: "Volle Kontrolle über Zahlungen – unser nächster Meilenstein" },
];

const FOUNDERS = [
  { key: "rene",    img: imgRene,    name: "René Ebert",          role: "Gründer & CEO",            focus: "Vertrieb & Marketing",     bio: "Nach seinem Bachelor in International Business Management entschied er sich für den unternehmerischen Weg. Sein Fokus liegt auf Wachstum, Vertrieb und strategischer Marktentwicklung.", linkedin: "https://www.linkedin.com/in/rene-ebert/" },
  { key: "sanjaya", img: imgSanjaya, name: "Sanjaya Pattiyage",   role: "Gründer & CEO",            focus: "IT & Technologie",         bio: "Langjähriger IT-Spezialist mit Erfahrung in Technologie- und Führungsrollen bei international führenden Unternehmen wie Procter & Gamble. Fokus auf Produkt, Systeme und skalierbare Technologie.", linkedin: "https://www.linkedin.com/in/sanjaya-pattiyage/" },
];

const TEAM_MEMBERS = [
  { key: "salvatore", img: imgSalvatore, name: "Salvatore Anzaldi",    role: "Vertriebsleiter",           focus: "Kundenberatung",           bio: "Mehrjährige Vertriebserfahrung. Zuvor im Verkauf mechanischer Luxusuhren bei einem führenden Online-Anbieter wie CHRONEXT tätig – und weiß, dass jede einzelne Komponente zählt.", linkedin: "https://www.linkedin.com/in/salvatore-a-a42711208/" },
  { key: "andrej",    img: imgAndrej,    name: "Andrej Krutsch",       role: "Service Customer Manager",  focus: "Kundenbetreuung",          bio: "Zuvor in leitenden Positionen im Lebensmitteleinzelhandel tätig, unter anderem bei Rewe. Bringt fundierte Erfahrung in Kundenservice und Betriebsorganisation mit.", linkedin: null },
  { key: "mohammad",  img: imgMohammad,  name: "Mohammad Motakalemi",  role: "Vertrieb",                  focus: "Gastronomie-Expertise",    bio: "Ehemaliger Gastronom, der durch seine eigene positive Erfahrung als Kunde den Weg ins Team fand. Er kennt die Herausforderungen der Branche aus erster Hand.", linkedin: null },
];

const LANGUAGES = [
  { label: "Deutsch",       flag: "🇩🇪", color: "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300" },
  { label: "Englisch",      flag: "🇬🇧", color: "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300" },
  { label: "Italienisch",   flag: "🇮🇹", color: "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300" },
  { label: "Persisch",      flag: "🇮🇷", color: "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300" },
  { label: "Russisch",      flag: "🇷🇺", color: "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300" },
  { label: "Singhalesisch", flag: "🇱🇰", color: "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300" },
];

const VALUES = [
  { icon: Diamond,     title: "Fair",          text: "0 % Provision, transparente Preise. Du zahlst nicht für Vermittlung. Du zahlst für echte Lösungen." },
  { icon: Handshake,   title: "Persönlich",    text: "Direkter Kontakt mit unserem 30+ Team. Keine Warteschleifen, keine anonyme Hotline." },
  { icon: Zap,         title: "Innovation",    text: "Ständig neue Lösungen: Kassensystem, Zahlungsabwicklung, Self-Service. Wir innovieren mit dir." },
  { icon: ShieldCheck, title: "Zuverlässig",   text: "24/7 Support. 5 Jahre erfolgreich. Wir sind da, wenn du uns brauchst." },
];

const WHY_ITEMS = [
  { title: "Faires Provisionsmodell",             text: "0 % statt 25-30 % bei Lieferplattformen. Wir verdienen nicht an deinen Provisionen. Wir verdienen am Erfolg deines Restaurants." },
  { title: "Deutsche Software, direkter Support", text: "Entwickelt in Deutschland. Support auf Deutsch. Keine fernen Server, kein anonymer Support. Wir sind nah bei dir." },
  { title: "Flexible Lösungen",                   text: "Von der Web-App über Webshops bis zum eigenen Kassensystem. Du wählst, was du brauchst. Und kannst jederzeit erweitern." },
  { title: "Wir wachsen mit dir",                 text: "Von 0 bis 700+ Restaurants. Wir kennen die Herausforderungen jeder Größe. Egal ob Einzelbetrieb oder Kette." },
];

const TESTIMONIALS = [
  { name: "Marco Greco",          restaurant: "Pizzeria Il Sorriso", quote: "Mit Gastro Master haben wir unsere Bestell-Prozesse komplett digitalisiert.",    videoId: "Qv-YDj9gjPk" },
  { name: "Ha Lim Lee",           restaurant: "Kojo Sushi",          quote: "Der Support ist unglaublich. Wir fühlen uns wirklich persönlich betreut.",       videoId: "JkkVyIFewO0" },
  { name: "Georgios Madatsidis",  restaurant: "Artemis Grill",       quote: "Das beste Preis-Leistungs-Verhältnis am Markt. Keine versteckten Gebühren.",    videoId: "Zx_UJJjQTso" },
];

const PROCESS_STEPS = [
  { num: "1", icon: MessageCircle,  title: "Kostenlose Beratung",    text: "Wir lernen dein Restaurant kennen. Was brauchst du? Welche Anforderungen hast du? Gemeinsam finden wir die richtige Lösung." },
  { num: "2", icon: Settings,       title: "Lösung konfigurieren",   text: "Du entscheidest, was du brauchst. Webshop, App, Kassensystem, alles zusammen. Wir zeigen dir die Optionen, du wählst." },
  { num: "3", icon: GraduationCap,  title: "Setup & Training",       text: "Wir richten alles technisch ein. Training für dein Team, persönlich oder online. Du bist am Ende bereit." },
  { num: "4", icon: Rocket,         title: "Go Live",                text: "Dein Restaurant ist live. Deine neuen Systeme funktionieren. Deine Gäste können bereits bestellen." },
  { num: "5", icon: Headphones,     title: "24/7 Support",           text: "Wir sind da. Fragen? Probleme? Neue Anforderungen? Unser Team unterstützt dich rund um die Uhr auf Deutsch." },
];

const FAQ_ITEMS = [
  {
    q: "Wie lange dauert das Setup?",
    a: "Das hängt von der Lösung ab. Im Durchschnitt ca. 2 Wochen, abhängig davon, welche Systeme du implementierst. Unser Team begleitet dich durch jeden Schritt. Für schnellere Implementierung [kontaktiere uns für eine kostenlose Beratung](/kontakt). Wir finden die beste Lösung für dein Restaurant.",
  },
  {
    q: "Gibt es versteckte Gebühren oder Provisionen?",
    a: "Nein. Absolut nicht. Bei Gastro Master zahlst du 0 % Provision. Anders als bei großen Lieferplattformen, die 25-30 % verlangen. Alle Kosten sind transparent. Schau dir unsere [Preisübersicht](/preise) an. Dort siehst du genau, was dich erwartet.",
  },
  {
    q: "Kann ich später noch weitere Lösungen hinzufügen?",
    a: "Ja, absolute Flexibilität. Du kannst mit einer [Webseite](/produkte/webseite) starten und später einen [Bestellshop](/produkte/webshop) oder ein [Kassensystem](/produkte/kassensystem) hinzufügen. Jederzeit änderbar. Du entscheidest, was du brauchst.",
  },
  {
    q: "Wie ist euer Support? Bin ich nur eine Nummer?",
    a: "Nein. Unser Team mit 30+ Mitarbeitern bietet persönlichen 24/7 Support auf Deutsch. Keine Warteschleifen, keine automatisierten Systeme. Du sprichst mit echten Menschen, die dein Restaurant verstehen.",
  },
  {
    q: "Sind wir als Restaurant zu weit entfernt von Usingen?",
    a: "Nein. Wir sind zwar in Usingen bei Frankfurt, arbeiten aber mit Kunden in allen 16 Bundesländern. Egal wo dein Restaurant ist, unser Support ist deutschlandweit verfügbar. Besuche uns gerne persönlich oder nutze Telefon und Video Call. [Buche jetzt deine kostenlose Beratung](/kontakt).",
  },
];

// ─── Schema ──────────────────────────────────────────────────────────────────

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de/" },
    { "@type": "ListItem", position: 2, name: "Über uns", item: "https://gastro-master.de/uber-uns" },
  ],
};

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gastro Master",
  url: "https://gastro-master.de",
  foundingDate: "2021",
  description: "Digitale Lösungen für die Gastronomie: Bestellsystem, Kassensystem, App und Webseite. 0 % Provision, persönlicher Support.",
  address: { "@type": "PostalAddress", addressLocality: "Usingen", addressRegion: "Hessen", addressCountry: "DE" },
  numberOfEmployees: { "@type": "QuantitativeValue", value: "30+" },
  areaServed: { "@type": "Country", name: "Deutschland" },
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
  })),
};

// ─── renderFaqLinks ──────────────────────────────────────────────────────────

const renderFaqLinks = (text: string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) return <Link key={i} to={m[2]} className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">{m[1]}</Link>;
    return part;
  });

// ─── FlipCard (1:1 wie FounderTrustSection) ──────────────────────────────────

const FlipCard = ({ person, index }: { person: typeof FOUNDERS[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="perspective-[1200px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full transition-transform duration-700 preserve-3d min-h-[500px] md:min-h-[380px]"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-full rounded-3xl overflow-hidden border-2 border-border bg-background shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="relative w-full aspect-square md:h-64 overflow-hidden p-4 md:p-0">
              <img src={person.img} alt={`${person.name} – ${person.role}`} className="w-full h-full object-cover object-center rounded-2xl md:rounded-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background from-0% via-transparent via-20% to-transparent md:via-40%" />
            </div>
            <div className="px-5 pt-4 pb-5 sm:p-5 text-center">
              <h3 className="text-xl sm:text-lg font-bold text-foreground">{person.name}</h3>
              <p className="text-cyan-brand text-base sm:text-sm font-semibold">{person.role}</p>
              <p className="text-muted-foreground text-base sm:text-sm">{person.focus}</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="h-full rounded-3xl border-2 border-cyan-brand/20 bg-gradient-navy p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">{person.name}</h3>
              <p className="text-cyan-brand text-sm font-semibold mb-4">{person.role}</p>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{person.bio}</p>
            </div>
            {person.linkedin && (
              <a href={person.linkedin} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0A66C2] hover:text-primary-foreground text-sm font-medium transition-colors mt-4">
                <Linkedin className="w-5 h-5" /> LinkedIn Profil
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── FaqItem ─────────────────────────────────────────────────────────────────

const FaqItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="rounded-2xl border border-border bg-background overflow-hidden"
  >
    <button onClick={onToggle} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-foreground/[0.02] transition-colors">
      <span className="font-semibold text-foreground text-base leading-snug">{q}</span>
      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-foreground/40">
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
          <div className="px-6 pb-6 text-foreground/65 text-sm leading-relaxed border-t border-border pt-4">
            {renderFaqLinks(a)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const UeberUnsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeoMeta({
    title: "Über Gastro Master — Digitale Lösungen für dein Restaurant",
    description: "Erfahre unsere Geschichte. Ein Team mit 30+ Mitarbeitenden in 16 Bundesländern, das dich persönlich begleitet. 0 % Provision, 24/7 Support auf Deutsch.",
    canonical: "https://gastro-master.de/uber-uns",
  });

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />

      <Navbar />

      {/* ── S1: HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-5 md:px-8 lg:px-16">
        {/* Background Image */}
        <img
          src={heroUeberUns}
          alt="Gastro Master Logo aus Moos an Holzwand"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-4xl mx-auto relative z-10 text-center py-24 md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5"
          >
            Das ist{" "}
            <span className="text-transparent bg-clip-text bg-[length:300%_auto] animate-gradient-shift bg-gradient-to-r from-[#009ACC] via-[#008BCC] via-[#007DCF] via-[#055FB6] via-[#007DCF] via-[#008BCC] to-[#009ACC]">Gastro Master</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed mb-10"
          >
            Wir helfen Gastronomen, digital unabhängig zu werden. Persönlich, fair und mit einem Team, das dich wirklich kennt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/kontakt"
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
            >
              Kostenlose Beratung anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#team" className="text-white/70 text-sm font-medium inline-flex items-center gap-1.5 hover:text-white transition-colors">
              Unser Team kennenlernen ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── S2: TRUST BAR ─────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {[
              { icon: UtensilsCrossed, value: "700+",           label: "Restaurants vertrauen uns" },
              { icon: MapPin,          value: "16",             label: "Bundesländer deutschlandweit" },
              { icon: UserCheck,       value: "30+",            label: "Team Members" },
              { icon: Star,            value: "Seit 2021",      label: "Erfolgreich am Markt" },
              { icon: Wallet,          value: "0 %",            label: "Provision auf Bestellungen" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="text-center">
                  <Icon className="w-5 h-5 text-cyan-brand mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1 leading-none">{s.value}</p>
                  <p className="text-[#0A264A]/45 dark:text-white/40 text-xs leading-snug">{s.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S3: GRÜNDUNGSGESCHICHTE ────────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Unsere Geschichte</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">Digitale Power für die Gastronomie. Das ist unsere Mission.</h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sanjaya, unser Gründer und IT-Experte, erkannte das Potenzial: Mit 15 Jahren IT-Erfahrung entwickelte er ein Bestellsystem, das wie große Lieferplattformen funktioniert. Aber ohne maßlose Provisionen.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Die Devise war klar: <strong className="text-foreground font-bold">Faire Zusammenarbeit mit Gastronomen.</strong> Kein Kleingedrucktes, keine versteckten Gebühren. Ein System, das für dich arbeitet.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={imgKunde1} alt="René Ebert berät einen Gastronomen am Laptop" className="rounded-2xl shadow-xl w-full object-cover" />
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
              <img src={imgKunde2} alt="René Ebert und Gastronom besiegeln Zusammenarbeit per Handschlag" className="rounded-2xl shadow-xl w-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                René Ebert stieß hinzu, inspiriert von seinen USA-Erfahrungen und dem wachsenden Bedarf an Digitalisierung. Gemeinsam gründeten sie Gastro Master.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Heute bieten wir dir ein umfassendes Portfolio: <Link to="/produkte/app" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">Apps</Link>, <Link to="/produkte/webshop" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">Bestellshops</Link>, <Link to="/produkte/kassensystem" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">Kassensysteme</Link> und <Link to="/produkte/transaktionsumlage" className="text-cyan-brand underline underline-offset-2 hover:opacity-80 transition-opacity">Zahlungsabwicklung</Link>. Alles entwickelt, damit du effizienter, kundenorientierter und erfolgreicher arbeitest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S4: STANDORT USINGEN ──────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 md:py-28 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Standort</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Unser Standort: Usingen bei Frankfurt</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Hier entstand Gastro Master. Mit Leidenschaft für die Gastronomie.</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={imgUsingen} alt="Gastro Master Standort Usingen bei Frankfurt, Hessen" className="rounded-2xl shadow-2xl shadow-black/10 w-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Unser Standort ist in Usingen bei Frankfurt. Doch unser Wirkungsgebiet erstreckt sich über die gesamte Bundesrepublik. Mit Kunden in allen 16 Bundesländern realisieren wir Projekte deutschlandweit und kennen die unterschiedlichen Anforderungen der gastronomischen Vielfalt in jeder Region.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Du möchtest uns kennenlernen? Gerne. Besuche uns gerne in Usingen für ein persönliches Gespräch — oder wir sprechen telefonisch oder per Video Call. Ganz wie es dir am besten passt. Beratung auf Augenhöhe bedeutet für uns, dass du die Wahl hast.
              </p>
              <Link to="/kontakt" className="bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
                Kostenlose Beratung <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S5: TIMELINE (1:1 wie MomentumSection) ─────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 30% 70%, hsl(196, 100%, 40%), transparent 50%)" }} />
        <div className="container-tight relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Seit 2021</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-3">5 Jahre Momentum</h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">Vom ersten Kunden bis zum eigenen Zahlungssystem – wir bauen die Zukunft der Gastronomie.</p>
          </motion.div>
          <div className="grid gap-3 max-w-3xl mx-auto">
            {MILESTONES.map((m, i) => {
              const Icon = milestoneIcons[i];
              const isNext = i === MILESTONES.length - 1;
              const isGlow = i >= MILESTONES.length - 2;
              return (
                <motion.div key={m.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`group flex items-center gap-4 md:gap-6 rounded-2xl border p-4 md:p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${isNext ? "bg-cyan-brand/10 border-cyan-brand/30 hover:shadow-cyan-brand/10" : isGlow ? "bg-primary-foreground/5 border-primary-foreground/15 hover:shadow-primary-foreground/5" : "bg-primary-foreground/5 border-primary-foreground/10"}`}>
                  <div className="flex items-center gap-3 flex-shrink-0 w-[120px] md:w-[150px]">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isGlow ? "bg-cyan-brand/20" : "bg-primary-foreground/10"}`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isGlow ? "text-cyan-brand" : "text-primary-foreground/50"}`} />
                    </div>
                    <span className={`text-lg md:text-xl font-black ${isGlow ? "text-cyan-brand" : "text-primary-foreground/60"}`}>{m.year}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-primary-foreground font-bold text-sm md:text-base">{m.title}</h3>
                      {isNext && <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-brand/20 text-cyan-brand px-2 py-0.5 rounded-full">Als Nächstes</span>}
                    </div>
                    <p className="text-primary-foreground/40 text-xs md:text-sm mt-0.5 hidden md:block">{m.text}</p>
                  </div>
                  {isGlow && <div className="w-2 h-2 rounded-full bg-cyan-brand shadow-lg shadow-cyan-brand/40 flex-shrink-0" />}
                </motion.div>
              );
            })}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-primary-foreground/30 text-sm mt-6 max-w-md mx-auto">
            Wir sind zukunftsorientiert, flexibel und bauen Software, die Gastronomen wirklich weiterbringt.
          </motion.p>
        </div>
      </section>

      {/* ── S6: TEAM (1:1 wie FounderTrustSection) ─────────────────────── */}
      <section id="team" className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Das Team hinter Gastro Master</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">Echte Menschen.<br />Echte Begleitung.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Kein anonymer Softwareanbieter – sondern ein Team mit 30+ Mitarbeitenden, das dich persönlich begleitet.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-sm sm:max-w-2xl mx-auto mb-6">
            {FOUNDERS.map((person, i) => <FlipCard key={person.key} person={person} index={i} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((person, i) => <FlipCard key={person.key} person={person} index={i + FOUNDERS.length} />)}
          </div>
        </div>
      </section>

      {/* ── S7: SPRACHEN (1:1 wie FounderTrustSection Language-Block) ──── */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-3xl border border-border bg-background shadow-lg px-8 py-10 max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <Globe className="w-6 h-6 text-cyan-brand" />
              <h2 className="text-2xl md:text-3xl font-black text-foreground">Beratung auf Augenhöhe. In deiner Sprache.</h2>
            </div>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
              Unsere Beratung ist persönlich, direkt und auch sprachlich nah an deinem Alltag. Wir sprechen deine Sprache – damit du dich von Anfang an verstanden fühlst.
            </p>
            <div className="flex flex-wrap justify-center gap-3 py-3">
              {LANGUAGES.map((lang, i) => (
                <motion.div key={lang.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: "easeOut" }} whileHover={{ scale: 1.08, y: -3 }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-border bg-surface-light text-foreground font-semibold text-sm cursor-default select-none whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${lang.color}`}>
                  <span className="text-2xl leading-none">{lang.flag}</span>
                  {lang.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S8: VALUES / MISSION ───────────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Unsere Werte</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">Das glauben wir an</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Unsere Core Values sind die Grundlage für alles, was wir tun.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-border bg-background p-7 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-cyan-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S9: WHY GASTRO MASTER ──────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 md:py-28 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 70% 30%, hsl(196, 100%, 40%), transparent 50%)" }} />
        <div className="container-tight relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Warum Gastro Master</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">Das macht uns anders</h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">Warum 700+ Restaurants sich für Gastro Master entscheiden.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {WHY_ITEMS.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-7 hover:border-cyan-brand/30 transition-all duration-300">
                <span className="text-cyan-brand font-black text-3xl mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-primary-foreground/55 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S10: TESTIMONIALS (YouTube) ────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="container-tight">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Kundenstimmen</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">Was unsere Partner sagen</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Echte Erfahrungen von echten Restaurants.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.videoId} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${t.videoId}`}
                    title={`${t.name} – ${t.restaurant}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm italic leading-relaxed mb-3">„{t.quote}"</p>
                  <p className="text-foreground font-bold text-sm">{t.name}</p>
                  <p className="text-cyan-brand text-xs font-semibold">{t.restaurant}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S11: PROCESS ──────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 lg:px-16 py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Unser Prozess</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">So arbeiten wir mit dir zusammen</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Transparent und persönlich in 5 Schritten.</p>
          </motion.div>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-5 rounded-2xl border border-border bg-surface-light p-5 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#0A264A] flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-brand font-black text-lg">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-cyan-brand" />
                      <h3 className="text-foreground font-bold text-base">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S12: FAQ ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Häufig gestellte Fragen</h2>
            <p className="text-muted-foreground text-lg">Alles was du über Gastro Master wissen musst.</p>
          </motion.div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S13: CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061830] via-[#0A264A] to-[#0D3266] py-24 md:py-32 px-5 md:px-8 lg:px-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(196,100%,50%), transparent 70%)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Bereit, <span className="text-cyan-brand">durchzustarten?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/55 text-lg leading-relaxed mb-10">
            Lass dich von unserem Team kostenlos beraten. Persönlich, unverbindlich und in deiner Sprache.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/kontakt" className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20">
              Jetzt beraten lassen <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            {[["0 %", "Provision"], ["700+", "aktive Kunden"], ["30+", "Mitarbeitende"], ["Persönlicher", "Support"]].map(([val, label]) => (
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

export default UeberUnsPage;

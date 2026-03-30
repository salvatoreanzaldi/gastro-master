import { useState, useEffect, useRef } from "react";
import React from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Cloud, Phone,
  Link2, Plus, Minus, CheckCircle2, Star, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

// ─── Assets ──────────────────────────────────────────────────────────────────
import heroPosImg       from "@/assets/hero-pos-system.png";
import tischImg         from "@/assets/Tisch System.png";
import fahrerImg        from "@/assets/Fahrer-App und Liefergebiete.png";
import statistikImg     from "@/assets/Statistiken.png";
import slideTischImg     from "@/assets/2 - Tisch Funktion.png";
import slideGpsImg       from "@/assets/3 - Liefergebiete.png";
import slideStatistikImg from "@/assets/4 - Statistiken.png";
import zahlungsmethodenImg from "@/assets/9 - Zahlungsmethoden.png";
import plattformenImg   from "@/assets/Alle Plattformen.png";
import anruferImg       from "@/assets/Automatische Anruferkennung .png";
import liefergebImg     from "@/assets/Liefergebiete.png";
import zahlenImg        from "@/assets/Immer alle Zahlen im Griff haben.png";
import zahlungenImg     from "@/assets/Alle Zahlungen Terminal.png";
import selfOrderImg     from "@/assets/Self-Ordering Terminal Mock Up.png";
import selfOrder11Img   from "@/assets/11 - Self Ordering.png";
import ecKartenImg      from "@/assets/13 - EC-Kartengeräte.png";
import barSystemImg     from "@/assets/Bar System mit Order Man.png";
import lizenzImg        from "@/assets/Eine Lizenz für Bis zu 4 Kassen.png";
import mitarbeiterImg   from "@/assets/Mitarbeiterverwaltung .png";
import qrImg            from "@/assets/QR-Code System Mock Up.png";
import selfOrderTermImg from "@/assets/selfordering-terminals.png";
import selbstBestellenImg from "@/assets/15 - Selbst bestellen.png";
import ordermanImg      from "@/assets/Orderman MockUp.png";
import teamReneImg      from "@/assets/ceo-rene-ebert.png";
import teamSalvatoreImg from "@/assets/team-salvatore-anzaldi.png";
import teamAndrejImg    from "@/assets/team-andrej-krutsch.png";
import logoKojo         from "@/assets/logo-kojo-sushi.png";
import logoIlSorriso    from "@/assets/logo-il-sorriso.png";
import logoArtemis      from "@/assets/logo-artemis.png";
import logoTake         from "@/assets/logo-take.png";
import logoBurger       from "@/assets/logo-burger-brothers.png";
import POSSection       from "@/components/landing/POSSection";

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Warum braucht mein Restaurant ein modernes Kassensystem?",
    a: "Ein modernes Kassensystem für Gastronomie ist weit mehr als eine Registrierkasse. Es verbindet Bestelleingang, Küchenmanagement, Lieferservice, Mitarbeiterverwaltung und Statistiken in einem einzigen System. Besonders für [Restaurants](/loesungen/restaurant) spart das täglich Zeit und reduziert Fehler bei der Abrechnung erheblich.",
  },
  {
    q: "Welches Kassensystem ist TSE-pflichtig in Deutschland?",
    a: "Seit dem 01.01.2020 sind alle elektronischen Kassensysteme in Deutschland TSE-pflichtig (§146a AO, KassenSichV — Technische Sicherheitseinrichtung). Betriebe ohne gültige TSE riskieren Bußgelder von bis zu 25.000 €. Das Gastro Master Kassensystem ist vollständig zertifiziert und erfüllt alle Anforderungen der KassenSichV sowie GoBD-Konformität.",
  },
  {
    q: "Was kostet ein Cloud-Kassensystem für mein Restaurant?",
    a: "Das Gastro Master Kassensystem ist als Monatsabo verfügbar – ohne teure Einmalzahlungen oder Hardware-Wartungsverträge. Cloud-Updates, Support und alle neuen Features sind im Preis inklusive. Alle Pakete und Preise findest du in der [vollständigen Preisübersicht](/preise).",
  },
  {
    q: "Kann ich das Kassensystem auch für Lieferdienste nutzen?",
    a: "Ja. Das Kassensystem ist nativ mit der Fahrer-App, Liefergebieten und GPS-Tracking verknüpft. Bestellungen aus dem [digitalen Bestellsystem](/produkte/webshop), der [eigenen Bestell-App](/produkte/app) und direkt an der Kasse landen automatisch in einem Workflow — kein manuelles Übertragen nötig. Ideal für alle, die [einen eigenen Lieferdienst aufbauen](/loesungen/lieferservice-gruenden) möchten.",
  },
  {
    q: "Wie schnell ist das Kassensystem eingerichtet?",
    a: "Die Einrichtung dauert in der Regel 1–2 Werktage. Unser Support-Team aus Deutschland begleitet dich durch die gesamte Einrichtung und schult dein Team persönlich – vor Ort oder per Videocall. Melde dich einfach über unser [Kontaktformular](/kontakt).",
  },
  {
    q: "Ist das System GoBD-konform und für eine Betriebsprüfung geeignet?",
    a: "Ja. Das Gastro Master Kassensystem ist vollständig GoBD-konform. Alle Buchungen, Stornierungen und Tagesabschlüsse werden unveränderbar protokolliert und können jederzeit für eine Betriebsprüfung exportiert werden.",
  },
];

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gastro Master", item: "https://gastro-master.de" },
    { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
    { "@type": "ListItem", position: 3, name: "Kassensystem", item: "https://gastro-master.de/produkte/kassensystem" },
  ],
};

const SCHEMA_FAQ_KASSE = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") },
  })),
};

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
            <p className="text-white/55 leading-relaxed pb-7 text-base max-w-2xl">{renderFaqLinks(a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits = [
  { icon: ShieldCheck, title: "TSE-Pflicht erfüllt",          text: "Zertifiziert nach KassenSichV & GoBD – rechtssicher ab Tag 1." },
  { icon: Cloud,       title: "Cloud-Updates inklusive",     text: "Immer die neueste Version – automatisch, ohne Aufpreis." },
  { icon: Phone,       title: "Support aus Deutschland",     text: "Persönlicher Ansprechpartner, direkt erreichbar." },
  { icon: Link2,       title: "Alle Plattformen integriert", text: "Lieferando, Wolt, eigene App & Online-Shop in einem System." },
];

const featureCards3 = [
  { img: tischImg,     title: "Tisch-System",                text: "Bestellungen direkt am Tisch aufnehmen – schneller Service, weniger Fehler." },
  { img: fahrerImg,    title: "Fahrer-App & Liefergebiete",  text: "Lieferstatus in Echtzeit, GPS-Tracking und Lieferzonen auf einer Karte." },
  { img: statistikImg, title: "Statistiken & Berichte",      text: "Tages-, Wochen- und Monatsauswertungen – immer alle Zahlen im Griff." },
];

const squareTiles = [
  {
    img: plattformenImg,
    title: "Alle Plattformen auf einen Blick",
    text: "Lieferando, Wolt, Uber Eats und +15 weitere Partner – alle Bestellungen laufen automatisch in deinem Kassensystem zusammen. Kein manuelles Übertragen, keine Fehler, kein Zeitverlust.",
    tagline: "Du sparst täglich wertvolle Zeit.",
  },
  {
    img: anruferImg,
    title: "Automatische Anruferkennung",
    text: "Name, Adresse und Bestellhistorie erscheinen beim ersten Klingeln auf dem Bildschirm. Telefon-Bestellungen werden 3× schneller aufgenommen – ohne Nachfragen, ohne Tippfehler.",
    tagline: "Du bist schneller fertig.",
  },
  {
    img: fahrerImg,
    title: "Fahrer-App & GPS-Liefergebiete",
    text: "Jeder Fahrer erhält eine eigene App mit Echtzeit-GPS-Tracking. Liefergebiete nach Entfernung, Zone oder Postleitzahl – direkt auf der Karte definierbar, jederzeit anpassbar.",
    tagline: "Du hast immer alles unter Kontrolle.",
  },
  {
    img: zahlenImg,
    title: "Umsatz & Statistiken in Echtzeit",
    text: "Tages-, Wochen- und Monatsauswertungen auf Knopfdruck: Top-Produkte, Liefergebiete, Zahlungsarten. Alle GoBD-konformen Berichte sind sofort für den Steuerberater exportierbar.",
    tagline: "Buchführung wird kinderleicht.",
  },
  {
    img: zahlungsmethodenImg,
    title: "Alle Zahlungsmethoden akzeptiert",
    text: "Bar, EC-Karte, Visa, Mastercard, Apple Pay, Google Pay, PayPal und Klarna – dein Kassensystem akzeptiert jede Zahlungsart. TSE-zertifiziert und GoBD-konform – rechtssicher ab Tag 1.",
    tagline: "Alle Gesetze erfüllt (TSE/GoBD).",
  },
];

const featureCards5 = [
  {
    img: selfOrder11Img,
    subtitle: "DIGITALISIERUNG, DIE SINN MACHT",
    title: "Self-Ordering Terminal",
    text: "Gäste bestellen direkt am Terminal – intuitiv, ohne Wartezeit. Dein Team gewinnt Zeit. Ergänzend bieten wir auch Pick-Up-Screens an.",
  },
  {
    img: barSystemImg,
    subtitle: "FLEXIBLER SERVICE",
    title: "Bar-System mit Orderman & QR-Code",
    text: "Mobil per Orderman aufnehmen oder Gäste per QR-Code selbst bestellen lassen. Blitzschnell und modern.",
  },
  {
    img: lizenzImg,
    subtitle: "UNKOMPLIZIERT & EFFIZIENT",
    title: "Eine Lizenz – bis zu 4 Kassen",
    text: "Bis zu vier Terminals mit einem Paket. Kein Extra-Abo je Kasse – maximaler Mehrwert ohne versteckte Kosten.",
  },
  {
    img: ecKartenImg,
    subtitle: "NAHTLOSE VERKNÜPFUNG",
    title: "Anbindung an jedes EC-Kartengerät",
    text: "Kompatibel mit allen Kartenterminals nach ZVT-Standard. Kein Anbieterzwang – sicher und reibungslos.",
  },
  {
    img: mitarbeiterImg,
    subtitle: "ALLES IM BLICK",
    title: "Mitarbeiterverwaltung",
    text: "Arbeitszeiten, Umsätze und Trinkgelder automatisch erfasst. GoBD-konform exportierbar für den Steuerberater.",
  },
];

const alternatingSections = [
  {
    headline: "Deine Gäste bestellen selbst.",
    sub: "QR-Code am Tisch – sofort bestellen, ohne App",
    text1: "Kein Kellner, keine Wartezeit, kein Missverständnis. Deine Gäste scannen den QR-Code am Tisch – und in Sekunden liegt die Bestellung direkt in der Küche. Ohne App-Download, ohne Anmeldung, ohne Reibung.",
    text2: "Gastronomen, die auf QR-Code-Bestellungen setzen, berichten von bis zu 30 % höheren Tischumsätzen durch automatische Upsell-Vorschläge – und einem deutlich entspannteren Serviceablauf in der Stoßzeit.",
    checks: [
      "QR-Code am Tisch – keine App nötig, sofort startklar",
      "Bestellung landet in Sekunden in Küche & Bar",
      "Bis zu 30 % höhere Tischumsätze durch digitale Upsells",
      "Serviceteam entlastet – mehr Tische mit gleichem Personal",
    ],
    img: selbstBestellenImg,
    imgLeft: true,
    bg: "#0A264A",
    cta: true,
  },
  {
    headline: "Self-Ordering Terminal.",
    sub: "Mehr Umsatz mit Selbstbedienung",
    text1: "Das Terminal führt deine Gäste eigenständig durch dein Menü und schlägt automatisch beliebte Extras und Upgrades vor. Keine Wartezeit, keine Missverständnisse – Bezahlung direkt am Terminal, fehlerfrei in der Küche.",
    text2: "Restaurants mit Self-Ordering Terminal steigern den Durchschnittsbetrag pro Bestellung um bis zu 25 % – durch gezielte Upsell-Vorschläge, die kein Kellner so konsequent liefern kann.",
    checks: [
      "Automatische Upsell-Vorschläge steigern den Umsatz um bis zu 25 %",
      "Direktzahlung am Terminal – kein Warten auf die Rechnung",
      "Bestellung geht fehlerfrei und sofort in Küche & Bar",
      "Serviceteam entlastet – gleich viele Tische, weniger Stress",
    ],
    img: selfOrderTermImg,
    imgLeft: false,
    bg: "#081628",
    light: true,
    cta: false,
  },
  {
    headline: "Service-Vorteil durch Orderman.",
    sub: "Mobile Bestellaufnahme – schneller, fehlerfreier Service",
    text1: "Kein Zettel, kein Rufen zur Kasse: Dein Servicepersonal nimmt Bestellungen direkt am Tisch per Handheld auf – und die Bestellung landet in Sekunden in Küche und Bar. Keine Übertragungsfehler, kein Zeitverlust, kein Chaos in der Stoßzeit.",
    text2: "Restaurants mit mobilem Orderman-System reduzieren Bestellfehler um bis zu 80 % und schaffen deutlich mehr Tischumschläge – mit demselben Personal, ohne Mehraufwand.",
    checks: [
      "Mobile Bestellaufnahme per Handheld oder Tablet am Tisch",
      "Bestellung sofort fehlerfrei in Küche & Bar – kein Rufen",
      "Bis zu 80 % weniger Bestellfehler im laufenden Betrieb",
      "Mehr Tischumschläge in der Stoßzeit – gleiches Personal",
    ],
    img: ordermanImg,
    imgLeft: true,
    bg: "#0A264A",
    cta: true,
  },
  {
    headline: "Alle Zahlungen. Dein Terminal.",
    sub: "Kein Gast geht wegen Zahlungsproblemen verloren.",
    text1: "Bar, EC-Karte, Kreditkarte, Apple Pay, Google Pay und Klarna – das Gastro Master Kassensystem akzeptiert alle gängigen Zahlungsmethoden. Die Anbindung an jedes handelsübliche EC-Gerät ist ohne Aufpreis inklusive.",
    text2: "Trinkgeld-Funktion, Splitten von Rechnungen und digitale Quittungen per E-Mail sind standardmäßig enthalten. Deine Gäste zahlen, wie sie möchten – und du hast den Überblick über alle Einnahmen in Echtzeit.",
    checks: ["Alle Zahlungsmethoden akzeptiert", "Anbindung an jedes EC-Gerät inklusive", "Trinkgeld & Rechnungssplitting", "Digitale Quittungen & Tagesabschluss"],
    img: zahlungenImg,
    imgLeft: false,
    bg: "#081628",
    light: true,
    cta: false,
  },
];

const customerLogos = [
  { src: logoKojo,      alt: "Kojo Sushi" },
  { src: logoIlSorriso, alt: "Il Sorriso Pizzeria" },
  { src: logoArtemis,   alt: "Artemis" },
  { src: logoTake,      alt: "Take" },
  { src: logoBurger,    alt: "Burger Brothers" },
];

// ─── Slideshow ────────────────────────────────────────────────────────────────
const slides = [
  {
    label: "QR-Code scannen und sofort am Tisch bestellen",
    title: "Volle Flexibilität für dein Geschäft",
    text: "Vergiss komplizierte Extra-Geräte. Mit Gastro Master steuerst du dein gesamtes Geschäft zentral: Lieferung, Abholung oder Bedienung im Restaurant – alles läuft schnell und einfach über diese eine Kassenoberfläche.",
    tagline: "Das schafft Ordnung und macht den Service reibungslos.",
    img: slideTischImg,
    imgAlt: "Tischsystem mit QR-Code Bestellung",
  },
  {
    label: "Echtzeitauswertungen für kluge Entscheidungen",
    title: "Dein Geschäft in Zahlen verstehen",
    text: "Hör auf zu raten und fang an zu wissen. Mit unseren detaillierten Statistiken hast du deinen stündlichen Umsatz, die Top 10 Bestseller und deine lukrativsten Liefergebiete jederzeit im Blick.",
    tagline: "So triffst du logische Entscheidungen, um deinen Erfolg strategisch zu steigern.",
    img: slideStatistikImg,
    imgAlt: "Statistik Dashboard mit Echtzeitauswertungen",
  },
  {
    label: "Eine Lösung für Tisch, Theke und Fahrer",
    title: "Fahrer-App & Liefergebiete",
    text: "Du siehst in Echtzeit, wo deine Fahrer sind und welche Route sie fahren. Definiere deine Liefergebiete einfach selbst auf der Karte, damit niemand falsch fährt.",
    tagline: "So hast du immer alles unter Kontrolle.",
    img: slideGpsImg,
    imgAlt: "Liefergebiete Karte mit GPS-Zonen",
  },
];

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 50 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -50 }),
};

// ─── Team CTA Section ─────────────────────────────────────────────────────────
const teamMembers = [
  { img: teamReneImg,      name: "René Ebert",       role: "Gründer & Geschäftsführer" },
  { img: teamSalvatoreImg, name: "Salvatore Anzaldi", role: "Head of Sales" },
  { img: teamAndrejImg,    name: "Andrej Krutsch",    role: "Head of Operations" },
];

const TeamCTASection = () => {
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
              Buche jetzt dein<br />kostenloses Beratungsgespräch.
            </h2>
            <p className="font-bold text-[#0A264A] dark:text-white text-sm mb-3">Das erwartet dich:</p>
            <p className="text-[#0A264A]/60 dark:text-white/55 text-base leading-relaxed mb-5">
              Im kostenlosen Erstgespräch entwickelt einer unserer Experten ein individuelles Konzept für dein neues Kassensystem – kostenlos, unverbindlich und auf deinen Betrieb zugeschnitten. Danach entscheidest du frei, ob du es mit uns umsetzen möchtest.
            </p>
            <p className="text-[#0A264A]/40 dark:text-white/35 text-sm leading-relaxed mb-4">
              Deine Informationen werden ausschließlich für die Kontaktaufnahme verwendet und nicht gespeichert.
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
            {/* Name overlay */}
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
            {/* Dots */}
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

const FeatureSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const slide = slides[current];

  return (
    <div className="relative px-10 md:px-16">
      {/* Arrows */}
      <button
        onClick={() => go((current - 1 + slides.length) % slides.length)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] flex items-center justify-center shadow-lg hover:bg-[#0A264A]/80 dark:hover:bg-white/80 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go((current + 1) % slides.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A] flex items-center justify-center shadow-lg hover:bg-[#0A264A]/80 dark:hover:bg-white/80 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide content — fixed height prevents layout shift */}
      <div className="relative min-h-[520px] sm:min-h-[480px] lg:min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 grid lg:grid-cols-2 gap-16 md:gap-20 items-center"
          >
            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#007DCF]/08 blur-[50px] rounded-3xl" />
              <img
                src={slide.img}
                alt={slide.imgAlt}
                className="relative z-10 w-full rounded-2xl shadow-2xl shadow-[#0A264A]/12 border border-[#0A264A]/08"
              />
            </div>
            {/* Text */}
            <div>
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
                {slide.label}
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-6">
                {slide.title}
              </h3>
              <p className="text-[#0A264A]/60 dark:text-white/60 text-base md:text-lg leading-relaxed mb-5">
                {slide.text}
              </p>
              <p className="text-[#0A264A] dark:text-white font-bold text-base md:text-lg">
                {slide.tagline}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-3 mt-14">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2.5 bg-[#0A264A] dark:bg-white"
                : "w-2.5 h-2.5 bg-[#0A264A]/25 dark:bg-white/25 hover:bg-[#0A264A]/50 dark:hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Wave Feature Section ─────────────────────────────────────────────────────
const WaveFeatureSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(document.documentElement.classList.contains("dark"));
  const [isDark, setIsDark] = useState(isDarkRef.current);

  // Watch dark-mode class on <html>
  useEffect(() => {
    const mo = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      isDarkRef.current = dark;
      setIsDark(dark);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    const animate = () => {
      time += 0.02;
      waveData.forEach((d) => {
        if (Math.random() < 0.01) d.targetValue = Math.random() * 0.7 + 0.1;
        d.value += (d.targetValue - d.value) * d.speed;
      });

      const dark = isDarkRef.current;
      ctx.fillStyle = dark ? "#020c1b" : "#f0f5fb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((d, i) => {
        const freq = d.value * 7;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = (py + 1) * (canvas.height / 2);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        if (dark) {
          const r = Math.round(79 + intensity * 100);
          const g = Math.round(70 + intensity * 130);
          ctx.strokeStyle = `rgba(${r},${g},229,0.6)`;
          ctx.shadowColor = `rgba(${r},${g},229,0.5)`;
        } else {
          const r = Math.round(0 + intensity * 30);
          const g = Math.round(75 + intensity * 80);
          const b = Math.round(150 + intensity * 57);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`;
          ctx.shadowColor = `rgba(${r},${g},${b},0.25)`;
        }
        ctx.lineWidth = 1 + i * 0.3;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();
    animate();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  // Styles that switch with mode
  const cardBg   = isDark ? "#0d1a2e" : "#ffffff";
  const imgBg    = isDark ? "linear-gradient(160deg, #0d1a2e 0%, #111e38 100%)" : "linear-gradient(160deg, #f0f5fb 0%, #e8f0fa 100%)";
  const gridColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(10,38,74,0.15)";
  const glowColor = isDark ? "rgba(99,102,241,0.12)" : "rgba(0,125,207,0.08)";
  const borderGrad = isDark
    ? "linear-gradient(135deg, rgba(99,102,241,0.7) 0%, rgba(237,132,0,0.5) 100%)"
    : "linear-gradient(135deg, rgba(0,125,207,0.55) 0%, rgba(237,132,0,0.45) 100%)";
  const sepColor  = isDark
    ? "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(237,132,0,0.3), transparent)"
    : "linear-gradient(90deg, transparent, rgba(0,125,207,0.3), rgba(237,132,0,0.25), transparent)";
  const subtitleColor = isDark ? "#7c85f0" : "#007DCF";
  const titleColor    = isDark ? "#ffffff" : "#0A264A";
  const bodyColor     = isDark ? "rgba(255,255,255,0.55)" : "rgba(10,38,74,0.58)";
  const headingColor  = isDark ? "#ffffff" : "#0A264A";
  const subColor      = isDark ? "rgba(255,255,255,0.45)" : "rgba(10,38,74,0.55)";

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-5 md:px-8 lg:px-16 py-28 md:py-40">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            Add-ons & Erweiterungen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black" style={{ color: headingColor }}>
            Mehr als eine Kasse –<br className="hidden md:block" /> dein komplettes System.
          </h2>
          <p className="text-lg mt-5 max-w-2xl mx-auto" style={{ color: subColor }}>
            Modulare Hardware-Add-ons und smarte Software-Funktionen, die sich deinem Betrieb anpassen.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featureCards5.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                animation: `wave-float ${3.5 + i * 0.4}s ease-in-out infinite`,
                background: `linear-gradient(${cardBg}, ${cardBg}) padding-box, ${borderGrad} border-box`,
                border: "1px solid transparent",
              }}
            >
              {/* Image area */}
              <div className="relative aspect-square w-full overflow-hidden" style={{ background: imgBg }}>
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${gridColor} 1px, transparent 1px), linear-gradient(${gridColor} 1px, transparent 1px)`,
                    backgroundSize: "15px 15px",
                  }}
                />
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${glowColor} 0%, transparent 70%)` }} />
                <img src={card.img} alt={card.title} className="relative z-10 w-full h-full object-contain p-3" />
              </div>

              <div className="h-px" style={{ background: sepColor }} />

              <div className="p-4 flex flex-col gap-1.5 flex-1" style={{ background: cardBg }}>
                <span className="text-[11px] font-black uppercase tracking-[0.14em] leading-none" style={{ color: subtitleColor }}>
                  {card.subtitle}
                </span>
                <h3 className="font-bold text-base leading-snug" style={{ color: titleColor }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const KassePage = () => {
  useSeoMeta({
    title: "Kassensystem Gastronomie — TSE-konform | Gastro Master",
    description: "TSE-konformes Kassensystem für Gastronomie ab 69 €/Monat. Fahrer-App, QR-Bestellung & Cloud-Updates inklusive. Gesetzeskonform (§146a AO). Jetzt kostenlos beraten.",
    canonical: "https://gastro-master.de/produkte/kassensystem",
  });
  return (
  <div className="min-h-screen" style={{ backgroundColor: "#0A264A" }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ_KASSE) }} />
    <Navbar />

    {/* ── S1: HERO ──────────────────────────────────────────── */}
    <section className="mesh-gradient min-h-[90vh] flex items-center px-5 md:px-8 lg:px-16 pt-36 pb-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#007DCF]/8 blur-[180px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
          >
            Kassensystem
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.06] mb-8"
          >
            Das Kassensystem für deine{" "}
            <span className="text-gradient-brand">Gastronomie</span>
            {" "}– TSE-konform & in der Cloud.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/55 max-w-xl leading-relaxed mb-12"
          >
            Modernste Kassensoftware für{" "}
            <Link to="/loesungen/restaurant" className="text-cyan-brand/80 underline underline-offset-2 hover:opacity-80 transition-opacity">Restaurants</Link>,{" "}
            <Link to="/loesungen/lieferservice-gruenden" className="text-cyan-brand/80 underline underline-offset-2 hover:opacity-80 transition-opacity">Lieferdienste</Link>{" "}
            und Gastrobetriebe – mit TSE-Zertifizierung, GoBD-Konformität, Cloud-Updates und direktem Support aus Deutschland.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => { window.location.href = "/kontakt"; }}
              className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              Jetzt kostenlos beraten lassen
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="/#preise"
              className="border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 transition-all"
            >
              Preise ansehen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#007DCF]/12 blur-[80px] rounded-full scale-75" />
          <img
            src={heroPosImg}
            alt="Gastro Master Kassensystem – TSE-konformes POS System für Gastronomie"
            className="relative z-10 w-full max-w-lg drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>

    {/* ── S2: GOOGLE + TRUST ────────────────────────────────── */}
    <section className="bg-white dark:bg-[#081628] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-20 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:justify-between">
        {/* Google Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 bg-[#0A264A]/[0.05] dark:bg-white/[0.05] border border-[#0A264A]/10 dark:border-white/10 rounded-2xl px-6 py-4 flex-shrink-0"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-[#0A264A] dark:text-white leading-none">5.0</span>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#FBA200] text-[#FBA200]" />
              ))}
            </div>
          </div>
          <div className="w-px h-10 bg-[#0A264A]/10 dark:bg-white/10" />
          <div>
            <p className="text-[#0A264A] dark:text-white text-sm font-semibold">Google Bewertung</p>
            <p className="text-[#0A264A]/50 dark:text-white/50 text-xs mt-0.5">Über 50 verifizierte Rezensionen</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "200+",    label: "aktive Kassensystem-Nutzer" },
            { value: "TSE",     label: "zertifiziert & GoBD-konform" },
            { value: "0 €",     label: "Aufpreis für Cloud-Updates" },
            { value: "Support", label: "direkt aus Deutschland" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1">{s.value}</p>
              <p className="text-[#0A264A]/50 dark:text-white/50 text-xs leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── S3: BENEFITS ──────────────────────────────────────── */}
    <section className="bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                className="group p-6 rounded-2xl bg-[#0A264A]/[0.04] dark:bg-white/[0.04] border border-[#0A264A]/[0.07] dark:border-white/[0.07] hover:border-cyan-brand/30 hover:bg-[#0A264A]/[0.07] dark:hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 border border-cyan-brand/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-[#0A264A] dark:text-white font-bold text-base leading-snug mb-2">
                  {b.title}
                </h3>
                <p className="text-[#0A264A]/55 dark:text-white/55 text-sm leading-relaxed">
                  {b.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── S4: FEATURE SLIDESHOW ─────────────────────────────── */}
    <section className="bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            Kernfunktionen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A264A] dark:text-white leading-tight">
            Die wichtigsten Funktionen<br className="hidden md:block" /> deines Kassensystems.
          </h2>
        </motion.div>
        <FeatureSlideshow />
      </div>
    </section>

    {/* ── S5: FEATURES GRID ─────────────────────────────────── */}
    <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Alles, was deine Gastronomiekasse braucht.
          </h2>
          <p className="text-white/45 text-lg mt-4 max-w-2xl mx-auto">
            Ein System, das mit deinem Betrieb wächst – von der Anruferkennung bis zur Echtzeit-Statistik.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {squareTiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative flex items-start gap-5 p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-cyan-brand/30 transition-all duration-400 cursor-default overflow-hidden${i === 4 ? " md:col-span-2" : ""}`}
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-brand/[0.05] via-transparent to-transparent pointer-events-none" />
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-brand/70 via-cyan-brand/30 to-transparent transition-all duration-500 ease-out" />

              {/* Image */}
              <div className="relative flex-shrink-0 w-36 h-36 md:w-40 md:h-40 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <img
                  src={tile.img}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-[1.06] group-hover:brightness-110 transition-all duration-500"
                />
                {/* Number badge over image */}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-[#0A264A]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <span className="text-cyan-brand text-xs font-black">{i + 1}</span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 relative z-10 py-1">
                <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-2.5 group-hover:text-white transition-colors">
                  {tile.title}
                </h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed mb-3 group-hover:text-white/70 transition-colors">
                  {tile.text}
                </p>
                <p className="text-[#ED8400] font-bold text-sm md:text-base inline-flex items-center gap-1.5">
                  {tile.tagline}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── S6: SOCIAL PROOF ──────────────────────────────────── */}
    <section className="px-5 md:px-8 lg:px-16 py-28 md:py-40 relative overflow-hidden">
      {/* Animated blue gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #020c1b 0%, #0a3d7a 50%, #00b4d8 100%)",
            "linear-gradient(135deg, #051e47 0%, #1565c0 50%, #004e9a 100%)",
            "linear-gradient(135deg, #020a14 0%, #0077b6 50%, #48cae4 100%)",
            "linear-gradient(135deg, #0d2b6b 0%, #023e8a 50%, #0096c7 100%)",
            "linear-gradient(135deg, #030f24 0%, #1a4fa8 50%, #00b4d8 100%)",
            "linear-gradient(135deg, #020c1b 0%, #0a3d7a 50%, #00b4d8 100%)",
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle radial light pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, #007DCF22 0%, transparent 70%)",
        }}
      />
      {/* 200+ watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[200px] md:text-[280px] font-black text-white/[0.09] leading-none">
          200+
        </span>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            Vertrauen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Über 200 Gastronomen führen ihren Betrieb<br className="hidden md:block" /> bereits mit dem Gastro Master Kassensystem.
          </h2>
          <p className="text-white/40 text-lg mt-5 max-w-xl mx-auto">
            Von der Pizzeria bis zum Franchise – Gastro Master wächst mit jedem Betrieb.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-8 md:gap-14 flex-wrap"
        >
          {customerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-10 md:h-12 object-contain opacity-50 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── S7: BENTO FEATURE GRID ────────────────────────────── */}
    <section className="hidden bg-white dark:bg-[#081628] px-5 md:px-8 lg:px-16 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
            Add-ons & Erweiterungen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A264A] dark:text-white">
            Mehr als eine Kasse –<br className="hidden md:block" /> dein komplettes System.
          </h2>
          <p className="text-[#0A264A]/55 dark:text-white/45 text-lg mt-5 max-w-2xl mx-auto">
            Modulare Hardware-Add-ons und smarte Software-Funktionen, die sich deinem Betrieb anpassen.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featureCards5.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -5, boxShadow: "0 24px 56px rgba(0,125,207,0.18)" }}
              className="group relative bg-[#0A264A]/[0.04] dark:bg-white/[0.05] border border-[#0A264A]/10 dark:border-white/[0.09] backdrop-blur-[14px] rounded-2xl overflow-hidden cursor-default transition-colors duration-300 hover:bg-[#0A264A]/[0.08] dark:hover:bg-white/[0.09] hover:border-cyan-brand/30 dark:hover:border-cyan-brand/25 flex flex-col"
            >
              {/* Top edge glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-brand/0 to-transparent group-hover:via-cyan-brand/70 transition-all duration-500" />
              {/* Inner glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-[#007DCF]/08 via-transparent to-transparent pointer-events-none" />

              {/* Square image — object-contain preserves golden border */}
              <div className="aspect-square w-full bg-white/[0.03] p-3 flex-shrink-0">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5 p-4 relative z-10 flex-1">
                <span className="text-cyan-brand text-[11px] font-black uppercase tracking-[0.16em] leading-none">
                  {card.subtitle}
                </span>
                <h3 className="text-[#0A264A] dark:text-white font-bold text-base leading-snug">
                  {card.title}
                </h3>
                <p className="text-[#0A264A]/60 dark:text-white/50 text-sm leading-relaxed group-hover:text-[#0A264A]/80 dark:group-hover:text-white/70 transition-colors duration-300">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── S7b: WAVE FEATURE SECTION (21st.dev test) ─────────── */}
    <WaveFeatureSection />

    {/* ── PREISE: Die Gastro Master Cloud-Kasse ──────────────── */}
    <POSSection />

    {/* ── S8: 4 ALTERNATING DETAIL-SECTIONS ────────────────── */}
    {alternatingSections.map((sec) => (
      <section
        key={sec.headline}
        className={`px-5 md:px-8 lg:px-16 py-16 md:py-24 ${
          sec.light
            ? "bg-white dark:bg-[#081628]"
            : ""
        }`}
        style={sec.light ? undefined : { backgroundColor: sec.bg }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            {/* Image — conditionally ordered */}
            <motion.div
              initial={{ opacity: 0, x: sec.imgLeft ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative ${sec.imgLeft ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className={`absolute inset-0 blur-[60px] rounded-3xl scale-90 ${sec.light ? "bg-[#007DCF]/8" : "bg-[#007DCF]/10"}`} />
              <img
                src={sec.img}
                alt={sec.headline}
                className={`relative z-10 w-full rounded-3xl shadow-2xl ${
                  sec.light
                    ? "border border-[#0A264A]/10 dark:border-white/10 shadow-black/10 dark:shadow-black/30"
                    : "border border-white/10 shadow-black/30"
                }`}
              />
            </motion.div>
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: sec.imgLeft ? 28 : -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={sec.imgLeft ? "lg:order-2" : "lg:order-1"}
            >
              <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">
                {sec.sub}
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-7 ${sec.light ? "text-[#0A264A] dark:text-white" : "text-white"}`}>
                {sec.headline}
              </h2>
              <p className={`text-lg leading-relaxed mb-5 ${sec.light ? "text-[#0A264A]/60 dark:text-white/55" : "text-white/55"}`}>{sec.text1}</p>
              <p className={`text-lg leading-relaxed mb-10 ${sec.light ? "text-[#0A264A]/60 dark:text-white/55" : "text-white/55"}`}>{sec.text2}</p>
              <ul className="space-y-3 mb-10">
                {sec.checks.map(check => (
                  <li key={check} className={`flex items-start gap-3 text-base ${sec.light ? "text-[#0A264A]/70 dark:text-white/70" : "text-white/70"}`}>
                    <CheckCircle2 className="w-5 h-5 text-cyan-brand mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                    {check}
                  </li>
                ))}
              </ul>
              {sec.cta && (
                <motion.button
                  onClick={() => { window.location.href = "/kontakt"; }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(237,132,0,0.55), 0 0 64px 16px rgba(237,132,0,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base inline-flex items-center gap-3 shadow-lg shadow-[#ED8400]/30 group"
                >
                  Kostenlose Beratung anfragen
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    ))}

    {/* ── S9: TEAM CTA ──────────────────────────────────────────── */}
    <TeamCTASection />

    {/* ── S10: FAQ ───────────────────────────────────────────── */}
    <section className="bg-[#081628] px-5 md:px-8 lg:px-16 py-32 md:py-44">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-5 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Häufige<br className="hidden md:block" /> Fragen.
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

    <Footer />
  </div>
  );
};

export default KassePage;

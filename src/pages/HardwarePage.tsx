import { useState } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Plus, Minus, Check, X, LayoutGrid, Grid2x2, List, Square, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HomeTeamCTA from "@/components/HomeTeamCTA";
import { CTASection } from "@/components/CTASection";
import { getCTAConfig } from "@/data/cta-config";

// ─── Assets: Kasse ────────────────────────────────────────────────────────────
import kassenhardwareImg   from "@/assets/hardware/kassenhardware.png";
import hwEloFront          from "@/assets/hardware/Hardware - Elo Front.png";
import hwEloSchraeg        from "@/assets/hardware/Hardware - Elo Schrägt.png";
import hwEloHinten         from "@/assets/hardware/Hardware - Elo Hinten.png";
import hwEloPorts          from "@/assets/hardware/Hardware - Elo Ports.png";
import hwEloSeite          from "@/assets/hardware/Hardware - Elo Seite.png";
import hwEloDblFront       from "@/assets/hardware/Hardware - Elo Double Screen Front.png";
import hwEloDblSchraeg     from "@/assets/hardware/Hardware - Elo Double Screen Schräg.png";
import hwEloDblHinten      from "@/assets/hardware/Hardware - Elo Double Screen Hinten.png";
import hwEloDblPorts       from "@/assets/hardware/Hardware - Elo Double Screen Ports.png";
import hwSurfaceFront      from "@/assets/hardware/Hardware - Microsoft Surface Tablet Front.png";
import hwSurfaceSchraeg    from "@/assets/hardware/Hardware - Microsoft Surface Tablet Schräg.png";
import hwSurfaceHinten     from "@/assets/hardware/Hardware - Microsoft Surface Tablet Hinten.png";
import hwSurfaceSeite      from "@/assets/hardware/Hardware - Microsoft Surface Tablet Seite.png";
import hwThinkpad1         from "@/assets/hardware/Lenovo ThinkPad X12 Detachable - 1.png";
import hwThinkpad2         from "@/assets/hardware/Lenovo ThinkPad X12 Detachable - 2.png";
import hwThinkpad3         from "@/assets/hardware/Lenovo ThinkPad X12 Detachable - 3.png";
import hwThinkpad4         from "@/assets/hardware/Lenovo ThinkPad X12 Detachable - 4.png";
import hwThinkpad5         from "@/assets/hardware/Lenovo ThinkPad X12 Detachable - 5.png";

// ─── Assets: Terminals ────────────────────────────────────────────────────────
import adyenS1F2L          from "@/assets/hardware/Adyen POS-Terminal - S1F2L.png";
import adyenS1F2LUmfang    from "@/assets/hardware/Adyen POS-Terminal - S1F2L Umfang.png";
import adyenS1F2LSchraeg   from "@/assets/hardware/Adyen POS-Terminal - S1F2L Schräg.png";
import adyenAMS1           from "@/assets/hardware/Adyen AMS1 Terminal.png";
import adyenAMS1Schraeg    from "@/assets/hardware/Adyen AMS1 Terminal Schräg.png";

// ─── Assets: Drucker ─────────────────────────────────────────────────────────
import gm80mm              from "@/assets/hardware/Gastro Master - 80mm Drucker.png";
import gm80mmOben          from "@/assets/hardware/Gastro Master - 80mm Drucker Oben.png";
import gm80mmOffen         from "@/assets/hardware/Gastro Master - 80mm Drucker Offen.png";
import gm80mmOffenSchraeg  from "@/assets/hardware/Gastro Master - 80mm Drucker Offen Schräg.png";
import gm80mmOffenSeite    from "@/assets/hardware/Gastro Master - 80mm Drucker Offen Seite.png";
import gm80mmUnten         from "@/assets/hardware/Gastro Master - 80mm Drucker Unten.png";
import epson               from "@/assets/hardware/Epson Bondrucker TM-M30III.png";
import epsonFrontal        from "@/assets/hardware/Epson Bondrucker TM-M30III Frontal.png";
import epsonSeite          from "@/assets/hardware/Epson Bondrucker TM-M30III Seite.png";
import epsonT20            from "@/assets/hardware/Epson Bondrucker TM-T20III.png";
import epsonT20_2          from "@/assets/hardware/Epson Bondrucker TM-T20III 2.png";
import epsonT20_3          from "@/assets/hardware/Epson Bondrucker TM-T20III 3.png";
import gm58mm              from "@/assets/hardware/Gastro Master - 58mm Bon-Drucker.png";
import gm58mm_2            from "@/assets/hardware/Gastro Master - 58mm Bon-Drucker 2.png";
import gm58mm_3            from "@/assets/hardware/Gastro Master - 58mm Bon-Drucker 3.png";

// ─── Assets: Zubehör ─────────────────────────────────────────────────────────
import schublade           from "@/assets/hardware/Gastro Master - Kassenschublade.png";
import schubladeOffen      from "@/assets/hardware/Gastro Master - Kassenschublade Offen.png";
import staender            from "@/assets/hardware/Tablet Ständer.png";
import staenderSeite       from "@/assets/hardware/Tablet Ständer Seite.png";
import staenderAusgefahren from "@/assets/hardware/Tablet Ständer Ausgefahren.png";
import schutzhuelle1       from "@/assets/hardware/Microsoft Surface Pro - Schutzhülle 1.png";
import schutzhuelle2       from "@/assets/hardware/Microsoft Surface Pro - Schutzhülle 2.png";
import schutzhuelle3       from "@/assets/hardware/Microsoft Surface Pro - Schutzhülle 3.png";
import lanKabel            from "@/assets/hardware/Lan Kabel.png";
import { MoneyPageBacklinks } from "@/components/money/MoneyPageBacklinks";

// ─── Static image sets ────────────────────────────────────────────────────────
const KASSE_IMAGES = [
  [hwEloFront, hwEloSchraeg, hwEloHinten, hwEloPorts, hwEloSeite],
  [hwEloDblFront, hwEloDblSchraeg, hwEloDblHinten, hwEloDblPorts],
  [hwSurfaceFront, hwSurfaceSchraeg, hwSurfaceHinten, hwSurfaceSeite],
  [hwThinkpad1, hwThinkpad2, hwThinkpad3, hwThinkpad4, hwThinkpad5],
];

const TERMINAL_IMAGES = [
  [adyenS1F2L, adyenS1F2LUmfang, adyenS1F2LSchraeg],
  [adyenAMS1, adyenAMS1Schraeg],
  [gm58mm, gm58mm_2, gm58mm_3],
];

const PRINTER_IMAGES = [
  [gm80mm, gm80mmOben, gm80mmOffen, gm80mmOffenSchraeg, gm80mmOffenSeite, gm80mmUnten],
  [epson, epsonFrontal, epsonSeite],
  [epsonT20, epsonT20_2, epsonT20_3],
];

const ACCESSORY_IMAGES = [
  [schublade, schubladeOffen],
  [staender, staenderSeite, staenderAusgefahren],
  [schutzhuelle1, schutzhuelle2, schutzhuelle3],
  [lanKabel],
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = { title: string; desc: string; features: string[]; labels: string[] };
type FaqItem = { q: string; a: string };

// ─── Layout Switcher ──────────────────────────────────────────────────────────
// Zwei unabhängige Achsen:
//   • layout (Desktop, ab sm): 3 Spalten / 2 Spalten / Liste — LayoutToggle.
//   • mobileLayout (< sm): 1 Spalte / 2 Spalten — MobileLayoutToggle.
// Beide getrennt in localStorage persistiert. getGridClass() kombiniert die
// Mobile-Basis mit dem Desktop-Override (sm:), sodass beide Achsen koexistieren.
type LayoutMode = "3col" | "2col" | "list";
type MobileLayoutMode = "1col" | "2col";

const LAYOUT_STORAGE_KEY = "hardware-layout";
const MOBILE_LAYOUT_STORAGE_KEY = "hardware-mobile-layout";

// Kombiniert Mobile-Basis (grid-cols-1/2) + Desktop-Override (sm:/lg:). In
// 2-col-Mobile bewusst gap-1 → maximale Bildbreite pro Karte auf schmalen Screens.
const getGridClass = (layout: LayoutMode, mobileLayout: MobileLayoutMode): string => {
  const mobileBase = mobileLayout === "2col" ? "grid-cols-2 gap-1" : "grid-cols-1 gap-4";
  if (layout === "list") {
    // Mobile bleibt Raster (1/2 Spalten), Desktop wird zur Liste.
    return `grid ${mobileBase} sm:flex sm:flex-col sm:gap-4`;
  }
  const desktopCols =
    layout === "3col" ? "sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" : "sm:grid-cols-2 sm:gap-6";
  return `grid ${mobileBase} ${desktopCols}`;
};

const readStoredLayout = (): LayoutMode => {
  if (typeof window === "undefined") return "3col";
  const v = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
  return v === "2col" || v === "list" || v === "3col" ? v : "3col";
};

const readStoredMobileLayout = (): MobileLayoutMode => {
  if (typeof window === "undefined") return "1col";
  const v = window.localStorage.getItem(MOBILE_LAYOUT_STORAGE_KEY);
  return v === "2col" || v === "1col" ? v : "1col";
};

const LayoutToggle = ({ layout, onLayout }: { layout: LayoutMode; onLayout: (m: LayoutMode) => void }) => {
  const { t } = useTranslation("hardware");
  const options: { mode: LayoutMode; Icon: LucideIcon; label: string }[] = [
    { mode: "3col", Icon: LayoutGrid, label: t("view.threeCol", "3 Spalten") },
    { mode: "2col", Icon: Grid2x2, label: t("view.twoCol", "2 Spalten") },
    { mode: "list", Icon: List, label: t("view.list", "Liste") },
  ];
  return (
    // Nur ab sm sichtbar — auf Mobile ist die Ansicht ohnehin 1-spaltig.
    <div className="hidden sm:flex items-center gap-1 shrink-0 mt-1" role="group" aria-label={t("view.label", "Ansicht wählen")}>
      {options.map(({ mode, Icon, label }) => {
        const active = layout === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onLayout(mode)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              active
                ? "bg-cyan-brand text-white"
                : "border border-[#0A264A]/15 dark:border-white/15 text-[#0A264A]/50 dark:text-white/50 hover:border-cyan-brand/40 hover:text-cyan-brand"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

// Mobile-only Toggle (1 / 2 Spalten). Nur < sm sichtbar (flex sm:hidden) — auf
// Desktop übernimmt LayoutToggle. Beide teilen sich denselben Header-Platz rechts,
// ohne Überlappung, weil sich ihre Sichtbarkeits-Breakpoints gegenseitig ausschließen.
const MobileLayoutToggle = ({ mobileLayout, onMobileLayout }: { mobileLayout: MobileLayoutMode; onMobileLayout: (m: MobileLayoutMode) => void }) => {
  const { t } = useTranslation("hardware");
  const options: { mode: MobileLayoutMode; Icon: LucideIcon; label: string }[] = [
    { mode: "1col", Icon: Square, label: t("view.oneCol", "1 Spalte") },
    { mode: "2col", Icon: Grid2x2, label: t("view.twoCol", "2 Spalten") },
  ];
  return (
    <div className="flex sm:hidden items-center gap-1 shrink-0 mt-1" role="group" aria-label={t("view.label", "Ansicht wählen")}>
      {options.map(({ mode, Icon, label }) => {
        const active = mobileLayout === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onMobileLayout(mode)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              active
                ? "bg-cyan-brand text-white"
                : "border border-[#0A264A]/15 dark:border-white/15 text-[#0A264A]/50 dark:text-white/50 hover:border-cyan-brand/40 hover:text-cyan-brand"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

// ─── HwCard ──────────────────────────────────────────────────────────────────
const HwCard = ({ product, images, index, lp, inquiryCta, layout, mobileLayout }: {
  product: Product;
  images: string[];
  index: number;
  lp: (p: string) => string;
  inquiryCta: string;
  layout: LayoutMode;
  mobileLayout: MobileLayoutMode;
}) => {
  const { t } = useTranslation("hardware");
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  // Ausklappbare Beschreibung — nur relevant im 2-col-Mobile-Kompaktmodus.
  const [expanded, setExpanded] = useState(false);
  const isList = layout === "list";
  // Kompakt-Modus NUR auf Mobile in 2-col: quadratisches Bild mit wenig Padding
  // (max. Bildfläche), Titel + gekürzte Beschreibung (line-clamp-2, text-xs),
  // Feature-Tags ausgeblendet (zu breit für ~190px). Alle Kompakt-Klassen sind
  // mit `sm:`-Overrides gepaart → auf Desktop bleibt alles unverändert.
  const compact = mobileLayout === "2col";

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Bildcontainer: aspect-[4/3] + object-contain skaliert Querformat-Geräte
  // (z. B. ThinkPad X12) und Hochkant-Monitore (Elo) einheitlich — flache
  // Tablets wirken im 4:3-Rahmen nicht mehr verloren wie zuvor im 1:1-Rahmen.
  const imageBlock = (
    <div
      className={`relative bg-white dark:bg-white/[0.02] flex items-center justify-center ${
        isList
          ? `w-full sm:w-1/3 shrink-0 rounded-xl ${compact ? "aspect-square sm:aspect-[4/3] p-1 sm:p-4" : "aspect-[4/3] p-4"}`
          : `${compact ? "aspect-square sm:aspect-[4/3] p-1 sm:p-6" : "aspect-[4/3] p-6"}`
      }`}
    >
      <img
        src={images[current]}
        alt={`${product.title} — ${product.labels[current]}`}
        className="max-h-full max-w-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.03]"
        onClick={() => setLightbox(true)}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="hw-carousel-btn absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A264A]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0A264A]"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="hw-carousel-btn absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A264A]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0A264A]"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            aria-label={`${product.title} — Bild ${i + 1}`}
            className={`hw-carousel-btn h-2 rounded-full transition-all duration-200 ${i === current ? "bg-cyan-brand w-5" : "w-2 bg-[#0A264A]/20 dark:bg-white/20 hover:bg-[#0A264A]/40"}`}
          />
        ))}
      </div>
    </div>
  );

  const contentBlock = (
    <div className={isList ? "flex-1 flex flex-col justify-center px-2 sm:px-4 py-2" : compact ? "p-2 sm:p-6" : "p-6"}>
      <h3 className={`font-bold text-[#0A264A] dark:text-white ${compact ? "text-sm sm:text-lg line-clamp-2 mb-1 sm:mb-2" : "text-lg mb-2"}`}>{product.title}</h3>
      <p className={`text-[#0A264A]/60 dark:text-white/50 leading-relaxed ${compact ? `text-xs sm:text-sm sm:line-clamp-none mb-1 sm:mb-4 ${expanded ? "" : "line-clamp-3"}` : "text-sm mb-4"}`}>{product.desc}</p>
      {/* „Mehr lesen"-Toggle: nur 2-col-Mobile (sm:hidden) und nur wenn der Text
          lang genug ist, dass line-clamp-3 ihn vermutlich kürzt. stopPropagation
          verhindert, dass ein späterer Karten-Klick etwas anderes auslöst. */}
      {compact && product.desc.length > 80 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          aria-expanded={expanded}
          className="mb-3 flex w-fit items-center gap-0.5 text-xs font-medium text-cyan-brand sm:hidden"
        >
          {expanded
            ? <>{t("view.less", "Weniger")} <ChevronUp className="w-3 h-3" /></>
            : <>{t("view.more", "Mehr lesen")} <ChevronDown className="w-3 h-3" /></>}
        </button>
      )}
      <div className={`flex-wrap gap-2 mb-4 ${compact ? "hidden sm:flex" : "flex"}`}>
        {product.features.map(f => (
          <span key={f} className="text-xs font-medium text-cyan-brand bg-cyan-brand/10 px-2.5 py-1 rounded-full">{f}</span>
        ))}
      </div>
      <Link to={lp("/kontakt")} className={`inline-flex items-center gap-1.5 text-cyan-brand font-semibold hover:gap-2.5 transition-all duration-200 w-fit ${compact ? "text-xs sm:text-sm" : "text-sm"}`}>
        {inquiryCta} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={`group border border-[#0A264A]/[0.08] dark:border-white/[0.08] bg-[#f8fafc] dark:bg-white/[0.04] hover:border-cyan-brand/30 hover:shadow-xl transition-all duration-300 ${
          isList ? "flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-2xl" : "rounded-2xl overflow-hidden"
        }`}
      >
        {imageBlock}
        {contentBlock}
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[current]}
                alt={`${product.title} — ${product.labels[current]} (vergrößert)`}
                className="w-full h-full object-contain rounded-2xl"
              />
              {images.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <span className="text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {product.title} — {product.labels[current]}
                </span>
              </div>
              <button onClick={() => setLightbox(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors text-lg leading-none">
                ×
              </button>
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} aria-label={`Bild ${i + 1}`}
                    className={`hw-carousel-btn h-2 rounded-full transition-all duration-200 ${i === current ? "bg-cyan-brand w-5" : "w-2 bg-white/30 hover:bg-white/50"}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── CategorySection ──────────────────────────────────────────────────────────
const CategorySection = ({
  badge, headline, sub, products, imageSet, lp, inquiryCta, layout, onLayout, mobileLayout, onMobileLayout, bg,
}: {
  badge: string; headline: string; sub: string;
  products: Product[]; imageSet: string[][];
  lp: (p: string) => string; inquiryCta: string;
  layout: LayoutMode; onLayout: (m: LayoutMode) => void;
  mobileLayout: MobileLayoutMode; onMobileLayout: (m: MobileLayoutMode) => void;
  bg: string;
}) => (
  <section className={`${bg} px-5 md:px-8 lg:px-16 py-12 md:py-16 border-t border-[#0A264A]/[0.06] dark:border-white/[0.04]`}>
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 md:mb-12 flex items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">{badge}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0A264A] dark:text-white">{headline}</h2>
          <p className="text-[#0A264A]/55 dark:text-white/45 text-lg mt-3 max-w-2xl">{sub}</p>
        </motion.div>
        {/* Desktop-Toggle (hidden sm:flex) + Mobile-Toggle (flex sm:hidden) — nur
            einer ist je Breakpoint sichtbar, daher keine Überlappung. */}
        <LayoutToggle layout={layout} onLayout={onLayout} />
        <MobileLayoutToggle mobileLayout={mobileLayout} onMobileLayout={onMobileLayout} />
      </div>
      <div className={getGridClass(layout, mobileLayout)}>
        {products.map((p, i) => (
          <HwCard
            key={p.title}
            product={p}
            images={imageSet[i] ?? [imageSet[0][0]]}
            index={i}
            lp={lp}
            inquiryCta={inquiryCta}
            layout={layout}
            mobileLayout={mobileLayout}
          />
        ))}
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const HardwarePage = () => {
  const { t, ready } = useTranslation("hardware");
  const lp = useLangPath();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Layout-Präferenz des Besuchers (Grid 3/2 Spalten oder Liste), persistiert
  // in localStorage. Init aus dem Speicher, damit die Wahl den Reload überlebt.
  const [layout, setLayout] = useState<LayoutMode>(readStoredLayout);
  const handleLayout = (mode: LayoutMode) => {
    setLayout(mode);
    if (typeof window !== "undefined") window.localStorage.setItem(LAYOUT_STORAGE_KEY, mode);
  };

  // Eigener Mobile-State (1/2 Spalten), unabhängig vom Desktop-Layout und mit
  // separatem localStorage-Key.
  const [mobileLayout, setMobileLayout] = useState<MobileLayoutMode>(readStoredMobileLayout);
  const handleMobileLayout = (mode: MobileLayoutMode) => {
    setMobileLayout(mode);
    if (typeof window !== "undefined") window.localStorage.setItem(MOBILE_LAYOUT_STORAGE_KEY, mode);
  };

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  const kasseProducts    = arr("sections.kasse.products")      as Product[];
  const terminalProducts = arr("sections.terminals.products")  as Product[];
  const printerProducts  = arr("sections.printers.products")   as Product[];
  const accessoryProducts = arr("sections.accessories.products") as Product[];
  const faqItems         = arr("faq.items")                    as FaqItem[];

  const SCHEMA_BREADCRUMB = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://gastro-master.de" },
      { "@type": "ListItem", position: 2, name: "Produkte", item: "https://gastro-master.de/produkte" },
      { "@type": "ListItem", position: 3, name: "Hardware", item: "https://gastro-master.de/produkte/hardware" },
    ],
  };

  const SCHEMA_FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  useSeoMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    canonical: "https://gastro-master.de/produkte/hardware",
  });

  return (
    <div className={`min-h-screen transition-opacity duration-300 ${!ready ? "opacity-0" : "opacity-100"}`} style={{ backgroundColor: "#0A264A" }}>
      <ScrollProgressBar />
      <ScrollToTopButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="mesh-gradient min-h-[80vh] flex items-center px-5 md:px-8 lg:px-16 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#007DCF]/8 blur-[180px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
            >
              {t("hero.badge")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-8"
            >
              {t("hero.h1")}{" "}
              <span className="text-gradient-brand">{t("hero.h1Highlight")}</span>
              {" "}{t("hero.h1Suffix")}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative flex lg:hidden items-center justify-center my-8"
            >
              <div className="absolute inset-0 bg-[#007DCF]/12 blur-[80px] rounded-full scale-75" />
              <img src={kassenhardwareImg} alt={t("hero.heroImgAlt")} className="relative z-10 w-full max-w-sm drop-shadow-2xl" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-white/55 max-w-xl leading-relaxed mb-12"
            >
              {t("hero.sub")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={lp("/kontakt")}
                className="bg-gradient-amber text-[#0A264A] font-bold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
              >
                {t("hero.cta1")} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#produkte"
                className="border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 transition-all"
              >
                {t("hero.cta2")}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-[#007DCF]/10 blur-[100px] rounded-full scale-75" />
            <img src={kassenhardwareImg} alt={t("hero.heroImgAlt")} className="relative z-10 w-full max-w-lg drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ─────────────────────────────────────────────── */}
      <div id="produkte">
        <CategorySection
          badge={t("sections.kasse.badge")}
          headline={t("sections.kasse.headline")}
          sub={t("sections.kasse.sub")}
          products={kasseProducts}
          imageSet={KASSE_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          layout={layout}
          onLayout={handleLayout}
          mobileLayout={mobileLayout}
          onMobileLayout={handleMobileLayout}
          bg="bg-white dark:bg-[#111111]"
        />

        <CategorySection
          badge={t("sections.terminals.badge")}
          headline={t("sections.terminals.headline")}
          sub={t("sections.terminals.sub")}
          products={terminalProducts}
          imageSet={TERMINAL_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          layout={layout}
          onLayout={handleLayout}
          mobileLayout={mobileLayout}
          onMobileLayout={handleMobileLayout}
          bg="bg-[#F5F7FA] dark:bg-[#0A264A]/25"
        />

        <CategorySection
          badge={t("sections.printers.badge")}
          headline={t("sections.printers.headline")}
          sub={t("sections.printers.sub")}
          products={printerProducts}
          imageSet={PRINTER_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          layout={layout}
          onLayout={handleLayout}
          mobileLayout={mobileLayout}
          onMobileLayout={handleMobileLayout}
          bg="bg-white dark:bg-[#111111]"
        />

        <CategorySection
          badge={t("sections.accessories.badge")}
          headline={t("sections.accessories.headline")}
          sub={t("sections.accessories.sub")}
          products={accessoryProducts}
          imageSet={ACCESSORY_IMAGES}
          lp={lp}
          inquiryCta={t("inquiryCta")}
          layout={layout}
          onLayout={handleLayout}
          mobileLayout={mobileLayout}
          onMobileLayout={handleMobileLayout}
          bg="bg-[#F5F7FA] dark:bg-[#0A264A]/25"
        />
      </div>

      {/* ── CTA DARK ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              {t("cta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t("cta.headline")}</h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-xl mx-auto">{t("cta.sub")}</p>
            <Link
              to={lp("/kontakt")}
              className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
            >
              {t("cta.button")} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#111111] px-5 md:px-8 lg:px-16 py-12 md:py-16 border-t border-[#0A264A]/[0.06] dark:border-white/[0.04]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_2fr] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-xs font-bold uppercase tracking-widest mb-4 block">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white">{t("faq.headline")}</h2>
            <p className="text-[#0A264A]/55 dark:text-white/45 text-base mt-3">{t("faq.sub")}</p>
          </motion.div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-[#0A264A]/[0.08] dark:border-white/[0.08] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#f8fafc] dark:bg-white/[0.04] hover:bg-[#f0f4f8] dark:hover:bg-white/[0.06] transition-colors"
                >
                  <span className="font-semibold text-[#0A264A] dark:text-white text-sm pr-4">{item.q}</span>
                  {openFaq === i
                    ? <Minus className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                    : <Plus className="w-4 h-4 text-[#0A264A]/40 dark:text-white/40 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 py-4 text-[#0A264A]/65 dark:text-white/50 text-sm leading-relaxed bg-white dark:bg-white/[0.02]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM CTA ─────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <HomeTeamCTA />
      </div>
      <div className="md:hidden">
        <CTASection {...getCTAConfig("/produkte/pakete/kassensystem")} />
      </div>

      {/* Batch 6 Runde 3 — 11. Money-Page: dieselben 6 Blog-Backlinks wie im
          Prerenderer, aus derselben Quelle (money-page-links.ts). */}
      <MoneyPageBacklinks routeKey="hardware" hub="produkte" />

      <Footer />
    </div>
  );
};

export default HardwarePage;

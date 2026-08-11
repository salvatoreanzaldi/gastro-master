import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { buildLocalizedPath, buildComparisonPath, ROUTE_BY_LANG_SLUG, VERGLEICHE_SEGMENTS_ALL, VERGLEICHE_SEGMENT as VERGLEICHE_SEGMENT_BY_LANG, type LangCode } from "@/config/routes";
import { extractLangFromPath } from "@/components/LanguageLayout";
import {
  ArrowRight, Menu, X, Moon, Sun, ChevronDown, ChevronRight,
  ShoppingCart, Smartphone, Globe, Monitor, Percent,
  Truck, Store, Coffee, UtensilsCrossed, Building2, Ghost,
  Package, Puzzle, Server, Printer, QrCode, Hand,
} from "lucide-react";
// Anzeigegröße ist 36×36 (w-9 h-9); Quelle war 1024×1024/352 KB. 72px = 2× für
// Retina, als WebP via vite-imagetools (gleiches Muster wie die Team-Bilder).
import logo from "@/assets/logos/logo-gastro-master-round.png?w=72&format=webp";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type SupportedLang, RTL_LANGS } from "@/i18n";
import DeutschIcon from "@/assets/icons/Deutsch.svg";
import EnglischIcon from "@/assets/icons/Englisch.svg";
import ItalienischIcon from "@/assets/icons/Italienisch.svg";
import PersischIcon from "@/assets/icons/Persisch.svg";
import { PAKETE_LINKS, ADDON_LINKS, LOESUNGEN_LINKS } from "@/data/site-navigation";
import RussischIcon from "@/assets/icons/Russisch.svg";
import SinghalesischIcon from "@/assets/icons/Singhalesisch.svg";

// Batch 7: Ziele + Reihenfolge kommen aus src/data/site-navigation.ts (dieselbe
// Quelle wie Footer und statisches Prerender-HTML). Hier bleiben nur die Icons
// — reine Darstellung, index-parallel zu den i18n-Label-Arrays.
const PAKETE_ICONS = [ShoppingCart, Smartphone, Globe, Monitor];
const paketeRoutes = PAKETE_LINKS.map((l, i) => ({ to: l.deSlug, icon: PAKETE_ICONS[i] }));

const ADDON_ICONS = [Percent, Printer, Truck, QrCode, Monitor, Hand];
const addonsRoutes = ADDON_LINKS.map((l, i) => ({ to: l.deSlug, icon: ADDON_ICONS[i] }));

type ProdCategoryKey = "pakete" | "addons" | "hardware";
const prodCategories: { key: ProdCategoryKey; to: string; icon: typeof Package; hasChildren: boolean }[] = [
  { key: "pakete",   to: "/produkte",           icon: Package,  hasChildren: true  },
  { key: "addons",   to: "/produkte/add-ons",   icon: Puzzle,   hasChildren: true  },
  { key: "hardware", to: "/produkte/hardware",  icon: Server,   hasChildren: false },
];

const LOES_ICONS = [Truck, Building2, UtensilsCrossed, Store, Coffee, Ghost];
const loesRoutes = LOESUNGEN_LINKS.map((l, i) => ({ to: l.deSlug, icon: LOES_ICONS[i] }));

const languages: { code: SupportedLang; label: string; icon: string }[] = [
  { code: "de", label: "Deutsch", icon: DeutschIcon },
  { code: "en", label: "English", icon: EnglischIcon },
  { code: "it", label: "Italiano", icon: ItalienischIcon },
  { code: "fa", label: "فارسی", icon: PersischIcon },
  { code: "si", label: "සිංහල", icon: SinghalesischIcon },
  { code: "ru", label: "Русский", icon: RussischIcon },
];

const Navbar = () => {
  const { t, i18n } = useTranslation("common");
  const { pathname } = useLocation();
  const currentLang = (extractLangFromPath(pathname) ?? (i18n.language || "de")) as SupportedLang;
  const lp = (deSlug: string) => buildLocalizedPath(deSlug, currentLang as LangCode);

  const arr = <T,>(key: string): T[] => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? (v as T[]) : []; };
  type Entry = { label: string; desc: string };
  const prodCatData = arr<Entry>("nav.prodCategories");
  const paketeItemsData = arr<Entry>("nav.prodSubPakete");
  const addonsItemsData = arr<Entry>("nav.prodSubAddons");
  const loesItemsData = arr<Entry>("nav.loesItems");
  const prodCategoriesItems = prodCategories.map((c, i) => ({ ...c, label: prodCatData[i]?.label || "", desc: prodCatData[i]?.desc || "" }));
  const paketeItems = paketeRoutes.map((r, i) => ({ ...r, label: paketeItemsData[i]?.label || "", desc: paketeItemsData[i]?.desc || "" }));
  const addonsItems = addonsRoutes.map((r, i) => ({ ...r, label: addonsItemsData[i]?.label || "", desc: addonsItemsData[i]?.desc || "" }));
  const loesungenItems = loesRoutes.map((r, i) => ({ ...r, label: loesItemsData[i]?.label || "", desc: loesItemsData[i]?.desc || "" }));
  const navigate = useNavigate();
  // Helle Seiten ohne Hero-Hintergrund brauchen immer die sichtbare (aktive) Navbar
  // Resolve back to canonical DE slug so the check works for ALL languages
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "") || "/";
  const currentRoute = ROUTE_BY_LANG_SLUG[currentLang as LangCode]?.[pathWithoutLang];
  const deSlug = currentRoute?.slugs.de ?? pathWithoutLang;
  const isComparisonPath = VERGLEICHE_SEGMENTS_ALL.some(
    (seg) => deSlug === `/${seg}` || deSlug.startsWith(`/${seg}/`),
  );
  const alwaysVisible =
    ["/impressum", "/datenschutz", "/agb", "/kontakt", "/preise", "/integrations"].includes(deSlug) ||
    deSlug.startsWith("/downloads") ||
    // Präfixlose Standalone-Seite: raw pathname prüfen — die deSlug-Ableitung
    // oben strippt bei Pfaden ohne Sprach-Präfix fälschlich die ersten 2 Buchstaben.
    pathname === "/request-data-delete" ||
    isComparisonPath;
  const [scrolled, setScrolled]             = useState(false);
  const active = scrolled || alwaysVisible; // steuert schmal/weit — auf hellen Pages ohne Hero ab Page-Load aktiv
  const visibleBg = alwaysVisible || scrolled; // steuert Hintergrund-Sichtbarkeit
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [dark, setDark]                     = useState(false);
  const [langOpen, setLangOpen]             = useState(false);
  const [prodDropOpen, setProdDropOpen]     = useState(false);
  const [loesDropOpen, setLoesDropOpen]     = useState(false);
  const [prodMobOpen, setProdMobOpen]       = useState(false);
  const [loesMobOpen, setLoesMobOpen]       = useState(false);
  const [paketeMobOpen, setPaketeMobOpen]   = useState(false);
  const [addonsMobOpen, setAddonsMobOpen]   = useState(false);
  const [prodSubOpen, setProdSubOpen]       = useState<ProdCategoryKey | null>(null);
  const langRef      = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);
  const prodRef      = useRef<HTMLDivElement>(null);
  const loesRef      = useRef<HTMLDivElement>(null);
  const prodCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutsideDesktopLang = langRef.current && !langRef.current.contains(e.target as Node);
      const isOutsideMobileLang = langRefMobile.current && !langRefMobile.current.contains(e.target as Node);
      if (isOutsideDesktopLang && isOutsideMobileLang) setLangOpen(false);
      if (prodRef.current && !prodRef.current.contains(e.target as Node)) { setProdDropOpen(false); setProdSubOpen(null); }
      if (loesRef.current && !loesRef.current.contains(e.target as Node)) setLoesDropOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToForm = () => {
    setMobileOpen(false);
    navigate(lp("/kontakt"));
  };

  const switchLanguage = (code: SupportedLang) => {
    // Map current slug back to canonical DE slug, then forward to the target language's slug
    const currentSlug = pathname.replace(/^\/[a-z]{2}/, "") || "/";

    // Comparison-Hub (/vergleiche | /vs | /confronti):
    // not in ROUTE_BY_LANG_SLUG — switch directly to target lang's hub segment.
    const isHub = VERGLEICHE_SEGMENTS_ALL.some(
      (seg) => currentSlug === `/${seg}` || currentSlug === `/${seg}/`,
    );
    if (isHub) {
      navigate(`/${code}/${VERGLEICHE_SEGMENT_BY_LANG[code as LangCode]}`);
      setLangOpen(false);
      setMobileOpen(false);
      return;
    }

    // Dynamic comparison detail-page (/vergleiche/:slug | /vs/:slug | /confronti/:slug):
    // not in ROUTE_BY_LANG_SLUG — extract competitor slug, rebuild for target lang.
    const comparisonMatch = VERGLEICHE_SEGMENTS_ALL.map((seg) => {
      const re = new RegExp(`^/${seg}/([^/]+)/?$`);
      return currentSlug.match(re);
    }).find((m) => m !== null);
    if (comparisonMatch) {
      navigate(buildComparisonPath(comparisonMatch[1], code as LangCode));
      setLangOpen(false);
      setMobileOpen(false);
      return;
    }

    const route = ROUTE_BY_LANG_SLUG[currentLang as LangCode]?.[currentSlug];
    const deSlugForLookup = route?.slugs.de ?? currentSlug;
    const newPath = buildLocalizedPath(deSlugForLookup, code as LangCode);
    navigate(newPath);
    setLangOpen(false);
    setMobileOpen(false);
  };

  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];

  const DropdownMenu = ({ items, onClose }: { items: typeof loesungenItems; onClose: () => void }) => (
    <div className="bg-surface-navy/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden py-2">
      {items.map(item => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={lp(item.to)}
            onClick={onClose}
            className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.06] transition-colors"
          >
            <Icon className="w-4 h-4 text-cyan-brand mt-0.5 flex-shrink-0" strokeWidth={1.75} />
            <div>
              <p className="text-white text-sm font-semibold leading-none mb-0.5">{item.label}</p>
              <p className="text-white/45 text-xs">{item.desc}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className={`fixed z-50 rounded-2xl border border-primary-foreground/10 py-3 transition-[top,left,right,background-color,box-shadow,backdrop-filter] duration-700 ease-out will-change-[transform,opacity] ${active
        // Scrolled-Pill-Breiten: Desktop-Nav braucht ~790px Content (gemessen).
        // xl (1280–1535): 15%-Inset → 70% Breite (896–1075px) passt sicher.
        // 2xl (≥1536): Original-Design 20%-Inset → 60% (≥921px) passt.
        // lg bleibt 20% — dort läuft ab jetzt der Burger (schmal = ok).
        // Mobil (<sm/640px) bewusst KEIN Inset: die Bar bleibt beim Scrollen
        // konstant (top-3 left-3 right-3 wie im Ruhezustand) und „schrumpft"
        // nicht. Der Pill-Shrink startet erst ab sm: aufwärts.
        ? "top-3 left-3 right-3 sm:top-2 sm:left-[10%] sm:right-[10%] md:left-[15%] md:right-[15%] lg:left-[20%] lg:right-[20%] xl:left-[15%] xl:right-[15%] 2xl:left-[20%] 2xl:right-[20%]"
        : "top-3 left-3 right-3 md:top-4 md:left-6 md:right-6"
      } ${visibleBg
        ? "bg-surface-navy/85 backdrop-blur-2xl shadow-2xl shadow-black/25"
        : "bg-primary-foreground/5 backdrop-blur-md"
      }`}>
      <div className="flex items-center justify-between px-4 md:px-5">

        {/* Logo */}
        <Link to={lp("/")} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden bg-white/10 ring-1 ring-primary-foreground/15">
            <img
              src={logo}
              alt="Gastro Master"
              width={36}
              height={36}
              loading="eager"
              {...{ fetchpriority: "high" }}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-primary-foreground font-bold text-lg">Gastro Master</span>
        </Link>

        {/* ── Desktop links ── */}
        {/* Welle-I Navbar-Fix: Desktop-Nav erst ab xl (1280px) — bei lg (1024–1279)
            passt der Scrolled-Pill-Container (60% Breite = 614–768px) nicht für
            die ~790px Nav-Content → Overflow. Unter xl: Burger. */}
        <div className={`hidden xl:flex items-center transition-all duration-700 ${active ? "gap-4" : "gap-6"}`}>

          {/* Produkte dropdown */}
          <div
            className="relative"
            ref={prodRef}
            onMouseEnter={() => { if (prodCloseTimer.current) clearTimeout(prodCloseTimer.current); setProdDropOpen(true); }}
            onMouseLeave={() => { prodCloseTimer.current = setTimeout(() => { setProdDropOpen(false); setProdSubOpen(null); }, 150); }}
          >
            <Link to={lp("/produkte")} onClick={() => { setProdDropOpen(false); setProdSubOpen(null); }}
              className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
              {t('nav.produkte')}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${prodDropOpen ? "rotate-180" : ""}`} />
            </Link>
            {prodDropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-3 z-50">
                <div className="bg-surface-navy/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 py-2">
                  {prodCategoriesItems.map(cat => {
                    const CatIcon = cat.icon;
                    const isOpen = prodSubOpen === cat.key;
                    const subItems = cat.key === "pakete" ? paketeItems : cat.key === "addons" ? addonsItems : [];
                    const rowClass = "flex items-start gap-3 px-4 py-3 hover:bg-white/[0.06] transition-colors w-full text-left";
                    const rowContent = (
                      <>
                        <CatIcon className="w-4 h-4 text-cyan-brand mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold leading-none mb-0.5">{cat.label}</p>
                          <p className="text-white/45 text-xs">{cat.desc}</p>
                        </div>
                        {cat.hasChildren && (
                          <ChevronRight className={`w-4 h-4 text-white/40 mt-0.5 flex-shrink-0 transition-colors ${isOpen ? "text-cyan-brand" : ""}`} />
                        )}
                      </>
                    );
                    return (
                      <div
                        key={cat.key}
                        className="relative"
                        onMouseEnter={() => setProdSubOpen(cat.hasChildren ? cat.key : null)}
                      >
                        {cat.hasChildren ? (
                          <button
                            type="button"
                            onClick={() => setProdSubOpen(isOpen ? null : cat.key)}
                            className={rowClass}
                            aria-expanded={isOpen}
                          >
                            {rowContent}
                          </button>
                        ) : (
                          <Link
                            to={lp(cat.to)}
                            onClick={() => { setProdDropOpen(false); setProdSubOpen(null); }}
                            className={rowClass}
                          >
                            {rowContent}
                          </Link>
                        )}
                        {cat.hasChildren && isOpen && (
                          <div className="absolute top-0 left-full pl-2 w-72 z-50">
                            <div className="bg-surface-navy/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden py-2">
                              {subItems.map(item => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.to}
                                    to={lp(item.to)}
                                    onClick={() => { setProdDropOpen(false); setProdSubOpen(null); }}
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.06] transition-colors"
                                  >
                                    <Icon className="w-4 h-4 text-cyan-brand mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                                    <div>
                                      <p className="text-white text-sm font-semibold leading-none mb-0.5">{item.label}</p>
                                      <p className="text-white/45 text-xs">{item.desc}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Lösungen dropdown */}
          <div
            className="relative"
            ref={loesRef}
            onMouseEnter={() => { if (loesCloseTimer.current) clearTimeout(loesCloseTimer.current); setLoesDropOpen(true); }}
            onMouseLeave={() => { loesCloseTimer.current = setTimeout(() => setLoesDropOpen(false), 150); }}
          >
            <Link to={lp("/loesungen")} onClick={() => setLoesDropOpen(false)}
              className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
              {t('nav.loesungen')}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${loesDropOpen ? "rotate-180" : ""}`} />
            </Link>
            {loesDropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-3 z-50">
                <DropdownMenu items={loesungenItems} onClose={() => setLoesDropOpen(false)} />
              </div>
            )}
          </div>

          {/* Preise page link */}
          <Link to={lp("/preise")} className="text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
            {t('nav.preise')}
          </Link>

          {/* Über uns */}
          <Link to={lp("/uber-uns")} className="text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
            {t('nav.ueberUns')}
          </Link>

          {/* Dark mode */}
          <button
            onClick={() => setDark(!dark)}
            className="w-7 h-7 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            aria-label="Dark Mode"
          >
            {dark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
          </button>

          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all text-sm font-medium"
              aria-label="Select language"
            >
              <img src={currentLangObj.icon} alt={currentLangObj.label} className="w-5 h-5 rounded-full" />
              <span className="text-xs font-bold uppercase">{currentLang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className={`absolute ${RTL_LANGS.includes(currentLang as SupportedLang) ? "left-0" : "right-0"} top-full mt-2 bg-surface-navy border border-primary-foreground/15 rounded-xl shadow-2xl shadow-black/30 overflow-hidden z-50 min-w-[130px]`}>
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { switchLanguage(l.code); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      currentLang === l.code
                        ? "bg-primary-foreground/10 text-primary-foreground font-semibold"
                        : "text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground"
                    }`}
                  >
                    <img src={l.icon} alt={l.label} className="w-5 h-5 rounded-full" />
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={scrollToForm}
            className="bg-gradient-amber text-white dark:text-[#0A264A] font-bold rounded-xl hover:scale-[1.02] transition-all duration-700 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm whitespace-nowrap flex-shrink-0">
            {t('nav.cta')}
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>

        {/* ── Mobile toggle ── */}
        <div className="flex items-center gap-2 xl:hidden">
          <button onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60"
            aria-label="Dark Mode">
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <div className="relative" ref={langRefMobile}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-8 h-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center"
              aria-label="Select language">
              <img src={currentLangObj.icon} alt={currentLangObj.label} className="w-6 h-6 rounded-full" />
            </button>
            {langOpen && (
              <div className={`absolute ${RTL_LANGS.includes(currentLang as SupportedLang) ? "left-0" : "right-0"} top-full mt-2 bg-surface-navy border border-primary-foreground/15 rounded-xl shadow-2xl shadow-black/30 overflow-hidden z-50 min-w-[130px]`}>
                {languages.map(l => (
                  <button key={l.code} onClick={() => { switchLanguage(l.code); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      currentLang === l.code ? "bg-primary-foreground/10 text-primary-foreground font-semibold" : "text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground"
                    }`}>
                    <img src={l.icon} alt={l.label} className="w-5 h-5 rounded-full" />
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileOpen}
            className="w-11 h-11 flex items-center justify-center -mr-2 text-primary-foreground"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-primary-foreground/10 px-5 py-5 mt-2 space-y-1">

          {/* Produkte accordion */}
          <div>
            <div className="flex items-center">
              <Link
                to={lp("/produkte")}
                onClick={() => setMobileOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground font-medium py-2 pr-3"
              >
                {t('nav.produkte')}
              </Link>
              <button
                onClick={() => setProdMobOpen(!prodMobOpen)}
                className="flex-1 flex items-center justify-end py-2 px-1"
                aria-label={`${t('nav.produkte')} ${t('a11y.submenu')}`}
              >
                <ChevronDown className={`w-4 h-4 text-primary-foreground/70 transition-transform duration-200 ${prodMobOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {prodMobOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l border-white/10 mb-2">
                {prodCategoriesItems.map(cat => {
                  const CatIcon = cat.icon;
                  if (!cat.hasChildren) {
                    return (
                      <Link
                        key={cat.key}
                        to={lp(cat.to)}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium"
                      >
                        <CatIcon className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0" />
                        {cat.label}
                      </Link>
                    );
                  }
                  const subOpen = cat.key === "pakete" ? paketeMobOpen : addonsMobOpen;
                  const setSubOpen = cat.key === "pakete" ? setPaketeMobOpen : setAddonsMobOpen;
                  const subItems = cat.key === "pakete" ? paketeItems : addonsItems;
                  return (
                    <div key={cat.key}>
                      <button
                        onClick={() => setSubOpen(!subOpen)}
                        className="flex items-center w-full py-2 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium text-left"
                        aria-expanded={subOpen}
                      >
                        <CatIcon className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0 mr-2" />
                        {cat.label}
                        <ChevronDown className={`w-3.5 h-3.5 ml-auto text-primary-foreground/70 transition-transform duration-200 ${subOpen ? "rotate-180" : ""}`} />
                      </button>
                      {subOpen && (
                        <div className="pl-4 space-y-1 border-l border-white/10 mb-1">
                          {subItems.map(item => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.to}
                                to={lp(item.to)}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 py-2 text-primary-foreground/60 hover:text-primary-foreground text-sm"
                              >
                                <Icon className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Lösungen accordion */}
          <div>
            <div className="flex items-center">
              <Link
                to={lp("/loesungen")}
                onClick={() => setMobileOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground font-medium py-2 pr-3"
              >
                {t('nav.loesungen')}
              </Link>
              <button
                onClick={() => setLoesMobOpen(!loesMobOpen)}
                className="flex-1 flex items-center justify-end py-2 px-1"
                aria-label={`${t('nav.loesungen')} ${t('a11y.submenu')}`}
              >
                <ChevronDown className={`w-4 h-4 text-primary-foreground/70 transition-transform duration-200 ${loesMobOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {loesMobOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l border-white/10 mb-2">
                {loesungenItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 text-primary-foreground/60 hover:text-primary-foreground text-sm">
                      <Icon className="w-3.5 h-3.5 text-cyan-brand flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Preise page link */}
          <Link to={lp("/preise")} onClick={() => setMobileOpen(false)}
            className="block text-primary-foreground/70 hover:text-primary-foreground font-medium py-2">
            {t('nav.preise')}
          </Link>

          {/* Über uns */}
          <Link to={lp("/uber-uns")} onClick={() => setMobileOpen(false)}
            className="block text-primary-foreground/70 hover:text-primary-foreground font-medium py-2">
            {t('nav.ueberUns')}
          </Link>
          <button onClick={scrollToForm}
            className="w-full bg-gradient-amber text-white dark:text-[#0A264A] font-bold px-5 py-3 rounded-xl text-base mt-2">
            {t('nav.cta')}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

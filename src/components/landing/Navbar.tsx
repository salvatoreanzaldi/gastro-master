import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight, Menu, X, Moon, Sun, ChevronDown,
  ShoppingCart, Smartphone, Globe, Monitor, Percent,
  Truck, Store, Coffee, UtensilsCrossed, Building2,
} from "lucide-react";
import logo from "@/assets/logo-gastro-master-round.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { LangCode } from "@/lib/translations";

const prodItems = [
  { label: "Online Shop",         desc: "0% Provision, eigene Domain",       to: "/produkte/webshop",            icon: ShoppingCart },
  { label: "App System",          desc: "iOS & Android App",                 to: "/produkte/app",                icon: Smartphone   },
  { label: "Webseite",            desc: "Professionell & schnell",           to: "/produkte/webseite",           icon: Globe        },
  { label: "Kassensystem",        desc: "TSE-konform, Cloud-POS",            to: "/produkte/kassensystem",       icon: Monitor      },
  { label: "Transaktions-Umlage", desc: "Gebühren transparent weitergeben", to: "/produkte/transaktionsumlage", icon: Percent      },
];

const loesungenItems = [
  { label: "Lieferdienst gründen", desc: "Eigenen Service aufbauen",     to: "/loesungen/lieferservice-gruenden", icon: Truck          },
  { label: "Franchise",            desc: "Deine Marke, dein System",     to: "/loesungen/franchise",              icon: Building2      },
  { label: "Restaurant",           desc: "Tisch, Bar & Kasse vereint",   to: "/loesungen/restaurant",             icon: UtensilsCrossed},
  { label: "Lieferdienst",         desc: "Fahrer-App & Liefergebiete",   to: "/loesungen/lieferdienst",           icon: Store          },
  { label: "Café & Bäckerei",      desc: "Einfach & schnell starten",    to: "/loesungen/cafe-baeckerei",         icon: Coffee         },
];

const languages: { code: LangCode; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isContentPage = pathname !== "/";
  const [scrolled, setScrolled]             = useState(false);
  const active = isContentPage || scrolled;
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [dark, setDark]                     = useState(false);
  const [langOpen, setLangOpen]             = useState(false);
  const [prodDropOpen, setProdDropOpen]     = useState(false);
  const [loesDropOpen, setLoesDropOpen]     = useState(false);
  const [prodMobOpen, setProdMobOpen]       = useState(false);
  const [loesMobOpen, setLoesMobOpen]       = useState(false);
  const langRef      = useRef<HTMLDivElement>(null);
  const prodRef      = useRef<HTMLDivElement>(null);
  const loesRef      = useRef<HTMLDivElement>(null);
  const prodCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (prodRef.current && !prodRef.current.contains(e.target as Node)) setProdDropOpen(false);
      if (loesRef.current && !loesRef.current.contains(e.target as Node)) setLoesDropOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToForm = () => {
    setMobileOpen(false);
    navigate("/kontakt");
  };

  const currentLang = languages.find(l => l.code === lang)!;

  const DropdownMenu = ({ items, onClose }: { items: typeof prodItems; onClose: () => void }) => (
    <div className="bg-surface-navy/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden py-2">
      {items.map(item => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
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
    <nav className={`fixed z-50 transition-all duration-700 ease-out rounded-2xl border border-primary-foreground/10 py-3 ${active
        ? "top-2 left-[10%] right-[10%] md:left-[15%] md:right-[15%] lg:left-[20%] lg:right-[20%] bg-surface-navy/85 backdrop-blur-2xl shadow-2xl shadow-black/25"
        : "top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 bg-primary-foreground/5 backdrop-blur-md"
      }`}>
      <div className="flex items-center justify-between px-4 md:px-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden bg-white/10 ring-1 ring-primary-foreground/15">
            <img src={logo} alt="Gastro Master" className="w-full h-full object-contain" />
          </div>
          <span className="text-primary-foreground font-bold text-lg">Gastro Master</span>
        </Link>

        {/* ── Desktop links ── */}
        <div className={`hidden lg:flex items-center transition-all duration-700 ${active ? "gap-4" : "gap-6"}`}>

          {/* Produkte dropdown */}
          <div
            className="relative"
            ref={prodRef}
            onMouseEnter={() => { if (prodCloseTimer.current) clearTimeout(prodCloseTimer.current); setProdDropOpen(true); }}
            onMouseLeave={() => { prodCloseTimer.current = setTimeout(() => setProdDropOpen(false), 150); }}
          >
            <button className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
              {t.nav.produkte}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${prodDropOpen ? "rotate-180" : ""}`} />
            </button>
            {prodDropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-3 z-50">
                <DropdownMenu items={prodItems} onClose={() => setProdDropOpen(false)} />
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
            <button className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
              Lösungen
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${loesDropOpen ? "rotate-180" : ""}`} />
            </button>
            {loesDropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-3 z-50">
                <DropdownMenu items={loesungenItems} onClose={() => setLoesDropOpen(false)} />
              </div>
            )}
          </div>

          {/* Preise anchor link */}
          <a href="#preise" className="text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
            {t.nav.preise}
          </a>

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
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="text-xs font-bold uppercase">{lang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-surface-navy border border-primary-foreground/15 rounded-xl shadow-2xl shadow-black/30 overflow-hidden z-50 min-w-[130px]">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      lang === l.code
                        ? "bg-primary-foreground/10 text-primary-foreground font-semibold"
                        : "text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground"
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={scrollToForm}
            className="bg-gradient-amber text-white dark:text-[#0A264A] font-bold rounded-xl hover:scale-[1.02] transition-all duration-700 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm whitespace-nowrap flex-shrink-0">
            {t.nav.cta}
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>

        {/* ── Mobile toggle ── */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60"
            aria-label="Dark Mode">
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-8 h-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-base"
              aria-label="Select language">
              {currentLang.flag}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-surface-navy border border-primary-foreground/15 rounded-xl shadow-2xl shadow-black/30 overflow-hidden z-50 min-w-[130px]">
                {languages.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                      lang === l.code ? "bg-primary-foreground/10 text-primary-foreground font-semibold" : "text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground"
                    }`}>
                    <span className="text-base">{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-primary-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-primary-foreground/10 px-5 py-5 mt-2 space-y-1">

          {/* Produkte accordion */}
          <div>
            <button
              onClick={() => setProdMobOpen(!prodMobOpen)}
              className="flex items-center w-full text-primary-foreground/70 hover:text-primary-foreground font-medium py-2 text-left"
            >
              {t.nav.produkte}
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${prodMobOpen ? "rotate-180" : ""}`} />
            </button>
            {prodMobOpen && (
              <div className="pl-4 mt-1 space-y-1 border-l border-white/10 mb-2">
                {prodItems.map(item => {
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

          {/* Lösungen accordion */}
          <div>
            <button
              onClick={() => setLoesMobOpen(!loesMobOpen)}
              className="flex items-center w-full text-primary-foreground/70 hover:text-primary-foreground font-medium py-2 text-left"
            >
              Lösungen
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${loesMobOpen ? "rotate-180" : ""}`} />
            </button>
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

          {/* Anchor links */}
          <a href="#preise" onClick={() => setMobileOpen(false)}
            className="block text-primary-foreground/70 hover:text-primary-foreground font-medium py-2">
            {t.nav.preise}
          </a>
          <button onClick={scrollToForm}
            className="w-full bg-gradient-amber text-white dark:text-[#0A264A] font-bold px-5 py-3 rounded-xl text-base mt-2">
            {t.nav.cta}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

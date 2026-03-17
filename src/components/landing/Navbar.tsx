import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo-gastro-master-round.png";

const navLinks = [
  { label: "Produkte", href: "#produkte" },
  { label: "Rechner", href: "#rechner" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "Preise", href: "#preise" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollToForm = () => {
    setMobileOpen(false);
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed z-50 transition-all duration-700 ease-out rounded-2xl border border-primary-foreground/10 ${
      scrolled
        ? "top-2 left-[12%] right-[12%] md:left-[18%] md:right-[18%] lg:left-[24%] lg:right-[24%] bg-surface-navy/85 backdrop-blur-2xl shadow-2xl shadow-black/25 py-3"
        : "top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 bg-primary-foreground/5 backdrop-blur-md py-3"
    }`}>
      <div className="flex items-center justify-between px-4 md:px-5">
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <img src={logo} alt="Gastro Master" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-primary-foreground font-bold text-base">Gastro Master</span>
          <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25 font-medium px-2.5 py-0.5 text-xs">
            Lokal Editiert
          </span>
        </a>

        {/* Desktop links */}
        <div className={`hidden md:flex items-center transition-all duration-700 ${scrolled ? "gap-4" : "gap-7"}`}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-primary-foreground/70 hover:text-primary-foreground font-medium transition-all duration-500 text-sm">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            aria-label="Dark Mode umschalten"
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold rounded-xl hover:scale-[1.02] transition-all duration-700 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm">
            Kostenlose Beratung
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60"
            aria-label="Dark Mode umschalten"
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-primary-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-primary-foreground/10 px-5 py-5 mt-2 space-y-3">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-primary-foreground/70 hover:text-primary-foreground font-medium py-2">
              {l.label}
            </a>
          ))}
          <button onClick={scrollToForm}
            className="w-full bg-gradient-amber text-primary font-bold px-5 py-3 rounded-xl text-base mt-2">
            Kostenlose Beratung
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

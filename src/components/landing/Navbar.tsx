import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo-gastro-master.jpg";

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
    <nav className={`fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 z-50 transition-all duration-500 rounded-2xl ${
      scrolled
        ? "bg-surface-navy/80 backdrop-blur-xl shadow-2xl shadow-black/20 py-2.5 md:py-2"
        : "bg-primary-foreground/5 backdrop-blur-md py-3.5 md:py-3"
    } border border-primary-foreground/10`}>
      <div className="flex items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <img src={logo} alt="Gastro Master" className={`rounded-lg transition-all duration-500 ${scrolled ? "w-7 h-7" : "w-8 h-8"}`} />
          <span className={`text-primary-foreground font-bold transition-all duration-500 ${scrolled ? "text-base" : "text-lg"}`}>Gastro Master</span>
        </a>

        {/* Desktop links */}
        <div className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? "gap-5" : "gap-7"}`}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            aria-label="Dark Mode umschalten"
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={scrollToForm}
            className={`bg-gradient-amber text-primary font-bold rounded-xl text-sm hover:scale-[1.02] transition-all duration-500 inline-flex items-center gap-1.5 ${
              scrolled ? "px-4 py-2" : "px-5 py-2.5"
            }`}>
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

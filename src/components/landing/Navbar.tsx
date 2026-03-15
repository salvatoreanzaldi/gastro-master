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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container-tight flex items-center justify-between px-5 md:px-8 lg:px-16 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Gastro Master" className="w-8 h-8 rounded-lg" />
          <span className="text-primary-foreground font-bold text-lg">Gastro Master</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            aria-label="Dark Mode umschalten"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-5 py-2.5 rounded-xl text-sm hover:scale-[1.02] transition-transform inline-flex items-center gap-1.5">
            Kostenlose Beratung
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60"
            aria-label="Dark Mode umschalten"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-primary-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-navy/98 backdrop-blur-md border-t border-primary-foreground/10 px-5 py-6 space-y-4">
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

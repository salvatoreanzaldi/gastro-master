import logoWide from "@/assets/logo-gastro-master-wide.png";

const Footer = () => (
  <footer className="bg-gradient-navy border-t border-primary-foreground/10 px-5 md:px-8 lg:px-16 py-12">
    <div className="container-tight">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="flex items-center">
          <img src={logoWide} alt="Gastro Master" className="h-7 md:h-8 w-auto" />
        </a>
        <div className="flex flex-wrap gap-6 text-primary-foreground/50 text-sm">
          <a href="#" className="hover:text-primary-foreground transition-colors">Impressum</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">AGB</a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/30 text-sm">
        © {new Date().getFullYear()} Gastro Master. Alle Rechte vorbehalten.
      </div>
    </div>
  </footer>
);

export default Footer;

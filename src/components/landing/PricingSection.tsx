import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const packages = [
  {
    name: "Shop Start",
    desc: "Dein eigener Webshop – ohne Provision.",
    features: ["Eigener Webshop", "Eigenes Branding", "Online-Zahlungen", "Persönlicher Support"],
    highlight: false,
  },
  {
    name: "Shop & App",
    desc: "Webshop + native App für maximale Reichweite.",
    features: ["Alles aus Shop Start", "Native iOS & Android App", "Push-Benachrichtigungen", "App Store Veröffentlichung"],
    highlight: true,
    badge: "Beliebteste Wahl",
  },
  {
    name: "Complete",
    desc: "Das Komplett-Paket für volle Unabhängigkeit.",
    features: ["Alles aus Shop & App", "Kassensystem", "Multi-Filial-Management", "Erweiterte Auswertungen"],
    highlight: false,
  },
];

const PricingSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background" id="preise">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Transparent. Fair. Premium.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Wähle das Paket, das zu dir passt. Einrichtung, Hardware und Sonderanforderungen werden individuell besprochen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative rounded-2xl p-8 border ${pkg.highlight ? 'bg-gradient-navy text-primary-foreground border-cyan-brand/30 shadow-xl shadow-cyan-brand/10' : 'bg-surface-light border-border'}`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-amber text-primary text-xs font-bold px-4 py-1.5 rounded-full">
                  {pkg.badge}
                </div>
              )}
              <h3 className={`text-2xl font-black mb-2 ${pkg.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{pkg.name}</h3>
              <p className={`mb-6 ${pkg.highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{pkg.desc}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.highlight ? 'text-cyan-brand' : 'text-cyan-brand'}`} />
                    <span className={`${pkg.highlight ? 'text-primary-foreground/80' : 'text-foreground'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={scrollToForm}
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${pkg.highlight ? 'bg-gradient-amber text-primary hover:scale-[1.02]' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
                Beratung anfragen
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm"
        >
          Kassensystem auch separat verfügbar. Individuelle Angebote auf Anfrage.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;

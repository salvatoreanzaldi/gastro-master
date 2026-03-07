import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe, Smartphone, CreditCard, Palette } from "lucide-react";

const features = [
  { icon: Globe, title: "Eigener Webshop", desc: "Dein Branding, deine Domain, dein Design – vollständig individualisiert." },
  { icon: Smartphone, title: "Eigene App", desc: "Native App im App Store & Google Play mit Push-Benachrichtigungen." },
  { icon: CreditCard, title: "Eigene Zahlungsanbindung", desc: "PayPal, Stripe, Kartenzahlung – du behältst die Kontrolle über deine Zahlungen." },
  { icon: Palette, title: "Deine Marke im Fokus", desc: "Kein Plattform-Logo. Deine Kunden bestellen bei dir – nicht bei einer Plattform." },
];

const SolutionSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-surface-light" id="produkte">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Die Lösung</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Dein eigener Shop.<br />Deine eigene App.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mit Gastro Master bekommst du ein komplettes Bestellsystem unter deiner Marke – mit 0 % Provision auf jede Bestellung.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-2xl p-7 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
            Kostenlose Beratung
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

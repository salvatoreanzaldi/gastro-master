import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";

const SwitchOfferSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 60% 40%, hsl(34, 100%, 47%), transparent 50%)"
      }} />
      <div className="container-tight relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-amber/20 text-amber rounded-full px-5 py-2 mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-semibold text-sm">Wechselangebot</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-6">
            50 % Rabatt beim Wechsel
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Du hast noch ein aktives Abo bei einem anderen Anbieter? Kein Problem – du zahlst bei uns nur die Hälfte, solange dein altes Abo noch läuft.
          </p>
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
            Angebot sichern
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SwitchOfferSection;

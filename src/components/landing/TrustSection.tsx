import { motion } from "framer-motion";
import { Star } from "lucide-react";

const references = ["Burger Brothers", "TAKE The Good Food", "Et Manus", "Pizzeria Il Sorriso", "Kojo Sushi", "Artemis Grill"];

const TrustSection = () => (
  <section className="bg-surface-light section-padding">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2.5 shadow-sm mb-6">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber fill-current" />
            ))}
          </div>
          <span className="font-semibold text-sm text-foreground">5,0 aus 130 Google-Bewertungen</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">700+ Gastronomiebetriebe vertrauen uns</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Von der Einzelfiliale bis zur Multi-Brand-Kette – Gastro Master ist das Bestellsystem für Gastronomen, die unabhängig sein wollen.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 md:gap-8"
      >
        {references.map((name) => (
          <div key={name} className="px-6 py-3 rounded-xl bg-background border border-border shadow-sm text-foreground font-semibold text-sm md:text-base">
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustSection;

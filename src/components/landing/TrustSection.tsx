import { motion } from "framer-motion";
import { Star } from "lucide-react";
import logoBurgerBrothers from "@/assets/logo-burger-brothers.png";
import logoTake from "@/assets/logo-take.png";
import logoEtManus from "@/assets/logo-et-manus.png";
import logoIlSorriso from "@/assets/logo-il-sorriso.png";
import logoKojoSushi from "@/assets/logo-kojo-sushi.png";
import logoArtemis from "@/assets/logo-artemis.png";

const customers = [
  { src: logoBurgerBrothers, alt: "Burger Brothers" },
  { src: logoTake, alt: "TAKE The Good Food" },
  { src: logoEtManus, alt: "Et Manus" },
  { src: logoIlSorriso, alt: "Pizzeria Il Sorriso" },
  { src: logoKojoSushi, alt: "Kojo Sushi" },
  { src: logoArtemis, alt: "Artemis Grill" },
];

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
        className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
      >
        {customers.map((c) => (
          <div key={c.alt} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img src={c.src} alt={c.alt} className="h-10 md:h-12 w-auto max-w-[140px] object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustSection;

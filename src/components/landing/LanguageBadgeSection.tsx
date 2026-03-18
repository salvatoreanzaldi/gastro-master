import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  "Deutsch",
  "Englisch",
  "Italienisch",
  "Persisch",
  "Russisch",
  "Singhalesisch",
];

const LanguageBadgeSection = () => (
  <section className="py-12 md:py-16 bg-surface-light">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-cyan-brand" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Beratung auf Augenhöhe. In deiner Sprache.
          </h3>
        </div>
        <p className="text-muted-foreground text-sm mb-8">
          Unsere Beratung ist persönlich, direkt und auch sprachlich nah an deinem Alltag.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {languages.map((lang, i) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-border bg-background text-foreground/80 hover:border-cyan-brand/30 hover:text-foreground transition-colors"
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default LanguageBadgeSection;

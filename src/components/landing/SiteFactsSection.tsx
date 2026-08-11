import { motion } from "framer-motion";
import { SITE_FACTS, SITE_FACTS_HEADLINE } from "@/data/site-facts";
import { useCurrentLang } from "@/components/LanguageLayout";

/**
 * Batch 8: Die Unternehmensfakten sichtbar machen.
 *
 * Wortlaut und Reihenfolge kommen aus src/data/site-facts.ts — derselben Datei,
 * aus der der Prerenderer den statischen Block baut. Dadurch stimmt zum ersten
 * Mal überein, was Crawler im rohen HTML und was Nutzer wie Googlebot im
 * gerenderten DOM sehen.
 *
 * Bewusst dezent gehalten: Faktenband, kein Werbeblock.
 */
const SiteFactsSection = () => {
  const lang = useCurrentLang();
  if (lang !== "de") return null; // Sätze sind deutschsprachig formuliert (Welle E)

  return (
    <section className="px-5 md:px-8 lg:px-16 py-14 bg-surface-light">
      <div className="container-tight max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-black text-foreground mb-6"
        >
          {SITE_FACTS_HEADLINE}
        </motion.h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 list-none p-0 m-0">
          {SITE_FACTS.map((fact, i) => (
            <motion.li
              key={fact.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="border-l-2 border-cyan-brand/40 pl-4"
            >
              <p className="text-foreground font-semibold text-sm mb-1">{fact.label}</p>
              <p className="text-muted-foreground text-sm leading-relaxed m-0">{fact.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SiteFactsSection;

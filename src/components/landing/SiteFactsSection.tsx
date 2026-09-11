import { motion } from "framer-motion";
import { Layers, Handshake, MapPin, Languages, ShieldCheck } from "lucide-react";
import { SITE_FACTS, SITE_FACTS_HEADLINE } from "@/data/site-facts";
import { useCurrentLang } from "@/components/LanguageLayout";

/**
 * Batch 8: Die Unternehmensfakten sichtbar machen.
 *
 * Wortlaut und Reihenfolge kommen aus src/data/site-facts.ts — derselben Datei,
 * aus der der Prerenderer den statischen Block baut. Dadurch stimmt überein,
 * was Crawler im rohen HTML und was Nutzer wie Googlebot im gerenderten DOM
 * sehen. site-facts.ts bleibt bewusst reine Textdatei (der Prerenderer kann
 * keine React-Icons rendern) — die Icons haengen hier positionsgebunden am
 * Index, gleiches Muster wie in DifferentiationSection.
 */

/** Index-gebunden an SITE_FACTS — Reihenfolge dort aendern = hier mitziehen. */
const FACT_ICONS = [
  Layers,      // Alles aus einer Hand
  Handshake,   // Faire Konditionen
  MapPin,      // Seit 2021, Sitz in Hessen
  Languages,   // Support in neun Sprachen
  ShieldCheck, // TSE-zertifiziert
];

/**
 * 5 Karten gehen in keinem Raster glatt auf. Statt eine Karte verwaist stehen
 * zu lassen, laeuft das Grid auf 6 Spalten: Zeile 1 = 3 Karten a 2 Spalten,
 * Zeile 2 = 2 Karten a 3 Spalten. Beide Zeilen fuellen damit die volle Breite.
 * Auf sm (2 Spalten) spannt die letzte Karte ueber beide.
 */
const FACT_SPANS = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "sm:col-span-2 lg:col-span-3",
];

const SiteFactsSection = () => {
  const lang = useCurrentLang();
  if (lang !== "de") return null; // Sätze sind deutschsprachig formuliert (Welle E)

  return (
    <section className="section-padding bg-surface-light">
      <div className="container-tight max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground text-center mb-10 md:mb-12"
        >
          {SITE_FACTS_HEADLINE}
        </motion.h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 list-none p-0 m-0">
          {SITE_FACTS.map((fact, i) => {
            const Icon = FACT_ICONS[i] ?? Layers;
            return (
              <motion.li
                key={fact.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className={`${FACT_SPANS[i] ?? ""} bg-background border border-border rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md hover:border-cyan-brand/30 transition-all duration-300`}
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-brand/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-brand" strokeWidth={1.9} />
                </div>
                <p className="text-foreground font-bold text-base mb-1.5">{fact.label}</p>
                <p className="text-muted-foreground text-sm leading-relaxed m-0">{fact.text}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SiteFactsSection;

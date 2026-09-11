import { motion } from "framer-motion";
import { Store, Star, ShieldCheck, Headphones, type LucideIcon } from "lucide-react";

/**
 * Wiederverwendbare Trust-Bar (Kennzahl + Label + Icon).
 *
 * Bis hierher gab es KEINE geteilte Trust-Bar im Projekt: UeberUnsPage,
 * AppPage, WebshopPage & Co. bauen jeweils eine eigene, optisch fast
 * identische Leiste inline nach (Icon · fette Kennzahl · kleines Label).
 * Diese Komponente zieht genau dieses etablierte Muster heraus, damit die
 * /danke-Seite es nicht ein weiteres Mal dupliziert.
 *
 * Bewusst NICHT im selben Zug auf die bestehenden Seiten umgestellt — das
 * waere ein Refactoring laufender Seiten ohne Auftrag. Sie koennen spaeter
 * hierher migrieren; die Props sind dafuer offen gehalten.
 */

export interface TrustBarItem {
  value: string;
  label: string;
}

/** Index-gebunden an die uebergebenen Items. */
const DEFAULT_ICONS: LucideIcon[] = [Store, Star, ShieldCheck, Headphones];

const TrustBar = ({
  items,
  icons = DEFAULT_ICONS,
  className = "",
}: {
  items: TrustBarItem[];
  icons?: LucideIcon[];
  className?: string;
}) => {
  if (!items.length) return null;

  return (
    <section
      className={`bg-white dark:bg-[#111827] border-y border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-10 md:py-12 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* 4 Items: auf Mobile 2x2 statt einer verwaisten Zeile. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Star;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="text-center"
              >
                <Icon className="w-5 h-5 text-cyan-brand mx-auto mb-2" strokeWidth={1.9} />
                <p className="text-2xl md:text-3xl font-black text-[#0A264A] dark:text-white mb-1 leading-none">
                  {item.value}
                </p>
                <p className="text-[#0A264A]/45 dark:text-white/40 text-xs leading-snug">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

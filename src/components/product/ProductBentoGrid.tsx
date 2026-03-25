import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface BentoTile {
  id: string;
  size: "sm" | "lg";
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: boolean;
}

interface ProductBentoGridProps {
  headline?: string;
  sub?: string;
  tiles: BentoTile[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const tile = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const ProductBentoGrid = ({ headline, sub, tiles }: ProductBentoGridProps) => (
  <section className="bg-[#0A264A] section-padding">
    <div className="container-tight">
      {(headline || sub) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {headline && (
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{headline}</h2>
          )}
          {sub && (
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{sub}</p>
          )}
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.id}
              variants={tile}
              className={[
                "rounded-2xl p-7 backdrop-blur-[14px] border transition-all duration-300 flex flex-col",
                t.size === "lg" ? "md:col-span-2" : "md:col-span-1",
                t.accent
                  ? "bg-white/[0.10] border-cyan-400/25 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-400/5"
                  : "bg-white/[0.06] border-white/10 hover:bg-white/[0.10] hover:border-white/20",
              ].join(" ")}
            >
              <Icon className="w-7 h-7 text-cyan-brand flex-shrink-0" strokeWidth={1.75} />
              <h3 className="font-bold text-white text-lg mt-4 mb-1.5 leading-snug">{t.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{t.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default ProductBentoGrid;

import { motion } from "framer-motion";
import { Rocket, Users, Building2, Monitor, CreditCard, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const milestoneIcons = [Sparkles, Users, Building2, Users, Monitor, CreditCard];

const MomentumSection = () => {
  const { t } = useTranslation("common");
  return (
    <section className="px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 30% 70%, hsl(196, 100%, 40%), transparent 50%)"
      }} />
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("momentum.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-3">
            {t("momentum.headline")}
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
            {t("momentum.sub")}
          </p>
        </motion.div>

        <div className="grid gap-3 max-w-3xl mx-auto">
          {(t("momentum.milestones", { returnObjects: true }) as any[]).map((m, i) => {
            const Icon = milestoneIcons[i];
            const isNext = i === (t("momentum.milestones", { returnObjects: true }) as any[]).length - 1;
            const isGlow = i >= (t("momentum.milestones", { returnObjects: true }) as any[]).length - 2;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group flex items-center gap-4 md:gap-6 rounded-2xl border p-4 md:p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                  isNext
                    ? "bg-cyan-brand/10 border-cyan-brand/30 hover:shadow-cyan-brand/10"
                    : isGlow
                    ? "bg-primary-foreground/5 border-primary-foreground/15 hover:shadow-primary-foreground/5"
                    : "bg-primary-foreground/5 border-primary-foreground/10"
                }`}
              >
                <div className="flex items-center gap-3 flex-shrink-0 w-[120px] md:w-[150px]">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isGlow ? "bg-cyan-brand/20" : "bg-primary-foreground/10"
                  }`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isGlow ? "text-cyan-brand" : "text-primary-foreground/50"}`} />
                  </div>
                  <span className={`text-lg md:text-xl font-black ${isGlow ? "text-cyan-brand" : "text-primary-foreground/60"}`}>
                    {m.year}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-primary-foreground font-bold text-sm md:text-base">{m.title}</h3>
                    {isNext && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-brand/20 text-cyan-brand px-2 py-0.5 rounded-full">
                        {t("momentum.outroLabel")}
                      </span>
                    )}
                  </div>
                  <p className="text-primary-foreground/40 text-xs md:text-sm mt-0.5 hidden md:block">{m.text}</p>
                </div>

                {isGlow && (
                  <div className="w-2 h-2 rounded-full bg-cyan-brand shadow-lg shadow-cyan-brand/40 flex-shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-primary-foreground/30 text-sm mt-6 max-w-md mx-auto"
        >
          {t("momentum.outro")}
        </motion.p>
      </div>
    </section>
  );
};

export default MomentumSection;

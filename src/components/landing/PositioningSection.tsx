import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Percent } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Percent, TrendingDown, TrendingUp];
const colors = ["text-destructive", "text-amber", "text-cyan-brand"];

const PositioningSection = () => {
  const { t } = useTranslation("common");
  return (
    <section className="section-padding bg-background border-4 border-red-500">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("positioning.headline1")}<br />
            <span className="text-gradient-brand">{t("positioning.headline2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("positioning.sub")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {(t("positioning.items", { returnObjects: true }) as any[]).map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-surface-light border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <Icon className={`w-10 h-10 mb-5 ${colors[i]}`} />
                <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;

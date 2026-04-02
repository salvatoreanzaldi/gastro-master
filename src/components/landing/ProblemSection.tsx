import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProblemSection = () => {
  const { t } = useTranslation("common");
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
              {t("problem.headline1")}<br />
              <span className="text-destructive">{t("problem.headline2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
              {t("problem.sub")}
            </p>
          </motion.div>

          <div className="space-y-4">
            {(t("problem.items", { returnObjects: true }) as string[]).map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-destructive/5 border border-destructive/10 rounded-xl p-5"
              >
                <XCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReferencesSection = () => {
  const { t } = useTranslation("common");
  return (
    <section className="section-padding bg-background" id="referenzen">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("references.badge")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("references.headline")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {(t("references.items", { returnObjects: true }) as any[]).map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`rounded-2xl p-8 border ${i === 0 ? 'bg-gradient-navy text-primary-foreground border-cyan-brand/30' : 'bg-surface-light border-border'}`}
            >
              <Quote className={`w-8 h-8 mb-4 ${i === 0 ? 'text-cyan-brand' : 'text-muted-foreground/30'}`} />
              <p className={`mb-6 leading-relaxed ${i === 0 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{item.quote}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber fill-current" />
                ))}
              </div>
              <div className={`font-bold ${i === 0 ? 'text-primary-foreground' : 'text-foreground'}`}>{item.name}</div>
              <div className={`text-sm ${i === 0 ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>{item.type}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;

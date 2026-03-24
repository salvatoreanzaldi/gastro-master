import { motion } from "framer-motion";
import { MessageCircle, Phone, Calendar, CreditCard, Key, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [MessageCircle, Phone, Calendar, Shield, CreditCard, Key];

const DifferentiationSection = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t.diff.headline}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.diff.sub}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.diff.features.map((p, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface-light border border-border rounded-2xl p-7"
              >
                <Icon className="w-8 h-8 text-cyan-brand mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;

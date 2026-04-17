import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

const ContactCTASection = () => {
  const { t } = useTranslation("common");
  const lp = useLangPath();

  return (
    <section className="bg-white dark:bg-[#0a0f1a] px-5 md:px-8 lg:px-16 pt-8 md:pt-12 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#0A264A]/8 dark:bg-white/8 border border-[#0A264A]/10 dark:border-white/10 text-cyan-brand text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {t("contactCTA.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A264A] dark:text-white leading-tight mb-5">
            {t("contactCTA.title")}
          </h2>
          <p className="text-[#0A264A]/55 dark:text-white/45 text-lg leading-relaxed mb-8">
            {t("contactCTA.desc")}
          </p>

          <Link
            to={lp("/kontakt")}
            className="inline-flex items-center gap-2 bg-[#ED8400] text-white font-bold px-9 py-4 rounded-xl text-base shadow-lg shadow-[#ED8400]/30 hover:scale-[1.02] transition-transform mb-8"
          >
            {t("contactCTA.button")}
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            {(t("contactCTA.trust", { returnObjects: true }) as string[]).map(
              (item: string) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-[#0A264A]/50 dark:text-white/40 text-sm"
                >
                  <Check className="w-4 h-4 text-cyan-brand flex-shrink-0" />
                  {item}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;

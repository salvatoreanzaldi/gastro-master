import { motion } from "framer-motion";
import partnerStripe from "@/assets/logos/partner/partner-stripe.png";
import partnerPaypal from "@/assets/logos/partner/partner-paypal.png";
import partnerSides from "@/assets/logos/partner/partner-sides.png";
import partnerWolt from "@/assets/logos/partner/partner-wolt.png";
import partnerUberDirect from "@/assets/logos/partner/partner-uber-direct.png";
import partnerLieferando from "@/assets/logos/partner/partner-lieferando.png";
import partnerWinorder from "@/assets/logos/partner/partner-winorder.png";
import { useLanguage } from "@/contexts/LanguageContext";

const partners = [
  { src: partnerStripe, alt: "Stripe" },
  { src: partnerPaypal, alt: "PayPal" },
  { src: partnerLieferando, alt: "Lieferando" },
  { src: partnerWolt, alt: "Wolt" },
  { src: partnerUberDirect, alt: "Uber Direct" },
  { src: partnerSides, alt: "SIDES" },
  { src: partnerWinorder, alt: "WinOrder" },
];

const PartnerSection = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t.partner.badge}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            {t.partner.headline}
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            {t.partner.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-14"
        >
          {partners.map((p) => (
            <div key={p.alt} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={p.src} alt={p.alt} className="h-8 md:h-10 w-auto object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;

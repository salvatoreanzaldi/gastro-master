import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Eye, Sparkles, ArrowRight } from "lucide-react";
import pickupScreen from "@/assets/pickup-screen.jpeg";
import pickupScreen2 from "@/assets/pickup-screen-2.png";
import { useLanguage } from "@/contexts/LanguageContext";

const images = [pickupScreen, pickupScreen2];
const featureIcons = [Tv, Eye, Sparkles];

const PickUpScreenSection = () => {
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setImgIndex(i => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    window.location.href = "/kontakt";
  };

  const featureItems = [
    { icon: Tv, text: t.pickup.featureTitle },
    { icon: Eye, text: t.pickup.features[0] },
    { icon: Sparkles, text: t.pickup.features[1] },
  ];

  return (
    <section className="section-padding bg-surface-light overflow-hidden">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image with crossfade */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border relative aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={images[imgIndex]}
                  alt="Gastro Master Pick-Up Screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t.pickup.badge}</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 leading-tight">
              {t.pickup.headline1}<br />{t.pickup.headline2}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t.pickup.sub}
            </p>

            <div className="space-y-4 mb-8">
              {featureItems.map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-brand/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-cyan-brand" />
                  </div>
                  <span className="text-foreground text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <button onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
              {t.pickup.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PickUpScreenSection;

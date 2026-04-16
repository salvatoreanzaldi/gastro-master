import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

import screenshotStartbild from "@/assets/screenshots/Take - Startbild 2.png";
import screenshotBestellart from "@/assets/screenshots/Take - Bestellart 2.png";
import screenshotFilialen from "@/assets/screenshots/Take - Filialen 2.png";
import screenshotMenu from "@/assets/screenshots/Take - Menu 2.png";
import screenshotBenutzerkonto from "@/assets/screenshots/Take - Benutzerkonto 2.png";

const AppShowcaseSection = () => {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 50%"],
  });

  // Animation: iPhone pendulum rotation (-45° to +45°)
  const rotateX = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  // Animation: Horizontal movement (right to left)
  const translateX = useTransform(scrollYProgress, [0, 1], [400, -1200]);

  const arr = (key: string) => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const screens = arr("appShowcase.screens") as any[];

  const screenshotMap: Record<string, string> = {
    "Startbild": screenshotStartbild,
    "Bestellart": screenshotBestellart,
    "Filialen": screenshotFilialen,
    "Menü": screenshotMenu,
    "Benutzerkonto": screenshotBenutzerkonto,
  };

  if (screens.length === 0) return null;

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("appShowcase.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("appShowcase.headline")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("appShowcase.subtitle")}
          </p>
        </motion.div>

        {/* Scroll Container with iPhone Carousel */}
        <div
          ref={containerRef}
          className="relative h-[550px] md:h-[650px] lg:h-[750px] flex items-center overflow-hidden"
        >
          {/* Carousel wrapper with perspective */}
          <div className="w-full h-full flex items-center" style={{ perspective: "1200px" }}>
            <motion.div
              className="flex gap-6 md:gap-8"
              style={{
                x: translateX,
                willChange: "transform",
              }}
            >
              {screens.map((screen, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-72 md:w-80 lg:w-96"
                  style={{
                    rotateX: rotateX,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* iPhone Frame */}
                  <div className="rounded-3xl border-8 border-gray-900 bg-black p-3 shadow-2xl aspect-[9/19.5] overflow-hidden">
                    <img
                      src={screenshotMap[screen.label]}
                      alt={screen.label}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Labels below carousel (not rotated) */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
          {screens.map((screen, i) => (
            <div key={i} className="text-center">
              <p className="text-xs md:text-sm font-semibold text-foreground mb-1">
                {screen.label}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {screen.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;

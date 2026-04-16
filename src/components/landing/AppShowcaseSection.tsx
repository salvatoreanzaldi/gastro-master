import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

const AppShowcaseSection = () => {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animation Values
  const translateX = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  const arr = (key: string) => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const screens = arr("appShowcase.screens") as any[];

  if (screens.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center overflow-x-hidden"
        >
          <motion.div
            className="flex gap-4 md:gap-6 lg:gap-8"
            style={{
              x: translateX,
              perspective: 1200,
              willChange: "transform",
            }}
          >
            {screens.map((screen, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-64 md:w-72 lg:w-80"
                style={{
                  rotateX,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* iPhone Frame */}
                <div className="rounded-3xl border-8 border-gray-800 bg-black p-2 shadow-2xl aspect-[9/19.5] overflow-hidden">
                  <img
                    src={`/assets/screenshots/Take - ${screen.label === "Startbild" ? "Startbild" : screen.label === "Bestellart" ? "Bestellart" : screen.label === "Filialen" ? "Filialen" : screen.label === "Menü" ? "Menu" : "Benutzerkonto"} 2.png`}
                    alt={screen.label}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>

                {/* Label */}
                <div className="text-center mt-4">
                  <p className="text-sm md:text-base font-semibold text-foreground">
                    {screen.label}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {screen.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;

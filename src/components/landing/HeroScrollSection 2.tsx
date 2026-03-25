import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import dashboardImg from "@/assets/cashier-dashboard.png";

const cyclingWords = [
  "Deine Regeln.",
  "Dein Gewinn.",
  "Dein Umsatz.",
  "Deine Freiheit.",
  "Dein Erfolg.",
  "Deine Zukunft.",
];

const HeroScrollSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden bg-gradient-navy">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm md:text-base font-semibold text-amber-400 uppercase tracking-widest mb-4">
              Das Gastro-System der nächsten Generation
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              <span className="block leading-[1.05]">Dein Restaurant.</span>
              <span className="block leading-[1.3] overflow-visible">
                <span className="relative inline-block min-w-[12rem] md:min-w-[18rem] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={cyclingWords[index]}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 inline-block"
                      style={{ WebkitBoxDecorationBreak: "clone", paddingBottom: "0.15em" }}
                    >
                      {cyclingWords[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <span className="block leading-[1.05]">Ohne Provision.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Gastro Master gibt dir die volle Kontrolle — Bestellsystem, Kasse,
              Pickup-Screen und mehr. Alles in einem. Keine versteckten Gebühren.
            </p>
          </>
        }
      >
        <img
          src={dashboardImg}
          alt="Gastro Master Dashboard"
          className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default HeroScrollSection;

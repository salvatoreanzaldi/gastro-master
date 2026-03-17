import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import takeStartbild from "@/assets/take-startbild.jpeg";
import takeMenu from "@/assets/take-menu.jpeg";
import takeFilialen from "@/assets/take-filialen.jpeg";
import takeBestellart from "@/assets/take-bestellart.jpeg";
import takeBenutzerkonto from "@/assets/take-benutzerkonto.jpeg";

const screens = [
  { img: takeStartbild, label: "Startseite" },
  { img: takeMenu, label: "Speisekarte & Bestellung" },
  { img: takeFilialen, label: "Filialübersicht" },
  { img: takeBestellart, label: "Bestellart wählen" },
  { img: takeBenutzerkonto, label: "Kundenkonto" },
];

// Different parallax speeds - outer phones move more
const parallaxFactors = [-160, -80, 0, 80, 160];
const scaleFactors = [0.88, 0.94, 1, 0.94, 0.88];
// Outer phones have more gap, center phones are closer
const gapPx = [48, 16, 16, 48, 0];
// Opacity for edge fade
const opacityValues = [0.6, 0.85, 1, 0.85, 0.6];

const MockupShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 50% 80%, hsl(196, 100%, 40%), transparent 50%)"
      }} />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Live in Action</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
            So sieht deine App aus
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
            Echte Screenshots von TAKE – The Good Food. Multi-Filiale, eigene App, eigener Webshop – powered by Gastro Master.
          </p>
        </motion.div>

        {/* Edge fade overlays */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[hsl(216,60%,8%)] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[hsl(216,60%,8%)] to-transparent z-20 pointer-events-none" />

          <div className="flex justify-center items-end">
            {screens.map((screen, i) => {
              const x = useTransform(scrollYProgress, [0, 1], [0, parallaxFactors[i]]);
              return (
                <motion.div
                  key={screen.label}
                  style={{ x, scale: scaleFactors[i], opacity: opacityValues[i], marginRight: i < 4 ? `${gapPx[i]}px` : 0 }}
                  initial={{ opacity: 0, y: 80, rotateY: i < 2 ? 8 : i > 2 ? -8 : 0 }}
                  whileInView={{ opacity: opacityValues[i], y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center flex-shrink-0 group"
                >
                  {/* iPhone frame */}
                  <div className="relative mx-auto w-[110px] md:w-[155px] lg:w-[175px] rounded-[2.2rem] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1e] to-[#0e0e10] p-[3px] shadow-2xl shadow-black/50 group-hover:shadow-cyan-brand/15 group-hover:-translate-y-2 transition-all duration-500">
                    <div className="rounded-[2rem] bg-gradient-to-b from-[#3a3a3e] via-[#1c1c20] to-[#0c0c0e] p-[2px]">
                      <div className="rounded-[1.85rem] overflow-hidden bg-black relative">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60px] md:w-[72px] h-[18px] md:h-[22px] bg-black rounded-full z-10" />
                        <img src={screen.img} alt={screen.label} className="w-full" />
                      </div>
                    </div>
                    <div className="absolute right-[-2px] top-[25%] w-[2px] h-6 bg-[#3a3a3e] rounded-l-sm" />
                    <div className="absolute left-[-2px] top-[20%] w-[2px] h-4 bg-[#3a3a3e] rounded-r-sm" />
                    <div className="absolute left-[-2px] top-[30%] w-[2px] h-8 bg-[#3a3a3e] rounded-r-sm" />
                    <div className="absolute left-[-2px] top-[40%] w-[2px] h-8 bg-[#3a3a3e] rounded-r-sm" />
                  </div>
                  <p className="text-primary-foreground/60 text-xs md:text-sm font-medium mt-4">{screen.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockupShowcase;

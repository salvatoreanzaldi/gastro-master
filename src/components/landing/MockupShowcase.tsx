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

const MockupShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [80, -120]);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 50% 80%, hsl(196, 100%, 40%), transparent 50%)"
      }} />
      <div className="container-tight relative z-10">
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

        <motion.div style={{ x }} className="flex gap-5 md:gap-6 justify-center">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center flex-shrink-0"
            >
              <div className="relative mx-auto w-[140px] md:w-[180px] rounded-[2rem] border-[6px] border-gray-700 bg-gray-900 shadow-2xl shadow-black/40 overflow-hidden mb-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-gray-700 rounded-b-xl z-10" />
                <img src={screen.img} alt={screen.label} className="w-full" />
              </div>
              <p className="text-primary-foreground/60 text-xs md:text-sm font-medium">{screen.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MockupShowcase;

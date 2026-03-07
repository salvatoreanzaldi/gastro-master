import { motion } from "framer-motion";
import takeMenu from "@/assets/take-menu.jpeg";
import takeFilialen from "@/assets/take-filialen.jpeg";
import takeBestellart from "@/assets/take-bestellart.jpeg";
import takeBenutzerkonto from "@/assets/take-benutzerkonto.jpeg";

const screens = [
  { img: takeMenu, label: "Speisekarte & Bestellung" },
  { img: takeFilialen, label: "Filialübersicht" },
  { img: takeBestellart, label: "Bestellart wählen" },
  { img: takeBenutzerkonto, label: "Kundenkonto" },
];

const MockupShowcase = () => (
  <section className="section-padding bg-gradient-navy relative overflow-hidden">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {screens.map((screen, i) => (
          <motion.div
            key={screen.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center"
          >
            <div className="relative mx-auto w-full max-w-[200px] rounded-[2rem] border-[6px] border-gray-700 bg-gray-900 shadow-2xl shadow-black/40 overflow-hidden mb-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-700 rounded-b-xl z-10" />
              <img src={screen.img} alt={screen.label} className="w-full" />
            </div>
            <p className="text-primary-foreground/60 text-sm font-medium">{screen.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MockupShowcase;

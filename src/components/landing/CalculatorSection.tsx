import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

const CalculatorSection = () => {
  const [orders, setOrders] = useState(300);
  const [avgCart, setAvgCart] = useState(30);
  const [commission, setCommission] = useState(15);

  const monthlyRevenue = orders * avgCart;
  const monthlyLoss = Math.round(monthlyRevenue * (commission / 100));
  const yearlyLoss = monthlyLoss * 12;

  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-gradient-navy relative overflow-hidden" id="rechner">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 30% 50%, hsl(196, 100%, 40%), transparent 60%)"
      }} />
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-cyan-brand mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Provisionsrechner</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
            So viel kostet dich die Plattform
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
            Berechne, wie viel Gewinn du jeden Monat an Lieferplattformen verlierst – und wie viel du mit Gastro Master sparen kannst.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Orders */}
            <div>
              <label className="block text-primary-foreground/70 text-sm font-medium mb-2">Bestellungen / Monat</label>
              <input
                type="range" min={50} max={3000} step={50} value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="w-full accent-cyan-brand mb-2"
              />
              <div className="text-3xl font-black text-primary-foreground">{orders}</div>
            </div>
            {/* Avg Cart */}
            <div>
              <label className="block text-primary-foreground/70 text-sm font-medium mb-2">⌀ Warenkorb (€)</label>
              <input
                type="range" min={10} max={80} step={1} value={avgCart}
                onChange={(e) => setAvgCart(Number(e.target.value))}
                className="w-full accent-cyan-brand mb-2"
              />
              <div className="text-3xl font-black text-primary-foreground">{avgCart} €</div>
            </div>
            {/* Commission */}
            <div>
              <label className="block text-primary-foreground/70 text-sm font-medium mb-2">Provision (%)</label>
              <input
                type="range" min={10} max={35} step={1} value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full accent-cyan-brand mb-2"
              />
              <div className="text-3xl font-black text-primary-foreground">{commission} %</div>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-primary-foreground/5 rounded-2xl p-6 text-center border border-primary-foreground/10">
              <div className="text-primary-foreground/50 text-sm mb-1">Monatlicher Umsatz</div>
              <div className="text-2xl font-black text-primary-foreground">{monthlyRevenue.toLocaleString("de-DE")} €</div>
            </div>
            <div className="bg-destructive/20 rounded-2xl p-6 text-center border border-destructive/30">
              <div className="text-destructive/80 text-sm mb-1">Verlorener Gewinn / Monat</div>
              <div className="text-2xl font-black text-destructive">{monthlyLoss.toLocaleString("de-DE")} €</div>
            </div>
            <div className="bg-destructive/20 rounded-2xl p-6 text-center border border-destructive/30">
              <div className="text-destructive/80 text-sm mb-1">Verlorener Gewinn / Jahr</div>
              <div className="text-2xl font-black text-destructive">{yearlyLoss.toLocaleString("de-DE")} €</div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-primary-foreground/60 mb-6 text-lg">
              Mit Gastro Master sparst du bis zu <strong className="text-cyan-brand">{yearlyLoss.toLocaleString("de-DE")} € pro Jahr</strong> – bei 0 % Provision auf eigene Bestellungen.
            </p>
            <button onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
              Kostenlose Beratung
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;

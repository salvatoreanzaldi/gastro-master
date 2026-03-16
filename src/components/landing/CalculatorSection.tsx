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
  const monthlyKeep = monthlyRevenue - monthlyLoss;

  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  const barMaxHeight = 200;
  const maxVal = Math.max(monthlyRevenue, 1);
  const platformBarH = Math.round((monthlyKeep / maxVal) * barMaxHeight);
  const lossBarH = Math.round((monthlyLoss / maxVal) * barMaxHeight);
  const ownBarH = Math.round((monthlyRevenue / maxVal) * barMaxHeight);

  return (
    <section className="section-padding bg-gradient-navy relative overflow-hidden" id="rechner">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 30% 50%, hsl(196, 100%, 40%), transparent 60%)"
      }} />
      <div className="container-tight relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-cyan-brand mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Provisionsrechner</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">So viel kostet dich die Plattform</h2>
          <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">Berechne, wie viel Gewinn du jeden Monat an Lieferplattformen verlierst.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-3xl p-8 md:p-12">

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <label className="block text-primary-foreground/70 text-sm font-medium mb-2">Bestellungen / Monat</label>
              <input type="range" min={50} max={3000} step={50} value={orders} onChange={(e) => setOrders(Number(e.target.value))} className="w-full accent-cyan-brand mb-2" />
              <div className="text-3xl font-black text-primary-foreground">{orders}</div>
            </div>
            <div>
              <label className="block text-primary-foreground/70 text-sm font-medium mb-2">⌀ Warenkorb (€)</label>
              <input type="range" min={10} max={80} step={1} value={avgCart} onChange={(e) => setAvgCart(Number(e.target.value))} className="w-full accent-cyan-brand mb-2" />
              <div className="text-3xl font-black text-primary-foreground">{avgCart} €</div>
            </div>
            <div>
              <label className="block text-primary-foreground/70 text-sm font-medium mb-2">Provision (%)</label>
              <input type="range" min={10} max={35} step={1} value={commission} onChange={(e) => setCommission(Number(e.target.value))} className="w-full accent-cyan-brand mb-2" />
              <div className="text-3xl font-black text-primary-foreground">{commission} %</div>
            </div>
          </div>

          {/* Dynamic statement */}
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl font-bold text-primary-foreground">
              Du gibst gerade ca. <span className="text-destructive">{monthlyLoss.toLocaleString("de-DE")} €</span> pro Monat an die Plattform ab.
            </p>
          </div>

          {/* Premium comparison bars */}
          <div className="flex items-end justify-center gap-8 md:gap-16 mb-8" style={{ height: barMaxHeight + 60 }}>
            {/* Platform bar */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold text-primary-foreground/50 mb-2">{monthlyKeep.toLocaleString("de-DE")} €</div>
              <div className="relative flex flex-col items-center" style={{ height: barMaxHeight }}>
                <div className="w-20 md:w-28 rounded-t-xl bg-primary-foreground/15 border border-primary-foreground/10 transition-all duration-700 ease-out absolute bottom-0"
                  style={{ height: platformBarH + lossBarH }}>
                  {/* Loss portion on top */}
                  <div className="absolute top-0 left-0 right-0 rounded-t-xl bg-destructive/40 border-b border-destructive/30 transition-all duration-700 ease-out"
                    style={{ height: lossBarH }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-destructive">-{monthlyLoss.toLocaleString("de-DE")} €</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold text-primary-foreground/60 mt-3 text-center">Mit Plattform</div>
            </div>

            {/* Own system bar */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold text-cyan-brand mb-2">{monthlyRevenue.toLocaleString("de-DE")} €</div>
              <div className="relative" style={{ height: barMaxHeight }}>
                <div className="w-20 md:w-28 rounded-t-xl bg-cyan-brand/30 border border-cyan-brand/40 transition-all duration-700 ease-out absolute bottom-0 shadow-lg shadow-cyan-brand/10"
                  style={{ height: ownBarH }}>
                </div>
              </div>
              <div className="text-sm font-semibold text-cyan-brand mt-3 text-center">Mit eigenem System</div>
            </div>
          </div>

          {/* Yearly perspective */}
          <div className="text-center mb-8">
            <p className="text-primary-foreground/50 text-base">
              Das sind ca. <strong className="text-destructive text-lg">{yearlyLoss.toLocaleString("de-DE")} € pro Jahr</strong>, die du an die Plattform verlierst.
            </p>
          </div>

          <div className="text-center">
            <p className="text-primary-foreground/60 mb-6 text-lg">
              Mit Gastro Master sparst du bis zu <strong className="text-cyan-brand">{yearlyLoss.toLocaleString("de-DE")} € pro Jahr</strong> – bei 0 % Provision.
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

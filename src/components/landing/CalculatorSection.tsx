import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

const CalculatorSection = () => {
  const { t } = useTranslation("common");
  const [orders, setOrders] = useState(300);
  const [avgCart, setAvgCart] = useState(30);
  const [commission, setCommission] = useState(15);

  const monthlyRevenue = orders * avgCart;
  const monthlyLoss = Math.round(monthlyRevenue * (commission / 100));
  const yearlyLoss = monthlyLoss * 12;

  const scrollToForm = () => {
    window.location.href = "/kontakt";
  };

  return (
    <section
      className="section-padding bg-[#0A264A] relative overflow-hidden"
      id="rechner"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,125,207,0.15), transparent 60%)" }}
      />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-cyan-brand mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">{t("calculator.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            {t("calculator.headline")}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t("calculator.sub")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-3xl p-8 md:p-12 shadow-xl shadow-black/30"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <label className="block text-white/65 text-sm font-medium mb-2">
                {t("calculator.labelOrders")}
              </label>
              <input
                type="range" min={50} max={3000} step={50} value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="w-full accent-cyan-brand mb-2"
              />
              <div className="text-3xl font-black text-white">{orders}</div>
            </div>
            <div>
              <label className="block text-white/65 text-sm font-medium mb-2">
                {t("calculator.labelCart")}
              </label>
              <input
                type="range" min={10} max={80} step={1} value={avgCart}
                onChange={(e) => setAvgCart(Number(e.target.value))}
                className="w-full accent-cyan-brand mb-2"
              />
              <div className="text-3xl font-black text-white">{avgCart} €</div>
            </div>
            <div>
              <label className="block text-white/65 text-sm font-medium mb-2">
                {t("calculator.labelCommission")}
              </label>
              <input
                type="range" min={10} max={35} step={1} value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full accent-cyan-brand mb-2"
              />
              <div className="text-3xl font-black text-white">{commission} %</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
            <div className="bg-white/[0.08] border border-white/15 rounded-2xl p-3 md:p-5 text-center">
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">
                {t("calculator.cardRevenue")}
              </p>
              <p className="text-2xl md:text-3xl font-black text-white">
                {monthlyRevenue.toLocaleString("de-DE")} €
              </p>
            </div>
            <div className="bg-red-500/[0.15] border border-red-500/30 rounded-2xl p-3 md:p-5 text-center">
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">
                {t("calculator.cardMonth")}
              </p>
              <p className="text-2xl md:text-3xl font-black text-red-400">
                {monthlyLoss.toLocaleString("de-DE")} €
              </p>
            </div>
            <div className="bg-red-500/[0.15] border border-red-500/30 rounded-2xl p-3 md:p-5 text-center">
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-2">
                {t("calculator.cardYear")}
              </p>
              <p className="text-2xl md:text-3xl font-black text-red-400">
                {yearlyLoss.toLocaleString("de-DE")} €
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/65 mb-6 text-base md:text-lg">
              {t("calculator.savingsText")}{" "}
              <strong className="text-cyan-brand">{yearlyLoss.toLocaleString("de-DE")} €</strong>
              {" "}{t("calculator.savingsSuffix")}
            </p>
            <button
              onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2"
            >
              {t("calculator.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;

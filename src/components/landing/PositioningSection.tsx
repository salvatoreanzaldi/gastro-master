import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Percent } from "lucide-react";

const cards = [
  {
    icon: Percent,
    title: "Die Plattform kassiert mit",
    desc: "Bei jedem Lieferando- oder Wolt-Auftrag verlierst du 15–30 % deines Umsatzes an Provision. Das ist Gewinn, der dir zusteht.",
    color: "text-destructive",
  },
  {
    icon: TrendingDown,
    title: "Weniger Marge, gleiche Arbeit",
    desc: "Du kochst, du lieferst, du trägst das Risiko – aber die Plattform verdient an jeder Bestellung mit. Das muss nicht sein.",
    color: "text-amber",
  },
  {
    icon: TrendingUp,
    title: "Direktbestellungen = mehr Gewinn",
    desc: "Jede Bestellung über deinen eigenen Shop bleibt zu 100 % bei dir. Ohne Provision. Ohne Abhängigkeit. Mehr Gewinn pro Bestellung.",
    color: "text-cyan-brand",
  },
];

const PositioningSection = () => (
  <section className="section-padding bg-background">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
          Du machst die Arbeit.<br />
          <span className="text-gradient-brand">Die Plattform kassiert mit.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Lieferplattformen kosten dich jeden Monat Tausende Euro an Provision. Jede Direktbestellung über deinen eigenen Shop ist bares Geld, das in deiner Kasse bleibt.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-surface-light border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
          >
            <card.icon className={`w-10 h-10 mb-5 ${card.color}`} />
            <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PositioningSection;

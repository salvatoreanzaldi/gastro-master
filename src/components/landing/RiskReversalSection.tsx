import { motion } from "framer-motion";
import { ShieldCheck, Rocket, HeartHandshake, ArrowRight } from "lucide-react";

const cards = [
  { icon: ShieldCheck, title: "Kein Risiko beim Start", desc: "Erster Beitrag erst nach Launch. Du zahlst nichts, solange dein System nicht live ist." },
  { icon: Rocket, title: "Schneller Go-Live", desc: "Wir übernehmen Setup, Design und Einrichtung. Du kannst dich auf dein Geschäft konzentrieren." },
  { icon: HeartHandshake, title: "Persönliche Begleitung", desc: "Von Tag eins an hast du einen persönlichen Ansprechpartner – kein anonymes Ticketsystem." },
];

const RiskReversalSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-surface-light">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Der Wechsel ist einfacher als du denkst
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Wir nehmen dir das Risiko ab und begleiten dich persönlich bei jedem Schritt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-background border border-border rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 bg-gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-5">
                <c.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
            Kostenlose Beratung
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RiskReversalSection;

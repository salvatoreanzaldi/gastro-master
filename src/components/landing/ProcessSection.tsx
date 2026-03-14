import { motion } from "framer-motion";
import { MessageSquareText, CalendarCheck, UtensilsCrossed, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquareText,
    step: "01",
    title: "Kostenloses Erstgespräch",
    desc: "Du meldest dich bei uns – wir lernen dein Restaurant kennen und beraten dich unverbindlich.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Strategieberatung & Planung",
    desc: "Gemeinsam planen wir dein Setup: Webshop, App, Kasse – exakt auf deinen Betrieb zugeschnitten.",
  },
  {
    icon: UtensilsCrossed,
    step: "03",
    title: "Speisekarte & Einrichtung",
    desc: "Du gibst uns deine Speisekarte und Infos – wir kümmern uns um die komplette Einrichtung.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Dein System geht live",
    desc: "In 2–4 Wochen ist dein Gastro Master Bestellsystem fertig eingerichtet und einsatzbereit.",
  },
];

const ProcessSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            So einfach geht's
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Unser Ablauf
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vom ersten Gespräch bis zum fertigen System – wir begleiten dich persönlich durch jeden Schritt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-light border border-border mb-5 mx-auto">
                <s.icon className="w-8 h-8 text-cyan-brand" />
              </div>

              <div className="text-xs font-bold text-cyan-brand uppercase tracking-wider mb-2">
                Schritt {s.step}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={scrollToForm}
            className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-base hover:scale-[1.02] transition-transform shadow-lg shadow-amber/20 inline-flex items-center gap-2"
          >
            Jetzt Erstgespräch vereinbaren
            <Rocket className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;

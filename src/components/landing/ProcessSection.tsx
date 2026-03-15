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
    desc: "In 2–4 Wochen ist alles fertig eingerichtet und einsatzbereit.",
  },
];

const ProcessSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
              So einfach geht's
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Unser Ablauf
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Vom ersten Gespräch bis zum fertigen System – wir begleiten dich persönlich durch jeden Schritt.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-base hover:scale-[1.02] transition-transform shadow-lg shadow-amber/20 inline-flex items-center gap-2"
            >
              Jetzt Erstgespräch vereinbaren
              <Rocket className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Right: vertical compact cards */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-surface-light border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-cyan-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-cyan-brand uppercase tracking-wider">
                      Schritt {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

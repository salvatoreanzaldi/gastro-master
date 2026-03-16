import { motion } from "framer-motion";
import { MessageSquareText, CalendarCheck, UtensilsCrossed, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquareText, num: "1",
    title: "Kostenloses Erstgespräch",
    desc: "Du meldest dich bei uns – wir lernen dein Restaurant kennen und beraten dich unverbindlich.",
  },
  {
    icon: CalendarCheck, num: "2",
    title: "Strategieberatung & Planung",
    desc: "Gemeinsam planen wir dein Setup: Webshop, App, Kasse – exakt auf deinen Betrieb zugeschnitten.",
  },
  {
    icon: UtensilsCrossed, num: "3",
    title: "Speisekarte & Einrichtung",
    desc: "Du gibst uns deine Speisekarte und Infos – wir kümmern uns um die komplette Einrichtung.",
  },
  {
    icon: Rocket, num: "4",
    title: "Dein System geht live",
    desc: "Meist in 2–3 Wochen startklar – komplett eingerichtet und einsatzbereit.",
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">So einfach geht's</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Unser Ablauf</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Vom ersten Gespräch bis zum fertigen System – wir begleiten dich persönlich durch jeden Schritt.
            </p>
            <button onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-base hover:scale-[1.02] transition-transform shadow-lg shadow-amber/20 inline-flex items-center gap-2">
              Jetzt Erstgespräch vereinbaren
              <Rocket className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Right: vertical cards with big background numbers */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative group">
                {/* Big background number - dark blue, glows on hover */}
                <div className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 text-[5rem] md:text-[6rem] font-black leading-none select-none pointer-events-none transition-all duration-500 text-deep-navy group-hover:text-blue-brand dark:text-primary-foreground/[0.06] dark:group-hover:text-cyan-brand/20"
                  style={{ opacity: 0.15 }}>
                  {s.num}
                </div>
                {/* Card */}
                <div className="relative flex items-start gap-4 bg-surface-light border border-border rounded-2xl p-5 group-hover:shadow-md group-hover:border-cyan-brand/20 transition-all duration-300 ml-6 md:ml-8">
                  <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0 group-hover:border-cyan-brand/30 group-hover:shadow-sm group-hover:shadow-cyan-brand/10 transition-all duration-300">
                    <s.icon className="w-5 h-5 text-cyan-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-foreground mb-1">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
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

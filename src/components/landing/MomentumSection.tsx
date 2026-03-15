import { motion } from "framer-motion";
import { Rocket, Users, Building2, Monitor, CreditCard, Sparkles } from "lucide-react";

const milestones = [
  { year: "2021", title: "Erster Tag und Gründung", icon: Sparkles, detail: "Der Grundstein für eine neue Ära der Gastro-Digitalisierung", glow: false },
  { year: "2022", title: "Erste 100 Kunden", icon: Users, detail: "Vertrauen aufgebaut – Wort für Wort, Kunde für Kunde", glow: false },
  { year: "2023", title: "Gründung der Epit Global GmbH", icon: Building2, detail: "Strukturen für Wachstum und internationale Skalierung", glow: false },
  { year: "2024", title: "Erste 500 Kunden", icon: Users, detail: "Ein starkes Netzwerk aus Partnern in der Gastronomie", glow: false },
  { year: "2025", title: "Eigenes Kassensystem", icon: Monitor, detail: "Cloud-Kasse, Self-Order, Pick-Up – alles aus einer Hand", glow: true },
  { year: "2026", title: "Eigene Zahlungsabwicklung (Epit Pay)", icon: CreditCard, detail: "Volle Kontrolle über Zahlungen – unser nächster Meilenstein", glow: true, next: true },
];

const MomentumSection = () => (
  <section className="px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 bg-gradient-navy relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{
      background: "radial-gradient(ellipse at 30% 70%, hsl(196, 100%, 40%), transparent 50%)"
    }} />
    <div className="container-tight relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
          Seit 2021
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-3">
          5 Jahre Momentum
        </h2>
        <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
          Vom ersten Kunden bis zum eigenen Zahlungssystem – wir bauen die Zukunft der Gastronomie.
        </p>
      </motion.div>

      <div className="grid gap-3 max-w-3xl mx-auto">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`group flex items-center gap-4 md:gap-6 rounded-2xl border p-4 md:p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
              m.next
                ? "bg-cyan-brand/10 border-cyan-brand/30 hover:shadow-cyan-brand/10"
                : m.glow
                ? "bg-primary-foreground/5 border-primary-foreground/15 hover:shadow-primary-foreground/5"
                : "bg-primary-foreground/5 border-primary-foreground/10"
            }`}
          >
            {/* Year + Icon */}
            <div className="flex items-center gap-3 flex-shrink-0 w-[120px] md:w-[150px]">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                m.glow ? "bg-cyan-brand/20" : "bg-primary-foreground/10"
              }`}>
                <m.icon className={`w-5 h-5 md:w-6 md:h-6 ${m.glow ? "text-cyan-brand" : "text-primary-foreground/50"}`} />
              </div>
              <span className={`text-lg md:text-xl font-black ${m.glow ? "text-cyan-brand" : "text-primary-foreground/60"}`}>
                {m.year}
              </span>
            </div>

            {/* Title + Detail */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-primary-foreground font-bold text-sm md:text-base">{m.title}</h3>
                {m.next && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-brand/20 text-cyan-brand px-2 py-0.5 rounded-full">
                    Als Nächstes
                  </span>
                )}
              </div>
              <p className="text-primary-foreground/40 text-xs md:text-sm mt-0.5 hidden md:block">{m.detail}</p>
            </div>

            {/* Glow dot */}
            {m.glow && (
              <div className="w-2 h-2 rounded-full bg-cyan-brand shadow-lg shadow-cyan-brand/40 flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-primary-foreground/30 text-sm mt-6 max-w-md mx-auto"
      >
        Wir sind zukunftsorientiert, flexibel und bauen Software, die Gastronomen wirklich weiterbringt.
      </motion.p>
    </div>
  </section>
);

export default MomentumSection;

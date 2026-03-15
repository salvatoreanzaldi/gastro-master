import { motion } from "framer-motion";
import { Rocket, Users, Building2, Monitor, CreditCard, Sparkles } from "lucide-react";

const milestones = [
  { year: "2021", title: "Erster Tag und Gründung", icon: Sparkles, glow: false },
  { year: "2022", title: "Erste 100 Kunden", icon: Users, glow: false },
  { year: "2023", title: "Gründung der Epit Global GmbH", icon: Building2, glow: false },
  { year: "2024", title: "Erste 500 Kunden", icon: Users, glow: false },
  { year: "2025", title: "Eigenes Kassensystem", icon: Monitor, glow: true },
  { year: "2026", title: "Eigene Zahlungsabwicklung (Epit Pay)", icon: CreditCard, glow: true, next: true },
];

const MomentumSection = () => (
  <section className="section-padding bg-gradient-navy relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{
      background: "radial-gradient(ellipse at 30% 70%, hsl(196, 100%, 40%), transparent 50%)"
    }} />
    <div className="container-tight relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
          Seit 2021
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
          5 Jahre Momentum
        </h2>
        <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto">
          Vom ersten Kunden bis zum eigenen Zahlungssystem – wir wachsen mit unseren Partnern.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-foreground/10" />

        {milestones.map((m, i) => {
          const isRight = i % 2 === 1;
          return (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-4 md:gap-0 mb-8 last:mb-0 ${
                isRight ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-3 h-3 rounded-full mt-5 ${m.glow ? "bg-cyan-brand shadow-lg shadow-cyan-brand/40" : "bg-primary-foreground/30"}`} />
              </div>

              {/* Spacer for mobile */}
              <div className="w-12 flex-shrink-0 md:hidden" />

              {/* Card */}
              <div className={`flex-1 md:w-[calc(50%-2rem)] ${isRight ? "md:mr-auto md:ml-0 md:pr-10" : "md:ml-auto md:mr-0 md:pl-10"}`}>
                <div className={`rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                  m.next
                    ? "bg-cyan-brand/10 border-cyan-brand/30 hover:shadow-cyan-brand/10"
                    : m.glow
                    ? "bg-primary-foreground/5 border-primary-foreground/15 hover:shadow-primary-foreground/5"
                    : "bg-primary-foreground/5 border-primary-foreground/10"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <m.icon className={`w-5 h-5 flex-shrink-0 ${m.glow ? "text-cyan-brand" : "text-primary-foreground/50"}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${m.glow ? "text-cyan-brand" : "text-primary-foreground/40"}`}>
                      {m.year}
                    </span>
                    {m.next && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-brand/20 text-cyan-brand px-2 py-0.5 rounded-full">
                        Als Nächstes
                      </span>
                    )}
                  </div>
                  <h3 className="text-primary-foreground font-bold text-base">{m.title}</h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default MomentumSection;

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const problems = [
  "Du zahlst bis zu 30 % Provision – auf deinen eigenen Umsatz.",
  "Deine Kundendaten gehören der Plattform, nicht dir.",
  "Du bist austauschbar – zwischen hunderten anderen Anbietern.",
  "Du hast keine Kontrolle über Preise, Marketing oder Darstellung.",
  "Dein Gewinn schrumpft, während die Plattform wächst.",
];

const ProblemSection = () => (
  <section className="section-padding bg-background">
    <div className="container-tight">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
            Du arbeitest hart.<br />
            <span className="text-destructive">Die Plattform profitiert.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
            Jede Bestellung über Lieferando, Wolt oder Uber Eats kostet dich bares Geld. Du trägst das Risiko, machst die Arbeit – und ein Großteil deines Gewinns geht an die Plattform.
          </p>
        </motion.div>

        <div className="space-y-4">
          {problems.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-destructive/5 border border-destructive/10 rounded-xl p-5"
            >
              <XCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
              <p className="text-foreground font-medium">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;

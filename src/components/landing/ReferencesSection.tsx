import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "TAKE – The Good Food",
    role: "Multi-Filiale, Düsseldorf & Mönchengladbach",
    text: "Seit wir mit Gastro Master arbeiten, haben wir deutlich mehr Direktbestellungen. Die App und der Webshop laufen einwandfrei – und der persönliche Support ist Gold wert.",
    highlight: true,
  },
  {
    name: "Pizzeria Il Sorriso",
    role: "Einzelfiliale",
    text: "Endlich keine Plattform-Provisionen mehr. Die Einrichtung war schnell und unkompliziert. Wir können Gastro Master nur empfehlen.",
  },
  {
    name: "Kojo Sushi",
    role: "Premium Delivery",
    text: "Unsere Kunden bestellen jetzt direkt über unsere App. Das spart uns jeden Monat bares Geld und wir haben volle Kontrolle über unser Business.",
  },
];

const ReferencesSection = () => (
  <section className="section-padding bg-background" id="referenzen">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
          Das sagen unsere Kunden
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Echte Ergebnisse von Gastronomen, die den Wechsel gemacht haben.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className={`rounded-2xl p-8 border ${t.highlight ? 'bg-gradient-navy text-primary-foreground border-cyan-brand/30' : 'bg-surface-light border-border'}`}
          >
            <Quote className={`w-8 h-8 mb-4 ${t.highlight ? 'text-cyan-brand' : 'text-muted-foreground/30'}`} />
            <p className={`mb-6 leading-relaxed ${t.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{t.text}</p>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-amber fill-current" />
              ))}
            </div>
            <div className={`font-bold ${t.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{t.name}</div>
            <div className={`text-sm ${t.highlight ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>{t.role}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ReferencesSection;

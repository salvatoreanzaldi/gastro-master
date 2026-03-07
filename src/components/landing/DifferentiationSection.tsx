import { motion } from "framer-motion";
import { MessageCircle, Phone, Calendar, CreditCard, Key, Shield } from "lucide-react";

const points = [
  { icon: MessageCircle, title: "WhatsApp-Support", desc: "Persönlicher Ansprechpartner – keine Ticket-Warteschlange." },
  { icon: Phone, title: "Telefonischer Support", desc: "Ruf uns an, wann immer du Hilfe brauchst." },
  { icon: Calendar, title: "Jederzeit kündbar", desc: "3 Monate Kündigungsfrist. Kein Langzeit-Lock-in." },
  { icon: Shield, title: "Erster Beitrag nach Launch", desc: "Du zahlst erst, wenn dein System live ist." },
  { icon: CreditCard, title: "PayPal- & Stripe-Setup", desc: "Wir helfen dir bei der kompletten Einrichtung." },
  { icon: Key, title: "Volle Kontrolle", desc: "Eigene Zugänge, eigene Daten, eigene Zahlungen." },
];

const DifferentiationSection = () => (
  <section className="section-padding bg-background">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
          Warum Gastro Master?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Wir sind nicht irgendein Software-Anbieter. Wir sind dein Partner – mit echtem Support, Flexibilität und Kontrolle für dich.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-surface-light border border-border rounded-2xl p-7"
          >
            <p.icon className="w-8 h-8 text-cyan-brand mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
            <p className="text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DifferentiationSection;

import { motion } from "framer-motion";
import { ArrowRight, Monitor, Receipt, Wifi, BarChart3 } from "lucide-react";
import kassenhardware from "@/assets/kassenhardware.png";

const features = [
  { icon: Monitor, title: "Modernes POS-System", desc: "Intuitive Bedienoberfläche für schnellen Service." },
  { icon: Receipt, title: "TSE-konform", desc: "Vollständig finanzamtkonform mit zertifizierter TSE." },
  { icon: Wifi, title: "Online & Offline", desc: "Funktioniert auch ohne Internet – synchronisiert automatisch." },
  { icon: BarChart3, title: "Auswertungen", desc: "Umsätze, Produkte und Zeiten auf einen Blick." },
];

const KassensystemSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-surface-light" id="kasse">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Alles aus einer Hand</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Kassensystem von Gastro Master
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Shop, App und Kasse – nahtlos verbunden. Ein Anbieter, ein System, volle Kontrolle.
          </p>
        </motion.div>

        {/* POS Hardware Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-14"
        >
          <img
            src={kassenhardware}
            alt="Gastro Master Kassensystem – POS Hardware mit Drucker und Kartenleser"
            className="w-full max-w-2xl object-contain"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-2xl p-6 text-center"
            >
              <f.icon className="w-8 h-8 text-cyan-brand mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={scrollToForm}
            className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Kasse anfragen
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default KassensystemSection;

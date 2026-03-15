import { motion } from "framer-motion";
import { MessageCircle, Phone, Users } from "lucide-react";
import ceoPortrait from "@/assets/ceo-rene-ebert.png";
import sanjayaPortrait from "@/assets/team-sanjaya-pattiyage.png";
import salvatorePortrait from "@/assets/team-salvatore-anzaldi.png";

const leaders = [
  {
    name: "René Ebert",
    role: "Gründer & CEO",
    focus: "Vertrieb & Marketing",
    img: ceoPortrait,
  },
  {
    name: "Sanjaya Pattiyage",
    role: "Gründer & CEO",
    focus: "IT & Technologie",
    img: sanjayaPortrait,
  },
  {
    name: "Salvatore Anzaldi",
    role: "Vertriebsleiter",
    focus: "Kundenberatung",
    img: salvatorePortrait,
  },
];

const FounderTrustSection = () => (
  <section className="section-padding bg-surface-light">
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
          Das Team hinter Gastro Master
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
          Echte Menschen.<br />Echte Begleitung.
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Kein anonymer Softwareanbieter – sondern ein Team mit 30+ Mitarbeitenden, das dich persönlich begleitet. Per WhatsApp, Telefon und vor Ort.
        </p>
      </motion.div>

      {/* Leadership */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {leaders.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center group"
          >
            <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-xl shadow-primary/5 border-2 border-border mb-5 group-hover:shadow-2xl group-hover:shadow-cyan-brand/10 transition-shadow duration-500">
              <img
                src={person.img}
                alt={`${person.name} – ${person.role}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="text-lg font-bold text-foreground">{person.name}</h3>
            <p className="text-cyan-brand text-sm font-semibold">{person.role}</p>
            <p className="text-muted-foreground text-sm">{person.focus}</p>
          </motion.div>
        ))}
      </div>

      {/* Team placeholders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center items-center gap-4 mb-10"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-background border border-border flex items-center justify-center"
          >
            <Users className="w-6 h-6 text-muted-foreground/30" />
          </div>
        ))}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-brand flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">30+</span>
        </div>
      </motion.div>

      {/* Support highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-6"
      >
        {[
          { icon: MessageCircle, text: "Persönlicher Support per WhatsApp" },
          { icon: Phone, text: "Direkt erreichbar per Telefon" },
          { icon: Users, text: "Begleitung beim gesamten Onboarding" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3 bg-background border border-border rounded-xl px-5 py-3">
            <item.icon className="w-5 h-5 text-cyan-brand flex-shrink-0" />
            <span className="text-foreground text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FounderTrustSection;

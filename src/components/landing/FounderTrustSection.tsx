import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import ceoPortrait from "@/assets/ceo-rene-ebert.png";
import sanjayaPortrait from "@/assets/team-sanjaya-pattiyage.png";
import salvatorePortrait from "@/assets/team-salvatore-anzaldi.png";
import andrejPortrait from "@/assets/team-andrej-krutsch.png";
import mohammadPortrait from "@/assets/team-mohammad-motakalemi.png";

const founders = [
  {
    name: "René Ebert",
    role: "Gründer & CEO",
    focus: "Vertrieb & Marketing",
    img: ceoPortrait,
    bio: "Nach seinem Bachelor in International Business Management entschied er sich für den unternehmerischen Weg. Sein Fokus liegt auf Wachstum, Vertrieb und strategischer Marktentwicklung.",
    linkedin: "#",
  },
  {
    name: "Sanjaya Pattiyage",
    role: "Gründer & CEO",
    focus: "IT & Technologie",
    img: sanjayaPortrait,
    bio: "Langjähriger IT-Spezialist mit Erfahrung in Technologie- und Führungsrollen bei international führenden Unternehmen wie Procter & Gamble. Fokus auf Produkt, Systeme und skalierbare Technologie.",
    linkedin: "#",
  },
];

const team = [
  {
    name: "Salvatore Anzaldi",
    role: "Vertriebsleiter",
    focus: "Kundenberatung",
    img: salvatorePortrait,
    bio: "Mehrjährige Vertriebserfahrung. Zuvor im Verkauf mechanischer Luxusuhren bei einem führenden Online-Anbieter wie CHRONEXT tätig – und weiß, dass jede einzelne Komponente zählt.",
    linkedin: "#",
  },
  {
    name: "Andrej Krutsch",
    role: "Service Customer Manager",
    focus: "Kundenbetreuung",
    img: andrejPortrait,
    bio: "Zuvor in leitenden Positionen im Lebensmitteleinzelhandel tätig, unter anderem bei Rewe. Bringt fundierte Erfahrung in Kundenservice und Betriebsorganisation mit.",
    linkedin: "#",
  },
  {
    name: "Mohammad Motakalemi",
    role: "Vertrieb",
    focus: "Gastronomie-Expertise",
    img: mohammadPortrait,
    bio: "Ehemaliger Gastronom, der durch seine eigene positive Erfahrung als Kunde den Weg ins Team fand. Er kennt die Herausforderungen der Branche aus erster Hand.",
    linkedin: "#",
  },
];

type Person = typeof founders[0];

const FlipCard = ({ person, index }: { person: Person; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="perspective-[1200px] cursor-pointer w-full"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "380px",
        }}
      >
        {/* Front */}
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-full rounded-3xl overflow-hidden border-2 border-border bg-background shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="relative w-full h-56 md:h-64 overflow-hidden">
              <img
                src={person.img}
                alt={`${person.name} – ${person.role}`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-foreground">{person.name}</h3>
              <p className="text-cyan-brand text-sm font-semibold">{person.role}</p>
              <p className="text-muted-foreground text-sm">{person.focus}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="h-full rounded-3xl border-2 border-cyan-brand/20 bg-gradient-navy p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">{person.name}</h3>
              <p className="text-cyan-brand text-sm font-semibold mb-4">{person.role}</p>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{person.bio}</p>
            </div>
            <a
              href={person.linkedin}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-brand hover:text-primary-foreground text-sm font-medium transition-colors mt-4"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn Profil
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
          Kein anonymer Softwareanbieter – sondern ein Team mit 30+ Mitarbeitenden, das dich persönlich begleitet.
        </p>
      </motion.div>

      {/* Row 1: Founders (2 CEOs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-5">
        {founders.map((person, i) => (
          <FlipCard key={person.name} person={person} index={i} />
        ))}
      </div>

      {/* Row 2: Team (3 members) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {team.map((person, i) => (
          <FlipCard key={person.name} person={person} index={i + 2} />
        ))}
      </div>
    </div>
  </section>
);

export default FounderTrustSection;

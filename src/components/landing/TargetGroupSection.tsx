import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Building2, ChefHat, Store, CakeSlice, Pizza, Drumstick, IceCream, Croissant, Layers } from "lucide-react";

const deliverySubcategories = [
  { id: "pizzeria", label: "Pizzeria", icon: Pizza },
  { id: "asiatisch", label: "Asiatisch", icon: ChefHat },
  { id: "indisch", label: "Indisch", icon: ChefHat },
  { id: "burger", label: "Burger & Chicken", icon: Drumstick },
  { id: "eis", label: "Eis & Dessert", icon: IceCream },
  { id: "baeckerei-sub", label: "Bäckerei", icon: Croissant },
  { id: "franchise-sub", label: "Franchise", icon: Building2 },
];

type TargetContent = {
  title: string;
  subtitle: string;
  text: string;
};

const mainGroups: { id: string; label: string; icon: typeof Truck; content: TargetContent }[] = [
  {
    id: "lieferdienst", label: "Lieferdienst", icon: Truck,
    content: {
      title: "Mehr Gewinn pro Lieferung",
      subtitle: "Dein eigener Bestell­kanal – ohne Plattform-Provision",
      text: "Mit einem eigenen Webshop und einer eigenen App erreichst du deine Kunden direkt. Keine Provisionen, volle Kontrolle über dein Liefergeschäft. Ideal für Pizzerien, Asia-Restaurants, Burger-Läden und alle, die liefern.",
    },
  },
  {
    id: "franchise", label: "Franchise", icon: Building2,
    content: {
      title: "Ein System für alle Standorte",
      subtitle: "Zentrale Steuerung, lokale Flexibilität",
      text: "Verwalte mehrere Filialen über ein einziges Dashboard. Einheitliches Branding, zentrale Speisekarte und individuelle Anpassungen pro Standort – alles aus einem System.",
    },
  },
  {
    id: "ghost", label: "Ghost Kitchen", icon: ChefHat,
    content: {
      title: "Maximale Marge ohne Ladenlokal",
      subtitle: "Delivery-first – ohne Plattformabhängigkeit",
      text: "Als Ghost Kitchen zählt jeder Cent. Mit deinem eigenen Bestellsystem sparst du dir die hohen Plattform-Provisionen und baust dir eine direkte Kundenbeziehung auf.",
    },
  },
  {
    id: "einzelhandel", label: "Einzelhändler", icon: Store,
    content: {
      title: "Dein Laden – jetzt auch online",
      subtitle: "Click & Collect und Direktbestellungen",
      text: "Biete deinen Kunden ein modernes Online-Bestell­erlebnis. Ideal für Feinkost, Metzgereien, Getränkehändler und lokale Spezialitäten – mit Abholung oder Lieferung.",
    },
  },
  {
    id: "baeckerei", label: "Bäckerei", icon: CakeSlice,
    content: {
      title: "Frisch bestellt, lokal abgeholt",
      subtitle: "Vorbestellungen und Filialabholung leicht gemacht",
      text: "Lass deine Kunden Brötchen, Kuchen und Snacks bequem vorbestellen – über deinen eigenen Webshop oder deine App. Perfekt für Bäckereien mit einer oder mehreren Filialen.",
    },
  },
];

const subContent: Record<string, TargetContent> = {
  pizzeria: { title: "Die Nr. 1 im Liefergeschäft", subtitle: "Pizza-Bestellungen direkt über deine App", text: "Pizzerien profitieren am meisten von Direktbestellungen. Spare bis zu 30 % Provision pro Bestellung und baue dir mit deiner eigenen App einen treuen Kundenstamm auf." },
  asiatisch: { title: "Asia-Küche, eigene Bestellungen", subtitle: "Sushi, Wok & mehr – direkt bestellt", text: "Ob Sushi, Pad Thai oder Ramen – mit deinem eigenen Webshop bestellen deine Kunden direkt bei dir. Ohne Umwege. Ohne Provisionen." },
  indisch: { title: "Indische Spezialitäten direkt bestellt", subtitle: "Curry, Tandoori & Co. provisionsfrei", text: "Deine Kunden lieben dein Essen – warum sollte eine Plattform daran mitverdienen? Mit Gastro Master bestellst du direkt und behältst den vollen Umsatz." },
  burger: { title: "Burger & Chicken ohne Provision", subtitle: "Fast-Food-Bestellungen direkt über dich", text: "Burger-Restaurants und Chicken-Shops gehören zu den stärksten Lieferkategorien. Hol dir deine Marge zurück mit einem eigenen Bestellkanal." },
  eis: { title: "Süße Bestellungen, voller Gewinn", subtitle: "Eis, Waffeln & Desserts direkt liefern", text: "Eisdielen und Dessert-Shops mit Lieferung boomen. Nutze deinen eigenen Webshop für Vorbestellungen, Abholung und Lieferung – ohne Plattform-Provisionen." },
  "baeckerei-sub": { title: "Bäckerei mit Lieferservice", subtitle: "Brötchen, Kuchen & Co. vorbestellen lassen", text: "Lass deine Kunden morgens bequem vorbestellen und liefere frisch – oder biete Click & Collect an. Perfekt für Bäckereien, die mehr wollen." },
  "franchise-sub": { title: "Franchise-Lieferdienst", subtitle: "Einheitlich bestellen – überall", text: "Du betreibst mehrere Standorte mit Lieferdienst? Verwalte alles zentral, behalte lokale Flexibilität und spare massiv an Plattform-Provisionen." },
};

const TargetGroupSection = () => {
  const [activeGroup, setActiveGroup] = useState("lieferdienst");
  const [activeSub, setActiveSub] = useState("pizzeria");

  const activeMain = mainGroups.find(g => g.id === activeGroup)!;
  const showSubs = activeGroup === "lieferdienst";
  const displayContent = showSubs ? subContent[activeSub] : activeMain.content;

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            Für jede Gastronomie
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Dein Betrieb. Deine Lösung.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Egal ob Pizzeria, Franchise oder Ghost Kitchen – finde das Modell, das zu dir passt.
          </p>
        </motion.div>

        {/* Main group selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {mainGroups.map(g => (
            <button
              key={g.id}
              onClick={() => { setActiveGroup(g.id); if (g.id === "lieferdienst") setActiveSub("pizzeria"); }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm ${
                activeGroup === g.id
                  ? "bg-foreground text-background border-foreground shadow-lg"
                  : "bg-background/60 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              <g.icon className="w-4 h-4" />
              {g.label}
            </button>
          ))}
        </div>

        {/* Sub-selector for Lieferdienst */}
        <AnimatePresence>
          {showSubs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {deliverySubcategories.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSub(s.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                      activeSub === s.id
                        ? "bg-cyan-brand/10 text-cyan-brand border-cyan-brand/30"
                        : "bg-surface-light text-muted-foreground border-border hover:border-cyan-brand/20 hover:text-foreground"
                    }`}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showSubs ? activeSub : activeGroup}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-light border border-border rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
              {displayContent.title}
            </h3>
            <p className="text-cyan-brand font-semibold mb-4">{displayContent.subtitle}</p>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {displayContent.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TargetGroupSection;

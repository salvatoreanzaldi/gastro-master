import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Building2, ChefHat, Store, CakeSlice, Pizza, Drumstick, IceCream, Croissant, ArrowRight } from "lucide-react";

import imgPizzeria from "@/assets/target-pizzeria.png";
import imgAsiatisch from "@/assets/target-asiatisch.png";
import imgIndisch from "@/assets/target-indisch.png";
import imgBurger from "@/assets/target-burger.png";
import imgEis from "@/assets/target-eis.png";
import imgBaeckerei from "@/assets/target-baeckerei.png";
import imgFranchise from "@/assets/target-franchise.jpeg";
import imgGhostKitchen from "@/assets/target-ghost-kitchen.png";
import imgEinzelhandel from "@/assets/target-einzelhandel.png";

const deliverySubcategories = [
  { id: "pizzeria", label: "Pizzeria", icon: Pizza },
  { id: "asiatisch", label: "Asiatisch", icon: ChefHat },
  { id: "indisch", label: "Indisch", icon: ChefHat },
  { id: "burger", label: "Burger & Chicken", icon: Drumstick },
  { id: "eis", label: "Eis & Dessert", icon: IceCream },
  { id: "baeckerei-sub", label: "Bäckerei", icon: Croissant },
  { id: "franchise-sub", label: "Franchise", icon: Building2 },
];

type TargetContent = { title: string; subtitle: string; text: string; img: string };

const mainGroups: { id: string; label: string; icon: typeof Truck; content: TargetContent }[] = [
  {
    id: "lieferdienst", label: "Lieferdienst", icon: Truck,
    content: { title: "Mehr Gewinn pro Lieferung", subtitle: "Dein eigener Bestell­kanal – ohne Plattform-Provision", text: "Mit einem eigenen Webshop und einer eigenen App erreichst du deine Kunden direkt. Keine Provisionen, volle Kontrolle über dein Liefergeschäft.", img: imgPizzeria },
  },
  {
    id: "franchise", label: "Franchise", icon: Building2,
    content: { title: "Ein System für alle Standorte", subtitle: "Zentrale Steuerung, lokale Flexibilität", text: "Verwalte mehrere Filialen über ein einziges Dashboard. Einheitliches Branding, zentrale Speisekarte und individuelle Anpassungen pro Standort.", img: imgFranchise },
  },
  {
    id: "ghost", label: "Ghost Kitchen", icon: ChefHat,
    content: { title: "Maximale Marge ohne Ladenlokal", subtitle: "Delivery-first – ohne Plattformabhängigkeit", text: "Als Ghost Kitchen zählt jeder Cent. Mit deinem eigenen Bestellsystem sparst du dir die hohen Plattform-Provisionen und baust dir eine direkte Kundenbeziehung auf.", img: imgGhostKitchen },
  },
  {
    id: "einzelhandel", label: "Einzelhändler", icon: Store,
    content: { title: "Dein Laden – jetzt auch online", subtitle: "Click & Collect und Direktbestellungen", text: "Biete deinen Kunden ein modernes Online-Bestell­erlebnis. Ideal für Feinkost, Metzgereien, Getränkehändler und lokale Spezialitäten.", img: imgEinzelhandel },
  },
  {
    id: "baeckerei", label: "Bäckerei", icon: CakeSlice,
    content: { title: "Frisch bestellt, lokal abgeholt", subtitle: "Vorbestellungen und Filialabholung leicht gemacht", text: "Lass deine Kunden Brötchen, Kuchen und Snacks bequem vorbestellen – über deinen eigenen Webshop oder deine App.", img: imgBaeckerei },
  },
];

const subContent: Record<string, TargetContent> = {
  pizzeria: { title: "Die Nr. 1 im Liefergeschäft", subtitle: "Pizza-Bestellungen direkt über deine App", text: "Pizzerien profitieren am meisten von Direktbestellungen. Spare bis zu 30 % Provision pro Bestellung.", img: imgPizzeria },
  asiatisch: { title: "Asia-Küche, eigene Bestellungen", subtitle: "Sushi, Wok & mehr – direkt bestellt", text: "Ob Sushi, Pad Thai oder Ramen – mit deinem eigenen Webshop bestellen deine Kunden direkt bei dir.", img: imgAsiatisch },
  indisch: { title: "Indische Spezialitäten direkt bestellt", subtitle: "Curry, Tandoori & Co. provisionsfrei", text: "Deine Kunden lieben dein Essen – warum sollte eine Plattform daran mitverdienen?", img: imgIndisch },
  burger: { title: "Burger & Chicken ohne Provision", subtitle: "Fast-Food-Bestellungen direkt über dich", text: "Burger-Restaurants und Chicken-Shops gehören zu den stärksten Lieferkategorien. Hol dir deine Marge zurück.", img: imgBurger },
  eis: { title: "Süße Bestellungen, voller Gewinn", subtitle: "Eis, Waffeln & Desserts direkt liefern", text: "Eisdielen und Dessert-Shops mit Lieferung boomen. Nutze deinen eigenen Webshop für Vorbestellungen.", img: imgEis },
  "baeckerei-sub": { title: "Bäckerei mit Lieferservice", subtitle: "Brötchen, Kuchen & Co. vorbestellen lassen", text: "Lass deine Kunden morgens bequem vorbestellen und liefere frisch – oder biete Click & Collect an.", img: imgBaeckerei },
  "franchise-sub": { title: "Franchise-Lieferdienst", subtitle: "Einheitlich bestellen – überall", text: "Du betreibst mehrere Standorte mit Lieferdienst? Verwalte alles zentral und spare massiv.", img: imgFranchise },
};

const autoSequence = [
  ...deliverySubcategories.map(s => ({ group: "lieferdienst", sub: s.id })),
  ...mainGroups.filter(g => g.id !== "lieferdienst").map(g => ({ group: g.id, sub: null })),
];

const TargetGroupSection = () => {
  const [activeGroup, setActiveGroup] = useState("lieferdienst");
  const [activeSub, setActiveSub] = useState("pizzeria");
  const [autoIndex, setAutoIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const showSubs = activeGroup === "lieferdienst";
  const displayContent = showSubs ? subContent[activeSub] : mainGroups.find(g => g.id === activeGroup)!.content;

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAutoIndex(prev => {
        const next = (prev + 1) % autoSequence.length;
        const item = autoSequence[next];
        setActiveGroup(item.group);
        if (item.sub) setActiveSub(item.sub);
        return next;
      });
    }, 5000);
  }, []);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);

  const handleGroupClick = (id: string) => {
    setActiveGroup(id);
    if (id === "lieferdienst") setActiveSub("pizzeria");
    const idx = autoSequence.findIndex(s => s.group === id && (id === "lieferdienst" ? s.sub === "pizzeria" : true));
    if (idx >= 0) setAutoIndex(idx);
    startAuto();
  };

  const handleSubClick = (id: string) => {
    setActiveSub(id);
    const idx = autoSequence.findIndex(s => s.sub === id);
    if (idx >= 0) setAutoIndex(idx);
    startAuto();
  };

  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Für jede Gastronomie</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">Dein Betrieb. Deine Lösung.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Egal ob Pizzeria, Franchise oder Ghost Kitchen – finde das Modell, das zu dir passt.</p>
        </motion.div>

        {/* Main group selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {mainGroups.map(g => (
            <button key={g.id} onClick={() => handleGroupClick(g.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm ${
                activeGroup === g.id ? "bg-foreground text-background border-foreground shadow-lg" : "bg-background/60 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}>
              <g.icon className="w-4 h-4" />
              {g.label}
            </button>
          ))}
        </div>

        {/* Fixed-height container for subcategories — always reserves space */}
        <div className="h-[52px] mb-8">
          <div className={`flex flex-wrap justify-center gap-2 transition-opacity duration-200 ${showSubs ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {deliverySubcategories.map(s => (
              <button key={s.id} onClick={() => handleSubClick(s.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                  activeSub === s.id ? "bg-cyan-brand/10 text-cyan-brand border-cyan-brand/30" : "bg-surface-light text-muted-foreground border-border hover:border-cyan-brand/20 hover:text-foreground"
                }`}>
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content - fixed height container */}
        <div className="h-[400px] md:h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={showSubs ? activeSub : activeGroup}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-surface-light border border-border rounded-3xl overflow-hidden max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src={displayContent.img} alt={displayContent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-light/20 hidden md:block" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">{displayContent.title}</h3>
                  <p className="text-cyan-brand font-semibold mb-4 text-sm">{displayContent.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{displayContent.text}</p>
                  <button onClick={scrollToForm}
                    className="bg-gradient-amber text-primary font-bold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2 self-start">
                    Jetzt beraten lassen
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TargetGroupSection;

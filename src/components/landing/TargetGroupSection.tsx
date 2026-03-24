import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Building2, ChefHat, Store, CakeSlice, Pizza, Drumstick, IceCream, Croissant, Layers, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import imgPizzeria from "@/assets/target-pizzeria.png";
import imgAsiatisch from "@/assets/target-asiatisch.png";
import imgIndisch from "@/assets/target-indisch.png";
import imgBurger from "@/assets/target-burger.png";
import imgEis from "@/assets/target-eis.png";
import imgBaeckerei from "@/assets/target-baeckerei.png";
import imgFranchise from "@/assets/target-franchise.jpeg";
import imgGhostKitchen from "@/assets/target-ghost-kitchen.png";
import imgEinzelhandel from "@/assets/target-einzelhandel.png";

const groupIcons: Record<string, typeof Truck> = {
  lieferdienst: Truck,
  franchise: Building2,
  ghost: ChefHat,
  einzelhandel: Store,
  baeckerei: CakeSlice,
};

const subIcons: Record<string, typeof Pizza> = {
  pizzeria: Pizza,
  asiatisch: ChefHat,
  indisch: ChefHat,
  burger: Drumstick,
  eis: IceCream,
  "baeckerei-sub": Croissant,
  "franchise-sub": Building2,
};

const groupImgs: Record<string, string> = {
  lieferdienst: imgPizzeria,
  franchise: imgFranchise,
  ghost: imgGhostKitchen,
  einzelhandel: imgEinzelhandel,
  baeckerei: imgBaeckerei,
};

const subImgs: Record<string, string> = {
  pizzeria: imgPizzeria,
  asiatisch: imgAsiatisch,
  indisch: imgIndisch,
  burger: imgBurger,
  eis: imgEis,
  "baeckerei-sub": imgBaeckerei,
  "franchise-sub": imgFranchise,
};

const TargetGroupSection = () => {
  const { t } = useLanguage();
  const [activeGroup, setActiveGroup] = useState("lieferdienst");
  const [activeSub, setActiveSub] = useState("pizzeria");
  const [autoIndex, setAutoIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const showSubs = activeGroup === "lieferdienst";

  const autoSequence = [
    ...t.target.subs.map(s => ({ group: "lieferdienst", sub: s.id })),
    ...t.target.groups.filter(g => g.id !== "lieferdienst").map(g => ({ group: g.id, sub: null as string | null })),
  ];

  const displayContent = showSubs
    ? t.target.subs.find(s => s.id === activeSub)?.content
    : t.target.groups.find(g => g.id === activeGroup)?.content;

  const displayImg = showSubs ? subImgs[activeSub] : groupImgs[activeGroup];

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
  }, [autoSequence.length]);

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
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t.target.badge}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{t.target.headline}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.target.sub}</p>
        </motion.div>

        {/* Main group selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {t.target.groups.map(g => {
            const Icon = groupIcons[g.id] ?? Truck;
            return (
              <button key={g.id} onClick={() => handleGroupClick(g.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm ${
                  activeGroup === g.id ? "bg-foreground text-background border-foreground shadow-lg" : "bg-background/60 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}>
                <Icon className="w-4 h-4" />
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Sub-selector for delivery – fixed height, no layout shift */}
        <div className="h-16 flex items-center justify-center mb-2">
          <motion.div
            animate={{ opacity: showSubs ? 1 : 0, pointerEvents: showSubs ? "auto" : "none" }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {t.target.subs.map(s => {
              const Icon = subIcons[s.id] ?? ChefHat;
              return (
                <button key={s.id} onClick={() => handleSubClick(s.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                    activeSub === s.id ? "bg-cyan-brand/10 text-cyan-brand border-cyan-brand/30" : "bg-surface-light text-muted-foreground border-border hover:border-cyan-brand/20 hover:text-foreground"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showSubs ? activeSub : activeGroup}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-surface-light border border-border rounded-3xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-0 min-h-[380px]">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img src={displayImg} alt={displayContent?.title ?? ""} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-light/20 hidden md:block" />
              </div>
              {/* Text */}
              <div className="p-8 md:p-10 flex flex-col justify-center min-h-[380px]">
                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">{displayContent?.title}</h3>
                <p className="text-cyan-brand font-semibold mb-4 text-sm">{displayContent?.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{displayContent?.text}</p>
                <button onClick={scrollToForm}
                  className="bg-gradient-amber text-primary font-bold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2 self-start">
                  {t.target.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TargetGroupSection;

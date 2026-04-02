import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import takeStartbild from "@/assets/screenshots/take-startbild.jpeg";
import takeMenu from "@/assets/screenshots/take-menu.jpeg";
import takeFilialen from "@/assets/screenshots/take-filialen.jpeg";
import takeBestellart from "@/assets/screenshots/take-bestellart.jpeg";
import takeBenutzerkonto from "@/assets/screenshots/take-benutzerkonto.jpeg";
import { useTranslation } from "react-i18next";

const screenImgs = [takeStartbild, takeMenu, takeFilialen, takeBestellart, takeBenutzerkonto];

// Arc parameters — desktop defaults
const SPACING_D = 220;  // px between phone centers
const BEND_D = 22;      // arc curve coefficient
const ROTATE_Y_D = 14;  // degrees of 3-D tilt per offset unit
// Mobile-optimised values (read at runtime to avoid SSR issues)
const SPACING_M = 130;
const BEND_M = 6;
const ROTATE_Y_M = 0;   // no 3-D rotation on mobile for performance

interface PhoneCardProps {
  img: string;
  label: string;
  index: number;
  centerIdx: MotionValue<number>;
}

const PhoneCard = ({ img, label, index, centerIdx }: PhoneCardProps) => {
  // Read window.innerWidth at animation time so each frame uses the current value.
  // This avoids React state/hooks for a pure-motion concern.
  const isMob = () => typeof window !== "undefined" && window.innerWidth < 768;

  const x      = useTransform(centerIdx, (c) => (index - c) * (isMob() ? SPACING_M : SPACING_D));
  const y      = useTransform(centerIdx, (c) => Math.pow(index - c, 2) * (isMob() ? BEND_M : BEND_D));
  const scale  = useTransform(centerIdx, (c) => Math.max(1 - Math.abs(index - c) * 0.1, 0.6));
  const rotY   = useTransform(centerIdx, (c) => (index - c) * (isMob() ? ROTATE_Y_M : ROTATE_Y_D));
  const opacity = useTransform(centerIdx, (c) => Math.max(1 - Math.abs(index - c) * 0.25, 0.18));

  return (
    /* Outer div handles static centering; motion.div handles all animation */
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="flex flex-col items-center"
        style={{ x, y, scale, rotateY: rotY, opacity }}
      >
        {/* iPhone frame */}
        <div className="relative w-[150px] md:w-[170px] lg:w-[190px] rounded-[2.2rem] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1e] to-[#0e0e10] p-[3px] shadow-2xl shadow-black/60">
          <div className="rounded-[2rem] bg-gradient-to-b from-[#3a3a3e] via-[#1c1c20] to-[#0c0c0e] p-[2px]">
            <div className="rounded-[1.85rem] overflow-hidden bg-black relative">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[55px] md:w-[65px] lg:w-[72px] h-[16px] md:h-[20px] lg:h-[22px] bg-black rounded-full z-10" />
              <img src={img} alt={label} className="w-full block" />
            </div>
          </div>
          {/* Side buttons */}
          <div className="absolute right-[-2px] top-[25%] w-[2px] h-6 bg-[#3a3a3e] rounded-l-sm" />
          <div className="absolute left-[-2px] top-[20%] w-[2px] h-4 bg-[#3a3a3e] rounded-r-sm" />
          <div className="absolute left-[-2px] top-[30%] w-[2px] h-8 bg-[#3a3a3e] rounded-r-sm" />
          <div className="absolute left-[-2px] top-[40%] w-[2px] h-8 bg-[#3a3a3e] rounded-r-sm" />
        </div>
        <p className="text-primary-foreground/55 text-xs font-medium mt-4 whitespace-nowrap">{label}</p>
      </motion.div>
    </div>
  );
};

interface DotProps {
  index: number;
  centerIdx: MotionValue<number>;
}

const Dot = ({ index, centerIdx }: DotProps) => {
  const bg = useTransform(centerIdx, (c) =>
    Math.abs(index - c) < 0.55
      ? "hsl(196, 100%, 50%)"
      : "hsla(0, 0%, 100%, 0.22)"
  );
  return <motion.div className="w-2 h-2 rounded-full" style={{ backgroundColor: bg }} />;
};

const MockupShowcase = () => {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile once at mount for container height
  const [containerHeight] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? "200vh" : "270vh"
  );

  // scrollYProgress 0→1 maps to the full height of the scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // centerIdx 0→4: which phone is currently "front and center"
  const centerIdx = useTransform(scrollYProgress, [0, 1], [0, 4]);

  return (
    /* Tall scroll container – gives the sticky section room to animate */
    <div ref={containerRef} style={{ height: containerHeight }}>
      <section className="sticky top-0 h-screen bg-gradient-navy overflow-hidden flex flex-col">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, hsl(196, 100%, 40%), transparent 50%)",
          }}
        />

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-14 pb-4 relative z-10 shrink-0 px-4"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("mockup.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
            {t("mockup.headline")}
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
            {t("mockup.sub")}
          </p>
        </motion.div>

        {/* 3-D circular gallery */}
        <div className="relative flex-1" style={{ perspective: "1200px" }}>
          {screenImgs.map((img, i) => (
            <PhoneCard
              key={i}
              img={img}
              label={t(`mockup.tabs.${i}`)}
              index={i}
              centerIdx={centerIdx}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2.5 pb-10 shrink-0 z-10">
          {screenImgs.map((_, i) => (
            <Dot key={i} index={i} centerIdx={centerIdx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MockupShowcase;

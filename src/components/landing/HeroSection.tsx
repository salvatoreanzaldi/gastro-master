import { motion } from "framer-motion";
import { ArrowRight, Star, Users, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo-gastro-master.jpg";
import takeMenu from "@/assets/take-menu.jpeg";
import takeFilialen from "@/assets/take-filialen.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-navy min-h-screen flex items-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        background: "radial-gradient(ellipse at 70% 50%, hsl(196, 100%, 40%), transparent 60%)"
      }} />

      <div className="container-tight section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="flex items-center gap-3 mb-8">
              <img src={logo} alt="Gastro Master Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-primary-foreground/80 font-medium text-sm tracking-wide uppercase">Gastro Master</span>
            </motion.div>

            <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-[1.08] mb-6">
              Hör auf, Provision auf deinen eigenen Umsatz zu zahlen.
            </motion.h1>

            <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
              className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-lg leading-relaxed">
              Dein eigener Webshop & deine eigene App – damit deine Kunden direkt bei dir bestellen. Ohne Plattform-Provisionen. Mehr Gewinn ab Tag eins.
            </motion.p>

            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={scrollToForm}
                className="bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-amber/20 flex items-center justify-center gap-2">
                Kostenlose Beratung
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}
              className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber" fill="currentColor" />
                5,0 Sterne bei Google
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-brand" />
                700+ Kunden
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-brand" />
                0 % Provision
              </span>
            </motion.div>
          </div>

          {/* Right: Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main phone */}
              <div className="relative z-10 w-[260px] md:w-[280px] rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/40 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl z-20" />
                <img src={takeMenu} alt="TAKE The Good Food App – Menü" className="w-full" />
              </div>
              {/* Second phone behind */}
              <div className="absolute -left-16 top-12 w-[220px] md:w-[240px] rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/40 overflow-hidden -rotate-6 opacity-80">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-2xl z-20" />
                <img src={takeFilialen} alt="TAKE The Good Food App – Filialen" className="w-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const FranchisePage = () => (
  <div className="min-h-screen" style={{ backgroundColor: "#0A264A" }}>
    <Navbar />
    <section className="mesh-gradient min-h-screen flex items-center px-5 md:px-8 lg:px-16 pt-36 pb-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#007DCF]/8 blur-[160px] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full bg-cyan-brand/15 text-cyan-brand text-xs font-bold uppercase tracking-widest mb-8"
        >
          Lösungen
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-8"
        >
          Gastro Franchise –{" "}
          <span className="text-gradient-brand">deine Marke, dein System.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-white/55 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Skaliere dein Gastronomiekonzept mit einem einheitlichen Kassensystem, zentraler Menüverwaltung und White-Label-Technologie für alle Standorte.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={() => { window.location.href = "/kontakt"; }}
            className="bg-gradient-amber text-[#0A264A] font-bold px-10 py-5 rounded-xl text-lg inline-flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/20"
          >
            Kostenloses Beratungsgespräch
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default FranchisePage;

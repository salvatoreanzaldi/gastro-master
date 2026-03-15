import { motion } from "framer-motion";
import { Tv, Eye, Sparkles, ArrowRight } from "lucide-react";
import pickupScreen from "@/assets/pickup-screen.jpeg";

const PickUpScreenSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-surface-light overflow-hidden">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
              <img
                src={pickupScreen}
                alt="Gastro Master Pick-Up Screen – digitale Speisekarte am TV"
                className="w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
              Digitales Erlebnis
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 leading-tight">
              Dein Bildschirm.<br />
              Dein Appetitanreger.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Zeige deinen Gästen aktuelle Angebote, Tagesgerichte und Highlights direkt auf dem TV-Monitor. Visuell ansprechend, appetitlich gestaltet und immer aktuell – alles gesteuert über dein Kassensystem.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Tv, text: "Pick-Up Screen & digitale Speisekarte" },
                { icon: Eye, text: "Aufmerksamkeit und Umsatz steigern" },
                { icon: Sparkles, text: "Angebote & Deals visuell hervorheben" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-brand/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-cyan-brand" />
                  </div>
                  <span className="text-foreground text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToForm}
              className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2"
            >
              Mehr erfahren
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PickUpScreenSection;

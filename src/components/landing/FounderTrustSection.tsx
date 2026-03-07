import { motion } from "framer-motion";
import { MessageCircle, Phone, Users } from "lucide-react";
import ceoPortrait from "@/assets/ceo-rene-ebert.png";

const FounderTrustSection = () => (
  <section className="section-padding bg-surface-light">
    <div className="container-tight">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-2 border-border">
              <img
                src={ceoPortrait}
                alt="René Ebert – Gründer & CEO von Gastro Master"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-background border border-border rounded-2xl px-5 py-3 shadow-lg">
              <p className="text-sm font-bold text-foreground">René Ebert</p>
              <p className="text-xs text-muted-foreground">Gründer & CEO</p>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            Persönlich erreichbar
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 leading-tight">
            Kein anonymer Softwareanbieter.<br />
            Echte Menschen, echte Begleitung.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Hinter Gastro Master steht ein engagiertes Team rund um Gründer René Ebert. Kein Ticketsystem, keine Warteschleife – sondern persönlicher Support per WhatsApp und Telefon. Vom ersten Gespräch bis zum Launch und darüber hinaus.
          </p>

          <div className="space-y-5">
            {[
              { icon: MessageCircle, text: "Persönlicher Support per WhatsApp" },
              { icon: Phone, text: "Direkt erreichbar per Telefon" },
              { icon: Users, text: "Begleitung beim gesamten Onboarding" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-brand/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-cyan-brand" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FounderTrustSection;

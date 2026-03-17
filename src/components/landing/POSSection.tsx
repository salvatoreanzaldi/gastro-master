import { motion } from "framer-motion";
import { ArrowRight, Check, Truck, QrCode, ShoppingBag } from "lucide-react";
import kassenhardware from "@/assets/kassenhardware.png";
import selforderTerminals from "@/assets/selfordering-terminals.png";
import addonFrankfurt from "@/assets/addon-frankfurt.png";
import addonQrcode from "@/assets/addon-qrcode.png";

const POSSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-surface-light" id="kasse">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Eigenständig buchbar</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">Die Gastro Master Cloud-Kasse</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            TSE-konforme Kassensoftware für Restaurants, Lieferdienste und Gastronomiebetriebe – auch ohne Webshop oder App buchbar.
          </p>
        </motion.div>

        {/* Main POS product */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-navy rounded-3xl border border-cyan-brand/20 overflow-hidden mb-10">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-block bg-cyan-brand/10 text-cyan-brand text-xs font-bold px-3 py-1 rounded-full mb-4">Cloud-Kassensoftware</div>
              <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">ab 69 € / Monat</h3>
              <p className="text-primary-foreground/40 text-xs mb-6">zzgl. MwSt.</p>
              <ul className="space-y-3 mb-8">
                {["TSE-konforme Cloud-Kassensoftware","Monatlich kündbar","Läuft auf Windows-Computern","Cloud-Backoffice & Auswertungen","Service am Tisch, Lieferung & Abholung","Persönlicher Support per WhatsApp","Modular erweiterbar durch Add-ons"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-brand shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={scrollToForm}
                className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
                Kassensystem beraten lassen
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center p-8 md:p-12">
              <img src={kassenhardware} alt="Gastro Master Cloud-Kasse – POS Hardware" className="w-full max-w-md object-contain" />
            </div>
          </div>
        </motion.div>

        {/* Add-ons - balanced 3 columns */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Fahrer-App with Frankfurt image */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
            className="rounded-2xl border border-border bg-background p-7 flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
              <Truck className="w-3.5 h-3.5" /> Add-on
            </div>
            <div className="mb-4 rounded-xl overflow-hidden border border-border bg-surface-light aspect-[4/3] flex items-center justify-center p-4">
              <img src={addonFrankfurt} alt="Fahrer-App – GPS Tracking in Frankfurt" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">Fahrer-App mit GPS</h4>
            <p className="text-xs text-muted-foreground mb-5">+10 € / Monat pro Fahrer zzgl. MwSt.</p>
            <ul className="space-y-2 flex-1">
              {["GPS-Tracking für alle Fahrer","Transparenz im Lieferbetrieb","Sinnvoll für Betriebe mit eigenem Lieferdienst"].map(p => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
                  <span className="text-sm text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* QR-Code Tischsystem */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-background p-7 flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
              <QrCode className="w-3.5 h-3.5" /> Add-on
            </div>
            <div className="mb-4 rounded-xl overflow-hidden border border-border bg-surface-light aspect-[4/3] flex items-center justify-center">
              <img src={addonQrcode} alt="QR-Code Tischsystem – Bar-Bestellung" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">Bar-System / QR-Code Tischsystem</h4>
            <p className="text-xs text-muted-foreground mb-5">+50 € / Monat für 5 Tische, +5 € je weiterem Tisch zzgl. MwSt.</p>
            <ul className="space-y-2 flex-1">
              {["QR-Code-Bestellung am Tisch","Modernes Inhouse-Erlebnis","Ideal für Restaurants mit Tischservice"].map(p => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
                  <span className="text-sm text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Self-Ordering & Hardware */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-cyan-brand/20 bg-gradient-navy p-7 flex flex-col text-primary-foreground">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
              <ShoppingBag className="w-3.5 h-3.5" /> Add-on
            </div>
            <div className="mb-4 -mx-2">
              <img src={selforderTerminals} alt="Self-Ordering Terminals" className="w-full max-h-40 object-contain" />
            </div>
            <h4 className="text-lg font-bold mb-1">Self-Ordering & Hardware</h4>
            <p className="text-xs text-primary-foreground/50 mb-5">Hardware auf Anfrage</p>
            <ul className="space-y-2 flex-1">
              {["Pick-Up Screen & Küchenmonitor","Self-Checkout Terminals","Counter, Freestanding, Outdoor-Varianten","Software-Funktionalität bereits inklusive"].map(p => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
                  <span className="text-sm text-primary-foreground/70">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs mt-8">
          Alle Preise zzgl. MwSt. Hardware und Sonderanforderungen nach Bedarf.
        </motion.p>
      </div>
    </section>
  );
};

export default POSSection;

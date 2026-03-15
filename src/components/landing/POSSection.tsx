import { motion } from "framer-motion";
import { ArrowRight, Check, Monitor, Truck, QrCode, ShoppingBag } from "lucide-react";
import kassenhardware from "@/assets/kassenhardware.png";
import selforderTerminals from "@/assets/selfordering-terminals.png";

const addons = [
  {
    icon: Truck,
    label: "Add-on",
    title: "Fahrer-App mit GPS",
    price: "+10 € / Monat pro Fahrer",
    points: [
      "GPS-Tracking für alle Fahrer",
      "Transparenz im Lieferbetrieb",
      "Sinnvoll für Betriebe mit eigenem Lieferdienst",
    ],
  },
  {
    icon: QrCode,
    label: "Add-on",
    title: "Bar-System / QR-Code Tischsystem",
    price: "+50 € / Monat für 5 Tische, +5 € je weiterem Tisch",
    points: [
      "QR-Code-Bestellung am Tisch",
      "Modernes Inhouse-Erlebnis",
      "Ideal für Restaurants mit Tischservice",
    ],
  },
  {
    icon: ShoppingBag,
    label: "Add-on",
    title: "Self-Ordering & Hardware",
    price: "Hardware auf Anfrage",
    points: [
      "Pick-Up Screen & Küchenmonitor",
      "Self-Checkout Terminals",
      "Counter, Freestanding, Outdoor-Varianten",
      "Software-Funktionalität bereits inklusive",
    ],
    premium: true,
    image: selforderTerminals,
  },
];

const POSSection = () => {
  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-surface-light" id="kasse">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">Eigenständig buchbar</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Die Gastro Master Cloud-Kasse
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            TSE-konforme Kassensoftware für Restaurants, Lieferdienste und Gastronomiebetriebe – auch ohne Webshop oder App buchbar.
          </p>
        </motion.div>

        {/* Main POS product */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-navy rounded-3xl border border-cyan-brand/20 overflow-hidden mb-10"
        >
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-block bg-cyan-brand/10 text-cyan-brand text-xs font-bold px-3 py-1 rounded-full mb-4">
                Cloud-Kassensoftware
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">
                ab 69 € / Monat
              </h3>
              <p className="text-primary-foreground/40 text-xs mb-6">zzgl. MwSt.</p>

              <ul className="space-y-3 mb-8">
                {[
                  "TSE-konforme Cloud-Kassensoftware",
                  "Monatlich kündbar",
                  "Läuft auf Windows-Computern",
                  "Cloud-Backoffice & Auswertungen",
                  "Service am Tisch, Lieferung & Abholung",
                  "Persönlicher Support per WhatsApp",
                  "Modular erweiterbar durch Add-ons",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-brand shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToForm}
                className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2"
              >
                Kassensystem beraten lassen
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center p-8 md:p-12">
              <img
                src={kassenhardware}
                alt="Gastro Master Cloud-Kasse – POS Hardware"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Add-ons */}
        <div className="grid md:grid-cols-3 gap-5">
          {addons.map((addon, i) => (
            <motion.div
              key={addon.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-7 flex flex-col ${
                addon.premium
                  ? "bg-gradient-navy border-cyan-brand/20 text-primary-foreground"
                  : "bg-background border-border"
              }`}
            >
              <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand`}>
                <addon.icon className="w-3.5 h-3.5" />
                {addon.label}
              </div>

              {addon.image && (
                <div className="mb-4 -mx-2">
                  <img src={addon.image} alt={addon.title} className="w-full max-h-48 object-contain" />
                </div>
              )}

              <h4 className={`text-lg font-bold mb-1 ${addon.premium ? "text-primary-foreground" : "text-foreground"}`}>
                {addon.title}
              </h4>
              <p className={`text-xs mb-5 ${addon.premium ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                {addon.price} {!addon.premium && "zzgl. MwSt."}
              </p>

              <ul className="space-y-2 flex-1">
                {addon.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
                    <span className={`text-sm ${addon.premium ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs mt-8"
        >
          Alle Preise zzgl. MwSt. Hardware und Sonderanforderungen nach Bedarf.
        </motion.p>
      </div>
    </section>
  );
};

export default POSSection;

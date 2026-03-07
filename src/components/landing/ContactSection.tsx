import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, ShieldCheck } from "lucide-react";

const productOptions = ["Webshop", "App", "Kassensystem", "Website", "Transaktionsumlage"];

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "", restaurant: "", plz: "", phone: "", message: "", products: [] as string[],
  });

  const toggleProduct = (p: string) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter(x => x !== p)
        : [...prev.products, p],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ready for backend integration
    console.log("Form submitted:", form);
    alert("Vielen Dank! Wir melden uns bei dir.");
  };

  return (
    <section className="section-padding bg-gradient-navy relative overflow-hidden" id="kontakt">
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 30% 30%, hsl(34, 100%, 47%), transparent 50%)"
      }} />
      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-6">
              Bereit für mehr Gewinn?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-md leading-relaxed">
              Lass uns in einem kostenlosen Erstgespräch zeigen, wie du mit Gastro Master mehr Direktbestellungen und mehr Gewinn erzielst.
            </p>
            <div className="space-y-4 text-primary-foreground/60 text-sm">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber" fill="currentColor" />
                <span>5,0 Sterne bei Google – 130 Bewertungen</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-cyan-brand" />
                <span>700+ zufriedene Kunden</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-brand" />
                <span>0 % Provision auf eigene Bestellungen</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-3xl p-8 md:p-10"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-primary-foreground/70 text-sm font-medium mb-1.5">Dein Name *</label>
                <input
                  required type="text" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-cyan-brand/50"
                  placeholder="Max Mustermann"
                />
              </div>
              <div>
                <label className="block text-primary-foreground/70 text-sm font-medium mb-1.5">Name deiner Gastronomie *</label>
                <input
                  required type="text" value={form.restaurant}
                  onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-cyan-brand/50"
                  placeholder="Pizzeria Bella"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary-foreground/70 text-sm font-medium mb-1.5">Postleitzahl</label>
                  <input
                    type="text" value={form.plz}
                    onChange={e => setForm(f => ({ ...f, plz: e.target.value }))}
                    className="w-full bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-cyan-brand/50"
                    placeholder="40210"
                  />
                </div>
                <div>
                  <label className="block text-primary-foreground/70 text-sm font-medium mb-1.5">Telefonnummer *</label>
                  <input
                    required type="tel" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-cyan-brand/50"
                    placeholder="0151 12345678"
                  />
                </div>
              </div>
              <div>
                <label className="block text-primary-foreground/70 text-sm font-medium mb-1.5">Deine Nachricht an uns</label>
                <textarea
                  value={form.message} rows={3}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-cyan-brand/50 resize-none"
                  placeholder="Ich möchte gerne..."
                />
              </div>
              <div>
                <label className="block text-primary-foreground/70 text-sm font-medium mb-3">Ich interessiere mich für:</label>
                <div className="flex flex-wrap gap-2">
                  {productOptions.map(p => (
                    <button
                      key={p} type="button"
                      onClick={() => toggleProduct(p)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        form.products.includes(p)
                          ? 'bg-cyan-brand text-primary-foreground border-cyan-brand'
                          : 'bg-primary-foreground/5 text-primary-foreground/60 border-primary-foreground/10 hover:border-primary-foreground/30'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit"
              className="w-full mt-8 bg-gradient-amber text-primary font-bold px-8 py-4 rounded-xl text-lg hover:scale-[1.01] transition-transform shadow-lg flex items-center justify-center gap-2">
              Kostenlose Beratung anfragen
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import { motion } from "framer-motion";
import { ArrowRight, Check, Truck, QrCode, ShoppingBag } from "lucide-react";
import kassenhardware from "@/assets/hardware/kassenhardware.png";
import selforderTerminals from "@/assets/addons/selfordering-terminals.png";
import frankfurtGps from "@/assets/addons/addon-frankfurt-gps.png";
import qrTischsystem from "@/assets/addons/addon-qr-tischsystem.png";
import { useTranslation } from "react-i18next";

const POSSection = () => {
  const { t } = useTranslation("common");
  const scrollToForm = () => {
    window.location.href = "/kontakt";
  };

  return (
    <section className="section-padding bg-surface-light" id="kasse">
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">{t("pos.badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">{t("pos.headline")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("pos.sub")}
          </p>
        </motion.div>

        {/* Main POS product */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-navy rounded-3xl border border-cyan-brand/20 overflow-hidden mb-10">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-block bg-cyan-brand/10 text-cyan-brand text-xs font-bold px-3 py-1 rounded-full mb-4">{t("pos.posTag")}</div>
              <h3 className="text-2xl md:text-3xl font-black text-primary-foreground mb-2">{t("pos.posPrice")}</h3>
              <p className="text-primary-foreground/40 text-xs mb-6">{t("pos.posVat")}</p>
              <ul className="space-y-3 mb-8">
                {(t("pos.posFeatures", { returnObjects: true }) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-brand shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={scrollToForm}
                className="bg-gradient-amber text-primary font-bold px-7 py-3.5 rounded-xl text-sm hover:scale-[1.02] transition-transform shadow-lg inline-flex items-center gap-2">
                {t("pos.posCta")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center p-8 md:p-12">
              <img src={kassenhardware} alt="Gastro Master Cloud-Kasse – POS Hardware" className="w-full max-w-md object-contain" />
            </div>
          </div>
        </motion.div>

        {/* Add-ons */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Addon 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
            className="rounded-2xl border border-border bg-background p-7 flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
              <Truck className="w-3.5 h-3.5" /> Add-on
            </div>
            <div className="mb-4 rounded-xl overflow-hidden aspect-[4/3] bg-white flex items-center justify-center">
              <img src={frankfurtGps} alt={t("pos.addon1Title")} className="w-full h-full object-contain scale-110" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">{t("pos.addon1Title")}</h4>
            <p className="text-xs text-muted-foreground mb-5">{t("pos.addon1Price")}</p>
            <ul className="space-y-2 flex-1">
              {(t("pos.addon1Features", { returnObjects: true }) as string[]).map(p => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
                  <span className="text-sm text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Addon 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-background p-7 flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
              <QrCode className="w-3.5 h-3.5" /> Add-on
            </div>
            <div className="mb-4 rounded-xl overflow-hidden aspect-[4/3]">
              <img src={qrTischsystem} alt={t("pos.addon2Title")} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">{t("pos.addon2Title")}</h4>
            <p className="text-xs text-muted-foreground mb-5">{t("pos.addon2Price")}</p>
            <ul className="space-y-2 flex-1">
              {(t("pos.addon2Features", { returnObjects: true }) as string[]).map(p => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-brand" />
                  <span className="text-sm text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Addon 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-cyan-brand/20 bg-gradient-navy p-7 flex flex-col text-primary-foreground">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-4 text-cyan-brand">
              <ShoppingBag className="w-3.5 h-3.5" /> Add-on
            </div>
            <div className="mb-4 rounded-xl overflow-hidden aspect-[4/3] bg-surface-navy/60 flex items-center justify-center">
              <img src={selforderTerminals} alt={t("pos.addon3Title")} className="w-full h-full object-contain p-4" />
            </div>
            <h4 className="text-lg font-bold mb-1">{t("pos.addon3Title")}</h4>
            <p className="text-xs text-primary-foreground/50 mb-5">{t("pos.addon3Price")}</p>
            <ul className="space-y-2 flex-1">
              {(t("pos.addon3Features", { returnObjects: true }) as string[]).map(p => (
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
          {t("pos.note")}
        </motion.p>
      </div>
    </section>
  );
};

export default POSSection;

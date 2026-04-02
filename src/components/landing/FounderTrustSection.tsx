import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Globe } from "lucide-react";
import ceoPortrait from "@/assets/team/ceo-rene-ebert.png";
import sanjayaPortrait from "@/assets/team/team-sanjaya-pattiyage.png";
import salvatorePortrait from "@/assets/team/team-salvatore-anzaldi.png";
import andrejPortrait from "@/assets/team/team-andrej-krutsch.png";
import mohammadPortrait from "@/assets/team/team-mohammad-motakalemi.png";
import { useTranslation } from "react-i18next";

const founderImgs = [ceoPortrait, sanjayaPortrait];
const teamImgs = [salvatorePortrait, andrejPortrait, mohammadPortrait];
const founderKeys = ["rene", "sanjaya"] as const;
const teamKeys = ["salvatore", "andrej", "mohammad"] as const;

const languageMeta = [
  { flag: "🇩🇪", color: "hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-900 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-300" },
  { flag: "🇬🇧", color: "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300" },
  { flag: "🇮🇹", color: "hover:border-green-500 hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-500/10 dark:hover:text-green-300" },
  { flag: "🇮🇷", color: "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300" },
  { flag: "🇷🇺", color: "hover:border-red-500 hover:bg-red-50 hover:text-red-900 dark:hover:bg-red-500/10 dark:hover:text-red-300" },
  { flag: "🇱🇰", color: "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-500/10 dark:hover:text-amber-300" },
];

type PersonKey = "rene" | "sanjaya" | "salvatore" | "andrej" | "mohammad";

const linkedinUrls: Partial<Record<PersonKey, string>> = {
  rene: "https://www.linkedin.com/in/rene-ebert/",
  sanjaya: "https://www.linkedin.com/in/sanjaya-pattiyage/",
  salvatore: "https://www.linkedin.com/in/salvatore-a-a42711208/",
};

const FlipCard = ({ personKey, img, index }: { personKey: PersonKey; img: string; index: number }) => {
  const { t } = useTranslation("common");
  const [flipped, setFlipped] = useState(false);
  const person = t(`founder.people.${personKey}`, { returnObjects: true }) as any;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="perspective-[1200px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full transition-transform duration-700 preserve-3d min-h-[500px] sm:min-h-[380px]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-full rounded-3xl overflow-hidden border-2 border-border bg-background shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="relative w-full aspect-square sm:aspect-auto sm:h-64 overflow-hidden p-4 sm:p-0">
              <img
                src={img}
                alt={`${personKey} – ${person.role}`}
                className="w-full h-full object-cover object-center rounded-2xl sm:rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background from-0% via-transparent via-20% to-transparent sm:via-40%" />
            </div>
            <div className="px-5 pt-4 pb-5 sm:p-5 text-center">
              <h3 className="text-xl sm:text-lg font-bold text-foreground capitalize">
                {personKey === "rene" ? "René Ebert"
                  : personKey === "sanjaya" ? "Sanjaya Pattiyage"
                  : personKey === "salvatore" ? "Salvatore Anzaldi"
                  : personKey === "andrej" ? "Andrej Krutsch"
                  : "Mohammad Motakalemi"}
              </h3>
              <p className="text-cyan-brand text-base sm:text-sm font-semibold">{person.role}</p>
              <p className="text-muted-foreground text-base sm:text-sm">{person.focus}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="h-full rounded-3xl border-2 border-cyan-brand/20 bg-gradient-navy p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-primary-foreground mb-1">
                {personKey === "rene" ? "René Ebert"
                  : personKey === "sanjaya" ? "Sanjaya Pattiyage"
                  : personKey === "salvatore" ? "Salvatore Anzaldi"
                  : personKey === "andrej" ? "Andrej Krutsch"
                  : "Mohammad Motakalemi"}
              </h3>
              <p className="text-cyan-brand text-sm font-semibold mb-4">{person.role}</p>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{person.bio}</p>
            </div>
            {linkedinUrls[personKey] && (
              <a
                href={linkedinUrls[personKey]}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0A66C2] hover:text-primary-foreground text-sm font-medium transition-colors mt-4"
              >
                <Linkedin className="w-5 h-5" />
                {t("founder.linkedin")}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FounderTrustSection = () => {
  const { t } = useTranslation("common");
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const languageLabels = arr("founder.languages") as string[];
  const languages = languageMeta.map((m, i) => ({ ...m, label: languageLabels[i] ?? "" }));
  return (
    <section className="section-padding bg-surface-light">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t("founder.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            {t("founder.headline1")}<br />{t("founder.headline2")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("founder.sub")}
          </p>
        </motion.div>

        {/* Founders – 2-col row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-sm sm:max-w-2xl mx-auto mb-6">
          {founderKeys.map((key, i) => (
            <FlipCard key={key} personKey={key} img={founderImgs[i]} index={i} />
          ))}
        </div>

        {/* Team – 3-col row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto">
          {teamKeys.map((key, i) => (
            <FlipCard key={key} personKey={key} img={teamImgs[i]} index={i + founderKeys.length} />
          ))}
        </div>

        {/* Language section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 rounded-3xl border border-border bg-background shadow-lg px-8 py-10 max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <Globe className="w-6 h-6 text-cyan-brand" />
            <h3 className="text-2xl md:text-3xl font-black text-foreground">
              {t("founder.langTitle")}
            </h3>
          </div>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
            {t("founder.langSub")}
          </p>

          <div className="flex flex-wrap justify-center gap-3 py-3">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.08, y: -3 }}
                className={`
                  flex-shrink-0 flex items-center gap-2 px-4 py-2.5
                  rounded-full border-2 border-border bg-surface-light
                  text-foreground font-semibold text-sm
                  cursor-default select-none whitespace-nowrap
                  transition-all duration-300 shadow-sm hover:shadow-md
                  ${lang.color}
                `}
              >
                <span className="text-2xl leading-none">{lang.flag}</span>
                {lang.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderTrustSection;

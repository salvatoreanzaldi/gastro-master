import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Clock, Lightbulb, Lock, Phone } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useTranslation } from "react-i18next";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import rene     from "@/assets/kontakt/Rene Ebert - Kontakt.png";
import salva    from "@/assets/kontakt/Salvatore Anzaldi - Kontakt.png";
import andrej   from "@/assets/kontakt/Andrej Krutsch - Kontakt.png";
import mohammad from "@/assets/kontakt/Mohammad Motakalemi - Kontakt.png";
import yawar    from "@/assets/kontakt/Yawar Sultan - Kontakt.png";
import { FLAG_ICONS_ORDERED } from "@/config/flag-icons";
import ConfettiBurst from "@/components/ui/confetti-burst";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

// 3 zusaetzliche Sprach-Pillen NUR fuer diese Seite (9 statt 6) — bewusst
// lokal statt in flag-icons.ts ergaenzt, da jene Liste auch von den CTA-
// Sektionen (FounderTrustSection etc.) geteilt wird und dort unveraendert
// bleiben soll.
import IndischIcon from "@/assets/icons/Indisch.svg";
import PakistanischIcon from "@/assets/icons/Pakistanisch.svg";
import PunjabiIcon from "@/assets/icons/Punjabi.svg";

// Kundenlogos fuer den Logo-Carousel im linken Desktop-Block — gleiche
// Quelle wie TrustedBrandsSection, damit Optik/Verhalten konsistent bleiben.
import logoArtemis from "@/assets/logos/kunden/logo-artemis.png";
import logoBurgerBrothers from "@/assets/logos/kunden/logo-burger-brothers.png";
import logoEtManus from "@/assets/logos/kunden/logo-et-manus.png";
import logoIlSorriso from "@/assets/logos/kunden/logo-il-sorriso.png";
import logoKojoSushi from "@/assets/logos/kunden/logo-kojo-sushi.png";
import logoTake from "@/assets/logos/kunden/logo-take.png";
import logoJoesBurger from "@/assets/logos/kunden/Logo - Joe's Burger 2.png";
import logoRoyalIndianPalace from "@/assets/logos/kunden/Logo _ Royal India.png";
import logoPomPom from "@/assets/logos/kunden/Logo - Pom Pom.png";
import logoTajMahalMasala from "@/assets/logos/kunden/Logo - Taj Mahal Masala.png";

const customerLogos = [
  { id: "artemis", src: logoArtemis, alt: "Artemis" },
  { id: "burger-brothers", src: logoBurgerBrothers, alt: "Burger Brothers" },
  { id: "et-manus", src: logoEtManus, alt: "Et Manus" },
  { id: "il-sorriso", src: logoIlSorriso, alt: "Il Sorriso" },
  { id: "kojo-sushi", src: logoKojoSushi, alt: "Kojo Sushi" },
  { id: "take", src: logoTake, alt: "Take" },
  { id: "joes-burger", src: logoJoesBurger, alt: "Joe's Burger" },
  { id: "royal-indian-palace", src: logoRoyalIndianPalace, alt: "Royal Indian Palace" },
  { id: "pom-pom", src: logoPomPom, alt: "Pom Pom" },
  { id: "taj-mahal-masala", src: logoTajMahalMasala, alt: "Taj Mahal Masala" },
];

const teamImages = [rene, salva, andrej, mohammad, yawar];
const teamNames = ["René Ebert", "Salvatore Anzaldi", "Andrej Krutsch", "Mohammad Motakalemi", "Yawar Sultan"];
// Sprach-Pillen der Kontaktseite: die geteilten 6 Flaggen aus flag-icons.ts
// plus 3 seiten-eigene (Indisch/Pakistanisch/Punjabi) — ergibt das 3x3-Grid.
const languageFlags = [...FLAG_ICONS_ORDERED, IndischIcon, PakistanischIcon, PunjabiIcon];
const promiseIcons = [Clock, Lightbulb, Lock];

// Floating-Label: Wenn das Feld leer & unfokussiert ist, sitzt das Label mittig
// im Feld (wie ein Placeholder). Bei Fokus ODER Inhalt schwebt es nach oben und
// wird klein. Voraussetzung: das <input>/<textarea> traegt placeholder=" " (ein
// Leerzeichen), damit :placeholder-shown korrekt umschaltet, und pt-5/pt-6, damit
// der schwebende Label-Text nicht ueber dem Eingabetext liegt.
const INPUT_CLS =
  "peer w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 pt-5 pb-2 text-[#0A264A] focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition";
const FLOAT_LABEL_CLS =
  "pointer-events-none absolute left-4 top-2 text-xs font-medium text-[#0A264A]/60 transition-all " +
  "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 " +
  "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#007DCF]";

const Kontakt = () => {
  const { t } = useTranslation("common");
  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };

  useSeoMeta({
    title: t("contact.seoTitle"),
    description: t("contact.seoDesc"),
    canonical: "https://gastro-master.de/kontakt",
  });
  const [form, setForm] = useState({
    name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
    products: [] as string[],
    datenschutz: false,
    recaptcha: false,
    website: "", // honeypot — must stay empty
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // ── 3-Schritt-Modus (identisch auf Mobile UND Desktop) ─────────────────────
  // Phase-1-Umbau: der mehrschrittige Ablauf ist jetzt auf ALLEN Breakpoints
  // aktiv (vorher nur unter md). Schritt 1 = Name/E-Mail, Schritt 2 = Betrieb/
  // PLZ/Telefon/Interesse, Schritt 3 = Nachricht/Zustimmung. Die Feld-Reihen-
  // folge im DOM bleibt unveraendert — sie ergibt gruppiert die Schrittfolge.
  const [step, setStep] = useState(1);

  /** Sichtbar nur auf dem aktuellen Schritt — auf allen Breakpoints gleich. */
  const visible = (n: number) => step === n;

  /**
   * Props zum Ausblenden einer Feldgruppe.
   *
   * Das hidden-ATTRIBUT allein reicht nicht: Tailwind setzt `[hidden]{display:none}`
   * in der Preflight, die Utilities `.grid` und `.flex` haben dieselbe Spezifitaet
   * und stehen spaeter im Stylesheet — die PLZ/Telefon-Zeile (grid) und die beiden
   * Checkbox-Labels (flex) blieben dadurch sichtbar. Die Inline-Regel kann keine
   * Klasse ueberstimmen; das Attribut bleibt zusaetzlich stehen, weil es die
   * Gruppe auch fuer Screenreader und die Tab-Reihenfolge sauber herausnimmt.
   */
  const stepProps = (n: number) =>
    visible(n) ? {} : { hidden: true, style: { display: "none" } as const };

  /**
   * required NUR fuer das, was gerade sichtbar ist. Ein `required` auf einem
   * ausgeblendeten Feld blockiert das native Absenden mit „not focusable" —
   * deshalb haengt es am Schritt statt fest im Markup.
   */
  const req = (n: number) => step === n;

  const stepValid = (n: number) => {
    if (n === 1) return form.name.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (n === 2) return form.restaurant.trim() !== "" && form.phone.trim() !== "";
    return true;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(i => (i + 1) % teamNames.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleProduct = (p: string) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter(x => x !== p)
        : [...prev.products, p],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Die Nachricht bleibt fuer den Nutzer optional — kein Stern, keine
      // Validierung, kein blockierter Button. validate.php verlangt sie aber
      // seit jeher als nicht-leer (name, phone, email UND message), weshalb ein
      // leeres Feld bisher in einem 400er endete. Statt das Backend anzufassen
      // setzt das Frontend hier einen sprachabhaengigen Platzhalter ein. Nur
      // fuer den Request — `form` bleibt unberuehrt, im Feld erscheint nichts.
      const payload = {
        ...form,
        message:
          form.message.trim() === ""
            ? t("contact.messageFallback", { defaultValue: "Kein zusätzlicher Kommentar." })
            : form.message,
      };

      const response = await fetch("https://sandbox.gastro-master.de/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send email");

      setForm({
        name: "", restaurant: "", plz: "", phone: "", email: "", message: "",
        products: [],
        datenschutz: false,
        recaptcha: false,
        website: "",
      });
      setStep(1);
      setShowConfetti(true);
      setSubmitMessage("success");
      // GA4/GTM Key-Event: erfolgreiches Absenden des Kontaktformulars. Nur hier
      // im Success-Zweig (nach response.ok) — kein Feuern bei Fehlern. GA4-
      // Zuordnung als GTM-Tag. (Phase 2: hier später /danke-Redirect statt Inline.)
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "kontaktformular_absenden" });
      // Die Erfolgsmeldung bleibt bewusst stehen, bis der Nutzer die Seite
      // verlaesst oder neu laedt — frueher blendete ein 5-Sekunden-Timeout sie
      // aus und liess ein leeres Formular ohne jede Rueckmeldung zurueck.
      // Die Fehlermeldung darunter behaelt ihr Timeout: sie soll verschwinden,
      // damit ein neuer Versuch nicht dauerhaft von einer alten Warnung
      // begleitet wird.
    } catch (error) {
      console.error("Form error:", error);
      setSubmitMessage("error");
      setTimeout(() => setSubmitMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sprach-Pillen — auf Desktop im weissen Block links (helles Design), auf
  // Mobile in der navy Sidebar (dunkles Design). Eine Quelle, zwei Stylings.
  // Beide Varianten sind ein festspaltiges Grid statt Flex-Wrap (verhindert
  // ungleiche Zeilenbreiten). Navy startet bei 2 Spalten (schmale Displays
  // wie 360px reichen sonst nicht fuer laengere Labels wie "Singhalesisch")
  // und wechselt ab 380px auf 3 Spalten (z. B. 390px) — bei 9 Eintraegen geht
  // 9/3 glatt auf, 9/2 nicht. Deshalb bekommt im 2-Spalten-Fall NUR die letzte
  // Pille col-span-2 (zentriert, volle Breite) statt einzeln verwaist in der
  // letzten Zeile zu haengen; ab 380px faellt das auf col-span-1 zurueck.
  const languageLabels = arr("contact.languageLabels") as string[];
  const languagePills = (variant: "light" | "navy") => (
    <div
      className={
        variant === "light"
          ? "grid grid-cols-3 gap-2.5"
          : "grid grid-cols-2 min-[380px]:grid-cols-3 gap-2.5"
      }
    >
      {languageLabels.map((label: string, i: number) => {
        const isLastOrphan = variant === "navy" && i === languageLabels.length - 1;
        return (
          <span
            key={label}
            className={
              (variant === "light"
                ? "flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-[#0A264A]/70 text-sm font-medium"
                : "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/65 text-sm font-medium") +
              (isLastOrphan ? " col-span-2 min-[380px]:col-span-1" : "")
            }
          >
            <img src={languageFlags[i]} alt="" className="w-4 h-4 rounded-full object-cover" loading="lazy" />
            {label}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="pt-28 md:pt-32 pb-12 px-5 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">

            {/* ── Left column: Form + (Desktop) language block ── */}
            <div className="flex flex-col gap-6 h-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-black/[0.06] p-6 md:p-8"
              >
                <h1 className="text-2xl md:text-3xl font-black text-[#0A264A] mb-2">
                  {t("contact.heroTitle")}
                </h1>
                <p className="text-[#0A264A]/55 text-sm leading-relaxed mb-4">
                  {t("contact.heroSub")}
                </p>
                <form onSubmit={handleSubmit}>
                  {/* Honeypot — hidden from real users, bots fill it. Must stay empty. */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  />
                  <div className="space-y-2.5">
                    {/* Name */}
                    <div className="relative" {...stepProps(1)}>
                      <input id="contact-name"
                        required={req(1)} autoComplete="name" type="text" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder=" " className={INPUT_CLS}
                      />
                      <label htmlFor="contact-name" className={FLOAT_LABEL_CLS}>{t("contact.labelName")}</label>
                    </div>

                    {/* E-Mail */}
                    <div className="relative" {...stepProps(1)}>
                      <input id="contact-email"
                        required={req(1)} autoComplete="email" inputMode="email" type="email" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder=" " className={INPUT_CLS}
                      />
                      <label htmlFor="contact-email" className={FLOAT_LABEL_CLS}>E-Mail *</label>
                    </div>

                    {/* Restaurant */}
                    <div className="relative" {...stepProps(2)}>
                      <input id="contact-business"
                        required={req(2)} autoComplete="organization" type="text" value={form.restaurant}
                        onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
                        placeholder=" " className={INPUT_CLS}
                      />
                      <label htmlFor="contact-business" className={FLOAT_LABEL_CLS}>{t("contact.labelBusiness")}</label>
                    </div>

                    {/* PLZ + Phone */}
                    <div className="grid grid-cols-2 gap-4" {...stepProps(2)}>
                      <div className="relative">
                        <input id="contact-zip"
                          type="text" autoComplete="postal-code" inputMode="numeric" value={form.plz}
                          onChange={e => setForm(f => ({ ...f, plz: e.target.value }))}
                          placeholder=" " className={INPUT_CLS}
                        />
                        <label htmlFor="contact-zip" className={FLOAT_LABEL_CLS}>{t("contact.labelZip")}</label>
                      </div>
                      <div className="relative">
                        <input id="contact-phone"
                          required={req(2)} autoComplete="tel" inputMode="tel" type="tel" value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder=" " className={INPUT_CLS}
                        />
                        <label htmlFor="contact-phone" className={FLOAT_LABEL_CLS}>{t("contact.labelPhone")}</label>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative" {...stepProps(3)}>
                      <textarea id="contact-message"
                        value={form.message} rows={3} maxLength={5000}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder=" "
                        className="peer w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 pt-6 pb-2 text-[#0A264A] focus:outline-none focus:ring-2 focus:ring-[#007DCF]/40 transition resize-none"
                      />
                      <label htmlFor="contact-message"
                        className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-[#0A264A]/60 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#007DCF]">
                        {t("contact.labelMessage")}
                      </label>
                    </div>

                    {/* Product interest */}
                    <div {...stepProps(2)}>
                      <label className="block text-[#0A264A]/70 dark:text-white/60 text-sm font-medium mb-3">{t("contact.labelInterest")}</label>
                      <div className="flex flex-wrap gap-2">
                        {arr("contact.interests").map((p: string) => (
                          <button
                            key={p} type="button"
                            onClick={() => toggleProduct(p)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                              form.products.includes(p)
                                ? "bg-[#007DCF] text-white border-[#007DCF]"
                                : "bg-gray-50 text-[#0A264A]/60 border-gray-200 hover:border-[#007DCF]/40"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Datenschutz checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer group" {...stepProps(3)}>
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox" required={req(3)}
                          checked={form.datenschutz}
                          onChange={e => setForm(f => ({ ...f, datenschutz: e.target.checked }))}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          form.datenschutz
                            ? "bg-[#007DCF] border-[#007DCF]"
                            : "border-gray-300 bg-gray-50 group-hover:border-[#007DCF]/60"
                        }`}>
                          {form.datenschutz && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-[#0A264A]/55 text-sm leading-snug">
                        {t("contact.privacyPrefix")}{" "}
                        <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-[#007DCF] underline underline-offset-2 hover:opacity-80">
                          {t("contact.privacyLink")}
                        </a>{" "}
                        {t("contact.privacySuffix")}
                      </span>
                    </label>

                    {/* reCAPTCHA checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer group" {...stepProps(3)}>
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox" required={req(3)}
                          checked={form.recaptcha}
                          onChange={e => setForm(f => ({ ...f, recaptcha: e.target.checked }))}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          form.recaptcha
                            ? "bg-[#007DCF] border-[#007DCF]"
                            : "border-gray-300 bg-gray-50 group-hover:border-[#007DCF]/60"
                        }`}>
                          {form.recaptcha && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-[#0A264A]/55 text-sm leading-snug">
                        {t("contact.recaptchaLabel")}
                      </span>
                    </label>
                  </div>

                  {/* Navigation — bewusst OHNE Fortschrittsanzeige. Zurueck/Weiter/
                      Absenden identisch auf Mobile und Desktop. */}
                  <div className="flex gap-3 mt-4">
                    {step > 1 && (
                      <button type="button" onClick={() => setStep(s => s - 1)}
                        className="px-6 py-3.5 rounded-2xl text-base font-bold text-[#0A264A]/70 bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0">
                        {t("contact.back", { defaultValue: "Zurück" })}
                      </button>
                    )}
                    {step < 3 ? (
                      <button type="button"
                        onClick={() => stepValid(step) && setStep(s => s + 1)}
                        disabled={!stepValid(step)}
                        className="flex-1 bg-gradient-amber text-white font-bold px-8 py-3.5 rounded-2xl text-base hover:scale-[1.01] transition-transform shadow-lg shadow-[#ED8400]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                        {t("contact.next", { defaultValue: "Weiter" })}
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting}
                        className="flex-1 bg-gradient-amber text-white font-bold px-8 py-3.5 rounded-2xl text-base hover:scale-[1.01] transition-transform shadow-lg shadow-[#ED8400]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                        {isSubmitting ? t("contact.submitting") : t("contact.submitBtn")}
                      </button>
                    )}
                  </div>
                  {submitMessage === "success" && (
                    <p className="text-green-600 text-sm text-center mt-3 font-medium">✓ {t("contact.success")}</p>
                  )}
                  {submitMessage === "error" && (
                    <p className="text-red-600 text-sm text-center mt-3 font-medium">✗ {t("contact.error")}</p>
                  )}
                  <p className="text-gray-400 text-xs text-center mt-3">{t("contact.required")}</p>
                </form>
              </motion.div>

              {/* Sprach-Block — NUR Desktop, unter dem Formular (weisses Card). */}
              <div className="hidden lg:flex flex-col flex-1 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-black/[0.06] p-6 md:p-8">
                <p className="text-[#0A264A]/40 text-xs font-bold uppercase tracking-widest mb-4">
                  {t("contact.languageTitle")}
                </p>
                {languagePills("light")}

                {/* Logo-Carousel — NUR Desktop, gleiche Optik/Geschwindigkeit
                    wie TrustedBrandsSection (endlos, Fade-Maske links/rechts). */}
                <div className="mt-6 pt-6 border-t border-gray-100 relative">
                  <div
                    className="relative h-20 w-full flex items-center overflow-hidden"
                    style={{
                      maskImage: `linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(0, 0, 0, 1) 15%,
                        rgba(0, 0, 0, 1) 85%,
                        rgba(0, 0, 0, 0) 100%
                      )`,
                      WebkitMaskImage: `linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(0, 0, 0, 1) 15%,
                        rgba(0, 0, 0, 1) 85%,
                        rgba(0, 0, 0, 0) 100%
                      )`,
                    }}
                  >
                    <InfiniteSlider className="flex h-full w-full items-center" duration={40} gap={48}>
                      {customerLogos.map(({ id, src, alt }) => (
                        <div key={id} className="flex-shrink-0 h-14 flex items-center justify-center">
                          <img
                            src={src}
                            alt={alt}
                            loading="lazy"
                            className="max-h-full max-w-[150px] object-contain hover:opacity-90 transition-opacity duration-300"
                          />
                        </div>
                      ))}
                    </InfiniteSlider>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right card: Blue (navy) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-[#0A264A] rounded-3xl shadow-xl shadow-[#0A264A]/30 flex flex-col overflow-hidden h-full"
            >
              {/* Slideshow — edge-to-edge, no border, card clips corners.
                  Bewusst durchgaengig aspect-square: alle Team-Fotos sind
                  1080x1080 (1:1), object-cover auf einem 1:1-Container croppt
                  dadurch nichts weg. Ein vorheriger lg:aspect-[4/3]-Versuch
                  (fuer Spaltensymmetrie) schnitt bei jedem Team-Mitglied den
                  unteren Bildbereich ab — dafuer jetzt stattdessen kompakteres
                  Padding/Gaps im Content-Bereich darunter. */}
              <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide}
                    src={teamImages[activeSlide]}
                    alt={teamNames[activeSlide]}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-[1.05]"
                  />
                </AnimatePresence>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pt-16 pb-5 px-6 lg:pt-12 lg:pb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-white font-bold text-lg leading-tight">{teamNames[activeSlide]}</p>
                      <p className="text-white/55 text-sm mt-0.5">{arr("contact.teamRoles")[activeSlide]}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Rest of content with padding — auf Desktop kompakter (lg:),
                  damit die rechte Spalte moeglichst gleich hoch wie die
                  linke endet. Mobile (p-6/gap-6) bleibt unveraendert. */}
              <div className="flex flex-col gap-6 lg:gap-4 p-6 md:p-8 lg:p-6 flex-1">

                {/* Language pills — NUR Mobile (auf Desktop links unter dem Formular) */}
                <div className="lg:hidden">
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-3">
                    {t("contact.languageTitle")}
                  </p>
                  {languagePills("navy")}
                </div>

                {/* Unser Versprechen */}
                <div>
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-4 lg:mb-3">
                    {t("contact.promiseTitle")}
                  </p>
                  <div className="space-y-4 lg:space-y-3">
                    {arr("contact.promises").map((text: string, i: number) => {
                      const Icon = promiseIcons[i];
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#007DCF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-[#007DCF]" strokeWidth={1.75} />
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact button — Telefon als einziger Direktkanal neben dem
                    Formular. Der E-Mail-Button (info@) wurde bewusst entfernt:
                    verpasste Anrufe bleiben im Protokoll/als Voicemail sichtbar,
                    E-Mails an info@ kommen nicht zuverlässig an. */}
                <div className="flex flex-col gap-3 mt-auto pt-2">
                  <a
                    href="tel:+4960819128913"
                    className="flex items-center justify-center gap-2.5 bg-gradient-amber text-white font-bold px-6 py-4 lg:py-3.5 rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#ED8400]/25 text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    +49 (0) 6081 9128913
                  </a>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </main>
      {showConfetti && <ConfettiBurst onDone={() => setShowConfetti(false)} />}
      <Footer />
    </div>
  );
};

export default Kontakt;

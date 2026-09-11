import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, PhoneCall, MessageSquareText } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import ConfettiBurst from "@/components/ui/confetti-burst";

// Social Proof unterhalb der Bestaetigung — dieselbe Paarung wie auf der
// Startseite (Index.tsx): Google-Bewertungs-Karussell inkl. "Bewerte uns auf
// Google"-Button, direkt gefolgt von "800+ Gastronomiebetriebe vertrauen uns"
// samt Kunden-Logo-Carousel. Beide lazy, damit sie den Bestaetigungs-Teil
// (inkl. Konfetti) nicht ausbremsen.
const GoogleReviewsGrid = lazy(() => import("@/components/GoogleReviewsGrid"));
const TrustedBrandsSection = lazy(() => import("@/components/landing/TrustedBrandsSection"));

/**
 * Bestaetigungsseite nach erfolgreichem Kontaktformular-Absenden (Phase 2).
 *
 * Ersetzt die frueher inline in Kontakt.tsx gezeigte Erfolgsmeldung samt
 * Konfetti. Das Konfetti feuert jetzt hier beim Mount — die Kontaktseite
 * leitet nach dem dataLayer-Push hierher weiter.
 *
 * noindex, follow: die Seite ist nur nach einem Submit sinnvoll erreichbar
 * und hat keinen Suchwert, soll den Linkfluss zu Navbar/Footer aber nicht
 * blockieren. Gesetzt ueber die bestehende useSeoMeta-Prop (gleiches Muster
 * wie NotFound.tsx). Sie steht bewusst nicht in ROUTES — sonst wuerde der
 * Sitemap-Generator sie aufnehmen (s. DANKE_SEGMENT in config/routes.ts).
 */

const STEP_ICONS = [ClipboardCheck, PhoneCall, MessageSquareText];

const DankePage = () => {
  const { t } = useTranslation("common");
  const arr = (key: string) => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const [showConfetti, setShowConfetti] = useState(true);

  useSeoMeta({
    title: t("danke.seoTitle"),
    description: t("danke.seoDesc"),
    noindex: true,
  });

  const steps = arr("danke.steps") as { title: string; text: string }[];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />

      <main className="flex-1">
        {/* ── Bestaetigung (navy, wie die dunklen Sektionen der Seite) ────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="w-16 h-16 rounded-2xl bg-[#22C55E]/15 flex items-center justify-center mx-auto mb-7"
            >
              {/* Haken bewusst als SVG statt Icon-Font — identisch zu den
                  Checkboxen im Kontaktformular. */}
              <svg
                className="w-8 h-8 text-[#22C55E]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5"
            >
              {t("danke.headline")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-white/65 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            >
              {t("danke.subline")}
            </motion.p>
          </div>
        </section>

        {/* ── Was passiert jetzt? — Glasmorphism-Karten ───────────────────── */}
        <section className="bg-[#0A264A] px-5 md:px-8 lg:px-16 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-black text-white text-center mb-10 md:mb-12"
            >
              {t("danke.stepsHeadline")}
            </motion.h2>

            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? ClipboardCheck;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative flex flex-col rounded-2xl px-6 py-7 bg-white/[0.06] backdrop-blur-[14px] border border-white/10 hover:border-white/20 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#007DCF]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.9} />
                      </div>
                      <span className="text-white/30 text-sm font-black tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 leading-snug">{step.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed m-0">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Social Proof: Google-Bewertungen + Kunden-Logos ─────────────── */}
        <Suspense fallback={null}>
          <GoogleReviewsGrid />
          <TrustedBrandsSection />
        </Suspense>
      </main>

      <Footer />

      {showConfetti && <ConfettiBurst onDone={() => setShowConfetti(false)} />}
    </div>
  );
};

export default DankePage;

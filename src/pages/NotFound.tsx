import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { extractLangFromPath } from "@/components/LanguageLayout";
// Echtes freigestelltes Pizza-Foto (transparentes PNG) — ersetzt die mittlere
// "0" in "404". ViteImageOptimizer komprimiert es beim Build automatisch.
import pizza404 from "@/assets/food/404 Pizza.png";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation("common");
  // Sprache aus der URL (z. B. /en/tippfehler) — Fallback: aktive i18n-Sprache.
  const lang = extractLangFromPath(location.pathname) ?? ((i18n.language || "de").slice(0, 2));

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useSeoMeta({
    title: t("notFound.metaTitle"),
    description: t("notFound.text"),
  });

  return (
    <div className="min-h-screen flex flex-col mesh-gradient">
      <ScrollProgressBar />
      <ScrollToTopButton />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 pt-28 pb-16 md:pt-32">
        <div className="text-center">
          {/* 4 — Pizza — 4 */}
          <div
            className="flex items-center justify-center gap-3 md:gap-5 text-[150px] md:text-[240px] font-black leading-none text-primary-foreground select-none"
            aria-hidden="true"
          >
            <span>4</span>
            <span className="animate-float inline-flex group cursor-pointer">
              {/* Hover-Rotation auf dem Bild, Floating auf dem Wrapper — zwei
                  Ebenen, damit sich die beiden transforms nicht überschreiben. */}
              <img
                src={pizza404}
                alt="Pizza"
                className="h-[0.78em] w-[0.78em] object-contain drop-shadow-2xl transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
              />
            </span>
            <span>4</span>
          </div>

          <h1 className="mt-6 text-2xl md:text-4xl font-black text-primary-foreground">
            {t("notFound.headline")}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base md:text-lg text-primary-foreground/70 leading-relaxed">
            {t("notFound.text")}
          </p>

          <Link
            to={`/${lang}`}
            className="mt-8 inline-block bg-gradient-amber text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 hover:opacity-90 transition-opacity"
          >
            {t("notFound.cta")}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

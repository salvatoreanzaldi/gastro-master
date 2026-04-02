import { useEffect } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n";
import HreflangHead from "@/components/HreflangHead";

/**
 * Wrapper component that:
 * 1. Reads :lang from URL
 * 2. Syncs i18next language to URL
 * 3. Redirects invalid languages to /de/
 * 4. Renders child routes via <Outlet />
 */
const LanguageLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!lang || !SUPPORTED_LANGS.includes(lang as SupportedLang)) {
      // Invalid or missing lang — redirect to /de/ keeping the rest of the path
      const rest = location.pathname.replace(/^\/[^/]*/, "");
      navigate(`/de${rest}${location.search}${location.hash}`, { replace: true });
      return;
    }

    // Sync i18next to URL language
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, navigate, location]);

  return (
    <>
      <HreflangHead />
      <Outlet />
    </>
  );
};

export default LanguageLayout;

/**
 * Hook to build language-aware paths.
 * Usage: const lp = useLangPath(); <Link to={lp("/produkte/webshop")} />
 */
export const useLangPath = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "de";
  return (path: string) => `/${currentLang}${path}`;
};

/**
 * Hook to get current language from URL.
 */
export const useCurrentLang = () => {
  const { lang } = useParams<{ lang: string }>();
  return (lang as SupportedLang) || "de";
};

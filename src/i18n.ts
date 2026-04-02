import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Bundle common namespace directly (no async loading delay)
import commonDe from "../public/locales/de/common.json";
import commonEn from "../public/locales/en/common.json";
import commonIt from "../public/locales/it/common.json";
import commonFa from "../public/locales/fa/common.json";
import commonSi from "../public/locales/si/common.json";

export const SUPPORTED_LANGS = ["de", "en", "it", "fa", "si"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const RTL_LANGS: SupportedLang[] = ["fa"];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LANGS,
    fallbackLng: "de",
    defaultNS: "common",
    ns: ["common"],

    // Bundled resources for instant availability (no whitescreen)
    resources: {
      de: { common: commonDe },
      en: { common: commonEn },
      it: { common: commonIt },
      fa: { common: commonFa },
      si: { common: commonSi },
    },

    // Partial bundling: common is bundled, other namespaces loaded via HTTP
    partialBundledLanguages: true,

    detection: {
      order: ["localStorage", "path", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

// RTL support for Persian
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = RTL_LANGS.includes(lng as SupportedLang) ? "rtl" : "ltr";
});

export default i18n;

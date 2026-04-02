import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SUPPORTED_LANGS } from "@/i18n";

const BASE_URL = "https://gastro-master.de";

/**
 * Injects hreflang <link> tags into <head> for SEO.
 * Tells Google which language versions of a page exist.
 * Renders nothing — works via useEffect on document.head.
 */
const HreflangHead = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  useEffect(() => {
    // Strip /:lang prefix to get the page path
    const pagePath = location.pathname.replace(/^\/[a-z]{2}/, "") || "/";

    const links: HTMLLinkElement[] = [];

    // One <link> per supported language
    for (const lng of SUPPORTED_LANGS) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lng;
      link.href = `${BASE_URL}/${lng}${pagePath}`;
      document.head.appendChild(link);
      links.push(link);
    }

    // x-default → German
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${BASE_URL}/de${pagePath}`;
    document.head.appendChild(xDefault);
    links.push(xDefault);

    // Cleanup on unmount or path change
    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, [lang, location.pathname]);

  return null;
};

export default HreflangHead;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * GA4/GTM — SPA-Seitenaufrufe.
 *
 * React Router (v6) wechselt die Route ohne vollen Reload, daher feuert der
 * GTM-Container von sich aus nur beim ERSTEN Laden ein page_view. Diese
 * Komponente pusht bei jedem Routenwechsel (inkl. Initialrender, da der Effekt
 * beim ersten Mount läuft) ein sauberes `page_view`-Event in den dataLayer.
 *
 * Die eigentliche GA4-Zuordnung (Measurement-ID G-M0XYNBP2HR) passiert
 * ausschließlich als Tag im GTM-Interface (Trigger: Custom Event "page_view") —
 * bewusst KEINE Measurement-ID im Code, damit neue Tags ohne Deploy ergänzt
 * werden können.
 *
 * Mount-Ort: neben <ScrollToTop /> innerhalb des <BrowserRouter> (App.tsx).
 */
export const GtmRouteTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // useSeoMeta setzt document.title in einem eigenen Effekt (tiefer im Baum).
    // Per requestAnimationFrame pushen wir NACH dem Effekt-Flush — so trägt das
    // Event garantiert den Titel der NEUEN Seite, nicht den der vorherigen.
    const raf = requestAnimationFrame(() => {
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "page_view",
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, search]);

  return null;
};

export default GtmRouteTracker;

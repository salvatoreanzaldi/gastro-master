import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * FaqPanel — das Verhaltens-Bauteil für aufklappbare Antworten (Batch 8).
 *
 * WARUM ES DAS GIBT
 * Die FAQ-Akkordeons der Site hingen an `{open && <motion.div …>}`. Zugeklappt
 * war die Antwort damit NICHT im DOM — sie stand nur im prerenderten HTML und
 * im FAQPage-Schema. Googles maßgebliche zweite Welle rendert die Seite; was
 * dort fehlt, existiert für die Bewertung nicht. Gemessen betraf das 225
 * Antworten mit 8.478 Wörtern auf 27 DE-Seiten.
 *
 * WAS ES TUT — und was ausdrücklich NICHT
 * Es kapselt nur das VERHALTEN: immer gemountet, Höhe animiert, korrekte
 * aria-Semantik. Aussehen, Abstände und Typografie bleiben in der jeweiligen
 * Seite — die FAQs auf Money-, Vergleichs- und FAQ-Seiten sehen bewusst
 * unterschiedlich aus, und ein vereinheitlichtes Design wäre ein Design-Projekt,
 * kein Deckungs-Fix.
 *
 * WICHTIG: height 0 + overflow hidden (nicht display:none, nicht Unmount) —
 * der Text bleibt im DOM und damit indexierbar, `aria-hidden` hält ihn
 * gleichzeitig aus dem Screenreader-Fluss.
 *
 * Der auslösende Button gehört der Seite; er braucht `aria-expanded={open}`
 * und – wo eine id vergeben wird – `aria-controls`.
 */
export interface FaqPanelProps {
  /** Aufgeklappt? */
  open: boolean;
  children: ReactNode;
  /** Klassen für den Inhalt (Abstände, Farben) — reine Darstellung. */
  className?: string;
  /** Optionale id für aria-controls am Auslöser. */
  id?: string;
}

export const FaqPanel = ({ open, children, className, id }: FaqPanelProps) => (
  <motion.div
    id={id}
    initial={false}
    animate={{ height: open ? "auto" : 0 }}
    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
    style={{ overflow: "hidden" }}
    aria-hidden={!open}
  >
    <div className={className}>{children}</div>
  </motion.div>
);

export default FaqPanel;

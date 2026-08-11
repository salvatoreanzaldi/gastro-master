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
  // CSS-Collapse über grid-template-rows 0fr → 1fr. Bewusst OHNE
  // Höhen-Animation per JS: framer-motion muss für height:"auto" messen, und
  // dieser Messdurchgang rendert das Panel für einen Frame in voller Höhe.
  // Auf /de/faq mit 64 Panels hat das den CLS von 0,39 auf 0,68 getrieben
  // (mobil gemessen). Die Grid-Variante braucht keine Messung: Der geschlossene
  // Zustand steht bereits im ersten Paint fest.
  <div
    id={id}
    aria-hidden={!open}
    style={{
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows 280ms cubic-bezier(0.25, 0.1, 0.25, 1)",
    }}
  >
    <div style={{ overflow: "hidden", minHeight: 0 }}>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default FaqPanel;

import { useEffect, useRef } from "react";

/**
 * Kurzer Konfetti-Ausbruch auf einem Canvas — bewusst ohne npm-Paket.
 *
 * Warum selbstgebaut: Die gaengigen Konfetti-Pakete bringen 8-20 KB gzip mit,
 * die auf JEDER Seite im Bundle landen wuerden. Diese Datei ist ~1 KB und wird
 * nur gemountet, wenn das Formular erfolgreich abgeschickt wurde — vor dem
 * ersten Erfolg kostet sie im Laufzeitpfad nichts.
 *
 * Das Canvas liegt fix ueber der Seite, ist pointer-events-none und
 * aria-hidden: es faengt keine Klicks ab und taucht in keinem Screenreader auf.
 * Bei prefers-reduced-motion wird gar nichts gezeichnet und sofort beendet.
 */
const COLORS = ["#F08800", "#FAA200", "#007DCF", "#0A264A", "#22C55E"];
const DURATION = 1400;

export const ConfettiBurst = ({ onDone }: { onDone?: () => void }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    if (reduced || !canvas) {
      onDone?.();
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) { onDone?.(); return; }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Zwei Fontaenen von unten links und unten rechts — trifft sich in der Mitte.
    //
    // Die Partikelzahl skaliert mit der Flaeche, damit die DICHTE auf jedem
    // Viewport gleich aussieht: 70 Stueck fuellen ein Handydisplay, wirken auf
    // einem 1280er Desktop aber verloren. Bezugsgroesse ist das iPhone-Format
    // (390x844); nach oben gedeckelt, damit ein 4K-Monitor keine Partikelflut
    // zeichnet.
    const count = Math.round(
      Math.min(240, Math.max(70, 70 * ((w * h) / (390 * 844)))),
    );
    const parts = Array.from({ length: count }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const spread = (i / count) * Math.PI * 0.45;
      const speed = 9 + (i % 7);
      return {
        x: fromLeft ? w * 0.15 : w * 0.85,
        y: h * 0.8,
        vx: (fromLeft ? 1 : -1) * Math.cos(spread) * speed * 0.6,
        vy: -Math.sin(spread + 0.6) * speed - 6,
        rot: i * 0.7,
        vr: (i % 5) * 0.06 - 0.12,
        size: 5 + (i % 4),
        color: COLORS[i % COLORS.length],
      };
    });

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);
      const fade = Math.max(0, 1 - elapsed / DURATION);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;          // Schwerkraft
        p.vx *= 0.99;          // Luftwiderstand
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
        onDone?.();
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[70]"
    />
  );
};

export default ConfettiBurst;

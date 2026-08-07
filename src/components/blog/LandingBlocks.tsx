// Batch 3b — Client-Renderer für die Blog-Landing-Blöcke aus
// src/data/blog-landing-content.ts. Rendert DIESELBEN Daten, die der
// Prerenderer statisch ausgibt (renderLandingArticleHtml) — eine Quelle,
// zwei Darstellungen, byte-gleiche Prosa. Die Stile sind 1:1 aus den
// bisherigen drei Landing-Komponenten übernommen.
import type { ComponentType } from "react";
import { CheckCircle2, XCircle, Minus } from "lucide-react";
import { STEP_LABELS, type CalcCard, type LandingBlock } from "@/data/blog-landing-content";

export interface ItemVisual {
  Icon: ComponentType<{ className?: string }>;
  boxClass: string;
  iconClass: string;
}

const DEFAULT_ITEM_VISUAL: ItemVisual = {
  Icon: XCircle,
  boxClass: "bg-white/[0.03] border-white/8",
  iconClass: "text-red-400",
};

const CARD_TONE = {
  neg: {
    box: "bg-red-500/5 border-red-500/15",
    head: "text-red-400",
    HeadIcon: XCircle,
    divider: "border-red-500/15",
    foot: "text-red-400",
  },
  pos: {
    box: "bg-green-500/5 border-green-500/15",
    head: "text-green-400",
    HeadIcon: CheckCircle2,
    divider: "border-green-500/15",
    foot: "text-green-400",
  },
  neutral: {
    box: "bg-white/5 border-white/10",
    head: "text-white",
    HeadIcon: null,
    divider: "border-white/10",
    foot: "text-white",
  },
} as const;

const rowValueClass = (tone?: "neg" | "pos") =>
  tone === "neg" ? "text-red-400" : tone === "pos" ? "text-green-400" : "text-white";

const CalcCardBox = ({ card }: { card: CalcCard }) => {
  const t = CARD_TONE[card.tone];
  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${t.box}`}>
      <div className="flex items-center gap-2 mb-1">
        {t.HeadIcon && <t.HeadIcon className={`w-4 h-4 ${t.head}`} />}
        <span className={`text-sm font-bold ${t.head}`}>{card.title}</span>
      </div>
      {card.sub && <p className="text-white/40 text-xs mb-4 mt-0">{card.sub}</p>}
      <div className={`space-y-0 divide-y divide-white/8 ${card.sub ? "" : "mt-3"}`}>
        {card.rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center py-2.5 gap-4">
            <span className="text-xs text-white/50">{row.label}</span>
            <span className={`text-xs font-bold tabular-nums ${rowValueClass(row.tone)}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
      {card.footLabel && card.footValue && (
        <div className={`mt-4 pt-3 border-t ${t.divider}`}>
          <p className={`text-xs m-0 ${t.foot} opacity-70`}>{card.footLabel}</p>
          <p className={`text-lg font-black m-0 ${t.foot}`}>{card.footValue}</p>
        </div>
      )}
      {card.note && <p className="text-xs text-white/30 mt-4 mb-0">{card.note}</p>}
    </div>
  );
};

interface Props {
  blocks: LandingBlock[];
  /** Optische Icon-/Farbvarianten für `items`-Blöcke, indexiert in Blockreihenfolge. */
  itemVisuals?: ItemVisual[];
  /** Icons für `steps`-Karten (Fehler-Seite), indexiert je Step. */
  stepIcons?: ComponentType<{ className?: string }>[];
}

export const LandingBlocks = ({ blocks, itemVisuals, stepIcons }: Props) => (
  <>
    {blocks.map((b, bi) => {
      switch (b.kind) {
        case "p":
          return <p key={bi}>{b.text}</p>;
        case "h2":
          return (
            <h2 key={bi} className="text-white text-2xl font-black mt-12 mb-4">
              {b.text}
            </h2>
          );
        case "compareTable":
          return (
            <div key={bi} className="overflow-x-auto -mx-5 md:mx-0">
              <table className="w-full min-w-[520px] text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10 w-[35%]">{b.headers[0]}</th>
                    <th className="text-center py-3 px-3 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10">{b.headers[1]}</th>
                    <th className="text-center py-3 px-3 text-white/40 font-semibold text-xs uppercase tracking-wide border-b border-white/10">{b.headers[2]}</th>
                    <th className="text-center py-3 px-3 text-cyan-brand font-semibold text-xs uppercase tracking-wide border-b border-[#007DCF]/30 bg-[#007DCF]/5">{b.headers[3]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {b.rows.map((row) => (
                    <tr key={row.kriterium} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 text-white/70 font-medium text-xs leading-snug">{row.kriterium}</td>
                      <td className="py-3 px-3 text-center"><span className="text-red-400/80 text-xs">{row.lieferando}</span></td>
                      <td className="py-3 px-3 text-center"><span className="text-orange-400/80 text-xs">{row.wolt}</span></td>
                      <td className="py-3 px-3 text-center bg-[#007DCF]/5">
                        <span className={`text-xs font-semibold flex items-center justify-center gap-1 ${row.gmPositiv ? "text-green-400" : "text-white/50"}`}>
                          {row.gmPositiv
                            ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                            : <Minus className="w-3.5 h-3.5 flex-shrink-0" />}
                          {row.gastroMaster}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case "calcCards":
          return (
            <div key={bi} className={b.cards.length > 1 ? "grid md:grid-cols-2 gap-4 mt-6" : "my-10"}>
              {b.cards.map((card) => (
                <CalcCardBox key={card.title} card={card} />
              ))}
            </div>
          );
        case "note":
          return (
            <div key={bi} className="rounded-xl bg-[#007DCF]/8 border border-[#007DCF]/20 px-5 py-4 mt-2">
              <p className="text-cyan-brand text-sm font-bold m-0">{b.title}</p>
              <p className="text-white/45 text-xs mt-1 m-0">{b.text}</p>
            </div>
          );
        case "items": {
          let itemIdx = -1;
          return (
            <div key={bi} className="mt-6 space-y-4">
              {b.items.map((item) => {
                itemIdx += 1;
                const v = itemVisuals?.[itemIdx] ?? DEFAULT_ITEM_VISUAL;
                return (
                  <div key={item.title} className={`flex gap-4 p-4 rounded-xl border ${v.boxClass}`}>
                    <v.Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${v.iconClass}`} />
                    <div>
                      <h3 className="text-white/80 text-sm font-semibold mb-1 mt-0">{item.title}</h3>
                      <p className="text-white/45 text-xs leading-relaxed m-0">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        case "list":
          if (b.heading) {
            return (
              <div key={bi} className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
                <h2 className="text-white text-lg font-bold mb-1 mt-0">{b.heading}</h2>
                {b.sub && <p className="text-white/40 text-xs mb-5">{b.sub}</p>}
                <div className="space-y-3">
                  {b.items.map((punkt) => (
                    <div key={punkt} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/65 text-sm">{punkt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={bi} className="my-6 space-y-3">
              {b.items.map((punkt) => (
                <div key={punkt} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm leading-relaxed">{punkt}</span>
                </div>
              ))}
            </div>
          );
        case "steps":
          return (
            <div key={bi} className="mt-10 space-y-8">
              {b.steps.map((f, si) => {
                const StepIcon = stepIcons?.[si];
                return (
                <div key={f.num} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="flex items-start gap-5 p-6 md:p-8 border-b border-white/8">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-white/10 leading-none mb-2">{f.num}</div>
                      {StepIcon && (
                        <div className="w-10 h-10 rounded-lg bg-[#007DCF]/15 border border-[#007DCF]/25 flex items-center justify-center">
                          <StepIcon className="w-5 h-5 text-cyan-brand" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-black leading-snug mb-3 mt-0">{f.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed m-0">{f.problem}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">{STEP_LABELS.loesung}</p>
                      <p className="text-white/65 text-sm leading-relaxed m-0">{f.loesung}</p>
                    </div>
                    <div className="rounded-xl bg-[#007DCF]/8 border border-[#007DCF]/15 px-4 py-3">
                      <p className="text-xs font-bold text-cyan-brand mb-1">{STEP_LABELS.tipp}</p>
                      <p className="text-white/60 text-xs leading-relaxed m-0">{f.tipp}</p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          );
        default:
          return null;
      }
    })}
  </>
);

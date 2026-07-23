"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

const scenarios = [
  {
    name: "Dengeli rota",
    description: "En kısa yol ile riskli düğümler arasında dengeli seçim.",
    cost: 42,
    signal: "Gecikme / risk dengesi",
    path: [0, 1, 10, 11, 20, 21, 30, 31, 39],
    blocked: [9, 19, 29],
  },
  {
    name: "Güvenli rota",
    description: "Daha uzun ama darboğazlardan uzak bir rota.",
    cost: 57,
    signal: "Hata toleransı öncelikli",
    path: [0, 8, 16, 24, 32, 33, 34, 35, 36, 37, 38, 39],
    blocked: [9, 17, 25],
  },
  {
    name: "Agresif rota",
    description: "Düşük maliyet için yoğun düğümlere daha yakın geçiş.",
    cost: 35,
    signal: "Hız öncelikli karar",
    path: [0, 1, 2, 11, 20, 21, 30, 31, 39],
    blocked: [16, 24, 32],
  },
] as const;

const gridColumns = 8;
const gridSize = 40;

export function AlgorithmLabSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = scenarios[activeIndex];
  const prefersReducedMotion = useReducedMotion();

  const cells = useMemo(() => {
    const pathOrder = new Map<number, number>(
      active.path.map((nodeIndex, order): [number, number] => [nodeIndex, order]),
    );
    const blockedSet: Set<number> = new Set<number>(active.blocked);

    return Array.from({ length: gridSize }, (_, index) => ({
      index,
      isStart: index === active.path[0],
      isEnd: index === active.path[active.path.length - 1],
      isPath: pathOrder.has(index),
      pathOrder: pathOrder.get(index) ?? 0,
      isBlocked: blockedSet.has(index),
    }));
  }, [active]);

  const liveSummary = `${active.name}: maliyet ${active.cost}. ${active.description} Öncelik: ${active.signal}. Yol ${active.path.length} düğüm; ${active.blocked.length} engelli düğüm.`;

  return (
    <section
      id="algorithm-lab"
      className="relative scroll-mt-28 overflow-hidden px-4 py-12 sm:px-6 sm:py-20"
      aria-labelledby="algorithm-lab-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionEyebrow>algorithm.lab</SectionEyebrow>
          <h2
            id="algorithm-lab-heading"
            className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Öncelik değişince rota da değişir
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
            Canlı bir solver değil. Üç senaryo var: dengeli, güvenli, agresif.
            Seçince yol ve maliyet nasıl kayıyor, onu gösteriyorum.
          </p>
        </Reveal>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {liveSummary}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <div className="grid gap-3">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.name}
                type="button"
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className="rounded-xl border border-border bg-card/50 p-4 text-left transition-all duration-[var(--motion-base)] hover:-translate-y-0.5 hover:border-signal/40 aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-signal-foreground"
              >
                <span className="font-mono text-[0.65rem] tracking-wide opacity-70">
                  Senaryo 0{index + 1}
                </span>
                <span className="mt-2 block text-sm font-semibold">
                  {scenario.name}
                </span>
              </button>
            ))}

            <div className="mt-2 rounded-xl border border-border bg-background/40 p-4">
              <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                Rota maliyeti
              </p>
              <p className="mt-1 text-3xl font-bold text-foreground">
                {active.cost}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {active.description}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-foreground">{active.name}</h3>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[0.65rem] tracking-wide text-signal">
                {active.signal}
              </span>
            </div>

            <div
              className="grid gap-1.5 sm:gap-2"
              role="img"
              aria-label={liveSummary}
              style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
            >
              {cells.map((cell) => (
                <div
                  key={cell.index}
                  className={[
                    "aspect-square rounded-md border transition-all duration-500",
                    cell.isBlocked
                      ? "border-red-500/25 bg-red-500/10"
                      : "border-border/50 bg-card/25",
                    cell.isPath && !cell.isStart && !cell.isEnd
                      ? "border-signal/50 bg-signal/20 shadow-[0_0_16px_var(--signal-glow)]"
                      : "",
                    cell.isStart || cell.isEnd
                      ? "border-emerald-400/50 bg-emerald-400/20 shadow-[0_0_16px_rgba(52,211,153,0.4)]"
                      : "",
                  ].join(" ")}
                  style={
                    prefersReducedMotion || !cell.isPath
                      ? undefined
                      : { transitionDelay: `${cell.pathOrder * 45}ms` }
                  }
                />
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <li className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5">
                Başlangıç / Bitiş
              </li>
              <li className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5">
                Seçilen yol
              </li>
              <li className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5">
                Engelli düğüm
              </li>
              <li className="rounded-full border border-border bg-card/40 px-3 py-1.5">
                C / Java / Python yaklaşımı · Trade-off anlatımı
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { SectionEyebrow } from "@/components/section-eyebrow";

const scenarios = [
  {
    name: "Dengeli rota",
    description: "En kısa yol ile riskli düğümler arasında dengeli seçim.",
    cost: 42,
    signal: "latency / risk dengesi",
    path: [0, 1, 10, 11, 20, 21, 30, 31, 39],
    blocked: [9, 19, 29],
  },
  {
    name: "Güvenli rota",
    description: "Daha uzun ama darboğazlardan uzak bir rota.",
    cost: 57,
    signal: "fault tolerance öncelikli",
    path: [0, 8, 16, 24, 32, 33, 34, 35, 36, 37, 38, 39],
    blocked: [9, 17, 25],
  },
  {
    name: "Agresif rota",
    description: "Düşük maliyet için yoğun düğümlere daha yakın geçiş.",
    cost: 35,
    signal: "speed-first karar",
    path: [0, 1, 2, 11, 20, 21, 30, 31, 39],
    blocked: [16, 24, 32],
  },
] as const;

const gridColumns = 8;
const gridSize = 40;

export function AlgorithmLabSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = scenarios[activeIndex];

  const cells = useMemo(() => {
    const pathSet: Set<number> = new Set(active.path);
    const blockedSet: Set<number> = new Set(active.blocked);

    return Array.from({ length: gridSize }, (_, index) => ({
      index,
      isStart: index === active.path[0],
      isEnd: index === active.path[active.path.length - 1],
      isPath: pathSet.has(index),
      isBlocked: blockedSet.has(index),
    }));
  }, [active]);

  return (
    <section className="relative scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div
        className="ambient-orb right-0 top-6 size-80 opacity-60"
        style={{ background: "radial-gradient(circle, var(--signal-glow), transparent 65%)" }}
      />

      <div className="mx-auto max-w-6xl">
        <SectionEyebrow>algorithm.lab</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Algoritmaları sadece listelemiyorum, karar mantığını gösteriyorum.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
          Bu mini demo, rota optimizasyonu fikrini portfolyo içinde
          görselleştirir: farklı öncelikler seçildiğinde algoritmanın maliyet,
          risk ve hız arasında nasıl trade-off yaptığı görünür hale gelir.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <div className="grid gap-3">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.name}
                type="button"
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className="rounded-xl border border-border bg-card/50 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/40 aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-signal-foreground aria-pressed:shadow-[0_0_35px_var(--signal-glow-strong)]"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] opacity-70">
                  scenario 0{index + 1}
                </span>
                <span className="mt-2 block text-sm font-semibold">
                  {scenario.name}
                </span>
              </button>
            ))}

            <div className="mt-2 rounded-xl border border-border bg-background/40 p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                route cost
              </p>
              <p className="mt-1 text-3xl font-bold text-foreground">
                {active.cost}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {active.description}
              </p>
            </div>
          </div>

          {/* Harita kasıtlı olarak kartın içine hapsedilmedi: sayfa arka planında
             serbestçe yayılıyor, sadece yol hücreleri imza rengiyle parlıyor. */}
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-foreground">{active.name}</h3>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-signal">
                {active.signal}
              </span>
            </div>

            <div
              className="grid gap-1.5 sm:gap-2"
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
                  title={`node-${cell.index}`}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-muted-foreground">
                stack: C / Java / Python mindset
              </span>
              <span className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-muted-foreground">
                output: karar + trade-off anlatımı
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";

const scenarios = [
  {
    name: "Dengeli rota",
    description: "En kısa yol ile riskli düğümler arasında dengeli seçim.",
    cost: 42,
    signal: "latency / risk dengesi",
    path: [0, 1, 2, 8, 14, 20, 21, 22, 23, 29],
    blocked: [7, 13, 19],
  },
  {
    name: "Güvenli rota",
    description: "Daha uzun ama darboğazlardan uzak bir rota.",
    cost: 57,
    signal: "fault tolerance öncelikli",
    path: [0, 6, 12, 18, 24, 25, 26, 27, 28, 29],
    blocked: [2, 8, 14, 20],
  },
  {
    name: "Agresif rota",
    description: "Düşük maliyet için yoğun düğümlere daha yakın geçiş.",
    cost: 35,
    signal: "speed-first karar",
    path: [0, 1, 7, 8, 9, 15, 21, 22, 28, 29],
    blocked: [12, 18, 24],
  },
] as const;

const gridSize = 30;

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
    <section className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              algorithm.lab
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Algoritmaları sadece listelemiyorum, karar mantığını gösteriyorum.
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
              Bu mini demo, rota optimizasyonu fikrini portfolyo içinde
              görselleştirir: farklı öncelikler seçildiğinde algoritmanın maliyet,
              risk ve hız arasında nasıl trade-off yaptığı görünür hale gelir.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.name}
                  type="button"
                  aria-pressed={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className="rounded-xl border border-border bg-card/60 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 aria-pressed:border-foreground/35 aria-pressed:bg-foreground aria-pressed:text-background"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] opacity-70">
                    scenario 0{index + 1}
                  </span>
                  <span className="mt-2 block text-sm font-semibold">
                    {scenario.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card/65 p-5 shadow-2xl shadow-black/20">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  active.route
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {active.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  {active.description}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/60 px-4 py-3 text-right">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  route cost
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {active.cost}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-6 gap-2">
              {cells.map((cell) => (
                <div
                  key={cell.index}
                  className={[
                    "aspect-square rounded-lg border transition-all duration-500",
                    cell.isBlocked
                      ? "border-red-500/25 bg-red-500/15"
                      : "border-border bg-background/70",
                    cell.isPath && !cell.isStart && !cell.isEnd
                      ? "border-foreground/25 bg-foreground/15 shadow-[0_0_18px_rgba(255,255,255,0.08)]"
                      : "",
                    cell.isStart || cell.isEnd
                      ? "border-emerald-400/40 bg-emerald-400/20"
                      : "",
                  ].join(" ")}
                  title={`node-${cell.index}`}
                />
              ))}
            </div>

            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  signal
                </p>
                <p className="mt-1 text-foreground">{active.signal}</p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  stack
                </p>
                <p className="mt-1 text-foreground">C / Java / Python mindset</p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  output
                </p>
                <p className="mt-1 text-foreground">karar + trade-off anlatımı</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

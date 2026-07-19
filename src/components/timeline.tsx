import { Reveal } from "@/components/reveal";

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  points: readonly string[];
};

/**
 * Bağlantılı nokta + dikey çizgi zaman çizelgesi. Sitede her yerde tekrar eden
 * kart-ızgara ritmine karşı bilinçli bir kontrast: erselseyit.com'un "Experience"
 * bölümünden esinlenilmiş sade, çizgi tabanlı anlatı.
 */
export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className="relative mt-8 border-l-2 border-border pl-8">
      {items.map((item, index) => (
        <Reveal key={item.title} index={index}>
          <li className="relative pb-10 last:pb-0">
            <span className="absolute top-1.5 -left-[calc(2rem+6px)] flex size-3 items-center justify-center rounded-full border-2 border-background bg-signal shadow-[0_0_10px_var(--signal-glow-strong)]" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold text-foreground">
                {item.title}{" "}
                <span className="font-normal text-signal">@ {item.org}</span>
              </h3>
              <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

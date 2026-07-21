type Signal = "problem" | "decision" | "impact";

function ProblemIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DecisionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 8v2a3 3 0 0 0 3 3h1" />
      <path d="M6 16v-2" />
      <path d="M10 13h6" />
    </svg>
  );
}

function ImpactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 16l5-5 3 3 6-7" />
      <path d="M14 6h4v4" />
    </svg>
  );
}

const config: Record<
  Signal,
  { label: string; Icon: (props: { className?: string }) => React.ReactElement; wrapper: string; icon: string }
> = {
  problem: {
    label: "problem",
    Icon: ProblemIcon,
    wrapper: "border-border bg-muted/35",
    icon: "text-muted-foreground",
  },
  decision: {
    label: "decision",
    Icon: DecisionIcon,
    wrapper: "border-border bg-muted/35",
    icon: "text-muted-foreground",
  },
  impact: {
    label: "impact",
    Icon: ImpactIcon,
    wrapper: "border-signal/25 bg-signal/[0.06]",
    icon: "text-signal",
  },
};

export function PdiBlock({ signal, text }: { signal: Signal; text: string }) {
  const { label, Icon, wrapper, icon } = config[signal];

  return (
    <div className={`rounded-xl border px-3.5 py-3.5 sm:px-4 sm:py-4 ${wrapper}`}>
      <div className="flex items-center gap-2">
        <Icon className={`size-3.5 shrink-0 ${icon}`} />
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-foreground/80 sm:text-[0.8125rem] sm:leading-relaxed">
        {text}
      </p>
    </div>
  );
}

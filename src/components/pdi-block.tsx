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
    label: "Problem",
    Icon: ProblemIcon,
    wrapper: "border-border bg-muted/35",
    icon: "text-muted-foreground",
  },
  decision: {
    label: "Karar",
    Icon: DecisionIcon,
    wrapper: "border-border bg-muted/35",
    icon: "text-muted-foreground",
  },
  impact: {
    label: "Etki",
    Icon: ImpactIcon,
    wrapper: "border-signal/25 bg-signal/[0.06]",
    icon: "text-signal",
  },
};

export function PdiBlock({ signal, text }: { signal: Signal; text: string }) {
  const { label, Icon, wrapper, icon } = config[signal];

  return (
    <div className={`rounded-xl border px-3 py-3 sm:px-3.5 sm:py-3.5 ${wrapper}`}>
      <div className="flex items-center gap-2">
        <Icon className={`size-3.5 shrink-0 ${icon}`} />
        <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-foreground/80">
        {text}
      </p>
    </div>
  );
}

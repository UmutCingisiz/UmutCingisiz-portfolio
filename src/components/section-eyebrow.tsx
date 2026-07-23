export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground sm:text-xs">
      <span className="signal-dot size-1.5" aria-hidden />
      <span className="normal-case">{children}</span>
    </p>
  );
}

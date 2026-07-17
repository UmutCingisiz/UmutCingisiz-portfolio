export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
      <span className="signal-dot size-1.5" aria-hidden />
      {children}
    </p>
  );
}

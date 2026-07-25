type Props = {
  label: string;
  summary: string;
};

/** Proje kartlarında “Kullanılan Mimari / Çözüm” hiyerarşisi */
export function ArchitectureBlock({ label, summary }: Props) {
  return (
    <div className="rounded-xl border border-signal/25 bg-signal/[0.06] px-3 py-3 sm:px-3.5 sm:py-3.5">
      <p className="font-mono text-[0.65rem] tracking-wide text-signal">
        Kullanılan Mimari / Çözüm
      </p>
      <p className="mt-1.5 text-sm font-semibold tracking-tight text-foreground">
        {label}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {summary}
      </p>
    </div>
  );
}

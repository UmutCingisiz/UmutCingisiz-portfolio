type LogoProps = {
  className?: string;
};

/**
 * Saf tipografi kelime-işareti (wordmark). Zorlama monogram yerine üst düzey
 * mühendis logolarındaki gibi temiz tipografi: gradyanlı kalın "Umut" + ince
 * "Cingisiz", önünde kod parantezi motifi ve nabız atan imza noktası ile
 * göze çarpan ama abartısız bir kimlik.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={`group inline-flex items-baseline gap-2 leading-none tracking-tight ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="font-mono text-[0.75em] font-medium text-signal/70 transition-colors duration-300 group-hover:text-signal"
      >
        {"</"}
      </span>
      <span className="inline-flex items-baseline gap-1.5">
        <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-[1.05em] font-extrabold text-transparent">
          Umut
        </span>
        <span className="font-light text-muted-foreground">Cingisiz</span>
      </span>
      <span aria-hidden className="relative inline-flex size-1.5 self-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
        <span className="relative size-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--signal-glow-strong)]" />
      </span>
      <span
        aria-hidden
        className="font-mono text-[0.75em] font-medium text-signal/70 transition-colors duration-300 group-hover:text-signal"
      >
        {">"}
      </span>
    </span>
  );
}

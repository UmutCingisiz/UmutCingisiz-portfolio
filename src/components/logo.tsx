type LogoProps = {
  className?: string;
};

/**
 * UC mühür + wordmark — header’da dikey merkez için items-center + leading-none.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={`group inline-flex items-center gap-2.5 leading-none sm:gap-3 ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="relative flex size-9 shrink-0 items-center justify-center sm:size-10"
      >
        <span className="absolute inset-0 rounded-[0.65rem] bg-signal/15 opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex size-full items-center justify-center overflow-hidden rounded-[0.65rem] border border-signal/45 bg-gradient-to-br from-[#16161a] to-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 group-hover:border-signal">
          <span className="absolute left-1 top-1 size-1 border-l border-t border-signal/70" />
          <span className="absolute bottom-1 right-1 size-1 border-b border-r border-signal/70" />

          <span className="relative z-10 flex items-center justify-center font-mono text-[0.82rem] font-black leading-none tracking-tight sm:text-[0.92rem]">
            <span className="inline-flex w-[0.7em] justify-center text-foreground">
              U
            </span>
            <span
              className="mx-0.5 h-[0.7em] w-px shrink-0 bg-signal/90"
              aria-hidden
            />
            <span className="inline-flex w-[0.7em] justify-center text-signal">
              C
            </span>
          </span>
        </span>
      </span>

      <span className="hidden min-w-0 items-center gap-x-1.5 leading-none xl:inline-flex">
        <span className="text-[0.9em] font-black uppercase leading-none tracking-[-0.03em] text-foreground sm:text-[1.05em]">
          Umut
        </span>
        <span className="text-[0.9em] font-black uppercase leading-none tracking-[-0.03em] text-signal sm:text-[1.05em]">
          Cingisiz
        </span>
      </span>
    </span>
  );
}

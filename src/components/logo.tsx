type LogoProps = {
  className?: string;
};

/**
 * Net UC mühür — stroke-path belirsizliği yok.
 * Keskin plaka + bold mono “U” + “C” (beyaz / signal), aralarında ince ayırıcı.
 * Wordmark aynı kalır.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={`group inline-flex items-center gap-3 leading-none ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="relative flex size-9 shrink-0 items-center justify-center sm:size-10"
      >
        <span className="absolute inset-0 rounded-[0.7rem] bg-signal/20 opacity-70 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex size-full items-center justify-center overflow-hidden rounded-[0.7rem] border border-signal/45 bg-gradient-to-br from-[#16161a] to-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 group-hover:border-signal">
          {/* Köşe tick — plaka detayı */}
          <span className="absolute left-1 top-1 size-1.5 border-l border-t border-signal/80" />
          <span className="absolute bottom-1 right-1 size-1.5 border-b border-r border-signal/80" />

          <span className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center font-mono text-[0.95rem] font-black leading-none sm:text-[1.05rem]">
            <span className="text-center text-foreground">U</span>
            <span className="mx-[0.1em] h-[0.72em] w-px bg-signal/80" />
            <span className="text-center text-signal">C</span>
          </span>
        </span>
      </span>

      <span className="flex min-w-0 flex-col justify-center gap-[0.35rem]">
        <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-[0.95em] font-black uppercase tracking-[-0.04em] text-foreground sm:text-[1.05em]">
            Umut
          </span>
          <span className="text-[0.95em] font-black uppercase tracking-[-0.04em] text-signal sm:text-[1.05em]">
            Cingisiz
          </span>
        </span>
        <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-300 group-hover:text-signal/85 sm:text-[0.58rem]">
          fullstack<span className="mx-1 text-signal/45">/</span>engineer
        </span>
      </span>
    </span>
  );
}

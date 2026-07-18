type LogoProps = {
  className?: string;
};

/**
 * Saf tipografi kelime-işareti (wordmark). Zorlama monogram yerine üst düzey
 * mühendis logolarındaki gibi temiz tipografi: kalın "Umut" + ince "Cingisiz",
 * araya imza rengiyle bir nokta. Font ailesi global `--font-geist-sans`.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 text-[0.95rem] leading-none tracking-tight ${className ?? ""}`}
    >
      <span className="font-extrabold text-foreground">Umut</span>
      <span className="font-light text-muted-foreground">Cingisiz</span>
      <span className="signal-dot size-1.5 self-center" aria-hidden />
    </span>
  );
}

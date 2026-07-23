export function AlgorithmLabSkeleton() {
  return (
    <section
      className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-20"
      aria-busy="true"
      aria-label="Algoritma laboratuvarı yükleniyor"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-3 w-28 rounded bg-muted" />
        <div className="mt-4 h-9 w-full max-w-xl rounded bg-muted" />
        <div className="mt-3 h-4 w-full max-w-lg rounded bg-muted" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-20 rounded-xl border border-border bg-card/40" />
            ))}
          </div>
          <div className="h-64 rounded-xl border border-border bg-card/30 sm:h-80" />
        </div>
      </div>
    </section>
  );
}

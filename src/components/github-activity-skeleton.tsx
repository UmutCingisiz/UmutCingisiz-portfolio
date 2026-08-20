export function GithubActivitySkeleton() {
  return (
    <section
      id="github"
      className="scroll-mt-28 border-y border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-24"
      aria-busy="true"
      aria-label="GitHub aktivitesi yükleniyor"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="h-3 w-28 rounded bg-muted" />
            <div className="mt-3 h-8 w-56 max-w-full rounded bg-muted sm:h-9 sm:w-72" />
          </div>
          <div className="h-9 w-28 rounded-lg bg-muted" />
        </div>

        <div className="mt-6 h-12 rounded-[var(--radius-lg)] border border-border bg-card/40 sm:mt-8" />

        <div className="mt-6 h-40 rounded-2xl border border-border bg-card/40 sm:mt-8 sm:h-48" />

        <ul className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <div className="h-36 rounded-[var(--radius-lg)] border border-border bg-card/40 sm:h-40" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

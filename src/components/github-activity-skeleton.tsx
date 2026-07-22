export function GithubActivitySkeleton() {
  return (
    <section
      id="github"
      className="scroll-mt-24 border-y border-border bg-muted/30 px-4 py-24 sm:px-6 sm:py-32"
      aria-busy="true"
      aria-label="GitHub aktivitesi yükleniyor"
    >
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-3 w-28 rounded bg-muted" />
        <div className="mt-4 h-9 w-72 max-w-full rounded bg-muted" />
        <div className="mt-3 h-4 w-full max-w-md rounded bg-muted" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-36 rounded-[var(--radius-lg)] border border-border bg-card/40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

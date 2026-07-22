export default function ProjectDetailLoading() {
  return (
    <div
      className="mx-auto max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24"
      aria-busy="true"
      aria-label="Proje yükleniyor"
    >
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-28 rounded-lg border border-border bg-muted/50" />
        <div className="rounded-xl border border-border bg-card/40 p-7 sm:p-9">
          <div className="h-3 w-40 rounded bg-muted" />
          <div className="mt-4 h-10 w-2/3 max-w-lg rounded bg-muted" />
          <div className="mt-4 h-4 w-full rounded bg-muted" />
          <div className="mt-2 h-4 w-4/5 rounded bg-muted" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-28 rounded-lg border border-border bg-card/30" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostLoading() {
  return (
    <div
      className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6 sm:py-24"
      aria-busy="true"
      aria-label="Yazı yükleniyor"
    >
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-24 rounded-lg border border-border bg-muted/50" />
        <div className="rounded-xl border border-border bg-card/40 p-7">
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="mt-4 h-9 w-3/4 max-w-md rounded bg-muted" />
          <div className="mt-4 h-4 w-full rounded bg-muted" />
          <div className="mt-2 h-4 w-5/6 rounded bg-muted" />
        </div>
        <div className="space-y-3 py-6">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

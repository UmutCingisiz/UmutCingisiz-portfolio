export default function Loading() {
  return (
    <div
      className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-24 sm:px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="size-8 animate-spin rounded-full border-2 border-border border-t-foreground"
        aria-hidden
      />
      <p className="text-sm text-muted-foreground">Yükleniyor…</p>
    </div>
  );
}

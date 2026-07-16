import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 text-pretty text-muted-foreground">
        Aradığın bağlantı taşınmış, silinmiş veya hiç var olmamış olabilir.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Ana sayfa
        </Link>
        <Link
          href="/projects"
          className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Projeler
        </Link>
      </div>
    </div>
  );
}

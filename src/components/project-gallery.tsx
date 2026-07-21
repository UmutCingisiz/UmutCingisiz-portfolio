import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type ProjectGalleryProps = {
  title: string;
  items?: GalleryItem[];
};

/**
 * Proje detayında uygulama içi ekran görüntüleri.
 * Görsel yoksa dürüst boş durum gösterir — bozuk demo linki yerine.
 */
export function ProjectGallery({ title, items }: ProjectGalleryProps) {
  const shots = items?.filter((item) => item.src.trim().length > 0) ?? [];

  return (
    <section className="mt-8 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            product.screens
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Uygulama içi görünümler
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Canlı demo yerine ürünün gerçek yüzeyleri — akış, arayüz ve mühendislik
            kararları burada okunur.
          </p>
        </div>
        <span className="w-fit rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
          {shots.length > 0 ? `${shots.length} frame` : "pending"}
        </span>
      </div>

      {shots.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {shots.map((shot, index) => (
            <li
              key={`${shot.src}-${index}`}
              className="overflow-hidden rounded-xl border border-border bg-muted/30"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              {(shot.caption || shot.alt) && (
                <p className="border-t border-border px-3 py-2 font-mono text-[0.7rem] text-muted-foreground">
                  <span className="text-signal/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-border">·</span>
                  {shot.caption ?? shot.alt}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-border/80 bg-muted/20 px-5 py-10 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-signal/70">
            screenshots.coming
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {title} için 3–4 uygulama ekranı eklenecek. Şimdilik vaka çalışması
            metni ve P/D/I kartları ana kanıt.
          </p>
        </div>
      )}
    </section>
  );
}

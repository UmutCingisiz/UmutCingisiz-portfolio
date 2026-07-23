"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
 * Proje detayında uygulama içi ekran görüntüleri + lightbox büyütme.
 */
export function ProjectGallery({ title, items }: ProjectGalleryProps) {
  const shots = items?.filter((item) => item.src.trim().length > 0) ?? [];
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const showPrev = useCallback(() => {
    setActive((i) => (i === null ? i : (i + shots.length - 1) % shots.length));
  }, [shots.length]);
  const showNext = useCallback(() => {
    setActive((i) => (i === null ? i : (i + 1) % shots.length));
  }, [shots.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, showPrev, showNext]);

  return (
    <section className="mt-8 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
            product.screens
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Uygulama içi görünümler
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Görsele tıklayarak büyüt. Escape / ok tuşları ile gezin.
          </p>
        </div>
        <span className="w-fit rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted-foreground">
          {shots.length > 0 ? `${shots.length} frame` : "pending"}
        </span>
      </div>

      {shots.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {shots.map((shot, index) => (
            <li key={`${shot.src}-${index}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group w-full overflow-hidden rounded-xl border border-border bg-muted/30 text-left transition-colors hover:border-signal/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <span className="absolute bottom-2 right-2 rounded-md border border-border bg-background/85 px-2 py-1 font-mono text-[0.6rem] text-muted-foreground backdrop-blur">
                    Büyüt ↗
                  </span>
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
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-border/80 bg-muted/20 px-5 py-10 text-center">
          <p className="font-mono text-[0.65rem] tracking-wide text-signal/70">
            screenshots.coming
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {title} için ekran görüntüleri eklenecek.
          </p>
        </div>
      )}

      {active !== null && shots[active] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={shots[active].alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-muted"
          >
            Kapat
          </button>
          {shots.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Önceki"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg border border-border bg-card px-3 py-2 text-foreground hover:bg-muted sm:left-6"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Sonraki"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg border border-border bg-card px-3 py-2 text-foreground hover:bg-muted sm:right-6"
              >
                →
              </button>
            </>
          ) : null}
          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={shots[active].src}
                alt={shots[active].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              {shots[active].caption ? ` · ${shots[active].caption}` : ""}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

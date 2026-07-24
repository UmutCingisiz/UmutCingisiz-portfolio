"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const close = useCallback(() => setActive(null), []);
  const showPrev = useCallback(() => {
    setActive((i) => (i === null ? i : (i + shots.length - 1) % shots.length));
  }, [shots.length]);
  const showNext = useCallback(() => {
    setActive((i) => (i === null ? i : (i + 1) % shots.length));
  }, [shots.length]);

  useEffect(() => {
    if (active === null) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, showPrev, showNext]);

  const restoreFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (active === null) {
      restoreFocusRef.current = null;
      return;
    }
    restoreFocusRef.current = triggerRefs.current.get(active) ?? null;
  }, [active]);

  useFocusTrap(dialogRef, {
    active: active !== null,
    onEscape: close,
    restoreFocusRef,
    initialFocusRef: closeButtonRef,
  });

  const current = active !== null ? shots[active] : null;

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
            Görsele dokunarak büyüt. Escape / ok tuşları ile gezin.
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
                ref={(el) => {
                  if (el) triggerRefs.current.set(index, el);
                  else triggerRefs.current.delete(index);
                }}
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

      {current && active !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
          onClick={close}
        >
          <div
            className="flex items-center justify-between gap-3 border-b border-border/70 px-3 py-3 sm:px-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="min-w-0 truncate font-mono text-xs text-muted-foreground">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(shots.length).padStart(2, "0")}
              {current.caption ? ` · ${current.caption}` : ""}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="inline-flex h-11 shrink-0 items-center rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
            >
              Kapat
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-3 sm:px-12 sm:py-6"
            onClick={(e) => e.stopPropagation()}
          >
            {shots.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Önceki görsel"
                  onClick={showPrev}
                  className="absolute left-1 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl border border-border bg-card/95 text-lg text-foreground shadow-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 sm:left-4 sm:size-12"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Sonraki görsel"
                  onClick={showNext}
                  className="absolute right-1 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl border border-border bg-card/95 text-lg text-foreground shadow-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 sm:right-4 sm:size-12"
                >
                  →
                </button>
              </>
            ) : null}

            {/* Mobil: tam genişlik + contain; kırpma yok */}
            <div className="relative mx-auto h-[min(72dvh,820px)] w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-muted/30 sm:rounded-xl">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain object-center"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

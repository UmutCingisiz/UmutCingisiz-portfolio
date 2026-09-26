"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/use-focus-trap";

function subscribeNoop() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type ProjectGalleryProps = {
  title: string;
  items?: GalleryItem[];
  device?: "phone" | "web";
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * Proje detayında uygulama içi ekran görüntüleri + lightbox büyütme.
 * Lightbox, ancestor transform/backdrop-filter'dan bağımsız olsun diye body portal'ına gider.
 */
export function ProjectGallery({ title, items, device = "web" }: ProjectGalleryProps) {
  const shots = items?.filter((item) => item.src.trim().length > 0) ?? [];
  const [active, setActive] = useState<number | null>(null);
  const mounted = useIsClient();
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

  const lightbox =
    mounted && current && active !== null
      ? createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none bg-black/90 p-3 pt-16 sm:p-6 sm:pt-20"
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-3 top-3 z-30 inline-flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:right-6 sm:top-6"
              aria-label="Kapat"
            >
              <CloseIcon className="size-5" />
            </button>

            {shots.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Önceki görsel"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-2 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:left-6 sm:size-12"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Sonraki görsel"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-2 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:right-6 sm:size-12"
                >
                  →
                </button>
              </>
            ) : null}

            <figure
              className="relative z-10 flex max-h-[min(90dvh,900px)] w-full max-w-5xl flex-col items-center justify-center gap-3 px-12 sm:gap-4 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Karışık aspect ratio — sabit yükseklik + object-contain (kırpma/taşma yok) */}
              <div className="relative h-[min(68dvh,720px)] w-full min-h-[12rem]">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  loading="eager"
                />
              </div>

              <figcaption className="flex w-full max-w-xl shrink-0 flex-col items-center gap-1 px-2 text-center">
                <span className="font-mono text-xs tracking-wide text-white/60 tabular-nums">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(shots.length).padStart(2, "0")}
                </span>
                {current.caption || current.alt ? (
                  <span className="text-sm leading-5 text-white/85">
                    {current.caption ?? current.alt}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )
      : null;

  if (shots.length === 0) return null;

  const phone = device === "phone";

  return (
    <section className="mt-14 border-t border-border pt-10" aria-label={`${title} ekranları`}>
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
        <span className="w-fit font-mono text-[0.65rem] tracking-wide text-muted-foreground">
          {shots.length} ekran
        </span>
      </div>

      <ul className={`mt-6 grid gap-4 ${phone ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"}`}>
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
                <div className={`relative bg-muted/40 ${phone ? "aspect-[9/19.5]" : "aspect-[16/10]"}`}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className={`transition-transform duration-300 group-hover:scale-[1.015] ${
                      phone ? "object-cover object-top" : "object-contain object-center"
                    }`}
                    sizes={phone ? "(max-width: 640px) 50vw, 240px" : "(max-width: 640px) 100vw, 400px"}
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

      {lightbox}
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Props = {
  active: boolean;
};

/**
 * İletişim formu başarısı — şık toast; ardından URL temizlenir (anasayfa).
 */
export function ContactSuccessToast({ active }: Props) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const hide = window.setTimeout(() => setVisible(false), 3200);
    const nav = window.setTimeout(() => {
      router.replace("/", { scroll: false });
    }, 3600);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(nav);
    };
  }, [active, router]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 28, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.98 }
          }
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="fixed bottom-5 left-1/2 z-[80] w-[min(92vw,420px)] -translate-x-1/2"
        >
          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/35 bg-card/95 px-4 py-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-5 sm:py-4">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-8 top-1/2 size-24 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-2xl"
            />
            <div className="relative flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                <svg
                  className="size-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 8.5 6.5 12 13 4" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  Mailiniz başarıyla gönderildi
                </p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground sm:text-sm">
                  Mesajınızı aldım. En kısa sürede dönüş yapacağım.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  router.replace("/", { scroll: false });
                }}
                className="shrink-0 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Bildirimi kapat"
              >
                Kapat
              </button>
            </div>
            {!prefersReducedMotion ? (
              <motion.span
                aria-hidden
                className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/80"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3.2, ease: "linear" }}
              />
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

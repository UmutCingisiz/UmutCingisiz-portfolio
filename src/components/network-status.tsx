"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Bağlantı koptuğunda siberpunk/mühendislik tonunda küçük bir status toast.
 * navigator.onLine + online/offline event'leri ile çalışır; reduced-motion'da
 * animasyon sadeleşir.
 */
export function NetworkStatus() {
  const [online, setOnline] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function sync() {
      setOnline(navigator.onLine);
    }
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <AnimatePresence>
      {!online ? (
        <motion.div
          role="status"
          aria-live="assertive"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="fixed bottom-5 left-1/2 z-[70] flex w-[min(92vw,420px)] -translate-x-1/2 items-center gap-3 rounded-xl border border-amber-400/30 bg-card/95 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <span className="relative inline-flex size-2.5 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/70" />
            <span className="relative size-2.5 rounded-full bg-amber-400" />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-amber-300/90">
              network.status
            </p>
            <p className="mt-0.5 text-sm text-foreground">
              Socket connection lost. Retrying…
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

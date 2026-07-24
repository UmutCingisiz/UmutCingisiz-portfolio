"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(behavior: ScrollBehavior = "smooth") {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** App Router'da `/#section` ve hash değişiminde hedefe kaydır — sıçrama yok. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;

    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      if (!scrollToHash("smooth")) {
        window.setTimeout(() => {
          if (!cancelled) scrollToHash("smooth");
        }, 120);
      }
    };

    const frame = window.requestAnimationFrame(run);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      scrollToHash("smooth");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}

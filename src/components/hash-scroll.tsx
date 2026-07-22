"use client";

import { useEffect } from "react";

/** App Router'da `/#section` ile gelince hedefe kaydır. */
export function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const frame = window.requestAnimationFrame(() => {
      window.setTimeout(scroll, 80);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}

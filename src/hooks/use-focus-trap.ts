"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.getAttribute("aria-hidden") !== "true" &&
      el.tabIndex !== -1,
  );
}

type Options = {
  /** Trap aktif mi (ör. dialog açık) */
  active: boolean;
  /** Escape ile çağrılır */
  onEscape?: () => void;
  /** Kapanınca odaklanacak öğe; yoksa önceki aktif öğe */
  restoreFocusRef?: RefObject<HTMLElement | null>;
  /** Açılınca ilk odak; yoksa ilk odaklanabilir öğe */
  initialFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Modal / lightbox için Tab döngüsü + Escape.
 * Odağı yalnızca container içindeki etkileşimli öğelerde tutar.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  { active, onEscape, restoreFocusRef, initialFocusRef }: Options,
) {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused =
      (document.activeElement as HTMLElement | null) ?? null;

    const focusInitial = () => {
      const preferred = initialFocusRef?.current;
      if (preferred) {
        preferred.focus();
        return;
      }
      const items = getFocusable(container);
      items[0]?.focus();
    };

    // Dialog paint sonrası odak
    const raf = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable(container);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (current === first || !container.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last || !container.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      const restore = restoreFocusRef?.current ?? previouslyFocused;
      restore?.focus?.();
    };
  }, [active, containerRef, onEscape, restoreFocusRef, initialFocusRef]);
}

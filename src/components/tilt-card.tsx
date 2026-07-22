"use client";

import type {
  ComponentPropsWithoutRef,
  ElementType,
  MouseEvent,
  ReactNode,
} from "react";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";

type TiltCardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  /** Maksimum eğim açısı (derece). Varsayılan 6. */
  max?: number;
  /** Işık huzmesi (shine) katmanını gizle. */
  noShine?: boolean;
  /**
   * Design system allowlist: yalnızca Hero / Featured / Projects list.
   * false ise düz yüzey gibi davranır (tilt yok).
   */
  enabled?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * İmleç eğimli kart. Allowlist: docs/DESIGN-SYSTEM.md §4.
 * `prefers-reduced-motion` veya `enabled={false}` → no-op transform.
 */
export function TiltCard<T extends ElementType = "div">({
  as,
  className,
  children,
  max = 6,
  noShine = false,
  enabled = true,
  ...rest
}: TiltCardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const active = enabled && !prefersReducedMotion;

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (!active) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const ry = (px - 0.5) * 2 * max;
    const rx = -(py - 0.5) * 2 * max;

    target.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    target.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    target.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    target.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);

    const angle =
      (Math.atan2(
        py * rect.height - rect.height / 2,
        px * rect.width - rect.width / 2,
      ) *
        180) /
        Math.PI +
      90;
    target.style.setProperty("--spot-angle", `${angle}deg`);
  }

  function handleMouseLeave(event: MouseEvent<HTMLElement>) {
    if (!active) return;
    const target = event.currentTarget;
    target.style.setProperty("--rx", "0deg");
    target.style.setProperty("--ry", "0deg");
  }

  return (
    <Tag
      ref={ref}
      className={`${active ? "tilt-card spotlight" : ""} ${className ?? ""}`}
      onMouseMove={active ? handleMouseMove : undefined}
      onMouseLeave={active ? handleMouseLeave : undefined}
      {...rest}
    >
      {active && !noShine ? <span className="tilt-shine" aria-hidden /> : null}
      {children}
    </Tag>
  );
}

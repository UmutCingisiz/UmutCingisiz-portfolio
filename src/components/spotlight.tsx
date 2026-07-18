"use client";

import type { ComponentPropsWithoutRef, ElementType, MouseEvent, ReactNode } from "react";

type SpotlightProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Kartın üzerinde imleci takip eden ışık efekti (spotlight). Sadece
 * `--spot-x`/`--spot-y` CSS değişkenlerini günceller; görsel efekt
 * `globals.css`'teki `.spotlight` sınıfında tanımlıdır.
 */
export function Spotlight<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: SpotlightProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty("--spot-x", `${x}px`);
    target.style.setProperty("--spot-y", `${y}px`);

    // Merkezden imlece olan açı: gradient-border kenarlığının dönüşünü besler.
    const angle = (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI + 90;
    target.style.setProperty("--spot-angle", `${angle}deg`);
  }

  return (
    <Tag className={`spotlight ${className ?? ""}`} onMouseMove={handleMouseMove} {...rest}>
      {children}
    </Tag>
  );
}

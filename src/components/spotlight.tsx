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
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag className={`spotlight ${className ?? ""}`} onMouseMove={handleMouseMove} {...rest}>
      {children}
    </Tag>
  );
}

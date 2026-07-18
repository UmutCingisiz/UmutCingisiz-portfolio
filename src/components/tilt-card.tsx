"use client";

import type {
  ComponentPropsWithoutRef,
  ElementType,
  MouseEvent,
  ReactNode,
} from "react";
import { useRef } from "react";

type TiltCardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  /** Maksimum eğim açısı (derece). Varsayılan 7. */
  max?: number;
  /** Işık huzmesi (shine) katmanını gizle. */
  noShine?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * İmlecin açısına göre 3B eğilen kart (Apple TV kartları hissi). Aynı anda:
 *  - `--rx`/`--ry`: perspektif eğim açıları
 *  - `--mx`/`--my`: shine + spotlight konumu
 *  - `--spot-angle`: gradient-border kenarlığının dönüşü
 * değişkenlerini besler. Görsel efektler `globals.css` içinde tanımlıdır.
 */
export function TiltCard<T extends ElementType = "div">({
  as,
  className,
  children,
  max = 7,
  noShine = false,
  ...rest
}: TiltCardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
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
      (Math.atan2(py * rect.height - rect.height / 2, px * rect.width - rect.width / 2) * 180) /
        Math.PI +
      90;
    target.style.setProperty("--spot-angle", `${angle}deg`);
  }

  function handleMouseLeave(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget;
    target.style.setProperty("--rx", "0deg");
    target.style.setProperty("--ry", "0deg");
  }

  return (
    <Tag
      ref={ref}
      className={`tilt-card spotlight ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {!noShine ? <span className="tilt-shine" aria-hidden /> : null}
      {children}
    </Tag>
  );
}

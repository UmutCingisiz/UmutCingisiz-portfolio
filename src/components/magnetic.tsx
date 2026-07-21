"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Birincil CTA'lara "fiziksel" hissiyat veren manyetik imleç efekti.
 * İmleç butona yaklaştığında buton hafifçe imlece doğru kayar; ayrıldığında
 * yaylı (spring) bir hareketle eski konumuna döner. `prefers-reduced-motion`
 * tercih edildiğinde efekt tamamen devre dışı kalır.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.12 });
  const springY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.12 });

  function handleMouseMove(event: MouseEvent<HTMLSpanElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-wrap ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}

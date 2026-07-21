"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  index?: number;
  className?: string;
};

/**
 * Kartların yukarıdan aşağıya, hafif bulanıklıktan (blur) netliğe geçerek,
 * gecikmeli (stagger) bir zincirle ekrana girmesini sağlar. `viewport.once`
 * sayesinde her kart bir kez oynar; reduced-motion tercihinde efekt atlanır.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 34,
        mass: 0.55,
        delay: index * 0.045,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

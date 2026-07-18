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
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

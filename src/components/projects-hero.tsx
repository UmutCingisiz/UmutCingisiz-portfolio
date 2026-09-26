"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ProjectsHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden pb-8 pt-16 sm:pb-12 sm:pt-20">
      {/* Background glowing orbs & grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 blur-3xl">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="h-[300px] w-[300px] rounded-full bg-signal/30 mix-blend-screen sm:h-[500px] sm:w-[500px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute h-[400px] w-[400px] rounded-full bg-blue-500/20 mix-blend-screen sm:h-[600px] sm:w-[600px]"
        />
      </div>
      
      {/* Premium subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <header className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-10 w-full"
        >
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl">
            Projeler
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Yayında olan çalışmalar ve süren geliştirmeler.
          </p>
        </motion.div>
      </header>
    </div>
  );
}

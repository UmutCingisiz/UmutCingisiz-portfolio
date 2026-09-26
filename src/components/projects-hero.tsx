"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ProjectsHero() {

  return (
    <div className="relative overflow-hidden pb-12 pt-16 sm:pb-20 sm:pt-24 border-b border-border/40">
      {/* Background glowing orbs & grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-50 blur-[100px]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="h-[400px] w-[400px] rounded-full bg-signal/20 mix-blend-screen sm:h-[600px] sm:w-[600px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-[450px] w-[450px] rounded-full bg-blue-500/10 mix-blend-screen sm:h-[650px] sm:w-[650px]"
        />
      </div>
      
      {/* Premium subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"></div>

      <header className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-4 py-1.5 text-sm font-medium text-signal shadow-[0_0_15px_rgba(var(--signal),0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal"></span>
          </span>
          Proje Vitrini
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="relative z-10 w-full"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl drop-shadow-sm">
            Projeler
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Tasarım kararlarından mühendislik detaylarına uzanan,{" "}
            <span className="text-foreground font-medium">yayında olan çalışmalar</span> ve{" "}
            <span className="text-foreground font-medium">süren geliştirmeler.</span>
          </p>
        </motion.div>
      </header>
    </div>
  );
}

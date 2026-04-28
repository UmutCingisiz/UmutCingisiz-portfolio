"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),transparent)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm text-accent"
        >
          &lt; Hello World /&gt;
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          {siteConfig.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-2 text-lg text-muted-foreground sm:text-xl"
        >
          {siteConfig.role}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg"
        >
          {siteConfig.headline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/projects"
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground shadow-sm transition hover:opacity-90"
          >
            Projelerimi gör
          </Link>
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            CV indir
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-11 min-w-[180px] items-center justify-center rounded-full px-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            İletişim
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

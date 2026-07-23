"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";

const shell = siteConfig.terminal;

/**
 * Hero altı ucmd — mobilde de kaçınılmaz giriş noktası.
 */
export function TerminalPrompt() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="px-4 py-4 sm:px-6 sm:py-6"
      aria-label={`${shell.name} command shell`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.button
          type="button"
          onClick={openTerminal}
          aria-label={`${shell.name} terminalini aç`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-signal/35 bg-[#05080c] px-4 py-4 text-left font-mono shadow-[0_0_40px_rgba(34,211,238,0.12)] ring-1 ring-cyan-400/20 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_48px_rgba(34,211,238,0.22)] sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
          />

          <div className="flex items-center justify-between gap-3 sm:contents">
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
              </span>
              <span className="rounded border border-signal/40 bg-signal/15 px-2 py-0.5 text-[0.7rem] font-bold tracking-[0.16em] text-signal">
                {shell.name}
              </span>
              <span className="text-[0.65rem] text-cyan-200/50">
                v{shell.version}
              </span>
            </span>
            <span className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[0.65rem] font-semibold text-cyan-100 sm:hidden">
              Dokun · aç
            </span>
          </div>

          <span className="flex min-w-0 flex-1 items-center gap-2 text-sm">
            <span className="text-emerald-400">$</span>
            <span className="truncate text-cyan-100">show_projects()</span>
            <span
              className={[
                "inline-block h-4 w-2 bg-cyan-300/80",
                prefersReducedMotion ? "" : "animate-pulse",
              ].join(" ")}
              aria-hidden
            />
          </span>

          <span className="hidden items-center gap-2 text-xs text-cyan-200/70 md:flex">
            <span className="transition-colors group-hover:text-cyan-100">
              {shell.tagline}
            </span>
            <kbd className="rounded border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-cyan-200">
              Ctrl `
            </kbd>
          </span>
        </motion.button>
        <p className="mt-2 text-center font-mono text-[0.65rem] text-muted-foreground sm:hidden">
          {shell.tagline} · klavye gerekmez
        </p>
      </div>
    </section>
  );
}

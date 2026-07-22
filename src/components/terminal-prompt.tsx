"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";

const shell = siteConfig.terminal;

/**
 * Hero altı ucmd giriş noktası — UC + cmd kimliği ile terminali öne çıkarır.
 */
export function TerminalPrompt() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 pb-4 sm:px-6" aria-label={`${shell.name} command shell`}>
      <div className="mx-auto max-w-7xl">
        <motion.button
          type="button"
          onClick={openTerminal}
          aria-label={`${shell.name} terminalini aç (Ctrl+\`)`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#05080c]/90 px-5 py-4 text-left font-mono shadow-lg shadow-black/30 ring-1 ring-cyan-400/10 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/35 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)] sm:gap-4 sm:px-6"
        >
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </span>

          <span className="hidden shrink-0 items-center gap-2 border-r border-white/10 pr-4 sm:flex">
            <span className="rounded border border-signal/35 bg-signal/10 px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.14em] text-signal">
              {shell.name}
            </span>
            <span className="text-[0.65rem] text-cyan-200/45">v{shell.version}</span>
          </span>

          <span className="flex min-w-0 flex-1 items-center gap-2 text-sm">
            <span className="text-emerald-400">$</span>
            <span className="truncate text-cyan-100">
              <span className="text-cyan-200/50 sm:hidden">{shell.name} </span>
              show_projects()
            </span>
            <span
              className={[
                "inline-block h-4 w-2 bg-cyan-300/80",
                prefersReducedMotion ? "" : "animate-pulse",
              ].join(" ")}
              aria-hidden
            />
          </span>

          <span className="hidden items-center gap-2 text-xs text-cyan-200/60 md:flex">
            <span className="transition-colors group-hover:text-cyan-100">
              {shell.tagline}
            </span>
            <kbd className="rounded border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-cyan-200">
              Ctrl `
            </kbd>
          </span>
        </motion.button>
      </div>
    </section>
  );
}

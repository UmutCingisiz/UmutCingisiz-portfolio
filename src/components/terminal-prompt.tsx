"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";

const shell = siteConfig.terminal;

const quickHints = [
  { cmd: "show_projects()", hint: "Projeler" },
  { cmd: "blog", hint: "Blog" },
  { cmd: "contact", hint: "İletişim" },
] as const;

/**
 * Hero altı ucmd — dikkat çeken komut kabuğu girişi.
 */
export function TerminalPrompt() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative px-4 py-5 sm:px-6 sm:py-7"
      aria-label={`${shell.name} command shell`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-24 max-w-3xl -translate-y-1/2 rounded-full bg-signal/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2 px-0.5">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] text-signal">
              interactive.shell
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {shell.name} — sitede komutla gez
            </p>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Projeler, blog ve iletişim tek kabukta
          </p>
        </div>

        <motion.button
          type="button"
          onClick={openTerminal}
          aria-label={`${shell.name} terminalini aç`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
          className="group relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-signal/45 bg-gradient-to-br from-[#071018] via-[#05080c] to-[#0a1220] px-4 py-5 text-left font-mono shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_20px_60px_rgba(0,0,0,0.45),0_0_56px_rgba(34,211,238,0.16)] transition-shadow duration-300 hover:border-signal/70 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_24px_70px_rgba(0,0,0,0.5),0_0_72px_rgba(34,211,238,0.28)] sm:gap-5 sm:px-6 sm:py-6"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
          />
          <span
            aria-hidden
            className={[
              "pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-signal/20 blur-3xl",
              prefersReducedMotion ? "" : "animate-pulse",
            ].join(" ")}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-red-400/90" />
                <span className="size-2.5 rounded-full bg-amber-400/90" />
                <span className="size-2.5 rounded-full bg-emerald-400/90" />
              </span>
              <span className="rounded-md border border-signal/50 bg-signal/20 px-2.5 py-1 text-[0.75rem] font-black tracking-[0.2em] text-signal">
                {shell.name}
              </span>
              <span className="text-[0.7rem] text-cyan-200/55">
                v{shell.version}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[0.7rem] font-semibold text-cyan-100">
              <span
                className={[
                  "size-1.5 rounded-full bg-cyan-300",
                  prefersReducedMotion ? "" : "animate-pulse",
                ].join(" ")}
              />
              Terminali aç
              <kbd className="hidden rounded border border-cyan-400/35 bg-cyan-400/15 px-1.5 py-0.5 text-[0.6rem] text-cyan-100 md:inline">
                Ctrl `
              </kbd>
            </span>
          </div>

          <div className="relative flex min-w-0 items-center gap-2.5 text-base sm:text-lg">
            <span className="text-emerald-400">$</span>
            <span className="truncate font-medium text-cyan-50">
              show_projects()
            </span>
            <span
              className={[
                "inline-block h-5 w-2.5 bg-cyan-300",
                prefersReducedMotion ? "opacity-80" : "animate-pulse",
              ].join(" ")}
              aria-hidden
            />
          </div>

          <div className="relative flex flex-wrap gap-2">
            {quickHints.map((item) => (
              <span
                key={item.cmd}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[0.65rem] text-cyan-100/80 sm:text-xs"
              >
                <span className="text-emerald-400/90">$</span> {item.cmd}
                <span className="ml-1.5 text-cyan-200/45">{item.hint}</span>
              </span>
            ))}
          </div>

          <p className="relative text-xs leading-5 text-cyan-100/55 sm:text-sm">
            {shell.tagline}. Dokunarak veya{" "}
            <span className="text-cyan-100/80">Ctrl + `</span> ile açılır.
          </p>
        </motion.button>
      </div>
    </section>
  );
}

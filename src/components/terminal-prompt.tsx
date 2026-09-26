"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { openTerminal } from "@/lib/terminal";

const shell = siteConfig.terminal;

const quickHints = [
  { cmd: "help", hint: "Komutlar" },
  { cmd: "whoami", hint: "Biyografi" },
  { cmd: "projects", hint: "Projeler" },
  { cmd: "skills", hint: "Stack" },
  { cmd: "contact", hint: "İletişim" },
  { cmd: "clear", hint: "Temizle" },
] as const;

/** Hero altı ucmd — düz kabuk. Glow ve yaylı hover yok. */
export function TerminalPrompt() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative px-4 py-7 sm:px-6 sm:py-10"
      aria-label={`${shell.name} command shell`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3.5">
          <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {shell.name} - Terminal
          </p>
        </div>

        <motion.button
          type="button"
          onClick={openTerminal}
          initial={false}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
          className={[
            "group relative flex w-full flex-col overflow-hidden rounded-2xl text-left font-mono",
            "border border-border bg-card",
            "transition-colors duration-200",
            "hover:border-foreground/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          ].join(" ")}
        >
          <div className="relative flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 sm:px-4">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-foreground/20" />
                <span className="size-2.5 rounded-full bg-foreground/20" />
                <span className="size-2.5 rounded-full bg-foreground/20" />
              </span>
              <span className="truncate text-[0.7rem] tracking-wide text-cyan-100/55">
                {shell.name}
                <span className="text-cyan-100/30"> · </span>
                zsh
                <span className="text-cyan-100/30"> · </span>v{shell.version}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-2.5 py-1 text-[0.65rem] font-medium text-cyan-100/90 transition-colors duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/[0.12]">
              <span
                className={[
                  "size-1.5 rounded-full bg-cyan-300",
                  prefersReducedMotion ? "" : "animate-pulse",
                ].join(" ")}
              />
              <span className="hidden sm:inline">Terminali aç</span>
              <kbd className="rounded border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-[0.6rem] text-cyan-100/85">
                Ctrl `
              </kbd>
            </span>
          </div>

          <div className="relative flex flex-col gap-4 px-4 py-5 sm:gap-5 sm:px-6 sm:py-6">
            <div className="flex min-w-0 items-center gap-2.5 text-sm sm:text-base">
              <span className="font-semibold text-emerald-400/95">$</span>
              <span className="truncate font-medium tracking-tight text-cyan-50/95 transition-colors duration-300 group-hover:text-white">
                help
              </span>
              <span
                className={[
                  "inline-block h-[1.05em] w-2 rounded-[1px] bg-cyan-300/90",
                  prefersReducedMotion ? "opacity-75" : "animate-pulse",
                ].join(" ")}
                aria-hidden
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {quickHints.map((item) => (
                <span
                  key={item.cmd}
                  className="rounded-lg border border-cyan-500/20 bg-cyan-400/[0.04] px-2.5 py-1.5 text-[0.65rem] text-cyan-100/70 transition-colors duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/[0.07] sm:text-xs"
                >
                  <span className="text-emerald-400/90">$</span> {item.cmd}
                  <span className="ml-1.5 text-cyan-100/70">{item.hint}</span>
                </span>
              ))}
            </div>

            <p className="text-xs leading-5 text-cyan-100/60 sm:text-[0.8rem]">
              {shell.tagline}. Sitenin komut yüzeyi — dokunarak veya{" "}
              <span className="text-cyan-100/70">Ctrl + `</span> ile açılır.
            </p>
          </div>
        </motion.button>
      </div>
    </section>
  );
}

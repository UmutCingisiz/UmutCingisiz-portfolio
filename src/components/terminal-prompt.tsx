"use client";

import { motion } from "motion/react";

function openTerminal() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "`", code: "Backquote", ctrlKey: true }),
  );
}

/**
 * Hero'nun hemen altında duran, komut bekleyen tek satırlık şık prompt.
 * Tıklanınca (veya Ctrl+` ile) ekranı kaplayan cam terminal arayüzü açılır.
 * Terminal özelliğini gizli bir easter-egg olmaktan çıkarıp öne çıkarır.
 */
export function TerminalPrompt() {
  return (
    <section className="px-4 pb-4 sm:px-6" aria-label="İnteraktif terminal">
      <div className="mx-auto max-w-7xl">
        <motion.button
          type="button"
          onClick={openTerminal}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-signal/25 bg-[#070b0f]/80 px-5 py-4 text-left font-mono shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-signal/50 hover:shadow-[0_0_40px_var(--signal-glow)] sm:px-6"
        >
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </span>

          <span className="flex min-w-0 flex-1 items-center gap-2 text-sm">
            <span className="text-emerald-400">$</span>
            <span className="truncate text-cyan-100">
              show_projects()
            </span>
            <span className="inline-block h-4 w-2 animate-pulse bg-cyan-300/80" aria-hidden />
          </span>

          <span className="hidden items-center gap-2 text-xs text-cyan-200/60 sm:flex">
            <span className="transition-colors group-hover:text-cyan-100">interaktif terminali aç</span>
            <kbd className="rounded border border-signal/30 bg-signal/10 px-1.5 py-0.5 text-signal">
              Ctrl `
            </kbd>
          </span>
        </motion.button>
      </div>
    </section>
  );
}

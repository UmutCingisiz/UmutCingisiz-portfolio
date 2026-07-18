"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

type Line = { kind: "in" | "out" | "sys"; text: string };

export function HiddenTerminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([
    { kind: "sys", text: "portfolio-shell v2.0 — `help` yazın veya bir komut deneyin." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(() => `${siteConfig.githubUsername}@portfolio:~$`, []);

  const push = useCallback((...lines: Line[]) => {
    setHistory((items) => [...items, ...lines]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase().replace(/\(\)$/u, "");
      if (!cmd) return;
      push({ kind: "in", text: `${prompt} ${raw}` });

      switch (cmd) {
        case "help":
        case "ls":
          push({
            kind: "out",
            text: "whoami · about · skills · projects · show_projects · blog · contact · social · resume · theme · clear",
          });
          break;
        case "whoami":
          push({ kind: "out", text: `${siteConfig.name} — ${siteConfig.role}` });
          push({ kind: "out", text: siteConfig.currentFocus });
          break;
        case "about":
          push({ kind: "out", text: siteConfig.shortBio });
          break;
        case "skills":
          push({ kind: "out", text: "core: TypeScript · React/Next.js · Python · C · Java" });
          push({ kind: "out", text: "growing: PostgreSQL · Redis · DevOps · system design" });
          break;
        case "projects":
        case "show_projects":
          push({ kind: "out", text: "→ /projects sayfasına yönlendiriliyor..." });
          setOpen(false);
          router.push("/projects");
          break;
        case "blog":
          push({ kind: "out", text: "→ /blog sayfasına yönlendiriliyor..." });
          setOpen(false);
          router.push("/blog");
          break;
        case "contact":
          push({ kind: "out", text: siteConfig.email });
          push({ kind: "out", text: "→ /#contact bölümüne yönlendiriliyor..." });
          setOpen(false);
          router.push("/#contact");
          break;
        case "social":
          push({ kind: "out", text: `github: ${siteConfig.github}` });
          push({ kind: "out", text: `linkedin: ${siteConfig.linkedin}` });
          break;
        case "resume":
        case "cv":
          push({ kind: "out", text: "→ CV indiriliyor (/api/resume)..." });
          window.open("/api/resume", "_blank");
          break;
        case "theme": {
          const el = document.documentElement;
          const toDark = !el.classList.contains("dark");
          el.classList.toggle("dark", toDark);
          el.classList.toggle("light", !toDark);
          push({ kind: "out", text: `tema: ${toDark ? "dark" : "light"}` });
          break;
        }
        case "clear":
          setHistory([]);
          break;
        default:
          push({ kind: "sys", text: `komut bulunamadı: ${raw} — \`help\` deneyin.` });
      }
    },
    [prompt, push, router],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isBacktick = event.key === "`" || event.code === "Backquote";
      if (event.ctrlKey && isBacktick) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const quickCommands = ["whoami", "skills", "show_projects()", "contact", "theme"];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            aria-label="Terminali kapat"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-signal/25 bg-[#070b0f]/90 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-white/5"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-400/90" />
                <span className="size-3 rounded-full bg-amber-400/90" />
                <span className="size-3 rounded-full bg-emerald-400/90" />
                <span className="ml-3 font-mono text-xs text-cyan-200/70">
                  {prompt} portfolio-shell
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/10 px-2 py-1 font-mono text-[0.65rem] text-cyan-200/70 transition hover:text-cyan-100"
              >
                ESC
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-5 font-mono text-sm leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="space-y-1.5">
                {history.map((line, index) => (
                  <p
                    key={`${line.text}-${index}`}
                    className={
                      line.kind === "in"
                        ? "text-cyan-100"
                        : line.kind === "sys"
                          ? "text-amber-300/80"
                          : "text-cyan-200/70"
                    }
                  >
                    {line.text}
                  </p>
                ))}
              </div>

              <form
                className="mt-3 flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  runCommand(input);
                  setInput("");
                }}
              >
                <span className="shrink-0 text-emerald-400">{prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-cyan-100 caret-cyan-300 outline-none"
                  aria-label="Terminal komutu"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-3 text-xs">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-cyan-200/70 transition hover:border-signal/40 hover:text-cyan-100"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

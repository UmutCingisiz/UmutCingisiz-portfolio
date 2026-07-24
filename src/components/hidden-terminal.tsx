"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import {
  TERMINAL_EVENT,
  type TerminalEventDetail,
} from "@/lib/terminal";

type Line = { kind: "in" | "out" | "sys"; text: string };

const shell = siteConfig.terminal;

/**
 * ucmd — UC + cmd; kişisel command shell.
 * Klasik terminal paleti + ürün kimliği (isim, versiyon, boot banner).
 */
export function HiddenTerminal() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([
    {
      kind: "sys",
      text: `${shell.name} v${shell.version} — ${shell.tagline}`,
    },
    {
      kind: "sys",
      text: "boot ok · type `help` or pick a command below.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(
    () => `${siteConfig.githubUsername}@${shell.name}:~$`,
    [],
  );

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
            text: "help      — komut listesi",
          });
          push({ kind: "out", text: "whoami    — kısa biyografi" });
          push({ kind: "out", text: "projects  — projelere git / kaydır" });
          push({ kind: "out", text: "skills    — teknolojiler" });
          push({ kind: "out", text: "contact   — e-posta + iletişim formu" });
          push({ kind: "out", text: "clear     — ekranı temizle" });
          push({
            kind: "out",
            text: "also: about · blog · social · resume · status · version",
          });
          break;
        case "version":
        case "ucmd":
        case "cmd":
          push({
            kind: "out",
            text: `${shell.name} v${shell.version} · ${shell.tagline}`,
          });
          break;
        case "whoami":
          push({ kind: "out", text: `${siteConfig.name}` });
          push({ kind: "out", text: siteConfig.role });
          push({
            kind: "out",
            text: "Full-stack · Next.js / TypeScript · ürün odaklı mühendislik",
          });
          push({ kind: "out", text: siteConfig.shortBio });
          break;
        case "about":
          push({ kind: "out", text: siteConfig.shortBio });
          break;
        case "skills":
          for (const group of siteConfig.techStack) {
            push({
              kind: "out",
              text: `${group.group}: ${group.items.join(" · ")}`,
            });
          }
          break;
        case "status":
          push({
            kind: "out",
            text: `online · ${navigator.onLine ? "socket ok" : "socket lost"} · ${shell.name} ready`,
          });
          push({ kind: "out", text: `focus: ${siteConfig.availability}` });
          break;
        case "projects":
        case "show_projects": {
          push({ kind: "out", text: "→ projeler…" });
          setOpen(false);
          const onHome = window.location.pathname === "/";
          const projectsSection = document.getElementById("projects");
          if (onHome && projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            router.push("/projects");
          }
          break;
        }
        case "blog":
          push({ kind: "out", text: "→ /blog" });
          setOpen(false);
          router.push("/blog");
          break;
        case "contact":
          push({ kind: "out", text: siteConfig.email });
          push({ kind: "out", text: "→ /#contact" });
          setOpen(false);
          router.push("/#contact");
          break;
        case "social":
          push({ kind: "out", text: `github: ${siteConfig.github}` });
          push({ kind: "out", text: `linkedin: ${siteConfig.linkedin}` });
          break;
        case "resume":
        case "cv":
          push({ kind: "out", text: "→ /api/resume?v=1.1" });
          window.open("/api/resume?v=1.1", "_blank");
          break;
        case "clear":
        case "cls":
          setHistory([
            {
              kind: "sys",
              text: `${shell.name} v${shell.version} — ekran temizlendi. help yaz.`,
            },
          ]);
          break;
        default:
          push({
            kind: "sys",
            text: `${shell.name}: command not found: ${raw} — try \`help\`.`,
          });
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

    const handleTerminalEvent = (event: Event) => {
      const detail = (event as CustomEvent<TerminalEventDetail>).detail;
      if (!detail) return;
      if (detail.action === "open") setOpen(true);
      else if (detail.action === "close") setOpen(false);
      else setOpen((value) => !value);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(TERMINAL_EVENT, handleTerminalEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(TERMINAL_EVENT, handleTerminalEvent);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const quickCommands = [
    "help",
    "whoami",
    "projects",
    "skills",
    "contact",
    "clear",
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 380, damping: 32 }
          }
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            aria-label={`${shell.name} terminalini kapat`}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${shell.name} command shell`}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 420, damping: 34 }
            }
            className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#05080c]/95 shadow-[0_0_80px_rgba(0,0,0,0.75),0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-2xl ring-1 ring-cyan-400/10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.35) 3px)",
              }}
            />

            <div className="relative z-20 flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-3 rounded-full bg-red-400/90" />
                <span className="size-3 rounded-full bg-amber-400/90" />
                <span className="size-3 rounded-full bg-emerald-400/90" />
                <span className="ml-2 truncate font-mono text-xs tracking-wide text-cyan-100">
                  <span className="font-bold text-signal">{shell.name}</span>
                  <span className="text-cyan-200/50"> · </span>
                  <span className="text-cyan-200/70">{shell.tagline}</span>
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden rounded border border-cyan-400/20 bg-cyan-400/5 px-1.5 py-0.5 font-mono text-[0.6rem] text-cyan-200/60 sm:inline">
                  v{shell.version}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-white/10 px-2 py-1 font-mono text-[0.65rem] text-cyan-200/70 transition hover:border-cyan-300/30 hover:text-cyan-100"
                >
                  ESC
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="relative z-20 flex-1 overflow-y-auto px-5 py-5 font-mono text-sm leading-relaxed"
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
                          ? "text-amber-300/85"
                          : "text-cyan-200/75"
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
                  aria-label={`${shell.name} komutu`}
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>

            <div className="relative z-20 flex flex-wrap gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-3 text-xs">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-cyan-200/70 transition hover:border-cyan-400/35 hover:bg-cyan-400/5 hover:text-cyan-100"
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

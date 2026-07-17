"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const commands = {
  help: "Komutlar: whoami, projects, skills, contact, clear",
  whoami: `${siteConfig.name} - ${siteConfig.role}. ${siteConfig.currentFocus}`,
  projects: "Bloomedu ve Portfolio yayında; Zeki Dekorasyon geliştirme laboratuvarında.",
  skills: "Core: TypeScript, React/Next.js, Python, C, Java. Growing: DevOps, observability, system design.",
  contact: siteConfig.email,
} as const;

type Command = keyof typeof commands | "clear";

function isCommand(value: string): value is Command {
  return value === "clear" || value in commands;
}

export function HiddenTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "terminal unlocked. type `help` or press Ctrl+` to close.",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = useMemo(() => `${siteConfig.githubUsername}@portfolio:~$`, []);

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

  function runCommand(raw: string) {
    const normalized = raw.trim().toLowerCase();
    if (!normalized) return;

    if (isCommand(normalized)) {
      if (normalized === "clear") {
        setHistory([]);
        return;
      }
      setHistory((items) => [...items, `${prompt} ${raw}`, commands[normalized]]);
      return;
    }

    setHistory((items) => [
      ...items,
      `${prompt} ${raw}`,
      `command not found: ${raw}. Try \`help\`.`,
    ]);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 hidden rounded-full border border-border bg-background/75 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground shadow-2xl backdrop-blur-xl transition hover:border-foreground/25 hover:text-foreground md:inline-flex"
        aria-label="Gizli terminali aç"
      >
        Ctrl + `
      </button>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-background/92 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-border bg-muted/45 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            portfolio-terminal
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md border border-border px-2 py-1 font-mono text-[0.65rem] text-muted-foreground transition hover:text-foreground"
        >
          ESC
        </button>
      </div>

      <div className="max-h-[22rem] overflow-y-auto px-4 py-4 font-mono text-sm">
        <div className="space-y-2">
          {history.map((line, index) => (
            <p
              key={`${line}-${index}`}
              className={line.startsWith(prompt) ? "text-foreground" : "text-muted-foreground"}
            >
              {line}
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
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none"
            aria-label="Terminal komutu"
            autoComplete="off"
          />
        </form>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Link href="/projects" className="rounded-md border border-border px-2 py-1 text-muted-foreground hover:text-foreground">
            /projects
          </Link>
          <Link href="/#contact" className="rounded-md border border-border px-2 py-1 text-muted-foreground hover:text-foreground">
            /contact
          </Link>
        </div>
      </div>
    </div>
  );
}

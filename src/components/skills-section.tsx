import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

function StackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

function BinaryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="6" height="6" rx="1" />
      <rect x="15" y="14" width="6" height="6" rx="1" />
      <path d="M12 7h4a2 2 0 0 1 2 2v5" />
      <path d="M12 17H8a2 2 0 0 1-2-2v-5" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

type StrongSkill = {
  title: string;
  tagline: string;
  chips: readonly string[];
  icon: (props: { className?: string }) => ReactNode;
};

type GrowingSkill = {
  title: string;
  tagline: string;
  icon: (props: { className?: string }) => ReactNode;
};

const strong: readonly StrongSkill[] = [
  {
    title: "Full-Stack Ürün Geliştirme",
    tagline: "uçtan uca sistem",
    chips: ["Next.js", "TypeScript", "React", "Auth.js", "Drizzle", "PostgreSQL"],
    icon: StackIcon,
  },
  {
    title: "Algoritmik Problem Çözme",
    tagline: "C · Java · Python",
    chips: ["Veri yapıları", "Graph", "Rota mantığı", "OOP"],
    icon: BinaryIcon,
  },
];

const growing: readonly GrowingSkill[] = [
  { title: "AI & Otomasyon", tagline: "LLM akışları", icon: SparkIcon },
  { title: "DevOps & Observability", tagline: "CI · E2E · log", icon: ServerIcon },
  { title: "Sistem Mimarisi", tagline: "fail-safe · cache", icon: ShieldIcon },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-muted/20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="ambient-orb -left-20 top-20 size-64 opacity-30" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>stack.map()</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Güçlü olduğum ve büyüttüğüm alanlar.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Görsel hiyerarşi: uzmanlaştığım alanlar büyük kartlarda, aktif
            geliştirdiğim alanlar minimal kartlarda.
          </p>
        </div>

        {/* Asimetrik bento: güçlü kartlar büyük ve görsel, gelişen kartlar küçük. */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)]">
          {/* Güçlü #1 — geniş kart (2 kolon) */}
          <Reveal index={0} className="h-full lg:col-span-2">
            <TiltCard
              as="article"
              max={5}
              className="premium-card gradient-border group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7"
            >
              <div className="bento-dots pointer-events-none absolute -right-8 -top-8 size-48 rounded-full opacity-40 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal/[0.07] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-signal">
                    <span className="signal-dot size-1.5" /> güçlü alan
                  </span>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                    {strong[0].title}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    {strong[0].tagline}
                  </p>
                </div>
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-signal/25 bg-signal/[0.08] text-signal shadow-[0_0_28px_var(--signal-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <StackIcon className="size-8" />
                </div>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {strong[0].chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-lg border border-border bg-background/50 px-3 py-1.5 font-mono text-xs text-foreground/85"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* Güçlü #2 — dikey kart (2 satır) */}
          <Reveal index={1} className="h-full lg:col-span-1 lg:row-span-2">
            <TiltCard
              as="article"
              max={6}
              className="premium-card gradient-border group relative flex h-full flex-col overflow-hidden rounded-3xl p-7"
            >
              <div className="bento-dots pointer-events-none absolute -bottom-10 -left-8 size-52 rounded-full opacity-40 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
              <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-signal/25 bg-signal/[0.07] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-signal">
                <span className="signal-dot size-1.5" /> güçlü alan
              </span>
              <div className="relative mt-8 flex size-20 items-center justify-center rounded-3xl border border-signal/25 bg-signal/[0.08] text-signal shadow-[0_0_32px_var(--signal-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <BinaryIcon className="size-10" />
              </div>
              <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-foreground">
                {strong[1].title}
              </h3>
              <p className="relative mt-1 font-mono text-sm text-muted-foreground">
                {strong[1].tagline}
              </p>
              <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                {strong[1].chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-lg border border-border bg-background/50 px-3 py-1.5 font-mono text-xs text-foreground/85"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* Gelişen alanlar — küçük, minimal kartlar */}
          {growing.map((skill, index) => (
            <Reveal key={skill.title} index={index + 2} className="h-full lg:col-span-1">
              <TiltCard
                as="article"
                max={8}
                className="premium-card group relative flex h-full items-center gap-4 rounded-2xl p-5"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground transition-colors duration-300 group-hover:border-signal/30 group-hover:text-signal">
                  <skill.icon className="size-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    gelişen
                  </p>
                  <h3 className="mt-1 truncate font-semibold text-foreground">{skill.title}</h3>
                  <p className="truncate font-mono text-xs text-muted-foreground">{skill.tagline}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

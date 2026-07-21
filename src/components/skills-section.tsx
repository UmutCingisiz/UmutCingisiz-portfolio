import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";
import { siteConfig } from "@/lib/site-config";

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
  proof: string;
  icon: (props: { className?: string }) => ReactNode;
};

type GrowingSkill = {
  title: string;
  tagline: string;
  icon: (props: { className?: string }) => ReactNode;
};

/* Araç adları burada tekrar edilmiyor — o liste tek kaynak olarak
   aşağıdaki "Kullandığım teknolojiler" bölümünde. Başlıklar da bilinçli
   olarak tech.stack kategori adlarından farklı tutulur (örn. "AI & Otomasyon"
   yerine "LLM Destekli Akışlar") — aynı etiketin iki kez görünmesini önler. */
const strong: readonly StrongSkill[] = [
  {
    title: "Full-Stack Ürün Geliştirme",
    tagline: "uçtan uca sistem",
    proof: "2 yayında · 2 lab · auth'tan deploy'a",
    icon: StackIcon,
  },
  {
    title: "Algoritmik Problem Çözme",
    tagline: "rota & graph optimizasyonu",
    proof: "40+ düğümlü simülasyon · aşağıda dene",
    icon: BinaryIcon,
  },
];

const growing: readonly GrowingSkill[] = [
  { title: "LLM Destekli Akışlar", tagline: "prompt & agent tasarımı", icon: SparkIcon },
  { title: "Üretim Gözlemlenebilirliği", tagline: "structured log · tracing", icon: ServerIcon },
  { title: "Dağıtık Sistem Tasarımı", tagline: "fail-safe · ölçeklenme", icon: ShieldIcon },
];

function StrongCard({
  skill,
  icon: Icon,
  index,
}: {
  skill: StrongSkill;
  icon: (props: { className?: string }) => ReactNode;
  index: number;
}) {
  return (
    <Reveal index={index} className="h-full">
      <TiltCard
        as="article"
        max={5}
        className="premium-card gradient-border group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8"
      >
        <div className="bento-dots pointer-events-none absolute -right-10 -top-10 size-56 rounded-full opacity-40 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal/[0.07] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-signal">
            <span className="signal-dot size-1.5" /> güçlü alan
          </span>
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-signal/25 bg-signal/[0.08] text-signal shadow-[0_0_30px_var(--signal-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="size-8" />
          </div>
        </div>
        <h3 className="relative mt-7 text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
          {skill.title}
        </h3>
        <p className="relative mt-2 font-mono text-sm text-muted-foreground">
          {skill.tagline}
        </p>
        <p className="relative mt-auto pt-8 font-mono text-xs text-signal/80">
          {skill.proof}
        </p>
      </TiltCard>
    </Reveal>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-muted/20 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="ambient-orb -left-20 top-20 size-64 opacity-30" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>stack.map()</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Güçlü olduğum ve büyüttüğüm alanlar.
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Mobilde önce geliştirdiğim alanlar, ardından uzmanlaştığım alanlar.
            Geniş ekranda solda gelişen / sağda güçlü — görsel hiyerarşi olgunluğu
            gösterir.
          </p>
        </div>

        {/* Sol: gelişen (küçük) · Sağ: güçlü (büyük). İki kolon da aynı toplam
            yüksekliği paylaşır (items-stretch + flex-1 grid), kareler orantısız
            durmasın. */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          {/* SOL — geliştirdiğim alanlar */}
          <div className="flex h-full flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {"// geliştirdiğim alanlar"}
            </p>
            <div className="grid flex-1 gap-4 lg:grid-rows-3">
              {growing.map((skill, index) => (
                <Reveal key={skill.title} index={index} className="h-full">
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
                      <h3 className="mt-1 text-balance font-semibold text-foreground">{skill.title}</h3>
                      <p className="font-mono text-xs text-muted-foreground">{skill.tagline}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* SAĞ — güçlü olduğum alanlar (daha büyük) */}
          <div className="flex h-full flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {"// güçlü olduğum alanlar"}
            </p>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <StrongCard skill={strong[0]} icon={StackIcon} index={0} />
              <StrongCard skill={strong[1]} icon={BinaryIcon} index={1} />
            </div>
          </div>
        </div>

        {/* Kullandığım teknolojiler — kategori bazlı */}
        <div className="mt-16 border-t border-border pt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>tech.stack</SectionEyebrow>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Kullandığım teknolojiler
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Üretimde tercih ettiğim araçlar; her biri gerçek projelerde
              denenmiş.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.techStack.map((group, index) => (
              <Reveal key={group.group} index={index} className="h-full">
                <div className="premium-card group h-full rounded-2xl p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">
                    {group.group}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground/85 transition-colors duration-200 group-hover:border-signal/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
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

function CatalogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 4v16" />
    </svg>
  );
}

function CmsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h14" />
      <circle cx="18" cy="12" r="2" />
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

type SkillItem = {
  title: string;
  tagline: string;
  body: string;
  proof: string;
  href: string;
  icon: (props: { className?: string }) => ReactNode;
};

const strong: readonly SkillItem[] = [
  {
    title: "Full-Stack Ürün Geliştirme",
    tagline: "auth · db · CMS · deploy",
    body: "Aras Mali (Next + Sanity), Zeki Dekorasyon (SSG katalog) ve bu portfolyo (Auth.js, Drizzle, Redis) ile uçtan uca ürün yüzeyi kuruyorum.",
    proof: "portfolyo case study →",
    href: "/projects/portfolio-web",
    icon: StackIcon,
  },
  {
    title: "Performanslı Frontend / Katalog",
    tagline: "SSG · next/image · CLS",
    body: "Görsel ağırlıklı kataloglarda LCP ve layout shift’i kontrol altında tutmak için statik üretim ve görsel rezervasyonu kullanıyorum.",
    proof: "Zeki Dekorasyon →",
    href: "/projects/zeki-dekorasyon",
    icon: CatalogIcon,
  },
  {
    title: "İçerik Sistemleri & SEO",
    tagline: "Sanity · MDX · metadata",
    body: "Ofis sahibinin Studio’dan güncellediği kurumsal içerik ile typed MDX blog’u aynı disiplinle taşıyorum.",
    proof: "Aras Mali →",
    href: "/projects/aras-mali",
    icon: CmsIcon,
  },
  {
    title: "Algoritmik Problem Çözme",
    tagline: "akademik temel · lab",
    body: "DAÜ müfredatı (veri yapıları, Java/C OOP) ve sitedeki algoritma lab’ı ile trade-off’ları görünür kılıyorum.",
    proof: "algoritma lab →",
    href: "#algorithm-lab",
    icon: BinaryIcon,
  },
];

const growing: readonly SkillItem[] = [
  {
    title: "LLM Destekli Ürün Akışları",
    tagline: "prompt · adaptif öğrenme",
    body: "Bloomedu’da OpenAI entegrasyonu ve Sokratik prompt disiplini ile AI’yi ‘cevap makinesi’ olmaktan çıkarıp ürün davranışına bağladım.",
    proof: "Bloomedu →",
    href: "/projects/bloomedu",
    icon: SparkIcon,
  },
  {
    title: "Mobil + Backend Ürün Çifti",
    tagline: "React Native · Express · Postgres",
    body: "Bloomedu Client/Backend ayrımıyla oturum, oyun seviyeleri ve AI chat’i production’a yakın bir hat üzerinde taşıyorum.",
    proof: "Bloomedu repo →",
    href: "/projects/bloomedu",
    icon: ServerIcon,
  },
  {
    title: "Güvenlik & Kötüye Kullanım",
    tagline: "OAuth · rate-limit · Zod",
    body: "Guestbook ve iletişim formunda fail-closed rate limit, honeypot ve typed validation — büyüttüğüm ama her ship’te uyguladığım alan.",
    proof: "güvenlik yazısı →",
    href: "/blog/nextjs-server-actions-guvenlik",
    icon: ShieldIcon,
  },
];

function SkillCard({
  skill,
  tone,
  index,
}: {
  skill: SkillItem;
  tone: "strong" | "growing";
  index: number;
}) {
  const Icon = skill.icon;
  return (
    <Reveal index={index} className="h-full">
      <article className="surface-card group relative flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${
              tone === "strong"
                ? "border-signal/25 bg-signal/[0.07] text-signal"
                : "border-border bg-muted/40 text-muted-foreground"
            }`}
          >
            {tone === "strong" ? (
              <>
                <span className="signal-dot size-1.5" /> güçlü
              </>
            ) : (
              "gelişen"
            )}
          </span>
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border ${
              tone === "strong"
                ? "border-signal/25 bg-signal/[0.08] text-signal"
                : "border-border bg-muted/50 text-muted-foreground"
            }`}
          >
            <Icon className="size-5" />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {skill.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{skill.tagline}</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{skill.body}</p>
        <Link
          href={skill.href}
          className="mt-auto pt-5 font-mono text-xs text-signal/85 underline-offset-4 transition-colors hover:text-signal hover:underline"
        >
          {skill.proof}
        </Link>
      </article>
    </Reveal>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-muted/20 px-4 py-14 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>stack.map()</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Güçlü olduğum alanlar. Bilinçli büyüttüğüm alanlar.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Her madde gerçek bir projeye veya akademik temele bağlı — boş yetkinlik
            listesi değil.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {"// güçlü olduğum alanlar"}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {strong.map((skill, index) => (
                <SkillCard key={skill.title} skill={skill} tone="strong" index={index} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {"// geliştirdiğim alanlar"}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {growing.map((skill, index) => (
                <SkillCard
                  key={skill.title}
                  skill={skill}
                  tone="growing"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-12 sm:mt-16 sm:pt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>tech.stack</SectionEyebrow>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Kullandığım teknolojiler
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Bloomedu, Aras Mali, Zeki Dekorasyon ve bu portfolyoda gerçekten
              dokunduğum araçlar.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

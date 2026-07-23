import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { siteConfig } from "@/lib/site-config";

type SkillRow = {
  domain: string;
  detail: string;
  proof: string;
  href: string;
};

/**
 * Güçlü: canlı/lab kanıtı olan alanlar.
 * Her satır tek proje — featured listesiyle aynı hikâyeyi tekrar etmez.
 */
const strong: readonly SkillRow[] = [
  {
    domain: "Kurumsal web + CMS",
    detail: "İçerik modeli, SEO yüzeyi, randevu/iletişim akışı",
    proof: "Aras Mali",
    href: "/projects/aras-mali",
  },
  {
    domain: "Görsel katalog / SSG",
    detail: "Statik üretim, next/image, CLS ve Core Web Vitals disiplini",
    proof: "Zeki Dekorasyon",
    href: "/projects/zeki-dekorasyon",
  },
  {
    domain: "Full-stack ürün yüzeyi",
    detail: "Auth, veri modeli, form güvenliği ve CI aynı repoda",
    proof: "Bu portfolyo",
    href: "/projects/portfolio-web",
  },
  {
    domain: "Algoritma temeli",
    detail: "Veri yapıları, rota maliyeti, akademik OOP (Java/C)",
    proof: "Algoritma lab",
    href: "#algorithm-lab",
  },
];

/** Gelişen: bilinçli büyüyen alanlar — Bloomedu bir kez. */
const growing: readonly SkillRow[] = [
  {
    domain: "Mobil + API + LLM",
    detail: "React Native istemci, Express/Postgres, adaptif öğrenme akışı",
    proof: "Bloomedu",
    href: "/projects/bloomedu",
  },
  {
    domain: "Güvenlik sınırları",
    detail: "OAuth, Zod, honeypot, fail-closed rate-limit",
    proof: "Güvenlik yazısı",
    href: "/blog/nextjs-server-actions-guvenlik",
  },
  {
    domain: "Moderasyonlu ürün yüzeyi",
    detail: "GitHub oturum, onay kuyruğu, kötüye kullanım kontrolleri",
    proof: "Guestbook",
    href: "/guestbook",
  },
];

function SkillColumn({
  heading,
  tone,
  items,
}: {
  heading: string;
  tone: "strong" | "growing";
  items: readonly SkillRow[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
        <h3
          className={`text-sm font-semibold tracking-tight sm:text-base ${
            tone === "strong" ? "text-foreground" : "text-foreground/90"
          }`}
        >
          {heading}
        </h3>
        <span className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
          {items.length} alan
        </span>
      </div>

      <ol className="mt-1">
        {items.map((item, index) => (
          <Reveal key={item.domain} index={index}>
            <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border/80 py-4 sm:gap-4 sm:py-5">
              <span className="pt-0.5 font-mono text-[0.7rem] tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold tracking-tight text-foreground">
                    {item.domain}
                  </p>
                  <Link
                    href={item.href}
                    className="shrink-0 font-mono text-xs text-signal underline-offset-4 hover:underline"
                  >
                    {item.proof} →
                  </Link>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-28 overflow-hidden border-y border-border bg-muted/20 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <SectionEyebrow>stack.map()</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Yetkinlik haritası
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Güçlü olduğum alanlar ve şu an büyüttüklerim. Her satırın yanında bir
            kanıt linki var.
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SkillColumn heading="Güçlü alanlar" tone="strong" items={strong} />
          <SkillColumn heading="Gelişen alanlar" tone="growing" items={growing} />
        </div>

        <div className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
          <div className="max-w-2xl">
            <SectionEyebrow>tech.stack</SectionEyebrow>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Araç seti
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Bloomedu, Aras Mali, Zeki Dekorasyon ve bu sitede kullandığım
              araçlar.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.techStack.map((group, index) => (
              <Reveal key={group.group} index={index}>
                <div className="surface-plain h-full rounded-[var(--radius-lg)] p-4 sm:p-5">
                  <p className="font-mono text-[0.7rem] font-medium tracking-wide text-signal">
                    {group.group}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/90"
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

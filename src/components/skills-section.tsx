import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { siteConfig } from "@/lib/site-config";

type SkillRow = {
  domain: string;
  detail: string;
  proof?: string;
  href?: string;
};

/**
 * Screenshot / kanıtlı alanlar — tamamı Güçlü Alanlar’da.
 */
const strong: readonly SkillRow[] = [
  {
    domain: "Kurumsal Web ve Yönetim Paneli",
    detail:
      "Kolay içerik yönetimi, arama motoru uyumu ve hızlı randevu/iletişim altyapısı",
    proof: "Aras Mali",
    href: "/projects/aras-mali",
  },
  {
    domain: "Görsel Ürün Kataloğu",
    detail:
      "Yüksek performanslı sayfa geçişleri, mobil uyum ve akıcı kullanıcı deneyimi",
    proof: "Zeki Dekorasyon",
    href: "/projects/zeki-dekorasyon",
  },
  {
    domain: "Kişisel Web Uygulaması",
    detail:
      "Güvenli kullanıcı girişi, veritabanı yönetimi ve modern arayüz tasarımı",
    proof: "Bu portfolyo",
    href: "/projects/portfolio-web",
  },
  {
    domain: "Algoritma temeli",
    detail: "Veri yapıları, rota maliyeti, akademik OOP (Java/C)",
    proof: "Akademik",
    href: "/#about",
  },
  {
    domain: "Mobil Eğitim Uygulaması",
    detail:
      "Öğrencinin seviyesine göre uyarlanan akıllı öğrenme akışı ve mobil altyapı",
    proof: "Bloomedu",
    href: "/projects/bloomedu",
  },
  {
    domain: "Eğitim / Mobil (Serverless)",
    detail:
      "Oyun modülleri, ebeveyn analizi ve Google Drive üzerinde JSON ilerleme kaydı",
    proof: "Qid Game",
    href: "/projects/qid-game",
  },
  {
    domain: "Güvenlik Yaklaşımları",
    detail:
      "Web uygulamalarında güvenli giriş ve veri koruma standartları",
    proof: "Güvenlik yazısı",
    href: "/blog/nextjs-server-actions-guvenlik",
  },
  {
    domain: "Etkileşimli Ziyaretçi Defteri",
    detail:
      "GitHub ile güvenli oturum açma ve moderasyon sistemli mesajlaşma alanı",
    proof: "Ziyaretçi Defteri",
    href: "/guestbook",
  },
];

/** Sistem programlama ve donanım entegrasyonu vizyonu */
const growing: readonly SkillRow[] = [
  {
    domain: "PLC (Programlanabilir Mantık Denetleyicisi)",
    detail: "Endüstriyel kontrol mantığı ve saha cihazlarıyla güvenli yazılım köprüsü",
  },
  {
    domain: "Endüstriyel Otomasyon",
    detail: "Üretim hattı / SCADA bağlamında yazılım–donanım entegrasyonu",
  },
  {
    domain: "Go",
    detail: "Yüksek performanslı servisler ve eşzamanlı sistem programlama",
  },
  {
    domain: "Rust",
    detail: "Bellek güvenli sistem katmanı ve kritik performans yolları",
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
          <li key={item.domain} className="border-b border-border/80">
            <Reveal
              index={index}
              className="grid grid-cols-[2rem_1fr] gap-3 py-4 sm:gap-4 sm:py-5"
            >
              <span className="pt-0.5 font-mono text-[0.7rem] tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold tracking-tight text-foreground">
                    {item.domain}
                  </p>
                  {item.href && item.proof ? (
                    <Link
                      href={item.href}
                      className="shrink-0 font-mono text-xs text-signal underline-offset-4 hover:underline"
                    >
                      {item.proof} →
                    </Link>
                  ) : null}
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-28 overflow-hidden border-y border-border bg-muted/20 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <SectionEyebrow>stack.map()</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Yetkinlik haritası
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Üretim kanıtı olan güçlü alanlar ve bilinçli genişlettiğim disiplinler.
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
              Bloomedu, Qid Game, Aras Mali, Zeki Dekorasyon ve bu sitede kullandığım
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

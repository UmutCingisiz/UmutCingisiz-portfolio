type Tier = "Core" | "Familiar" | "Learning";

const tiers: { tier: Tier; items: { name: string; note: string }[] }[] = [
  {
    tier: "Core",
    items: [
      { name: "TypeScript / JavaScript", note: "Uygulama mantığı ve tip güvenliği" },
      { name: "React / Next.js", note: "App Router, Server Components" },
      { name: "Git", note: "Dal stratejisi ve işbirlikçi akış" },
    ],
  },
  {
    tier: "Familiar",
    items: [
      { name: "PostgreSQL", note: "İlişkisel model ve sorgular" },
      { name: "Tailwind CSS", note: "Tasarım sistemi ve responsive UI" },
      { name: "REST API", note: "Entegrasyon ve hata yönetimi" },
    ],
  },
  {
    tier: "Learning",
    items: [
      { name: "Sistem tasarımı", note: "Ölçek ve güvenilirlik kalıpları" },
      { name: "Test otomasyonu", note: "Unit ve entegrasyon testleri" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Yetenekler
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Core / Familiar / Learning — dürüst bir öz-değerlendirme; listeyi doğrudan bu
          bileşende güncelleyebilirsin.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {tiers.map(({ tier, items }) => (
            <div key={tier}>
              <h3 className="font-mono text-sm font-medium text-accent">{tier}</h3>
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.name}>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

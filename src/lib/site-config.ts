export type SkillTier = "Core" | "Familiar" | "Learning";

export const siteConfig = {
  name: "Umut İbrahim Cingisiz",
  role: "Bilgisayar Mühendisi / Full-Stack Developer",
  location: "Gazimağusa, Kıbrıs",
  availability: "Full-Stack Mühendislik Rolleri ve Yeni Fırsatlara Hazır",
  profileImage: "/profile.jpg",
  resumePath: "/resume.pdf",
  /** Ana sayfa GitHub repoları + profil yedek görseli */
  githubUsername: "UmutCingisiz",
  headline:
    "Sadece arayüz kodlamıyor; uçtan uca, ölçeklenebilir ve hataya dayanıklı sistemler tasarlıyorum.",
  description:
    "Bu portfolyo benim için basit bir vitrin değil, somut bir mühendislik kanıtıdır: hibrit render mimarisi, Drizzle ORM veritabanı şeması, fail-safe Redis cache katmanı, server action'lar ve MDX içerik altyapısı tek çatı altında çalışıyor.",
  shortBio:
    "Doğu Akdeniz Üniversitesi İngilizce Bilgisayar Mühendisliği mezunu olarak, TÜBİTAK BİGG programından 'En İyi Proje' ödülü almış ürünler geliştiriyorum. Yapay Zeka Geliştirme Kulübü'ndeki organizasyonel vizyonumu, C, Java, Python ve modern web teknolojileriyle harmanlayarak kullanıcı odaklı sistemler inşa ediyorum.",
  email: "cingisizumut1@gmail.com",
  github: "https://github.com/UmutCingisiz",
  linkedin: "https://www.linkedin.com/in/umut-ibrahim-cingisiz-878053309",
  focusAreas: [
    "Product-grade full-stack development",
    "Next.js App Router, Server Actions, Route Handlers",
    "PostgreSQL modelleme, auth, cache ve rate limit",
    "Yapay Zeka entegrasyonları ve algoritmik problem çözümü",
  ],
  stats: [
    { label: "Derece", value: "DAÜ Bilgisayar Müh." },
    { label: "Ödül", value: "TÜBİTAK BİGG (En İyi Proje)" },
    { label: "Liderlik", value: "YZ Geliştirme Kulübü" },
  ],
  techSignal: [
    "Next.js 16",
    "TypeScript",
    "React",
    "Python",
    "Java",
    "C",
    "PostgreSQL",
    "Redis",
  ],
  proofPoints: [
    "Guestbook: GitHub OAuth, moderation, strict rate limit",
    "Blog: MDX, ISR, Upstash Redis view tracking, fallback UI",
    "Core: Drizzle ORM, Zod validation, defensive programming",
  ],
  currentFocus:
    "TÜBİTAK ödüllü projemin ardından, ölçeklenebilir ve fail-safe sistemler üzerine yoğunlaşıyorum.",
  skills: [
    {
      tier: "Core" as SkillTier,
      items: [
        { name: "TypeScript / JavaScript", note: "Uygulama mantığı ve tip güvenliği" },
        { name: "React / Next.js", note: "App Router, Server Components" },
        { name: "Python / C / Java", note: "Algoritmik altyapı ve OOP" },
      ],
    },
    {
      tier: "Familiar" as SkillTier,
      items: [
        { name: "PostgreSQL", note: "İlişkisel model ve Drizzle ORM" },
        { name: "Tailwind CSS", note: "Tasarım sistemi ve responsive UI" },
        { name: "Upstash Redis", note: "Caching ve rate-limiting katmanı" },
      ],
    },
    {
      tier: "Learning" as SkillTier,
      items: [
        { name: "Sistem mimarisi", note: "Hataya dayanıklı (fail-safe) yapılar" },
        { name: "DevOps", note: "CI/CD ve deployment disiplini" },
      ],
    },
  ],
} as const;
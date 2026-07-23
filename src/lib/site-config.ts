export const siteConfig = {
  name: "Umut Cingisiz",
  role: "Bilgisayar mühendisi / Full-stack developer",
  location: "Gazimağusa, Kıbrıs",
  availability: "Full-stack mühendislik rollerine açık",
  profileImage: "/profile.jpg",
  resumePath: "/resume.pdf",
  /** Ana sayfa GitHub repoları + profil yedek görseli */
  githubUsername: "UmutCingisiz",
  /**
   * GitHub API dil alanı boş gelen repolar için dürüst override
   * (ör. Java Examples — API null dönebilir).
   */
  githubLanguageOverrides: {
    "java-examples": "Java",
    javaexamples: "Java",
  } as Record<string, string>,
  /** Portfolyo terminal — UC + cmd (kişisel + klasik shell) */
  terminal: {
    name: "ucmd",
    version: "1.0",
    tagline: "Umut Cingisiz · command shell",
  },
  headline:
    "Sadece arayüz değil — uçtan uca, ölçeklenebilir sistemler tasarlıyorum.",
  description:
    "Bu site bir vitrin değil; auth, veri modeli, rate-limit ve CI’nin birlikte çalıştığı küçük ölçekli bir mühendislik kanıtı.",
  shortBio:
    "DAÜ Bilgisayar Mühendisliği mezunu. Bloomedu ile TÜBİTAK BİGG Akdeniz’e kabul aldım; bitirme jürisinde en iyi proje seçildi. Full-stack ürünler ship ediyorum.",
  email: "cingisizumut1@gmail.com",
  github: "https://github.com/UmutCingisiz",
  /** CI / Actions — profil değil, bu portfolyo reposu */
  githubRepo: "https://github.com/UmutCingisiz/UmutCingisiz-portfolio",
  linkedin: "https://www.linkedin.com/in/umut-ibrahim-cingisiz-878053309",
  stats: [
    { label: "Derece", value: "DAÜ Bilgisayar Müh." },
    { label: "BİGG", value: "Akdeniz kabulü" },
    { label: "Odak", value: "Full-stack ürün" },
  ],
  techSignal: [
    "Next.js",
    "TypeScript",
    "React Native",
    "PostgreSQL",
    "Sanity",
    "Express",
    "Python",
    "Java",
  ],
  proofPoints: [
    "Bloomedu · RN + Express + Postgres",
    "Aras Mali · Next.js + Sanity",
    "Zeki Dekorasyon · SSG katalog",
    "Portfolyo · Auth · Drizzle · CI",
  ],
  currentFocus:
    "Ölçeklenebilir ürün mimarisi ve fail-safe veri katmanları.",
  /** Deneyim zaman çizelgesi — dürüst roller, abartısız. */
  milestones: [
    {
      period: "2026",
      title: "TÜBİTAK BİGG 1812 — Akdeniz kabulü",
      org: "Bloomedu",
      points: [
        "Bloomedu, üniversite bitirme projeleri arasından jüri tarafından en iyi proje seçildi.",
        "TÜBİTAK BİGG 1812 Akdeniz programına kabul aldık; ön jüri sunumu ve ticarileşme süreci devam ediyor.",
      ],
    },
    {
      period: "2024 — günümüz",
      title: "Yapay Zeka Geliştirme Kulübü",
      org: "Üye",
      points: [
        "Kulüp etkinliklerinde ve proje gruplarında aktif üye olarak yer aldım.",
        "AI / ürün tartışmalarına katkı vererek ekip çalışması ve teknik iletişim deneyimi kazandım.",
      ],
    },
    {
      period: "2020 — 2026",
      title: "B.Sc. Bilgisayar Mühendisliği (İngilizce)",
      org: "Doğu Akdeniz Üniversitesi",
      points: [
        "Algoritma, veri yapıları, OOP (Java/C), yazılım mühendisliği ve sistem tasarımı üzerine akademik temel.",
        "Bitirme projesi Bloomedu ile ürünleştirme ve jüri sunumu deneyimi.",
      ],
    },
  ],
  techStack: [
    {
      group: "Frontend & Mobil",
      items: [
        "React",
        "Next.js",
        "React Native",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
      ],
    },
    {
      group: "Backend & Veri",
      items: [
        "Node.js",
        "Express",
        "Server Actions",
        "PostgreSQL",
        "Drizzle ORM",
        "Redis",
        "Firebase",
      ],
    },
    {
      group: "İçerik & CMS",
      items: ["MDX", "Sanity", "Zod", "ISR / SSG"],
    },
    {
      group: "Dil & Akademik Temel",
      items: ["Python", "Java", "C", "Veri Yapıları", "OOP", "Algoritma"],
    },
    {
      group: "AI & Ürün",
      items: ["OpenAI API", "Prompt akışları", "Adaptif öğrenme", "REST"],
    },
    {
      group: "Araçlar & Operasyon",
      items: ["Git", "GitHub Actions", "Vitest", "Playwright", "Vercel", "Resend"],
    },
  ],
} as const;

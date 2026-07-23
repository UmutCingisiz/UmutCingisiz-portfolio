export const siteConfig = {
  name: "Umut Cingisiz",
  role: "Bilgisayar mühendisi · full-stack developer",
  location: "Gazimağusa, Kıbrıs",
  availability: "Full-stack rollerine açık",
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
  /** About bölümü — hero shortBio’dan farklı açı */
  description:
    "Gazimağusa merkezli çalışıyorum. Ekranı çizerken veri modeli, güvenlik sınırı ve yayın yolunu birlikte kurarım.",
  /** Hero kimlik cümlesi — BİGG detayı timeline’da */
  shortBio:
    "DAÜ bilgisayar mühendisliği mezunu. Auth, veri ve CI’nin birlikte çalıştığı full-stack ürünler kuruyorum.",
  email: "cingisizumut1@gmail.com",
  github: "https://github.com/UmutCingisiz",
  /** CI / Actions — profil değil, bu portfolyo reposu */
  githubRepo: "https://github.com/UmutCingisiz/UmutCingisiz-portfolio",
  linkedin: "https://www.linkedin.com/in/umut-ibrahim-cingisiz-878053309",
  stats: [
    { label: "Derece", value: "DAÜ bilgisayar müh." },
    { label: "Konum", value: "Gazimağusa" },
    { label: "Odak", value: "Ürün mühendisliği" },
  ],
  currentFocus: "Ölçeklenebilir ürün mimarisi ve fail-safe veri katmanları.",
  /** Deneyim zaman çizelgesi — dürüst roller, abartısız. */
  milestones: [
    {
      period: "2026",
      title: "TÜBİTAK BİGG 1812 — Akdeniz kabulü",
      org: "Bloomedu",
      points: [
        "Bitirme jürisinde en iyi proje seçildi; BİGG Akdeniz programına kabul aldık.",
      ],
    },
    {
      period: "2024 — günümüz",
      title: "Yapay zeka geliştirme kulübü",
      org: "Üye",
      points: [
        "Etkinlik ve proje gruplarında aktif üye; teknik iletişim ve ekip çalışması.",
      ],
    },
    {
      period: "2020 — 2026",
      title: "B.Sc. bilgisayar mühendisliği (İngilizce)",
      org: "Doğu Akdeniz Üniversitesi",
      points: [
        "Algoritma, veri yapıları, OOP (Java/C) ve yazılım mühendisliği temeli.",
      ],
    },
  ],
  techStack: [
    {
      group: "Frontend ve mobil",
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
      group: "Backend ve veri",
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
      group: "İçerik ve CMS",
      items: ["MDX", "Sanity", "Zod", "ISR / SSG"],
    },
    {
      group: "Dil ve akademik",
      items: ["Python", "Java", "C", "Veri yapıları", "OOP", "Algoritma"],
    },
    {
      group: "AI ve ürün",
      items: ["OpenAI API", "Prompt akışları", "Adaptif öğrenme", "REST"],
    },
    {
      group: "Araçlar ve operasyon",
      items: ["Git", "GitHub Actions", "Vitest", "Playwright", "Vercel", "Resend"],
    },
  ],
} as const;

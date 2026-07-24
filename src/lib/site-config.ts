export const siteConfig = {
  name: "Umut Cingisiz",
  role: "Bilgisayar Mühendisi · Full-Stack Developer",
  location: "Türkiye",
  availability: "Yeni iş fırsatları için uygun",
  availabilityLabel: "Müsait",
  availabilityDetail: "Yeni iş fırsatları için uygun",
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
  /** Portfolyo terminal — UC + cmd */
  terminal: {
    name: "ucmd",
    version: "1.0",
    tagline: "Komutlarla sitede gez",
  },
  headline: "Modern, Ölçeklenebilir. Yüksek Performanslı.",
  description:
    "Bir özelliği tek başına değil, veri modeli, güvenlik ve yayın adımıyla birlikte ele alırım. Amacım ekranda duran bir demo değil; bakımı yapılabilir, büyüyebilen bir ürün bırakmak.",
  shortBio:
    "Kullanıcı deneyimini merkeze alan, modern web teknolojileriyle ölçeklenebilir full-stack mimariler, yapay zeka destekli çözümler ve yüksek performanslı uygulamalar inşa ediyorum.",
  email: "cingisizumut1@gmail.com",
  github: "https://github.com/UmutCingisiz",
  /** CI / Actions — profil değil, bu portfolyo reposu */
  githubRepo: "https://github.com/UmutCingisiz/UmutCingisiz-portfolio",
  linkedin: "https://www.linkedin.com/in/umut-ibrahim-cingisiz-878053309",
  stats: [
    { label: "Okul", value: "Doğu Akdeniz Üniversitesi" },
    { label: "Konum", value: "Türkiye" },
    { label: "Odak", value: "Full-stack" },
  ],
  currentFocus: "Full-stack ürünler: auth, veri ve güvenli formlar.",
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
        "Etkinlik ve proje gruplarında yer alıyorum; ekip içinde teknik konuşmayı yürütüyorum.",
      ],
    },
    {
      period: "2020 — 2026",
      title: "Bilgisayar mühendisliği (İngilizce)",
      org: "Doğu Akdeniz Üniversitesi",
      points: [
        "Algoritma, veri yapıları, OOP (Java/C) ve yazılım mühendisliği.",
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

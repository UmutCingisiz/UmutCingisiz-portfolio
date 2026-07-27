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
   * Ana sayfa GitHub feed whitelist — yalnızca public, incelenebilir repolar.
   * Case-study only (reposuz) projeler buraya eklenmez.
   */
  pinnedRepos: ["UmutCingisiz-portfolio", "Bloomedu"] as const,
  /**
   * Kişisel hesap dışında kalan (ekip/org) veya alternatif tam adlar.
   * İlk başarılı API yanıtı kullanılır.
   */
  pinnedRepoSources: {
    Bloomedu: ["somethn7/Bloomedu", "gozdeertas/Bloomedu"],
    "UmutCingisiz-portfolio": ["UmutCingisiz/UmutCingisiz-portfolio"],
  } as Record<string, readonly string[]>,
  /**
   * GitHub API dil alanı boş gelen repolar için dürüst override
   * (ör. Java Examples — API null dönebilir).
   */
  githubLanguageOverrides: {
    "java-examples": "Java",
    javaexamples: "Java",
    // Bloomedu RN/Express repo — API bazen null dönebilir
    bloomedu: "TypeScript",
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
        "Auth.js",
        "PostgreSQL",
        "Neon",
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
      items: ["Git", "GitHub Actions", "Vercel", "Resend", "Cloudflare Turnstile"],
    },
  ],
} as const;

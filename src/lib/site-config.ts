export const siteConfig = {
  name: "Umut Cingisiz",
  role: "Bilgisayar Mühendisi / Full-Stack Developer",
  location: "Gazimağusa, Kıbrıs",
  availability: "Full-Stack Mühendislik Rolleri ve Yeni Fırsatlara Hazır",
  profileImage: "/profile.jpg",
  resumePath: "/resume.pdf",
  /** Ana sayfa GitHub repoları + profil yedek görseli */
  githubUsername: "UmutCingisiz",
  /**
   * Profilde öne çıkarılacak (pinned) repolar — owner hesabında olmasa bile
   * (ör. ekip reposu Bloomedu) GitHub aktivite bölümünde üstte gösterilir.
   */
  githubPinned: [
    {
      name: "Bloomedu",
      fullName: "somethn7/Bloomedu",
      description:
        "AI destekli kişiselleştirilmiş eğitim — TÜBİTAK BİGG En İyi Proje. Adaptif öğrenme motoru ve full-stack ürün mimarisi.",
      html_url: "https://github.com/somethn7/Bloomedu",
      language: "TypeScript",
      caseStudy: "/projects/bloomedu",
      badge: "pinned · TÜBİTAK",
    },
  ],
  /** Portfolyo terminal — UC + cmd (kişisel + klasik shell) */
  terminal: {
    name: "ucmd",
    version: "1.0",
    tagline: "Umut Cingisiz · command shell",
  },
  headline:
    "Sadece arayüz kodlamıyor; uçtan uca, ölçeklenebilir ve hataya dayanıklı sistemler tasarlıyorum.",
  description:
    "Bu portfolyo benim için basit bir vitrin değil, somut bir mühendislik kanıtıdır: hibrit render mimarisi, Drizzle ORM veritabanı şeması, fail-safe Redis cache katmanı, server action'lar ve MDX içerik altyapısı tek çatı altında çalışıyor.",
  shortBio:
    "DAÜ Bilgisayar Mühendisliği mezunu; TÜBİTAK BİGG En İyi Proje ödüllü Bloomedu üzerinde full-stack ürün geliştiriyorum.",
  email: "cingisizumut1@gmail.com",
  github: "https://github.com/UmutCingisiz",
  linkedin: "https://www.linkedin.com/in/umut-ibrahim-cingisiz-878053309",
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
    "Guestbook: GitHub OAuth, moderasyon, sıkı rate limit",
    "Blog: MDX, ISR, Upstash Redis görüntüleme, fallback UI",
    "Çekirdek: Drizzle ORM, Zod doğrulama, defensive programming",
    "Test: Vitest + Playwright E2E, CI kalite kapısı",
  ],
  currentFocus:
    "TÜBİTAK ödüllü projemin ardından, ölçeklenebilir ve fail-safe sistemler üzerine yoğunlaşıyorum.",
  /** Deneyim/liderlik zaman çizelgesi — about.engineer bölümünde bağlantılı
      noktalarla gösterilir. En yeniden en eskiye sıralı. */
  milestones: [
    {
      period: "2024 — günümüz",
      title: "Yapay Zeka Geliştirme Kulübü",
      org: "Organizasyon Lideri",
      points: [
        "Kulüp vizyonunu ve teknik yol haritasını kurdu; üye onboarding sürecini tasarladı.",
        "Atölye ve proje gruplarını koordine ederek organizasyonel liderlik deneyimi kazandı.",
      ],
    },
    {
      period: "2026",
      title: "TÜBİTAK BİGG 1812 — En İyi Proje",
      org: "Bloomedu",
      points: [
        "14 takım arasından en iyi proje seçildi; Akdeniz 2026-1 ön jüri sunumuna kabul edildi.",
        "AI destekli adaptif öğrenme motoru için ürün ve teknik sunum sorumluluğu üstlendi.",
      ],
    },
    {
      period: "2021 — 2026",
      title: "B.Sc. Bilgisayar Mühendisliği (İngilizce)",
      org: "Doğu Akdeniz Üniversitesi",
      points: [
        "Algoritma, veri yapıları ve sistem tasarımı üzerine akademik temel oluşturdu.",
      ],
    },
  ],
  techStack: [
    {
      group: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    },
    {
      group: "Backend & Veri",
      items: ["Node.js", "Server Actions", "PostgreSQL", "Drizzle ORM", "Redis"],
    },
    {
      group: "Dil & Algoritma",
      items: ["Python", "Java", "C", "Veri Yapıları", "OOP"],
    },
    {
      group: "AI & Otomasyon",
      items: ["LLM Entegrasyonu", "Prompt Akışları", "Zod", "REST API"],
    },
    {
      group: "Araçlar & Operasyon",
      items: ["Git", "GitHub Actions", "Vitest", "Playwright", "Vercel"],
    },
  ],
} as const;
import type { Locale } from "@/i18n/config";

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    blog: string;
    guestbook: string;
    guestbookShort: string;
    contact: string;
    ariaMain: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    availabilityLabel: string;
    availabilityDetail: string;
    role: string;
    headline: string;
    shortBio: string;
    contact: string;
    viewProjects: string;
    downloadCv: string;
    statsAria: string;
    profileAlt: string;
    stats: { label: string; value: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    experience: string;
    cards: {
      eyebrow: string;
      title: string;
      body: string;
    }[];
  };
  github: {
    eyebrow: string;
    title: string;
    subtitle: string;
    recentCount: string;
    allRepos: string;
    openRepo: string;
    languageUnknown: string;
    emptyFailed: string;
    emptyNone: string;
    openProfile: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    formLabel: string;
    receivedLabel: string;
    form: {
      name: string;
      email: string;
      message: string;
      placeholder: string;
      submit: string;
      sending: string;
    };
    success: {
      title: string;
      body: string;
      backToProjects: string;
      writeAnother: string;
    };
  };
  footer: {
    about: string;
    projects: string;
    blog: string;
    guestbook: string;
    contact: string;
    downloadCv: string;
  };
  lang: {
    switchToTr: string;
    switchToEn: string;
    label: string;
  };
};

const tr: Dictionary = {
  nav: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    skills: "Yetenekler",
    projects: "Projeler",
    blog: "Blog",
    guestbook: "Ziyaretçi Defteri",
    guestbookShort: "Defter",
    contact: "İletişim",
    ariaMain: "Ana navigasyon",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  hero: {
    availabilityLabel: "Müsait",
    availabilityDetail: "Yeni iş fırsatları için uygun",
    role: "Bilgisayar Mühendisi · Full-Stack Developer",
    headline: "Modern, Ölçeklenebilir. Yüksek Performanslı.",
    shortBio:
      "Kullanıcı deneyimini merkeze alan, modern web teknolojileriyle ölçeklenebilir full-stack mimariler, yapay zeka destekli çözümler ve yüksek performanslı uygulamalar inşa ediyorum.",
    contact: "İletişim",
    viewProjects: "Projeleri incele",
    downloadCv: "CV indir",
    statsAria: "Özet bilgiler",
    profileAlt: "profil fotoğrafı",
    stats: [
      { label: "Okul", value: "Doğu Akdeniz Üniversitesi" },
      { label: "Konum", value: "Türkiye" },
      { label: "Odak", value: "Full-stack" },
    ],
  },
  about: {
    eyebrow: "about.engineer",
    title: "Nasıl mühendislik yapıyorum",
    description:
      "Bir özelliği tek başına değil, veri modeli, güvenlik ve yayın adımıyla birlikte ele alırım. Amacım ekranda duran bir demo değil; bakımı yapılabilir, büyüyebilen bir ürün bırakmak.",
    experience: "Deneyim",
    cards: [
      {
        eyebrow: "01 · Sistem",
        title:
          "Sadece arayüze değil, uçtan uca ölçeklenebilir sistemler kurmayı hedefliyorum.",
        body: "Bir ekranı çizerken veri modelini, hata yolunu ve güvenlik sınırını birlikte düşünürüm.",
      },
      {
        eyebrow: "02 · Zanaat",
        title: "Kod her zaman temiz yapıda ve okunabilir olmalı.",
        body: "Kullandığım teknolojilerin net modül sınırlarıyla büyüyen projeyi takip edilebilir tutarak kodun okunabilirliğini sağlarım.",
      },
      {
        eyebrow: "03 · Yayın",
        title:
          "Sistemi sadece kurmak değil, güncellenebilir bir şekilde yönetmeyi hedefliyorum.",
        body: "Sistemi güncellemek için sadece kodu değiştirmek yeterli değil, sistemin durumunu takip etmek ve güncellemeleri yapmak gerekiyor. Bu yüzden sistemimizi güncelleyebilir ve yönetebilir hale getirmek için gerekli olan araçları ve süreçleri dikkatli bir şekilde planlayarak sağlarım.",
      },
    ],
  },
  github: {
    eyebrow: "github.signal",
    title: "Canlı geliştirme aktivitesi",
    subtitle: "Seçkin GitHub projeleri — whitelist ile filtrelenmiş gerçek feed.",
    recentCount: "seçkin repo",
    allRepos: "Tüm repolar ↗",
    openRepo: "Repoyu aç →",
    languageUnknown: "dil bilinmiyor",
    emptyFailed: "Repo listesi yüklenemedi (API limiti veya ağ).",
    emptyNone: "Henüz listelenecek seçkin repo yok.",
    openProfile: "Profili aç",
  },
  contact: {
    eyebrow: "contact.endpoint",
    title: "İletişim",
    body: "İş teklifleri ve proje işbirlikleri için buradan veya e-posta üzerinden ulaşabilirsiniz. Mesajınıza mümkün olan en kısa sürede dönüş yaparım.",
    formLabel: "secure.form",
    receivedLabel: "message.received",
    form: {
      name: "İsim",
      email: "E-posta",
      message: "Mesaj",
      placeholder: "Kısa proje özeti veya sorun…",
      submit: "Gönder",
      sending: "Gönderiliyor…",
    },
    success: {
      title: "Teşekkürler, mesajınız alındı",
      body: "En kısa sürede dönüş yapacağım.",
      backToProjects: "Projelere dön",
      writeAnother: "Yeni mesaj yaz",
    },
  },
  footer: {
    about: "Hakkımda",
    projects: "Projeler",
    blog: "Blog",
    guestbook: "Ziyaretçi Defteri",
    contact: "İletişim",
    downloadCv: "CV indir",
  },
  lang: {
    switchToTr: "Türkçe'ye geç",
    switchToEn: "Switch to English",
    label: "Dil",
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    blog: "Blog",
    guestbook: "Guestbook",
    guestbookShort: "Guest",
    contact: "Contact",
    ariaMain: "Primary navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    availabilityLabel: "Open to work",
    availabilityDetail: "Available for new opportunities",
    role: "Computer Engineer · Full-Stack Developer",
    headline: "Modern. Scalable. High performance.",
    shortBio:
      "I build UX-centered, scalable full-stack architectures with modern web technologies — AI-assisted solutions and high-performance applications.",
    contact: "Contact",
    viewProjects: "View projects",
    downloadCv: "Download CV",
    statsAria: "Quick facts",
    profileAlt: "profile photo",
    stats: [
      { label: "School", value: "Eastern Mediterranean University" },
      { label: "Location", value: "Türkiye" },
      { label: "Focus", value: "Full-stack" },
    ],
  },
  about: {
    eyebrow: "about.engineer",
    title: "How I engineer",
    description:
      "I treat a feature as more than a UI surface — data model, security, and shipping path included. The goal is not a demo on screen; it is a maintainable product that can grow.",
    experience: "Experience",
    cards: [
      {
        eyebrow: "01 · Systems",
        title:
          "I aim to build end-to-end scalable systems, not just interfaces.",
        body: "When I design a screen I also think through the data model, failure paths, and security boundaries.",
      },
      {
        eyebrow: "02 · Craft",
        title: "Code should stay clean and readable as it grows.",
        body: "Clear module boundaries keep a growing codebase followable — and make the code itself readable.",
      },
      {
        eyebrow: "03 · Shipping",
        title:
          "I don't just build systems — I make them operable and updatable.",
        body: "Changing code is not enough; you need observability and a deliberate update path. I plan the tools and processes that keep the system manageable over time.",
      },
    ],
  },
  github: {
    eyebrow: "github.signal",
    title: "Live development activity",
    subtitle: "Curated GitHub projects — a real feed filtered by whitelist.",
    recentCount: "curated repos",
    allRepos: "All repos ↗",
    openRepo: "Open repo →",
    languageUnknown: "language unknown",
    emptyFailed: "Could not load repositories (API limit or network).",
    emptyNone: "No curated repositories to list yet.",
    openProfile: "Open profile",
  },
  contact: {
    eyebrow: "contact.endpoint",
    title: "Contact",
    body: "For job offers and project collaborations, reach me here or by email. I reply as soon as I can.",
    formLabel: "secure.form",
    receivedLabel: "message.received",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      placeholder: "Short project summary or question…",
      submit: "Send",
      sending: "Sending…",
    },
    success: {
      title: "Thanks — your message was received",
      body: "I'll get back to you shortly.",
      backToProjects: "Back to projects",
      writeAnother: "Write another message",
    },
  },
  footer: {
    about: "About",
    projects: "Projects",
    blog: "Blog",
    guestbook: "Guestbook",
    contact: "Contact",
    downloadCv: "Download CV",
  },
  lang: {
    switchToTr: "Türkçe'ye geç",
    switchToEn: "Switch to English",
    label: "Language",
  },
};

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.tr;
}

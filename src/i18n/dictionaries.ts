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
    hiring: string;
    github: string;
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
    cards: {
      eyebrow: string;
      title: string;
      body: string;
    }[];
  };
  github: {
    eyebrow: string;
    title: string;
    recentCount: string;
    allRepos: string;
    openRepo: string;
    languageUnknown: string;
    emptyFailed: string;
    emptyNone: string;
    openProfile: string;
    foundationLabel: string;
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
    hiring: "Kanıt",
    github: "GitHub",
    contact: "İletişim",
    ariaMain: "Ana navigasyon",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  hero: {
    availabilityLabel: "Müsait",
    availabilityDetail: "Yeni iş fırsatları için uygun",
    role: "Bilgisayar Mühendisi · Full-Stack Developer",
    headline: "Modern, Ölçeklenebilir, Yüksek performanslı.",
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
    cards: [
      {
        eyebrow: "01 · Sistem",
        title: "Uçtan uca sistem",
        body: "Arayüzü tek başına bırakmam. Veri modelini, hata yolunu ve güvenlik sınırını aynı anda kurarım.",
      },
      {
        eyebrow: "02 · Zanaat",
        title: "Okunabilir kod",
        body: "Modül sınırlarını net tutarım. Proje büyürken kod takip edilebilir kalır.",
      },
      {
        eyebrow: "03 · Yayın",
        title: "Yayından sonra yönetim",
        body: "Kodu değiştirmek yetmez. Durumu izler, güncellemeyi planlı araç ve süreçle yönetirim.",
      },
    ],
  },
  github: {
    eyebrow: "github.signal",
    title: "Canlı geliştirme aktivitesi",
    recentCount: "repo",
    allRepos: "Tüm repolar ↗",
    openRepo: "Repoyu aç →",
    languageUnknown: "dil bilinmiyor",
    emptyFailed: "Repo listesi yüklenemedi (API limiti veya ağ).",
    emptyNone: "Henüz listelenecek seçkin repo yok.",
    openProfile: "Profili aç",
    foundationLabel: "Temel eğitim",
  },
  contact: {
    eyebrow: "contact.endpoint",
    title: "İletişim",
    body: "Yeni iş fırsatları için uygun. İş teklifleri ve proje işbirlikleri için buradan veya e-posta üzerinden ulaşabilirsiniz. Mesajınıza mümkün olan en kısa sürede dönüş yapacağım.",
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
    hiring: "Proof",
    github: "GitHub",
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
    cards: [
      {
        eyebrow: "01 · Systems",
        title: "End-to-end systems",
        body: "I do not leave the interface on its own. Data model, failure paths, and security boundaries are part of the same build.",
      },
      {
        eyebrow: "02 · Craft",
        title: "Readable as it grows",
        body: "Clear module boundaries keep a growing codebase followable.",
      },
      {
        eyebrow: "03 · Shipping",
        title: "Operable after launch",
        body: "Changing code is not enough. I watch the system and plan the tools that keep updates manageable.",
      },
    ],
  },
  github: {
    eyebrow: "github.signal",
    title: "Live development activity",
    recentCount: "repos",
    allRepos: "All repos ↗",
    openRepo: "Open repo →",
    languageUnknown: "language unknown",
    emptyFailed: "Could not load repositories (API limit or network).",
    emptyNone: "No curated repositories to list yet.",
    openProfile: "Open profile",
    foundationLabel: "Foundations",
  },
  contact: {
    eyebrow: "contact.endpoint",
    title: "Contact",
    body: "Open to new opportunities. Reach me here or by email for job offers and project collaborations. I'll get back to you as soon as possible.",
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

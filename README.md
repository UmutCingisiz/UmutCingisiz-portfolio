# Portfolyo — Umut İbrahim Cingisiz

[Next.js](https://nextjs.org) 16 (App Router) full-stack kişisel portfolyo: TypeScript, Tailwind v4, Motion, MDX, Auth.js, Drizzle ORM, Neon, Upstash Redis, Resend.

## Geliştirme

```bash
npm install
cp env.local.template .env.local   # Windows: Copy-Item env.local.template .env.local
npm run dev
```

[http://localhost:3000](http://localhost:3000)

```bash
npm run build
npm run lint
npm run check:env    # .env.local doldurduktan sonra
```

## Kod tarafında tamamlananlar

| Alan | Durum |
|------|--------|
| Tema (dark / light), header, hero, tüm bölümler | ✓ |
| 404, loading, error, global-error | ✓ |
| Favicon, apple-icon, manifest, OG görselleri | ✓ |
| SEO (sitemap, robots, metadata, Twitter) | ✓ |
| MDX projeler (3) + blog (3) case study içerikleri | ✓ |
| Guestbook, contact, auth, Drizzle schema, rate limit (kod) | ✓ |
| `env.local.template`, `check:env`, servis dokümanları | ✓ |

## Dokumanlar (sade)

- **[docs/PROJE-GELISTIRME-PLANI.md](docs/PROJE-GELISTIRME-PLANI.md)** — teknik eksikler, riskler, iyilestirme yol haritasi.
- **[docs/MANUEL-ADIMLAR.md](docs/MANUEL-ADIMLAR.md)** — production icin senin manuel tamamlayacagin adimlar.

## Dosya yapısı

```text
.
├── .github/workflows/
│   └── ci.yml                     # Lint + typecheck + test + build
├── docs/
│   ├── PROJE-GELISTIRME-PLANI.md  # Teknik eksikler, riskler ve iyilestirme plani
│   └── MANUEL-ADIMLAR.md          # Sadece senin production adimlarin
├── drizzle/
│   ├── 0000_first_toad.sql        # İlk Drizzle migration
│   └── meta/                      # Migration snapshot ve journal
├── public/
│   ├── profile.jpg                # Hero profil fotoğrafı
│   ├── resume.pdf                 # CV indirme dosyası
│   └── images/projects/
│       └── bloomedu.jpg           # Proje kapak görseli
├── scripts/
│   ├── all-schemas.sql            # Tüm tablolar (referans)
│   ├── check-assets.mjs           # Profil/CV kontrolü
│   ├── check-env.mjs              # .env doğrulaması
│   ├── contact-schema.sql         # İletişim guard tablosu (referans)
│   ├── guestbook-schema.sql       # Guestbook tablosu (referans)
│   ├── install-assets.ps1         # Windows asset kopyalama yardımcısı
│   └── test-neon.mjs              # Neon bağlantı testi
├── src/
│   ├── actions/
│   │   └── contact.ts             # İletişim formu server action
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts   # Auth.js handler
│   │   │   ├── resume/route.ts               # CV indirme + sayaç
│   │   │   └── views/[slug]/route.ts         # Blog görüntülenme API
│   │   ├── blog/
│   │   │   ├── page.tsx                      # Blog listesi
│   │   │   ├── [slug]/page.tsx               # Blog detay
│   │   │   ├── [slug]/opengraph-image.tsx    # Blog OG görseli
│   │   │   ├── loading.tsx / error.tsx
│   │   ├── guestbook/
│   │   │   ├── page.tsx                      # Ziyaretçi defteri + moderasyon
│   │   │   ├── actions.ts                    # Guestbook server actions
│   │   │   ├── loading.tsx / error.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx                      # Proje arşivi + filtre
│   │   │   ├── [slug]/page.tsx               # Proje detay
│   │   │   ├── [slug]/opengraph-image.tsx    # Proje OG görseli
│   │   │   ├── loading.tsx / error.tsx
│   │   ├── apple-icon.tsx / icon.tsx         # Dinamik favicon
│   │   ├── error.tsx / global-error.tsx      # Hata sınırları
│   │   ├── globals.css                       # Tema değişkenleri
│   │   ├── layout.tsx                        # Root layout + metadata
│   │   ├── loading.tsx / not-found.tsx
│   │   ├── manifest.ts                       # PWA manifest
│   │   ├── opengraph-image.tsx               # Ana sayfa OG
│   │   ├── page.tsx                          # Ana sayfa
│   │   ├── robots.ts / sitemap.ts            # SEO
│   │   └── favicon.ico
│   ├── auth.ts                               # Auth.js yapılandırması
│   ├── components/
│   │   ├── about-section.tsx
│   │   ├── blog/blog-view-tracker.tsx        # Blog görüntülenme sayacı
│   │   ├── contact/contact-form.tsx
│   │   ├── contact-section.tsx
│   │   ├── engineering-highlights.tsx
│   │   ├── featured-projects.tsx             # Server: proje verisi
│   │   ├── featured-projects-list.tsx        # Client: animasyonlu kartlar
│   │   ├── github-activity-section.tsx
│   │   ├── guestbook/guestbook-message-form.tsx
│   │   ├── hero.tsx
│   │   ├── mdx/mdx-components.tsx
│   │   ├── site-footer.tsx / site-header.tsx
│   │   ├── skills-section.tsx
│   │   ├── skip-to-content.tsx
│   │   ├── social-icons.tsx                  # Ortak sosyal ikonlar
│   │   ├── status-banner.tsx
│   │   ├── theme-provider.tsx / theme-toggle.tsx
│   ├── content/
│   │   ├── blog/
│   │   │   ├── mdx-ile-blog.mdx
│   │   │   ├── server-actions-ve-formlar.mdx
│   │   │   └── nextjs-server-actions-guvenlik.mdx
│   │   └── projects/
│   │       ├── bloomedu.mdx
│   │       ├── portfolio-web.mdx
│   │       └── zeki-dekorasyon.mdx
│   ├── db/
│   │   ├── client.ts                         # Drizzle singleton
│   │   └── schema.ts                         # Tablo tanımları
│   ├── lib/
│   │   ├── blog-slugs.ts / blog-views.ts
│   │   ├── contact-guard.ts
│   │   ├── content/
│   │   │   ├── paths.ts / posts.ts / projects.ts / schema.ts
│   │   ├── github-repos.ts / github-username.ts
│   │   ├── guestbook.ts / guestbook-admin.ts
│   │   ├── guestbook-counts.ts / guestbook-rate-limit.ts
│   │   ├── mdx/compile.ts
│   │   ├── neon-client.ts                    # Legacy raw SQL client
│   │   ├── redis.ts / redis-rate-limit.ts
│   │   ├── request-ip.ts
│   │   ├── site-config.ts / site-metadata.ts
│   └── types/
│       └── next-auth.d.ts
├── .env.example                   # Ortam değişkeni örnekleri
├── env.local.template             # Lokal .env şablonu
├── drizzle.config.ts              # Drizzle Kit ayarı
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vitest.config.ts               # Vitest test konfigurasyonu
```

## Ortam değişkenleri

Özet: `.env.example` ve `env.local.template`. Zorunlu (guestbook + auth): `AUTH_*`, `DATABASE_URL`, `GUESTBOOK_ADMIN_GITHUB_IDS`. İsteğe bağlı: Upstash, Resend.

## İçerik

- Projeler: `src/content/projects/*.mdx`
- Blog: `src/content/blog/*.mdx`

Proje MDX frontmatter alanları:

```yaml
title: Proje adı
description: Tek cümlelik özet
date: "2026-04-01"
tags:
  - Next.js
category: full-stack # frontend | backend | full-stack | devops
problem: Hangi problemi çözüyor?
decision: Hangi mühendislik kararı öne çıkıyor?
impact: Sonuç veya portfolyo sinyali ne?
status: live # planned | in-progress | live | archived | learning
repo: https://github.com/kullanici/repo
featured: true
```

## Database

- Drizzle schema: `src/db/schema.ts`
- Drizzle client: `src/db/client.ts`
- Drizzle config: `drizzle.config.ts`
- İlk migration: `drizzle/0000_first_toad.sql`

Mevcut Neon kurulumunda `scripts/guestbook-schema.sql` ve `scripts/contact-schema.sql` hâlâ referans olarak durur. Yeni kurulumda Drizzle migration veya SQL scriptlerden biri kullanılmalı; ikisini üst üste aynı boş DB’de çalıştırma.

Deploy: [Vercel](https://vercel.com/new).

## Devam stratejisi

Bir sonraki iterasyonlarda sira:
1. `docs/PROJE-GELISTIRME-PLANI.md` maddelerini kapatmak,
2. Ardindan `docs/MANUEL-ADIMLAR.md` ile canliya gecis adimlarini bitirmek.

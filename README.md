# Portfolyo — Umut Cingisiz

[Next.js](https://nextjs.org) 16 (App Router) full-stack kişisel portfolyo: TypeScript, Tailwind v4, Motion, MDX, Auth.js, Drizzle ORM, Neon, Upstash Redis, Resend.

Tek tema: koyu (premium siyah + signal cyan). Aydınlık mod bilinçli olarak kaldırıldı.

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
npm run typecheck
npm run test
npm run test:e2e
npm run coverage
npm run check:all    # assets + content + env + db
```

## Kod tarafında tamamlananlar

| Alan | Durum |
|------|--------|
| Koyu tema, tipografi wordmark, yüzen header + scroll progress | ✓ |
| Hero, about timeline, skills map, hiring proof | ✓ |
| Projeler: showcase, 4/3 mockup, P/D/I kartları | ✓ |
| Terminal (Ctrl+\`), magnetic CTA, tilt kartlar, Reveal spring animasyonları | ✓ |
| Algorithm Lab, GitHub activity, offline network toast, cyan focus-visible | ✓ |
| 404, loading, error, global-error | ✓ |
| Favicon, apple-icon, manifest, OG görselleri | ✓ |
| SEO (sitemap, robots, metadata, Twitter) | ✓ |
| MDX projeler (3) + blog (3) case study içerikleri | ✓ |
| Guestbook, contact, auth, Drizzle schema, rate limit (kod) | ✓ |
| Observability (structured logs) ve content kalite kapısı | ✓ |
| Vitest, Playwright E2E, coverage, CI, `check:content`, `check:all` | ✓ |

## Dokümanlar

- **[docs/PROJE-GELISTIRME-PLANI.md](docs/PROJE-GELISTIRME-PLANI.md)** — tamamlananlar, kalan kod, fikirler, tasarım sözleşmesi
- **[docs/MANUEL-ADIMLAR.md](docs/MANUEL-ADIMLAR.md)** — senin GSC / QA / yayın adımların
- **[docs/AUDIT.md](docs/AUDIT.md)** — Lighthouse + doğrulanmış boşluklar

## Dosya yapısı

```text
.
├── .github/workflows/
│   └── ci.yml                     # Lint + typecheck + test + coverage + build
├── docs/
│   ├── PROJE-GELISTIRME-PLANI.md  # Kod/UI plan + kalan işler
│   ├── MANUEL-ADIMLAR.md          # Production manuel adımlar
│   └── AUDIT.md                   # Audit snapshot
├── drizzle/
│   ├── 0000_first_toad.sql
│   └── meta/
├── public/
│   ├── profile.jpg                # Hero profil fotoğrafı
│   └── resume.pdf                 # CV indirme dosyası
├── scripts/
│   ├── check-assets.mjs
│   ├── check-content.mjs
│   ├── check-env.mjs
│   ├── install-assets.ps1
│   └── test-neon.mjs
├── src/
│   ├── actions/
│   │   └── contact.ts
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── resume/route.ts
│   │   │   └── views/[slug]/route.ts
│   │   ├── blog/
│   │   ├── guestbook/
│   │   ├── projects/
│   │   ├── apple-icon.tsx / icon.tsx
│   │   ├── error.tsx / global-error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx / not-found.tsx
│   │   ├── manifest.ts
│   │   ├── opengraph-image.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts / sitemap.ts
│   │   └── favicon.ico
│   ├── auth.ts
│   ├── components/
│   │   ├── algorithm-lab-section.tsx
│   │   ├── about-section.tsx / timeline.tsx
│   │   ├── hero.tsx / logo.tsx
│   │   ├── site-header.tsx / site-footer.tsx
│   │   ├── skills-section.tsx
│   │   ├── hiring-proof-section.tsx
│   │   ├── featured-projects.tsx / featured-projects-list.tsx
│   │   ├── github-activity-section.tsx / git-log-feed.tsx
│   │   ├── hidden-terminal.tsx / terminal-prompt.tsx
│   │   ├── magnetic.tsx / tilt-card.tsx / reveal.tsx / spotlight.tsx
│   │   ├── pdi-block.tsx / section-eyebrow.tsx
│   │   ├── contact/ / guestbook/ / blog/ / mdx/
│   │   ├── social-icons.tsx / skip-to-content.tsx / status-banner.tsx
│   ├── content/
│   │   ├── blog/
│   │   └── projects/
│   ├── db/
│   ├── lib/
│   └── types/
├── tests/
├── e2e/
│   └── portfolio-smoke.spec.ts
├── .env.example
├── env.local.template
├── drizzle.config.ts
├── playwright.config.ts
├── vitest.config.ts
└── package.json
```

## Ortam değişkenleri

Özet: `.env.example` ve `env.local.template`. Zorunlu (guestbook + auth): `AUTH_*`, `DATABASE_URL`, `GUESTBOOK_ADMIN_GITHUB_IDS`. İsteğe bağlı ama production için önerilen: Upstash, Resend, observability provider.

## İçerik

- Projeler: `src/content/projects/*.mdx`
- Blog: `src/content/blog/*.mdx`
- İçerik kalite kontrolü: `npm run check:content`

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
# coverImage: /images/projects/ornek.jpg   # isteğe bağlı; yoksa browser mockup kullanılır
```

## Kalite Kapısı

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run coverage
npm run check:content
npm run build
npm run check:all
```

`check:env` içinde Upstash ve Resend eksik görünmesi beklenen durum olabilir; canlıda tamamlandıysa yok say. Açık insan adımları: `docs/MANUEL-ADIMLAR.md`.

## Database

- Drizzle schema: `src/db/schema.ts`
- Drizzle client: `src/db/client.ts`
- Drizzle config: `drizzle.config.ts`
- İlk migration: `drizzle/0000_first_toad.sql`

```bash
npm run db:push
```

Deploy: [Vercel](https://vercel.com/new).

## Sonraki adım

1. Senin: `docs/MANUEL-ADIMLAR.md` (özellikle GSC)
2. Kod: `docs/PROJE-GELISTIRME-PLANI.md` §2 (LCP, featured sayısı, …)
3. Durum: `docs/AUDIT.md`

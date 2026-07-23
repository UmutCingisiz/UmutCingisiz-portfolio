# Portfolyo — Umut Cingisiz

Canlı: [umutcingisiz.com](https://umutcingisiz.com)

[Next.js](https://nextjs.org) 16 (App Router) full-stack kişisel portfolyo: TypeScript, Tailwind v4, Motion, MDX, Auth.js, Drizzle ORM, Neon, Upstash Redis, Resend.

**Kimlik:** Bilgisayar Mühendisi · Full-Stack Developer · Türkiye · Doğu Akdeniz Üniversitesi  
**Tema:** tek koyu palet (premium siyah + signal cyan). Aydınlık mod yok.  
**Terminal:** `ucmd` (header + ana sayfa teaser; `Ctrl+\``)

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
npm run lighthouse:home
npm run check:all    # assets + content + env + db
```

## Ana sayfa akışı

1. Hero — Müsait pill, headline, CTA’lar, profil, stats  
2. `ucmd` teaser — terminali aç  
3. About — nasıl mühendislik yapıyorum + timeline  
4. Skills — `stack.map()` kanıt haritası  
5. Featured — seçilmiş case study kartları  
6. Hiring — sticky reviewer + kanıt linkleri (CI → repo Actions)  
7. Algorithm Lab — trade-off demosu  
8. GitHub — recent repos (`signal.pulse`)  
9. Contact — form + e-posta; başarıda toast (`?contact=sent`)

Diğer rotalar: `/projects` (galeri lightbox + P/D/I), `/blog`, `/guestbook` (GitHub OAuth).

## Kod tarafında tamamlananlar

| Alan | Durum |
|------|--------|
| Koyu tema, UC wordmark, yüzen header + scroll progress | ✓ |
| Hero (kompakt Müsait), about timeline, skills map, hiring proof | ✓ |
| Projeler: showcase, kapak/mockup, galeri lightbox, P/D/I | ✓ |
| `ucmd` teaser + hidden terminal (`Ctrl+\``), magnetic CTA, tilt, Reveal | ✓ |
| Algorithm Lab, GitHub activity, offline network toast, cyan focus-visible | ✓ |
| Contact form (Zod + Resend) + başarı toast; guestbook + moderasyon | ✓ |
| 404, loading, error, global-error | ✓ |
| Favicon, apple-icon, manifest, OG / JSON-LD | ✓ |
| SEO (sitemap, robots, metadata, Twitter, www→apex) | ✓ |
| MDX projeler (4) + blog case study içerikleri | ✓ |
| Auth.js, Drizzle/Neon, Upstash rate limit, Sentry/log | ✓ |
| Vitest, Playwright E2E, coverage, CI, `check:content`, `check:all` | ✓ |

## Dokümanlar

- **[docs/PROJE-GELISTIRME-PLANI.md](docs/PROJE-GELISTIRME-PLANI.md)** — tamamlananlar, kalan kod, fikirler, tasarım sözleşmesi
- **[docs/MANUEL-ADIMLAR.md](docs/MANUEL-ADIMLAR.md)** — GSC / QA / yayın (manuel)
- **[docs/AUDIT.md](docs/AUDIT.md)** — tam site envanteri (bölüm bölüm dosya + nasıl değiştirilir) + test / boşluklar

Kimlik ve metin kaynağı: `src/lib/site-config.ts`.

## Dosya yapısı

```text
.
├── .github/workflows/
│   └── ci.yml
├── docs/
│   ├── PROJE-GELISTIRME-PLANI.md
│   ├── MANUEL-ADIMLAR.md
│   └── AUDIT.md
├── drizzle/
├── public/
│   ├── profile.jpg
│   ├── resume.pdf
│   └── images/projects/          # kapak + galeri
├── scripts/
│   ├── check-assets.mjs
│   ├── check-content.mjs
│   ├── check-env.mjs
│   ├── lighthouse-home.mjs
│   ├── install-assets.ps1
│   └── test-neon.mjs
├── src/
│   ├── actions/
│   ├── app/                      # App Router + api/auth, resume, views
│   ├── auth.ts
│   ├── components/               # hero, ucmd, about, skills, featured,
│   │                             # hiring, lab, github, contact, gallery…
│   ├── content/
│   │   ├── blog/
│   │   └── projects/             # *.mdx (4 proje)
│   ├── db/
│   ├── lib/                      # site-config, contact-schema, …
│   └── types/
├── tests/
├── e2e/
│   ├── portfolio-smoke.spec.ts
│   └── contact.spec.ts
├── env.local.template
├── .env.example
└── package.json
```

## Ortam değişkenleri

Özet: `.env.example` ve `env.local.template`.  
Zorunlu (guestbook + auth): `AUTH_*`, `DATABASE_URL`, `GUESTBOOK_ADMIN_GITHUB_IDS`.  
Production için önerilen: Upstash, Resend, Sentry / observability.

## İçerik

- Projeler: `src/content/projects/*.mdx`
- Blog: `src/content/blog/*.mdx`
- Site metinleri: `src/lib/site-config.ts`
- Kalite kapısı: `npm run check:content`

Proje MDX frontmatter:

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
# coverImage: /images/projects/ornek.jpg
# gallery: [/images/projects/ornek-1.jpg]
```

## Kalite kapısı

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

`check:env` içinde Upstash / Resend eksik görünmesi lokalde normal olabilir. Açık insan adımları: `docs/MANUEL-ADIMLAR.md`.

## Database

- Schema: `src/db/schema.ts`
- Client: `src/db/client.ts`
- Config: `drizzle.config.ts`
- Migration: `drizzle/0000_first_toad.sql`

```bash
npm run db:push
```

Deploy: Vercel (`master` → production).

## Sonraki adım

1. Manuel: `docs/MANUEL-ADIMLAR.md` (GSC, Safari, recruiter 30 sn)
2. Kod boşlukları: `docs/PROJE-GELISTIRME-PLANI.md` §2 + `docs/AUDIT.md` (lightbox focus trap, LCP yeniden ölçüm, …)
3. Metin / tasarım değiştirmek: `docs/AUDIT.md` §3 envanter (dosya + knob listesi)

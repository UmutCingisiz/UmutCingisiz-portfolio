# Proje Geliştirme Planı (Kod / UI Tarafı Tamamlandı)

Bu doküman, portfolyonun teknik ve UI geliştirme hedeflerinin kapanış durumunu tutar.
Kod tarafında belirlenen maddeler tamamlandı; bundan sonra yayına alma için kalanlar `docs/MANUEL-ADIMLAR.md` dosyasındadır.

## 1) Tamamlanan kritik teknik hedefler

- [x] Test kapsamı büyütüldü: content, helper ve observability katmanları test edildi.
- [x] E2E smoke altyapısı eklendi: ana sayfa, projeler, blog ve guestbook public akışları Playwright ile taranıyor.
- [x] İçerik kalite kapısı eklendi: her proje problem, karar, etki ve durum sinyali taşıyor.
- [x] CI kalitesi artırıldı: lint, typecheck, test, coverage, Playwright E2E ve build adımları tanımlandı.
- [x] Gözlemlenebilirlik eklendi: contact, guestbook, view ve resume akışları structured event log üretiyor.
- [x] Production observability provider kurulumu manuel adımlara eklendi (Sentry / Axiom / Datadog).
- [x] Legacy DB temizliği tamamlandı: Drizzle tek kaynak haline geldi.
- [x] Güvenlik sertleştirme görünür hale getirildi: rate-limit, OAuth, Zod, moderation ve smoke-test yaklaşımı.

## 2) Tamamlanan UI/UX geliştirmeleri

- [x] Tipografi wordmark logo (`</ Umut Cingisiz >`) + yüzen kapsül header + scroll progress.
- [x] Aydınlık mod kaldırıldı; tek koyu premium tema (siyah + signal cyan).
- [x] Arka plan: aurora glow + nokta-matris (kareli grid yerine).
- [x] Hero: Available pill, profil alanı, magnetic CTA.
- [x] Terminal: hero altı prompt + Ctrl+`` glass full-screen terminal.
- [x] Skills: güçlü / gelişen alanlar bento + tech stack (tekrar eden etiketler ayrıştırıldı).
- [x] About: milestone timeline + ambient orb atmosferi.
- [x] Hiring Proof / Quality Standards: ikon odaklı, kısa metin, ambient derinlik.
- [x] Projeler sayfası: Apple-tarzı showcase, sabit `aspect-[4/3]` browser mockup, P/D/I kartları.
- [x] Yanlış Bloomedu kapak görseli kaldırıldı; coverImage yoksa tutarlı placeholder kullanılıyor.
- [x] Tilt kartlar, Reveal scroll animasyonları, Algorithm Lab path-drawing.
- [x] GitHub activity: commit/repo sinyali (radar yüzde baskısı kaldırıldı).
- [x] Mobil (390px): yatay overflow yok, menü ve dokunma hedefleri doğrulandı.

## 3) Tamamlanan kalite kapıları

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run test`
- [x] `npm run coverage`
- [x] `npm run test:e2e`
- [x] `npm run check:content`
- [x] `npm run build`
- [x] `npm run check:all`

## 4) Yayına almadan önce kalan tek alan

Kod / UI tarafında bu faz kapandı. Bundan sonra kalanlar manuel production adımları:

- Domain satın alma
- Vercel deploy
- Production env girişi
- GitHub OAuth production callback
- Upstash Redis kurulumu
- Sentry / Axiom / Datadog observability provider kurulumu
- Resend domain doğrulama
- Production smoke test
- CV ve profil görseli güncelliği

Detaylı liste: `docs/MANUEL-ADIMLAR.md`.

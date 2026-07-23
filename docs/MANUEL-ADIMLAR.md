# Manuel Adımlar (Sadece Senin Yapacakların)

Bu dosya, yalnızca senin dış servis ve yayın adımlarını içerir.

Kod / UI tarafı tamamlandı. Bu listedeki maddeler bittiğinde proje canlıya alınabilir.

## 0) Secret rotation (ekran görüntüsü / sızıntı sonrası — ÖNCE BUNU YAP)

Eski `AUTH_SECRET`, `AUTH_GITHUB_SECRET` ve `DATABASE_URL` compromised sayılır. Vercel’e **eski değerleri yapıştırma**.

- [x] **Neon:** Console → Project → Reset password → yeni `DATABASE_URL`’i `.env.local` + Vercel’e koy.
- [x] **AUTH_SECRET:** Yerelde yenilendi (`.env.local`). Aynı değeri Vercel’e kopyala. Gerekirse tekrar: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- [x] **GitHub OAuth:** [Developer settings → OAuth Apps](https://github.com/settings/developers) → Client secret’ı sil → Generate new → `AUTH_GITHUB_SECRET` güncelle (Client ID aynı kalabilir).
- [x] **Callback URL (production):** `https://umutcingisiz.com/api/auth/callback/github`
- [x] Upstash / Resend henüz yoksa Vercel’de bu anahtarları **hiç ekleme** (boş string koyma). Kod zaten Redis/Resend yoksa kademeli kapanıyor.

## 1) Domain ve production URL

- [x] Domain satın al. (`umutcingisiz.com`)
- [x] `NEXT_PUBLIC_SITE_URL` değerini production domain ile güncelle.

## 2) Vercel yayın

- [x] Vercel'de projeyi oluştur.
- [x] Yalnızca **dolu** env değişkenlerini Vercel'e taşı (boş Upstash/Resend ekleme).
- [x] Production `AUTH_URL=https://umutcingisiz.com` (yerelde `http://localhost:3000` kalır).
- [x] İlk deploy **Ready** oldu (build log yeşil).
- [x] Domain bağlandı: `umutcingisiz.com` → Vercel (www yeşil; apex bazen “DNS Change Recommended” gösterebilir — site açılıyorsa OK).

## 3) Auth ve servisler

- [x] GitHub OAuth callback URL'ine production adresini ekle. (§0 ile aynı)
- [x] Neon için yeni `DATABASE_URL` ekle ve `npm run db:push` ile Drizzle şemasını uygula. (2026-07-21 uygulandı)
- [x] Upstash Redis oluşturunca (isteğe bağlı — blog sayacı / CV rate limit):
  - [x] `UPSTASH_REDIS_REST_URL`
  - [x] `UPSTASH_REDIS_REST_TOKEN`
  - [x] Canlı blog sayacı testi OK
- [x] Resend domain doğrulamasını tamamlayınca (iletişim formu mail göndersin):
  - [x] Hostinger’a Resend DNS kayıtları eklendi (DKIM / send MX+TXT / opsiyonel DMARC)
  - [x] Resend domain **Verified**
  - [x] `RESEND_API_KEY`
  - [x] `CONTACT_FROM_EMAIL=noreply@umutcingisiz.com`
  - [x] `CONTACT_NOTIFY_EMAIL` (bildirim alacağın adres)
  - [x] Canlı form testi: mail geldi

## 4) Observability provider (Sentry)

- [x] Sentry hesabı + Next.js projesi (`umutcingisiz` / `javascript-nextjs`, EU).
- [x] SDK kodda hazır (`@sentry/nextjs`). Yerel + Vercel env:
  - [x] `OBSERVABILITY_PROVIDER=sentry`
  - [x] `OBSERVABILITY_DSN=<DSN>`
  - [x] `NEXT_PUBLIC_SENTRY_DSN=<aynı DSN>`
- [x] Sentry’de Issues / test hatası göründü (Error Received).
- [x] Source map: `SENTRY_AUTH_TOKEN` Vercel’de (org token `org:ci`; sohbete yapıştırma).

## 5) Production smoke test

- [x] Ana sayfa açılıyor.
- [x] Guestbook: GitHub giriş + mesaj + admin moderasyon çalışıyor.
- [x] Projects: İncele → galeri / vaka çalışması; Demo yok; Kod linkleri doğru.
- [x] Blog: kart / oku → yazı açılıyor.
- [x] CV İndir: yeni PDF indiriliyor (tarayıcıda açılmıyor).
- [x] Contact formu: Resend yoksa dürüst hata mesajı (mail gitmez — beklenen).
- [x] Error / loading / 404 davranışları kontrol edildi.
- [x] Open Graph önizlemeleri doğrulandı.
- [x] Mobil genişlikte (≈390px) header menü ve proje kartları taşma yapmıyor.
- [x] En az bir Playwright smoke koşusu temiz: `npm run test:e2e`.

## 7) Google Search Console (isim araması — umutcingisiz)

Kod tarafı hazır: sitemap, robots, Person `alternateName` (umutcingisiz), title’da domain, www→apex redirect.

Senin yapman gerekenler (indeksleme için zorunlu):

- [ ] [Google Search Console](https://search.google.com/search-console) → property ekle: `https://umutcingisiz.com`
- [ ] (Varsa) `https://www.umutcingisiz.com` ayrı property veya domain property kullan
- [ ] Sahiplik doğrulama: HTML tag yöntemi → Vercel’e `GOOGLE_SITE_VERIFICATION` env ekle (meta content değeri) → redeploy
- [ ] Sitemap gönder: `https://umutcingisiz.com/sitemap.xml`
- [ ] URL Inspection → `https://umutcingisiz.com/` → **İstek dizin oluştur**
- [ ] Birkaç gün sonra “umutcingisiz” / “Umut Cingisiz” aramasını kontrol et

Not: Yeni site veya az backlink ile ilk sıralama günler–haftalar sürebilir. Kod tek başına Google’a “hemen 1. sıra” garantisi vermez; GSC + sitemap şart.

## 8) Yayın öncesi son kontrol

- [x] CV dosyası güncellendi ve deploy’a gitti (`public/resume.pdf`).
- [x] Profil görseli (`public/profile.jpg`) güncel.
- [x] Portfolyo için gallery ekranları eklendi; diğer projeler isteğe bağlı.
- [x] Aras Mali / Zeki Dekorasyon gallery ekranları eklendi (yerel geliştirme; repo/demo yok).
- [ ] Aras / Zeki yayınlanınca `repo` + `demo` / `status: live` güncelle.
- [ ] (İleriki faz) EN/TR dil desteği — ayrı i18n çalışması; bu turda bilinçli olarak ertelendi.
- [ ] Son deploy'dan sonra manuel regresyon testi yapıldı.

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
- [ ] Upstash Redis oluşturunca (isteğe bağlı — blog sayacı / CV rate limit):
  - [ ] `UPSTASH_REDIS_REST_URL`
  - [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] Resend domain doğrulamasını tamamlayınca (iletişim formu mail göndersin):
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_FROM_EMAIL=noreply@umutcingisiz.com`
  - [ ] `CONTACT_NOTIFY_EMAIL` (bildirim alacağın adres)

## 4) Observability provider (isteğe bağlı — sonraya bırakılabilir)

- [ ] Sentry, Axiom veya Datadog hesabını oluştur.
- [ ] Production projesinde hata/event takibi için log drain veya SDK entegrasyonunu tamamla.
- [ ] Vercel env tarafına provider bilgisini ekle:
  - [ ] `OBSERVABILITY_PROVIDER`
  - [ ] `OBSERVABILITY_DSN`
- [ ] Contact, guestbook, resume ve blog view akışları için provider dashboard'unda event/error göründüğünü doğrula.

## 5) Production smoke test ← ŞİMDİ BURADAYIZ

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

## 6) Yayın öncesi son kontrol

- [x] CV dosyası güncellendi ve deploy’a gitti (`public/resume.pdf`).
- [ ] Profil görseli (`public/profile.jpg`) güncel.
- [x] Portfolyo için gallery ekranları eklendi; diğer projeler isteğe bağlı.
- [ ] (İsteğe bağlı) Aras Mali / Zeki Dekorasyon için `repo` + gallery görselleri; Aras canlı olunca `demo` / `live`.
- [ ] (İleriki faz) EN/TR dil desteği — ayrı i18n çalışması; bu turda bilinçli olarak ertelendi.
- [ ] Son deploy'dan sonra manuel regresyon testi yapıldı.

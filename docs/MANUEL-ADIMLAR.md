# Manuel Adımlar (Sadece Senin Yapacakların)

Bu dosya, yalnızca senin dış servis ve yayın adımlarını içerir.

Kod / UI tarafı tamamlandı. Bu listedeki maddeler bittiğinde proje canlıya alınabilir.

## 0) Secret rotation (ekran görüntüsü / sızıntı sonrası — ÖNCE BUNU YAP)

Eski `AUTH_SECRET`, `AUTH_GITHUB_SECRET` ve `DATABASE_URL` compromised sayılır. Vercel’e **eski değerleri yapıştırma**.

- [x] **Neon:** Console → Project → Reset password → yeni `DATABASE_URL`’i `.env.local` + Vercel’e koy.
- [x] **AUTH_SECRET:** Yerelde yenilendi (`.env.local`). Aynı değeri Vercel’e kopyala. Gerekirse tekrar: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- [x] **GitHub OAuth:** [Developer settings → OAuth Apps](https://github.com/settings/developers) → Client secret’ı sil → Generate new → `AUTH_GITHUB_SECRET` güncelle (Client ID aynı kalabilir).
- [x] **Callback URL (production):** `https://umutcingisiz.com/api/auth/callback/github`
- [ ] Upstash / Resend henüz yoksa Vercel’de bu anahtarları **hiç ekleme** (boş string koyma). Kod zaten Redis/Resend yoksa kademeli kapanıyor.



## 1) Domain ve production URL

- [x] Domain satın al. (`umutcingisiz.com`)
- [x] `NEXT_PUBLIC_SITE_URL` değerini production domain ile güncelle.



## 2) Vercel yayın

- [x] Vercel'de projeyi oluştur. (deploy başlatıldı)
- [ ] Yalnızca **dolu** env değişkenlerini Vercel'e taşı (boş Upstash/Resend ekleme).
- [ ] Production `AUTH_URL=https://umutcingisiz.com` (yerelde `http://localhost:3000` kalır).
- [ ] İlk deploy **Ready** oldu (build log yeşil).
- [ ] Domain bağlandı: `umutcingisiz.com` → Vercel



## 3) Auth ve servisler

- [x] GitHub OAuth callback URL'ine production adresini ekle. (§0 ile aynı)
- [x] Neon için yeni `DATABASE_URL` ekle ve `npm run db:push` ile Drizzle şemasını uygula. (2026-07-21 uygulandı)
- [ ] Upstash Redis oluşturunca (isteğe bağlı):
  - [ ] `UPSTASH_REDIS_REST_URL`
  - [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] Resend domain doğrulamasını tamamlayınca:
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_FROM_EMAIL=noreply@umutcingisiz.com`
  - [ ] `CONTACT_NOTIFY_EMAIL` (bildirim alacağın adres)



## 4) Observability provider

- [ ] Sentry, Axiom veya Datadog hesabını oluştur.
- [ ] Production projesinde hata/event takibi için log drain veya SDK entegrasyonunu tamamla.
- [ ] Vercel env tarafına provider bilgisini ekle:
  - [ ] `OBSERVABILITY_PROVIDER`
  - [ ] `OBSERVABILITY_DSN`
- [ ] Contact, guestbook, resume ve blog view akışları için provider dashboard'unda event/error göründüğünü doğrula.



## 5) Production smoke test

- [ ] Ana sayfa, projects, blog, guestbook, contact, resume akışları çalışıyor.
- [ ] Error / loading / 404 davranışları kontrol edildi.
- [ ] Open Graph önizlemeleri doğrulandı.
- [ ] Mobil genişlikte (≈390px) header menü ve proje kartları taşma yapmıyor.
- [ ] En az bir Playwright smoke koşusu deploy öncesi temiz: `npm run test:e2e`.



## 6) Yayın öncesi son kontrol

- [ ] CV dosyası (`public/resume.pdf`) öğrenci profilinden ziyade DAÜ İngilizce Bilgisayar Mühendisliği mezunu profesyonel profilini yansıtıyor.
- [ ] Profil görseli (`public/profile.jpg`) güncel.
- [ ] (İsteğe bağlı) Proje ekran görüntüleri: `public/images/projects/<slug>/` altına 3–4 PNG koy; MDX frontmatter `gallery` dizisine `src` / `alt` / `caption` ekle. Demo linki yerine vaka çalışması görselleri tercih edilir.
- [ ] (İsteğe bağlı) Aras Mali / Zeki Dekorasyon için `repo` linkini frontmatter'a ekle; Aras Mali production Sanity/env bağları tamamlanınca status'u `live` yap ve isteğe bağlı `demo` (canlı site) ekle.
- [ ] (İleriki faz) EN/TR dil desteği — ayrı i18n çalışması; bu turda bilinçli olarak ertelendi.
- [ ] Son deploy'dan sonra manuel regresyon testi yapıldı.
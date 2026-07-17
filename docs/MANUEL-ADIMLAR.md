# Manuel Adimlar (Sadece Senin Yapacaklarin)

Bu dosya, yalnizca senin dis servis ve yayin adimlarini icerir.

Kod tarafi tamamlandi. Bu listedeki maddeler bittiginde proje canliya alinabilir.

## 1) Domain ve production URL

- [ ] Domain satin al.
- [ ] `NEXT_PUBLIC_SITE_URL` degerini production domain ile guncelle.

## 2) Vercel yayin

- [ ] Vercel'de projeyi olustur.
- [ ] Tum env degiskenlerini `.env.local` ile uyumlu sekilde Vercel'e tasi.

## 3) Auth ve servisler

- [ ] GitHub OAuth callback URL'ine production adresini ekle.
- [ ] Neon icin `DATABASE_URL` ekle ve deploy oncesi `npm run db:push` ile Drizzle semasini uygula.
- [ ] Upstash Redis olustur ve:
  - [ ] `UPSTASH_REDIS_REST_URL`
  - [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] Resend domain dogrulamasini tamamla ve:
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_FROM_EMAIL`
  - [ ] `CONTACT_NOTIFY_EMAIL`

## 4) Observability provider

- [ ] Sentry, Axiom veya Datadog hesabini olustur.
- [ ] Production projesinde hata/event takibi icin log drain veya SDK entegrasyonunu tamamla.
- [ ] Vercel env tarafina provider bilgisini ekle:
  - [ ] `OBSERVABILITY_PROVIDER`
  - [ ] `OBSERVABILITY_DSN`
- [ ] Contact, guestbook, resume ve blog view akislari icin provider dashboard'unda event/error gorundugunu dogrula.

## 5) Production smoke test

- [ ] Ana sayfa, projects, blog, guestbook, contact, resume akislari calisiyor.
- [ ] Theme toggle, error/loading ve 404 davranislari kontrol edildi.
- [ ] Open Graph onizlemeleri dogrulandi.
- [ ] En az bir Playwright smoke kosusu deploy oncesi temiz: `npm run test:e2e`.

## 6) Yayin oncesi son kontrol

- [ ] CV dosyasi (`public/resume.pdf`) ogrenci profilinden ziyade DAU Ingilizce Bilgisayar Muhendisligi mezunu profesyonel profilini yansitiyor.
- [ ] Profil gorseli (`public/profile.jpg`) guncel.
- [ ] Son deploy'dan sonra manuel regresyon testi yapildi.

# Manuel Adimlar (Sadece Senin Yapacaklarin)

Bu dosya, yalnizca senin dis servis ve yayin adimlarini icerir.

## 1) Domain ve production URL

- [ ] Domain satin al.
- [ ] `NEXT_PUBLIC_SITE_URL` degerini production domain ile guncelle.

## 2) Vercel yayin

- [ ] Vercel'de projeyi olustur.
- [ ] Tum env degiskenlerini `.env.local` ile uyumlu sekilde Vercel'e tasi.

## 3) Auth ve servisler

- [ ] GitHub OAuth callback URL'ine production adresini ekle.
- [ ] Upstash Redis olustur ve:
  - [ ] `UPSTASH_REDIS_REST_URL`
  - [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] Resend domain dogrulamasini tamamla ve:
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_FROM_EMAIL`
  - [ ] `CONTACT_NOTIFY_EMAIL`

## 4) Production smoke test

- [ ] Ana sayfa, projects, blog, guestbook, contact, resume akislari calisiyor.
- [ ] Theme toggle, error/loading ve 404 davranislari kontrol edildi.
- [ ] Open Graph onizlemeleri dogrulandi.

## 5) Yayin oncesi son kontrol

- [ ] CV dosyasi (`public/resume.pdf`) guncel.
- [ ] Profil gorseli (`public/profile.jpg`) guncel.
- [ ] Son deploy'dan sonra manuel regresyon testi yapildi.

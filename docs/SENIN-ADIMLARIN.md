# Senin yapman gerekenler

Bu liste yalnızca **senin** tamamlayabileceğin adımları içerir: içerik, servis kurulumu, deploy ve manuel doğrulama.

Teknik borç ve kod eksiklikleri için: [EKSIKLIKLER.md](./EKSIKLIKLER.md)

Son güncelleme: 2026-07-17

---

## Tamamlananlar

- [x] `public/profile.jpg` — profil fotoğrafı
- [x] `public/resume.pdf` — CV dosyası
- [x] `.env.local` — OAuth + Neon yapılandırıldı
- [x] Neon tabloları oluşturuldu
- [x] GitHub OAuth uygulaması oluşturuldu
- [x] `GUESTBOOK_ADMIN_GITHUB_IDS` ayarlandı
- [x] `siteConfig` kişiselleştirildi (isim, e-posta, GitHub, LinkedIn)
- [x] 3 proje MDX mevcut: `bloomedu`, `portfolio-web`, `zeki-dekorasyon`
- [x] 3 blog yazısı mevcut

---

## Şimdi yap (lokal doğrulama)

Detay: [ADIM-3-DOGRULAMA.md](./ADIM-3-DOGRULAMA.md)

```bash
npm run check:all
npm run build
npm run dev
```

- [ ] Ana sayfa: profil fotoğrafı, hero metni, sosyal linkler, GitHub aktiviteleri
- [ ] `/projects` — 3 proje kartı; `problem`, `decision`, `status` alanları görünüyor mu?
- [ ] `/projects/bloomedu`, `/projects/portfolio-web`, `/projects/zeki-dekorasyon` — detay sayfaları ve impact blokları
- [ ] `/blog` — 3 yazı listeleniyor mu?
- [ ] `/guestbook` — GitHub giriş → mesaj gönder → moderasyon → onay → listede görünür
- [ ] `/#contact` — form testi (Resend yoksa hata normal; `mailto:` linki çalışmalı)
- [ ] CV indir butonu — `resume.pdf` iniyor mu?
- [ ] Tema toggle — dark / light geçişi

---

## İçerik kalitesi (kariyer vitrini)

### Projeler (`src/content/projects/*.mdx`)

- [ ] `bloomedu.mdx` — repo URL'sini doğrula (`somethn7/Bloomedu` senin katkın mı?)
- [ ] `bloomedu` — `demo` linki varsa ekle; kapak görseli (`coverImage`) doğru mu kontrol et
- [x] `zeki-dekorasyon.mdx` — `repo`/`coverImage` alanlari eklendi, demo baglantisi yayin politikasina gore sonra netlestirilecek
- [ ] Her iki projede `problem`, `decision`, `impact` metinlerini kendi gerçek tecrübene göre güçlendir
- [x] Portfolyonun kendisi icin yeni bir case study MDX eklendi (`portfolio-web.mdx`)
- [ ] Proje detaylarına ekran görüntüsü veya mimari diyagram ekle

### Blog (`src/content/blog/*.mdx`)

- [x] `nextjs-server-actions-guvenlik.mdx` — bos `coverImage` alani temizlendi
- [ ] En az 1 yeni teknik yazı ekle (tercihen kendi projenden öğrendiklerin)

### Genel

- [ ] `src/lib/site-config.ts` — `headline`, `description`, `skills`, `proofPoints` metinlerini son kez gözden geçir
- [ ] GitHub repo açıklamalarını portfolyo proje başlıklarıyla uyumlu hale getir
- [ ] CV (`resume.pdf`) güncel mi?

---

## Asset temizliği

- [x] `public/images/projects/bloomedu.jpg.png` — gereksiz kopya silindi
- [x] `public/images/projects/desktop.ini` — Windows artefakti silindi
- [ ] Kullanılmayan default SVG'ler (`public/next.svg`, `vercel.svg` vb.) — ihtiyaç yoksa temizle

---

## Domain ve yayın (şimdilik ertelendi)

Detay: [ADIM-2-ENV.md](./ADIM-2-ENV.md) · [KURULUM-SERVISLER.md](./KURULUM-SERVISLER.md)

Canliya alma sirasi:

1. Domain al ve `NEXT_PUBLIC_SITE_URL` degerini guncelle.
2. Vercel projesini olustur, tum env degiskenlerini tas.
3. GitHub OAuth callback URL'ine production adresini ekle.
4. Upstash Redis bilgilerini ekle (view counter + resume rate limit).
5. Resend domain dogrulamasini tamamla, anahtarlari gir.
6. Production smoke test ile guestbook/contact/blog/projects akisini dogrula.

- [ ] Domain satın al
- [ ] `NEXT_PUBLIC_SITE_URL` — production domain ile güncelle
- [ ] Vercel deploy oluştur
- [ ] Vercel ortam değişkenlerini `.env.local` ile eşleştir
- [ ] GitHub OAuth callback URL'ine production adresini ekle
- [ ] Upstash Redis — `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- [ ] Resend — domain doğrulama + `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL`
- [ ] Deploy sonrası production üzerinde manuel smoke test

---

## Son kalite turu (yayın öncesi)

- [ ] Mobil: 360px, 390px, tablet genişliklerinde kontrol
- [ ] Lighthouse — performance, accessibility, SEO
- [ ] Open Graph önizlemesi (Twitter/LinkedIn debugger)
- [ ] Guestbook moderasyon akışı production'da test
- [ ] İletişim formu production'da e-posta gönderiyor mu?

---

## Hızlı komutlar

```bash
npm run check:assets   # profil + CV
npm run check:env      # .env.local
npm run check:db       # Neon bağlantısı
npm run check:all      # hepsi
npm run build
npm run lint
```

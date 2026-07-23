# Manuel adımlar (senin yapacakların)

Kod tarafı canlıda. Bu dosya yalnızca dış servis, doğrulama ve insan QA adımlarını tutar.

Geliştirme backlog → [`PROJE-GELISTIRME-PLANI.md`](./PROJE-GELISTIRME-PLANI.md) · Audit → [`AUDIT.md`](./AUDIT.md)

---

## Açık maddeler

### 1) Google Search Console (umutcingisiz araması)

Kod hazır: sitemap, robots, Person `alternateName`, title’da domain, www→apex.

- [ ] [Search Console](https://search.google.com/search-console) → property: `https://umutcingisiz.com`
- [ ] (İsteğe bağlı) `www` ayrı property veya domain property
- [ ] HTML tag doğrulama → Vercel’e `GOOGLE_SITE_VERIFICATION` → redeploy
- [ ] Sitemap: `https://umutcingisiz.com/sitemap.xml`
- [ ] URL Inspection → ana sayfa → **İstek dizin oluştur**
- [ ] Birkaç gün sonra “umutcingisiz” / “Umut Cingisiz” ara

Yeni sitede sıralama günler–haftalar sürebilir; kod tek başına 1. sıra garantisi vermez.

### 2) İnsan QA / regresyon

- [x] Lightbox Escape — Playwright e2e (`project gallery lightbox closes with Escape`)
- [ ] Safari smoke (ana sayfa, menü, proje lightbox)
- [ ] Mobil menü Escape / focus trap (cihazda)
- [ ] Contact gerçek gönderim (Resend üzerinden mail)
- [ ] Recruiter 30 sn: BİGG dili dürüst mü? (Akdeniz kabulü + jüri en iyi proje — abartı yok)
- [ ] Son deploy sonrası kısa regresyon (home → projects → blog → guestbook → contact)

### 3) Proje yayınlandığında

- [ ] Aras Mali / Zeki Dekorasyon canlı olunca MDX: `repo` + `demo` + `status: live`
- [ ] (İleriki faz) EN/TR i18n metin onayı — ayrı geliştirme işi

---

## Tamamlanan ops (özet — tekrar etme)

| Alan | Durum |
|------|--------|
| Secret rotation (Neon, AUTH_SECRET, GitHub OAuth) | ✅ |
| Domain + `NEXT_PUBLIC_SITE_URL` | ✅ `umutcingisiz.com` |
| Vercel deploy + `AUTH_URL` | ✅ |
| Neon `db:push` | ✅ |
| Upstash Redis (blog sayacı / rate limit) | ✅ |
| Resend domain + canlı form mail | ✅ |
| Sentry + source maps | ✅ |
| Production smoke (guestbook, CV, OG, mobil menü, e2e) | ✅ |
| CV / profil / galeriler (Bloomedu, Aras, Zeki ekranları) | ✅ |

**Callback:** `https://umutcingisiz.com/api/auth/callback/github`

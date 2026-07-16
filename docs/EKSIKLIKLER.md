# Proje eksiklikleri, potansiyel hatalar ve teknik borçlar

Bu liste **kod tarafında** giderilmesi gereken eksiklikleri, riskleri ve iyileştirme fırsatlarını içerir.  
Kullanıcıya özel kurulum ve içerik adımları için: [SENIN-ADIMLARIN.md](./SENIN-ADIMLARIN.md)

Son tarama: 2026-07-17 (gece revizyonu)

---

## Kritik (P0)

- [x] **Dokümantasyon drift** — README ve checklist'ler yeni envantere göre güncellendi (3 proje, 3 blog).
- [x] **Portfolyo case study'si** — `src/content/projects/portfolio-web.mdx` eklendi.
- [x] **Test altyapısı** — Vitest kuruldu, temel unit/content testleri eklendi.
- [x] **CI pipeline** — `.github/workflows/ci.yml` ile lint + typecheck + test + build hattı eklendi.

---

## Yüksek (P1)

### Ölü kod

- [x] `src/lib/views.ts` — kaldırıldı.
- [x] `src/lib/actions/blog-actions.ts` — kaldırıldı.
- [x] `siteConfigChecklist` (`src/lib/site-config.ts`) — kullanılmayan kontrol bloğu temizlendi.

### Veri katmanı tutarsızlığı

- [x] `listRejectedEntries()` (`src/lib/guestbook.ts`) — Drizzle standardına taşındı.
- [ ] `contact_submission_guard.email_normalized` kolon adı — hem e-posta hem IP anahtarı (`email:…`, `ip:…`) saklıyor; isim yanıltıcı.

### UX / kullanıcıya sızan iç detay

- [x] `src/components/blog/blog-view-tracker.tsx` — teknik env adı yerine kullanıcı dostu mesaj gösteriliyor.
- [x] `src/actions/contact.ts` — DB guard hatasında fail-open davranış ve daha sade kullanıcı mesajları uygulanıyor.

### Güvenlik ve bağımlılık

- [ ] `next-auth@5.0.0-beta.31` — beta sürüm; stable çıkışta migration planı gerekir.
- [ ] Blog view POST endpoint (`/api/views/[slug]`) — public; slug whitelist + IP rate limit var ama abuse yüzeyi izlenmeli.

---

## Orta (P2)

### İçerik şeması

- [x] `zeki-dekorasyon.mdx` — frontmatter alanları güncellendi (repo/coverImage eklendi, demo notu bırakıldı).
- [x] `nextjs-server-actions-guvenlik.mdx` — boş `coverImage` alanı temizlendi.
- [ ] Blog frontmatter'da `problem/decision/impact` yok — projelerde var, blog'da yok; tutarlılık kararı verilmeli.

### Asset ve repo hijyeni

- [x] `public/images/projects/bloomedu.jpg.png` — silindi.
- [x] `public/images/projects/desktop.ini` — silindi.
- [x] `repomix-output.xml` — dosya silindi ve `.gitignore`'a eklendi.
- [ ] `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — Next.js default asset'leri; kullanılmıyorsa temizlenebilir.

### Geliştirici deneyimi

- [x] `npm run typecheck` script'i eklendi.
- [ ] Prettier / format script'i yok — stil tutarlılığı manuel.
- [x] `docs/ADIM-3-DOGRULAMA.md` — hardcoded ID kaldırıldı, genel ifade kullanıldı.

---

## Düşük (P3)

- [ ] **Middleware yok** — security header'ları veya global rate limit için `middleware.ts` düşünülebilir.
- [ ] **Çift GitHub username kaynağı** — `siteConfig.githubUsername` + `NEXT_PUBLIC_GITHUB_USERNAME`; tek kaynağa indirilebilir.
- [ ] **Honeypot başarı redirect** (`contact.ts`) — botlar `?contact=sent` ile başarılı görünür; kasıtlı ama metrikleri şişirir.
- [ ] **Drizzle + SQL script çift yolu** — `scripts/*.sql` ve `drizzle/` birlikte duruyor; yeni kurulumda hangisinin kullanılacağı net ama yanlışlıkla ikisi birden çalıştırılabilir.
- [ ] **Erişilebilirlik audit'i** — skip-to-content var ama tam a11y turu (kontrast, focus trap mobil menü) yapılmamış.
- [ ] **Performans budget** — Lighthouse hedefleri tanımlı değil; özellikle hero görseli ve Motion bundle izlenmeli.

---

## Özet tablo

| Alan | Durum | Not |
|------|--------|-----|
| Auth (GitHub OAuth) | ✓ Kod hazır | Env gerekli |
| Guestbook + moderasyon | ✓ Kod hazır | Drizzle/SQL karışık |
| Contact form | ⚠ Kısmi | Resend olmadan e-posta gitmez |
| Blog view counter | ⚠ Kısmi | Redis olmadan sayaç pasif |
| CV download tracking | ⚠ Kısmi | Redis + rate limit |
| SEO (sitemap, OG, robots) | ✓ | Production URL env'e bağlı |
| Error/loading sayfaları | ✓ | App + alt route'lar |
| Testler | ✓ | Vitest temel kapsama eklendi |
| CI | ✓ | GitHub Actions quality hattı eklendi |
| Dead code | ✓ | Kullanılmayan modüller temizlendi |

---

## Önerilen düzeltme sırası (kod tarafı)

1. Dead code temizliği (`views.ts`, `blog-actions.ts`)
2. `listRejectedEntries` → Drizzle'a taşı
3. Blog view tracker mesajını kullanıcı dostu yap
4. `.gitignore` güncelle (`repomix-output.xml`, `desktop.ini`)
5. Vitest + temel schema/content testleri
6. GitHub Actions: `lint` + `build` + `check:assets`
7. Portfolyo self case study MDX geri ekle

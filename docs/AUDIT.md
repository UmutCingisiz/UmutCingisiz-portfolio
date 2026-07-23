# Audit snapshot

**Tarih:** 2026-07-23  
**Kapsam:** Güncel ürün durumu + Lighthouse referansı.

Detaylı kod backlog → [`PROJE-GELISTIRME-PLANI.md`](./PROJE-GELISTIRME-PLANI.md) · İnsan adımları → [`MANUEL-ADIMLAR.md`](./MANUEL-ADIMLAR.md)

---

## 1) Lighthouse (production home)

| Metrik | Değer |
|--------|--------|
| Ölçüm | 2026-07-22 · mobile |
| URL | https://umutcingisiz.com/ |
| Performance | **72** |
| Accessibility | **93** |
| Best Practices | **100** |
| SEO | **100** |
| LCP | **3.8 s** (kod iyileşti; **yeniden ölçüm bekleniyor**) |
| CLS | **0** |

Kaynak skorlar: `src/lib/lighthouse-metrics.ts`. Yeniden ölç: `npm run lighthouse:home` (çıktı `.lighthouse/`).

### LCP kod (2026-07-23)

- Hero `opacity: 0` giriş kaldırıldı  
- Profil: `priority` + `fetchPriority="high"` + `quality={70}` + sıkı `sizes`  
- Mobil orb/glow kapatıldı  
- Font: `display: swap`; mono `preload: false`  

Skor satırını yalnızca yeni ölçümden sonra güncelle.

---

## 2) Ürün gerçeği

| Madde | Durum |
|-------|--------|
| Mobile menü a11y | ✅ |
| Sahte git SHA | ✅ kaldırıldı |
| Hiring CTA görünür | ✅ |
| Contact fail-closed | ✅ |
| Canonical / JSON-LD / www→apex | ✅ |
| CI → `githubRepo`/actions | ✅ |
| quality.standards / pinned.proof | ✅ kaldırıldı |
| `stack.map` + `tech.stack` | ✅ |
| Featured ana sayfa | ✅ **3** proje |

Home: Hero → Terminal → About → Skills → Featured → Hiring → Lab → GitHub → Contact.

---

## 3) Eski P0–P2

Kapandı (menü a11y, hash, hiring CTA, canonical, fail-closed, JSON-LD, deep-link, quality kaldırma). Kart yoğunluğu kısmi.

---

## 4) Boşluklar

| # | Madde | Durum |
|---|--------|--------|
| 1 | LCP | ✅ Kod uygulandı — production’da `npm run lighthouse:home` ile skoru güncelle |
| 2 | GSC | ✅ Kod hazır (sitemap, robots, `GOOGLE_SITE_VERIFICATION`, Person `alternateName`, www→apex). **Hesap adımları** → [`MANUEL-ADIMLAR.md`](./MANUEL-ADIMLAR.md) §1 |
| 3 | Featured 2 vs 3 | ✅ `getFeaturedProjects(3)` |
| 4 | Ölü Quality bileşeni | ✅ Yok |
| 5 | Guestbook cache | ✅ `force-dynamic` kalktı; onaylı liste `unstable_cache` 60s + tag |
| 6 | Manuel QA | ✅ Playwright smoke + lightbox Escape e2e. **Safari / recruiter 30 sn** hâlâ senin — [`MANUEL-ADIMLAR.md`](./MANUEL-ADIMLAR.md) §2 |
| 7 | V3 (Turnstile, i18n, coverage eşiği, guestbook e-posta girişi) | ⏸ Bilinçli ertelendi — e-posta girişi değerlendirmesi plan §3’te |

Seviye: **Solid Mid** (2026-07-22). Tam rescore yapılmadı.

---

## 5) Docs birleşimi

Eski audit/design/lighthouse raporları silindi. Kalan üç dosya: plan · manuel · bu audit.

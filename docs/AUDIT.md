# Audit snapshot

**Tarih:** 2026-07-23  
**Kapsam:** Eski `SITE-AUDIT.md` + consensus + remaining + Lighthouse özetinin birleşik, güncel hali.

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
| LCP | **3.8 s** (açık borç) |
| CLS | **0** |

Kaynak skorlar UI’da: `src/lib/lighthouse-metrics.ts`. Yeniden ölç: `npm run lighthouse:home`.

---

## 2) Ürün gerçeği (doğrulandı)

| Madde | Durum |
|-------|--------|
| Mobile menü a11y (`aria-*`, Escape, focus trap) | ✅ |
| Sahte git SHA | ✅ kaldırıldı |
| Hiring CTA hover-only | ✅ her zaman görünür |
| Contact fail-closed rate-limit | ✅ + test |
| Canonical per-route | ✅ |
| Contact success’te form gizleme | ✅ |
| JSON-LD (Person / WebSite / Article / Project) | ✅ |
| www → apex redirect | ✅ |
| CI linki `githubRepo`/actions | ✅ |
| `quality.standards` home’da | ❌ kaldırıldı (ölü dosya kalabilir) |
| GitHub `pinned.proof` | ❌ kaldırıldı |
| `stack.map` güçlü / gelişen + tek kanıt/satır | ✅ |
| Deep-link id’ler (`#skills`, `#hiring`, `#algorithm-lab`, …) | ✅ |

Home sırası: Hero → Terminal → About → Skills → Featured → Hiring → Lab → GitHub → Contact.

---

## 3) Eski audit backlog (P0–P2)

| Pri | Madde | Sonuç |
|-----|--------|--------|
| P0 | Menü a11y · fake hash · hiring CTA | **Kapandı** |
| P1 | Hero yoğunluk · canonical · fail-closed · status helper · contact success | **Kapandı** |
| P2 | JSON-LD · deep-link · guestbook Hide/env sızıntısı · quality claim | **Kapandı** (quality = kaldırma) |
| P2 | Kart tekrarı | **Kısmi** — token/surface var, yoğunluk devam edebilir |

Sprint 0–5 kod işleri tamam. Post-release insan QA ve GSC açık.

---

## 4) Açık boşluklar

1. **LCP ~3.8s** — en net teknik borç  
2. **GSC** — indeksleme / isim araması (manuel)  
3. **Featured 2 vs 3** — UI limit ile MDX uyumsuz  
4. **Ölü Quality bileşeni** — home’dan kalkmış; dosya yoksa kapalı  
5. **Guestbook `force-dynamic`** — ISR/cache fırsatı  
6. **Manuel QA** — Safari, lightbox klavye, recruiter dürüstlük  
7. **V3 isteğe bağlı** — Turnstile, i18n, coverage fail eşiği  

Seviye okuması (2026-07-22 audit): **Solid Mid**. Birçok trust bug’ı o zamandan beri kapandı; tam rescore yapılmadı.

---

## 5) Docs tarama sonucu (2026-07-23)

| Eski dosya | Ne içeriyordu | Sonuç |
|------------|---------------|--------|
| `AUDIT-REMAINING.md` | Batch durumu + V3 | İçerik buraya + plan’a taşındı → **silindi** |
| `DESIGN-SYSTEM.md` | Token / tilt / CTA | Özet plan §5’e → **silindi** |
| `SITE-AUDIT.md` | 948 satır tarihsel audit | Güncel özet burası → **silindi** |
| `SITE-AUDIT-CONSENSUS.md` | Sprint 0–5 roadmap | Kapandı kabul → **silindi** |
| `PROJE-GELISTIRME-PLANI.md` | “Hepsi bitti” iddiası | **Yenilendi** (kalan + fikirler) |
| `MANUEL-ADIMLAR.md` | Ops checklist | **Sadeleştirildi** (açık + tamamlanan özet) |
| `lighthouse-home.json` | Ham Lighthouse | Regenerable → **silindi** (script `.lighthouse/`) |
| `lighthouse-home.summary.json` | Kısa skor | Metrics + bu dosya → **silindi** |

**Eski “kod bitti, sadece manuel kaldı” iddiası abartılıydı** — GSC + LCP + V3 + featured uyumsuzluğu hâlâ var.

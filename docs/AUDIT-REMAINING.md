# Audit — Kalan İşler

**Güncelleme:** 2026-07-22 (kalan High/Med kapanış batch)

---

## Bu batch’te kapatıldı

| Madde | Durum |
|-------|--------|
| Quality + tarihli Lighthouse footnote | ✅ checklist korundu; skor bento yok; `lighthouse-metrics.ts` bağlı |
| Home ambient-orb bütçesi | ✅ ≤1 (yalnızca Hero) |
| Hero CLS (max-h vs aspect) | ✅ aspect rezervi; çelişen `max-h` kaldırıldı |
| OG dil parity | ✅ `Müsait` |
| Skills growing proof linkleri | ✅ Bloomedu / blog / guestbook |
| Contact fail-closed unit test | ✅ `tests/contact-fail-closed.test.ts` + `decideContactRateLimit` |

---

## P1 — daha önce kapatıldı

| Madde | Durum |
|-------|--------|
| Gerçek Lighthouse + tarih | ✅ `src/lib/lighthouse-metrics.ts` |
| Contact Playwright e2e | ✅ `e2e/contact.spec.ts` + `CONTACT_E2E_MOCK=1` |
| `error.tsx` noindex | ✅ robots meta inject |

Yeniden ölçüm: `npm run lighthouse:home` → skorları `lighthouse-metrics.ts` içine kopyala.

---

## Manuel QA (insan — release checklist)

- [ ] Safari smoke
- [ ] Keyboard navigation (desktop + mobil menü)
- [ ] Screen reader: menü `aria-expanded`
- [ ] Contact gerçek gönderim (1 mesaj, spam değil)
- [ ] Recruiter 30 sn testi

---

## V3 / uzun dönem (release blocker değil)

| Madde | Not |
|-------|-----|
| Guestbook ISR / cache | Hâlâ `force-dynamic` |
| Turnstile / anon guestbook | Bilinçli GitHub-only |
| Full Motion bundle audit | Lab code-split yapıldı |
| Coverage expansion (actions) | Gate şu an content + request-ip |
| EN/TR i18n | Opsiyonel |
| Perf iyileştirme | Mobil Lighthouse — deploy sonrası yeniden ölç; hedef CLS↓ / LCP↓ |

---

## Dil kuralı (bilinçli)

- Eyebrow / terminal / teknik etiketler → EN  
- Açıklama gövdesi → TR  

---

## Not

Hero tilt/glow ve Hiring/Quality ayrımı senior review’da “dokunma / düşük ROI” olarak bırakıldı.

# Audit — Kalan İşler

**Güncelleme:** 2026-07-22 (P1 kapanış + UX polish sonrası)

---

## P1 — kapatıldı

| Madde | Durum |
|-------|--------|
| Gerçek Lighthouse + tarih | ✅ `src/lib/lighthouse-metrics.ts` + Quality UI (`docs/lighthouse-home.summary.json`) |
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
| Perf iyileştirme | Mobil Lighthouse Perf **53** / CLS **0.408** — sonraki iterasyon hedefi |

---

## Dil kuralı (bilinçli)

- Eyebrow / terminal / teknik etiketler → EN  
- Açıklama gövdesi → TR  

---

## Not

Hero tilt/glow ve Hiring/Quality ayrımı senior review’da “dokunma / düşük ROI” olarak bırakıldı.

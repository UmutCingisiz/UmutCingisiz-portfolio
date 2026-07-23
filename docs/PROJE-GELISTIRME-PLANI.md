# Proje geliştirme planı

**Güncelleme:** 2026-07-23  
**Dal:** `feature/portfolio-v2` → `master`  
**Site:** https://umutcingisiz.com

Bu dosya kod/UI tarafını tutar. Senin dış servis adımların → [`MANUEL-ADIMLAR.md`](./MANUEL-ADIMLAR.md). Skor / boşluk özeti → [`AUDIT.md`](./AUDIT.md).

---

## 1) Tamamlananlar (özet)

Kritik teknik: Vitest + Playwright smoke, content gate, CI (`lint` / `typecheck` / `test` / `coverage` / `e2e` / `build`), Drizzle tek DB kaynağı, fail-closed contact rate-limit, structured logging + Sentry, JSON-LD, per-route canonical, www→apex redirect.

Ürün yüzeyi: Hero (Müsait, kısa bio, ayrı CTA hover’ları), About + dürüst timeline (kulüp **üye**, BİGG **Akdeniz kabulü**, 2020–2026), `stack.map()` güçlü/gelişen kanıt satırları + `tech.stack`, Featured case study, Hiring (sticky reviewer + kanıt linkleri; CI `githubRepo`/actions), Algorithm Lab, GitHub recent repos (`signal.pulse`, pinned yok), Contact, Guestbook (OAuth + moderasyon), Blog MDX, proje galeri lightbox.

Kasıtlı kaldırmalar: `quality.standards` (hiring ile örtüşüyordu), GitHub `pinned.proof`, sahte SHA’lar, hero tech chip tekrarı.

---

## 2) Kalan kod işleri (öncelik)

| Öncelik | Madde | Not |
|---------|--------|-----|
| P1 | **LCP** | Kod uygulandı. Deploy sonrası `npm run lighthouse:home` → metrics + AUDIT |
| P2 | **Kart yoğunluğu** | Surface varyantları var; bazı bölümlerde hâlâ fazla kart hissi |
| P3 | **Turnstile / anon** | İsteğe bağlı |
| P3 | **Coverage gate** | Eşik altında fail yok |
| P3 | **i18n** | Ayrı faz |

Aras Mali / Zeki Dekorasyon canlıya alınca: MDX’te `repo`, `demo`, `status: live` güncelle (içerik senin adımın da — manuel dosyada).

---

## 3) Ekstra fikirler (zorunlu değil)

1. **Time-to-projects analytics** — hero → projeler tıklama süresi.
2. **Case study “next up”** — detayda sonraki featured CTA güçlendir.
3. **Resume PDF version bump** — CV cache bust.
4. **Guestbook weekly digest** — onay bekleyenleri Resend ile mail.
5. **Lab ↔ Skills deep-link** — lab’dan skills’e dönüş.
6. **Performance budget CI** — Lighthouse / bundle eşiği.
7. **EN locale** — ayrı faz.

### Guestbook: e-posta ile giriş (değerlendirme)

**Fikir:** Herkes GitHub kullanmıyor; magic link / e-posta OTP ile de deftere yazılabilsin.

| | |
|--|--|
| **Artı** | Erişim artar; stajyer / recruiter / aile üyesi engeli kalkar |
| **Eksi** | Spam / sahte kimlik riski yükselir; moderasyon yükü artar |
| **Teknik** | Auth.js `Resend` / Nodemailer provider + `email` verified; şemada `github_id` opsiyonel veya `provider_user_id` genellemesi; rate-limit e-posta başına |
| **Öneri** | **Şimdilik GitHub kalsın.** E-posta girişi ayrı faz: önce Resend magic link, ardından `guestbook_entry` kimlik alanını sağlayıcıdan bağımsız hale getir. GitHub’ı kaldırma — ikisini yan yana sun. |

Karar: kodlanmadı; onayınla V3 işine alınabilir.

---

## 4) i18n (bilinçli ertelenen)

Tüm UI + MDX + `site-config` çevirisi gerekir. Yarım dil anahtarı production kalitesini düşürür. Ayrı faz: App Router locale segment veya `next-intl`; metinleri sen onayladıktan sonra.

---

## 5) Tasarım sözleşmesi (eski DESIGN-SYSTEM özeti)

**North star:** Trust ↑ veya navigation ↑ veya engineering capability ↑ — değilse kaldır.

| Konu | Kural |
|------|--------|
| Motion | `--motion-fast/base/slow/reveal`; en fazla 2 dikkat çeken motion; `prefers-reduced-motion` → tilt/orb kapalı |
| Glow | Soft `--signal-glow`, strong yalnızca `.btn-signal`; sayfada ≤1 `ambient-orb` |
| Tilt | Yalnızca Hero profil + Featured + Projects arşiv kartları |
| Radius | `--radius-sm\|md\|lg\|xl` — keyfi büyük rounded yasak |
| Kartlar | `surface-plain` / `surface-card` / `surface-interactive` |
| CTA | Primary `.btn-signal` · Secondary outline/ghost · kartta tek primary |
| Bölüm ritmi | Eyebrow → h2 → lead → içerik; her home bölümünün **tek** amacı |

Home amaçları: Hero (kim+CTA) → About (nasıl) → Skills (harita) → Featured (vaka) → Hiring (kanıt link) → Lab (trade-off) → GitHub (repo sinyali) → Contact (dönüşüm). Quality bölümü yok.

---

## 6) Kalite komutları

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run test:e2e
npm run check:content
npm run build
npm run check:all
npm run lighthouse:home   # çıktı .lighthouse/ — skorları metrics + AUDIT’e kopyala
```

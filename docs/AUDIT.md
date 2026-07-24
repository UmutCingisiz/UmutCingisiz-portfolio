# Portfolio Site Audit — Code Review (filtresiz)

**Tarih:** 2026-07-24  
**Site:** https://umutcingisiz.com  
**Commit referansı:** `d624247`  
**Yöntem:** Kod tarama + production içerik + Lighthouse snapshot (`lighthouse-metrics.ts`) + yapısal SEO/robots kontrolü  
**Plan / manuel:** [`PROJE-GELISTIRME-PLANI.md`](./PROJE-GELISTIRME-PLANI.md) · [`MANUEL-ADIMLAR.md`](./MANUEL-ADIMLAR.md)  
**İnteraktif özet:** Cursor Canvas → `portfolio-site-audit.canvas.tsx`

---

## 0) Tek cümlelik hüküm

**Solid Mid (7.3/10)** — mühendislik yüzeyi junior değil; Hiring + Projects + Guestbook “gerçekten iyi” sinyali veriyor. Hero / ucmd gürültüsü + Perf 72 + ince blog, FAANG polish ve “üst düzey portfolyo” barının altında.

| Soru | Cevap |
|------|--------|
| Junior mu? | **Hayır** |
| Mid mi? | **Evet — Solid Mid / erken Senior eşiği** |
| Senior seviyesi mi? | **Kısmen** (ürün disiplini var; görsel sadelik + perf + içerik derinliği eksik) |
| FAANG’e yaklaşmış mı? | **Hayır** |
| Template mi? | **Hayır** — ama dark-cyan + terminal + eyebrow dili template *hissi* riski taşıyor |

### Recruiter — ilk 30 saniye (filtresiz)

> “Bu çocuk gerçekten mühendislik yapıyor (Bloomedu/BİGG, P/D/I, auth, CI) — ama site biraz fazla ‘dark cyan terminal portfolio’ klişesine yaslanıyor. Hero + ucmd + eyebrow gürültüsü template hissini besliyor; Hiring + Projects sayfası ise tersine ikna ediyor.”

İki kutup arası: **“Gerçekten iyi”** (kanıt yüzeyleri) vs **“Template kullanmış”** (görsel dil). Şu an ikisinin karışımı; net skor Hiring’e tıklayana kadar belirsiz kalıyor.

---

## 1) Ölçümler

| Kaynak | Sonuç |
|--------|--------|
| Lighthouse mobile (2026-07-22) | Perf **72** · A11y **93** · BP **100** · SEO **100** |
| LCP | **3.8 s** (hedef ≤2.5s) |
| CLS | **0** |
| Vitest | 28/28 |
| `check:content` | OK |
| Playwright | CI’da; lokal Chromium bu ortamda yok |
| GSC / Safari / recruiter 30s | Manuel — `MANUEL-ADIMLAR.md` |

---

## 2) Yüzey puanları (özet)

| Yüzey | Puan | 1 satır |
|-------|------|---------|
| Hero | **6.2** | Marka var; first viewport şişkin + LCP |
| Navbar | **8.0** | A11y güçlendi; section coverage eksik |
| ucmd / Terminal | **5.8** | Karakter; ikinci hero maliyeti |
| About | **7.2** | İyi omurga; kart title duvarı |
| Skills | **8.1** | Kanıt linkli harita |
| Featured | **7.4** | P/D/I güçlü; tilt/magnetic |
| Hiring | **8.8** | En net recruiter path |
| Algorithm Lab | **6.0** | Dürüst; scroll maliyeti |
| GitHub | **6.6** | Gerçek API; zayıf repo listesi |
| Contact | **8.6** | Success + fail-closed |
| Footer | **6.2** | Minimal; CV yok |
| Home (bütün) | **7.4** | |
| /projects | **8.2** | |
| /projects/[slug] | **8.0** | |
| /blog | **5.4** | |
| /guestbook | **8.0** | |
| SEO | **8.4** | |
| Performance | **5.2** | |
| A11y | **8.1** | |
| Kod kalitesi | **8.0** | |
| **GENEL** | **7.3** | |

---

## 3) Bölüm bölüm review

Her bölüm: ❌ hatalar · ⚠️ eksikler · 💡 öneriler · ⭐ iyi örnekler · 🎯 nasıl · 📈 etki

---

### 3.1 Navbar (`site-header.tsx`, `logo.tsx`)

**Puan: 8.0/10**

❌ Logo alt satırı `fullstack/engineer` — `siteConfig.role` ile uyumsuz (`logo.tsx`).  
⚠️ Nav’da hiring / contact / github yok; IntersectionObserver bu id’leri izliyor ama menüde yok.  
⚠️ Desktop İletişim hâlâ `Magnetic` içinde.  
💡 Sticky + scroll progress + skip link + mobil dialog a11y (overflow-hidden, Escape, focus trap) — iyi.  
⭐ [rauno.me](https://rauno.me) — minimal nav, sıfır süs.  
🎯 Logo tagline’ı `siteConfig.role`’dan al; nav’a “İletişim”; Magnetic kaldır.  
📈 **High** (ilk izlenim + tutarlılık)

---

### 3.2 Hero (`hero.tsx`)

**Puan: 6.2/10**

❌ First viewport bütçesi aşılıyor: pill + role + H1 + headline + bio + 3 CTA + sosyal + foto + current_focus + 3 stat.  
❌ LCP adayı foto + client Hero → Perf 72 / LCP 3.8s ile uyumlu.  
⚠️ Headline artık düz renk (iyi) ama foto üzerinde overlay hâlâ dikkat çalıyor.  
⚠️ Geist = çok kullanılan “AI portfolio” fontu; marka ayrışması zayıf.  
💡 Müsait pill kompakt; Magnetic CTA’lardan kalktı — doğru yön.  
⭐ [linear.app](https://linear.app) hero — tek headline, tek CTA, bol boşluk.  
⭐ [delba.dev](https://delba.dev) — sade, tipografi odaklı.  
🎯 CTA’yı 2’ye indir (İletişim + Projeler; CV secondary/footer). Stats’ı about’a taşı veya tek satır meta yap. Overlay’i kaldır veya sadece hover’da göster. Server Component iskelet + küçük client ada.  
📈 **High**

---

### 3.3 ucmd / Terminal (`terminal-prompt.tsx`, `hidden-terminal.tsx`)

**Puan: 5.8/10**

❌ Home’da Hero’dan hemen sonra ikinci “vitrin” — dikkat ve scroll bütçesini yer.  
⚠️ Recruiter’ın bir kısmı “gimmick” diye geçer; diğer kısmı sever — risk asimetrik.  
💡 Komutla gezinme gerçek özellik; Ctrl+` tutarlı.  
⭐ Karakter istiyorsan: tek satır teaser (kart değil) veya sadece header `ucmd`.  
🎯 Ana sayfada büyük glow kartı küçült; detayı overlay’e bırak.  
📈 **High** (home conversion / first impression)

---

### 3.4 About + Experience (`about-section.tsx`, `timeline.tsx`)

**Puan: 7.2/10**

❌ 01/02/03 kart **title**’ları aşırı uzun — H3 gibi değil, paragraf gibi duruyor.  
⚠️ “Deneyim” timeline dürüst (kulüp **üye**, BİGG **kabul**) — iyi; ama iş/staj satırı yok.  
💡 Flat hover kartlar (tilt yok) — gürültü azaltıldı.  
⭐ [brittanychiang.com](https://brittanychiang.com) about — kısa, scannable.  
🎯 Title’ları ≤8 kelime; body’de detay. İsteğe bağlı tek “şu an arıyorum” satırı.  
📈 **Medium**

---

### 3.5 Skills (`skills-section.tsx`)

**Puan: 8.1/10**

💡 Güçlü/gelişen + kanıt linki — portfolyolarda nadir ve değerli.  
⚠️ `tech.stack` pill ormanı hâlâ “chip dump” riski.  
❌ Domain metinleri ile featured projeler hafif tekrar.  
⭐ Aynı kanıt modeli: her skill → tek proje/yazı.  
🎯 Pill sayısını grup başına ≤5 tut; akademik dilleri daralt.  
📈 **Medium**

---

### 3.6 Featured Projects (`featured-projects-list.tsx`)

**Puan: 7.4/10**

❌ Her kartta hardcoded `Full-stack` chip — `category` frontmatter yok sayılıyor.  
⚠️ `TiltCard` + `Magnetic` + `gradient-border` — Task 4 after/hiring’de sadeleşti; burada hâlâ gürültü.  
💡 P/D/I blokları recruiter için altın standart.  
💡 Mobil `object-contain` kapak — doğru yön.  
⭐ [reads.cv](https://reads.cv) case cards — az efekt, çok içerik.  
🎯 Tilt’i kaldır veya sadece desktop hover; chip’i `p.category`’den al; Magnetic kaldır.  
📈 **High**

---

### 3.7 Hiring Proof (`hiring-proof-section.tsx`)

**Puan: 8.8/10**

💡 Site’nin en güçlü “beni işe al” yüzeyi: her kart → gerçek URL (CI, case, blog, guestbook).  
💡 Lighthouse skorunu **dürüst** göstermek güven artırır (72 gizlenmiyor).  
⚠️ Hâlâ “kart duvarı”; quick link grid + proof list biraz tekrar.  
⭐ Bu bölümü koru; sadeleştir ama silme.  
🎯 Quick links’i tek satıra indir; Lighthouse’u Perf iyileşince güncelle.  
📈 **High** (zaten yüksek — koru)

---

### 3.8 Algorithm Lab (`algorithm-lab-*`)

**Puan: 6.0/10**

⚠️ Hiring’den sonra yorgunluk bölgesi; trade-off güzel ama işe alım için zorunlu değil.  
💡 “Canlı solver değil” dürüstlüğü iyi.  
🎯 Home’dan çıkarıp `/lab` veya Skills altına tek link yapmayı değerlendir.  
📈 **Medium** (home yoğunluğu)

---

### 3.9 GitHub Activity (`github-activity-section.tsx`)

**Puan: 6.6/10**

💡 Gerçek API, sahte SHA yok — önceki audit’ten ilerleme.  
❌ Feed’de `README`, `Instructive-Basic_HTML-CSS` gibi zayıf sinyaller “junior repo dump” hissi verir.  
🎯 Whitelist / exclude list; veya sadece `siteConfig` pin’leri.  
📈 **High** (recruiter güveni)

---

### 3.10 Contact (`contact-section.tsx`, `contact-form.tsx`, `contact-success-state.tsx`)

**Puan: 8.6/10**

💡 Success state form’u DOM’dan kaldırıyor — double-submit yok.  
💡 Fail-closed rate-limit, Zod, honeypot, Resend.  
⚠️ Copy’de “staj” geçiyor; availability “yeni iş fırsatları” — framing drift.  
⚠️ Honeypot bot’a `?contact=sent` → sahte başarı toast.  
⭐ Cal.com / Stripe-style success: form yerine net onay paneli (sizde var).  
🎯 Staj cümlesini netleştir veya kaldır; honeypot’u sessiz no-op yap.  
📈 **Medium**

---

### 3.11 Footer (`site-footer.tsx`)

**Puan: 6.2/10**

❌ Domain URL hardcode (`https://umutcingisiz.com`) — `getSiteOrigin()` değil.  
⚠️ CV indir yok; About yok.  
⚠️ “Next.js · TypeScript · …” tech flex satırı zayıf sinyal.  
🎯 CV + e-posta + Projeler/Blog; origin helper; tech satırını sil veya tek satır yap.  
📈 **Medium**

---

### 3.12 Home — Responsive / Scroll

**Puan: 7.0/10**

💡 `max-w-6xl`, scroll-mt, hash scroll var.  
⚠️ Mobilde bölüm sayısı (9) uzun; sticky hiring desktop’ta iyi, mobilde yığılır.  
⚠️ Loading “Yükleniyor…” flash’ı (Suspense) hissettirebiliyor.  
🎯 Home’dan Lab veya ucmd kartını incelt; skeleton’ları daha sessiz yap.  
📈 **Medium**

---

### 3.13 `/projects` + `[slug]`

**Puan: 8.2 / 8.0**

💡 Live / WIP ayrımı + P/D/I + gallery lightbox focus trap — güçlü.  
⚠️ `ambient-orb`, Tilt, Magnetic, hardcoded Full-stack chip hâlâ var.  
⚠️ Aras/Zeki henüz live değil — dürüst status iyi; etki henüz “hedef” dilinde.  
⭐ Case study derinliği: gallery + MDX body.  
🎯 Projects sayfasında tilt/orb kes; category chip düzelt.  
📈 **High**

---

### 3.14 Blog

**Puan: 5.4/10**

❌ 3 yazı, hepsi ~1 dk — “blog var” kutusu işaretli ama derinlik yok.  
⚠️ Kartlarda Tilt + gradient-border.  
💡 MDX pipeline, reading time, related, views API — teknik omurga iyi.  
⭐ Bir tane derin yazı (Bloomedu mimarisi / BİGG süreci) tüm blog puanını taşır.  
🎯 1 long-form + 2 kısa tut; listede tilt kaldır.  
📈 **High**

---

### 3.15 Guestbook

**Puan: 8.0/10**

💡 OAuth + moderasyon = gerçek ürün.  
⚠️ Boş/az mesaj = social proof zayıf.  
⚠️ Form pending `aria-busy` / disable eksik olabilir.  
🎯 2–3 onaylı mesaj ekle (arkadaş/mentor); form a11y eşitle.  
📈 **Medium**

---

## 4) Tasarım checklist

| Madde | Durum | Not |
|-------|--------|-----|
| İlk izlenim (5 sn) | ⚠️ | İsim + BİGG okunur; gürültü template riski |
| Renk paleti | ✅ | Dark + signal cyan tutarlı; purple-slop yok |
| Font | ⚠️ | Geist — güvenli ama jenerik |
| Spacing | ✅/⚠️ | Ritim var; kart içi 4/5 karışık |
| Grid | ✅ | max-w-6xl tutarlı |
| Responsive | ✅/⚠️ | Çalışır; proje görselleri düzeldi; home uzun |
| Dark mode | ✅ | Tek tema — bilinçli |
| Hover | ⚠️ | Bazı yerlerde fazla (tilt/magnetic) |
| Animasyon | ⚠️ | Reveal iyi; orb/tilt fazla |
| Scroll | ⚠️ | Çok bölüm |
| CTA | ⚠️ | Hero’da 3 yarışıyor |
| Kartlar | ⚠️ | About/Hiring sadeleşti; Featured/Projects hâlâ zengin |

---

## 5) UX checklist

| Madde | Durum |
|-------|--------|
| Kullanıcı ne yapacağını anlıyor mu? | ✅ (İletişim / Projeler net) |
| Landing dönüşüm odaklı mı? | ⚠️ (çok bölüm dağıtıyor) |
| Menü mantıklı mı? | ⚠️ (contact/hiring eksik) |
| Footer yeterli mi? | ⚠️ |
| Formlar | ✅ Contact güçlü |
| Loading | ✅ route loading’ler var |
| Error mesajları | ✅ contact; ⚠️ global-error leak riski |
| Empty state | ✅ gallery / github |
| Success state | ✅ contact |

---

## 6) Frontend / a11y / perf / SEO

### Frontend
- Component sınırları genel olarak temiz; `site-config` tek kimlik kaynağı (birkaç hardcode drift hariç).
- Ağır client adalar: Header, Hero, Lab, Gallery, Tilt/Magnetic/Reveal.
- Tekrar: `SectionEyebrow` + `surface-*` + tilt pattern.

### Accessibility
- ✅ Skip link, `lang="tr"`, menu/lightbox focus trap, Escape, `aria-modal`
- ⚠️ Network toast EN; guestbook pending a11y; bazı dekoratif eyebrow’lar okuyucuya gürültü

### Performance
- ❌ Perf 72, LCP 3.8s — **90+ değil**
- ✅ CLS 0, `next/image`, font `display: swap`, mono preload kapalı
- 🎯 `npm run lighthouse:home` deploy sonrası tekrar; hero sadeleştirmeden 90 zor

### SEO
- ✅ Title/description, OG/Twitter card, sitemap, robots, Host, per-route canonical, Person/WebSite/BlogPosting JSON-LD
- ⚠️ `twitter:site` yok; project OG type website; home description kaynakları hafif dağınık
- ✅ www→apex

### Güven / error
- ✅ SSL (Vercel), 404, route error’lar, contact rate-limit
- ⚠️ `global-error` `error.message` sızıntısı riski
- ✅ Social: GitHub, LinkedIn, mail, CV API

---

## 7) Product

Site **sadece vitrin değil**: guestbook, contact, CI, auth, rate-limit gerçekten çalışıyor. Bu, “portfolio product” tanımına uyuyor.  
Eksik olan: dış kullanıcıya sürekli değer (blog derinliği, canlı müşteri domainleri). İçerik hacmi thin; mimari kalın.

---

## 8) UI Pixel Review (işaretler)

| Bulgu | Dosya / alan | Etki |
|-------|----------------|------|
| Logo tagline ≠ role | `logo.tsx` | High |
| About kart title duvarı | `about-section.tsx` | High |
| Featured sabit Full-stack chip | `featured-projects-list.tsx` | Medium |
| Hero current_focus overlay | `hero.tsx` | Medium |
| Projects ambient-orb + tilt | `projects/page.tsx` | Medium |
| Blog tilt cards | `blog-post-list.tsx` | Low |
| Radius xl/2xl/3xl karışımı | projects | Low |
| Footer domain hardcode | `site-footer.tsx` | Low |
| Header Magnetic CTA | `site-header.tsx` | Low |

---

## 9) Roadmap

### V1 — Trust & speed (önce bunu bitir)
1. Hero first-viewport bütçesi + LCP (hedef Perf ≥85, sonra 90)  
2. Noise budget: tilt/magnetic/glow kotası  
3. Logo/role/chip tek kaynak  
4. Nav’a İletişim; footer’a CV  
5. GitHub whitelist  
6. Guestbook’a 2–3 gerçek mesaj  

### V2 — Proof depth
1. 1 uzun Bloomedu/BİGG yazısı  
2. Featured/Projects flat kart  
3. ucmd’yi küçült veya header-only  
4. Aras/Zeki live + doğru status  
5. Honeypot sessiz; global-error generic  

### V3 — Üst düzey
1. Lighthouse CI gate  
2. İsteğe bağlı EN  
3. Analytics: hero → projects time  
4. Tipografi özelleştirme (Geist’ten çıkış kararı)

---

## 10) Öncelik kuyruğu (şimdi ne yapılmalı)

| # | İş | Etki |
|---|-----|------|
| 1 | Hero sadeleştir + LCP | High |
| 2 | Design noise budget (Featured/Projects/Blog) | High |
| 3 | GitHub feed kalitesi | High |
| 4 | Blog: 1 derin yazı | High |
| 5 | Config drift (logo, chips, contact copy) | Medium |
| 6 | Footer CV + origin helper | Medium |
| 7 | Lab’i home’dan incelt/taşı | Medium |
| 8 | global-error + honeypot + network TR | Low–Med |

---

## 11) Config drift (deep scan ekleri)

| # | Yer | Sorun |
|---|-----|--------|
| 1 | `contact-section.tsx` | “staj” vs `availability*` “yeni iş fırsatları” |
| 2 | `hero.tsx` / resume route | CV dosya adı `Umut-Cingisiz-CV.pdf` sabit |
| 3 | `site-footer.tsx` | Domain hardcode; `getSiteOrigin()` yok |
| 4 | `opengraph-image.tsx` | Tech chip’ler + `"UC"` sabit |
| 5 | Featured / projects chip | Sabit `"Full-stack"`; `category` kullanılmıyor |
| 6 | `json-ld.ts` sameAs | `origin` + `www.` çift sinyal |
| 7 | Home meta vs `ogSiteDescription` | Description kaynakları dağınık |
| 8 | Bloomedu repo | `somethn7/Bloomedu` — kişisel profil değil (dürüst katkı notu gerekebilir) |
| 9 | `actions/contact.ts` honeypot | Bot → `?contact=sent` → sahte success UX |
| 10 | `guestbook-message-form` | Pending’de textarea disable / `aria-busy` yok |
| 11 | `global-error.tsx` | `error.message` kullanıcıya sızabilir |

---

## 12) Envanter (hızlı referans — nasıl değiştirilir)

| Bölüm | Ana dosya | Metin kaynağı |
|-------|-----------|----------------|
| Kimlik | — | `src/lib/site-config.ts` |
| Hero | `hero.tsx` | site-config |
| Header | `site-header.tsx` | nav dizisi |
| About | `about-section.tsx` | cards const + milestones |
| Skills | `skills-section.tsx` | skills dizisi |
| Featured | `featured-projects-list.tsx` | MDX `featured` |
| Hiring | `hiring-proof-section.tsx` | `proofSignals` |
| Contact | `contact-section.tsx` + `contact/*` | — |
| Projects | `app/projects/page.tsx` + MDX | `content/projects` |
| Blog | `content/blog` | MDX |
| SEO | `site-metadata.ts`, `json-ld.ts`, `sitemap.ts`, `robots.ts` | — |
| LH sayıları | `lighthouse-metrics.ts` | `npm run lighthouse:home` |

---

*Bu audit uygulama listesi değildir; hükümdür. V1 maddeleri bir sonraki uygulama turunun backlog’udur.*

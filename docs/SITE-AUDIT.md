# Portfolio Site Audit (Tam Birleşik Rapor)

**Site:** https://umutcingisiz.com  
**Repo:** `c:\Users\cingi\portfolio`  
**Tarih:** 2026-07-22  
**Yöntem:** Filtre yok · bölüm bölüm · recruiter lens · code review tarzı  

Bu dosya şu üç kaynağın **birleşik, detaylı** halidir:

1. **Portfolio site audit** — skor board, Hero derin inceleme, genel seviye, roadmap  
2. **Audit home mid sections** — Header → Terminal / Home bileşenleri  
3. **Audit pages SEO footer** — Contact → Guestbook, SEO, perf, test, kod kalitesi  

---

## 0) Özet karar

| Metrik | Değer |
|--------|--------|
| **Genel puan** | **7.1 / 10** |
| **En güçlü** | Featured Projects · Contact · Guestbook · Project detail (**8.0**) |
| **En zayıf** | Hiring Proof (**5.5**) |
| **Seviye** | **Solid Mid · FAANG-aspirant** |
| **Template mi?** | Hayır — gerçek ürün yüzeyleri var. Risk: fazla glow/kart + aspirasyonel metrik = “süslü junior vitrin” okuması |

### Recruiter 30 saniye

- **Olumlu:** “Bu çocuk gerçekten ship ediyor.” Auth, Neon, moderasyon, P/D/I case study, custom OG, Sentry, check script’ler, e2e smoke — template’ten ayırır.
- **Risk:** Sahte git hash + hover-only kanıt CTA + aspirasyonel LCP metrikleri → güven erozyonu.
- **Template vs real:** Real product portfolio. Template riski backend boşluğundan değil, görsel yoğunluktan (tilt/glow/bento tekrarı).

### Dürüst bar

Ürün yüzeyi ship eden **mid** mühendis. Junior portfolyoların çoğunun üstünde. Henüz senior / FAANG değil — SEO doğruluğu, fail-closed güvenlik default’ları, kritik path testleri ve sakin craft eksik.

---

## 1) Skor tablosu (tam)

| # | Bölüm | Puan | Durum |
|---|------|------|--------|
| 01 | Hero | 7.2 / 10 | Done |
| 02 | Navbar / Header | 6.5 / 10 | Done |
| 03 | About | 7.5 / 10 | Done |
| 04 | Skills | 7.0 / 10 | Done |
| 05 | Algorithm Lab | 6.5 / 10 | Done |
| 06 | Featured Projects | 8.0 / 10 | Done |
| 07 | Hiring Proof | 5.5 / 10 | Done |
| 08 | Quality Standards | 6.0 / 10 | Done |
| 09 | GitHub Activity | 6.0 / 10 | Done |
| 10 | Contact | 8.0 / 10 | Done |
| 11 | Footer | 7.5 / 10 | Done |
| 12 | Projects pages (list + detail) | 8.0 / 10 | Done |
| 13 | Blog (list + post) | 7.5 / 10 | Done |
| 14 | Guestbook | 8.0 / 10 | Done |
| 15 | A11y / Responsive (özet) | 6.5 / 10 | Done |
| 16 | SEO / Perf / Code (özet) | 7.2 / 10 | Done |
| — | Terminal prompt (Home) | 7.0 / 10 | Done |
| — | Tests (`package.json`) | 7.0 / 10 | Done |
| — | `globals.css` focus | 8.5 / 10 | Done |
| — | Layout / meta / OG / robots / sitemap / errors | 7.5 / 10 | Done |

---

## 2) Öncelik backlog (P0 → P2)

| Pri | Madde | Ne yapılacak | Etki |
|-----|--------|--------------|------|
| **P0** | Mobile menu a11y | `aria-expanded`, `aria-controls`, focus trap, Escape-to-close | High |
| **P0** | Fake git hashes | `shortHash(...)` sahte SHA’ları kaldır; “recent repos” etiketi | High |
| **P0** | Hover-only CTAs | Hiring proof “Kanıtı incele →” her zaman görünür | High |
| **P1** | Hero density + bio | Bio 1 cümle; glow/chips/stats sadeleştir; dual CTA | High |
| **P1** | Canonical URLs | Per-route canonical; root `siteUrl` sızıntısını düzelt | High |
| **P1** | Contact fail-closed | Rate-limit DB fail → blokla, açma (`[0,0]` fail-open kalksın) | High |
| **P1** | Status helper | `archived` listede live, detayda “geliştiriliyor” bug’ını birleştir | Med |
| **P1** | Contact success UX | `contact=sent` iken formu gizle/disable (double-submit) | High |
| **P2** | JSON-LD | Person + WebSite + Article / Project (CreativeWork) | Med |
| **P2** | Card repetition | 3–4 bölümde tilt/glow/bento kes veya birleştir | Med |
| **P2** | Quality claims | Gerçek Lighthouse + tarih veya “checklist / hedef” dili | Med |
| **P2** | Deep-link ids | `algorithm-lab`, hiring, quality, github; Skills “aşağıda dene” bağla | Med |
| **P2** | Guestbook UX | Hide her zaman görünür; env isimlerini public UI’dan çıkar | Med |

---

## 3) Roadmap

### V1 — Trust + a11y + SEO correctness
- Mobil menü a11y (`aria-expanded`, focus trap, Escape)
- Sahte SHA yok
- Hiring CTA görünür (hover-only kaldır)
- Per-route canonical; root-only homepage canonical düzelt
- Contact: fail-closed rate limit + success’te formu gizle
- Project `live|archived` status helper unify
- Hero copy / yoğunluk sadeleştir (bio, TR Available, glow)
- Guestbook: hide görünürlüğü + env name sızıntısını kes

### V2 — Proof + polish
- JSON-LD Person / WebSite + Article / Project
- Gerçek perf sayıları (Lighthouse + tarih) veya checklist dili
- Project detail end CTA + related / next-prev
- Kart gürültüsü azalt; Hiring + Quality birleştir veya küçült
- Blog empty + related-by-tag + Article schema
- Contact per-field errors + `aria-describedby`
- Contact/guestbook unit tests; e2e contact happy-path (mock)
- Twitter/canonical child sayfalarda tamamla
- `not-found` metadata
- Language normalize (TR body + EN eyebrows OK; mid-sentence mix düzelt)

### V3 — Depth
- Guestbook approved-list caching / daha yumuşak dynamic boundary
- Opsiyonel Turnstile / anon path
- Bundle audit (Motion islands, lab code-split)
- Coverage gates in CI (actions + content schema)
- Opsiyonel EN/TR i18n
- Related posts
- Error digest sayfalarında gerekirse `noindex`

---

## 4) Cross-cutting bulgular (Home)

- **Heading hierarchy:** Sayfa `h1` Hero’da; bu bölümler `h2` → `h3` kullanıyor. About timeline yalnızca `<p>` (“deneyim · liderlik”) — `h3` değil. Deep-link `id`: `#about`, `#skills`, `#projects` var; Algorithm Lab / Hiring / Quality / GitHub’da `id` yok.
- **TR/EN mix:** Nav + gövde çoğunlukla Türkçe; eyebrow’lar (`about.engineer`, `stack.map()`, `hiring.proof`) ve birçok label (`proof_of_work`, `route cost`, `pinned.proof`) İngilizce. “Dev aesthetic” bilinçli olabilir; TR recruiter için mid-sentence mix zayıf.
- **Card overload:** `premium-card` + `TiltCard` + `gradient-border` + glow About → Skills → Projects → Hiring → Quality → GitHub boyunca tekrarlanıyor.
- **Animation noise:** `Reveal` + tilt + `ambient-orb` + signal glow neredeyse her yerde. AlgorithmLab / Magnetic / Reveal reduced-motion’a saygı duyar; **`TiltCard` etmez**.
- **Empty / loading / error:** Featured empty = editör dili (`featured: true`); GitHub error UI var ama `Suspense fallback={null}` = blank flash; çoğu bölümde loading/skeleton yok.
- **Home kompozisyon uzunluğu:**  
  Hero → Terminal → About → Skills → Lab → Featured → Hiring → Quality → GitHub → Contact  
  Hiring + Quality örtüşüyor — V2’de birleştir veya birini kes.

### Site-wide priority order (Home audit’ten)

1. **Mobile menu a11y** (header) — en yüksek gerçek dünya etkisi  
2. **Sahte git hash + hover-only proof CTA** — recruiter güveni  
3. **Kart/tilt tekrarı kes; ölçülen proof veya yumuşak claim** — Quality + Hiring  
4. **Dil normalize** (TR body + EN eyebrows OK; proof chip mid-sentence mix düzelt)  
5. **Deep-link ids** (lab + hiring) + Skills “aşağıda dene” bağla  

---

# A) Home mid sections — detaylı inceleme

---

## A.1 Header / Navbar — 6.5/10

**Dosya:** `src/components/site-header.tsx`

### ❌ Hatalar
- **High:** Mobil menü — `aria-expanded` / `aria-controls` yok, focus trap yok, Escape-to-close yok. Klavye / screen-reader kullanıcıları `fixed inset-0 z-40` overlay arkasında sıkışabilir.
- **Med:** Terminal açılışı sentetik `KeyboardEvent("keydown", { ctrlKey: true, key: "`" })` — kırılgan; gerçek user input bekleyen listener’lara ulaşmayabilir.
- **Low:** Toggle `aria-label="Menü"` open/close durumunu yansıtmıyor.

### ⚠️ Eksikler
- Contact CTA `hidden sm:inline-flex` — telefon kullanıcıları yalnızca overlay içinde görür.
- Social / terminal yalnızca `xl:`.
- Scroll progress bar dekoratif (OK) ama unlabeled.
- Active route için `aria-current` yok.

### 💡 İyileştirme önerileri
- Open’da ilk nav link’e focus; close’da trigger’a restore.
- `aria-current` ile aktif rota.
- Shared, güvenilir `openTerminal()` API (sentetik event yerine).

### ⭐ Dünyadaki iyi örnekler
Sakin, erişilebilir sticky nav: joshwcomeau.com, linear.app marketing nav — focus yönetimi ve mobil drawer a11y standart.

### 🎯 Nasıl geliştiririz (top 3)
1. Focus trap + Escape + `aria-expanded` / `aria-controls`  
2. Güvenilir terminal open API  
3. Mobil chrome’da İletişim her zaman erişilebilir (veya overlay’de ilk sırada)  

### 📈 Etkisi
Mobile a11y: **High** · Terminal API: **Medium** · İletişim görünürlüğü: **Medium**

### Recruiter one-liner
Cilalı floating capsule — mobil a11y gap’leri “quality” iddiasını zayıflatır.

---

## A.2 Hero — 7.2/10

**Dosya:** `src/components/hero.tsx` · copy: `src/lib/site-config.ts`

### Recruiter 30 sn (Hero özel)
“Gerçek mühendislik sinyali var — ama ekran fazla dolu; template mi, ürün mü?” sınırı.

### ✅ Güçlü kalanlar (Keeps)
- Brand-first H1 (`Umut Cingisiz`) — isim hero-level sinyal.
- Headline uçtan uca sistem odaklı; “sadece UI” değil.
- Gerçek foto + CV download + GitHub / LinkedIn / mail mevcut.
- Mobil sıra (metin → foto → stats) bilinçli ve doğru.
- Image fallback zinciri (local → GitHub → initials) production-minded.

### ❌ Hatalar
- **High — First viewport overload:** Available pill + role + H1 + gradient headline + uzun bio + 2 CTA + socials + photo + focus overlay + tech chips + 3 stats. Hero budget aşıyor.
- **High — shortBio length:** İlk bakışta CV paragrafı; 5 sn kuralında mesaj kayboluyor. Tek cümle olmalı (~140 karakter).

### ⚠️ Eksikler
- **Low — Language mix:** `"Available"` EN; geri kalan TR. Recruiter’da dağınık hissi.
- **Medium — CTA hierarchy:** Primary = Projeler. İş arayan için Contact / Hire eşit veya daha güçlü olmalı.
- **Medium — Motion / glow density:** Magnetic + Tilt + ambient orbs + signal glow + gradient text → template / AI-portfolio riski.
- **Low — current_focus.ts overlay:** Sevimli mühendislik sinyali; bazı recruiter’lar gimmick okur. Daha sade caption denenebilir.

### 💡 İyileştirme önerileri
- Bio’yu ~1 cümleye indir.
- Available → “Müsait” / “Yeni rollere açık” (TR).
- Tech chips + belki stats fold altına veya About’a taşı.
- Dual primary: İletişim + Projeler; Magnetic/Tilt yumuşat.
- Orb/glow yoğunluğunu ~%40 azalt.
- `rounded-[1.75rem]` + multi-layer glow + gradient headline + pill Available + 8 tech chip = dense “premium dark SaaS” cluster. Senior portfolyolar genelde daha sessiz tipografi + bir kararlı motion ile kazanır.

### ⭐ Dünyadaki iyi örnekler
Calm craft: **rauno.me**, **joshwcomeau.com**, **ped.ro** — sparse first viewport, tipografi hiyerarşisi, motion aksan (wallpaper değil).

### 🎯 Nasıl geliştiririz (V1 fix plan)
1. Cut `shortBio` to one sentence (~140 chars)  
2. Available → TR  
3. Move tech chips (+ maybe stats) below fold or into About  
4. Dual CTA: İletişim + Projeler; soften Magnetic/Tilt  
5. Reduce orb/glow intensity ~40%  

### 📈 Etkisi
Copy/CTA: **High** · Glow/motion: **Medium** · Dil tutarlılığı: **Low**

### Recruiter one-liner
Sistem düşüncesi sinyali var; ekran kalabalık → “template mi?” sınırı.

---

## A.3 About — 7.5/10

**Dosya:** `src/components/about-section.tsx`

### ❌ Hatalar
- **Low:** `proofPoints` İngilizce (`Guestbook: GitHub OAuth…`) Türkçe anlatı içinde — language whiplash.

### ⚠️ Eksikler
- Üç `TiltCard` sonraki bölümleri tekrarlıyor.
- Timeline label `h3` değil (`<p>` “deneyim · liderlik”).
- Uzun `h2` meta (“biyografi değil… kanıtı”) — kim / neden hire yavaş geliyor.

### 💡 İyileştirme önerileri
- `shortBio`’daki role/school/award ile lead et.
- 1–2 proof kart tut; milestones’a `h3` ver.
- Proof chip’leri yerelleştir veya bilinçli bilingual çerçeve.

### ⭐ Dünyadaki iyi örnekler
Identity-first about: Brittney Ball / personal sites that lead with role + proof, then philosophy cards.

### 🎯 Top fixes
1. Stronger identity lead  
2. Fewer tilt cards  
3. Localize or clearly bilingual proof chips  

### 📈 Etkisi
Identity lead: **High** · Kart azaltma: **Medium** · Dil: **Low**

### Recruiter one-liner
Engineering taste net; “kim / neden hire?” biraz geç.

---

## A.4 Skills — 7.0/10

**Dosya:** `src/components/skills-section.tsx`

### ❌ Hatalar
- **Med:** Intro layout’u okura anlatıyor (“görsel hiyerarşi olgunluğu gösterir”) — designer meta, skill sinyali değil.
- **Low:** Mobil order = growing first; “güçlü” badges below fold olabilir — seniority ilk bakışta zayıf kalabilir.

### ⚠️ Eksikler
- `tech.stack` pill cluster (`rounded-lg border… flex-wrap`) — chip soup.
- Growing kartlarda `proof` satırı yok (yalnız strong’da var).
- Heavy card chrome tekrarı.
- “aşağıda dene” lab’a deep-link edemiyor (`id` yok).

### 💡 İyileştirme önerileri
- Layout commentary’yi kaldır; capability claim yaz.
- Growing skill’e bir ölçülebilir proof veya lab/projects linki ekle.
- Tech chips sakinleştir.

### ⭐ Dünyadaki iyi örnekler
Capability grids that link each skill to a project artifact (not meta about the layout).

### 🎯 Top fixes
1. Rewrite intro as capability claim  
2. Prove “güçlü” with links (`aşağıda dene` → `id="algorithm-lab"`)  
3. Calm tech chips  

### 📈 Etkisi
Intro rewrite: **Medium** · Deep-link proof: **High** · Chips: **Low**

### Recruiter one-liner
Clear strong/growing split — proof lines yardım eder; meta copy + chip soup sulandırır.

---

## A.5 Algorithm Lab — 6.5/10

**Dosya:** `src/components/algorithm-lab-section.tsx`

### ❌ Hatalar
- **Med:** 40 hücre mute `<div>` + `title={node-N}` — path/blocked/start/end için erişilebilir açıklama yok; sighted-only demo.
- **Med:** Section `id` yok — Skills “aşağıda dene” deep-link edemez.
- **Low:** Preset senaryolar, canlı search değil — “algoritma” oversell → gimmick riski.

### ⚠️ Eksikler
- `aria-pressed` senaryolarda iyi; grid kendisi `list` / `table` / `img`+alt değil.
- EN labels (`scenario 01`, `route cost`, `speed-first`).
- Renk-only legend; metin legend eksik.

### 💡 İyileştirme önerileri
- `aria-live` ile aktif rota özeti.
- Text legend (start/end/blocked/path).
- `id="algorithm-lab"`.
- Framing: “trade-off visualization,” not live solver.

### ⭐ Dünyadaki iyi örnekler
Interactive explainers that expose state in text + visuals (Observable / algorithm visualizers with live regions).

### 🎯 Top fixes
1. Accessible route summary (`aria-live`)  
2. Section `id` + Skills link  
3. Honest framing: trade-off viz  

### 📈 Etkisi
A11y summary: **High** · Honest framing: **Medium** · id/link: **Medium**

### Recruiter one-liner
Dürüst çerçevelenirse akılda kalır; değilse “pretty grid.”

---

## A.6 Featured Projects — 8.0/10

**Dosyalar:** `src/components/featured-projects.tsx`, `src/components/featured-projects-list.tsx`

### ❌ Hatalar
- **Med:** Nested interactive targets: title `Link` + `İncele` + opsiyonel `Kod` aynı kartta — SR/keyboard için awkward.
- **Low:** Empty state authoring docs (“`featured: true` kullan”) — sıfır featured ile ship edilirse kötü.
- **Low:** Hardcoded badge `full-stack` her kartta.

### ⚠️ Eksikler
- PDI blocks asıl değer (koru).
- Card chrome + pills hâlâ dense.
- Yalnız `getFeaturedProjects(2)` — 2 proje.

### 💡 İyileştirme önerileri
- Kart başına tek primary hit target; repo secondary.
- Status/badge frontmatter’dan.
- User-facing empty copy.

### ⭐ Dünyadaki iyi örnekler
Case-study cards that lead with problem → decision → impact (product portfolio pattern).

### 🎯 Top fixes
1. One main link + secondary repo  
2. Dynamic badges  
3. Public-safe empty state  

### 📈 Etkisi
Nested links: **Medium** · Empty/badge: **Low** · PDI korumak: **High (keep)**

### Recruiter one-liner
**En güçlü bölüm** — problem/decision/impact gerçek case study gibi okunuyor.

---

## A.7 Hiring Proof — 5.5/10

**Dosya:** `src/components/hiring-proof-section.tsx`

### ❌ Hatalar
- **High:** “Kanıtı incele →” `lg:opacity-0 lg:group-hover:opacity-100` — keyboard/touch çoğu zaman affordance’ı hiç görmez.
- **Med:** Thin evidence: 2/4 → `/projects/portfolio-web`, biri → contact; metrikler (`4 case-study`, `E2E`) artifact’a linkli değil.
- **Low:** Daha fazla `premium-card` + metric strip = Projects sonrası dashboard hissi.

### ⚠️ Eksikler
- Quality + About messaging ile örtüşme.
- Section `id` yok.

### 💡 İyileştirme önerileri
- Her metriği CI badge / test file / Lighthouse’a bağla.
- CTA her zaman görünür.
- Metric strip’i gerçek yap veya kaldır.
- Unique deep link per signal.

### ⭐ Dünyadaki iyi örnekler
“Proof” sections that deep-link to CI, Lighthouse reports, or live demos — not hover reveals.

### 🎯 Top fixes
1. Visible CTAs without hover  
2. Unique deep links per signal  
3. Verifiable numbers or drop the strip  

### 📈 Etkisi
Hover CTA: **High** · Thin links: **Medium** · Overlap/dashboard: **Low–Medium**

### Recruiter one-liner
Hire-ready ton; tıklayınca circular hissediyor — güven düşer.

---

## A.8 Quality Standards — 6.0/10

**Dosya:** `src/components/quality-standards-section.tsx`

### ❌ Hatalar
- **Med:** `$ target — LCP < 2.5s · CLS < 0.1 · INP < 200ms` başarılmış SLO gibi okunuyor; çoğu aspirasyonel — header a11y gap’leriyle yan yana credibility riski.
- **Low:** Dördüncü benzer bento tilt/glow kart seti.

### ⚠️ Eksikler
- Ölçülmüş değer, link, tarih yok.
- Hiring Proof ile tematik örtüşme.

### 💡 İyileştirme önerileri
- Son ölçülen Lighthouse/a11y score + tarih göster.
- Veya “engineering checklist / hedef” diye yeniden çerçevele.
- Hiring ile birleştir veya 2 maddeye indir.
- CI/workflows’a link.

### ⭐ Dünyadaki iyi örnekler
Performance sections that show dated Lighthouse scores or link to public reports.

### 🎯 Top fixes
1. Real metrics or softer wording  
2. Merge with Hiring or shrink to 2 items  
3. Link to CI/workflows  

### 📈 Etkisi
Aspirational-as-achieved: **High (trust)** · Kart tekrarı: **Medium**

### Recruiter one-liner
Doğru konular; sayı olmadan manifesto gibi.

---

## A.9 GitHub Activity — 6.0/10

**Dosya:** `src/components/github-activity-section.tsx` (+ `git-log-feed`, `github-repos`)

### ❌ Hatalar
- **High:** `shortHash(name + pushed_at)` → `GitLogFeed` — git SHA gibi görünür ama değil; recruiter-savvy izleyici bluff diyebilir.
- **Med:** `Suspense fallback={null}` → section skeleton’suz pop-in.
- **Med:** `RepoCard` içinde nested links (name, case study, “Repoyu aç”).
- **Low:** API miss’te fallback `pushed_at: new Date().toISOString()` — tazelik sahteleyebilir.

### ⚠️ Eksikler
- Error state var (iyi).
- Partial-failure yok (pinned OK / recent fail senaryosu).
- ~8 karta kadar yine yoğun liste.

### 💡 İyileştirme önerileri
- Feed’i “recent repos” diye etiketle; git log gibi sunma.
- Skeleton fallback.
- Gerçek commit API veya hash’leri tamamen kaldır.
- Kart başına tek link.
- Partial-failure UI.

### ⭐ Dünyadaki iyi örnekler
GitHub activity widgets that show real SHAs from the Commits API — or no hashes at all.

### 🎯 Top fixes
1. Don’t fake SHAs  
2. Loading skeleton  
3. One link per card  

### 📈 Etkisi
Fake SHA: **High** · Suspense blank: **Medium** · Nested links / fake freshness: **Medium / Low**

### Recruiter one-liner
Live GitHub artı — sahte hash güven landmine.

---

## A.10 Terminal prompt — 7.0/10

**Dosya:** `src/components/terminal-prompt.tsx`

### ❌ Hatalar
- **Med:** Header ile aynı sentetik Ctrl+` open.
- **Low:** `animate-pulse` caret reduced-motion’ı yok sayabilir; button’un açık `aria-label`’ı zayıf (`$ show_projects()` metnine bel bağlı).

### ⚠️ Eksikler
- Cyan / `#05080c` chrome `btn-signal` sisteminden sapabilir.
- Traffic-light dots dekoratif (chrome olarak OK).

### 💡 İyileştirme önerileri
- Shared `openTerminal()`.
- `aria-label` + shortcut.
- `prefers-reduced-motion` caret.

### ⭐ Dünyadaki iyi örnekler
Easter-egg terminals that don’t compete with primary conversion (rauno-style restraint).

### 🎯 Top fixes
1. Shared open API  
2. Accessible name  
3. Reduced-motion caret  

### 📈 Etkisi
Terminal open: **Medium** · A11y caret/label: **Low**

### Recruiter one-liner
Eğlenceli brand beat — novelty, kanıt değil.

---

# B) Pages / SEO / Footer — detaylı inceleme

---

## B.1 Contact — 8.0/10

**Dosyalar:**
- `src/components/contact-section.tsx`
- `src/components/contact/contact-form.tsx`
- `src/actions/contact.ts`
- `src/lib/contact-guard.ts`

### ❌ Hatalar
- **High — Rate-limit fail-open:** `contact.ts` catch → `[0,0]`: DB down = sınırsız gönderim (spam/abuse).
- **High — Success UX:** `contactSuccess` banner görünür ama form kalır (`contact-section.tsx`) — double-submit kolay.

### ⚠️ Eksikler
- Honeypot OK; CAPTCHA yok.
- Field errors yalnızca tek string.
- Bazı hatalarda ASCII-mangled Türkçe (`Iletisim`).
- Per-field `aria-describedby` yok.

### 💡 İyileştirme önerileri
- Success’te formu gizle/reset.
- Rate limit fail-closed.
- Per-field errors + `aria-describedby`.

### ⭐ Dünyadaki iyi örnekler
Production contact forms: Zod validation + honeypot + fail-closed rate limit + clear success state (form replaced by confirmation).

### 🎯 Top fixes
1. Fail closed on guard errors  
2. Hide/disable form when `contact=sent`  
3. (V2) Per-field errors + `aria-describedby`  

### 📈 Etkisi
Fail-open: **High** · Double-submit: **High** · Field a11y: **Medium**

### Recruiter one-liner
Real Server Actions contact stack (Zod, honeypot, hashed IP/email limits, Resend) — mailto oyuncağı değil.

---

## B.2 Footer — 7.5/10

**Dosya:** `src/components/site-footer.tsx`

### ❌ Hatalar
- Kritik yok.

### ⚠️ Eksikler
- Icon socials global focus dışında ekstra polish az.
- `mailto:` `Link` ile — çalışır, biraz alışılmadık.
- Legal/privacy yok (portfolyo için opsiyonel).

### 💡 İyileştirme önerileri
- Header ile aynı `focus-visible` ring.
- Stack satırını tut — stack satıyor (Next · TS · Tailwind · Neon · Vercel).

### ⭐ Dünyadaki iyi örnekler
Minimal footers with labeled socials + deep links, no clutter.

### 🎯 Top fixes
1. Tab focus spot-check on social + nav links  
2. Match header focus rings  

### 📈 Etkisi
Focus polish: **Low–Medium**

### Recruiter one-liner
Clean, labeled socials + deep links — professional, clutter yok.

---

## B.3 Projects list + detail — 8.0/10

**Dosyalar:**
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/components/project-gallery.tsx`

### ❌ Hatalar
- **High/Med — Status bug:** Listede `isLiveStatus` `archived`’i live sayıyor; detayda yalnız `status === "live"` → archived badge **“geliştiriliyor”** görünebilir.

### ⚠️ Eksikler
- Detail’de end CTA (contact / related) yok.
- Gallery empty state dürüst (iyi — koru).
- List empty plain.
- Per-slug `alternates.canonical` yok.
- next/prev project yok.

### 💡 İyileştirme önerileri
- Shared `isLiveStatus` helper.
- MDX altında contact CTA.
- next/prev.
- Page-level canonical.

### ⭐ Dünyadaki iyi örnekler
Case study pages with honest “screenshots pending” empties + clear live/building badges + end CTA.

### 🎯 Top fixes
1. Unify archived badge (shared helper)  
2. Add bottom contact CTA  
3. Per-slug canonical + optional next/prev  

### 📈 Etkisi
Status bug: **High** · End CTA: **Medium** · Canonical: **Medium**

### Recruiter one-liner
P/D/I case studies + dürüst screenshot empty — güçlü hiring-signal projects page.

---

## B.4 Blog list + post — 7.5/10

**Dosyalar:**
- `src/app/blog/page.tsx`
- `src/components/blog/blog-post-list.tsx`
- `src/app/blog/[slug]/page.tsx`

### ❌ Hatalar
- Blocking yok.

### ⚠️ Eksikler
- Weak empty state.
- Related posts / tag index yok.
- Article JSON-LD yok.
- View tracker client JS ekler.
- Per-slug canonical / twitter incomplete.

### 💡 İyileştirme önerileri
- Stronger empty.
- `BlogPosting` schema.
- Related-by-tag.
- Per-slug canonical.

### ⭐ Dünyadaki iyi örnekler
MDX blogs with reading time, structured Article schema, related posts (content system, not marketing dump).

### 🎯 Top fixes
1. Article schema  
2. Empty-state polish  
3. Related-by-tag + per-slug canonical  

### 📈 Etkisi
Schema/canonical: **Medium** · Empty/related: **Low–Medium**

### Recruiter one-liner
MDX + reading time + views — content system, sadece marketing değil.

---

## B.5 Guestbook — 8.0/10

**Dosyalar:** `src/app/guestbook/page.tsx` (+ form/actions)

### ❌ Hatalar
- UI katmanında security-critical yok (moderasyon gated).

### ⚠️ Eksikler
- Always `force-dynamic` — static HTML yok.
- Public copy env var *isimlerini* expose edebilir (ops leakage).
- Hide button `sm+` hover-only (a11y).
- GitHub-only (bilinçli / documented).

### 💡 İyileştirme önerileri
- Always-visible mod controls.
- Env names’i public copy’dan düş.
- Mümkünse approved list ISR/cache.

### ⭐ Dünyadaki iyi örnekler
Authenticated guestbooks with moderation queues — rare in junior portfolios; keep the product honesty (GitHub-only spam control).

### 🎯 Top fixes
1. Fix hide-button visibility (always visible)  
2. Trim ops leakage from public copy  
3. (V3) Cache approved list / softer dynamic boundary  

### 📈 Etkisi
Hide a11y: **Medium** · Env leakage: **Medium** · Cache: **Low–Medium (V3)**

### Recruiter one-liner
Auth + Neon + moderation — nadir junior product-ops proof.

---

## B.6 Layout / meta / OG / robots / sitemap / errors — 7.5/10

**Dosyalar:**
- `src/app/layout.tsx`
- `src/lib/site-metadata.ts`
- `src/app/opengraph-image.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/not-found.tsx`
- `src/app/error.tsx`

### ❌ Hatalar
- **High — Canonical bug:** Root `alternates.canonical: siteUrl` (`site-metadata.ts`) — blog/projects kendi canonical’ını set etmezse **tüm sayfalar homepage canonical** işaretlenebilir.

### ⚠️ Eksikler
- JSON-LD hiç yok.
- Child meta’da page `twitter` / `canonical` eksik.
- `not-found` metadata yok.
- robots allow-all (portfolyo için OK).
- Error digest’lerde gerekirse `noindex` yok.

### 💡 İyileştirme önerileri
- Per-route canonicals.
- Person / WebSite / Article / CreativeWork schema.
- `not-found` metadata.
- Error sayfalarında ihtiyaç halinde `noindex`.

### ⭐ Dünyadaki iyi örnekler
Sites with custom OG art + correct per-URL canonical + WebSite/Person JSON-LD.

### 🎯 Top fixes
1. Fix canonicals first  
2. Add WebSite + Person schema  
3. Complete child twitter/canonical + not-found metadata  

### 📈 Etkisi
Canonical: **High** · JSON-LD: **Medium** · not-found meta: **Low**

### Recruiter one-liner
Custom OG, sitemap, robots, Sentry error boundary — ortalamanın üstü ship disiplini.

---

## B.7 Tests — 7.0/10

**Scripts (`package.json`):**  
`test` · `test:watch` · `test:e2e` · `coverage` · `check:content` · `check:env` · `check:assets` · `check:db` · `check:all` · `typecheck` · `lint`

### ❌ Hatalar
- Blocking test failure yok (audit kapsamı yapısal).

### ⚠️ Eksikler
- Vitest: schema / loaders / observability / IP.
- Playwright: smoke only.
- Contact / guestbook **action** testleri yok.
- Coverage gates CI’da zorunlu değil.

### 💡 İyileştirme önerileri
- Rate limit + honeypot unit tests.
- E2E contact happy-path (mocked Resend).
- Guestbook deny path test.
- (V3) Coverage gates for actions + content schema.

### ⭐ Dünyadaki iyi örnekler
Portfolios that ship `check:*` scripts + e2e smoke + critical-path unit tests for auth/forms.

### 🎯 Top fixes
1. One contact guard unit test  
2. One guestbook deny path  
3. (V2/V3) Mocked contact e2e + coverage gates  

### 📈 Etkisi
Guard/deny tests: **High** · Broader e2e: **Medium**

### Recruiter one-liner
Check scripts + e2e smoke → regression awareness gösterir.

---

## B.8 globals.css focus — 8.5/10

**Dosya:** `src/app/globals.css`

### ❌ Hatalar
- Kritik yok (pattern bilinçli).

### ⚠️ Eksikler
- `:focus { outline: none }` + güçlü `:focus-visible` cyan ring — custom widget’larda disiplin ister (`Magnetic` / `TiltCard`).
- Reduced-motion block mevcut (iyi).

### 💡 İyileştirme önerileri
- Motion wrapper’larda focus path spot-check.
- TiltCard’a reduced-motion saygısı ekle (cross-cutting).

### ⭐ Dünyadaki iyi örnekler
Visible focus rings that match brand accent without killing mouse UX (`:focus-visible` pattern).

### 🎯 Top fixes
1. Audit Magnetic/TiltCard focus paths  
2. TiltCard + prefers-reduced-motion  

### 📈 Etkisi
Focus path bugs: **Medium** · Tilt reduced-motion: **Medium**

### Recruiter one-liner
Intentional keyboard focus styling — a11y awareness.

---

## B.9 A11y / Responsive (özet paket) — 6.5/10

Bu puan Header mobil menü + hover CTA + Tilt reduced-motion + nested links birleşiminden:

### ❌
- Mobil menü a11y (P0)
- Hiring hover-only CTA (P0)
- TiltCard reduced-motion yok
- Nested links (Featured / GitHub cards)

### ⚠️
- Skip link + semantic `<main>` + focus-visible var (güçlü temel)
- Dark mode forced (`html.dark`) — light toggle yok (bilinçli olabilir)
- Deep-link id eksikleri

### 🎯
P0 menü + hover CTA + Tilt reduced-motion + deep-link ids

### 📈
**High** (menü + hover CTA)

---

# C) SEO checklist (tam)

| Madde | Verdict | Not |
|-------|---------|-----|
| Meta title / description | ✅ | Root + page titles |
| Open Graph | ✅ | Root + per-project/blog OG images |
| Twitter Card | ⚠️ | Root `summary_large_image`; children incomplete |
| Heading yapısı | ✅ | Audited sayfalarda net h1/h2 |
| Schema (JSON-LD) | ❌ | Person / WebSite / Article / CreativeWork yok |
| Sitemap | ✅ | Home + projects + blog + guestbook + slugs |
| robots.txt | ✅ | Allow `/` + sitemap URL |
| Canonical | ❌ | Root homepage canonical risk; per-slug override yok |
| Structured Data | ❌ | JSON-LD ile aynı borç |
| `not-found` metadata | ⚠️ | Yok |
| Error `noindex` | ⚠️ | Gerekirse eklenmeli |

---

# D) Performance riskleri (tam)

- **Client islands:** ~19 `"use client"` dosya (hero, tilt, magnetic, reveal, header, terminal, lab, contact/guestbook forms).
- **Guestbook:** `force-dynamic` — o route için static HTML yok.
- **Images:** Çoğunlukla `next/image`; guestbook avatar `unoptimized`; cover/gallery `fill` + `sizes` OK.
- **Fonts:** Geist + Geist Mono via `next/font` — iyi; egzotik değil.
- **Bundle:** Motion + MDX + Sentry + Analytics / SpeedInsights — beklenen; hero/lab ağırlığını izle.
- **Code-split fırsatı (V3):** Algorithm Lab, HiddenTerminal, ağır motion island’ları.

### Core Web Vitals notu
Quality bölümünde hedef olarak geçiyor: `LCP < 2.5s · CLS < 0.1 · INP < 200ms`.  
**Bu audit’te canlı Lighthouse ölçümü yapılmadı.** Bu yüzden sayılar “başarıldı” diye yazılmamalı — ölçülene kadar checklist/hedef dili kullanılmalı.

---

# E) Kod kalitesi (tam)

### Güçlü yanlar
- Content Zod schema + `check:content` / `check:assets` / `check:env` / `check:db` / `check:all`
- Server Actions + Zod
- Observability hooks + Sentry
- Dürüst empty state’ler (özellikle gallery)
- P/D/I product framing
- Sentry + error / not-found UX
- Skip link + focus-visible

### Borç
- Status helper duplication (list vs detail)
- Root canonical leak
- Rate-limit fail-open
- Public guestbook ops copy (env names)
- Sparse action tests
- Structured data (JSON-LD) yok
- Fake git hashes
- Hover-only proof CTAs
- Card/tilt/glow repetition

---

# F) Seviye kararı (filtre yok)

### Verdict: **Solid Mid · FAANG-aspirant**

**Junior değil çünkü:**  
Gerçek OAuth guestbook, Neon, moderasyon, rate limits, MDX case studies, custom OG pipeline, check script’ler, e2e smoke, Sentry — tipik “template portfolio”da bunlar yok.

**Senior / FAANG değil çünkü:**  
SEO correctness (canonical), fail-closed security defaults, kritik path test coverage, ve sakin craft (daha az glow/kart, ölçülmüş proof) henüz o seviyede değil.

**Dürüst bar:** Ürün yüzeyi ship eden mid mühendis.  
**FAANG loop için:** Daha keskin SEO, fail-closed defaults, kritik path testleri, quieter visual craft.

**Template vs real:**  
**Real.** Template riski görsel yoğunluktan geliyor — chrome’u sakinleştir, sistemleri tut.

---

# G) Pixel / UI craft notları (audit sırasında gözlenen)

Bu turda ayrı bir “pixel-by-pixel Figma pass” yapılmadı; kod + yapısal review’dan çıkan craft notları:

- `rounded-[1.75rem]` / `rounded-[2rem]` + multi-layer glow + gradient headline + pill badges — dense premium dark SaaS cluster.
- Hover süreleri / translate (`hover:-translate-y-0.5`) + Magnetic + Tilt aynı anda — motion bütçesi aşırı.
- Signal glow (`--signal-glow`, `--signal-glow-strong`) birçok yüzeyde tekrarlanıyor; kontrast/brand iyi ama “AI portfolio” bias’ına yaklaşıyor.
- Hiring CTA opacity-0 → hover: pixel değil ama interaction affordance hatası (en kritik UI bug’lardan).
- Icon + text hizası genel olarak tutarlı; asıl sorun spacing micro-bug’dan çok **bileşen tekrarı ve yoğunluk**.

İleride istenirse ayrı bir **UI Pixel Review** pass’i (6px spacing, radius token, shadow sertliği) eklenebilir.

---

# H) Orijinal audit checklist eşlemesi

Kullanıcının istediği geniş checklist’in bu raporda karşılığı:

| Alan | Durum |
|------|--------|
| Tasarım (ilk izlenim, renk, font, spacing, grid, responsive, dark, hover, animasyon, scroll, CTA, kart) | Bölüm A/B içinde işlendi; ayrı Lighthouse/pixel ölçümü yok |
| UX (menü, footer, form states, empty/success/error/loading) | İşlendi |
| Frontend (component, tekrar, a11y, keyboard, semantic, lazy/image, bundle) | İşlendi |
| SEO (meta, OG, Twitter, headings, schema, sitemap, robots, canonical) | Bölüm C |
| Performance (Lighthouse 90+, CLS/FID/LCP/INP, cache, compression, font) | Riskler var; **canlı Lighthouse sayısal koşu bu raporda yok** |
| Güven (SSL, 404, 500, contact, social proof, GitHub, LinkedIn, mail, CV) | 404/error/contact/social/CV işlendi; SSL prod’da varsayılan (Vercel) |
| Recruiter gözü | Her bölüm + §0 + §F |
| Product (kullanıcıya hizmet vs sadece vitrin) | Guestbook/Contact/Blog views = gerçek hizmet; Hiring/Quality kısmen vitrin |
| UI Pixel Review | Gözlemsel notlar §G; ayrı pixel pass yok |
| Sayfa puanları | §1 skor tablosu |
| Roadmap V1/V2/V3 | §3 |
| Junior / Mid / Senior / FAANG | §F |

---

## Sonraki adım

Bu dosya uygulama için **tek kaynak referans**.  
Ne uygulanacağını sen söyle:

- `V1 uygula`
- `Sadece P0`
- `Hero + Hiring düzelt`
- `Canonical + contact fail-closed`
- `UI Pixel Review pass ekle` / `Lighthouse ölç ve ekle`

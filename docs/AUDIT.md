# Portfolio Site Audit — Tam Envanter + Test

**Tarih:** 2026-07-24  
**Site:** https://umutcingisiz.com  
**Repo:** `feature/portfolio-v2` (bu dosya yerel kaynakla senkron; production deploy gecikmeli olabilir)  
**Yöntem:** Kod taraması + Vitest + content gate + production tarayıcı snapshot (home + /projects)

Plan / manuel: [`PROJE-GELISTIRME-PLANI.md`](./PROJE-GELISTIRME-PLANI.md) · [`MANUEL-ADIMLAR.md`](./MANUEL-ADIMLAR.md)

---

## 0) Özet karar

| Metrik | Değer |
|--------|--------|
| Genel seviye | **Solid Mid** — gerçek ürün yüzeyleri var (auth, guestbook, CI, case study) |
| En güçlü | Featured/Projects case study · Contact form · Guestbook · Lightbox |
| En zayıf risk | Lightbox focus trap · LCP yeniden ölçüm · GSC manuel · Hero yoğunluğu |
| Template mi? | Hayır — ama kart/tilt tekrarı ve “dev aesthetic” eyebrow’lar dikkat dağıtabilir |

### Bu turda yapılan lokal düzeltmeler (deploy öncesi)

- Müsait pill eski stile döndü: `Müsait · Yeni iş fırsatları için uygun`
- Role: `Bilgisayar Mühendisi · Full-Stack Developer`
- about h2: **Nasıl mühendislik yapıyorum** (+ description yenilendi; kart metinleri kullanıcıda kaldı)
- selected.case_studies açıklaması yenilendi
- contact.endpoint resmiyete çekildi (`İletişim`)
- Mesaj validasyon tonu yumuşatıldı
- ucmd teaser büyütüldü (başlık, glow, komut chip’leri, “Terminali aç”)

---

## 1) Test sonuçları (2026-07-24)

| Test | Sonuç |
|------|--------|
| `npx tsc --noEmit` | ✅ |
| `npm run test` (Vitest) | ✅ 7 dosya · **28/28** |
| `npm run check:content` | ✅ |
| Production home snapshot | ✅ açılıyor; bölümler mevcut |
| Production `/projects` snapshot | ✅ Yayında 2 · Geliştiriyorum 2 · P/D/I |
| Playwright e2e | ⏸ Bu ortamda Chromium binary yok; CI’da koşuyor |
| Lighthouse yeniden ölçüm | ⏸ Deploy sonrası `npm run lighthouse:home` |
| Safari / recruiter 30 sn | ⏸ Manuel (`MANUEL-ADIMLAR`) |
| GSC | ⏸ Manuel |

### Production’da gözlenen (canlı — henüz bu commit değilse eski metin görünebilir)

- Header: Logo UC + Umut Cingisiz · `ucmd` · İletişim · hamburger
- Hero: Müsait rozeti · ad · headline · bio · 3 CTA · sosyal · foto · stats
- Terminal teaser tıklanabilir
- Skills / Featured (3 kart + kapak) / Hiring / Lab / GitHub / Contact form
- Projects: görsel üstte, status grupları, P/D/I

---

## 2) Kimlik (tek kaynak: `src/lib/site-config.ts`)

| Alan | Değer |
|------|--------|
| name | Umut Cingisiz |
| role | Bilgisayar Mühendisi · Full-Stack Developer |
| location | Türkiye |
| availabilityLabel | Müsait |
| availabilityDetail | Yeni iş fırsatları için uygun |
| headline | Arayüzden veritabanına kadar ürünü ben kuruyorum. |
| shortBio | Doğu Akdeniz Üniversitesi … Bloomedu / BİGG / jüri |
| stats | Okul → Doğu Akdeniz Üniversitesi · Konum → Türkiye · Odak → Full-stack |
| terminal | ucmd v1.0 · Komutlarla sitede gez |
| email / github / linkedin / githubRepo | config’te |

---

## 3) Resim resim site envanteri

Her bölüm için: **ne dönüşür**, **dosya**, **görsel parçalar**, **etkileşim**, **veri**, **nasıl değiştirilir**.

### 3.1 Global chrome (her sayfa)

**Görüntü:** Üstte yapışkan koyu cam header; solda UC mühür + Umut/Cingisiz wordmark; sağda `ucmd`, cyan İletişim, mobilde hamburger. Altta footer (isim, domain, @github, sosyal, linkler). Arka plan: nokta grid + hafif aurora.

| Parça | Dosya | Ne işe yarar | Nasıl değiştirilir |
|-------|--------|--------------|-------------------|
| Layout / font / analytics | `src/app/layout.tsx` | Geist, dark, Analytics, Speed Insights, JsonLd | Font preload, provider env |
| Skip link | `skip-to-content.tsx` | “İçeriğe atla” → `#main-content` | Metin |
| Header | `site-header.tsx` | Nav, menü a11y, scroll progress, ucmd | `navItems` dizisi |
| Logo UC | `logo.tsx` | U \| C mühür + wordmark | Grid/flex harf yuvaları |
| Footer | `site-footer.tsx` | Telif, linkler | Metin / link listesi |
| Hidden terminal | `hidden-terminal.tsx` | Ctrl+` / openTerminal overlay | Komut `case`’leri |
| Network toast | `network-status.tsx` | Offline bildirimi (EN) | Metni TR’ye çek |
| Globals / token | `globals.css` | `--signal`, surfaces, motion, btn-* | CSS değişkenleri |
| www→apex | `next.config.ts` | Redirect | Host kuralı |

**Nav etiketleri:** Ana Sayfa · Hakkımda · Yetenekler · Projeler · Blog · Ziyaretçi Defteri  
**Hash izleme (home):** about, skills, projects, hiring, algorithm-lab, github, contact — nav’da hiring/lab/github/contact ayrı madde yok.

---

### 3.2 Ana sayfa sırası (`src/app/page.tsx`)

1. HashScroll  
2. ContactSuccessToast (`?contact=sent`)  
3. StatusBanner (CV missing/limited)  
4. Hero  
5. TerminalPrompt (ucmd)  
6. About (`#about`)  
7. Skills (`#skills`)  
8. Featured (`#projects`)  
9. Hiring (`#hiring`)  
10. Algorithm Lab (`#algorithm-lab`)  
11. GitHub (`#github`)  
12. Contact (`#contact`)

---

### 3.3 Hero — “ilk kare”

**Görüntü:** Sol kolon metin; sağda (desktop) eğimli profil foto + current_focus bandı; altta 3 stat kartı. Üstte yeşil Müsait pill.

| Parça | Dosya / kaynak | Değiştir |
|-------|----------------|----------|
| Müsait pill | `hero.tsx` + `availabilityLabel/Detail` | site-config |
| Role satırı | `siteConfig.role` | site-config |
| h1 ad | `siteConfig.name` | site-config |
| Headline (gradient) | `siteConfig.headline` | site-config |
| Bio | `siteConfig.shortBio` | site-config |
| CTA İletişim | ContactLink → `#contact` | `contact-link.tsx` |
| CTA Projeler | `/projects` | hero.tsx |
| CTA CV | `/api/resume` | resume route |
| Sosyal | `social-icons.tsx` | href listesi |
| Foto | `/profile.jpg` + GitHub fallback | public/ + githubUsername |
| Stats | `siteConfig.stats` | Okul/Konum/Odak |
| current_focus overlay | `siteConfig.currentFocus` | site-config |
| Tilt / Magnetic | `tilt-card.tsx`, `magnetic.tsx` | strength / allowlist |
| Ambient orb | hero + globals | mobilde gizli (LCP) |

**Risk:** İlk viewport yoğun (pill + role + ad + headline + bio + 3 CTA + sosyal + foto + stats).

---

### 3.4 ucmd TerminalPrompt — “ikinci kare”

**Görüntü:** `interactive.shell` etiketi + “ucmd — sitede komutla gez”; altında büyük koyu terminal kartı (traffic lights, ucmd badge, `$ show_projects()`, komut chip’leri, “Terminali aç”).

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Teaser UI | `terminal-prompt.tsx` | başlık, chip’ler, glow |
| Overlay shell | `hidden-terminal.tsx` | komutlar |
| Açma API | `lib/terminal.ts` | event adı |
| Header ucmd | `site-header.tsx` | her boyutta görünür |
| Tagline / ad | `siteConfig.terminal` | site-config |

**Komutlar (gerçek):** help, whoami, about, skills, projects/show_projects, blog, contact, social, resume/cv, status, version/ucmd, clear.

---

### 3.5 About (`#about`)

**Görüntü:** Sol: eyebrow `about.engineer` + h2 + description. Sağ: 3 surface kart (Sistem / Zanaat / Yayın). Altta “Deneyim” timeline.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| h2 / layout | `about-section.tsx` | başlık |
| Intro paragraf | `siteConfig.description` | site-config |
| 3 kart | `about-section.tsx` `cards` | title/body |
| Timeline | `timeline.tsx` + `milestones` | site-config.milestones |

---

### 3.6 Skills (`#skills`)

**Görüntü:** `stack.map()` · Yetkinlik haritası · iki kolon numaralı liste (Güçlü / Gelişen) · altta `tech.stack` araç panelleri.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Güçlü/Gelişen satırlar | `skills-section.tsx` | domain/detail/proof/href |
| Tech grupları | `siteConfig.techStack` | group/items |
| Lab deep-link | `#algorithm-lab` | lab id |

---

### 3.7 Featured / selected.case_studies (`#projects`)

**Görüntü:** 3 kolon (lg) kart; üstte kapak 16:10; badge Full-stack + durum; P/D/I; İncele / Kod.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Liste UI | `featured-projects-list.tsx` | açıklama, layout |
| Limit 3 | `featured-projects.tsx` | `getFeaturedProjects(3)` |
| İçerik | `src/content/projects/*.mdx` | featured, gallery, P/D/I |
| Kapak | `coverImage` veya `gallery[0]` | MDX |
| Status etiketi | `project-status.ts` | Yayında / Geliştiriliyor |

**Şu an featured:** Aras Mali, Bloomedu, Zeki Dekorasyon (`portfolio-web` featured:false).

---

### 3.8 Hiring (`#hiring`)

**Görüntü:** Sol sticky: h2, quick link 2×2 (Projeler/Blog/CI/Guestbook), reviewer_path, Lighthouse satırı. Sağ: Mimari/Kalite/Güvenlik/Yayın kartları + “Kanıtı incele →”.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Kartlar / linkler | `hiring-proof-section.tsx` | proofSignals, quickLinks |
| CI URL | `siteConfig.githubRepo` + `/actions` | site-config |
| Lighthouse sayıları | `lib/lighthouse-metrics.ts` | ölçüm sonrası güncelle |

---

### 3.9 Algorithm Lab (`#algorithm-lab`)

**Görüntü:** Senaryo butonları (Dengeli/Güvenli/Agresif) · maliyet · 8×5 grid yol · lejant.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Island lazy | `algorithm-lab-island.tsx` | dynamic import |
| Senaryolar | `algorithm-lab-section.tsx` `scenarios` | path/cost/signal |
| Skeleton | `algorithm-lab-skeleton.tsx` | yükleme UI |

---

### 3.10 GitHub (`#github`)

**Görüntü:** `github.signal` · recent repos · dil chip’leri · repo kartları.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Section | `github-activity-section.tsx` | kopya |
| Feed | `git-log-feed.tsx` | etiket |
| API | `lib/github-repos.ts` | per_page, revalidate |
| Dil override | `githubLanguageOverrides` | site-config |

---

### 3.11 Contact (`#contact`)

**Görüntü:** Sol İletişim metni + mailto kartı. Sağ secure.form (İsim/E-posta/Mesaj/Gönder). Başarıda altta toast.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Section kopya | `contact-section.tsx` | h2/lead |
| Form UI | `contact/contact-form.tsx` | alanlar |
| Zod | `lib/contact-schema.ts` | min uzunluk / mesajlar |
| Action | `actions/contact.ts` | redirect `/?contact=sent` |
| Toast | `contact-success-toast.tsx` | süre / metin |
| Rate limit | `contact-rate-limit.ts` | limitler; fail-closed |
| Banner CV | `status-banner.tsx` | resume query |

---

### 3.12 `/projects` arşiv

**Görüntü:** `project.archive` · h1 Projeler · review.mode sayaçları · status.live / status.wip showcase (görsel + metin flip).

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Sayfa | `app/projects/page.tsx` | gruplar, ProjectVisual |
| Meta | `lib/content/projects.ts` | yükleyici |
| MDX | `content/projects/*.mdx` | status, gallery |

**İçerik:** live → portfolio-web, bloomedu · building → aras-mali, zeki-dekorasyon.

---

### 3.13 `/projects/[slug]` + lightbox

**Görüntü:** case.study header · tags · repo/demo · product.screens galeri · architecture.decisions P/D/I · MDX gövde · prev/next · iletişim CTA.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Sayfa | `projects/[slug]/page.tsx` | layout |
| Galeri / lightbox | `project-gallery.tsx` | Escape/oklar; **focus trap eksik** |
| OG | `projects/[slug]/opengraph-image.tsx` | görsel |
| JSON-LD | CreativeWork | source |

---

### 3.14 Blog

| Rota | Dosya | Not |
|------|--------|-----|
| `/blog` | `blog/page.tsx` + `blog-post-list.tsx` | technical.notes · kartlar |
| `/blog/[slug]` | `[slug]/page.tsx` | MDX, related, view tracker |
| İçerik | `content/blog/*.mdx` | 3 yazı |
| Views | `/api/views/[slug]` + Redis | rate limit |

---

### 3.15 Guestbook

**Görüntü:** GitHub ile giriş · mesaj formu · onaylı liste · admin bekleyen/gizlenen.

| Parça | Dosya | Değiştir |
|-------|--------|----------|
| Sayfa | `guestbook/page.tsx` | UI |
| Actions | `guestbook/actions.ts` | moderasyon + cache tag |
| Auth | `auth.ts` GitHub OAuth | callback URL |
| DB | Drizzle + Neon `guestbook_entry` | schema |
| Cache | `listCachedApprovedEntries` 60s | guestbook.ts |
| E-posta giriş fikri | Plan §3 | henüz kodlanmadı |

---

### 3.16 SEO / sistem

| Parça | Dosya |
|-------|--------|
| Sitemap / robots | `sitemap.ts`, `robots.ts` |
| Root OG | `opengraph-image.tsx` |
| Metadata | `site-metadata.ts` |
| JSON-LD Person/WebSite | `json-ld.ts` |
| Manifest / icons | `manifest.ts`, `icon.tsx` |
| Sentry | `@sentry/nextjs` + tunnel |
| Resume API | `api/resume/route.ts` |
| CI | `.github/workflows/ci.yml` |

---

### 3.17 Tasarım token’ları (globals)

| Token | Kullanım |
|-------|----------|
| `--signal` cyan | CTA, focus, link |
| `--signal-glow` / strong | soft halo / btn-signal |
| `surface-plain/card/interactive` | kart varyantları |
| `--motion-*` | hover/reveal süreleri |
| `--radius-sm…xl` | köşe |
| `.btn-signal` `.btn-outline-rise` `.btn-ghost-rise` | CTA hiyerarşisi |
| Tilt allowlist | Hero foto · Featured · Projects arşiv |

---

## 4) Bulgular / eksikler (öncelik)

| Pri | Bulgu | Etki | Öneri |
|-----|--------|------|--------|
| P1 | Lightbox’ta focus trap yok | Klavyeli kullanıcı | Trap + ilk odak + restore |
| P1 | LCP skoru eski (72 / 3.8s) | Perf iddiası | Deploy sonrası yeniden ölç |
| P1 | GSC yapılmadı | Arama | MANUEL §1 |
| P2 | Network toast İngilizce | Dil tutarsızlığı | TR metin |
| P2 | StatusBanner `public/resume.pdf` yolu sızdırıyor | Amatör sinyal | Genel mesaj |
| P2 | Featured chip hep “Full-stack” | Esneklik | frontmatter.category |
| P2 | Hero ilk ekran yoğun | Recruiter okuma | Stats’ı küçült / kaydır |
| P2 | Lighthouse hiring sabit | Güven | metrics güncelle |
| P3 | Resume rate-limit Redis yoksa fail-open | Tutarlılık | Contact gibi fail-closed düşün |
| P3 | Nav’da hiring/lab yok | Keşif | İsteğe bağlı hash link |
| P3 | Guestbook yalnızca GitHub | Erişim | E-posta girişi (plan §3) |
| P3 | Playwright lokal browser eksik | Dev | `npx playwright install` |

---

## 5) Fonksiyon kontrol listesi (yeniden test)

| Fonksiyon | Beklenen | Durum |
|-----------|----------|--------|
| Home yüklenir | 200, bölümler | ✅ prod |
| ContactLink scroll | `#contact` | ✅ kod |
| Contact gönder → toast → URL temiz | `/?contact=sent` → `/` | ✅ kod + e2e spec |
| Contact validation | kısa mesaj soft uyarı | ✅ schema |
| Contact fail-closed | DB/Redis fail → blok | ✅ test |
| CV indir | PDF / missing / limited banner | ✅ kod |
| ucmd aç | header + teaser + Ctrl+` | ✅ kod |
| Terminal komutlar | projects/blog/contact… | ✅ kod |
| Featured kapak + İncele | 3 kart | ✅ kod / prod |
| Projects mobil görsel üstte | order/min-w-0 | ✅ kod |
| Lightbox Escape / oklar | dialog kapanır | ✅ kod + e2e |
| Skills proof linkleri | proje/blog/lab | ✅ |
| Hiring CI → repo/actions | githubRepo | ✅ |
| Lab senaryo değiştir | maliyet/grid | ✅ |
| GitHub recent + Java override | API + override | ✅ prod Java-Examples |
| Guestbook OAuth + moderasyon | Neon + Auth | ✅ (env’e bağlı) |
| Blog MDX + views | ISR / Redis | ✅ kod |
| www→apex | redirect | ✅ next.config |
| JSON-LD / sitemap / robots | SEO | ✅ |
| CI lint/type/test/e2e/build | workflow | ✅ repo |

---

## 6) Değişiklik rehberi (hızlı)

| Ne değişecek? | Nereye bak |
|---------------|------------|
| İsim / bio / okul / konum / müsait | `site-config.ts` |
| About kartları | `about-section.tsx` |
| Skills satırları | `skills-section.tsx` |
| Tech chip grupları | `site-config.techStack` |
| Proje hikâyesi / galeri | `content/projects/*.mdx` |
| Featured sayısı | `featured-projects.tsx` |
| Hiring kartları | `hiring-proof-section.tsx` |
| Contact metin / toast | `contact-section.tsx`, `contact-success-toast.tsx` |
| Form kuralları | `contact-schema.ts` |
| ucmd görünüm | `terminal-prompt.tsx`, `site-header.tsx` |
| Logo UC | `logo.tsx` |
| Renk / glow / surface | `globals.css` |
| Lighthouse rakamları | `lighthouse-metrics.ts` + AUDIT §1 |

---

## 7) Sonraki adımlar

1. Bu tur değişikliklerini **commit + push + deploy**  
2. `npm run lighthouse:home` → metrics + bu dosya skor satırı  
3. GSC + Safari manuel (`MANUEL-ADIMLAR`)  
4. İsteğe bağlı P1: lightbox focus trap  
5. İsteğe bağlı: guestbook e-posta girişi (plan §3)

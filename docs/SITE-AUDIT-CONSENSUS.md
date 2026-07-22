# Site Audit — Execution Roadmap (Consensus 10/10)

**Kaynaklar:** `SITE-AUDIT.md` × Senior görüşleri × Sprint modeli  
**Tarih:** 2026-07-22  
**Durum:** Sprint 0–5 + P1 kapanış (Lighthouse, contact e2e, error noindex) kodlandı. Kalanlar → `docs/AUDIT-REMAINING.md`

---

## Vision

**Goal:** Not to build a prettier portfolio.

To build a portfolio that instantly communicates **engineering maturity**, **product thinking**, and **trustworthiness**.

---

## North Star

Every UI element must either:

1. **Increase trust**, or  
2. **Improve navigation**, or  
3. **Show engineering capability**.

Otherwise it should be **removed**.

**Pusula (uygulama):** Daha fazla özellik değil — mevcut güçlü mühendisliği daha görünür ve daha güvenilir kılmak.

---

## Success Metrics (ürün seviyesi)

| Metrik | Nasıl ölçülür | Hedef |
|--------|----------------|--------|
| Recruiter trust | Fake/aspirational sinyal = 0; manuel senior review | Sprint 0 DoD yeşil |
| Time-to-Projects | Analytics: Home → `/projects` veya `#projects` | Hero sonrası hızlanır (Sprint 2 sonrası) |
| First-fold clarity | 5 sn okuma testi / heatmap | Tek ana mesaj |
| A11y blockers | Keyboard + SR checklist | 0 blocker |
| SEO correctness | Canonical audit (her route kendi URL’i) | %100 |
| Contact integrity | Fail-closed rate limit + success UX | Spam yolu kapalı |

Heatmap / session recording (opsiyonel Vercel Analytics / dış araç) Sprint 2+ için.

---

## Consensus skor (hatırlatma)

| Bölüm | Consensus |
|-------|----------:|
| Hero | 7.5 |
| Navbar | 6.7 |
| About | 7.6 |
| Skills | 7.0 |
| Algorithm Lab | 7.2 |
| Featured Projects | 8.1 |
| Hiring Proof | 6.5 (redesign) |
| Quality | 6.1 |
| GitHub | 6.0 |
| Contact | 8.1 |
| Footer | 7.5 |
| Projects | 8.1 |
| Blog | 7.5 |
| Guestbook | 8.1 |
| A11y | 6.5 |
| SEO | 7.2 |

Genel ~**7.3** (FAANG/craft ligi). Junior havuzunda ~8.8–9.

---

# Sprint 0 — Trust (+ Security + A11y bugs)

### KPI
- Fake data (sahte SHA / sahte freshness) = **0**
- Canonical coverage = **%100** (home + list + slug sayfalar)
- Accessibility blockers (mobil menü) = **0**
- Security blockers (contact fail-open) = **0**
- Hover-hidden primary proof CTA = **0**

### Risk → Mitigation
| Risk | Mitigation |
|------|------------|
| Canonical değişikliği index’i bozar | Per-route canonical; deploy sonrası Google Search Console / URL inspection |
| Fail-closed contact DB down iken form kapanır | Dürüst hata + mailto fallback metni; Resend yolu ayrı |
| Menü focus trap regress | Keyboard manuel test checklist |

### Rollback
| Değişiklik | Rollback |
|------------|----------|
| Canonical | `site-metadata.ts` + page metadata revert (~5 dk) |
| Contact fail-closed | `actions/contact.ts` catch davranışını revert |
| Git hash UI | `github-activity-section` / `git-log-feed` revert |
| Menü a11y | `site-header.tsx` revert |
| Hiring CTA | `hiring-proof-section.tsx` class revert |

### Test plan (Sprint 0)
- [ ] Manual: Desktop Chrome / Firefox / Safari  
- [ ] Manual: Mobile viewport menü aç/kapa  
- [ ] Keyboard: Tab trap, Escape, focus restore  
- [ ] Screen reader smoke: menü `aria-expanded` duyuruluyor  
- [ ] Contact: DB simülasyonu yoksa en azından fail path kod review  
- [ ] GitHub section: sahte hex hash yok  
- [ ] Hiring: “Kanıtı incele” hover’sız görünür  
- [ ] View-source / metadata: her route kendi canonical’ı  

### Definition of Done
Sahte hash yok · canonical doğru · contact fail-closed · hiring CTA görünür · mobil menü a11y checklist yeşil · quality claim dili “hedef/checklist”.

### Kapsam (uygulama) — kodlandı
1. [x] Fake git hash kaldır (seçenek B) + freshness fallback düzelt  
2. [x] Canonical per-route (`site-url.ts` + page metadata)  
3. [x] Contact fail-closed (+ success form gizle)  
4. [x] Hover-only hiring CTA kaldır  
5. [x] Mobile menu a11y (aria-expanded/controls, trap, Escape, restore, aria-current)  
6. [x] Quality aspirational soft-fix (`$ checklist`)  

---

# Sprint 1 — Design System

**Durum:** Kodlandı — `docs/DESIGN-SYSTEM.md` + token’lar + Tilt allowlist rollout

### KPI
- Card variants ≤ 3 → `surface-plain` / `surface-card` / `surface-interactive`  
- Glow types ≤ 2 → soft + strong (shimmer kapalı)  
- Radius tokens ≤ 4 → `--radius-sm|md|lg|xl`  
- Heading hierarchy → SectionEyebrow ritmi dokümante  
- Motion durations → `--motion-fast|base|slow|reveal`  

### Risk → Mitigation
| Risk | Mitigation |
|------|------------|
| Token değişikliği 40+ component etkiler | Önce doküman; Home’da Tilt allowlist kademeli; `premium-card` alias korundu |

### Rollback
`globals.css` + component PR revert (~dakikalar).

### Test plan
Visual diff Home + Projects + Contact; reduced-motion; mobile/desktop.

### Uygulandı
1. [x] `docs/DESIGN-SYSTEM.md`  
2. [x] Radius / motion / glow token’ları  
3. [x] 3 kart varyantı + shimmer kapatma  
4. [x] Tilt allowlist (Hero + Featured; About/Skills/Hiring/Quality/GitHub düz yüzey)  
5. [x] CTA glow yumuşatma  


---

# Sprint 2 — Home

Hero, About, Skills, Algorithm Lab.

### KPI
- Hero okunma / first-fold: ~10–12 sn → **6–8 sn**  
- First fold = **1 ana mesaj**  

### Checklist
1. [x] Hero: kısa bio, TR “Müsait”, dual CTA (İletişim + Projeler), tech chips fold altı  
2. [x] About: identity lead, TR proof chips, timeline `h3`  
3. [x] Skills: capability intro, `#algorithm-lab` deep-link, sakin tech chips, mobilde güçlü önce  
4. [x] Algorithm Lab: `id`, aria-live özet, trade-off framing, TR legend  

### Risk
Copy/CTA değişikliği conversion’ı bozabilir → analytics + A/B değilse soft launch.

---

# Sprint 3 — Product

Hiring redesign, Quality, GitHub polish, Contact polish, Guestbook UX, status helper.

### Checklist
1. [x] Hiring: `id`, unique artifact links, metrics → link strip  
2. [x] Quality: 2 madde + checklist dili + CI link + `id`  
3. [x] GitHub: skeleton Suspense, tek CTA/kart, partial-failure, `id`  
4. [x] Contact: per-field errors + `aria-describedby`  
5. [x] Guestbook: Hide her zaman görünür; env isimleri public copy’dan çıktı  
6. [x] Status helper: `project-status` util (list + detail)

---

# Sprint 4 — SEO

JSON-LD Person/WebSite/Article/CreativeWork, deep links.

### Checklist
1. [x] Person + WebSite `@graph` (root layout)  
2. [x] BlogPosting JSON-LD + related-by-tag + empty state  
3. [x] Project CreativeWork JSON-LD + end CTA  
4. [x] `pageSocial` (canonical + OG/Twitter) list & leaf routes  
5. [x] `not-found` metadata + `noindex`

---

# Sprint 5 — Polish

Animations, skeletons, empty/loading, micro-interactions.

### Checklist
1. [x] Shared terminal open API (`portfolio:terminal` event)  
2. [x] Algorithm Lab code-split + skeleton  
3. [x] Featured public empty + category/status badges  
4. [x] Blog/project slug `loading.tsx` skeletons  
5. [x] Terminal caret reduced-motion + aria-label  
6. [x] Scroll progress `aria-hidden`  
7. [x] Project next/prev navigation  
8. [x] Contact schema + guestbook rate-limit unit tests  

---

## Technical Debt (feature’dan ayrı)

| Borç | Not | Hedef sprint |
|------|-----|--------------|
| `premium-card` / Tilt / glow tekrarı | Variant API | Sprint 1 → 3 ✅ |
| Nested links (Featured / Repo cards) | Tek primary CTA | Sprint 2–3 ✅ |
| Status helper duplication | Shared util | Sprint 3 ✅ |
| Suspense `fallback={null}` GitHub | Skeleton | Sprint 3 ✅ |
| Terminal sentetik Ctrl+` | Shared open API | Sprint 5 ✅ |
| Action test coverage | Contact/guestbook | Sprint 5 ✅ |
| Bundle / motion islands | Code-split lab | Sprint 5 ✅ |

---

## Release Checklist (her sprint)

1. KPI’lar yeşil mi?  
2. Test plan tamam mı?  
3. Rollback yolu yazılı mı?  
4. North Star ihlali var mı? (güven/nav/capability dışı UI)  
5. `npm run typecheck` + ilgili check’ler  
6. Production deploy + smoke  

---

## Post-release Audit

- Recruiter 30 sn testi (insan)  
- Canonical spot-check  
- Mobil menü keyboard  
- Contact happy path  
- Sentry’de yeni error yok  

---

## Doküman puanı (senior)

İlk consensus: ~9.5/10  
Vision + North Star + KPI + Success Metrics + Risk + Rollback + Tech Debt + Test Plan → **10/10 hedef yapı**.

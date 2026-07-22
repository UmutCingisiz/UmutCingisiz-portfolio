# Design System — Portfolio v2

**Branch:** `feature/portfolio-v2`  
**North Star:** Her UI öğesi trust ↑ veya navigation ↑ veya engineering capability ↑ — değilse kaldır.  
**Sprint:** 1 (token + tutarlılık temeli)

---

## 1) Tek tasarım dili var mı?

**Evet — hedef bu dokümandır.**  
Dil: koyu zinc yüzey, tek sinyal rengi (cyan/`--signal`), mono eyebrow + sans gövde, sakin kartlar.

---

## 2) Motion bütçesi

| Token | Süre | Kullanım |
|-------|------|----------|
| `--motion-fast` | 150ms | Hover border/color |
| `--motion-base` | 250ms | Buton, kart hover |
| `--motion-slow` | 400ms | Panel, drawer |
| `--motion-reveal` | 500ms | Reveal / section enter |

**Kurallar**
- Aynı anda en fazla **2** dikkat çeken motion (ör. sayfa enter + bir hover).
- `prefers-reduced-motion: reduce` → tilt/shine/orb animasyonu kapalı (CSS + JS).
- Magnetic yalnızca **birincil CTA** (nav İletişim, Hero primary). Kartlarda yok.

---

## 3) Glow bütçesi (≤ 2 tip)

| Tip | Token | Nerede |
|-----|--------|--------|
| Soft | `--signal-glow` | Focus ring halo, hafif CTA |
| Strong | `--signal-glow-strong` | Yalnızca `.btn-signal` |

**Yasak / sınırlı**
- Kart içi sürekli glow halo yok.
- `ambient-orb` sayfa başına **en fazla 1** ve düşük opacity (dekoratif soft glow sayılır; strong değil).
- Kart shimmer (`premium-card::before`) **kapalı** (AI-portfolio hissi).

---

## 4) Tilt allowlist

Tilt **yalnızca** değer kattığı yerde:

| İzinli | Bileşen |
|--------|---------|
| ✅ | Hero profil foto kartı |
| ✅ | Featured Projects kartları |
| ✅ | Projects arşiv kartları (liste) |
| ❌ | About, Skills, Hiring, Quality, GitHub, Contact, Blog list |

`TiltCard` `enabled={false}` veya düz `div`/`article` kullan.

---

## 5) Radius token’ları (≤ 4)

| Token | Değer | Kullanım |
|-------|-------|----------|
| `--radius-sm` | 0.5rem (8px) | Chip, input, kbd |
| `--radius-md` | 0.75rem (12px) | Buton, küçük kart |
| `--radius-lg` | 1rem (16px) | Section kart, panel |
| `--radius-xl` | 1.5rem (24px) | Hero media, büyük bento |

Keyfi `rounded-[1.75rem]` / `rounded-[2rem]` **yeni kodda yasak**; token kullan.

---

## 6) Kart varyantları (≤ 3)

| Variant | Class | Ne zaman |
|---------|-------|----------|
| Plain | `surface-plain` | Metin kutusu, proof list, form yan paneli |
| Card | `surface-card` (alias: `premium-card`) | Standart bilgi kartı — border + soft surface, **shimmer yok** |
| Interactive | `surface-interactive` | Tıklanabilir / tilt’li vitrin kartı |

---

## 7) Heading + section ritmi

```
SectionEyebrow (mono)
→ h2 (text-3xl / sm:text-4xl, tracking-tight)
→ lead (text-base leading-7 text-muted-foreground, max-w-2xl|3xl)
→ içerik (mt-10 | mt-12)
```

Section dikey: `py-24 sm:py-32`, `scroll-mt-24`.  
Her Home bölümünün **tek cümle amacı** (örtüşme yok):

| Bölüm | Amaç |
|------|------|
| Hero | Kim + tek vaat + CTA |
| About | Nasıl mühendislik yaptığı |
| Skills | Güçlü / gelişen yetenek haritası |
| Algorithm Lab | Trade-off düşüncesi (viz) |
| Featured | P/D/I case study vitrini |
| Hiring | Doğrulanabilir kanıt linkleri |
| Quality | Checklist / standartlar (aspirasyon değil ölçüm dili) |
| GitHub | Canlı repo sinyali (dürüst) |
| Contact | Dönüşüm / konuşma |

Hiring vs Quality: Hiring = linkli kanıt; Quality = disiplin checklist. Aynı metrik iki yerde tekrar etmez.

---

## 8) CTA hierarchy

| Seviye | Görünüm | Örnek |
|--------|---------|--------|
| Primary | `.btn-signal` | Projeleri İncele, İletişim, Gönder |
| Secondary | border + `bg-card/55` | CV İndir, Tümünü gör |
| Ghost / text | underline veya text-signal | case study →, Kanıtı incele → |

Bir kartta **tek** primary hit target.

---

## Uygulama notu

Sprint 1 = token + doküman + Tilt allowlist rollout + shimmer kapatma.  
Hero copy sadeleştirme → **Sprint 2**.

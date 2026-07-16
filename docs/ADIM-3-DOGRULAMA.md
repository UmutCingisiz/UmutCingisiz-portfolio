# Adım 3 — Yerel doğrulama (localhost)

Önce otomatik:

```bash
npm run check:assets
npm run check:env
npm run check:db
npm run build
```

Hepsi OK ise:

```bash
npm run dev
```

## Kontrol listesi

| # | Sayfa | Beklenen |
|---|--------|----------|
| 1 | http://localhost:3000 | Hero, profil fotoğrafı, GitHub repoları bölümü |
| 2 | `/projects` | 3 proje kartı (`bloomedu`, `portfolio-web`, `zeki-dekorasyon`) |
| 3 | `/blog` | 3 yazı |
| 4 | `/guestbook` | GitHub giriş → mesaj → moderasyon → onay → listede görünür |
| 5 | `/#contact` | Form: Resend yoksa hata metni; **mailto** linki çalışır |
| 6 | **CV İndir** | `resume.pdf` iner |
| 7 | Tema toggle | Açık / koyu geçiş |

Guestbook moderasyon: giriş yaptığın hesap `.env.local` içindeki `GUESTBOOK_ADMIN_GITHUB_IDS` ile eşleşmeli.

## Sorun giderme

| Belirti | Çözüm |
|---------|--------|
| OAuth redirect hatası | GitHub App callback tam: `http://localhost:3000/api/auth/callback/github` |
| Guestbook DB hatası | `npm run check:db`, SQL scriptleri tekrar |
| `.env` değişti, etki yok | `npm run dev` yeniden başlat |

Adım 3 tamamsa → içerik kişiselleştirme veya domain sonrası servisler.

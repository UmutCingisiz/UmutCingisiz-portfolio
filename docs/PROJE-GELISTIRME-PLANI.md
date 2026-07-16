# Proje Gelistirme Plani (Tek Teknik Kaynak)

Bu dokuman, portfolyonun potansiyel eksiklerini, risklerini ve "en iyi hale getirme" yol haritasini tek yerde toplar.

## 1) Kritik teknik hedefler

- Test kapsamini buyut: content + helper + action katmanlarina unit test ekle.
- CI kalitesini artir: lint, typecheck, test, build adimlarini zorunlu tut.
- Gozlemlenebilirlik ekle: production hata loglari ve form/guestbook olay metrikleri.
- Guvenlik sertlestir: rate-limit stratejilerini dokumante et ve izleme dashboard'u ekle.

## 2) Potansiyel riskler ve iyilestirme firsatlari

### Altyapi
- Upstash Redis ve Resend yoksa bazi ozellikler degrade calisir.
- Env konfigurasyonunda production/domain gecisinde hata riski var.

### Kod kalitesi
- Bazi modullerde test kapsami hala sinirli.
- Icerik dogrulamasinda daha kati kurallar (zorunlu frontmatter) dusunulebilir.

### Urun deneyimi
- Mobil ve performans turlari duzenli periyotla tekrar edilmeli.
- Blog/proje kartlarinda teknik sinyal guclendirilmeye devam etmeli.

## 3) Siteyi en iyi hale getirmek icin gerekenler

### P0 (hemen)
- Production icin domain + env + OAuth callback + smoke test.
- Redis ve Resend entegrasyonlarini aktif ederek tum ozellikleri production parity seviyesine cek.

### P1 (kisa vade)
- Test setini arttir (guestbook/contact action senaryolari, content parser edge-case testleri).
- CI'ya coverage raporu ve minimum esit ekle.
- 404/error/loading durumlarini kullanici dilinde daha da rafine et.

### P2 (orta vade)
- Performans butcesi tanimla (LCP, INP, CLS hedefleri).
- A11y denetimi (keyboard flow, focus, contrast) ve duzeltmeleri tamamla.
- Icerik tarafinda proje bazli mimari diyagramlar ve olculebilir impact metrikleri ekle.

## 4) Teknik kapanis checklist'i

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run check:all`
- [ ] Production smoke test

## 5) Calisma prensibi (devam eden)

- Her degisiklikte once kalite kapisi, sonra deploy.
- Ana hedef: stabilite + teknik derinlik + etkileyici urun sunumu.

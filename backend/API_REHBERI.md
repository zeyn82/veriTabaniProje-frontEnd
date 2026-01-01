# ✈️ Havaalanı Yönetim Sistemi API Rehberi

Sunucu Adresi: `http://localhost:3000`

### 1. Özel Fonksiyonlar
- **Tüm Uçuş Detayları (View):** `GET /api/ucus-detay`
- **Bilet Satışı (Procedure + Trigger):** `POST /api/bilet-sat`
- **İstatistikler (Aggregate):** `GET /api/istatistikler`
- **Uçuşun Yolcuları (Cursor):** `GET /api/ucus-yolculari/:id`

### 2. CRUD İşlemleri
- **Yolcular:** `GET /api/yolcular`, `POST /api/yolcu-ekle`, `PUT /api/yolcu-guncelle/:id`, `DELETE /api/yolcu-sil/:id`
- **Havalimanları:** `GET /api/havalimanlari`, `DELETE /api/havalimani-sil/:id`
- **Uçaklar:** `GET /api/ucaklar`
- **Bagajlar:** `GET /api/bagajlar`, `POST /api/bagaj-ekle`
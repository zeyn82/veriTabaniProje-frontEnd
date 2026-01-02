const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELEME (GET) - Kişileri ve Rollerini Getir
router.get('/', async (req, res) => {
  try {
    // JOIN işlemi ile kişinin hangi tabloda (Pilot mu Kabin mi) olduğunu buluyoruz
    const query = `
      SELECT 
        p.personel_id, 
        p.personel_ad, 
        p.personel_soyad,
        CASE 
            WHEN pl.personel_id IS NOT NULL THEN 'Pilot'
            WHEN kb.personel_id IS NOT NULL THEN 'Kabin'
            ELSE 'Atanmamış'
        END AS rol
      FROM personel p
      LEFT JOIN pilot pl ON p.personel_id = pl.personel_id
      LEFT JOIN kabin kb ON p.personel_id = kb.personel_id
      ORDER BY p.personel_id ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLEME (POST) - Hem Personel Hem Rol Tablosuna Ekle
router.post('/', async (req, res) => {
  try {
    const { personel_id, personel_ad, personel_soyad, rol } = req.body;

    console.log("📥 Kayıt İsteği:", { personel_id, rol });

    // ADIM A: Önce Ana Tabloya (Personel) Ekle
    await pool.query(
      "INSERT INTO personel (personel_id, personel_ad, personel_soyad) VALUES ($1, $2, $3)",
      [personel_id, personel_ad, personel_soyad]
    );

    // ADIM B: Role Göre Alt Tabloya Ekle
    if (rol === 'Pilot') {
      // Pilot tablosuna ekle
      await pool.query("INSERT INTO pilot (personel_id) VALUES ($1)", [personel_id]);
    } 
    else if (rol === 'Kabin') {
      // Kabin tablosuna ekle (Deneyim yılı boş olamaz hatası için varsayılan 1 veriyoruz)
      await pool.query("INSERT INTO kabin (personel_id, deneyim_yili) VALUES ($1, 1)", [personel_id]);
    }

    // Başarılı cevabı döndür
    res.json({ personel_id, personel_ad, personel_soyad, rol });

  } catch (err) {
    console.error("❌ Ekleme Hatası:", err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. SİLME (DELETE) - Her İki Yerden Sil
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // PostgreSQL'de "Cascade Delete" ayarı yoksa hata almamak için 
    // önce alt tablolardan (Pilot/Kabin), sonra ana tablodan (Personel) siliyoruz.
    
    await pool.query("DELETE FROM pilot WHERE personel_id = $1", [id]);
    await pool.query("DELETE FROM kabin WHERE personel_id = $1", [id]);
    
    // Altlar temizlendikten sonra ana kaydı sil
    await pool.query("DELETE FROM personel WHERE personel_id = $1", [id]);

    res.json("Başarıyla silindi");
  } catch (err) {
    console.error("❌ Silme Hatası:", err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
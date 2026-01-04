const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELEME (GET)
router.get('/', async (req, res) => {
  try {
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

// 2. EKLEME (POST)
router.post('/', async (req, res) => {
  try {
    const { personel_id, personel_ad, personel_soyad, rol } = req.body;

    // A) Önce Ana Tabloya (Personel) Ekle
    await pool.query(
      "INSERT INTO personel (personel_id, personel_ad, personel_soyad) VALUES ($1, $2, $3)",
      [personel_id, personel_ad, personel_soyad]
    );

    // B) Role Göre Alt Tabloya Ekle
    if (rol === 'Pilot') {
      await pool.query("INSERT INTO pilot (personel_id) VALUES ($1)", [personel_id]);
    } 
    else if (rol === 'Kabin') {
      await pool.query("INSERT INTO kabin (personel_id, deneyim_yili) VALUES ($1, 1)", [personel_id]);
    }

    res.json({ personel_id, personel_ad, personel_soyad, rol });

  } catch (err) {
    console.error("❌ Ekleme Hatası:", err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. 🔥 GÜNCELLEME (PUT) - YENİ EKLENDİ
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { personel_ad, personel_soyad } = req.body;

    // Sadece Personel tablosundaki isimleri güncelliyoruz
    // (Rol değiştirmek karmaşık olduğu için şimdilik sadece isim)
    const guncelPersonel = await pool.query(
      "UPDATE personel SET personel_ad = $1, personel_soyad = $2 WHERE personel_id = $3 RETURNING *",
      [personel_ad, personel_soyad, id]
    );

    // Rol bilgisini tekrar çekip dönmek gerekebilir ama şimdilik frontend hallediyor
    res.json(guncelPersonel.rows[0]);

  } catch (err) {
    console.error("❌ Güncelleme Hatası:", err.message);
    res.status(500).send('Güncelleme hatası');
  }
});

// 4. SİLME (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query("DELETE FROM pilot WHERE personel_id = $1", [id]);
    await pool.query("DELETE FROM kabin WHERE personel_id = $1", [id]);
    await pool.query("DELETE FROM personel WHERE personel_id = $1", [id]);

    res.json("Başarıyla silindi");
  } catch (err) {
    console.error("❌ Silme Hatası:", err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
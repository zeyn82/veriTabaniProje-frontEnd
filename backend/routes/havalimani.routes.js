const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM havalimani ORDER BY havalimani_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLE (POST)
router.post('/', async (req, res) => {
  try {
    const { havalimani_id, havalimani_adi, sehir } = req.body;
    
    const yeniHavalimani = await pool.query(
      "INSERT INTO havalimani (havalimani_id, havalimani_adi, sehir) VALUES ($1, $2, $3) RETURNING *",
      [havalimani_id, havalimani_adi, sehir]
    );

    res.json(yeniHavalimani.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. 🔥 GÜNCELLE (PUT) - YENİ EKLENDİ
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // URL'den gelen ID (örn: IST)
    const { havalimani_adi, sehir } = req.body;

    const guncelHavalimani = await pool.query(
      "UPDATE havalimani SET havalimani_adi = $1, sehir = $2 WHERE havalimani_id = $3 RETURNING *",
      [havalimani_adi, sehir, id]
    );

    res.json(guncelHavalimani.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Güncelleme hatası');
  }
});

// 4. SİL (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM havalimani WHERE havalimani_id = $1", [id]);
    res.json("Silindi");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM yolcu ORDER BY yolcu_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLE (POST)
router.post('/', async (req, res) => {
  try {
    const { yolcu_ad, yolcu_soyad, telefon } = req.body;
    
    const yeniYolcu = await pool.query(
      "INSERT INTO yolcu (yolcu_ad, yolcu_soyad, telefon) VALUES ($1, $2, $3) RETURNING *",
      [yolcu_ad, yolcu_soyad, telefon]
    );

    res.json(yeniYolcu.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. 🔥 GÜNCELLE (PUT) - YENİ EKLENDİ
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { yolcu_ad, yolcu_soyad, telefon } = req.body;

    const guncelYolcu = await pool.query(
      "UPDATE yolcu SET yolcu_ad = $1, yolcu_soyad = $2, telefon = $3 WHERE yolcu_id = $4 RETURNING *",
      [yolcu_ad, yolcu_soyad, telefon, id]
    );

    res.json(guncelYolcu.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Güncelleme hatası');
  }
});

// 4. SİL (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM yolcu WHERE yolcu_id = $1", [id]);
    res.json("Silindi");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
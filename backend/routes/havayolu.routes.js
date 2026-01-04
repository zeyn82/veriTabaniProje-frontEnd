const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM havayolu ORDER BY havayolu_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLE (POST)
router.post('/', async (req, res) => {
  try {
    const { havayolu_id, havayolu_adi } = req.body;
    
    const yeniHavayolu = await pool.query(
      "INSERT INTO havayolu (havayolu_id, havayolu_adi) VALUES ($1, $2) RETURNING *",
      [havayolu_id, havayolu_adi]
    );

    res.json(yeniHavayolu.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. 🔥 GÜNCELLE (PUT) - YENİ EKLENDİ
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // URL'den gelen ID (örn: THY)
    const { havayolu_adi } = req.body;

    const guncelHavayolu = await pool.query(
      "UPDATE havayolu SET havayolu_adi = $1 WHERE havayolu_id = $2 RETURNING *",
      [havayolu_adi, id]
    );

    res.json(guncelHavayolu.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Güncelleme hatası');
  }
});

// 4. SİL (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM havayolu WHERE havayolu_id = $1", [id]);
    res.json("Silindi");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
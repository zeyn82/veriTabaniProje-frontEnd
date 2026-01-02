const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bagaj');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLE (POST) -> 🔥 Bunu eklemezsen kayıt çalışmaz!
router.post('/', async (req, res) => {
  try {
    const { bagaj_no, agirlik, yolcu_id } = req.body;
    
    const yeniBagaj = await pool.query(
      "INSERT INTO bagaj (bagaj_no, agirlik, yolcu_id) VALUES ($1, $2, $3) RETURNING *",
      [bagaj_no, agirlik, yolcu_id]
    );

    res.json(yeniBagaj.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. SİL (DELETE)
router.delete('/:no', async (req, res) => {
  try {
    const { no } = req.params;
    await pool.query("DELETE FROM bagaj WHERE bagaj_no = $1", [no]);
    res.json("Silindi");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
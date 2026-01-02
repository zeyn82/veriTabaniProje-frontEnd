const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE
router.get('/', async (req, res) => {
  try {
    // Uçakları getirirken Havayolu ismini de (JOIN ile) getiriyoruz
    const query = `
      SELECT u.*, h.havayolu_adi 
      FROM ucak u
      LEFT JOIN havayolu h ON u.havayolu_id = h.havayolu_id
      ORDER BY u.ucak_id ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLE (POST) -> 🔥 havayolu_id EKLENDİ
router.post('/', async (req, res) => {
  try {
    // Frontend'den havayolu_id de gelmeli!
    const { ucak_id, model, kapasite, havayolu_id } = req.body;
    
    const yeniUcak = await pool.query(
      "INSERT INTO ucak (ucak_id, model, kapasite, havayolu_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [ucak_id, model, kapasite, havayolu_id]
    );

    res.json(yeniUcak.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Hata: ' + err.message);
  }
});

// 3. SİL
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM ucak WHERE ucak_id = $1", [id]);
    res.json("Silindi");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
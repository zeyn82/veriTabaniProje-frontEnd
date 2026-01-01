const express = require('express');
const router = express.Router();
const pool = require('../db');

// Tüm yolcuları getir
router.get('/', async (req, res) => {
  try {
    // DİKKAT: Veritabanından verileri çekiyoruz
    const result = await pool.query('SELECT * FROM yolcu');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;
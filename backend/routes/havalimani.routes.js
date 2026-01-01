const express = require('express');
const router = express.Router();
const pool = require('../db');

// Tüm havalimanlarını getir
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM havalimani');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;
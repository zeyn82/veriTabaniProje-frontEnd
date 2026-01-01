const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 1. TÜM UÇUŞLARI GETİR (İsimleriyle Birlikte)
router.get('/', async (req, res) => {
  try {
    // Bu SQL sorgusu ID'leri isme çevirir
    const query = `
      SELECT 
        u.ucus_id, 
        u.kalkis, 
        u.varis, 
        uc.model AS ucak_model,
        hy.havayolu_adi,
        h1.havalimani_adi AS kalkis_yeri,
        h2.havalimani_adi AS varis_yeri
      FROM ucus u
      LEFT JOIN ucak uc ON u.ucak_id = uc.ucak_id
      LEFT JOIN havayolu hy ON u.havayolu_id = hy.havayolu_id
      LEFT JOIN havalimani h1 ON u.kalkishavalimani_id = h1.havalimani_id
      LEFT JOIN havalimani h2 ON u.varishavalimani_id = h2.havalimani_id
      ORDER BY u.kalkis ASC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Uçuşlar çekilemedi:", err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;
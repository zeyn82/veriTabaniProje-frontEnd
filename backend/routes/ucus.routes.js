const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET) - İsimleri Getirmek için 4 Tane JOIN yapıyoruz
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        u.ucus_id, 
        u.kalkis, 
        u.varis, 
        u.ucak_id,
        u.havayolu_id,
        u.kalkishavalimani_id,
        u.varishavalimani_id,
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

// 2. EKLE (POST) -> 🔥 Frontend'den gelen veriyi kaydeden kısım
router.post('/', async (req, res) => {
  try {
    const { 
      ucus_id, 
      kalkis, 
      varis, 
      ucak_id, 
      havayolu_id, 
      kalkishavalimani_id, 
      varishavalimani_id 
    } = req.body;
    
    const yeniUcus = await pool.query(
      `INSERT INTO ucus (
         ucus_id, kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id
       ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [ucus_id, kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id]
    );

    res.json(yeniUcus.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Uçuş eklenirken hata oluştu: ' + err.message);
  }
});

// 3. SİL (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM ucus WHERE ucus_id = $1", [id]);
    res.json("Uçuş silindi!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
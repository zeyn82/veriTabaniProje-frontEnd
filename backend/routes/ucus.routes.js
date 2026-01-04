const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        u.ucus_id, u.kalkis, u.varis, u.ucak_id, u.havayolu_id,
        u.kalkishavalimani_id, u.varishavalimani_id,
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
  } catch (err) { res.status(500).send(err.message); }
});

// 2. EKLE (POST)
router.post('/', async (req, res) => {
  try {
    const { ucus_id, kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id } = req.body;
    
    const yeniUcus = await pool.query(
      `INSERT INTO ucus (ucus_id, kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [ucus_id, kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id]
    );
    res.json(yeniUcus.rows[0]);
  } catch (err) { res.status(500).send(err.message); }
});

// 3. 🔥 GÜNCELLE (PUT) - YENİ EKLENDİ
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id } = req.body;

    const guncelUcus = await pool.query(
      `UPDATE ucus SET 
         kalkis = $1, varis = $2, ucak_id = $3, havayolu_id = $4, 
         kalkishavalimani_id = $5, varishavalimani_id = $6 
       WHERE ucus_id = $7 RETURNING *`,
      [kalkis, varis, ucak_id, havayolu_id, kalkishavalimani_id, varishavalimani_id, id]
    );
    res.json(guncelUcus.rows[0]);
  } catch (err) { res.status(500).send(err.message); }
});

// 4. SİL (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM ucus WHERE ucus_id = $1", [req.params.id]);
    res.json("Silindi");
  } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;
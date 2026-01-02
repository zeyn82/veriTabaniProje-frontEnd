const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. LİSTELE (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bilet');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. EKLE (POST)
router.post('/', async (req, res) => {
  try {
    const { bilet_no, koltuk_no, ucus_id, yolcu_id } = req.body;
    
    const yeniBilet = await pool.query(
      "INSERT INTO bilet (bilet_no, koltuk_no, ucus_id, yolcu_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [bilet_no, koltuk_no, ucus_id, yolcu_id]
    );

    res.json(yeniBilet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Kayıt hatası: ' + err.message);
  }
});

// 3. GÜNCELLE (PUT)
router.put('/:no', async (req, res) => {
  try {
    const { no } = req.params;
    const { koltuk_no, ucus_id, yolcu_id } = req.body;

    const guncelBilet = await pool.query(
      "UPDATE bilet SET koltuk_no = $1, ucus_id = $2, yolcu_id = $3 WHERE bilet_no = $4 RETURNING *",
      [koltuk_no, ucus_id, yolcu_id, no]
    );

    res.json(guncelBilet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Güncelleme hatası');
  }
});

// 4. SİL (DELETE)
router.delete('/:no', async (req, res) => {
  try {
    const { no } = req.params;
    await pool.query("DELETE FROM bilet WHERE bilet_no = $1", [no]);
    res.json("Silindi");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
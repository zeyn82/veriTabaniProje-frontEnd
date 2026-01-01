const express = require('express');
const router = express.Router();
const pool = require('../db'); // Veritabanı bağlantımızı çağırdık

// 1. TÜM BİLETLERİ GETİR (Frontend bunu istiyor)
// Adres: /api/bilet
router.get('/', async (req, res) => {
  try {
    // Biletleri getirirken karmaşık ID'ler yerine okunabilir bilgileri JOIN ile çekiyoruz
    const query = `
      SELECT * FROM bilet
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. BİLET SAT (EKLE)
// Adres: /api/bilet
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
    res.status(500).send('Bilet eklenirken hata oluştu');
  }
});

// 3. BİLET GÜNCELLE
// Adres: /api/bilet/:no
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

// 4. BİLET SİL
// Adres: /api/bilet/:no
router.delete('/:no', async (req, res) => {
  try {
    const { no } = req.params;
    await pool.query("DELETE FROM bilet WHERE bilet_no = $1", [no]);
    res.json("Bilet silindi!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Silme hatası');
  }
});

module.exports = router;
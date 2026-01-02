const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. TÜM YOLCULARI GETİR (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM yolcu ORDER BY yolcu_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// 2. YENİ YOLCU EKLE (POST) -> 🔥 YENİ KISIM BURASI
router.post('/', async (req, res) => {
  try {
    // Frontend'den gelen verileri alıyoruz
    const { yolcu_ad, yolcu_soyad, telefon } = req.body;

    // ID'yi otomatik oluşturuyoruz (Rastgele bir sayı)
    // Not: Normalde veritabanı bunu kendi yapar (SERIAL) ama şimdilik böyle çözelim.
    const yolcu_id = Math.floor(Math.random() * 100000); 

    const yeniYolcu = await pool.query(
      "INSERT INTO yolcu (yolcu_id, yolcu_ad, yolcu_soyad, telefon) VALUES ($1, $2, $3, $4) RETURNING *",
      [yolcu_id, yolcu_ad, yolcu_soyad, telefon]
    );

    // Kaydedilen veriyi Frontend'e geri dönüyoruz
    res.json(yeniYolcu.rows[0]);
    
  } catch (err) {
    console.error("Yolcu eklenemedi:", err.message);
    res.status(500).send('Yolcu eklenirken hata oluştu');
  }
});

// 3. YOLCU SİL (DELETE) -> 🔥 BUNU DA EKLEYELİM
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM yolcu WHERE yolcu_id = $1", [id]);
    res.json("Yolcu silindi!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../db');

// TÜM PERSONELİ VE ROLLERİNİ GETİR
router.get('/', async (req, res) => {
  try {
    // 🧠 MANTIK:
    // 1. Personel tablosunu temel alıyoruz.
    // 2. 'pilot' tablosuna bakıyoruz: Eşleşme varsa (pl.personel_id doluysa) bu kişi Pilottur.
    // 3. 'kabin' tablosuna bakıyoruz: Eşleşme varsa (kb.personel_id doluysa) bu kişi Kabin Memurudur.
    
    const query = `
      SELECT 
        p.personel_id, 
        p.personel_ad, 
        p.personel_soyad,
        CASE 
            WHEN pl.personel_id IS NOT NULL THEN 'Pilot'
            WHEN kb.personel_id IS NOT NULL THEN 'Kabin'
            ELSE 'Atanmamış'
        END AS rol
      FROM personel p
      LEFT JOIN pilot pl ON p.personel_id = pl.personel_id
      LEFT JOIN kabin kb ON p.personel_id = kb.personel_id
      ORDER BY p.personel_id ASC
    `;

    const result = await pool.query(query);
    
    // Frontend'e temizlenmiş veriyi yolluyoruz
    res.json(result.rows);

  } catch (err) {
    console.error("Personel verisi çekilemedi:", err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

module.exports = router;
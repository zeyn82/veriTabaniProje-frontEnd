const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

// --- ROUTE DOSYALARINI ÇAĞIR ---
const yolcuRoutes = require('./routes/yolcu.routes');
const ucusRoutes = require('./routes/ucus.routes');
const biletRoutes = require('./routes/bilet.routes');
// Yeni Eklenenler:
const havalimaniRoutes = require('./routes/havalimani.routes');
const havayoluRoutes = require('./routes/havayolu.routes');
const ucakRoutes = require('./routes/ucak.routes');
const personelRoutes = require('./routes/personel.routes');
const bagajRoutes = require('./routes/bagaj.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- ENDPOINT TANIMLARI ---
// Frontend bu adreslere istek atacak:
app.use('/api/yolcu', yolcuRoutes);
app.use('/api/ucus', ucusRoutes);      // Frontend'de /api/ucus demiştik
app.use('/api/bilet', biletRoutes);
app.use('/api/havalimani', havalimaniRoutes);
app.use('/api/havayolu', havayoluRoutes);
app.use('/api/ucak', ucakRoutes);
app.use('/api/personel', personelRoutes);
app.use('/api/bagaj', bagajRoutes);

// Test Endpoint
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
        message: "Backend ve Veritabanı sorunsuz çalışıyor! 🚀", 
        sunucu_saati: result.rows[0].now 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Veritabanına bağlanılamadı!" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
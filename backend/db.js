const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS, // DÜZELTİLDİ: .env dosyasındaki isimle aynı yapıldı
  port: process.env.DB_PORT,
});

// --- BAĞLANTIYI TEST ETME KISMI (Bunu ekledim) ---
pool.connect()
  .then(() => console.log('✅ Veritabanı Bağlantısı BAŞARILI!'))
  .catch(err => console.error('❌ Veritabanı Bağlantı HATASI:', err.message));

module.exports = pool;
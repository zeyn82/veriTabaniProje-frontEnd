// 'pg' kütüphanesinden Pool (bağlantı havuzu) sınıfını içe aktarır. 
// Bu, veritabanına her seferinde yeni bağlantı açmak yerine verimli bir havuz yönetimi sağlar.
const { Pool } = require('pg');
// '.env' dosyasındaki değişkenleri okumamızı sağlayan dotenv yapılandırmasını yükler.
require('dotenv').config();

// Bu yapı, bilgileri .env dosyasından okur
// Veritabanı bağlantı bilgilerini içeren yeni bir havuz (pool) örneği oluşturur.
const pool = new Pool({
  // Veritabanı kullanıcı adını (genelde 'postgres') .env dosyasından çeker.  
  user: process.env.DB_USER,
  // Veritabanının çalıştığı sunucu adresini (genelde 'localhost') .env'den çeker.
  host: process.env.DB_HOST,
  // Bağlanılacak veritabanının adını (Örn: 'havaalani_db') .env'den çeker.
  database: process.env.DB_NAME,
  // PostgreSQL kullanıcı şifresini güvenli bir şekilde .env'den çeker.
  password: process.env.DB_PASSWORD,
  // PostgreSQL'in dinlediği port numarasını (varsayılan 5432) .env'den çeker.
  port: process.env.DB_PORT,
});
// Bu bağlantı havuzunu (pool) diğer dosyalarda (Örn: index.js) 
// kullanabilmek için dışa aktarır.
module.exports = pool;
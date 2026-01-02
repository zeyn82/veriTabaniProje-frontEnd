import { motion } from "framer-motion";

function AnaSayfa() {
  return (
    <motion.div 
      className="page home-page"
      /* ✨ ANİMASYON AYARLARI ✨ */
      initial={{ opacity: 0, y: 20 }}   // Hafif aşağıdan ve görünmez başlar
      animate={{ opacity: 1, y: 0 }}    // Yukarı kayarak görünür olur
      exit={{ opacity: 0, y: -20 }}     // Çıkarken yukarı doğru kaybolur
      transition={{ duration: 0.6 }}    // Ana sayfa olduğu için biraz daha yavaş ve asil bir geçiş (0.6s)
    >
      <div className="home-overlay" />

      <div className="card home-card">
        <h1>Havalimanı Yönetim Sistemi</h1>
        <p>
          Bu panel üzerinden yolcuları, uçuşları ve personel işlemlerini
          profesyonel şekilde yönetebilirsiniz.
        </p>
      </div>

      <div className="card home-card">
        <h3>Sistem Özellikleri</h3>
        <ul>
          <li>✔ Yolcu kayıt ve yönetimi</li>
          <li>✔ Uçuş oluşturma ve listeleme</li>
          <li>✔ Uçak ve personel yönetimi</li>
          <li>✔ Modern arayüz & Dark Mode</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default AnaSayfa;
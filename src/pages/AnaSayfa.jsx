import { useState } from "react";
import { motion } from "framer-motion";

function AnaSayfa({ girisYapildi, setGirisYapildi }) {
  // Giriş formu için yerel state'ler
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");

  const handleLogin = () => {
    // Basit doğrulama (Backend olmadan)
    if (kullaniciAdi === "admin" && sifre === "1234") {
      setGirisYapildi(true); // App.jsx'teki durumu günceller
      setHata(""); // Varsa hatayı temizle
    } else {
      setHata("Hatalı kullanıcı adı veya parola!");
    }
  };

  return (
    <motion.div 
      className="page home-page"
      /* ✨ ANİMASYON AYARLARI ✨ */
      initial={{ opacity: 0, y: 20 }}   // Hafif aşağıdan ve görünmez başlar
      animate={{ opacity: 1, y: 0 }}    // Yukarı kayarak görünür olur
      exit={{ opacity: 0, y: -20 }}     // Çıkarken yukarı doğru kaybolur
      transition={{ duration: 0.6 }}    // 0.6s süren yumuşak geçiş
    >
      <div className="home-overlay" />

      {/* 🔥 EĞER GİRİŞ YAPILMADIYSA: GİRİŞ PANELİ GÖSTER 🔥 */}
      {!girisYapildi ? (
        <div className="card home-card" style={{ maxWidth: '400px', width: '90%' }}>
          <h2>Yönetici Girişi</h2>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            Lütfen sisteme giriş yapınız.
          </p>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* 🔽 DÜZELTİLEN KISIM: İpuçları kaldırıldı */}
            <input 
              type="text" 
              placeholder="Kullanıcı Adı" 
              value={kullaniciAdi}
              onChange={(e) => setKullaniciAdi(e.target.value)}
            />
            
            <input 
              type="password" 
              placeholder="Parola" 
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
            />

            {hata && (
              <p style={{ color: '#ef4444', fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
                {hata}
              </p>
            )}

            {/* Yeşil Buton */}
            <button className="primary" onClick={handleLogin}>
              Giriş Yap
            </button>
          </div>
        </div>
      ) : (
        /* 🔥 EĞER GİRİŞ YAPILDIYSA: ANA SAYFA İÇERİĞİNİ GÖSTER 🔥 */
        <>
          <div className="card home-card">
            <h1>Havalimanı Yönetim Sistemi</h1>
            <p>
              Hoş geldiniz, <strong>{kullaniciAdi || "Yönetici"}</strong>. <br/>
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
        </>
      )}
    </motion.div>
  );
}

export default AnaSayfa;
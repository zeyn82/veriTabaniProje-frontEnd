import { useState } from "react";
import { motion } from "framer-motion";

function Yolcu({ yolcular, setYolcular }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [telefon, setTelefon] = useState("");

  // 🔥 YENİ EKLE FONKSİYONU (BACKEND İLE KONUŞUR)
  const ekle = async () => {
    if (!ad || !soyad || !telefon) {
      alert("Tüm alanlar zorunludur");
      return;
    }

    try {
      // 1. Veriyi Backend'e Gönder (POST İsteği)
      const response = await fetch("http://localhost:3000/api/yolcu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yolcu_ad: ad,      // Backend bu isimleri bekliyor
          yolcu_soyad: soyad,
          telefon: telefon
        })
      });

      if (response.ok) {
        // 2. Eğer kayıt başarılıysa, Backend'den gelen yeni veriyi al
        const yeniVeri = await response.json();

        // 3. Listeyi güncelle (Sayfa yenilenmeden ekranda görünsün)
        setYolcular([...yolcular, yeniVeri]);

        // 4. Kutuları temizle
        setAd("");
        setSoyad("");
        setTelefon("");
        alert("✅ Yolcu Veritabanına Kaydedildi!");
      } else {
        alert("❌ Kayıt başarısız oldu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  // 🔥 YENİ SİL FONKSİYONU (VERİTABANINDAN SİLER)
  const sil = async (id) => {
    if (!window.confirm("Yolcu silinsin mi?")) return;

    try {
      // Backend'e "Sil" emri ver
      await fetch(`http://localhost:3000/api/yolcu/${id}`, { method: "DELETE" });
      
      // Ekrandan da sil
      setYolcular(yolcular.filter(y => y.yolcu_id !== id));
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card">
        <h2>Yolcu Yönetimi</h2>

        <div className="form-group">
          <input 
            placeholder="Ad" 
            value={ad} 
            onChange={e => setAd(e.target.value)} 
            className="form-group-full"
          />
          <input 
            placeholder="Soyad" 
            value={soyad} 
            onChange={e => setSoyad(e.target.value)} 
            className="form-group-full"
          />
          <input 
            placeholder="Telefon" 
            value={telefon} 
            onChange={e => setTelefon(e.target.value)} 
            className="form-group-full"
          />

          {/* 🔥 YEŞİL BUTON: className="primary" eklendi */}
          <button className="primary" onClick={ekle}>Veritabanına Kaydet</button>
        </div>
      </div>

      <div className="card">
        <h3>Yolcu Listesi</h3>
        {yolcular.length === 0 ? (
           <p>Listelenecek yolcu bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Ad</th><th>Soyad</th><th>Telefon</th><th></th>
              </tr>
            </thead>
            <tbody>
              {yolcular.map(y => (
                <tr key={y.yolcu_id}>
                  <td>{y.yolcu_id}</td>
                  <td>{y.yolcu_ad}</td>
                  <td>{y.yolcu_soyad}</td>
                  <td>{y.telefon}</td>
                  <td>
                    <button className="danger" onClick={() => sil(y.yolcu_id)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}

export default Yolcu;
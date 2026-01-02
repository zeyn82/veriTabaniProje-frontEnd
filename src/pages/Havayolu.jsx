import { useState } from "react";
import { motion } from "framer-motion";

function Havayolu({ havayollari, setHavayollari }) {
  const [havayoluId, setHavayoluId] = useState("");
  const [havayoluAdi, setHavayoluAdi] = useState("");

  // 🔥 YENİ EKLE FONKSİYONU (VERİTABANI KAYITLI)
  const ekle = async () => {
    const id = havayoluId.trim();
    const ad = havayoluAdi.trim();

    if (!id || !ad) {
      alert("Alanları doldurun.");
      return;
    }

    try {
      // 1. Backend'e Veriyi Gönder
      const response = await fetch("http://localhost:3000/api/havayolu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          havayolu_id: id,
          havayolu_adi: ad.toUpperCase()
        })
      });

      if (response.ok) {
        // 2. Başarılıysa Listeyi Güncelle
        const yeniVeri = await response.json();
        setHavayollari([...havayollari, yeniVeri]);

        // 3. Formu Temizle
        setHavayoluId("");
        setHavayoluAdi("");
        alert("✅ Havayolu Veritabanına Kaydedildi!");
      } else {
        alert("❌ Kayıt başarısız! ID çakışıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

  // 🔥 YENİ SİL FONKSİYONU (VERİTABANINDAN SİLER)
  const sil = async (id) => {
    if (!window.confirm("Silmek istiyor musun?")) return;

    try {
      await fetch(`http://localhost:3000/api/havayolu/${id}`, { method: "DELETE" });
      setHavayollari(havayollari.filter(h => h.havayolu_id !== id));
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  return (
    <motion.div 
      className="page"
      /* ✨ ANİMASYON AYARLARI ✨ */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card">
        <h2>Havayolu Yönetimi</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Havayolu ID (THY)"
            value={havayoluId}
            onChange={(e) => setHavayoluId(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Havayolu Adı"
            value={havayoluAdi}
            onChange={(e) => setHavayoluAdi(e.target.value)}
            className="form-group-full"
          />

          {/* 🔥 YEŞİL BUTON: className="primary" eklendi */}
          <button className="primary" onClick={ekle}>Veritabanına Kaydet</button>
        </div>
      </div>

      <div className="card">
        <h3>Havayolu Listesi</h3>

        {havayollari.length === 0 ? (
          <p>Kayıtlı havayolu bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {havayollari.map(h => (
                <tr key={h.havayolu_id}>
                  {/* Veritabanı sütun isimleri */}
                  <td>{h.havayolu_id}</td>
                  <td>{h.havayolu_adi}</td>
                  <td>
                    <button className="danger" onClick={() => sil(h.havayolu_id)}>
                      Sil
                    </button>
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

export default Havayolu;
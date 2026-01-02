import { useState } from "react";
import { motion } from "framer-motion";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havalimaniAdi, setHavalimaniAdi] = useState("");
  const [sehir, setSehir] = useState("");

  // 🔥 YENİ EKLE FONKSİYONU (VERİTABANI KAYITLI)
  const ekle = async () => {
    const id = havalimaniId.trim();
    const ad = havalimaniAdi.trim();
    const sehirAdi = sehir.trim();

    if (!id || !ad || !sehirAdi) {
      alert("Tüm alanları doldurun.");
      return;
    }

    try {
      // 1. Backend'e Veriyi Gönder
      const response = await fetch("http://localhost:3000/api/havalimani", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          havalimani_id: id,
          havalimani_adi: ad.toUpperCase(),
          sehir: sehirAdi.toUpperCase(),
        })
      });

      if (response.ok) {
        // 2. Başarılıysa Listeyi Güncelle
        const yeniVeri = await response.json();
        setHavalimanlari([...havalimanlari, yeniVeri]);

        // 3. Formu Temizle
        setHavalimaniId("");
        setHavalimaniAdi("");
        setSehir("");
        alert("✅ Havalimanı Veritabanına Kaydedildi!");
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
    if (!window.confirm("Silmek istediğine emin misin?")) return;

    try {
      await fetch(`http://localhost:3000/api/havalimani/${id}`, { method: "DELETE" });
      setHavalimanlari(havalimanlari.filter(h => h.havalimani_id !== id));
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
        <h2>Havalimanı Yönetimi</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Havalimanı ID (IST)"
            value={havalimaniId}
            onChange={(e) => setHavalimaniId(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Havalimanı Adı"
            value={havalimaniAdi}
            onChange={(e) => setHavalimaniAdi(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Şehir"
            value={sehir}
            onChange={(e) => setSehir(e.target.value)}
            className="form-group-full"
          />

          {/* 🔥 YEŞİL BUTON: className="primary" eklendi */}
          <button className="primary" onClick={ekle}>Veritabanına Kaydet</button>
        </div>
      </div>

      <div className="card">
        <h3>Havalimanı Listesi</h3>

        {havalimanlari.length === 0 ? (
          <p>Kayıtlı havalimanı bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Şehir</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {havalimanlari.map(h => (
                <tr key={h.havalimani_id}>
                  {/* Veritabanı sütun isimleri */}
                  <td>{h.havalimani_id}</td>
                  <td>{h.havalimani_adi}</td>
                  <td>{h.sehir}</td>
                  <td>
                    <button className="danger" onClick={() => sil(h.havalimani_id)}>
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

export default Havalimani;
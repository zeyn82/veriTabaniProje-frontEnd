import { useState } from "react";
import { motion } from "framer-motion";

function Bagaj({ yolcular, bagajlar, setBagajlar }) {
  const [bagajNo, setBagajNo] = useState("");
  const [agirlik, setAgirlik] = useState("");
  const [yolcuId, setYolcuId] = useState("");

  // 🔥 YENİ EKLE FONKSİYONU (VERİTABANI KAYITLI)
  const ekle = async () => {
    if (!bagajNo || !agirlik || !yolcuId) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      // 1. Backend'e Veriyi Gönder
      const response = await fetch("http://localhost:3000/api/bagaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bagaj_no: bagajNo,
          agirlik: agirlik,
          yolcu_id: yolcuId,
        })
      });

      if (response.ok) {
        // 2. Başarılıysa Listeyi Güncelle
        const yeniVeri = await response.json();
        setBagajlar([...bagajlar, yeniVeri]);

        // 3. Formu Temizle
        setBagajNo("");
        setAgirlik("");
        setYolcuId("");
        alert("✅ Bagaj Veritabanına Kaydedildi!");
      } else {
        alert("❌ Kayıt başarısız! Bagaj No çakışıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

  // 🔥 YENİ SİL FONKSİYONU (VERİTABANINDAN SİLER)
  const sil = async (no) => {
    if (!window.confirm("Silmek istiyor musun?")) return;

    try {
      await fetch(`http://localhost:3000/api/bagaj/${no}`, { method: "DELETE" });
      setBagajlar(bagajlar.filter(b => b.bagaj_no !== no));
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
        <h2>Bagaj Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Bagaj No"
            value={bagajNo}
            onChange={(e) => setBagajNo(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Ağırlık (kg)"
            type="number"
            value={agirlik}
            onChange={(e) => setAgirlik(e.target.value)}
            className="form-group-full"
          />

          <select
            value={yolcuId}
            onChange={(e) => setYolcuId(e.target.value)}
            className="form-group-full"
          >
            <option value="">Yolcu Seç</option>
            {yolcular.map(y => (
              <option key={y.yolcu_id} value={y.yolcu_id}>
                {y.yolcu_ad} {y.yolcu_soyad}
              </option>
            ))}
          </select>

          {/* 🔥 YEŞİL BUTON: className="primary" eklendi */}
          <button className="primary" onClick={ekle}>Veritabanına Kaydet</button>
        </div>
      </div>

      <div className="card">
        <h3>Bagaj Listesi</h3>

        {bagajlar.length === 0 ? (
          <p>Kayıtlı bagaj bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Ağırlık</th>
                <th>Yolcu</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {bagajlar.map(b => {
                // Eşleşen yolcuyu bul
                const y = yolcular.find(y => y.yolcu_id == b.yolcu_id);
                
                return (
                  <tr key={b.bagaj_no}>
                    <td>{b.bagaj_no}</td>
                    <td>{b.agirlik} kg</td>
                    <td>
                         {y ? `${y.yolcu_ad} ${y.yolcu_soyad}` : `ID: ${b.yolcu_id}`}
                    </td>
                    <td>
                      <button className="danger" onClick={() => sil(b.bagaj_no)}>
                        Sil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}

export default Bagaj;
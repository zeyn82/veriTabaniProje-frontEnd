import { useState } from "react";
import { motion } from "framer-motion";

function Bagaj({ yolcular, bagajlar, setBagajlar }) {
  const [bagajNo, setBagajNo] = useState("");
  const [agirlik, setAgirlik] = useState("");
  const [yolcuId, setYolcuId] = useState("");
  
  // 🔥 Düzenleme Modu için State
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    if (!bagajNo || !agirlik || !yolcuId) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      let response;
      const veriPaketi = {
        bagaj_no: bagajNo,
        agirlik: agirlik,
        yolcu_id: yolcuId,
      };

      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/bagaj/${duzenlenenId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      } else {
        // ➕ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/bagaj", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const sonucVerisi = await response.json();

        if (duzenlenenId) {
          // Listeyi güncelle
          setBagajlar(bagajlar.map(b => b.bagaj_no === duzenlenenId ? sonucVerisi : b));
          alert("✅ Bagaj Bilgisi Güncellendi!");
        } else {
          // Listeye yeni ekle
          setBagajlar([...bagajlar, sonucVerisi]);
          alert("✅ Bagaj Veritabanına Kaydedildi!");
        }

        // Formu ve Modu Sıfırla
        setBagajNo("");
        setAgirlik("");
        setYolcuId("");
        setDuzenlenenId(null);
      } else {
        alert("❌ İşlem başarısız! Bagaj No çakışıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

  // 🔥 DÜZENLEME MODUNU AÇAR
  const duzenle = (b) => {
    setDuzenlenenId(b.bagaj_no);
    setBagajNo(b.bagaj_no);
    setAgirlik(b.agirlik);
    setYolcuId(b.yolcu_id);
  };

  // 🔥 SİLME İŞLEMİ
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
            disabled={duzenlenenId !== null} // Düzenlerken ID değiştirilemez
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

          {/* 🔥 BUTONLAR */}
          <button className="primary" onClick={kaydet}>
            {duzenlenenId ? "Güncelle" : "Veritabanına Kaydet"}
          </button>

          {duzenlenenId && (
            <button onClick={() => {
              setDuzenlenenId(null);
              setBagajNo("");
              setAgirlik("");
              setYolcuId("");
            }}>
              İptal
            </button>
          )}
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
                      <button onClick={() => duzenle(b)}>Düzenle</button>
                      <button 
                        className="danger" 
                        onClick={() => sil(b.bagaj_no)}
                        style={{ marginLeft: "5px" }}
                      >
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
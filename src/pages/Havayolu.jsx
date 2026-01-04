import { useState } from "react";
import { motion } from "framer-motion";

function Havayolu({ havayollari, setHavayollari }) {
  const [havayoluId, setHavayoluId] = useState("");
  const [havayoluAdi, setHavayoluAdi] = useState("");
  
  // 🔥 Düzenleme Modu için State
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    const id = havayoluId.trim();
    const ad = havayoluAdi.trim();

    if (!id || !ad) {
      alert("Alanları doldurun.");
      return;
    }

    try {
      let response;
      
      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/havayolu/${duzenlenenId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            havayolu_adi: ad.toUpperCase()
          })
        });
      } else {
        // ➕ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/havayolu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            havayolu_id: id,
            havayolu_adi: ad.toUpperCase()
          })
        });
      }

      if (response.ok) {
        const sonucVerisi = await response.json();

        if (duzenlenenId) {
          // Listeyi güncelle
          setHavayollari(havayollari.map(h => h.havayolu_id === duzenlenenId ? sonucVerisi : h));
          alert("✅ Havayolu Güncellendi!");
        } else {
          // Listeye yeni ekle
          setHavayollari([...havayollari, sonucVerisi]);
          alert("✅ Havayolu Kaydedildi!");
        }

        // Formu ve Modu Sıfırla
        setHavayoluId("");
        setHavayoluAdi("");
        setDuzenlenenId(null);
      } else {
        alert("❌ İşlem başarısız! ID çakışıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

  // 🔥 DÜZENLEME MODUNU AÇAR
  const duzenle = (h) => {
    setDuzenlenenId(h.havayolu_id);
    setHavayoluId(h.havayolu_id);
    setHavayoluAdi(h.havayolu_adi);
  };

  // 🔥 SİLME İŞLEMİ
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
            disabled={duzenlenenId !== null} // Düzenlerken ID değiştirilemez
          />

          <input
            placeholder="Havayolu Adı"
            value={havayoluAdi}
            onChange={(e) => setHavayoluAdi(e.target.value)}
            className="form-group-full"
          />

          {/* 🔥 BUTONLAR */}
          <button className="primary" onClick={kaydet}>
            {duzenlenenId ? "Güncelle" : "Veritabanına Kaydet"}
          </button>

          {duzenlenenId && (
            <button onClick={() => {
              setDuzenlenenId(null);
              setHavayoluId("");
              setHavayoluAdi("");
            }}>
              İptal
            </button>
          )}
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
                  <td>{h.havayolu_id}</td>
                  <td>{h.havayolu_adi}</td>
                  <td>
                    <button onClick={() => duzenle(h)}>Düzenle</button>
                    <button 
                      className="danger" 
                      onClick={() => sil(h.havayolu_id)}
                      style={{ marginLeft: "5px" }}
                    >
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
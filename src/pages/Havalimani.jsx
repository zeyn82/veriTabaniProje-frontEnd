import { useState } from "react";
import { motion } from "framer-motion";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havalimaniAdi, setHavalimaniAdi] = useState("");
  const [sehir, setSehir] = useState("");
  
  // 🔥 Düzenleme Modu için State
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    const id = havalimaniId.trim();
    const ad = havalimaniAdi.trim();
    const sehirAdi = sehir.trim();

    if (!id || !ad || !sehirAdi) {
      alert("Tüm alanları doldurun.");
      return;
    }

    try {
      let response;
      const veriPaketi = {
        havalimani_id: id,
        havalimani_adi: ad.toUpperCase(),
        sehir: sehirAdi.toUpperCase(),
      };

      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/havalimani/${duzenlenenId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      } else {
        // ➕ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/havalimani", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const sonucVerisi = await response.json();

        if (duzenlenenId) {
          // Listeyi güncelle
          setHavalimanlari(havalimanlari.map(h => h.havalimani_id === duzenlenenId ? sonucVerisi : h));
          alert("✅ Havalimanı Güncellendi!");
        } else {
          // Listeye yeni ekle
          setHavalimanlari([...havalimanlari, sonucVerisi]);
          alert("✅ Havalimanı Kaydedildi!");
        }

        // Formu ve Modu Sıfırla
        setHavalimaniId("");
        setHavalimaniAdi("");
        setSehir("");
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
    setDuzenlenenId(h.havalimani_id);
    setHavalimaniId(h.havalimani_id);
    setHavalimaniAdi(h.havalimani_adi);
    setSehir(h.sehir);
  };

  // 🔥 SİLME İŞLEMİ
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
            disabled={duzenlenenId !== null} // Düzenlerken ID değiştirilemez
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

          {/* 🔥 BUTONLAR */}
          <button className="primary" onClick={kaydet}>
            {duzenlenenId ? "Güncelle" : "Veritabanına Kaydet"}
          </button>

          {duzenlenenId && (
            <button onClick={() => {
              setDuzenlenenId(null);
              setHavalimaniId("");
              setHavalimaniAdi("");
              setSehir("");
            }}>
              İptal
            </button>
          )}
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
                  <td>{h.havalimani_id}</td>
                  <td>{h.havalimani_adi}</td>
                  <td>{h.sehir}</td>
                  <td>
                    <button onClick={() => duzenle(h)}>Düzenle</button>
                    <button 
                      className="danger" 
                      onClick={() => sil(h.havalimani_id)}
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

export default Havalimani;
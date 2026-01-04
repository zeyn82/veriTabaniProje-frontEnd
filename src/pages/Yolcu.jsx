import { useState } from "react";
import { motion } from "framer-motion";

function Yolcu({ yolcular, setYolcular }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [telefon, setTelefon] = useState("");
  
  // 🔥 Düzenleme Modu için State
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    if (!ad || !soyad || !telefon) {
      alert("Tüm alanlar zorunludur");
      return;
    }

    try {
      let response;
      const veriPaketi = {
        yolcu_ad: ad,
        yolcu_soyad: soyad,
        telefon: telefon
      };

      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/yolcu/${duzenlenenId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      } else {
        // ➕ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/yolcu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const sonucVerisi = await response.json();

        if (duzenlenenId) {
          // Listeyi güncelle
          setYolcular(yolcular.map(y => y.yolcu_id === duzenlenenId ? sonucVerisi : y));
          alert("✅ Yolcu Bilgisi Güncellendi!");
        } else {
          // Listeye yeni ekle
          setYolcular([...yolcular, sonucVerisi]);
          alert("✅ Yolcu Veritabanına Kaydedildi!");
        }

        // Formu ve Modu Sıfırla
        setAd("");
        setSoyad("");
        setTelefon("");
        setDuzenlenenId(null);
      } else {
        alert("❌ İşlem başarısız oldu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  // 🔥 DÜZENLEME MODUNU AÇAR
  const duzenle = (y) => {
    setDuzenlenenId(y.yolcu_id);
    setAd(y.yolcu_ad);
    setSoyad(y.yolcu_soyad);
    setTelefon(y.telefon);
  };

  // 🔥 SİLME İŞLEMİ
  const sil = async (id) => {
    if (!window.confirm("Yolcu silinsin mi?")) return;

    try {
      await fetch(`http://localhost:3000/api/yolcu/${id}`, { method: "DELETE" });
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

          {/* 🔥 BUTONLAR */}
          <button className="primary" onClick={kaydet}>
            {duzenlenenId ? "Güncelle" : "Veritabanına Kaydet"}
          </button>

          {duzenlenenId && (
            <button onClick={() => {
              setDuzenlenenId(null);
              setAd("");
              setSoyad("");
              setTelefon("");
            }}>
              İptal
            </button>
          )}
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
                <th>ID</th><th>Ad</th><th>Soyad</th><th>Telefon</th><th>İşlem</th>
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
                    <button onClick={() => duzenle(y)}>Düzenle</button>
                    <button 
                      className="danger" 
                      onClick={() => sil(y.yolcu_id)}
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

export default Yolcu;
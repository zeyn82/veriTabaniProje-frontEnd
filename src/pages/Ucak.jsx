import { useState } from "react";
import { motion } from "framer-motion";

function Ucak({ ucaklar = [], setUcaklar, havayollari = [] }) {
  const [id, setId] = useState("");
  const [model, setModel] = useState("");
  const [kapasite, setKapasite] = useState("");
  const [secilenHavayoluId, setSecilenHavayoluId] = useState("");
  
  // 🔥 Düzenleme Modu için State
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    if (!id || !model || !kapasite || !secilenHavayoluId) {
      alert("Lütfen tüm alanları (Havayolu dahil) doldurun.");
      return;
    }

    try {
      let response;
      const veriPaketi = {
        ucak_id: id,
        model: model,
        kapasite: Number(kapasite),
        havayolu_id: secilenHavayoluId
      };

      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/ucak/${duzenlenenId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      } else {
        // ➕ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/ucak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const veri = await response.json();
        
        // Havayolu adını frontend'de güncellemek için eşleştirme yapıyoruz
        const havayoluAdi = havayollari.find(h => h.havayolu_id === secilenHavayoluId)?.havayolu_adi;
        const ekrandakiVeri = { ...veri, havayolu_adi: havayoluAdi };

        if (duzenlenenId) {
          // Listeyi güncelle
          setUcaklar(ucaklar.map(u => u.ucak_id === duzenlenenId ? ekrandakiVeri : u));
          alert("✅ Uçak Güncellendi!");
        } else {
          // Listeye yeni ekle
          setUcaklar([...ucaklar, ekrandakiVeri]);
          alert("✅ Uçak Kaydedildi!");
        }

        // Formu ve Modu Sıfırla
        setId("");
        setModel("");
        setKapasite("");
        setSecilenHavayoluId("");
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
  const duzenle = (u) => {
    setDuzenlenenId(u.ucak_id);
    setId(u.ucak_id);
    setModel(u.model);
    setKapasite(u.kapasite);
    setSecilenHavayoluId(u.havayolu_id);
  };

  // 🔥 SİLME İŞLEMİ
  const sil = async (id) => {
    if (!window.confirm("Uçağı silmek istiyor musun?")) return;
    try {
      await fetch(`http://localhost:3000/api/ucak/${id}`, { method: "DELETE" });
      setUcaklar(ucaklar.filter(u => u.ucak_id !== id));
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
        <h2>Uçak Yönetimi</h2>

        <div className="form-group">
          <input 
            placeholder="Uçak ID (Örn: TC-JHK)" 
            type="text" 
            value={id} 
            onChange={e => setId(e.target.value)} 
            className="form-group-full"
            disabled={duzenlenenId !== null} // Düzenlerken ID kilitli
          />
          
          <input 
            placeholder="Model (Airbus A320)" 
            value={model} 
            onChange={e => setModel(e.target.value)} 
            className="form-group-full"
          />
          
          <input 
            placeholder="Kapasite" 
            type="number" 
            value={kapasite} 
            onChange={e => setKapasite(e.target.value)} 
            className="form-group-full"
          />

          <select
            value={secilenHavayoluId}
            onChange={(e) => setSecilenHavayoluId(e.target.value)}
            className="form-group-full"
          >
            <option value="">Havayolu Seçiniz...</option>
            {havayollari.map(h => (
              <option key={h.havayolu_id} value={h.havayolu_id}>
                {h.havayolu_adi} ({h.havayolu_id})
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
              setId("");
              setModel("");
              setKapasite("");
              setSecilenHavayoluId("");
            }}>
              İptal
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Uçak Listesi</h3>
        {ucaklar.length === 0 ? (
          <p>Kayıtlı uçak bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Kapasite</th>
                <th>Havayolu</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ucaklar.map(u => (
                <tr key={u.ucak_id}>
                  <td>{u.ucak_id}</td>
                  <td>{u.model}</td>
                  <td>{u.kapasite}</td>
                  <td>
                     {u.havayolu_adi || 
                      havayollari.find(h => h.havayolu_id === u.havayolu_id)?.havayolu_adi || 
                      u.havayolu_id}
                  </td>
                  <td>
                    <button onClick={() => duzenle(u)}>Düzenle</button>
                    <button 
                      className="danger" 
                      onClick={() => sil(u.ucak_id)}
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

export default Ucak;
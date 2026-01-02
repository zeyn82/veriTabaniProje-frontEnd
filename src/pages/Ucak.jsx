import { useState } from "react";
import { motion } from "framer-motion";

function Ucak({ ucaklar = [], setUcaklar, havayollari = [] }) {
  const [id, setId] = useState("");
  const [model, setModel] = useState("");
  const [kapasite, setKapasite] = useState("");
  const [secilenHavayoluId, setSecilenHavayoluId] = useState("");

  const ekle = async () => {
    if (!id || !model || !kapasite || !secilenHavayoluId) {
      alert("Lütfen tüm alanları (Havayolu dahil) doldurun.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/ucak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ucak_id: id,            
          model: model,
          kapasite: Number(kapasite),
          havayolu_id: secilenHavayoluId 
        })
      });

      if (response.ok) {
        const yeniVeri = await response.json();
        const havayoluAdi = havayollari.find(h => h.havayolu_id === secilenHavayoluId)?.havayolu_adi;
        const ekrandakiVeri = { ...yeniVeri, havayolu_adi: havayoluAdi };

        setUcaklar([...ucaklar, ekrandakiVeri]);

        setId("");
        setModel("");
        setKapasite("");
        setSecilenHavayoluId("");
        alert("✅ Uçak Veritabanına Kaydedildi!");
      } else {
        alert("❌ Kayıt başarısız! ID çakışıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

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

          {/* 🔥 YEŞİL BUTON */}
          <button className="primary" onClick={ekle}>Veritabanına Kaydet</button>
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
                    <button className="danger" onClick={() => sil(u.ucak_id)}>
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
import { useState } from "react";
import { motion } from "framer-motion";

function Personel({ personeller, setPersoneller }) {
  const [id, setId] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [rol, setRol] = useState(""); 

  const ekle = async () => {
    if (!id || !ad || !soyad || !rol) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (personeller.some(p => p.personel_id == id)) {
      alert("Bu personel ID zaten mevcut!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/personel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personel_id: Number(id),
          personel_ad: ad,
          personel_soyad: soyad,
          rol: rol 
        })
      });

      if (response.ok) {
        const yeniVeri = await response.json();
        setPersoneller([...personeller, yeniVeri]);

        setId("");
        setAd("");
        setSoyad("");
        setRol("");
        alert("✅ Personel ve Rolü Başarıyla Kaydedildi!");
      } else {
        alert("❌ Kayıt başarısız! ID kullanılıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

  const sil = async (id) => {
    if (!window.confirm("Personeli silmek istiyor musun?")) return;

    try {
      await fetch(`http://localhost:3000/api/personel/${id}`, { method: "DELETE" });
      setPersoneller(personeller.filter(p => p.personel_id !== id));
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
        <h2>Personel Yönetimi</h2>

        <div className="form-group">
          <input 
            placeholder="ID" 
            type="number" 
            value={id} 
            onChange={e => setId(e.target.value)} 
            className="form-group-full"
          />
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

          <select 
            value={rol} 
            onChange={e => setRol(e.target.value)}
            className="form-group-full"
          >
            <option value="">Rol Seçiniz...</option>
            <option value="Pilot">Pilot</option>
            <option value="Kabin">Kabin Memuru</option> 
          </select>

          {/* 🔥 YEŞİL BUTON */}
          <button className="primary" onClick={ekle}>Veritabanına Kaydet</button>
        </div>
      </div>

      <div className="card">
        <h3>Personel Listesi</h3>
        
        {personeller.length === 0 ? (
          <p>Kayıtlı personel bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Rol</th> 
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {personeller.map(p => (
                <tr key={p.personel_id}>
                  <td>{p.personel_id}</td>
                  <td>{p.personel_ad}</td>
                  <td>{p.personel_soyad}</td>
                  <td>{p.rol || "-"}</td> 
                  <td>
                    <button className="danger" onClick={() => sil(p.personel_id)}>
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

export default Personel;
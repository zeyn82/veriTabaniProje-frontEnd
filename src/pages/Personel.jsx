import { useState } from "react";
import { motion } from "framer-motion";

function Personel({ personeller, setPersoneller }) {
  const [id, setId] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [rol, setRol] = useState(""); 
  
  // 🔥 Düzenleme Modu için State
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    if (!id || !ad || !soyad || (!duzenlenenId && !rol)) { // Düzenlerken rol zorunlu değil
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      let response;
      const veriPaketi = {
        personel_id: Number(id),
        personel_ad: ad,
        personel_soyad: soyad,
        rol: rol 
      };

      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/personel/${duzenlenenId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personel_ad: ad, personel_soyad: soyad }) // Sadece isim güncellenir
        });
      } else {
        // ➕ EKLEME (POST)
        // ID Kontrolü (Sadece eklerken)
        if (personeller.some(p => p.personel_id == id)) {
          alert("Bu personel ID zaten mevcut!");
          return;
        }

        response = await fetch("http://localhost:3000/api/personel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const sonucVerisi = await response.json();

        if (duzenlenenId) {
          // Listeyi güncelle (Rol değişmediği için eski rolü koruyoruz)
          setPersoneller(personeller.map(p => 
            p.personel_id === duzenlenenId 
              ? { ...p, personel_ad: ad, personel_soyad: soyad } // Mevcut veriyi güncelle
              : p
          ));
          alert("✅ Personel Bilgisi Güncellendi!");
        } else {
          // Listeye yeni ekle
          setPersoneller([...personeller, sonucVerisi]);
          alert("✅ Personel ve Rolü Başarıyla Kaydedildi!");
        }

        // Formu ve Modu Sıfırla
        setId("");
        setAd("");
        setSoyad("");
        setRol("");
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
  const duzenle = (p) => {
    setDuzenlenenId(p.personel_id);
    setId(p.personel_id);
    setAd(p.personel_ad);
    setSoyad(p.personel_soyad);
    setRol(p.rol); // Rolü göster ama değiştirtme
  };

  // 🔥 SİLME İŞLEMİ
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
            disabled={duzenlenenId !== null} // Düzenlerken ID değiştirilemez
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
            disabled={duzenlenenId !== null} // Düzenlerken Rol değiştirilemez (Karmaşık olduğu için)
          >
            <option value="">Rol Seçiniz...</option>
            <option value="Pilot">Pilot</option>
            <option value="Kabin">Kabin Memuru</option> 
          </select>

          {/* 🔥 BUTONLAR */}
          <button className="primary" onClick={kaydet}>
            {duzenlenenId ? "Güncelle" : "Veritabanına Kaydet"}
          </button>

          {duzenlenenId && (
            <button onClick={() => {
              setDuzenlenenId(null);
              setId("");
              setAd("");
              setSoyad("");
              setRol("");
            }}>
              İptal
            </button>
          )}
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
                    <button onClick={() => duzenle(p)}>Düzenle</button>
                    <button 
                      className="danger" 
                      onClick={() => sil(p.personel_id)}
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

export default Personel;
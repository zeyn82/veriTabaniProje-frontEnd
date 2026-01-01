import { useState } from "react";
import { motion } from "framer-motion";

function Personel({ personeller, setPersoneller }) {
  const [id, setId] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [rol, setRol] = useState(""); // Pilot veya Kabin

  const ekle = () => {
    if (!id || !ad || !soyad || !rol) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // ID kontrolü (String/Number dönüşümüne dikkat ederek)
    if (personeller.some(p => p.personel_id == id)) {
      alert("Bu personel ID zaten mevcut!");
      return;
    }

    // 🔴 DÜZELTME 1: Veritabanı sütun isimlerine uygun obje oluşturduk
    const yeniPersonel = {
      personel_id: Number(id),
      personel_ad: ad,        // ad -> personel_ad
      personel_soyad: soyad,  // soyad -> personel_soyad
      rol: rol                // Bu sadece arayüzde görünecek, veritabanında yok
    };

    setPersoneller([...personeller, yeniPersonel]);

    // Not: Gerçek projede burada Backend'e (/api/personel) POST isteği atılır.
    // Ayrıca seçilen role göre /api/pilot veya /api/kabin tablolarına da kayıt atılmalıdır.

    setId("");
    setAd("");
    setSoyad("");
    setRol("");
  };

  const sil = (id) => {
    if (!window.confirm("Personeli silmek istiyor musun?")) return;
    setPersoneller(personeller.filter(p => p.personel_id !== id));
  };

  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
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

          <button onClick={ekle}>Ekle</button>
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
                {/* Veritabanında Rol sütunu olmadığı için burası boş gelebilir */}
                <th>Rol</th> 
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {personeller.map(p => (
                <tr key={p.personel_id}>
                  <td>{p.personel_id}</td>
                  
                  {/* 🔴 DÜZELTME 2: personel_ad ve personel_soyad kullandık */}
                  <td>{p.personel_ad}</td>
                  <td>{p.personel_soyad}</td>
                  
                  {/* Backend'den rol gelmediği için şimdilik boş veya manuel ekleneni gösteriyoruz */}
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
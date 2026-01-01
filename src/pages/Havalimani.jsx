import { useState } from "react";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havalimaniAdi, setHavalimaniAdi] = useState("");
  const [sehir, setSehir] = useState("");

  const ekle = () => {
    const id = havalimaniId.trim(); 
    const ad = havalimaniAdi.trim();
    const sehirAdi = sehir.trim();

    if (!id || !ad || !sehirAdi) {
      alert("Tüm alanları doldurun.");
      return;
    }

    // 🔴 DÜZELTME 1: Kontrol ederken veritabanı ismini kullandık (havalimani_id)
    if (havalimanlari.some(h => h.havalimani_id === id)) {
      alert("Bu Havalimanı ID zaten var.");
      return;
    }

    // 🔴 DÜZELTME 2: Listeye eklerken de veritabanı formatına uygun ekledik
    // (Not: Bu şimdilik sadece ekranda gösterir, veritabanına kaydetmek için fetch/POST gerekir)
    setHavalimanlari([
      ...havalimanlari,
      {
        havalimani_id: id,       // id yerine havalimani_id
        havalimani_adi: ad.toUpperCase(), // ad yerine havalimani_adi
        sehir: sehirAdi.toUpperCase(),
      },
    ]);

    setHavalimaniId("");
    setHavalimaniAdi("");
    setSehir("");
  };

  const sil = (id) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    // 🔴 DÜZELTME 3: Silerken doğru ID'ye göre filtreledik
    setHavalimanlari(havalimanlari.filter(h => h.havalimani_id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Havalimanı Yönetimi</h2>

        <input
          type="text"
          placeholder="Havalimanı ID (IST)"
          value={havalimaniId}
          onChange={(e) => setHavalimaniId(e.target.value)}
        />

        <input
          placeholder="Havalimanı Adı"
          value={havalimaniAdi}
          onChange={(e) => setHavalimaniAdi(e.target.value)}
        />

        <input
          placeholder="Şehir"
          value={sehir}
          onChange={(e) => setSehir(e.target.value)}
        />

        <button onClick={ekle}>Ekle</button>
      </div>

      <div className="card">
        <h3>Havalimanı Listesi</h3>

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
              /* 🔴 DÜZELTME 4: Veritabanı sütun isimlerini buraya yazdık */
              <tr key={h.havalimani_id}>
                <td>{h.havalimani_id}</td>  {/* h.id yerine */}
                <td>{h.havalimani_adi}</td> {/* h.ad yerine */}
                <td>{h.sehir}</td>          {/* Bu zaten doğruydu */}
                <td>
                  <button className="danger" onClick={() => sil(h.havalimani_id)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Havalimani;
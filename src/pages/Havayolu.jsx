import { useState } from "react";

function Havayolu({ havayollari, setHavayollari }) {
  const [havayoluId, setHavayoluId] = useState("");
  const [havayoluAdi, setHavayoluAdi] = useState("");

  const ekle = () => {
    const id = havayoluId.trim();
    const ad = havayoluAdi.trim();

    if (!id || !ad) {
      alert("Alanları doldurun.");
      return;
    }

    // 🔴 DÜZELTME 1: Kontrol ederken veritabanı ismini kullandık (havayolu_id)
    if (havayollari.some(h => h.havayolu_id === id)) {
      alert("Bu havayolu ID zaten var.");
      return;
    }

    // 🔴 DÜZELTME 2: Listeye eklerken veritabanı formatını kullandık
    setHavayollari([
      ...havayollari,
      { 
        havayolu_id: id,             // id -> havayolu_id
        havayolu_adi: ad.toUpperCase() // ad -> havayolu_adi
      },
    ]);

    setHavayoluId("");
    setHavayoluAdi("");
  };

  const sil = (id) => {
    if (!window.confirm("Silmek istiyor musun?")) return;
    // 🔴 DÜZELTME 3: Silerken doğru ID'yi kullandık
    setHavayollari(havayollari.filter(h => h.havayolu_id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Havayolu Yönetimi</h2>

        <input
          type="text"
          placeholder="Havayolu ID (THY)"
          value={havayoluId}
          onChange={(e) => setHavayoluId(e.target.value)}
        />

        <input
          placeholder="Havayolu Adı"
          value={havayoluAdi}
          onChange={(e) => setHavayoluAdi(e.target.value)}
        />

        <button onClick={ekle}>Ekle</button>
      </div>

      <div className="card">
        <h3>Havayolu Listesi</h3>

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
              /* 🔴 DÜZELTME 4: Veritabanı sütun isimlerini buraya yazdık */
              <tr key={h.havayolu_id}>
                <td>{h.havayolu_id}</td>   {/* h.id yerine */}
                <td>{h.havayolu_adi}</td>  {/* h.ad yerine */}
                <td>
                  <button className="danger" onClick={() => sil(h.havayolu_id)}>
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

export default Havayolu;
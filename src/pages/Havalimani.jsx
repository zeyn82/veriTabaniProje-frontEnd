import { useState } from "react";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havalimaniAdi, setHavalimaniAdi] = useState("");
  const [sehir, setSehir] = useState("");

  const ekle = () => {
    const id = havalimaniId.trim(); // ✅ STRING
    const ad = havalimaniAdi.trim();
    const sehirAdi = sehir.trim();

    if (!id || !ad || !sehirAdi) {
      alert("Tüm alanları doldurun.");
      return;
    }

    if (havalimanlari.some(h => h.id === id)) {
      alert("Bu Havalimanı ID zaten var.");
      return;
    }

    setHavalimanlari([
      ...havalimanlari,
      {
        id,
        ad: ad.toUpperCase(),
        sehir: sehirAdi.toUpperCase(),
      },
    ]);

    setHavalimaniId("");
    setHavalimaniAdi("");
    setSehir("");
  };

  const sil = (id) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    setHavalimanlari(havalimanlari.filter(h => h.id !== id));
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
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.ad}</td>
                <td>{h.sehir}</td>
                <td>
                  <button className="danger" onClick={() => sil(h.id)}>
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

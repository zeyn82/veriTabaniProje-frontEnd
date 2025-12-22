import { useState } from "react";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havalimaniAdi, setHavalimaniAdi] = useState("");
  const [sehir, setSehir] = useState("");

  const ekle = () => {
    if (!havalimaniId || !havalimaniAdi || !sehir) return;

    // Aynı ID tekrar eklenmesin
    if (havalimanlari.find(h => h.id === Number(havalimaniId))) {
      alert("Bu Havalimanı ID zaten mevcut.");
      return;
    }

    setHavalimanlari([
      ...havalimanlari,
      {
        id: Number(havalimaniId),
        ad: havalimaniAdi,
        sehir: sehir,
      },
    ]);

    setHavalimaniId("");
    setHavalimaniAdi("");
    setSehir("");
  };

  const sil = (id) => {
    setHavalimanlari(havalimanlari.filter(h => h.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Havalimanı Yönetimi</h2>

        <input
          type="number"
          placeholder="Havalimanı ID"
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

        {havalimanlari.length === 0 ? (
          <p>Kayıtlı havalimanı yok.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Havalimanı</th>
                <th>Şehir</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {havalimanlari.map((h) => (
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
        )}
      </div>
    </div>
  );
}

export default Havalimani;

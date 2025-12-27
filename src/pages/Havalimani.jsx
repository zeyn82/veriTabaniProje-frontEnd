import { useState } from "react";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havalimaniAdi, setHavalimaniAdi] = useState("");
  const [sehir, setSehir] = useState("");

  const ekle = () => {
    const id = Number(havalimaniId);
    const ad = havalimaniAdi.trim();
    const sehirAdi = sehir.trim();

    if (!id || id <= 0 || !ad || !sehirAdi) {
      alert("Lütfen geçerli tüm alanları doldurun.");
      return;
    }

    // Aynı ID engeli
    if (havalimanlari.some(h => h.id === id)) {
      alert("Bu Havalimanı ID zaten mevcut.");
      return;
    }

    setHavalimanlari([
      ...havalimanlari,
      {
        id,
        ad: ad.toUpperCase(),        // tutarlılık
        sehir: sehirAdi.toUpperCase()
      },
    ]);

    setHavalimaniId("");
    setHavalimaniAdi("");
    setSehir("");
  };

  const sil = (id) => {
    const onay = window.confirm(
      "Bu havalimanını silmek, bağlı uçuşları etkileyebilir. Devam edilsin mi?"
    );

    if (!onay) return;

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
          min="1"
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

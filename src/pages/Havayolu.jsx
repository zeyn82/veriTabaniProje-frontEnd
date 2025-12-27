import { useState } from "react";

function Havayolu({ havayollari, setHavayollari }) {
  const [havayoluId, setHavayoluId] = useState("");
  const [havayoluAdi, setHavayoluAdi] = useState("");

  const ekle = () => {
    const id = Number(havayoluId);
    const ad = havayoluAdi.trim();

    if (!id || id <= 0 || !ad) {
      alert("Lütfen geçerli bir Havayolu ID ve adı giriniz.");
      return;
    }

    // Aynı ID engeli (PRIMARY KEY)
    if (havayollari.some(h => h.id === id)) {
      alert("Bu Havayolu ID zaten mevcut.");
      return;
    }

    setHavayollari([
      ...havayollari,
      {
        id,
        ad: ad.toUpperCase(), // tutarlılık
      },
    ]);

    setHavayoluId("");
    setHavayoluAdi("");
  };

  const sil = (id) => {
    const onay = window.confirm(
      "Bu havayolunu silmek, bağlı uçak ve uçuşları etkileyebilir. Devam edilsin mi?"
    );

    if (!onay) return;

    setHavayollari(havayollari.filter(h => h.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Havayolu Yönetimi</h2>

        <input
          type="number"
          min="1"
          placeholder="Havayolu ID"
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

        {havayollari.length === 0 ? (
          <p>Kayıtlı havayolu yok.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Havayolu Adı</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {havayollari.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.ad}</td>
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

export default Havayolu;

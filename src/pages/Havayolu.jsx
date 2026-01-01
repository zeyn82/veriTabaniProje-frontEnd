import { useState } from "react";

function Havayolu({ havayollari, setHavayollari }) {
  const [havayoluId, setHavayoluId] = useState("");
  const [havayoluAdi, setHavayoluAdi] = useState("");

  const ekle = () => {
    const id = havayoluId.trim(); // ✅ STRING
    const ad = havayoluAdi.trim();

    if (!id || !ad) {
      alert("Alanları doldurun.");
      return;
    }

    if (havayollari.some(h => h.id === id)) {
      alert("Bu havayolu ID zaten var.");
      return;
    }

    setHavayollari([
      ...havayollari,
      { id, ad: ad.toUpperCase() },
    ]);

    setHavayoluId("");
    setHavayoluAdi("");
  };

  const sil = (id) => {
    if (!window.confirm("Silmek istiyor musun?")) return;
    setHavayollari(havayollari.filter(h => h.id !== id));
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
      </div>
    </div>
  );
}

export default Havayolu;

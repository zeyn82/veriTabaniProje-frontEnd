import { useState } from "react";

function Havalimani({ havalimanlari, setHavalimanlari }) {
  const [ad, setAd] = useState("");

  const ekle = () => {
    if (!ad) return;

    setHavalimanlari((onceki) => [
      ...onceki,
      { id: Date.now(), ad },
    ]);

    setAd("");
  };

  const sil = (id) => {
    setHavalimanlari((onceki) =>
      onceki.filter((h) => h.id !== id)
    );
  };

  return (
    <div className="page">
  <div className="card">
    <h2>Havalimanı Yönetimi</h2>

    <div className="form-group">
      <input
        placeholder="Havalimanı Adı"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
        className="form-group-full"
      />

      <button className="primary" onClick={ekle}>
        Ekle
      </button>
    </div>
  </div>

  <div className="card">
    <h3>Havalimanları</h3>
    <ul>
      {havalimanlari.map(h => (
        <li key={h.id}>
          {h.ad}
          <button className="danger" onClick={() => sil(h.id)}>
            Sil
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}

export default Havalimani;
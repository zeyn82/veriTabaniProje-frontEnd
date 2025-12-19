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
    <div>
      <h2>Havalimanı Yönetimi</h2>

      <input
        placeholder="Havalimanı Adı"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
      />

      <button
        type="button"
        onClick={ekle}
        style={{ backgroundColor: "#22c55e", color: "white" }}
      >
        Ekle
      </button>

      <ul>
        {havalimanlari.map((h) => (
          <li key={h.id}>
            {h.ad}
            <button
              type="button"
              onClick={() => sil(h.id)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                marginLeft: "10px",
              }}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Havalimani;

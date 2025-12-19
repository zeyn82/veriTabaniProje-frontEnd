import { useState } from "react";

function Yolcu() {
  const [yolcular, setYolcular] = useState([]);
  const [adSoyad, setAdSoyad] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const kaydet = () => {
    if (!adSoyad || !tcNo) return;

    if (duzenlenenId === null) {
      setYolcular((onceki) => [
        ...onceki,
        { id: Date.now(), adSoyad, tcNo },
      ]);
    } else {
      setYolcular((onceki) =>
        onceki.map((y) =>
          y.id === duzenlenenId
            ? { ...y, adSoyad, tcNo }
            : y
        )
      );
    }

    setAdSoyad("");
    setTcNo("");
    setDuzenlenenId(null);
  };

  const sil = (id) => {
    setYolcular((onceki) =>
      onceki.filter((y) => y.id !== id)
    );
  };

  const duzenle = (y) => {
    setDuzenlenenId(y.id);
    setAdSoyad(y.adSoyad);
    setTcNo(y.tcNo);
  };

  return (
    <div>
      <h2>Yolcu Yönetimi</h2>

      <input
        placeholder="Ad Soyad"
        value={adSoyad}
        onChange={(e) => setAdSoyad(e.target.value)}
      />

      <input
        placeholder="TC Kimlik No"
        value={tcNo}
        onChange={(e) => setTcNo(e.target.value)}
      />

      <button
        type="button"
        onClick={kaydet}
        style={{ backgroundColor: "#22c55e", color: "white" }}
      >
        {duzenlenenId === null ? "Ekle" : "Güncelle"}
      </button>

      <ul>
        {yolcular.map((y) => (
          <li key={y.id}>
            {y.adSoyad} - {y.tcNo}
            <div>
              <button type="button" onClick={() => duzenle(y)}>
                Düzenle
              </button>
              <button
                type="button"
                onClick={() => sil(y.id)}
                style={{ backgroundColor: "#ef4444", color: "white" }}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Yolcu;


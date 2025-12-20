import { useState } from "react";

function Ucak() {
  const [ucaklar, setUcaklar] = useState([]);
  const [ucakId, setUcakId] = useState("");
  const [model, setModel] = useState("");
  const [kapasite, setKapasite] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const ekle = () => {
    if (!ucakId || !model || !kapasite) return;

    if (duzenlenenId !== null) {
      // GÜNCELLE
      setUcaklar(
        ucaklar.map((u) =>
          u.ucakId === duzenlenenId
            ? { ucakId, model, kapasite }
            : u
        )
      );
      setDuzenlenenId(null);
    } else {
      // AYNI UÇAK ID VAR MI?
      const varMi = ucaklar.some((u) => u.ucakId === ucakId);
      if (varMi) {
        alert("Bu Uçak ID zaten mevcut!");
        return;
      }

      // EKLE
      setUcaklar([
        ...ucaklar,
        { ucakId, model, kapasite },
      ]);
    }

    setUcakId("");
    setModel("");
    setKapasite("");
  };

  const sil = (id) => {
    setUcaklar(ucaklar.filter((u) => u.ucakId !== id));
  };

  const duzenle = (ucak) => {
    setUcakId(ucak.ucakId);
    setModel(ucak.model);
    setKapasite(ucak.kapasite);
    setDuzenlenenId(ucak.ucakId);
  };

  return (
    <div>
      <h2>Uçak Yönetimi</h2>

      <input
        placeholder="Uçak ID"
        value={ucakId}
        onChange={(e) => setUcakId(e.target.value)}
      />

      <input
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      <input
        type="number"
        placeholder="Kapasite"
        value={kapasite}
        onChange={(e) => setKapasite(e.target.value)}
      />

      <button onClick={ekle}>
        {duzenlenenId ? "Güncelle" : "Ekle"}
      </button>

      <ul>
        {ucaklar.map((u) => (
          <li key={u.ucakId}>
            ID: {u.ucakId} | Model: {u.model} | Kapasite: {u.kapasite}
            <button onClick={() => duzenle(u)}>Düzenle</button>
            <button onClick={() => sil(u.ucakId)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ucak;

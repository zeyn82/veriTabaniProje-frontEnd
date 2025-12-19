import { useState } from "react";

function Ucus({ havalimanlari = [] }) {
  const [ucuslar, setUcuslar] = useState([]);
  const [kod, setKod] = useState("");
  const [kalkisId, setKalkisId] = useState("");
  const [varisId, setVarisId] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const kaydet = () => {
    if (!kod || !kalkisId || !varisId) return;

    if (Number(kalkisId) === Number(varisId)) {
      window.alert("Kalkış ve varış havalimanı aynı olamaz!");
      return;
    }

    if (duzenlenenId === null) {
      setUcuslar((onceki) => [
        ...onceki,
        {
          id: Date.now(),
          kod,
          kalkisId,
          varisId,
        },
      ]);
    } else {
      setUcuslar((onceki) =>
        onceki.map((u) =>
          u.id === duzenlenenId
            ? { ...u, kod, kalkisId, varisId }
            : u
        )
      );
    }

    setKod("");
    setKalkisId("");
    setVarisId("");
    setDuzenlenenId(null);
  };

  const sil = (id) => {
    setUcuslar((onceki) =>
      onceki.filter((u) => u.id !== id)
    );
  };

  const duzenle = (u) => {
    setDuzenlenenId(u.id);
    setKod(u.kod);
    setKalkisId(u.kalkisId);
    setVarisId(u.varisId);
  };

  const havalimanAdiBul = (id) => {
    const h = havalimanlari.find((x) => x.id === Number(id));
    return h ? h.ad : "";
  };

  return (
    <div>
      <h2>Uçuş Yönetimi</h2>

      <input
        placeholder="Uçuş Kodu"
        value={kod}
        onChange={(e) => setKod(e.target.value)}
      />

      <select
        value={kalkisId}
        onChange={(e) => setKalkisId(e.target.value)}
      >
        <option value="">Kalkış Havalimanı Seç</option>
        {havalimanlari.map((h) => (
          <option key={h.id} value={h.id}>
            {h.ad}
          </option>
        ))}
      </select>

      <select
        value={varisId}
        onChange={(e) => setVarisId(e.target.value)}
      >
        <option value="">Varış Havalimanı Seç</option>
        {havalimanlari.map((h) => (
          <option key={h.id} value={h.id}>
            {h.ad}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={kaydet}
        style={{
          backgroundColor: "#22c55e",
          color: "white",
          marginLeft: "10px",
        }}
      >
        {duzenlenenId === null ? "Ekle" : "Güncelle"}
      </button>

      <ul>
        {ucuslar.map((u) => (
          <li key={u.id}>
            <strong>{u.kod}</strong> |{" "}
            {havalimanAdiBul(u.kalkisId)} →{" "}
            {havalimanAdiBul(u.varisId)}
            <div>
              <button type="button" onClick={() => duzenle(u)}>
                Düzenle
              </button>
              <button
                type="button"
                onClick={() => sil(u.id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  marginLeft: "5px",
                }}
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

export default Ucus;

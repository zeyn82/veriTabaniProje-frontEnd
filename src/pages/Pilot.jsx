import { useState } from "react";

function Pilot({ personeller }) {
  const [pilotlar, setPilotlar] = useState([]);
  const [personelId, setPersonelId] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  ;
const ekle = () => {
  if (!personelId) return;

  if (duzenlenenId !== null) {
    setPilotlar(
      pilotlar.map((p) =>
        p.id === duzenlenenId
          ? { ...p, personelId: Number(personelId) }
          : p
      )
    );
    setDuzenlenenId(null);
  } else {
    setPilotlar([
      ...pilotlar,
      { id: Date.now(), personelId: Number(personelId) },
    ]);
  }

  setPersonelId("");
};

  const sil = (id) => {
    setPilotlar(pilotlar.filter((p) => p.id !== id));
  };

  const duzenle = (pilot) => {
    setAdSoyad(pilot.adSoyad);
    setDuzenlenenId(pilot.id);
  };

  return (
    <div>
      <h2>Pilot Yönetimi</h2>

      <select
  value={personelId}
  onChange={(e) => setPersonelId(e.target.value)}
>
  <option value="">Personel Seç</option>
  {personeller.map((p) => (
    <option key={p.id} value={p.id}>
      {p.adSoyad}
    </option>
  ))}
</select>


      <button onClick={ekle}>
        {duzenlenenId ? "Güncelle" : "Ekle"}
      </button>

      <ul>
  {pilotlar.map((p) => {
    const personel = personeller.find(
      (per) => per.id === p.personelId
    );

    return (
      <li key={p.id}>
        {personel?.adSoyad}
        <button onClick={() => sil(p.id)}>Sil</button>
      </li>
    );
  })}
</ul>

    </div>
  );
}

export default Pilot;


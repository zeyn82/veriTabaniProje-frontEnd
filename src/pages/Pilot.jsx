import { useState } from "react";

function Pilot({ personeller }) {
  const [pilotlar, setPilotlar] = useState([]);
  const [seciliPersonelId, setSeciliPersonelId] = useState("");

  const pilotEkle = () => {
    if (!seciliPersonelId) return;

    // Aynı personel tekrar pilot olamasın
    if (pilotlar.find(p => p.personelId === Number(seciliPersonelId))) {
      alert("Bu personel zaten pilot olarak eklenmiş.");
      return;
    }

    setPilotlar([
      ...pilotlar,
      { personelId: Number(seciliPersonelId) }
    ]);

    setSeciliPersonelId("");
  };

  const personelBul = (id) =>
    personeller.find(p => p.id === id);

  return (
    <div>
      <h2>Pilotlar</h2>

      <select
        value={seciliPersonelId}
        onChange={(e) => setSeciliPersonelId(e.target.value)}
      >
        <option value="">Personel Seç</option>
        {personeller.map((p) => (
          <option key={p.id} value={p.id}>
            {p.ad} {p.soyad}
          </option>
        ))}
      </select>

      <button onClick={pilotEkle}>Pilot Ata</button>

      <ul>
        {pilotlar.map((pilot, index) => {
          const personel = personelBul(pilot.personelId);
          return (
            <li key={index}>
              {personel?.ad} {personel?.soyad}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pilot;

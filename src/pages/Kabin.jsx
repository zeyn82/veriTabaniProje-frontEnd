import { useState } from "react";

function Kabin({ personeller }) {
  const [kabinGorevlileri, setKabinGorevlileri] = useState([]);
  const [seciliPersonelId, setSeciliPersonelId] = useState("");

  const kabinEkle = () => {
    if (!seciliPersonelId) return;

    if (kabinGorevlileri.find(k => k.personelId === Number(seciliPersonelId))) {
      alert("Bu personel zaten kabin görevlisi.");
      return;
    }

    setKabinGorevlileri([
      ...kabinGorevlileri,
      { personelId: Number(seciliPersonelId) }
    ]);

    setSeciliPersonelId("");
  };

  const personelBul = (id) =>
    personeller.find(p => p.id === id);

  return (
    <div>
      <h2>Kabin Görevlileri</h2>

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

      <button onClick={kabinEkle}>Kabin Görevlisi Ata</button>

      <ul>
        {kabinGorevlileri.map((kabin, index) => {
          const personel = personelBul(kabin.personelId);
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

export default Kabin;

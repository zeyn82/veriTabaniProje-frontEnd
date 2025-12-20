import { useState } from "react";

function Kabin({ personeller }) {
  const [kabinler, setKabinler] = useState([]);
  const [personelId, setPersonelId] = useState("");
  const [deneyimYili, setDeneyimYili] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const ekle = () => {
    if (!personelId || !deneyimYili) return;

    if (duzenlenenId !== null) {
      // GÜNCELLE
      setKabinler(
        kabinler.map((k) =>
          k.id === duzenlenenId
            ? {
                ...k,
                personelId: Number(personelId),
                deneyimYili,
              }
            : k
        )
      );
      setDuzenlenenId(null);
    } else {
      // EKLE
      setKabinler([
        ...kabinler,
        {
          id: Date.now(),
          personelId: Number(personelId),
          deneyimYili,
        },
      ]);
    }

    setPersonelId("");
    setDeneyimYili("");
  };

  const sil = (id) => {
    setKabinler(kabinler.filter((k) => k.id !== id));
  };

  const duzenle = (kabin) => {
    setPersonelId(kabin.personelId);
    setDeneyimYili(kabin.deneyimYili);
    setDuzenlenenId(kabin.id);
  };

  return (
    <div>
      <h2>Kabin Görevlisi Yönetimi</h2>

      {/* PERSONEL SEÇİMİ (ISA) */}
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

      {/* KABİN'E ÖZGÜ ALAN */}
      <input
        type="number"
        placeholder="Deneyim Yılı"
        value={deneyimYili}
        onChange={(e) => setDeneyimYili(e.target.value)}
      />

      <button onClick={ekle}>
        {duzenlenenId ? "Güncelle" : "Ekle"}
      </button>

      <ul>
        {kabinler.map((k) => {
          const personel = personeller.find(
            (p) => p.id === k.personelId
          );

          return (
            <li key={k.id}>
              {personel?.adSoyad} – Deneyim: {k.deneyimYili} yıl
              <button onClick={() => duzenle(k)}>Düzenle</button>
              <button onClick={() => sil(k.id)}>Sil</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Kabin;

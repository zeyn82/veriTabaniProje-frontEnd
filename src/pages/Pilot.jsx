import { useState } from "react";

function Pilot({ personeller }) {
  const [pilotlar, setPilotlar] = useState([]);
  const [personelId, setPersonelId] = useState("");
  const [lisansNo, setLisansNo] = useState("");
  const [ucusSaati, setUcusSaati] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const ekle = () => {
    if (!personelId || !lisansNo || !ucusSaati) return;

    if (duzenlenenId !== null) {
      // GÜNCELLE
      setPilotlar(
        pilotlar.map((p) =>
          p.id === duzenlenenId
            ? {
                ...p,
                personelId: Number(personelId),
                lisansNo,
                ucusSaati,
              }
            : p
        )
      );
      setDuzenlenenId(null);
    } else {
      // AYNI PERSONEL PİLOT OLMASIN
      const varMi = pilotlar.some(
        (p) => p.personelId === Number(personelId)
      );
      if (varMi) {
        alert("Bu personel zaten pilot olarak tanımlı!");
        return;
      }

      // EKLE
      setPilotlar([
        ...pilotlar,
        {
          id: Date.now(),
          personelId: Number(personelId),
          lisansNo,
          ucusSaati,
        },
      ]);
    }

    setPersonelId("");
    setLisansNo("");
    setUcusSaati("");
  };

  const sil = (id) => {
    if (!window.confirm("Pilot silinsin mi?")) return;
    setPilotlar(pilotlar.filter((p) => p.id !== id));
  };

  const duzenle = (pilot) => {
    setPersonelId(pilot.personelId);
    setLisansNo(pilot.lisansNo);
    setUcusSaati(pilot.ucusSaati);
    setDuzenlenenId(pilot.id);
  };

  return (
    <div className="page">

      {/* PİLOT FORMU */}
      <div className="card">
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

        <input
          placeholder="Lisans No"
          value={lisansNo}
          onChange={(e) => setLisansNo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Toplam Uçuş Saati"
          value={ucusSaati}
          onChange={(e) => setUcusSaati(e.target.value)}
        />

        <button className="primary" onClick={ekle}>
          {duzenlenenId ? "Güncelle" : "Ekle"}
        </button>
      </div>

      {/* PİLOT LİSTESİ */}
      <div className="card">
        <h3>Pilot Listesi</h3>

        {pilotlar.length === 0 ? (
          <p>Henüz pilot eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Lisans No</th>
                <th>Uçuş Saati</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {pilotlar.map((p) => {
                const personel = personeller.find(
                  (x) => x.id === p.personelId
                );

                return (
                  <tr key={p.id}>
                    <td>{personel?.adSoyad}</td>
                    <td>{p.lisansNo}</td>
                    <td>{p.ucusSaati}</td>
                    <td>
                      <button onClick={() => duzenle(p)}>
                        Düzenle
                      </button>
                      <button
                        className="danger"
                        onClick={() => sil(p.id)}
                        style={{ marginLeft: "6px" }}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default Pilot;

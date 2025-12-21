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
    if (!window.confirm("Kabin görevlisi silinsin mi?")) return;
    setKabinler(kabinler.filter((k) => k.id !== id));
  };

  const duzenle = (kabin) => {
    setPersonelId(kabin.personelId);
    setDeneyimYili(kabin.deneyimYili);
    setDuzenlenenId(kabin.id);
  };

  return (
    <div className="page">

      {/* KABİN FORMU */}
      <div className="card">
        <h2>Kabin Görevlisi Yönetimi</h2>

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
          type="number"
          placeholder="Deneyim Yılı"
          value={deneyimYili}
          onChange={(e) => setDeneyimYili(e.target.value)}
        />

        <button className="primary" onClick={ekle}>
          {duzenlenenId ? "Güncelle" : "Ekle"}
        </button>
      </div>

      {/* KABİN LİSTESİ */}
      <div className="card">
        <h3>Kabin Görevlileri</h3>

        {kabinler.length === 0 ? (
          <p>Henüz kabin görevlisi eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Personel</th>
                <th>Deneyim (Yıl)</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {kabinler.map((k) => {
                const personel = personeller.find(
                  (p) => p.id === k.personelId
                );

                return (
                  <tr key={k.id}>
                    <td>{personel?.adSoyad}</td>
                    <td>{k.deneyimYili}</td>
                    <td>
                      <button onClick={() => duzenle(k)}>
                        Düzenle
                      </button>
                      <button
                        className="danger"
                        onClick={() => sil(k.id)}
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

export default Kabin;

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
      // AYNI UÇAK ID KONTROLÜ
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
    if (!window.confirm("Uçak silinsin mi?")) return;
    setUcaklar(ucaklar.filter((u) => u.ucakId !== id));
  };

  const duzenle = (ucak) => {
    setUcakId(ucak.ucakId);
    setModel(ucak.model);
    setKapasite(ucak.kapasite);
    setDuzenlenenId(ucak.ucakId);
  };

  return (
    <div className="page">

      {/* UÇAK FORMU */}
      <div className="card">
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

        <button className="primary" onClick={ekle}>
          {duzenlenenId ? "Güncelle" : "Ekle"}
        </button>
      </div>

      {/* UÇAK LİSTESİ */}
      <div className="card">
        <h3>Uçak Listesi</h3>

        {ucaklar.length === 0 ? (
          <p>Henüz uçak eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Uçak ID</th>
                <th>Model</th>
                <th>Kapasite</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ucaklar.map((u) => (
                <tr key={u.ucakId}>
                  <td>{u.ucakId}</td>
                  <td>{u.model}</td>
                  <td>{u.kapasite}</td>
                  <td>
                    <button onClick={() => duzenle(u)}>
                      Düzenle
                    </button>
                    <button
                      className="danger"
                      onClick={() => sil(u.ucakId)}
                      style={{ marginLeft: "6px" }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default Ucak;

import { useState } from "react";

function Ucak({ ucaklar = [], setUcaklar }) {
  const [id, setId] = useState("");
  const [model, setModel] = useState("");
  const [kapasite, setKapasite] = useState("");

  const ekle = () => {
    if (!id || !model || !kapasite) return;

    if (ucaklar.some(u => u.ucak_id === Number(id))) {
      alert("Bu uçak zaten var");
      return;
    }

    setUcaklar([
      ...ucaklar,
      {
        ucak_id: Number(id),
        model,
        kapasite: Number(kapasite),
      },
    ]);

    setId("");
    setModel("");
    setKapasite("");
  };

  const sil = (id) => {
    setUcaklar(ucaklar.filter(u => u.ucak_id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Uçak Yönetimi</h2>

        <input placeholder="Uçak ID" type="number" value={id} onChange={e => setId(e.target.value)} />
        <input placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
        <input placeholder="Kapasite" type="number" value={kapasite} onChange={e => setKapasite(e.target.value)} />

        <button onClick={ekle}>Ekle</button>
      </div>

      <div className="card">
        <h3>Uçak Listesi</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Model</th><th>Kapasite</th><th></th>
            </tr>
          </thead>
          <tbody>
            {ucaklar.map(u => (
              <tr key={u.ucak_id}>
                <td>{u.ucak_id}</td>
                <td>{u.model}</td>
                <td>{u.kapasite}</td>
                <td>
                  <button className="danger" onClick={() => sil(u.ucak_id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ucak;

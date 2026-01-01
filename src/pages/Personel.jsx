import { useState } from "react";

function Personel({ personeller, setPersoneller }) {
  const [id, setId] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [rol, setRol] = useState("");

  const ekle = () => {
    if (!id || !ad || !soyad || !rol) return;

    if (personeller.some(p => p.personel_id === Number(id))) {
      alert("Bu personel ID mevcut");
      return;
    }

    setPersoneller([
      ...personeller,
      {
        personel_id: Number(id),
        ad,
        soyad,
        rol,
      },
    ]);

    setId("");
    setAd("");
    setSoyad("");
    setRol("");
  };

  const sil = (id) => {
    setPersoneller(personeller.filter(p => p.personel_id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Personel Yönetimi</h2>

        <input placeholder="ID" type="number" value={id} onChange={e => setId(e.target.value)} />
        <input placeholder="Ad" value={ad} onChange={e => setAd(e.target.value)} />
        <input placeholder="Soyad" value={soyad} onChange={e => setSoyad(e.target.value)} />

        <select value={rol} onChange={e => setRol(e.target.value)}>
          <option value="">Rol Seç</option>
          <option value="Pilot">Pilot</option>
          <option value="Kabin">Kabin</option>
        </select>

        <button onClick={ekle}>Ekle</button>
      </div>

      <div className="card">
        <h3>Personel Listesi</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Ad</th><th>Soyad</th><th>Rol</th><th></th>
            </tr>
          </thead>
          <tbody>
            {personeller.map(p => (
              <tr key={p.personel_id}>
                <td>{p.personel_id}</td>
                <td>{p.ad}</td>
                <td>{p.soyad}</td>
                <td>{p.rol}</td>
                <td>
                  <button className="danger" onClick={() => sil(p.personel_id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Personel;

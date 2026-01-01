import { useState } from "react";

function Yolcu({ yolcular, setYolcular }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [telefon, setTelefon] = useState("");

  const ekle = () => {
    if (!ad || !soyad || !telefon) {
      alert("Tüm alanlar zorunludur");
      return;
    }

    setYolcular([
      ...yolcular,
      {
        yolcu_id: Date.now(),
        yolcu_ad: ad,
        yolcu_soyad: soyad,
        telefon,
      },
    ]);

    setAd("");
    setSoyad("");
    setTelefon("");
  };

  const sil = (id) => {
    if (!window.confirm("Yolcu silinsin mi?")) return;
    setYolcular(yolcular.filter(y => y.yolcu_id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Yolcu Yönetimi</h2>

        <input placeholder="Ad" value={ad} onChange={e => setAd(e.target.value)} />
        <input placeholder="Soyad" value={soyad} onChange={e => setSoyad(e.target.value)} />
        <input placeholder="Telefon" value={telefon} onChange={e => setTelefon(e.target.value)} />

        <button onClick={ekle}>Ekle</button>
      </div>

      <div className="card">
        <h3>Yolcu Listesi</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Ad</th><th>Soyad</th><th>Telefon</th><th></th>
            </tr>
          </thead>
          <tbody>
            {yolcular.map(y => (
              <tr key={y.yolcu_id}>
                <td>{y.yolcu_id}</td>
                <td>{y.yolcu_ad}</td>
                <td>{y.yolcu_soyad}</td>
                <td>{y.telefon}</td>
                <td>
                  <button className="danger" onClick={() => sil(y.yolcu_id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Yolcu;

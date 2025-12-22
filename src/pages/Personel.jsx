import { useState } from "react";

function Personel({ personeller, setPersoneller }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const kaydet = () => {
    if (!ad || !soyad) return;

    if (duzenlenenId === null) {
      // EKLE
      setPersoneller([
        ...personeller,
        {
          id: Date.now(),
          ad,
          soyad,
        },
      ]);
    } else {
      // GÜNCELLE
      setPersoneller(
        personeller.map((p) =>
          p.id === duzenlenenId
            ? { ...p, ad, soyad }
            : p
        )
      );
    }

    setAd("");
    setSoyad("");
    setDuzenlenenId(null);
  };

  const sil = (id) => {
    if (!window.confirm("Personel silinsin mi?")) return;
    setPersoneller(personeller.filter((p) => p.id !== id));
  };

  const duzenle = (p) => {
    setDuzenlenenId(p.id);
    setAd(p.ad);
    setSoyad(p.soyad);
  };

  return (
    <div className="page">
      {/* PERSONEL FORMU */}
      <div className="card">
        <h2>Personel Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Personel Adı"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Personel Soyadı"
            value={soyad}
            onChange={(e) => setSoyad(e.target.value)}
            className="form-group-full"
          />

          <button className="primary" onClick={kaydet}>
            {duzenlenenId === null ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </div>

      {/* PERSONEL LİSTESİ */}
      <div className="card">
        <h3>Personel Listesi</h3>

        {personeller.length === 0 ? (
          <p>Henüz personel eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {personeller.map((p) => (
                <tr key={p.id}>
                  <td>{p.ad}</td>
                  <td>{p.soyad}</td>
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Personel;


import { useState } from "react";

function Personel({ personeller, setPersoneller }) {
  const [personelId, setPersonelId] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [rol, setRol] = useState(""); // Pilot | Kabin
  const [duzenlenenPersonelId, setDuzenlenenPersonelId] = useState(null);

  const ayniIdVarMi = () =>
    personeller.find(
      (p) =>
        p.personelId === Number(personelId) &&
        p.personelId !== duzenlenenPersonelId
    );

  const ayniKisiVarMi = () =>
    personeller.find(
      (p) =>
        p.ad.toLowerCase() === ad.toLowerCase() &&
        p.soyad.toLowerCase() === soyad.toLowerCase() &&
        p.personelId !== duzenlenenPersonelId
    );

  const kaydet = () => {
    if (!personelId || !ad || !soyad || !rol) {
      alert("Tüm alanları doldurunuz.");
      return;
    }

    if (ayniIdVarMi()) {
      alert("Bu Personel ID zaten kullanılıyor.");
      return;
    }

    const mevcut = ayniKisiVarMi();
    if (mevcut) {
      alert(
        `Bu personel zaten "${mevcut.rol}" rolüyle kayıtlıdır.\nAynı kişi hem Pilot hem Kabin Görevlisi olamaz.`
      );
      return;
    }

    if (duzenlenenPersonelId === null) {
      // EKLE
      setPersoneller([
        ...personeller,
        {
          personelId: Number(personelId), // ✅ PRIMARY KEY
          ad,
          soyad,
          rol,
        },
      ]);
    } else {
      // GÜNCELLE
      setPersoneller(
        personeller.map((p) =>
          p.personelId === duzenlenenPersonelId
            ? {
                ...p,
                personelId: Number(personelId),
                ad,
                soyad,
                rol,
              }
            : p
        )
      );
    }

    setPersonelId("");
    setAd("");
    setSoyad("");
    setRol("");
    setDuzenlenenPersonelId(null);
  };

  const sil = (id) => {
    if (!window.confirm("Personel silinsin mi?")) return;
    setPersoneller(personeller.filter((p) => p.personelId !== id));
  };

  const duzenle = (p) => {
    setDuzenlenenPersonelId(p.personelId);
    setPersonelId(p.personelId);
    setAd(p.ad);
    setSoyad(p.soyad);
    setRol(p.rol);
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Personel Yönetimi</h2>

        <div className="form-group">
          <input
            type="number"
            placeholder="Personel ID"
            value={personelId}
            onChange={(e) => setPersonelId(e.target.value)}
            className="form-group-full"
            disabled={duzenlenenPersonelId !== null}
          />

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

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="form-group-full"
          >
            <option value="">Rol Seç</option>
            <option value="Pilot">Pilot</option>
            <option value="Kabin">Kabin Görevlisi</option>
          </select>

          <button className="primary" onClick={kaydet}>
            {duzenlenenPersonelId === null ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Personel Listesi</h3>

        {personeller.length === 0 ? (
          <p>Henüz personel eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Personel ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Rol</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {personeller.map((p) => (
                <tr key={p.personelId}>
                  <td>{p.personelId}</td>
                  <td>{p.ad}</td>
                  <td>{p.soyad}</td>
                  <td>{p.rol}</td>
                  <td>
                    <button onClick={() => duzenle(p)}>Düzenle</button>
                    <button
                      className="danger"
                      onClick={() => sil(p.personelId)}
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

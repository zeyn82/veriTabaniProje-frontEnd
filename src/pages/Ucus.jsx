import { useState } from "react";

function Ucus({ havalimanlari, havayollari, ucaklar }) {
  const [ucuslar, setUcuslar] = useState([]);

  const [ucusKodu, setUcusKodu] = useState("");
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havayoluId, setHavayoluId] = useState("");
  const [ucakId, setUcakId] = useState("");

  const ekle = () => {
    if (!ucusKodu || !havalimaniId || !havayoluId || !ucakId) {
      alert("Tüm alanlar zorunludur!");
      return;
    }

    setUcuslar([
      ...ucuslar,
      {
        id: Date.now(),
        ucusKodu,
        havalimaniId: Number(havalimaniId),
        havayoluId: Number(havayoluId),
        ucakId,
      },
    ]);

    setUcusKodu("");
    setHavalimaniId("");
    setHavayoluId("");
    setUcakId("");
  };

  const sil = (id) => {
    if (!window.confirm("Uçuş silinsin mi?")) return;
    setUcuslar(ucuslar.filter((u) => u.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Uçuş Yönetimi</h2>

        <input
          placeholder="Uçuş Kodu"
          value={ucusKodu}
          onChange={(e) => setUcusKodu(e.target.value)}
        />

        {/* HAVALİMANI */}
        <select
          value={havalimaniId}
          onChange={(e) => setHavalimaniId(e.target.value)}
        >
          <option value="">Havalimanı Seç</option>
          {havalimanlari.map((h) => (
            <option key={h.id} value={h.id}>
              {h.ad}
            </option>
          ))}
        </select>

        {/* HAVAYOLU */}
        <select
          value={havayoluId}
          onChange={(e) => setHavayoluId(e.target.value)}
        >
          <option value="">Havayolu Seç</option>
          {havayollari.map((h) => (
            <option key={h.id} value={h.id}>
              {h.ad}
            </option>
          ))}
        </select>

        {/* UÇAK */}
        <select
          value={ucakId}
          onChange={(e) => setUcakId(e.target.value)}
        >
          <option value="">Uçak Seç</option>
          {ucaklar.map((u) => (
            <option reopened key={u.ucakId} value={u.ucakId}>
              {u.model} ({u.ucakId})
            </option>
          ))}
        </select>

        <button className="primary" onClick={ekle}>
          Uçuş Ekle
        </button>
      </div>

      <div className="card">
        <h3>Uçuş Listesi</h3>

        {ucuslar.length === 0 ? (
          <p>Henüz uçuş eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Uçuş Kodu</th>
                <th>Havalimanı</th>
                <th>Havayolu</th>
                <th>Uçak</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ucuslar.map((u) => {
                const havalimanı = havalimanlari.find(
                  (h) => h.id === u.havalimaniId
                );
                const havayolu = havayollari.find(
                  (h) => h.id === u.havayoluId
                );
                const ucak = ucaklar.find(
                  (x) => x.ucakId === u.ucakId
                );

                return (
                  <tr key={u.id}>
                    <td>{u.ucusKodu}</td>
                    <td>{havalimanı?.ad}</td>
                    <td>{havayolu?.ad}</td>
                    <td>{ucak?.model}</td>
                    <td>
                      <button
                        className="danger"
                        onClick={() => sil(u.id)}
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

export default Ucus;

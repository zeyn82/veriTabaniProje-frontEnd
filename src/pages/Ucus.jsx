import { useState } from "react";

function Ucus() {
  const [ucuslar, setUcuslar] = useState([]);
  const [kod, setKod] = useState("");
  const [kalkis, setKalkis] = useState("");
  const [varis, setVaris] = useState("");

  const ekle = () => {
    if (!kod || !kalkis || !varis) return;

    if (kalkis === varis) {
      alert("Kalkış ve varış aynı olamaz!");
      return;
    }

    setUcuslar([
      ...ucuslar,
      {
        id: Date.now(),
        kod,
        kalkis,
        varis,
      },
    ]);

    setKod("");
    setKalkis("");
    setVaris("");
  };

  const sil = (id) => {
    if (!window.confirm("Uçuş silinsin mi?")) return;
    setUcuslar(ucuslar.filter((u) => u.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Uçuş Ekle</h2>

        <input
          placeholder="Uçuş Kodu"
          value={kod}
          onChange={(e) => setKod(e.target.value)}
        />

        <input
          placeholder="Kalkış"
          value={kalkis}
          onChange={(e) => setKalkis(e.target.value)}
        />

        <input
          placeholder="Varış"
          value={varis}
          onChange={(e) => setVaris(e.target.value)}
        />

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
                <th>Kalkış</th>
                <th>Varış</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ucuslar.map((u) => (
                <tr key={u.id}>
                  <td>{u.kod}</td>
                  <td>{u.kalkis}</td>
                  <td>{u.varis}</td>
                  <td>
                    <button
                      className="danger"
                      onClick={() => sil(u.id)}
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

export default Ucus;
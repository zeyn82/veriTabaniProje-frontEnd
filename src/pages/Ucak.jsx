import { useState } from "react";
import { motion } from "framer-motion";

function Ucak() {
  const [ucaklar, setUcaklar] = useState([]);
  const [ucakId, setUcakId] = useState("");
  const [model, setModel] = useState("");
  const [kapasite, setKapasite] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const ekle = () => {
    if (!ucakId || !model || !kapasite) return;

    const id = Number(ucakId);
    const kap = Number(kapasite);

    if (id <= 0) {
      alert("Uçak ID pozitif bir sayı olmalıdır.");
      return;
    }

    // ❌ Negatif veya 0 kapasite engeli
    if (kap <= 0) {
      alert("Kapasite negatif veya 0 olamaz.");
      return;
    }

    // ❌ Gerçekçi olmayan kapasite engeli
    if (kap > 850) {
      alert("Gerçekçi olmayan kapasite.");
      return;
    }

    if (duzenlenenId !== null) {
      setUcaklar(
        ucaklar.map((u) =>
          u.ucakId === duzenlenenId
            ? { ...u, model, kapasite: kap }
            : u
        )
      );
      setDuzenlenenId(null);
    } else {
      const varMi = ucaklar.some((u) => u.ucakId === id);
      if (varMi) {
        alert("Bu Uçak ID zaten mevcut!");
        return;
      }

      setUcaklar([
        ...ucaklar,
        { ucakId: id, model, kapasite: kap },
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

  const duzenle = (u) => {
    setUcakId(u.ucakId);
    setModel(u.model);
    setKapasite(u.kapasite);
    setDuzenlenenId(u.ucakId);
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card">
        <h2>Uçak Yönetimi</h2>

        <input
          type="number"
          placeholder="Uçak ID"
          value={ucakId}
          onChange={(e) => setUcakId(e.target.value)}
          disabled={duzenlenenId !== null}
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
                    <button onClick={() => duzenle(u)}>Düzenle</button>
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
    </motion.div>
  );
}

export default Ucak;

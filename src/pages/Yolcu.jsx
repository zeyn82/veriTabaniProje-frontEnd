import { useState } from "react";
import { motion } from "framer-motion";

function Yolcu() {
  const [yolcular, setYolcular] = useState([]);
  const [adSoyad, setAdSoyad] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  // Lookup için
  const [secilenYolcuId, setSecilenYolcuId] = useState("");

  const kaydet = () => {
    if (!adSoyad || !tcNo) return;

    if (duzenlenenId === null) {
      setYolcular((onceki) => [
        ...onceki,
        {
          id: Date.now(),
          adSoyad,
          tcNo,
        },
      ]);
    } else {
      setYolcular((onceki) =>
        onceki.map((y) =>
          y.id === duzenlenenId
            ? { ...y, adSoyad, tcNo }
            : y
        )
      );
    }

    setAdSoyad("");
    setTcNo("");
    setDuzenlenenId(null);
  };

  const sil = (id) => {
    setYolcular((onceki) =>
      onceki.filter((y) => y.id !== id)
    );

    if (secilenYolcuId === id) {
      setSecilenYolcuId("");
    }
  };

  const duzenle = (y) => {
    setDuzenlenenId(y.id);
    setAdSoyad(y.adSoyad);
    setTcNo(y.tcNo);
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Yolcu Formu */}
      <div className="card">
        <h2>Yolcu Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Ad Soyad"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="TC Kimlik No"
            value={tcNo}
            onChange={(e) => setTcNo(e.target.value)}
            className="form-group-full"
          />

          <button className="primary" onClick={kaydet}>
            {duzenlenenId === null ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </div>

      {/* Lookup Kartı */}
      <div className="card">
        <h3>Yolcu Seç (Lookup)</h3>

        <select
          value={secilenYolcuId}
          onChange={(e) => setSecilenYolcuId(e.target.value)}
        >
          <option value="">Yolcu Seç</option>
          {yolcular.map((y) => (
            <option key={y.id} value={y.id}>
              {y.adSoyad}
            </option>
          ))}
        </select>

        {secilenYolcuId && (
          <p style={{ marginTop: "10px" }}>
            <strong>Seçilen Yolcu ID:</strong> {secilenYolcuId}
          </p>
        )}
      </div>

      {/* Yolcu Listesi */}
      <div className="card">
        <h3>Yolcu Listesi</h3>

        {yolcular.length === 0 ? (
          <p>Henüz yolcu eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>TC Kimlik No</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {yolcular.map((y) => (
                <tr key={y.id}>
                  <td>{y.adSoyad}</td>
                  <td>{y.tcNo}</td>
                  <td>
                    <button onClick={() => duzenle(y)}>
                      Düzenle
                    </button>
                    <button
                      className="danger"
                      onClick={() => sil(y.id)}
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

export default Yolcu;

import { useState } from "react";
import { motion } from "framer-motion";

function Bilet({ yolcular, biletler, setBiletler }) {
  const [biletNo, setBiletNo] = useState("");
  const [koltukNo, setKoltukNo] = useState("");
  const [secilenYolcuId, setSecilenYolcuId] = useState("");

  const [duzenlenenBiletNo, setDuzenlenenBiletNo] = useState(null);

  const kaydet = () => {
    if (!biletNo || !koltukNo || !secilenYolcuId) return;

    if (duzenlenenBiletNo === null) {
      setBiletler((onceki) => [
        ...onceki,
        {
          biletNo,                 // ✅ PK
          koltukNo,
          yolcuId: secilenYolcuId, // ✅ FK
        },
      ]);
    } else {
      setBiletler((onceki) =>
        onceki.map((b) =>
          b.biletNo === duzenlenenBiletNo
            ? { ...b, koltukNo, yolcuId: secilenYolcuId }
            : b
        )
      );
    }

    setBiletNo("");
    setKoltukNo("");
    setSecilenYolcuId("");
    setDuzenlenenBiletNo(null);
  };

  const sil = (no) => {
    setBiletler((onceki) =>
      onceki.filter((b) => b.biletNo !== no)
    );
  };

  const duzenle = (b) => {
    setDuzenlenenBiletNo(b.biletNo);
    setBiletNo(b.biletNo);
    setKoltukNo(b.koltukNo);
    setSecilenYolcuId(b.yolcuId);
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🎟️ BİLET FORMU */}
      <div className="card">
        <h2>Bilet Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Bilet No"
            value={biletNo}
            onChange={(e) => setBiletNo(e.target.value)}
            className="form-group-full"
            disabled={duzenlenenBiletNo !== null}
          />

          <input
            placeholder="Koltuk No"
            value={koltukNo}
            onChange={(e) => setKoltukNo(e.target.value)}
            className="form-group-full"
          />

          <select
            value={secilenYolcuId}
            onChange={(e) => setSecilenYolcuId(Number(e.target.value))}
            className="form-group-full"
          >
            <option value="">Yolcu Seç</option>
            {yolcular.map((y) => (
              <option key={y.yolcuId} value={y.yolcuId}>
                {y.yolcuAdi} {y.yolcuSoyadi}
              </option>
            ))}
          </select>

          <button className="primary" onClick={kaydet}>
            {duzenlenenBiletNo === null ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </div>

      {/* 📋 BİLET LİSTESİ */}
      <div className="card">
        <h3>Bilet Listesi</h3>

        {biletler.length === 0 ? (
          <p>Henüz bilet eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Bilet No</th>
                <th>Koltuk No</th>
                <th>Yolcu</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {biletler.map((b) => {
                const yolcu = yolcular.find(
                  (y) => y.yolcuId === b.yolcuId
                );

                return (
                  <tr key={b.biletNo}>
                    <td>{b.biletNo}</td>
                    <td>{b.koltukNo}</td>
                    <td>
                      {yolcu
                        ? `${yolcu.yolcuAdi} ${yolcu.yolcuSoyadi}`
                        : "—"}
                    </td>
                    <td>
                      <button onClick={() => duzenle(b)}>
                        Düzenle
                      </button>
                      <button
                        className="danger"
                        onClick={() => sil(b.biletNo)}
                        style={{ marginLeft: "6px" }}
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
    </motion.div>
  );
}

export default Bilet;

import { useState } from "react";
import { motion } from "framer-motion";

function Bilet({ yolcular, ucuslar, biletler, setBiletler }) {
  const [biletNo, setBiletNo] = useState("");
  const [koltukNo, setKoltukNo] = useState("");
  const [secilenYolcuId, setSecilenYolcuId] = useState("");
  const [secilenUcusId, setSecilenUcusId] = useState("");

  const [duzenlenenBiletNo, setDuzenlenenBiletNo] = useState(null);

  const kaydet = () => {
    if (
      !biletNo ||
      !koltukNo ||
      !secilenYolcuId ||
      !secilenUcusId
    )
      return;

    // 🔴 PRIMARY KEY KONTROLÜ (BiletNo)
    const ayniBiletVarMi = biletler.some(
      (b) => b.biletNo === biletNo
    );

    if (ayniBiletVarMi && duzenlenenBiletNo === null) {
      alert("Bu bilet numarası zaten mevcut!");
      return;
    }

    if (duzenlenenBiletNo === null) {
      // ➕ EKLEME
      setBiletler((onceki) => [
        ...onceki,
        {
          biletNo,                 // PK
          koltukNo,
          yolcuId: secilenYolcuId, // FK
          ucusId: secilenUcusId,   // FK
        },
      ]);
    } else {
      // ✏️ GÜNCELLEME
      setBiletler((onceki) =>
        onceki.map((b) =>
          b.biletNo === duzenlenenBiletNo
            ? {
                ...b,
                koltukNo,
                yolcuId: secilenYolcuId,
                ucusId: secilenUcusId,
              }
            : b
        )
      );
    }

    setBiletNo("");
    setKoltukNo("");
    setSecilenYolcuId("");
    setSecilenUcusId("");
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
    setSecilenUcusId(b.ucusId);
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

          {/* ✈️ UÇUŞ SEÇİMİ */}
          <select
            value={secilenUcusId}
            onChange={(e) =>
              setSecilenUcusId(Number(e.target.value))
            }
            className="form-group-full"
          >
            <option value="">Uçuş Seç</option>
            {ucuslar.map((u) => (
              <option key={u.ucusId} value={u.ucusId}>
                {u.kalkis} → {u.varis}
              </option>
            ))}
          </select>

          {/* 👤 YOLCU SEÇİMİ */}
          <select
            value={secilenYolcuId}
            onChange={(e) =>
              setSecilenYolcuId(Number(e.target.value))
            }
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
                <th>Uçuş</th>
                <th>Yolcu</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {biletler.map((b) => {
                const yolcu = yolcular.find(
                  (y) => y.yolcuId === b.yolcuId
                );
                const ucus = ucuslar.find(
                  (u) => u.ucusId === b.ucusId
                );

                return (
                  <tr key={b.biletNo}>
                    <td>{b.biletNo}</td>
                    <td>{b.koltukNo}</td>
                    <td>
                      {ucus
                        ? `${ucus.kalkis} → ${ucus.varis}`
                        : "—"}
                    </td>
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

import { useState } from "react";
import { motion } from "framer-motion";

function Bagaj({ yolcular, bagajlar, setBagajlar }) {
  const [bagajNo, setBagajNo] = useState("");
  const [agirlik, setAgirlik] = useState("");
  const [secilenYolcuId, setSecilenYolcuId] = useState("");

  const [duzenlenenBagaj, setDuzenlenenBagaj] = useState(null);
  // duzenlenenBagaj = { bagajNo, yolcuId }

  const kaydet = () => {
    if (!bagajNo || !agirlik || !secilenYolcuId) return;

    // 🔴 AYNI YOLCUYA AYNI BAGAJ NO KONTROLÜ (COMPOSITE KEY)
    const ayniBagajVarMi = bagajlar.some(
      (b) =>
        b.bagajNo === bagajNo &&
        b.yolcuId === secilenYolcuId
    );

    if (ayniBagajVarMi && duzenlenenBagaj === null) {
      alert("Bu yolcuya ait aynı bagaj numarası zaten var!");
      return;
    }

    if (duzenlenenBagaj === null) {
      // 🔹 ZAYIF VARLIK EKLEME
      setBagajlar((onceki) => [
        ...onceki,
        {
          bagajNo,                 // kısmi anahtar
          agirlik,
          yolcuId: secilenYolcuId, // sahip varlık (FK)
        },
      ]);
    } else {
      // 🔹 ZAYIF VARLIK GÜNCELLEME
      setBagajlar((onceki) =>
        onceki.map((b) =>
          b.bagajNo === duzenlenenBagaj.bagajNo &&
          b.yolcuId === duzenlenenBagaj.yolcuId
            ? { ...b, agirlik }
            : b
        )
      );
    }

    setBagajNo("");
    setAgirlik("");
    setSecilenYolcuId("");
    setDuzenlenenBagaj(null);
  };

  const sil = (bagajNo, yolcuId) => {
    setBagajlar((onceki) =>
      onceki.filter(
        (b) => !(b.bagajNo === bagajNo && b.yolcuId === yolcuId)
      )
    );
  };

  const duzenle = (b) => {
    setDuzenlenenBagaj({
      bagajNo: b.bagajNo,
      yolcuId: b.yolcuId,
    });
    setBagajNo(b.bagajNo);
    setAgirlik(b.agirlik);
    setSecilenYolcuId(b.yolcuId);
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🎒 BAGAJ FORMU */}
      <div className="card">
        <h2>Bagaj Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Bagaj No"
            value={bagajNo}
            onChange={(e) => setBagajNo(e.target.value)}
            className="form-group-full"
            disabled={duzenlenenBagaj !== null}
          />

          <input
            placeholder="Ağırlık (kg)"
            type="number"
            value={agirlik}
            onChange={(e) => setAgirlik(e.target.value)}
            className="form-group-full"
          />

          <select
            value={secilenYolcuId}
            onChange={(e) => setSecilenYolcuId(Number(e.target.value))}
            className="form-group-full"
            disabled={duzenlenenBagaj !== null}
          >
            <option value="">Yolcu Seç</option>
            {yolcular.map((y) => (
              <option key={y.yolcuId} value={y.yolcuId}>
                {y.yolcuAdi} {y.yolcuSoyadi}
              </option>
            ))}
          </select>

          <button className="primary" onClick={kaydet}>
            {duzenlenenBagaj === null ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </div>

      {/* 📋 BAGAJ LİSTESİ */}
      <div className="card">
        <h3>Bagaj Listesi</h3>

        {bagajlar.length === 0 ? (
          <p>Henüz bagaj eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Bagaj No</th>
                <th>Ağırlık (kg)</th>
                <th>Yolcu</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {bagajlar.map((b) => {
                const yolcu = yolcular.find(
                  (y) => y.yolcuId === b.yolcuId
                );

                return (
                  <tr key={`${b.yolcuId}-${b.bagajNo}`}>
                    <td>{b.bagajNo}</td>
                    <td>{b.agirlik}</td>
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
                        onClick={() => sil(b.bagajNo, b.yolcuId)}
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

export default Bagaj;

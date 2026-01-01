import { useState } from "react";
import { motion } from "framer-motion";

function Bagaj({ yolcular, bagajlar, setBagajlar }) {
  const [bagajNo, setBagajNo] = useState("");
  const [agirlik, setAgirlik] = useState("");
  const [yolcuId, setYolcuId] = useState("");

  const ekle = () => {
    if (!bagajNo || !agirlik || !yolcuId) return;

    if (bagajlar.some(b => b.bagajNo === bagajNo)) {
      alert("Bu bagaj numarası zaten var!");
      return;
    }

    setBagajlar([
      ...bagajlar,
      {
        bagajNo,
        agirlik,
        yolcu_id: yolcuId,
      },
    ]);

    setBagajNo("");
    setAgirlik("");
    setYolcuId("");
  };

  const sil = (no) => {
    setBagajlar(bagajlar.filter(b => b.bagajNo !== no));
  };

  return (
    <motion.div className="page">
      <div className="card">
        <h2>Bagaj Yönetimi</h2>

        <input
          placeholder="Bagaj No"
          value={bagajNo}
          onChange={(e) => setBagajNo(e.target.value)}
        />

        <input
          placeholder="Ağırlık"
          type="number"
          value={agirlik}
          onChange={(e) => setAgirlik(e.target.value)}
        />

        <select
          value={yolcuId}
          onChange={(e) => setYolcuId(e.target.value)}
        >
          <option value="">Yolcu Seç</option>
          {yolcular.map(y => (
            <option key={y.yolcu_id} value={y.yolcu_id}>
              {y.yolcu_ad} {y.yolcu_soyad}
            </option>
          ))}
        </select>

        <button onClick={ekle}>Ekle</button>
      </div>

      <div className="card">
        <h3>Bagaj Listesi</h3>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Ağırlık</th>
              <th>Yolcu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bagajlar.map(b => {
              const y = yolcular.find(y => y.yolcu_id === b.yolcu_id);
              return (
                <tr key={b.bagajNo}>
                  <td>{b.bagajNo}</td>
                  <td>{b.agirlik}</td>
                  <td>{y ? `${y.yolcu_ad} ${y.yolcu_soyad}` : "-"}</td>
                  <td>
                    <button className="danger" onClick={() => sil(b.bagajNo)}>
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Bagaj;

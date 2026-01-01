import { useState } from "react";
import { motion } from "framer-motion";

function Bagaj({ yolcular, bagajlar, setBagajlar }) {
  const [bagajNo, setBagajNo] = useState("");
  const [agirlik, setAgirlik] = useState("");
  const [yolcuId, setYolcuId] = useState("");

  const ekle = () => {
    if (!bagajNo || !agirlik || !yolcuId) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // 🔴 DÜZELTME 1: Veritabanındaki isimle kontrol (bagaj_no)
    // Not: bagaj_no veritabanından sayı veya string gelebilir, '==' kullandık.
    if (bagajlar.some(b => b.bagaj_no == bagajNo)) {
      alert("Bu bagaj numarası zaten var!");
      return;
    }

    // 🔴 DÜZELTME 2: Listeye eklerken veritabanı formatını kullandık
    setBagajlar([
      ...bagajlar,
      {
        bagaj_no: bagajNo, // bagajNo -> bagaj_no
        agirlik: agirlik,
        yolcu_id: yolcuId,
      },
    ]);

    setBagajNo("");
    setAgirlik("");
    setYolcuId("");
  };

  const sil = (no) => {
    if (!window.confirm("Silmek istiyor musun?")) return;
    // 🔴 DÜZELTME 3: Silerken bagaj_no kullandık
    setBagajlar(bagajlar.filter(b => b.bagaj_no !== no));
  };

  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="card">
        <h2>Bagaj Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Bagaj No"
            value={bagajNo}
            onChange={(e) => setBagajNo(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Ağırlık (kg)"
            type="number"
            value={agirlik}
            onChange={(e) => setAgirlik(e.target.value)}
            className="form-group-full"
          />

          <select
            value={yolcuId}
            onChange={(e) => setYolcuId(e.target.value)}
            className="form-group-full"
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
      </div>

      <div className="card">
        <h3>Bagaj Listesi</h3>

        {bagajlar.length === 0 ? (
          <p>Kayıtlı bagaj bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Ağırlık</th>
                <th>Yolcu</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {bagajlar.map(b => {
                // Eşleşen yolcuyu bul
                const y = yolcular.find(y => y.yolcu_id == b.yolcu_id);
                
                return (
                  // 🔴 DÜZELTME 4: key olarak bagaj_no kullandık
                  <tr key={b.bagaj_no}>
                    {/* 🔴 DÜZELTME 5: Ekrana yazarken bagaj_no kullandık */}
                    <td>{b.bagaj_no}</td>
                    <td>{b.agirlik} kg</td>
                    <td>
                         {y ? `${y.yolcu_ad} ${y.yolcu_soyad}` : `ID: ${b.yolcu_id}`}
                    </td>
                    <td>
                      <button className="danger" onClick={() => sil(b.bagaj_no)}>
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
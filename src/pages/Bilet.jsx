import { useState } from "react";
import { motion } from "framer-motion";

function Bilet({ yolcular, ucuslar, biletler, setBiletler }) {
  const [biletNo, setBiletNo] = useState("");
  const [koltukNo, setKoltukNo] = useState("");
  const [secilenYolcuId, setSecilenYolcuId] = useState("");
  const [secilenUcusId, setSecilenUcusId] = useState("");

  const [duzenlenenBiletNo, setDuzenlenenBiletNo] = useState(null);

  const kaydet = () => {
    if (!biletNo || !koltukNo || !secilenYolcuId || !secilenUcusId) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // 🔴 DÜZELTME 1: b.bilet_no olarak kontrol ettik
    const ayniBiletVarMi = biletler.some(
      (b) => b.bilet_no == biletNo // Not: == kullandık çünkü biri string biri number olabilir
    );

    if (ayniBiletVarMi && duzenlenenBiletNo === null) {
      alert("Bu bilet numarası zaten mevcut!");
      return;
    }

    if (duzenlenenBiletNo === null) {
      // ➕ EKLEME (Veritabanı sütun isimlerini kullandık)
      setBiletler((onceki) => [
        ...onceki,
        {
          bilet_no: biletNo,          // biletNo -> bilet_no
          koltuk_no: koltukNo,        // koltukNo -> koltuk_no
          yolcu_id: secilenYolcuId,   // yolcuId -> yolcu_id
          ucus_id: secilenUcusId,     // ucusId -> ucus_id
        },
      ]);
    } else {
      // ✏️ GÜNCELLEME
      setBiletler((onceki) =>
        onceki.map((b) =>
          b.bilet_no === duzenlenenBiletNo
            ? {
                ...b,
                koltuk_no: koltukNo,
                yolcu_id: secilenYolcuId,
                ucus_id: secilenUcusId,
              }
            : b
        )
      );
    }

    // Formu temizle
    setBiletNo("");
    setKoltukNo("");
    setSecilenYolcuId("");
    setSecilenUcusId("");
    setDuzenlenenBiletNo(null);
  };

  const sil = (no) => {
    if (!window.confirm("Bileti silmek istiyor musun?")) return;
    // 🔴 DÜZELTME 2: bilet_no'ya göre sildik
    setBiletler((onceki) => onceki.filter((b) => b.bilet_no !== no));
  };

  const duzenle = (b) => {
    // 🔴 DÜZELTME 3: Verileri çekerken doğru isimleri kullandık
    setDuzenlenenBiletNo(b.bilet_no);
    setBiletNo(b.bilet_no);
    setKoltukNo(b.koltuk_no);
    setSecilenYolcuId(b.yolcu_id);
    setSecilenUcusId(b.ucus_id);
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
            onChange={(e) => setSecilenUcusId(Number(e.target.value))}
            className="form-group-full"
          >
            <option value="">Uçuş Seç</option>
            {ucuslar.map((u) => (
              /* 🔴 DÜZELTME 4: ucus_id ve kalkis/varis */
              <option key={u.ucus_id} value={u.ucus_id}>
                {u.kalkis} → {u.varis} (ID: {u.ucus_id})
              </option>
            ))}
          </select>

          {/* 👤 YOLCU SEÇİMİ */}
          <select
            value={secilenYolcuId}
            onChange={(e) => setSecilenYolcuId(Number(e.target.value))}
            className="form-group-full"
          >
            <option value="">Yolcu Seç</option>
            {yolcular.map((y) => (
              /* 🔴 DÜZELTME 5: yolcu_id ve yolcu_ad */
              <option key={y.yolcu_id} value={y.yolcu_id}>
                {y.yolcu_ad} {y.yolcu_soyad}
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
                // 🔴 DÜZELTME 6: Eşleştirme yaparken ID'lerin doğru yazımı
                const yolcu = yolcular.find((y) => y.yolcu_id === b.yolcu_id);
                const ucus = ucuslar.find((u) => u.ucus_id === b.ucus_id);

                return (
                  <tr key={b.bilet_no}>
                    <td>{b.bilet_no}</td>
                    <td>{b.koltuk_no}</td>
                    <td>
                      {ucus
                        ? `${ucus.kalkis} → ${ucus.varis}`
                        : `ID: ${b.ucus_id} (Bulunamadı)`}
                    </td>
                    <td>
                      {yolcu
                        ? `${yolcu.yolcu_ad} ${yolcu.yolcu_soyad}`
                        : `ID: ${b.yolcu_id} (Bulunamadı)`}
                    </td>
                    <td>
                      <button onClick={() => duzenle(b)}>Düzenle</button>
                      <button
                        className="danger"
                        onClick={() => sil(b.bilet_no)}
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
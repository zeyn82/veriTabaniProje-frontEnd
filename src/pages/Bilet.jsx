import { useState } from "react";
import { motion } from "framer-motion";

function Bilet({ yolcular, ucuslar, biletler, setBiletler }) {
  const [biletNo, setBiletNo] = useState("");
  const [koltukNo, setKoltukNo] = useState("");
  const [secilenYolcuId, setSecilenYolcuId] = useState("");
  const [secilenUcusId, setSecilenUcusId] = useState("");

  const [duzenlenenBiletNo, setDuzenlenenBiletNo] = useState(null);

  // 🔥 KAYDET (HEM EKLEME HEM GÜNCELLEME)
  const kaydet = async () => {
    if (!biletNo || !koltukNo || !secilenYolcuId || !secilenUcusId) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const veriPaketi = {
      bilet_no: biletNo,
      koltuk_no: koltukNo,
      yolcu_id: secilenYolcuId,
      ucus_id: secilenUcusId,
    };

    try {
      let response;
      
      if (duzenlenenBiletNo === null) {
        // ➕ YENİ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/bilet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      } else {
        // ✏️ GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/bilet/${biletNo}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const sonucVerisi = await response.json();

        if (duzenlenenBiletNo === null) {
          // Listeye yeni ekle
          setBiletler([...biletler, sonucVerisi]);
          alert("✅ Bilet Veritabanına Kaydedildi!");
        } else {
          // Listede mevcut olanı güncelle
          setBiletler(biletler.map(b => b.bilet_no === duzenlenenBiletNo ? sonucVerisi : b));
          alert("✅ Bilet Güncellendi!");
        }

        // Temizlik
        setBiletNo("");
        setKoltukNo("");
        setSecilenYolcuId("");
        setSecilenUcusId("");
        setDuzenlenenBiletNo(null);
      } else {
        alert("❌ İşlem başarısız! Bilet No çakışıyor olabilir.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    }
  };

  // 🔥 SİLME İŞLEMİ (DELETE)
  const sil = async (no) => {
    if (!window.confirm("Bileti silmek istiyor musun?")) return;

    try {
      await fetch(`http://localhost:3000/api/bilet/${no}`, { method: "DELETE" });
      setBiletler(biletler.filter((b) => b.bilet_no !== no));
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const duzenle = (b) => {
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
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card">
        <h2>Bilet Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Bilet No"
            value={biletNo}
            onChange={(e) => setBiletNo(e.target.value)}
            className="form-group-full"
            disabled={duzenlenenBiletNo !== null} // Düzenlerken ID değiştirilemez
          />

          <input
            placeholder="Koltuk No"
            value={koltukNo}
            onChange={(e) => setKoltukNo(e.target.value)}
            className="form-group-full"
          />

          <select
            value={secilenUcusId}
            onChange={(e) => setSecilenUcusId(Number(e.target.value))}
            className="form-group-full"
          >
            <option value="">Uçuş Seç</option>
            {ucuslar.map((u) => (
              <option key={u.ucus_id} value={u.ucus_id}>
                {u.kalkis} → {u.varis} (ID: {u.ucus_id})
              </option>
            ))}
          </select>

          <select
            value={secilenYolcuId}
            onChange={(e) => setSecilenYolcuId(Number(e.target.value))}
            className="form-group-full"
          >
            <option value="">Yolcu Seç</option>
            {yolcular.map((y) => (
              <option key={y.yolcu_id} value={y.yolcu_id}>
                {y.yolcu_ad} {y.yolcu_soyad}
              </option>
            ))}
          </select>

          <button className="primary" onClick={kaydet}>
            {duzenlenenBiletNo === null ? "Veritabanına Kaydet" : "Güncelle"}
          </button>
        </div>
      </div>

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
                const yolcu = yolcular.find((y) => y.yolcu_id == b.yolcu_id);
                const ucus = ucuslar.find((u) => u.ucus_id == b.ucus_id);

                return (
                  <tr key={b.bilet_no}>
                    <td>{b.bilet_no}</td>
                    <td>{b.koltuk_no}</td>
                    <td>
                      {ucus
                        ? `${ucus.kalkis} → ${ucus.varis}`
                        : `ID: ${b.ucus_id}`}
                    </td>
                    <td>
                      {yolcu
                        ? `${yolcu.yolcu_ad} ${yolcu.yolcu_soyad}`
                        : `ID: ${b.yolcu_id}`}
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
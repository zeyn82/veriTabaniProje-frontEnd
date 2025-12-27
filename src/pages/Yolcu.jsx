import { useState } from "react";
import { motion } from "framer-motion";

function Yolcu({ yolcular, setYolcular }) {
  const [yolcuAdi, setYolcuAdi] = useState("");
  const [yolcuSoyadi, setYolcuSoyadi] = useState("");
  const [telefonNo, setTelefonNo] = useState("");

  const [duzenlenenId, setDuzenlenenId] = useState(null);
  const [secilenYolcuId, setSecilenYolcuId] = useState("");

  const kaydet = () => {
    if (!yolcuAdi || !yolcuSoyadi || !telefonNo) {
      alert("Tüm alanlar zorunludur.");
      return;
    }

    // 📞 TELEFON NUMARASI FORMAT KONTROLÜ
    if (!/^\d{10,11}$/.test(telefonNo)) {
      alert("Telefon numarası 10 veya 11 haneli olmalıdır.");
      return;
    }

    // ⚠️ AYNI AD + SOYAD UYARISI
    const ayniIsimVarMi = yolcular.some(
      (y) =>
        y.yolcuAdi.toLowerCase() === yolcuAdi.toLowerCase() &&
        y.yolcuSoyadi.toLowerCase() === yolcuSoyadi.toLowerCase() &&
        y.yolcuId !== duzenlenenId
    );

    if (ayniIsimVarMi) {
      if (
        !window.confirm(
          "Aynı isim ve soyisimde bir yolcu zaten mevcut. Yine de eklemek istiyor musunuz?"
        )
      ) {
        return;
      }
    }

    if (duzenlenenId === null) {
      setYolcular((onceki) => [
        ...onceki,
        {
          yolcuId: Date.now(),
          yolcuAdi,
          yolcuSoyadi,
          telefonNo,
        },
      ]);
    } else {
      setYolcular((onceki) =>
        onceki.map((y) =>
          y.yolcuId === duzenlenenId
            ? { ...y, yolcuAdi, yolcuSoyadi, telefonNo }
            : y
        )
      );
    }

    setYolcuAdi("");
    setYolcuSoyadi("");
    setTelefonNo("");
    setDuzenlenenId(null);
  };

  const sil = (id) => {
    if (!window.confirm("Yolcu silinsin mi?")) return;

    setYolcular((onceki) =>
      onceki.filter((y) => y.yolcuId !== id)
    );

    if (secilenYolcuId === id) {
      setSecilenYolcuId("");
    }
  };

  const duzenle = (y) => {
    setDuzenlenenId(y.yolcuId);
    setYolcuAdi(y.yolcuAdi);
    setYolcuSoyadi(y.yolcuSoyadi);
    setTelefonNo(y.telefonNo);
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🧍‍♂️ YOLCU FORMU */}
      <div className="card">
        <h2>Yolcu Yönetimi</h2>

        <div className="form-group">
          <input
            placeholder="Yolcu Adı"
            value={yolcuAdi}
            onChange={(e) => setYolcuAdi(e.target.value)}
            className="form-group-full"
          />

          <input
            placeholder="Yolcu Soyadı"
            value={yolcuSoyadi}
            onChange={(e) => setYolcuSoyadi(e.target.value)}
            className="form-group-full"
          />

          <input
            type="tel"
            placeholder="Telefon No (10-11 hane)"
            value={telefonNo}
            onChange={(e) =>
              setTelefonNo(
                e.target.value.replace(/[^0-9]/g, "")
              )
            }
            className="form-group-full"
          />

          <button className="primary" onClick={kaydet}>
            {duzenlenenId === null ? "Ekle" : "Güncelle"}
          </button>
        </div>
      </div>

      {/* 🔍 LOOKUP */}
      <div className="card">
        <h3>Yolcu Seç (Lookup)</h3>

        <select
          value={secilenYolcuId}
          onChange={(e) => setSecilenYolcuId(Number(e.target.value))}
        >
          <option value="">Yolcu Seç</option>
          {yolcular.map((y) => (
            <option key={y.yolcuId} value={y.yolcuId}>
              {y.yolcuAdi} {y.yolcuSoyadi}
            </option>
          ))}
        </select>

        {secilenYolcuId && (
          <p style={{ marginTop: "10px" }}>
            <strong>Seçilen Yolcu ID:</strong> {secilenYolcuId}
          </p>
        )}
      </div>

      {/* 📋 YOLCU LİSTESİ */}
      <div className="card">
        <h3>Yolcu Listesi</h3>

        {yolcular.length === 0 ? (
          <p>Henüz yolcu eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Telefon</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {yolcular.map((y) => (
                <tr key={y.yolcuId}>
                  <td>{y.yolcuId}</td>
                  <td>{y.yolcuAdi}</td>
                  <td>{y.yolcuSoyadi}</td>
                  <td>{y.telefonNo}</td>
                  <td>
                    <button onClick={() => duzenle(y)}>
                      Düzenle
                    </button>
                    <button
                      className="danger"
                      onClick={() => sil(y.yolcuId)}
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

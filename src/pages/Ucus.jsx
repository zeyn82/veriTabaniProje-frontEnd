import { useState } from "react";

function Ucus({ havalimanlari, havayollari, ucaklar, biletler }) {
  const [ucuslar, setUcuslar] = useState([]);

  const [ucusKodu, setUcusKodu] = useState("");
  const [biletId, setBiletId] = useState("");
  const [havalimaniId, setHavalimaniId] = useState("");
  const [havayoluId, setHavayoluId] = useState("");
  const [ucakId, setUcakId] = useState("");

  const ekle = () => {
    // 🔴 ZORUNLU ALAN KONTROLÜ
    if (
      !ucusKodu ||
      !biletId ||
      !havalimaniId ||
      !havayoluId ||
      !ucakId
    ) {
      alert("Tüm alanlar zorunludur!");
      return;
    }

    // 🔴 UÇUŞ KODU FORMAT KONTROLÜ
    const regex = /^[A-Z]{2,3}-?\d{2,4}$/;
    if (!regex.test(ucusKodu)) {
      alert("Uçuş kodu formatı geçersiz! (Örn: TK-101)");
      return;
    }

    // 🔴 UNIQUE UÇUŞ KODU KONTROLÜ
    const ayniKodVarMi = ucuslar.some(
      (u) => u.ucusKodu === ucusKodu
    );
    if (ayniKodVarMi) {
      alert("Bu uçuş kodu zaten mevcut!");
      return;
    }

    // ✅ UÇUŞ EKLEME (BİLET VAROLMA BAĞIMLILIĞI)
    setUcuslar([
      ...ucuslar,
      {
        id: Date.now(),
        ucusKodu,
        biletId: Number(biletId),        // 🔗 FK
        havalimaniId: Number(havalimaniId),
        havayoluId: Number(havayoluId),
        ucakId,
      },
    ]);

    // FORM TEMİZLEME
    setUcusKodu("");
    setBiletId("");
    setHavalimaniId("");
    setHavayoluId("");
    setUcakId("");
  };

  const sil = (id) => {
    if (!window.confirm("Uçuş silinsin mi?")) return;
    setUcuslar(ucuslar.filter((u) => u.id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Uçuş Yönetimi</h2>

        {/* UÇUŞ KODU */}
        <input
          placeholder="Uçuş Kodu (Örn: TK-101)"
          value={ucusKodu}
          onChange={(e) => setUcusKodu(e.target.value.toUpperCase())}
        />

        {/* 🎟️ BİLET (VAROLMA BAĞIMLILIĞI) */}
        <select
          value={biletId}
          onChange={(e) => setBiletId(e.target.value)}
        >
          <option value="">Bilet Seç</option>
          {biletler.map((b) => (
            <option key={b.biletId} value={b.biletId}>
              Bilet No: {b.biletId} | Koltuk: {b.koltukNo}
            </option>
          ))}
        </select>

        {/* HAVALİMANI */}
        <select
          value={havalimaniId}
          onChange={(e) => setHavalimaniId(e.target.value)}
        >
          <option value="">Havalimanı Seç</option>
          {havalimanlari.map((h) => (
            <option key={h.id} value={h.id}>
              {h.ad}
            </option>
          ))}
        </select>

        {/* HAVAYOLU */}
        <select
          value={havayoluId}
          onChange={(e) => setHavayoluId(e.target.value)}
        >
          <option value="">Havayolu Seç</option>
          {havayollari.map((h) => (
            <option key={h.id} value={h.id}>
              {h.ad}
            </option>
          ))}
        </select>

        {/* UÇAK */}
        <select
          value={ucakId}
          onChange={(e) => setUcakId(e.target.value)}
        >
          <option value="">Uçak Seç</option>
          {ucaklar.map((u) => (
            <option key={u.ucakId} value={u.ucakId}>
              {u.model} ({u.ucakId})
            </option>
          ))}
        </select>

        <button className="primary" onClick={ekle}>
          Uçuş Ekle
        </button>
      </div>

      {/* 📋 UÇUŞ LİSTESİ */}
      <div className="card">
        <h3>Uçuş Listesi</h3>

        {ucuslar.length === 0 ? (
          <p>Henüz uçuş eklenmedi.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Uçuş Kodu</th>
                <th>Bilet</th>
                <th>Havalimanı</th>
                <th>Havayolu</th>
                <th>Uçak</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ucuslar.map((u) => {
                const bilet = biletler.find(
                  (b) => b.biletId === u.biletId
                );
                const havalimani = havalimanlari.find(
                  (h) => h.id === u.havalimaniId
                );
                const havayolu = havayollari.find(
                  (h) => h.id === u.havayoluId
                );
                const ucak = ucaklar.find(
                  (x) => x.ucakId === u.ucakId
                );

                return (
                  <tr key={u.id}>
                    <td>{u.ucusKodu}</td>
                    <td>{bilet?.koltukNo}</td>
                    <td>{havalimani?.ad}</td>
                    <td>{havayolu?.ad}</td>
                    <td>{ucak?.model}</td>
                    <td>
                      <button
                        className="danger"
                        onClick={() => sil(u.id)}
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
    </div>
  );
}

export default Ucus;

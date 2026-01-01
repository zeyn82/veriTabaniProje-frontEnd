import { useState } from "react";

function Ucus({ 
  ucuslar, setUcuslar, 
  havalimanlari, havayollari, ucaklar 
}) {
  const [ucusId, setUcusId] = useState("");
  const [kalkis, setKalkis] = useState("");
  const [varis, setVaris] = useState("");
  const [ucakId, setUcakId] = useState("");
  const [havayoluId, setHavayoluId] = useState("");
  const [kalkisYerId, setKalkisYerId] = useState("");
  const [varisYerId, setVarisYerId] = useState("");

  const ekle = () => {
    if (!ucusId || !kalkis || !varis || !ucakId || !havayoluId || !kalkisYerId || !varisYerId) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // Arayüzde anında göstermek için geçici objeyi oluşturuyoruz
    const yeniUcus = {
      ucus_id: ucusId,
      kalkis: kalkis,
      varis: varis,
      
      // İsimleri listeden bulup elle ekliyoruz ki sayfa yenilenmeden görünsün
      havayolu_adi: havayollari.find(h => h.havayolu_id === havayoluId)?.havayolu_adi || havayoluId,
      ucak_model: ucaklar.find(u => u.ucak_id === ucakId)?.model || ucakId,
      kalkis_yeri: havalimanlari.find(h => h.havalimani_id === kalkisYerId)?.havalimani_adi || kalkisYerId,
      varis_yeri: havalimanlari.find(h => h.havalimani_id === varisYerId)?.havalimani_adi || varisYerId
    };

    setUcuslar([...ucuslar, yeniUcus]);
    // Not: Burada ayrıca Backend'e POST isteği atılması gerekir (fetch)

    // Formu temizle
    setUcusId("");
    setKalkis("");
    setVaris("");
    setUcakId("");
    setHavayoluId("");
    setKalkisYerId("");
    setVarisYerId("");
  };

  const sil = (id) => {
    if (!window.confirm("Uçuşu silmek istiyor musun?")) return;
    setUcuslar(ucuslar.filter(u => u.ucus_id !== id));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Uçuş Yönetimi</h2>

        <div className="form-group">
          {/* UÇUŞ ID */}
          <input 
            placeholder="Uçuş ID (Örn: 1001)" 
            type="number"
            value={ucusId} 
            onChange={e => setUcusId(e.target.value)} 
            className="form-group-half"
          />

          {/* HAVAYOLU SEÇİMİ */}
          <select 
            value={havayoluId} 
            onChange={e => setHavayoluId(e.target.value)} 
            className="form-group-half"
          >
            <option value="">Havayolu Seç...</option>
            {havayollari.map(h => (
              <option key={h.havayolu_id} value={h.havayolu_id}>
                {h.havayolu_adi}
              </option>
            ))}
          </select>

          {/* UÇAK SEÇİMİ */}
          <select 
            value={ucakId} 
            onChange={e => setUcakId(e.target.value)} 
            className="form-group-full"
          >
            <option value="">Uçak Seç...</option>
            {ucaklar.map(u => (
              <option key={u.ucak_id} value={u.ucak_id}>
                {u.model} (Kapasite: {u.kapasite})
              </option>
            ))}
          </select>

          {/* KALKIŞ YERİ */}
          <select 
            value={kalkisYerId} 
            onChange={e => setKalkisYerId(e.target.value)} 
            className="form-group-half"
          >
            <option value="">Kalkış Yeri...</option>
            {havalimanlari.map(h => (
              <option key={h.havalimani_id} value={h.havalimani_id}>
                {h.havalimani_adi} ({h.sehir})
              </option>
            ))}
          </select>

          {/* VARIŞ YERİ */}
          <select 
            value={varisYerId} 
            onChange={e => setVarisYerId(e.target.value)} 
            className="form-group-half"
          >
            <option value="">Varış Yeri...</option>
            {havalimanlari.map(h => (
              <option key={h.havalimani_id} value={h.havalimani_id}>
                {h.havalimani_adi} ({h.sehir})
              </option>
            ))}
          </select>

          {/* TARİHLER */}
          <div style={{width: '100%', display:'flex', gap:'10px'}}>
             <div style={{flex:1}}>
                <label style={{fontSize:'0.8rem'}}>Kalkış Zamanı</label>
                <input type="datetime-local" value={kalkis} onChange={e => setKalkis(e.target.value)} />
             </div>
             <div style={{flex:1}}>
                <label style={{fontSize:'0.8rem'}}>Varış Zamanı</label>
                <input type="datetime-local" value={varis} onChange={e => setVaris(e.target.value)} />
             </div>
          </div>

          <button className="primary" onClick={ekle} style={{marginTop:'10px'}}>Ekle</button>
        </div>
      </div>

      <div className="card">
        <h3>Uçuş Listesi</h3>
        
        {ucuslar.length === 0 ? (
           <p>Listelenecek uçuş bulunamadı.</p> 
        ) : (
          <table>
            <thead>
              <tr>
                <th>Uçuş ID</th>
                <th>Havayolu</th>
                <th>Uçak</th>
                <th>Kalkış Yeri</th>
                <th>Varış Yeri</th>
                <th>Saatler</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ucuslar.map(u => (
                <tr key={u.ucus_id}>
                  <td><strong>{u.ucus_id}</strong></td>
                  
                  {/* Backend'den gelen isimlendirilmiş veriler */}
                  <td>{u.havayolu_adi || u.havayolu_id}</td> 
                  <td>{u.ucak_model || u.ucak_id}</td> 
                  
                  {/* Kalkış ve Varış yerleri */}
                  <td>{u.kalkis_yeri || u.kalkishavalimani_id}</td>
                  <td>{u.varis_yeri || u.varishavalimani_id}</td>
                  
                  {/* Tarih formatlama */}
                  <td style={{fontSize:'0.85rem'}}>
                    K: {new Date(u.kalkis).toLocaleString('tr-TR')} <br/>
                    V: {new Date(u.varis).toLocaleString('tr-TR')}
                  </td>
                  
                  <td>
                    <button className="danger" onClick={() => sil(u.ucus_id)}>
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Ucus;
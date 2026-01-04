import { useState } from "react";
import { motion } from "framer-motion";

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
  
  // 🔥 Düzenleme Modu
  const [duzenlenenId, setDuzenlenenId] = useState(null);

  const kaydet = async () => {
    if (!ucusId || !kalkis || !varis || !ucakId || !havayoluId || !kalkisYerId || !varisYerId) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      let response;
      const veriPaketi = {
        ucus_id: ucusId, kalkis, varis, ucak_id: ucakId, havayolu_id: havayoluId,
        kalkishavalimani_id: kalkisYerId, varishavalimani_id: varisYerId
      };

      if (duzenlenenId) {
        // 🔄 GÜNCELLEME (PUT)
        response = await fetch(`http://localhost:3000/api/ucus/${duzenlenenId}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(veriPaketi)
        });
      } else {
        // ➕ EKLEME (POST)
        response = await fetch("http://localhost:3000/api/ucus", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(veriPaketi)
        });
      }

      if (response.ok) {
        const veri = await response.json();
        
        // İsimleri eşleştir (Frontend'de göstermek için)
        const zenginVeri = {
          ...veri,
          havayolu_adi: havayollari.find(h => h.havayolu_id == havayoluId)?.havayolu_adi,
          ucak_model: ucaklar.find(u => u.ucak_id == ucakId)?.model,
          kalkis_yeri: havalimanlari.find(h => h.havalimani_id == kalkisYerId)?.havalimani_adi,
          varis_yeri: havalimanlari.find(h => h.havalimani_id == varisYerId)?.havalimani_adi
        };

        if (duzenlenenId) {
          setUcuslar(ucuslar.map(u => u.ucus_id === duzenlenenId ? zenginVeri : u));
          alert("✅ Uçuş Güncellendi!");
        } else {
          setUcuslar([...ucuslar, zenginVeri]);
          alert("✅ Uçuş Kaydedildi!");
        }

        // Temizlik
        setUcusId(""); setKalkis(""); setVaris(""); setUcakId(""); 
        setHavayoluId(""); setKalkisYerId(""); setVarisYerId(""); setDuzenlenenId(null);
      } else {
        alert("❌ İşlem başarısız.");
      }
    } catch (error) { console.error(error); alert("Hata oluştu."); }
  };

  const duzenle = (u) => {
    setDuzenlenenId(u.ucus_id);
    setUcusId(u.ucus_id);
    setUcakId(u.ucak_id);
    setHavayoluId(u.havayolu_id);
    setKalkisYerId(u.kalkishavalimani_id);
    setVarisYerId(u.varishavalimani_id);
    
    // Tarih formatını input'a uygun hale getir (YYYY-MM-DDTHH:MM)
    const formatTarih = (tarih) => new Date(tarih).toISOString().slice(0, 16);
    setKalkis(formatTarih(u.kalkis));
    setVaris(formatTarih(u.varis));
  };

  const sil = async (id) => {
    if (!window.confirm("Silinsin mi?")) return;
    try {
      await fetch(`http://localhost:3000/api/ucus/${id}`, { method: "DELETE" });
      setUcuslar(ucuslar.filter(u => u.ucus_id !== id));
    } catch (e) { console.error(e); }
  };

  return (
    <motion.div className="page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="card">
        <h2>Uçuş Yönetimi</h2>
        <div className="form-group">
          <input disabled={duzenlenenId !== null} placeholder="Uçuş ID" type="number" value={ucusId} onChange={(e) => setUcusId(e.target.value)} className="form-group-half" />
          <select value={havayoluId} onChange={(e) => setHavayoluId(e.target.value)} className="form-group-half">
            <option value="">Havayolu Seç...</option>
            {havayollari.map(h => (<option key={h.havayolu_id} value={h.havayolu_id}>{h.havayolu_adi}</option>))}
          </select>
          <select value={ucakId} onChange={(e) => setUcakId(e.target.value)} className="form-group-full">
            <option value="">Uçak Seç...</option>
            {ucaklar.map(u => (<option key={u.ucak_id} value={u.ucak_id}>{u.model} ({u.kapasite})</option>))}
          </select>
          <select value={kalkisYerId} onChange={(e) => setKalkisYerId(e.target.value)} className="form-group-half">
            <option value="">Kalkış Yeri...</option>
            {havalimanlari.map(h => (<option key={h.havalimani_id} value={h.havalimani_id}>{h.havalimani_adi}</option>))}
          </select>
          <select value={varisYerId} onChange={(e) => setVarisYerId(e.target.value)} className="form-group-half">
            <option value="">Varış Yeri...</option>
            {havalimanlari.map(h => (<option key={h.havalimani_id} value={h.havalimani_id}>{h.havalimani_adi}</option>))}
          </select>
          <div style={{width: '100%', display:'flex', gap:'10px'}}>
             <div style={{flex:1}}><label style={{fontSize:'0.8rem'}}>Kalkış</label><input type="datetime-local" value={kalkis} onChange={e => setKalkis(e.target.value)} /></div>
             <div style={{flex:1}}><label style={{fontSize:'0.8rem'}}>Varış</label><input type="datetime-local" value={varis} onChange={e => setVaris(e.target.value)} /></div>
          </div>
          
          <button className="primary" onClick={kaydet}>{duzenlenenId ? "Güncelle" : "Kaydet"}</button>
          {duzenlenenId && <button onClick={() => { setDuzenlenenId(null); setUcusId(""); setKalkis(""); setVaris(""); setUcakId(""); setHavayoluId(""); setKalkisYerId(""); setVarisYerId(""); }}>İptal</button>}
        </div>
      </div>

      <div className="card">
        <h3>Uçuş Listesi</h3>
        <table>
          <thead><tr><th>ID</th><th>Havayolu</th><th>Uçak</th><th>Kalkış</th><th>Varış</th><th>Saatler</th><th>İşlem</th></tr></thead>
          <tbody>
            {ucuslar.map(u => (
              <tr key={u.ucus_id}>
                <td><strong>{u.ucus_id}</strong></td>
                <td>{u.havayolu_adi || u.havayolu_id}</td> 
                <td>{u.ucak_model || u.ucak_id}</td> 
                <td>{u.kalkis_yeri || u.kalkishavalimani_id}</td>
                <td>{u.varis_yeri || u.varishavalimani_id}</td>
                <td style={{fontSize:'0.85rem'}}>
                  K: {new Date(u.kalkis).toLocaleString('tr-TR')} <br/>
                  V: {new Date(u.varis).toLocaleString('tr-TR')}
                </td>
                <td>
                  <button onClick={() => duzenle(u)}>Düzenle</button>
                  <button className="danger" onClick={() => sil(u.ucus_id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
export default Ucus;
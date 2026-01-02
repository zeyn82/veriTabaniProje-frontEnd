import { useState } from "react";
import { motion } from "framer-motion";

function Pilot({ personeller }) {
  // Backend'den gelen 'rol' bilgisine göre filtreleme yapıyoruz.
  // Not: Backend'de JOIN işlemi yaptığımız için artık p.rol verisi geliyor.
  const pilotlar = personeller.filter(p => p.rol === "Pilot");

  return (
    <motion.div 
      className="page"
      /* ✨ ANİMASYON AYARLARI ✨ */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card">
        <h2>Pilot Listesi</h2>

        {pilotlar.length === 0 ? (
          <p>Sistemde kayıtlı pilot bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Soyad</th>
              </tr>
            </thead>
            <tbody>
              {pilotlar.map(p => (
                <tr key={p.personel_id}>
                  <td>{p.personel_id}</td>
                  
                  {/* Veritabanı sütun isimleri */}
                  <td>{p.personel_ad}</td> 
                  <td>{p.personel_soyad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}

export default Pilot;
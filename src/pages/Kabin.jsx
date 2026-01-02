import { useState } from "react";
import { motion } from "framer-motion";

function Kabin({ personeller }) {
  // Backend'den gelen 'rol' verisine göre filtreleme yapıyoruz.
  const kabinler = personeller.filter(p => p.rol === "Kabin");

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
        <h2>Kabin Görevlileri</h2>

        {kabinler.length === 0 ? (
          <p>Kayıtlı kabin görevlisi bulunamadı.</p>
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
              {kabinler.map(k => (
                <tr key={k.personel_id}>
                  <td>{k.personel_id}</td>
                  
                  {/* Veritabanı sütun isimleri */}
                  <td>{k.personel_ad}</td>
                  <td>{k.personel_soyad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}

export default Kabin;
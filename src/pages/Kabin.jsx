import { useState } from "react";

function Kabin({ personeller }) {
  // Backend'den gelen 'rol' verisine göre filtreleme yapıyoruz.
  // (Backend'deki JOIN işlemi sayesinde artık p.rol bilgisi geliyor)
  const kabinler = personeller.filter(p => p.rol === "Kabin");

  return (
    <div className="page">
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
                  
                  {/* 🔴 DÜZELTME: Veritabanı sütun isimlerini kullandık */}
                  <td>{k.personel_ad}</td>    {/* k.ad yerine */}
                  <td>{k.personel_soyad}</td> {/* k.soyad yerine */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Kabin;
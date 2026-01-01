import { useState } from "react";

function Pilot({ personeller }) {
  // Backend'den gelen 'rol' bilgisine göre filtreleme yapıyoruz.
  // Not: Backend'de JOIN işlemi yaptığımız için artık p.rol verisi geliyor.
  const pilotlar = personeller.filter(p => p.rol === "Pilot");

  return (
    <div className="page">
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
                  
                  {/* 🔴 DÜZELTME: Veritabanı sütun isimlerini kullandık */}
                  <td>{p.personel_ad}</td>   {/* p.ad yerine */}
                  <td>{p.personel_soyad}</td> {/* p.soyad yerine */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Pilot;
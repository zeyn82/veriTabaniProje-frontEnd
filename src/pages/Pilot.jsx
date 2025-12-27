function Pilot({ personeller }) {
  const pilotlar = personeller.filter(p => p.rol === "Pilot");

  return (
    <div className="page">
      <div className="card">
        <h2>Pilot Listesi</h2>

        {pilotlar.length === 0 ? (
          <p>Henüz pilot atanmadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Personel ID</th>
                <th>Ad</th>
                <th>Soyad</th>
              </tr>
            </thead>
            <tbody>
              {pilotlar.map((p) => (
                <tr key={p.personelId}>
                  <td>{p.personelId}</td>
                  <td>{p.ad}</td>
                  <td>{p.soyad}</td>
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

function Pilot({ personeller }) {
  const pilotlar = personeller.filter(p => p.rol === "Pilot");

  return (
    <div className="page">
      <div className="card">
        <h2>Pilot Listesi</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Ad</th><th>Soyad</th>
            </tr>
          </thead>
          <tbody>
            {pilotlar.map(p => (
              <tr key={p.personel_id}>
                <td>{p.personel_id}</td>
                <td>{p.ad}</td>
                <td>{p.soyad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pilot;

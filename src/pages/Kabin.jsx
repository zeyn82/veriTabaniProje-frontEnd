function Kabin({ personeller }) {
  const kabinGorevlileri = personeller.filter(
    p => p.rol === "Kabin"
  );

  return (
    <div className="page">
      <div className="card">
        <h2>Kabin Görevlileri</h2>

        {kabinGorevlileri.length === 0 ? (
          <p>Henüz kabin görevlisi atanmadı.</p>
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
              {kabinGorevlileri.map((k) => (
                <tr key={k.personelId}>
                  <td>{k.personelId}</td>
                  <td>{k.ad}</td>
                  <td>{k.soyad}</td>
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

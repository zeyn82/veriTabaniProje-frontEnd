function Kabin({ personeller }) {
  const kabinler = personeller.filter(p => p.rol === "Kabin");

  return (
    <div className="page">
      <div className="card">
        <h2>Kabin Görevlileri</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Ad</th><th>Soyad</th>
            </tr>
          </thead>
          <tbody>
            {kabinler.map(k => (
              <tr key={k.personel_id}>
                <td>{k.personel_id}</td>
                <td>{k.ad}</td>
                <td>{k.soyad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Kabin;

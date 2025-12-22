function AnaSayfa() {
  return (
    <div className="page home-page">
      <div className="home-overlay" />

      <div className="card home-card">
        <h1>Havalimanı Yönetim Sistemi</h1>
        <p>
          Bu panel üzerinden yolcuları, uçuşları ve personel işlemlerini
          profesyonel şekilde yönetebilirsiniz.
        </p>
      </div>

      <div className="card home-card">
        <h3>Sistem Özellikleri</h3>
        <ul>
          <li>✔ Yolcu kayıt ve yönetimi</li>
          <li>✔ Uçuş oluşturma ve listeleme</li>
          <li>✔ Uçak ve personel yönetimi</li>
          <li>✔ Modern arayüz & Dark Mode</li>
        </ul>
      </div>
    </div>
  );
}

export default AnaSayfa;


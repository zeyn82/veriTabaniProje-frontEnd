function Anasayfa() {
  return (
    <div className="page">
      <div className="card">
        <h1>Havalimanı Yönetim Sistemi</h1>
        <p>
          Bu panel üzerinden yolcuları, uçuşları ve bilet işlemlerini
          profesyonel şekilde yönetebilirsiniz.
        </p>
      </div>

      <div className="card">
        <h3>Sistem Özellikleri</h3>
        <ul>
          <li>✔ Yolcu kayıt ve yönetimi</li>
          <li>✔ Uçuş oluşturma ve listeleme</li>
          <li>✔ Bilet satış işlemleri</li>
          <li>✔ Master–Detail ilişkileri</li>
        </ul>
      </div>
    </div>
  );
}

export default Anasayfa;
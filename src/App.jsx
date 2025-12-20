import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AnaSayfa from "./pages/AnaSayfa";
import Havalimani from "./pages/Havalimani";
import Ucus from "./pages/Ucus";
import Yolcu from "./pages/Yolcu";
import Ucak from "./pages/Ucak";
import Pilot from "./pages/Pilot";
import Kabin from "./pages/Kabin";




function App() {
  const [havalimanlari, setHavalimanlari] = useState([
    { id: 1, ad: "İstanbul Havalimanı" },
    { id: 2, ad: "Ankara Esenboğa" },
  ]);

  const [personeller, setPersoneller] = useState([
  { id: 1, adSoyad: "Ali Yılmaz" },
  { id: 2, adSoyad: "Ayşe Demir" },
  { id: 3, adSoyad: "Mehmet Kaya" },
]);


  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Ana Sayfa</Link> |{" "}
        <Link to="/havalimani">Havalimanı</Link> |{" "}
        <Link to="/ucus">Uçuş</Link> |{" "}
        <Link to="/yolcu">Yolcu</Link>
         | <Link to="/ucak">Uçak</Link>
          | <Link to="/pilot">Pilot</Link>
           | <Link to="/kabin">Kabin</Link>


         

      </nav>

      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route
          path="/havalimani"
          element={
            <Havalimani
              havalimanlari={havalimanlari}
              setHavalimanlari={setHavalimanlari}
            />
          }
        />
        <Route
          path="/ucus"
          element={<Ucus havalimanlari={havalimanlari} />}
        />
        <Route path="/yolcu" element={<Yolcu />} />
        <Route path="/ucak" element={<Ucak />} />
        <Route
  path="/pilot"
  element={<Pilot personeller={personeller} />}
/>
<Route
  path="/kabin"
  element={<Kabin personeller={personeller} />}
/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
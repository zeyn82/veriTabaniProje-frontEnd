import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AnaSayfa from "./pages/AnaSayfa";
import Havalimani from "./pages/Havalimani";
import Ucus from "./pages/Ucus";
import Yolcu from "./pages/Yolcu";

function App() {
  const [havalimanlari, setHavalimanlari] = useState([
    { id: 1, ad: "İstanbul Havalimanı" },
    { id: 2, ad: "Ankara Esenboğa" },
  ]);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Ana Sayfa</Link> |{" "}
        <Link to="/havalimani">Havalimanı</Link> |{" "}
        <Link to="/ucus">Uçuş</Link> |{" "}
        <Link to="/yolcu">Yolcu</Link>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
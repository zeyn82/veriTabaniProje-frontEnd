import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import AnaSayfa from "./pages/AnaSayfa";
import Havalimani from "./pages/Havalimani";
import Havayolu from "./pages/Havayolu";
import Ucus from "./pages/Ucus";
import Yolcu from "./pages/Yolcu";
import Ucak from "./pages/Ucak";
import Personel from "./pages/Personel";
import Pilot from "./pages/Pilot";
import Kabin from "./pages/Kabin";
import Bagaj from "./pages/Bagaj";
import Bilet from "./pages/Bilet";

import { motion, AnimatePresence } from "framer-motion";

/* 🔹 SAYFA BAŞLIĞI */
function SayfaBasligi() {
  const location = useLocation();

  const basliklar = {
    "/": "Ana Sayfa",
    "/havalimani": "Havalimanı",
    "/havayolu": "Havayolu",
    "/ucus": "Uçuş",
    "/yolcu": "Yolcu",
    "/bilet": "Bilet",
    "/bagaj": "Bagaj",
    "/ucak": "Uçak",
    "/personel": "Personel",
    "/pilot": "Pilot",
    "/kabin": "Kabin",
  };

  return (
    <motion.h2
      key={location.pathname}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        margin: 0,
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "var(--text-color)",
      }}
    >
      {basliklar[location.pathname] || "Veri Tabanı Projesi"}
    </motion.h2>
  );
}

function App() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [dark, setDark] = useState(false);

  /* 🌙 DARK MODE */
  useEffect(() => {
    if (dark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [dark]);

  /* STATE’LER */
  const [havalimanlari, setHavalimanlari] = useState([]);
  const [havayollari, setHavayollari] = useState([]);
  const [ucaklar, setUcaklar] = useState([]);
  const [yolcular, setYolcular] = useState([]);
  const [biletler, setBiletler] = useState([]);
  const [ucuslar, setUcuslar] = useState([]);   // 🔑 BİLET İÇİN GEREKLİ
  const [bagajlar, setBagajlar] = useState([]);
  const [personeller, setPersoneller] = useState([]);

  /* 🔗 MENÜ */
  const linkler = [
    { path: "/", label: "Ana Sayfa" },
    { path: "/havalimani", label: "Havalimanı" },
    { path: "/havayolu", label: "Havayolu" },
    { path: "/yolcu", label: "Yolcu" },
    { path: "/bilet", label: "Bilet" },
    { path: "/ucus", label: "Uçuş" },
    { path: "/bagaj", label: "Bagaj" },
    { path: "/ucak", label: "Uçak" },
    { path: "/personel", label: "Personel" },
    { path: "/pilot", label: "Pilot" },
    { path: "/kabin", label: "Kabin" },
  ];

  return (
    <BrowserRouter>
      {/* 🔹 NAVBAR */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          backgroundColor: "var(--nav-bg)",
          borderBottom: "1px solid var(--nav-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setMenuAcik(true)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "var(--text-color)",
          }}
        >
          ☰
        </button>

        <SayfaBasligi />

        <div
          className="toggle-switch"
          onClick={() => setDark(!dark)}
        >
          <div className="toggle-circle" />
        </div>
      </nav>

      {/* 🔹 MENÜ */}
      <AnimatePresence>
        {menuAcik && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuAcik(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "black",
                zIndex: 99,
              }}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "250px",
                height: "100%",
                backgroundColor: "var(--menu-bg)",
                zIndex: 100,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={() => setMenuAcik(false)}
                style={{
                  alignSelf: "flex-end",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                }}
              >
                ✕
              </button>

              {linkler.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuAcik(false)}
                  className="menu-link"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔹 SAYFALAR */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<AnaSayfa />} />

          <Route path="/havalimani" element={<Havalimani havalimanlari={havalimanlari} setHavalimanlari={setHavalimanlari} />} />
          <Route path="/havayolu" element={<Havayolu havayollari={havayollari} setHavayollari={setHavayollari} />} />
          <Route path="/yolcu" element={<Yolcu yolcular={yolcular} setYolcular={setYolcular} />} />

          {/* 🔥 BİLET → UÇUŞ BAĞLANTISI TAM */}
          <Route
            path="/bilet"
            element={
              <Bilet
                yolcular={yolcular}
                ucuslar={ucuslar}        // ✅ KRİTİK DÜZELTME
                biletler={biletler}
                setBiletler={setBiletler}
              />
            }
          />

          <Route
            path="/ucus"
            element={
              <Ucus
                havalimanlari={havalimanlari}
                havayollari={havayollari}
                ucaklar={ucaklar}
                biletler={biletler}
                ucuslar={ucuslar}
                setUcuslar={setUcuslar}
              />
            }
          />

          <Route path="/bagaj" element={<Bagaj yolcular={yolcular} bagajlar={bagajlar} setBagajlar={setBagajlar} />} />
          <Route path="/ucak" element={<Ucak />} />
          <Route path="/personel" element={<Personel personeller={personeller} setPersoneller={setPersoneller} />} />
          <Route path="/pilot" element={<Pilot personeller={personeller} />} />
          <Route path="/kabin" element={<Kabin personeller={personeller} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

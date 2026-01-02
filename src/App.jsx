import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate
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

/* 🔹 SAYFA BAŞLIĞI BİLEŞENİ */
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
  const [girisYapildi, setGirisYapildi] = useState(false);

  // 🔥🔥🔥 DÜZELTME BAŞLANGICI: LOCALSTORAGE KULLANIMI 🔥🔥🔥
  
  // 1. Başlangıç değerini Tarayıcı Hafızasından okuyoruz
  const [dark, setDark] = useState(() => {
    const kayitliTema = localStorage.getItem("tema");
    return kayitliTema === "koyu"; // Eğer 'koyu' kayıtlıysa true döner
  });

  /* 🌙 DARK MODE AYARI VE KAYDI */
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("tema", "koyu"); // Hafızaya yaz
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("tema", "acik"); // Hafızaya yaz
    }
  }, [dark]);

  // 🔥🔥🔥 DÜZELTME BİTİŞİ 🔥🔥🔥

  /* 📦 STATE’LER */
  const [havalimanlari, setHavalimanlari] = useState([]);
  const [havayollari, setHavayollari] = useState([]);
  const [ucaklar, setUcaklar] = useState([]);
  const [yolcular, setYolcular] = useState([]);
  const [biletler, setBiletler] = useState([]);
  const [ucuslar, setUcuslar] = useState([]);
  const [bagajlar, setBagajlar] = useState([]);
  const [personeller, setPersoneller] = useState([]);

  /* 🔥 VERİ ÇEKME */
  useEffect(() => {
    const verileriGetir = async () => {
      try {
        console.log("📡 Tüm veriler Backend'den isteniyor...");
        const yolcuCevap = await fetch("http://localhost:3000/api/yolcu");
        if (yolcuCevap.ok) setYolcular(await yolcuCevap.json());

        const ucusCevap = await fetch("http://localhost:3000/api/ucus");
        if (ucusCevap.ok) setUcuslar(await ucusCevap.json());

        const biletCevap = await fetch("http://localhost:3000/api/bilet");
        if (biletCevap.ok) setBiletler(await biletCevap.json());

        const havalimaniCevap = await fetch("http://localhost:3000/api/havalimani");
        if (havalimaniCevap.ok) setHavalimanlari(await havalimaniCevap.json());

        const havayoluCevap = await fetch("http://localhost:3000/api/havayolu");
        if (havayoluCevap.ok) setHavayollari(await havayoluCevap.json());

        const ucakCevap = await fetch("http://localhost:3000/api/ucak");
        if (ucakCevap.ok) setUcaklar(await ucakCevap.json());

        const personelCevap = await fetch("http://localhost:3000/api/personel");
        if (personelCevap.ok) setPersoneller(await personelCevap.json());
        
        const bagajCevap = await fetch("http://localhost:3000/api/bagaj");
        if (bagajCevap.ok) setBagajlar(await bagajCevap.json());

      } catch (error) {
        console.error("❌ Veri çekme hatası:", error);
      }
    };
    verileriGetir();
  }, []); 

  /* 🔗 MENÜ LİNKLERİ */
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

  const cikisYap = () => {
    if (window.confirm("Hesaptan çıkış yapmak istiyor musunuz?")) {
      setGirisYapildi(false);
      // Not: window.location.href tüm sayfayı yenilediği için localStorage kullanmazsak state sıfırlanır.
      // Artık localStorage kullandığımız için renk tercihi kalıcı olur.
      window.location.href = "/"; 
    }
  };

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
        {/* 🔥 GÜVENLİK 1: Giriş yapılmadıysa Menü Butonu GİZLENİR */}
        {girisYapildi ? (
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
        ) : (
          <div style={{ width: '24px' }}></div> 
        )}

        <SayfaBasligi />

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {girisYapildi && (
            <button 
              className="danger" 
              onClick={cikisYap}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Çıkış
            </button>
          )}

          <div
            className="toggle-switch"
            onClick={() => setDark(!dark)}
          >
            <div className="toggle-circle" />
          </div>
        </div>
      </nav>

      {/* 🔹 MENÜ (Animasyonlu) */}
      <AnimatePresence>
        {menuAcik && girisYapildi && (
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

      {/* 🔹 SAYFALAR VE ROTALAR */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <AnaSayfa 
                girisYapildi={girisYapildi} 
                setGirisYapildi={setGirisYapildi} 
              />
            } 
          />

          <Route path="/havalimani" element={girisYapildi ? <Havalimani havalimanlari={havalimanlari} setHavalimanlari={setHavalimanlari} /> : <Navigate to="/" />} />
          <Route path="/havayolu" element={girisYapildi ? <Havayolu havayollari={havayollari} setHavayollari={setHavayollari} /> : <Navigate to="/" />} />
          <Route path="/yolcu" element={girisYapildi ? <Yolcu yolcular={yolcular} setYolcular={setYolcular} /> : <Navigate to="/" />} />

          <Route
            path="/bilet"
            element={
              girisYapildi ? (
                <Bilet
                  yolcular={yolcular}
                  ucuslar={ucuslar}
                  biletler={biletler}
                  setBiletler={setBiletler}
                />
              ) : <Navigate to="/" />
            }
          />

          <Route
            path="/ucus"
            element={
              girisYapildi ? (
                <Ucus
                  havalimanlari={havalimanlari}
                  havayollari={havayollari}
                  ucaklar={ucaklar}
                  biletler={biletler}
                  ucuslar={ucuslar}
                  setUcuslar={setUcuslar}
                />
              ) : <Navigate to="/" />
            }
          />

          <Route path="/bagaj" element={girisYapildi ? <Bagaj yolcular={yolcular} bagajlar={bagajlar} setBagajlar={setBagajlar} /> : <Navigate to="/" />} />
          
          <Route 
             path="/ucak" 
             element={
                girisYapildi ? (
                  <Ucak 
                     ucaklar={ucaklar} 
                     setUcaklar={setUcaklar} 
                     havayollari={havayollari} 
                  />
                ) : <Navigate to="/" />
             } 
          />

          <Route path="/personel" element={girisYapildi ? <Personel personeller={personeller} setPersoneller={setPersoneller} /> : <Navigate to="/" />} />
          <Route path="/pilot" element={girisYapildi ? <Pilot personeller={personeller} /> : <Navigate to="/" />} />
          <Route path="/kabin" element={girisYapildi ? <Kabin personeller={personeller} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
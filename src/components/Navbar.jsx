import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>Ana Sayfa</NavLink>
      <NavLink to="/havalimani">Havalimanı</NavLink>
      <NavLink to="/ucus">Uçuş</NavLink>
      <NavLink to="/yolcu">Yolcu</NavLink>
    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Ana Sayfa</Link> |{" "}
      <Link to="/havalimani">Havalimanı</Link> |{" "}
      <Link to="/ucus">Uçuş</Link> |{" "}
      <Link to="/yolcu">Yolcu</Link>
    </nav>
  );
}

export default Navbar;

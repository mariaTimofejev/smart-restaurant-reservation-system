import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/reserve">Broneeri</Link>
      <Link to="/my-reservations">Minu broneeringud</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
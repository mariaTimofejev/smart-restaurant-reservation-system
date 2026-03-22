import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">Avaleht</Link>
      <Link to="/reservations">Minu broneeringud</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
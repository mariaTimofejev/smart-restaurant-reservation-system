import { useEffect, useState } from "react";
import { getReservations, getTables } from "../services/api";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getReservations().then(res => setReservations(res.data));
    getTables().then(res => setTables(res.data));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayCount = reservations.filter(r => r.date === today).length;

  const weekCount = reservations.filter(r => {
    const d = new Date(r.date);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0;
  }).length;

  const reservedTables = new Set(reservations.map(r => r.table.id)).size;
  const freeTables = tables.length - reservedTables;

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <StatBox label="Broneeringuid täna" value={todayCount} />
        <StatBox label="Broneeringuid sel nädalal" value={weekCount} />
        <StatBox label="Vabad lauad" value={freeTables} />
        <StatBox label="Broneeritud lauad" value={reservedTables} />
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        width: "200px",
        textAlign: "center"
      }}
    >
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}
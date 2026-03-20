import { useEffect, useState } from "react";
import { getReservations, deleteReservation } from "../services/api";

export default function AdminReservationList() {
  const [reservations, setReservations] = useState([]);

  const loadData = () => {
    getReservations().then(res => setReservations(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Kas soovid selle broneeringu kustutada?")) return;

    await deleteReservation(id);
    loadData(); // värskenda nimekirja
  };

  if (reservations.length === 0) {
    return <p>Broneeringuid pole veel.</p>;
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Adminpaneel – Broneeringute haldus</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={cell}>ID</th>
            <th style={cell}>Laua ID</th>
            <th style={cell}>Kuupäev</th>
            <th style={cell}>Kellaaeg</th>
            <th style={cell}>Kliendi nimi</th>
            <th style={cell}>Inimeste arv</th>
            <th style={cell}>Tegevused</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td style={cell}>{r.id}</td>
              <td style={cell}>{r.table.id}</td>
              <td style={cell}>{r.date}</td>
              <td style={cell}>{r.time}</td>
              <td style={cell}>{r.customerName}</td>
              <td style={cell}>{r.peopleCount}</td>
              <td style={cell}>
                <button
                  onClick={() => handleDelete(r.id)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Kustuta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cell = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left"
};
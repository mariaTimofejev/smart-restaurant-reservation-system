import { useEffect, useState } from "react";
import { getReservations } from "../services/api";

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations().then(res => setReservations(res.data));
  }, []);

  if (reservations.length === 0) {
    return <p>Broneeringuid pole veel.</p>;
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Broneeringute nimekiri</h2>

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
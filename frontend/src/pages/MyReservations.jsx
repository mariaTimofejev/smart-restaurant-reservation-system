import { useEffect, useState } from "react";
import "./MyReservations.css";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then(res => res.json())
      .then(setReservations)
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <h1>Minu broneeringud</h1>

      {reservations.length === 0 && (
        <p>Teil pole veel ühtegi broneeringut.</p>
      )}

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Laud</th>
            <th>Kuupäev</th>
            <th>Kellaaeg</th>
            <th>Kliendi nimi</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.table?.id}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
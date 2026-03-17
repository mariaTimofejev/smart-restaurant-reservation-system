import { useEffect, useState } from "react";

export default function ReservationPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then(res => res.json())
      .then(data => setReservations(data));
  }, []);

  return (
    <div>
      <h2>Broneeringud</h2>
      <ul>
        {reservations.map(r => (
          <li key={r.id}>
            Laud #{r.tableId} — {r.date} {r.startTime}–{r.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
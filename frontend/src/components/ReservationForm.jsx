import { useState, useEffect } from "react";
import axios from "axios";

export default function ReservationForm({ preselectedTableId, date, time, onRefresh }) {
  const [customerName, setCustomerName] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    if (preselectedTableId) {
      setTableId(preselectedTableId);
    }
  }, [preselectedTableId]);

  async function submitReservation() {
    try {
      await axios.post("http://localhost:8080/api/reservations", {
        tableId,
        date,
        time,
        customerName,
        partySize
      });

      alert("Broneering tehtud!");

      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Reservation failed:", err);
      alert("Broneering ebaõnnestus");
    }
  }

  return (
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2>Tee broneering</h2>

      <div>Laud: <input value={tableId} readOnly /></div>
      <div>Kuupäev: <input value={date} readOnly /></div>
      <div>Kellaaeg: <input value={time} readOnly /></div>

      <div>
        Kliendi nimi:
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div>
        Inimeste arv:
        <select value={partySize} onChange={(e) => setPartySize(e.target.value)}>
          {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
        </select>
      </div>

      <button onClick={submitReservation}>Tee broneering</button>
    </div>
  );
}
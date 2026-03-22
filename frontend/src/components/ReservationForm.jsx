import { useState, useEffect } from "react";

export default function ReservationForm({ preselectedTableId, date, time, onRefresh }) {
  const [customerName, setCustomerName] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [tableId, setTableId] = useState("");

  // Kui kasutaja klikib lauda, täidame vormi automaatselt
  useEffect(() => {
    if (preselectedTableId) {
      setTableId(preselectedTableId);
    }
  }, [preselectedTableId]);

  async function submitReservation() {
    await fetch("http://localhost:8080/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableId,
        date,
        time,
        customerName,
        partySize,
      }),
    });

    alert("Broneering tehtud!");

    if (onRefresh) onRefresh();
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Tee broneering</h2>

      <div>Laud: <input value={tableId} readOnly /></div>
      <div>Kuupäev: <input value={date} readOnly /></div>
      <div>Kellaaeg: <input value={time} readOnly /></div>

      <div>
        Kliendi nimi:
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
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
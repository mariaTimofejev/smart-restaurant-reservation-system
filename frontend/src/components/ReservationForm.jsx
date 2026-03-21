import { useState, useEffect } from "react";

export default function ReservationForm({ preselectedTableId }) {
  const [tableId, setTableId] = useState(preselectedTableId || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);

  useEffect(() => {
    if (preselectedTableId) {
      setTableId(preselectedTableId);
    }
  }, [preselectedTableId]);


  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      tableId: Number(tableId),
      date,
      time,
      customerName,
      peopleCount: Number(peopleCount)
    };

    try {
      const response = await fetch("http://localhost:8080/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Broneering ebaõnnestus: " + errorText);
        return;
      }

      const data = await response.json();
      alert("Broneering õnnestus! Broneeringu ID: " + data.id);

    } catch (err) {
      alert("Võrguviga: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Tee broneering</h2>

      <label>Laud (ID):</label>
      <input
        type="number"
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
        required
      />

      <label>Kuupäev:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label>Kellaaeg:</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <label>Kliendi nimi:</label>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />

      <label>Inimeste arv:</label>
      <input
        type="number"
        min="1"
        value={peopleCount}
        onChange={(e) => setPeopleCount(e.target.value)}
        required
      />

      <button type="submit" style={{ marginTop: 10 }}>
        Tee broneering
      </button>
    </form>
  );
}
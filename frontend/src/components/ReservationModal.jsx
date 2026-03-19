import { useState } from "react";
import axios from "axios";

export default function ReservationModal({ table, onClose, onSuccess }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");

  const submit = async () => {
    try {
      await axios.post("http://localhost:8080/reservations", {
        tableId: table.id,
        date,
        time,
        customerName: name
      });

      onSuccess(); // värskendab saaliplaani
      onClose();   // sulgeb modal'i
    } catch (err) {
      alert("See laud on sellel ajal juba broneeritud.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 8,
          width: 300
        }}
      >
        <h2>Broneeri laud #{table.id}</h2>

        <label>Kuupäev</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Kellaaeg</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Nimi</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kliendi nimi"
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button
          onClick={submit}
          style={{
            width: "100%",
            padding: 10,
            background: "green",
            color: "white",
            border: "none",
            borderRadius: 4,
            marginBottom: 10
          }}
        >
          Kinnita broneering
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: 10,
            background: "gray",
            color: "white",
            border: "none",
            borderRadius: 4
          }}
        >
          Sulge
        </button>
      </div>
    </div>
  );
}
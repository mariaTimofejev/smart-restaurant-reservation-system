import { useEffect, useState } from "react";
import { getReservations, deleteReservation, updateReservation } from "../services/api";

export default function AdminReservationList() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null); 
  const [viewing, setViewing] = useState(null); 

  const loadData = () => {
    getReservations().then(res => setReservations(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Kas soovid selle broneeringu kustutada?")) return;
    await deleteReservation(id);
    loadData();
  };

  const handleEditSave = async () => {
    await updateReservation(editing.id, editing);
    setEditing(null);
    loadData();
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Adminpaneel – Broneeringute haldus</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
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
                  onClick={() => setEditing({ ...r, tableId: r.table.id })}
                  style={btnEdit}
                >
                  Muuda
                </button>

                <button
                  onClick={() => handleDelete(r.id)}
                  style={btnDelete}
                >
                  Kustuta
                </button>

                <button
                  onClick={() => setViewing(r)}
                  style={btnView}
                >
                  Vaata
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Muuda broneeringut #{editing.id}</h3>

            <label>Kuupäev:</label>
            <input
              type="date"
              value={editing.date}
              onChange={(e) => setEditing({ ...editing, date: e.target.value })}
            />

            <label>Kellaaeg:</label>
            <input
              type="time"
              value={editing.time}
              onChange={(e) => setEditing({ ...editing, time: e.target.value })}
            />

            <label>Laud:</label>
            <input
              type="number"
              value={editing.tableId}
              onChange={(e) => setEditing({ ...editing, tableId: Number(e.target.value) })}
            />

            <label>Kliendi nimi:</label>
            <input
              type="text"
              value={editing.customerName}
              onChange={(e) => setEditing({ ...editing, customerName: e.target.value })}
            />

            <label>Inimeste arv:</label>
            <input
              type="number"
              value={editing.peopleCount}
              onChange={(e) => setEditing({ ...editing, peopleCount: Number(e.target.value) })}
            />

            <div style={{ marginTop: "20px" }}>
              <button onClick={handleEditSave} style={btnSave}>Salvesta</button>
              <button onClick={() => setEditing(null)} style={btnCancel}>Tühista</button>
            </div>
          </div>
        </div>
      )}
      {viewing && (
        <div style={modalOverlay}>
            <div style={modalBox}>
                <h3>Broneering #{viewing.id}</h3>
                <p><strong>Laud:</strong> {viewing.table.id}</p>
                <p><strong>Kuupäev:</strong> {viewing.date}</p>
                <p><strong>Kellaaeg:</strong> {viewing.time}</p>
                <p><strong>Kliendi nimi:</strong> {viewing.customerName}</p>
                <p><strong>Inimeste arv:</strong> {viewing.peopleCount}</p>

        <button onClick={() => setViewing(null)} style={btnCancel}>
            Sulge
        </button>
    </div>
  </div>
    )}
    </div>
  );
}

const cell = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left"
};

const btnEdit = {
  backgroundColor: "#4da3ff",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px"
};

const btnDelete = {
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

const btnSave = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px"
};

const btnCancel = {
  backgroundColor: "#aaa",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalBox = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const btnView = {
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px"
};
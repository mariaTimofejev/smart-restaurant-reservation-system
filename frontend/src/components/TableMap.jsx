import { useEffect, useState } from "react";

export default function TableMap({ date, time, onSelect }) {
  const [tables, setTables] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!date || !time) return;

    fetch(`http://localhost:8080/tables/status?date=${date}&time=${time}`)
      .then(res => res.json())
      .then(data => setTables(data));
  }, [date, time]);

  function handleClick(table) {
    if (table.reserved) return; // ei saa valida kinni lauda
    setSelectedId(table.table.id);
    onSelect(table.table.id);
  }

  return (
    <div>
      <h3>Lauaplaan</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 120px)",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        {tables.map(t => {
          const isSelected = selectedId === t.table.id;

          return (
            <div
              key={t.table.id}
              onClick={() => handleClick(t)}
              style={{
                padding: "20px",
                borderRadius: "8px",
                cursor: t.reserved ? "not-allowed" : "pointer",
                backgroundColor: t.reserved
                  ? "#ffb3b3"
                  : isSelected
                  ? "#90ee90"
                  : "#e0e0e0",
                border: "2px solid #555",
                textAlign: "center"
              }}
            >
              <strong>Laud {t.table.id}</strong>
              <div>{t.table.capacity} kohta</div>
              <div>{t.reserved ? "Kinni" : "Vaba"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { getTables, updateTablePosition } from "../services/api";

export default function TableEditor() {
  const [tables, setTables] = useState([]);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    getTables().then(res => setTables(res.data));
  }, []);

  const handleMouseDown = (table, e) => {
    setDragging({
      id: table.id,
      offsetX: e.clientX - table.posX,
      offsetY: e.clientY - table.posY
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    setTables(prev =>
      prev.map(t =>
        t.id === dragging.id
          ? { ...t, posX: e.clientX - dragging.offsetX, posY: e.clientY - dragging.offsetY }
          : t
      )
    );
  };

  const handleMouseUp = () => {
    if (!dragging) return;

    const table = tables.find(t => t.id === dragging.id);
    updateTablePosition(table.id, table.posX, table.posY);

    setDragging(null);
  };

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 600,
        border: "2px solid #333",
        marginTop: "40px"
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h2>Lauaplaani editor</h2>

      {tables.map(t => (
        <div
          key={t.id}
          onMouseDown={(e) => handleMouseDown(t, e)}
          style={{
            position: "absolute",
            left: t.posX,
            top: t.posY,
            width: 80,
            height: 80,
            backgroundColor: "#ffe680",
            border: "2px solid #555",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            fontWeight: "bold"
          }}
        >
          {t.id}
        </div>
      ))}
    </div>
  );
}
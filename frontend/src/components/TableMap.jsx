import { useState } from "react";

export default function TableMap({ tables, recommended, onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "600px",
        border: "2px solid #ddd",
        background: "#fafafa",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {tables.map((table) => {
        const isRecommended = recommended.includes(table.id);
        const isSelected = selected === table.id;

        const color = isSelected
          ? "#1565C0" // sinine valitud laud
          : isRecommended
          ? "#1E88E5" // sinine soovitatud laud
          : table.reserved
          ? "#E53935" // punane broneeritud
          : "#43A047"; // roheline vaba

        return (
          <div
            key={table.id}
            onClick={() => {
              setSelected(table.id);
              onSelect(table.id);
            }}
            title={`Laud ${table.id} – mahutab ${table.capacity} inimest`}
            style={{
              position: "absolute",
              left: table.posX,
              top: table.posY,
              width: 50,
              height: 50,
              backgroundColor: color,
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
              transition: "0.2s",
              boxShadow: isSelected
                ? "0 0 10px rgba(21,101,192,0.8)"
                : "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {table.id}
          </div>
        );
      })}
    </div>
  );
}
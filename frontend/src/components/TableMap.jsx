import React from "react";

export default function TableMap({ tables, recommended }) {
  return (
    <div style={{ position: "relative", width: "800px", height: "600px", border: "1px solid #ccc" }}>
      {tables.map(table => {
        const isRecommended = recommended.includes(table.id);

        const color = isRecommended
          ? "blue"
          : table.reserved
          ? "red"
          : "green";

        return (
          <div
            key={table.id}
            style={{
              position: "absolute",
              left: table.posX,
              top: table.posY,
              width: 40,
              height: 40,
              backgroundColor: color,
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: "pointer"
            }}
            onClick={() => alert(`Laud ${table.id} (mahutab ${table.capacity})`)}
          >
            {table.id}
          </div>
        );
      })}
    </div>
  );
}
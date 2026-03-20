import { useEffect, useState } from "react";
import { getTables } from "../services/api";
import Table from "./Table";

export default function RestaurantFloor({ recommendedTables = [] }) {
  if (!recommendedTables || recommendedTables.length === 0) {
    return <p>Soovitusi pole veel.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Soovitatud lauad</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        {recommendedTables.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "15px",
              border: "2px solid #555",
              borderRadius: "8px",
              backgroundColor: "#d0f0ff"
            }}
          >
            <strong>Laud {t.id}</strong>
            <div>Kohti: {t.capacity}</div>
            <div>Asukoht: {t.zone}</div>
            <div>Eelistused: {t.features.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
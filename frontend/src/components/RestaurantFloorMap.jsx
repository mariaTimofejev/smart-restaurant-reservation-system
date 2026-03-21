import { useEffect, useState } from "react";
import { getTables } from "../services/api";
import Table from "./Table";

export default function RestaurantFloorMap({ recommendedTables = [] }) {
  const [tables, setTables] = useState([]);

  const getRecommendationRank = (tableId) => {
    return recommendedTables.findIndex(t => t.id === tableId);
  };

  useEffect(() => {
    getTables().then(res => setTables(res.data));
  }, []);

  const isZoneMatch = (table.zone === selectedZone || selectedZone === "");
  const color = isZoneMatch
  ? rank === 0 ? "#90ee90"
  : rank === 1 ? "#c8f7c5"
  : rank >= 2 ? "#e8ffe8"
  : "#e0e0e0"
  : "#cccccc";

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 600,
        border: "1px solid #ccc",
        marginTop: "20px"
      }}
    >
      {tables.map(t => (
        <Table
          key={t.id}
          table={t}
          rank={getRecommendationRank(t.id)}
        />
      ))}
    </div>
  );
}
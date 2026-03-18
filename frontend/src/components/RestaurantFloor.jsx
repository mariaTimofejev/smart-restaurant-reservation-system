import { useEffect, useState } from "react";
import { getTables } from "../services/api";
import Table from "./Table";

export default function RestaurantFloor({ recommendedTables = [] }) {
  const [tables, setTables] = useState([]);

  // leia rank (0 = best, 1 = second, jne)
  const getRecommendationRank = (tableId) => {
    return recommendedTables.findIndex(t => t.id === tableId);
  };

  // lae lauad backendist
  useEffect(() => {
    getTables().then(res => setTables(res.data));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 600,
        border: "1px solid #ccc"
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
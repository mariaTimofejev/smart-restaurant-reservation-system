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
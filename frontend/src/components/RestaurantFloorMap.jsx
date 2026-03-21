import { useEffect, useState } from "react";
import { getTables } from "../services/api";
import Table from "./Table";

export default function RestaurantFloorMap({ recommendedTables = [], selectedZone }) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getTables().then(res => setTables(res.data));
  }, []);

  const getRecommendationRank = (tableId) => {
    return recommendedTables.findIndex(t => t.id === tableId);
  };

  const isZoneMatch = (tableZone) => {
    return selectedZone === "" || selectedZone === tableZone;
  };

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 600,
        border: "1px solid #ccc",
        marginTop: "20px",
        backgroundColor: "#fafafa"
      }}
    >
      <h3 style={{ margin: "10px" }}>Restorani saaliplaan</h3>

      {tables.map((t) => {
        const rank = getRecommendationRank(t.id);
        const zoneMatch = isZoneMatch(t.zone);

        // Värviloogika:
        // 1) Kui tsoon ei sobi → hall
        // 2) Kui tsoon sobib → kasuta soovituse värve
        let color = "#e0e0e0"; // vaikimisi hall

        if (zoneMatch) {
          if (rank === 0) color = "#90ee90";       // parim soovitus
          else if (rank === 1) color = "#c8f7c5";  // teine soovitus
          else if (rank >= 2) color = "#e8ffe8";   // muu soovitus
          else color = "#ffffff";                  // sobiv tsoon, aga mitte soovitatud
        } else {
          color = "#cccccc"; // teised tsoonid hallid
        }

        return (
          <Table
            key={t.id}
            table={t}
            rank={rank}
            color={color}
          />
        );
      })}
    </div>
  );
}
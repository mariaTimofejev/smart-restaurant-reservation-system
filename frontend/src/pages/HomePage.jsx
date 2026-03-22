import { useState } from "react";
import TableMap from "../components/TableMap";
import ReservationForm from "../components/ReservationForm";
import RecommendationForm from "../components/RecommendationForm";
import RestaurantFloorMap from "../components/RestaurantFloorMap";

import { useTables } from "../hooks/useTables";
import { useRecommendations } from "../hooks/useRecommendations";

import RecommendationCard from "../components/RecommendationCard";

export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState("2026-03-22");
  const [time, setTime] = useState("18:00");
  const [partySize, setPartySize] = useState(3);

  const tables = useTables(date, time);
  const { recommended, recommend } = useRecommendations();
  console.log("recommended:", recommended);

  const uniqueRecommended = [...new Set(recommended)];

  return (
    <div>
      <h1>Restaurant Reservation System</h1>

      {/* Kuupäev, kellaaeg ja inimeste arv */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Vali kuupäev ja kellaaeg</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="20"
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
          placeholder="Inimeste arv"
          style={{
            width: "120px",
            marginLeft: "10px",
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* Saaliplaan + broneerimisvorm */}
      <div style={{ display: "flex", gap: "40px" }}>
        <TableMap
          key="floormap"
          tables={tables}
          recommended={uniqueRecommended}
          onSelect={(id) => setSelectedTable(id)}
        />

        <ReservationForm
          preselectedTableId={selectedTable}
          date={date}
          time={time}
        />
      </div>

      {/* Soovitused */}
      <div style={{ marginTop: "40px" }}>
        <h2>Soovitused</h2>

        <RecommendationForm
          date={date}
          time={time}
          partySize={partySize}
          setPartySize={setPartySize}
          onRecommend={() => recommend(date, time, partySize, [])}
        />

        {/* Soovitatud laua kaart */}
        {uniqueRecommended.length > 0 && (
          <RecommendationCard
            table={tables.find((t) => t.id === uniqueRecommended[0])}
          />
        )}

        {/* Soovituste saaliplaan */}
        <div style={{ marginTop: "20px" }}>
          <RestaurantFloorMap
            key="recommended-map"
            recommendedTables={uniqueRecommended}
            onSelect={(id) => setSelectedTable(id)}
            onShowFloorMap={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
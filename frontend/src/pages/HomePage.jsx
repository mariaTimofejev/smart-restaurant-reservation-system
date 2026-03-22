import { useState } from "react";
import TableMap from "../components/TableMap";
import ReservationForm from "../components/ReservationForm";
import RecommendationForm from "../components/RecommendationForm";
import RestaurantFloorMap from "../components/RestaurantFloorMap";

import { useTables } from "../hooks/useTables";
import { useRecommendations } from "../hooks/useRecommendations";

export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState("2026-03-22");
  const [time, setTime] = useState("18:00");
  const [partySize, setPartySize] = useState(3);

  const tables = useTables(date, time);
  const { recommended, recommend } = useRecommendations();

  const refreshTables = () => {
  setDate((d) => d); // trigger re-render
  };

  return (
    <div>
      <h1>Restaurant Reservation System</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Vali kuupäev ja kellaaeg</h2>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: "40px" }}>
        <TableMap
          tables={tables}
          recommended={recommended}
          onSelect={(id) => setSelectedTable(id)}
        />

        <ReservationForm
          preselectedTableId={selectedTable}
          date={date}
          time={time}
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Soovitused</h2>

        <RecommendationForm
          date={date}
          time={time}
          partySize={partySize}
          onRecommend={() => recommend(date, time, partySize, [])}
        />

        <RestaurantFloorMap recommendedTables={recommended} />
      </div>
    </div>
  );
}
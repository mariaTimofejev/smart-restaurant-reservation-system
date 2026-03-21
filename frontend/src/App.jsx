import { useState } from "react";

import TableMap from "./components/TableMap";
import ReservationForm from "./components/ReservationForm";
import RecommendationForm from "./components/RecommendationForm";
import RestaurantFloor from "./components/RestaurantFloor";
import RestaurantFloorMap from "./components/RestaurantFloorMap";
import ReservationList from "./components/ReservationList";
import AdminReservationList from "./components/AdminReservationList";

import { useTables } from "./hooks/useTables";
import { useRecommendations } from "./hooks/useRecommendations";

export default function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState("2026-03-22");
  const [time, setTime] = useState("18:00");
  const [partySize, setPartySize] = useState(3);

  const tables = useTables(date, time);
  const { recommended, recommend } = useRecommendations();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Restaurant Reservation System</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Vali kuupäev ja kellaaeg</h2>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <TableMap
            tables={tables}
            recommended={recommended}
            onSelect={(id) => setSelectedTable(id)}
          />
        </div>

        <div>
          <ReservationForm preselectedTableId={selectedTable} />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Soovitused</h2>

        <RecommendationForm
          date={date}
          time={time}
          partySize={partySize}
          onRecommend={() => recommend(date, time, partySize, [])}
        />

        <RestaurantFloor recommendedTables={recommended} />
        <RestaurantFloorMap recommendedTables={recommended} />
      </div>

      <ReservationList />
      <AdminReservationList />
    </div>
  );
}
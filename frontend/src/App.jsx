import { useState } from "react";
import TableMap from "./components/TableMap";
import ReservationForm from "./components/ReservationForm";
import RecommendationForm from "./components/RecommendationForm";
import RestaurantFloor from "./components/RestaurantFloor";
import RestaurantFloorMap from "./components/RestaurantFloorMap";

export default function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [recommendedTables, setRecommendedTables] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Restaurant Reservation System</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Vali kuupäev ja kellaaeg</h2>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="time" onChange={(e) => setTime(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: "40px" }}>

        <div>
          <TableMap
            date={date}
            time={time}
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
          setRecommendedTables={setRecommendedTables}
          date={date}
          time={time}
        />
        <RestaurantFloor recommendedTables={recommendedTables} />
        <RestaurantFloorMap recommendedTables={recommendedTables} />
      </div>
    </div>
  );
}
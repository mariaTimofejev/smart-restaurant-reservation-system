import { useState } from "react";
import RestaurantFloor from "./components/RestaurantFloor";
import ReservationPage from "./components/ReservationPage";
import RecommendationForm from "./components/RecommendationForm";
import ReservationForm from "./components/ReservationForm";

export default function App() {

  const [recommendedTables, setRecommendedTables] = useState([]);

  return (
    <div>
      <h1>Restaurant Reservation System</h1>

      <RecommendationForm setRecommendedTables={setRecommendedTables} />

      <RestaurantFloor recommendedTables={recommendedTables} />

      <ReservationPage />

      <ReservationForm />

    </div>
  );
}
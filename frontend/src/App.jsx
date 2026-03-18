import RestaurantFloor from "./components/RestaurantFloor";
import ReservationPage from "./components/ReservationPage";
import RecommendationForm from "./components/RecommendationForm";

export default function App() {
  return (
    <div>
      <h1>Restaurant Reservation System</h1>
      <RestaurantFloor />
      <ReservationPage />
       <RecommendationForm />
    </div>
  );
}
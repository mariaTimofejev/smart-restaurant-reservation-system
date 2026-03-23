import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

import ReservationPage from "./pages/ReservationPage";
import MyReservations from "./pages/MyReservations";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ReservationPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
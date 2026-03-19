import { useState } from "react";
import { getRecommendations } from "../api/reservations";
import { ZONES } from "../constants/zones";

export default function RecommendationForm({ setRecommendedTables }) {

  const [peopleCount, setPeopleCount] = useState(2);
  const [zone, setZone] = useState("INDOOR");
  const [preferences, setPreferences] = useState([]);
  const [tables, setTables] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [duration, setDuration] = useState(2);

  const handleSubmit = async () => {
    const data = {
      peopleCount,
      preferences,
      zone,
      dateTime,
      duration
    };

    try {
      const response = await getRecommendations(data);
      setTables(response.data);
      setRecommendedTables(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const togglePreference = (value) => {
    setPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((p) => p !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <h2>Find Recommended Tables</h2>

      <label>People Count:</label>
      <input
        type="number"
        value={peopleCount}
        onChange={(e) => setPeopleCount(Number(e.target.value))}
      />

      <br />

      <label>Zone:</label>
      <select value={zone} onChange={(e) => setZone(e.target.value)}>
        {ZONES.map((z) => (
          <option key={z} value={z}>{z}</option>
        ))}
      </select>

      <br />

      <label>Reservation Date & Time:</label>
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />

      <br />

      <label>Duration (hours):</label>
      <input
        type="number"
        value={duration}
        min={1}
        max={8}
        onChange={(e) => setDuration(Number(e.target.value))}
      />

      <br />

      <label>Preferences:</label>
      <div>
        {["WINDOW", "QUIET", "ACCESSIBLE", "HIGH_CHAIR"].map((feature) => (
          <label key={feature}>
            <input
              type="checkbox"
              checked={preferences.includes(feature)}
              onChange={() => togglePreference(feature)}
            />
            {feature}
          </label>
        ))}
      </div>

      <br />

      <button onClick={handleSubmit}>Soovita lauda</button>

      <h3>Recommended Tables:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Capacity</th>
            <th>Zone</th>
            <th>Features</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.capacity}</td>
              <td>{t.zone}</td>
              <td>{t.features?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
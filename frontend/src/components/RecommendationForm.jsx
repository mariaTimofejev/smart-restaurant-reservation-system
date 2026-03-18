import { useState } from "react";
import { getRecommendations } from "../api/reservations";
import { ZONES } from "../constants/zones";
import { FEATURES } from "../constants/features";

export default function RecommendationForm({ setRecommendedTables }) {

  const [peopleCount, setPeopleCount] = useState(2);
  const [zone, setZone] = useState("INDOOR");
  const [preferences, setPreferences] = useState([]);
  const [tables, setTables] = useState([]);

  const handleSubmit = async () => {
    const data = {
      peopleCount,
      preferences,
      zone
    };

    const response = await getRecommendations(data);

    setTables(response.data);
    setRecommendedTables(response.data);
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

      <label>Zone:</label>
      <select value={zone} onChange={(e) => setZone(e.target.value)}>
        <option value="INDOOR">Indoor</option>
        <option value="OUTDOOR">Outdoor</option>
        <option value="VIP">VIP</option>
      </select>

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
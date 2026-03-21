import { useState } from "react";

export default function RecommendationForm({ setRecommendedTables, date, time, setSelectedZone }) {
  const [peopleCount, setPeopleCount] = useState(1);
  const [preferences, setPreferences] = useState([]);
  const [zone, setZone] = useState("");

  const featureOptions = ["WINDOW", "HIGH_CHAIR", "OUTDOOR", "QUIET"];

  function togglePreference(pref) {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      peopleCount,
      preferences,
      date,
      time,
      zone
    };

    // anna tsoon edasi ka visuaalsele plaanile
    setSelectedZone(zone);

    const response = await fetch("http://localhost:8080/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      alert("Soovituste päring ebaõnnestus");
      return;
    }

    const data = await response.json();
    setRecommendedTables(data);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Soovita lauda</h3>

      <label>Inimeste arv:</label>
      <input
        type="number"
        min="1"
        value={peopleCount}
        onChange={(e) => setPeopleCount(Number(e.target.value))}
      />

      <div style={{ marginTop: "10px" }}>
        <label>Tsoon:</label>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          <option value="">Kõik tsoonid</option>
          <option value="INDOOR">Saal</option>
          <option value="TERRACE">Terrass</option>
          <option value="PRIVATE">Privaatruum</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Eelistused:</label>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {featureOptions.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => togglePreference(f)}
              style={{
                padding: "5px 10px",
                backgroundColor: preferences.includes(f) ? "#90ee90" : "#e0e0e0",
                border: "1px solid #555",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" style={{ marginTop: "15px" }}>
        Leia parim laud
      </button>
    </form>
  );
}
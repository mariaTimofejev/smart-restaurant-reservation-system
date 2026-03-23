import { useEffect, useState } from "react";
import "./ReservationPage.css";

export default function ReservationPage() {
  const [tables, setTables] = useState([]);
  const [recommended, setRecommended] = useState(null);

  const [date, setDate] = useState("2026-03-22");
  const [time, setTime] = useState("18:00");
  const [people, setPeople] = useState(3);

  const [zone, setZone] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (!date || !time) return;

    fetch(`http://localhost:8080/api/tables?date=${date}&time=${time}`)
      .then(res => res.json())
      .then(setTables)
      .catch(console.error);
  }, [date, time]);

  const toggleFeature = (f) => {
    setFeatures(prev =>
      prev.includes(f)
        ? prev.filter(x => x !== f)
        : [...prev, f]
    );
  };

  const handleRecommend = () => {
    const params = new URLSearchParams({
      date,
      time,
      people,
    });

    if (zone) params.append("zone", zone);
    features.forEach(f => params.append("features", f));

    fetch(`http://localhost:8080/api/recommend?${params}`)
      .then(res => res.json())
      .then(setRecommended)
      .catch(console.error);
  };

  return (
    <div className="page">
      <h1>Restaurant Reservation System</h1>

      <div className="controls">
        <label>Kuupäev:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>

        <label>Kellaaeg:
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </label>

        <label>Inimeste arv:
          <input
            type="number"
            min="1"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          />
        </label>

        <label>Tsoon:
          <select value={zone} onChange={e => setZone(e.target.value)}>
            <option value="">Kõik</option>
            <option value="PEASAAL">Peasaal</option>
            <option value="TERRASS">Terrass</option>
            <option value="PRIVAATRUUM">Privaatruum</option>
          </select>
        </label>

        <div className="features">
          <label>
            <input
              type="checkbox"
              checked={features.includes("WINDOW")}
              onChange={() => toggleFeature("WINDOW")}
            />
            Aknakoht
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.includes("PRIVATE")}
              onChange={() => toggleFeature("PRIVATE")}
            />
            Privaatne
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.includes("ACCESSIBLE")}
              onChange={() => toggleFeature("ACCESSIBLE")}
            />
            Ligipääsetav
          </label>
        </div>

        <button onClick={handleRecommend}>Soovita lauda</button>
      </div>

      <div className="hall">
  <h2>Saali plaan</h2>

  <div className="hall-plan">
    {tables.map(t => (
      <div
        key={t.table.id}
        className={
          t.reserved
            ? "table reserved"
            : recommended && recommended.id === t.table.id
              ? "table recommended"
              : "table free"
        }
        style={{ left: t.table.posX, top: t.table.posY }}
      >
        <span className="tooltip">
          Laud #{t.table.id}<br />
          Mahutab: {t.table.capacity}<br />
          Tsoon: {t.table.zone}<br />
          Omadused: {t.table.features?.join(", ")}
        </span>
        {t.table.id}
      </div>
    ))}
  </div>
</div>
    {recommended && (
      <div className="recommend-card">
        <h3>Soovitatud laud #{recommended.id}</h3>
        <p>Mahutab: {recommended.capacity} inimest</p>
        <p>Tsoon: {recommended.zone}</p>
      </div>
    )}
    </div>
  );
}
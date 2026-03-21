import { useState } from "react";

export function useRecommendations() {
  const [recommended, setRecommended] = useState([]);

  async function recommend(date, time, partySize, preferences) {
    const res = await fetch("http://localhost:8080/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time, partySize, preferences })
    });

    const data = await res.json();
    setRecommended(data.map(t => t.id));
  }

  return { recommended, recommend };
}
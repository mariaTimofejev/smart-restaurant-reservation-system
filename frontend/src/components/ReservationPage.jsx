import { useEffect, useState } from "react";
import { getTables } from "../services/api";

export default function ReservationPage() {

  const [tables, setTables] = useState([]);

  const [recommendedTables, setRecommendedTables] = useState([]);

  useEffect(() => {
    getTables().then(res => setTables(res.data));
  }, []);

  return (
    <div>
      <h1>Tables</h1>
      <pre>{JSON.stringify(tables, null, 2)}</pre>
    </div>
  );
}
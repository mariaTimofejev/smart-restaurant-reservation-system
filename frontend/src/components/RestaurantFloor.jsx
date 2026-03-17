import { useEffect, useState } from "react";
import Table from "./Table";

export default function RestaurantFloor() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tables")
      .then(res => res.json())
      .then(data => setTables(data));
  }, []);

  return (
    <div style={{ position: "relative", width: 800, height: 600, border: "1px solid #ccc" }}>
      {tables.map(t => (
        <Table key={t.id} table={t} />
      ))}
    </div>
  );
}
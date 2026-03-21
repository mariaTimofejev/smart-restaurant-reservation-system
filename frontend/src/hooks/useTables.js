import { useEffect, useState } from "react";

export function useTables(date, time) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function load() {
      const base = await fetch("http://localhost:8080/api/tables").then(r => r.json());
      const status = await fetch(`http://localhost:8080/tables/status?date=${date}&time=${time}`).then(r => r.json());

      const merged = base.map(t => {
        const st = status.find(s => s.table.id === t.id);
        return {
          ...t,
          reserved: st ? st.reserved : false
        };
      });

      setTables(merged);
    }

    load();
  }, [date, time]);

  return tables;
}
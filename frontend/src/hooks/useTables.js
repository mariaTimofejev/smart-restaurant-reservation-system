import { useEffect, useState } from "react";
import axios from "axios";

export function useTables(date, time) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await axios.get("http://localhost:8080/api/tables", {
          params: { date, time }
        });

        const data = Array.isArray(response.data) ? response.data : [];

        const mapped = data.map(item => ({
          id: item.table.id,
          capacity: item.table.capacity,
          posX: item.table.posX,
          posY: item.table.posY,
          reserved: item.reserved
        }));

        setTables(mapped);
      } catch (err) {
        console.error("Failed to load tables:", err);
        setTables([]);
      }
    }

    load();
  }, [date, time]);

  return tables;
}
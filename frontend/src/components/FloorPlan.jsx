import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import ReservationModal from "./ReservationModal";

export default function FloorPlan() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  const loadTables = async () => {
    const res = await axios.get("http://localhost:8080/tables");
    setTables(res.data);
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleTableClick = (table) => {
    if (table.reserved) return; // punane laud ei ole klikitav
    setSelectedTable(table);
  };

  return (
    <>
      {tables.map((t) => (
        <Table key={t.id} table={t} onClick={handleTableClick} />
      ))}

      {selectedTable && (
        <ReservationModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onSuccess={loadTables}
        />
      )}
    </>
  );
}
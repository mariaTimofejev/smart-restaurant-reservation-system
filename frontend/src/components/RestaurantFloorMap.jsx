import { useTables } from "../hooks/useTables";
import TableMap from "./TableMap";

export default function RestaurantFloorMap({ date, time, recommended, onSelect }) {
  const tables = useTables(date, time);

  return (
    <div>
      <h3>Saali plaan</h3>

      {tables.length === 0 && <div>Lauad puuduvad või laadimine ebaõnnestus</div>}

      <div style={{ marginTop: 20 }}>
        <TableMap
          tables={tables}
          recommended={recommended}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
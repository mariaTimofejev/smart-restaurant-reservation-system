import { useTables } from "../hooks/useTables";
import TableMap from "./TableMap";

export default function RestaurantFloorMap({ date, time, recommendedTables, onSelect, onShowFloorMap }) {
    const tables = useTables(date, time);

    // Muudame ID-d päris objektideks
    const recommendedObjects = tables.filter(t => recommendedTables.includes(t.id));

    return (
        <div>
            <h3>Saali plaan</h3>

            {tables.length === 0 && <div>Lauad puuduvad või laadimine ebaõnnestus</div>}

            <div style={{ marginTop: 20 }}>
                <TableMap
                  tables={recommendedObjects}
                  recommended={recommendedTables}
                  onSelect={(id) => {
                    onSelect(id);
                    onShowFloorMap();
                  }}
                />
            </div>
        </div>
    );
}
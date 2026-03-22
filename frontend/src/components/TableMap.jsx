export default function TableMap({ tables = [], recommended = [], onSelect }) {
  
  if (!tables || tables.length === 0) {
    return <div>Lauad puuduvad</div>;
  }
  
  return (
    <div style={{ position: "relative", width: 800, height: 600 }}>
      {tables.map((table) => {
        const isRecommended = recommended.includes(table.id);

        const color = table.reserved
          ? "#E53935"      // punane – broneeritud
          : isRecommended
          ? "#1E88E5"      // sinine – soovitatud
          : "#43A047";     // roheline – vaba

        return (
          <div
            key={table.id}
            onClick={() => !table.reserved && onSelect(table.id)}
            title={`Laud ${table.id} – ${table.capacity} inimest`}
            style={{
              position: "absolute",
              left: table.posX,
              top: table.posY,
              width: 50,
              height: 50,
              backgroundColor: color,
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: table.reserved ? "not-allowed" : "pointer",
              border: "2px solid black"
            }}
          >
            {table.id}
          </div>
        );
      })}
    </div>
  );
}
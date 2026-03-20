export default function Table({ table, rank }) {
  const color =
    rank === 0 ? "#90ee90" :       // parim soovitus
    rank === 1 ? "#c8f7c5" :       // teine soovitus
    rank >= 2 ? "#e8ffe8" :        // muu soovitus
    "#e0e0e0";                     // pole soovitatud

  return (
    <div
      style={{
        position: "absolute",
        left: table.posX,
        top: table.posY,
        width: 80,
        height: 80,
        backgroundColor: color,
        border: "2px solid #555",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
      }}
    >
      {table.id}
    </div>
  );
}
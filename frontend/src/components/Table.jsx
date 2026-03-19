export default function Table({ table, rank, onClick }) {
  
  const data = table.table;
  const reserved = table.reserved;

  // Rank värvid (kui laud pole broneeritud)
  let color = "green";

  if (rank === 0) color = "gold";
  else if (rank === 1) color = "yellow";
  else if (rank === 2) color = "lightgreen";

  // Kui laud on broneeritud → punane
  if (reserved) color = "red";

  return (
    <div
      onClick={() => onClick(table)}
      style={{
        position: "absolute",
        left: data.posX,
        top: data.posY,
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: reserved ? "not-allowed" : "pointer",
        fontWeight: "bold",
        userSelect: "none",
        border: "2px solid black"
      }}
    >
      {data.capacity}
    </div>
  );
}
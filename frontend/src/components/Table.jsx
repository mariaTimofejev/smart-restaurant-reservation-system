export default function Table({ table, rank, isReserved }) {

  let color = "green";

  if (rank === 0) color = "gold";
  else if (rank === 1) color = "yellow";
  else if (rank === 2) color = "lightgreen";

  if (isReserved) color = "red";

  return (
    <div
      style={{
        position: "absolute",
        left: table.posX,
        top: table.posY,
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}
    >
      {table.capacity}
    </div>
  );
}
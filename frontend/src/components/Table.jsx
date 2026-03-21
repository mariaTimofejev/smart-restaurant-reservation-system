export default function Table({ table, rank, color }) {
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
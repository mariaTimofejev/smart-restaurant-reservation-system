export default function Table({ table }) {
  const style = {
    position: "absolute",
    left: table.posX,
    top: table.posY,
    width: 60,
    height: 60,
    background: "#eee",
    border: "2px solid #333",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return <div style={style}>{table.capacity}</div>;
}
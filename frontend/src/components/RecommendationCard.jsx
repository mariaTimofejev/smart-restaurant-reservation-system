export default function RecommendationCard({ table }) {
  if (!table) return null;

  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "12px",
        background: "white",
        border: "1px solid #ddd",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        margin: "16px 0",
        width: "280px",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>
        Soovitatud laud #{table.id}
      </h3>

      <div style={{ fontSize: "15px", lineHeight: "1.5" }}>
        <p style={{ margin: "4px 0" }}>
          Mahutab: <strong>{table.capacity}</strong> inimest
        </p>
        <p style={{ margin: "4px 0" }}>
          Tsoon: <strong>{table.zone || "Peasaal"}</strong>
        </p>
      </div>
    </div>
  );
}
export const ZONES = [
  { value: "TERRACE", label: "Terrace" },
  { value: "MAIN_HALL", label: "Main Hall" },
  { value: "PRIVATE_ROOM", label: "Private Room" }
];

<select value={zone} onChange={(e) => setZone(e.target.value)}>
  {ZONES.map((z) => (
    <option key={z.value} value={z.value}>
      {z.label}
    </option>
  ))}
</select>
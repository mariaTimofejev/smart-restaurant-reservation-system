export const FEATURES = [
  { value: "WINDOW", label: "Window" },
  { value: "QUIET", label: "Quiet area" },
  { value: "ACCESSIBLE", label: "Accessible" },
  { value: "NEAR_PLAY_AREA", label: "Near play area" }
];

{FEATURES.map((f) => (
  <label key={f.value}>
    <input
      type="checkbox"
      checked={preferences.includes(f.value)}
      onChange={() => togglePreference(f.value)}
    />
    {f.label}
  </label>
))}
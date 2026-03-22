export default function RecommendationForm({ date, time, partySize, onRecommend }) {
  return (
    <div>
      <button
        onClick={onRecommend}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        Soovita lauda
      </button>
    </div>
  );
}
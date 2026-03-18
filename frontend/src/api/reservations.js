import API from "./apiClient";

export const getRecommendations = (data) =>
  API.post("/reservations/recommend", data);
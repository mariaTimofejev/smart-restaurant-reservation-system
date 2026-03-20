import axios from "axios";

export const getTables = () => {
  return axios.get("http://localhost:8080/tables");
};

export const getReservations = () => {
  return axios.get("http://localhost:8080/reservations");
};
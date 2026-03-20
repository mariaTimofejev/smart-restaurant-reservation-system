import axios from "axios";

export const getTables = () => {
  return axios.get("http://localhost:8080/tables");
};

export const getReservations = () => {
  return axios.get("http://localhost:8080/reservations");
};

export const deleteReservation = (id) => {
  return axios.delete(`http://localhost:8080/reservations/${id}`);
};

export const updateReservation = (id, data) => {
  return axios.put(`http://localhost:8080/reservations/${id}`, data);
};

export const updateTablePosition = (id, x, y) => {
  return axios.put(`http://localhost:8080/tables/${id}/position`, { x, y });
};
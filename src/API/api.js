import axios from "axios";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchTickets = async () => {
  const response = await axios.get(API_URL);
  return response.data.tickets;
};

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data.users;
};
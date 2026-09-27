import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const loginAdmin = async (username, password) => {
  const response = await api.post("/admin/login", {
    username,
    password,
  });

  return response.data;
};

export const getStats = async (token) => {
  const response = await api.get("/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getInteractions = async (token) => {
  const response = await api.get("/admin/interactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
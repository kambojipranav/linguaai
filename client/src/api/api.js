import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Handle unauthorized responses (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirecting to login...");
      // You could also force log-out here in the future
    }
    return Promise.reject(error);
  }
);

export default api;

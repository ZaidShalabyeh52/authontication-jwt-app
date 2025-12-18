import axios from "axios";

const api = axios.create({
  // point to your backend, not the Vite dev server
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;

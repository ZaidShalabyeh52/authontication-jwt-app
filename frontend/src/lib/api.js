import axios from "axios";

const api = axios.create({
  // point to your backend, not the Vite dev server
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

// no queue processing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalRequest = error.config;

    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        await api.post("/refresh");
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // for queue processing
    if (error.response?.status === 401 && isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    return Promise.reject(error);
  }
);

export default api;

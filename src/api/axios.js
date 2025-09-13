import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  withCredentials: true, // if you later add cookies/auth
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_DEMO_TOKEN}`,
  },
});

// Optional interceptors for global error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;

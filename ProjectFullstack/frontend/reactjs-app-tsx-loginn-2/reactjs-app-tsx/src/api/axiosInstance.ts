import axios from "axios";
import { config } from "process";

// use mock API base URL for development and testing
// const BASE_URL = "https://6895ef7e039a1a2b2890dbac.mockapi.io/api/v1";
// Backend API base URL for production

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Token hết hạn hoặc không hợp lệ → logout tự động
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      // Điều hướng về login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;

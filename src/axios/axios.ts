import axios from "axios";
import { API_URL } from "@/config/env";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("target_peak_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Response interceptor
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || "";

    const isAuthApi =
      url.includes("/auth/send-otp") || url.includes("/auth/verify-otp");

    if (status === 401 && !isAuthApi) {
      localStorage.removeItem("target_peak_token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default apiClient;

import axios from "axios";

import { store } from "../../app/store.js";
import { markUnauthenticated } from "../../store/slices/authSlice";
import { queryClient } from "../../app/queryClient.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

const shouldSkipRefresh = (config) =>
  config?.url?.includes("/auth/refresh-token") || config?.skipAuthRefresh;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !error.response ||
      error.response.status !== 401 ||
      !originalRequest ||
      shouldSkipRefresh(originalRequest) ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = api.post(
          "/auth/refresh-token",
          {},
          { skipAuthRefresh: true },
        );
      }

      await refreshPromise;
      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch(markUnauthenticated());
      queryClient.clear();

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.assign("/login");
      }

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);

export default api;

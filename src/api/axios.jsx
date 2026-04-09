import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const plainAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor for API (access token)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/admin/login";
        return Promise.reject(error);
      }

      try {
        const res = await plainAPI.post("/auth/refresh", {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);

      } catch (err) {
        localStorage.clear();
        window.location.href = "/admin/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

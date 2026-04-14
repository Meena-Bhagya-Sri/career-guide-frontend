import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "./refreshToken";

let refreshTimeout; // ✅ prevent multiple timers

export const scheduleSilentRefresh = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();

    const refreshTime = expiryTime - currentTime - 60 * 1000;

    // clear previous timer
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
    }

    if (refreshTime <= 0) {
      refreshAccessToken();
      return;
    }

    refreshTimeout = setTimeout(async () => {
      console.log("🔄 Silent refresh triggered");

      const newToken = await refreshAccessToken();

      if (newToken) {
        scheduleSilentRefresh(); // reschedule
      } else {
        localStorage.clear();
        window.location.href = "/signin";
      }
    }, refreshTime);

  } catch (err) {
    console.error("Invalid token", err);
    localStorage.clear();
    window.location.href = "/signin";
  }
};
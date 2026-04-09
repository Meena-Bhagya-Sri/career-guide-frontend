import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "./refreshToken";

export const scheduleSilentRefresh = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return;

  const decoded = jwtDecode(token);

  const expiryTime = decoded.exp * 1000;
  const currentTime = Date.now();

  const refreshTime = expiryTime - currentTime - 60 * 1000;

  if (refreshTime <= 0) {
    refreshAccessToken();
    return;
  }

  setTimeout(async () => {
    console.log("🔄 Silent refresh triggered");

    const newToken = await refreshAccessToken();

    if (newToken) {
      scheduleSilentRefresh(); // reschedule
    } else {
      localStorage.clear();
      window.location.href = "/signin";
    }
  }, refreshTime);
};

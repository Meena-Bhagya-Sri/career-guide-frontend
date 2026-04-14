import {API} from "../api/axios"; // ✅ make sure it's imported

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) return null;

  try {
    const response = await API.post(
      "/auth/refresh", // ⚠️ adjust if needed
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    localStorage.setItem("access_token", data.access_token);

    return data.access_token;

  } catch (err) {
    console.error("Refresh failed", err);
    return null;
  }
}
export const authFetch = async (url, options = {}) => {
  let token = localStorage.getItem("access_token");

  // 🔹 First request
  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json", // ✅ VERY IMPORTANT (fixes 415)
      "Authorization": `Bearer ${token}`,
      ...options.headers,
    },
  });

  // 🔁 If token expired
  if (res.status === 401) {
    token = await refreshAccessToken();

    if (!token) {
      localStorage.clear();
      window.location.href = "/signin";
      throw new Error("Unauthorized");
    }

    // 🔹 Retry request with new token
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json", // ✅ again required
        "Authorization": `Bearer ${token}`,
        ...options.headers,
      },
    });
  }

  return res;
};
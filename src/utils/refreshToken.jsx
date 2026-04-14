import API from "../api/axios"; // ✅ make sure it's imported

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
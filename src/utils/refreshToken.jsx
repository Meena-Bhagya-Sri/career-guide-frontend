export async function refreshAccessToken() {

  const refreshToken = localStorage.getItem("refresh_token");


  if (!refreshToken) return null;

  try {

    const response = await API.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      
    });

    const data = await response.json();

    if (!response.ok) return null;

    localStorage.setItem("access_token", data.access_token);

    return data.access_token;

  } catch {
    return null;
  }

}
export const authFetch = async (url, options = {}) => {
  let token = localStorage.getItem("access_token");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`
    }
  });

  if (res.status === 401) {
    token = await refreshAccessToken();
    if (!token) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/signin"; // redirect to login
      throw new Error("Unauthorized");
    }

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Authorization": `Bearer ${token}`
      }
    });
  }

  return res;
};
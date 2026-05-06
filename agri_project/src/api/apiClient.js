const API_BASE = "http://localhost:8080";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token"); // ✅ get token

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // ✅ send token
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
}

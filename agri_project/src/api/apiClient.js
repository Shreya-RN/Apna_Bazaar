const API_BASE = "http://localhost:8080/api";

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // important for sessions
    ...options,
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
}
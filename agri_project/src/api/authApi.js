import { apiRequest } from "./apiClient";

export const registerUser = (data) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = (data) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getProfile = () =>
  apiRequest("/auth/profile");

export const logoutUser = () =>
  apiRequest("/auth/logout", {
    method: "POST",
  });
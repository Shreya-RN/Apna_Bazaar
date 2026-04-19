import { apiRequest } from "./apiClient";

export function getEquipmentListings(type = "") {
  const suffix = type ? `?type=${encodeURIComponent(type)}` : "";
  return apiRequest(`/equipment${suffix}`);
}

export function addEquipmentListing(payload) {
  return apiRequest("/equipment", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getEquipmentById(id) {
  return apiRequest(`/equipment/${id}`);
}
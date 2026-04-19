import { apiRequest } from "./apiClient";

export function getWorkers() {
  return apiRequest("/workers");
}

export function addWorkerProfile(payload) {
  return apiRequest("/workers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getWorkerById(id) {
  return apiRequest(`/workers/${id}`);
}
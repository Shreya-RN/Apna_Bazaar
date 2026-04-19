import { apiRequest } from "./apiClient";

export function getBazaarProducts() {
  return apiRequest("/bazaar/products");
}

export function addBazaarProduct(payload) {
  return apiRequest("/bazaar/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBazaarProductById(id) {
  return apiRequest(`/bazaar/products/${id}`);
}
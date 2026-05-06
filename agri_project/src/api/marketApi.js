import { apiRequest } from "./apiClient";

export function getMarketPrices() {
  return apiRequest("/market-prices");
}

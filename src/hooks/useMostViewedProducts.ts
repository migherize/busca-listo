import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

export function useMostViewedProducts(limit?: number) {
  return useQuery<Product[]>({
    queryKey: ["products", "mostViewed", limit],
    queryFn: async () => {
      const response = await apiService.getMostViewedProducts(limit);
      if (!response.success) {
        throw new Error(response.error || "Error al cargar productos más vistos");
      }
      return response.data;
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

export function useDealsProducts(limit?: number) {
  return useQuery<Product[]>({
    queryKey: ["products", "deals", limit],
    queryFn: async () => {
      const response = await apiService.getDealsProducts(limit);
      if (!response.success) {
        throw new Error(response.error || "Error al cargar productos en oferta");
      }
      return response.data;
    },
  });
}

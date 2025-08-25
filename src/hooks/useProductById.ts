import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

export function useProductById(productId: string) {
  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await apiService.getProductById(productId);
      if (!response.success) {
        throw new Error(response.error || `Error al cargar el producto ${productId}`);
      }
      return response.data;
    },
    enabled: !!productId,
  });
}


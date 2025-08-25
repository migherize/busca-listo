import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

export function useSearchProducts(searchTerm: string, category?: string, limit?: number) {
  return useQuery<Product[]>({
    queryKey: ["products", "search", searchTerm, category, limit],
    queryFn: async () => {
      const response = await apiService.searchProducts(searchTerm, category, limit);
      if (!response.success) {
        throw new Error(response.error || "Error al buscar productos");
      }
      return response.data;
    },
    enabled: !!searchTerm.trim(), // Solo ejecutar si hay término de búsqueda
  });
}

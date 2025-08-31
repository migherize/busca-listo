import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { apiService } from "@/services/apiService";

export function useProductsByCategory(category: string, limit?: number) {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "category", category, limit],
    queryFn: async () => {
      const response = await apiService.getProductsByCategory(category, limit);
      if (!response.success) {
        throw new Error(response.error || `Error al cargar productos de la categoría ${category}`);
      }
      return response.data;
    },
    enabled: !!category, // Solo ejecutar si hay categoría seleccionada
  });
}

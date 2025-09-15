import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

export function useProductsByCategory(category: string, limit?: number) {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "category", category, limit],
    queryFn: async () => {
      const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_CATEGORY}/${category}`;
      const url = buildApiUrl(endpoint, limit ? { limit } : undefined);
      console.log("Fetching useProductsByCategory:", url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar productos de la categoría ${category}: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    },
    enabled: !!category, // Solo ejecutar si hay categoría seleccionada
  });
}

import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

export function useProductsByCompany(companyName: string, categoryId?: number) {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "company", companyName, categoryId],
    queryFn: async () => {
      const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_COMPANY}/${encodeURIComponent(companyName)}`;
      const params: Record<string, string | number> = {};
      if (categoryId) params.category_id = categoryId;
      
      const url = buildApiUrl(endpoint, params);
      console.log("Fetching useProductsByCompany:", url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar productos de la empresa ${companyName}: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    },
    enabled: !!companyName, // Solo ejecutar si hay companyName
    retry: 3, // Reintentar 3 veces en caso de error
    retryDelay: 1000, // Esperar 1 segundo entre reintentos
    staleTime: 2 * 60 * 1000, // Los datos son válidos por 2 minutos
  });
}

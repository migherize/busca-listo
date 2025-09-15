import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

// Interfaz para la respuesta completa del endpoint de búsqueda
interface SearchResponse {
  products: BaseProduct[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  search_term: string;
  category?: string;
  sort_by: string;
  sort_order: string;
}

export function useSearchProducts(
  searchTerm: string, 
  category?: string, 
  limit?: number,
  page?: number,
  sortBy?: string,
  sortOrder?: string
) {
  return useQuery<SearchResponse>({
    queryKey: ["products", "search", searchTerm, category, limit, page, sortBy, sortOrder],
    queryFn: async () => {
      const params: Record<string, string | number> = {};
      if (searchTerm) params.q = searchTerm;
      if (category) params.categoria = category;
      if (limit) params.limit = limit;
      if (page) params.page = page;
      if (sortBy) params.sort_by = sortBy;
      if (sortOrder) params.sort_order = sortOrder;
      
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH, params);
      console.log("Fetching useSearchProducts:", url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error en búsqueda: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    },
    enabled: !!searchTerm.trim(), // Solo ejecutar si hay término de búsqueda
  });
}

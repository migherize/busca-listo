import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { apiService } from "@/services/apiService";

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
      const response = await apiService.searchProducts(
        searchTerm, 
        category, 
        limit, 
        page, 
        sortBy, 
        sortOrder
      );
      if (!response.success) {
        throw new Error(response.error || "Error al buscar productos");
      }
      return response.data;
    },
    enabled: !!searchTerm.trim(), // Solo ejecutar si hay término de búsqueda
  });
}

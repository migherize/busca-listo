import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

interface UseAllProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useAllProducts({ 
  page = 1, 
  limit = 20, 
  category, 
  sortBy, 
  sortOrder = 'desc' 
}: UseAllProductsParams = {}) {
  return useQuery<{ products: BaseProduct[]; total: number; totalPages: number }>({
    queryKey: ["products", "all", page, limit, category, sortBy, sortOrder],
    queryFn: async () => {
      const params: Record<string, string | number> = {
        page: page || 1,
        limit: limit || 20,
        orden: sortOrder || 'desc',
      };
      
      if (category) params.categoria = category;
      if (sortBy) params.ordenarPor = sortBy;
      
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL, params);
      console.log("Fetching useAllProducts:", url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    },
  });
}

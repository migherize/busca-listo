import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

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
  return useQuery<{ products: Product[]; total: number; totalPages: number }>({
    queryKey: ["products", "all", page, limit, category, sortBy, sortOrder],
    queryFn: async () => {
      const response = await apiService.getAllProducts({ page, limit, category, sortBy, sortOrder });
      if (!response.success) {
        throw new Error(response.error || "Error al cargar productos");
      }
      return response.data;
    },
  });
}

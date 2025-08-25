import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";

interface PopularCategory {
  key: string;
  name: string;
  imageUrl: string;
  productCount: number;
}

export function usePopularCategories(limit?: number) {
  return useQuery<PopularCategory[]>({
    queryKey: ["categories", "popular", limit],
    queryFn: async () => {
      const response = await apiService.getPopularCategories(limit);
      if (!response.success) {
        throw new Error(response.error || "Error al cargar categorías populares");
      }
      return response.data;
    },
  });
}

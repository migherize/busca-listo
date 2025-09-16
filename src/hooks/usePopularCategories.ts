import { useQuery } from "@tanstack/react-query";
import type { CategoryPopular } from "@shared/SchemaCategory";
import { API_CONFIG } from "@/config/api";
import { fetchWithCors } from "@/utils/fetchWithCors";

export function usePopularCategories(limit: number = 6) {
  return useQuery<CategoryPopular[], Error>({
    queryKey: ["categories", "popular", limit],
    queryFn: async (): Promise<CategoryPopular[]> => {
      const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.CATEGORIES.ALL}?limit=${limit}`;

      const data = await fetchWithCors(url);
      return data as CategoryPopular[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

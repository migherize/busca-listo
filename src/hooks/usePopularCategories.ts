import { useQuery } from "@tanstack/react-query";
import type { CategoryPopular } from "@shared/SchemaCategory";
import { API_CONFIG } from "@/config/api";

export function usePopularCategories(limit: number = 6) {
  return useQuery<CategoryPopular[], Error>({
    queryKey: ["categories", "popular", limit],
    queryFn: async (): Promise<CategoryPopular[]> => {
      const url = new URL(`${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.CATEGORIES.ALL}`);
      url.searchParams.append("limit", String(limit));

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Error al cargar categorías populares");
      return (await res.json()) as CategoryPopular[];
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

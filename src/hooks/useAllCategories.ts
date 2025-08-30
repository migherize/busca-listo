import { useQuery } from "@tanstack/react-query";
import type { CategoryPopular } from "@shared/SchemaCategory";
import { API_CONFIG } from "@/config/api";

export function useAllCategories() {
  return useQuery<CategoryPopular[], Error>({
    queryKey: ["categories", "all"],
    queryFn: async (): Promise<CategoryPopular[]> => {
      const url = new URL(`${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.CATEGORIES.ALL}`);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Error al cargar todas las categorías");
      return (await res.json()) as CategoryPopular[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    cacheTime: 20 * 60 * 1000, // 20 minutos
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

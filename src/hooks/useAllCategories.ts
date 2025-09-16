import { useQuery } from "@tanstack/react-query";
import type { CategoryPopular } from "@shared/SchemaCategory";
import { API_CONFIG } from "@/config/api";
import { fetchWithCors } from "@/utils/fetchWithCors";

export function useAllCategories() {
  return useQuery<CategoryPopular[], Error>({
    queryKey: ["categories", "all"],
    queryFn: async (): Promise<CategoryPopular[]> => {
      const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.CATEGORIES.ALL}`;
      console.log("Fetching useAllCategories:", url);

      const data = await fetchWithCors(url);
      return data as CategoryPopular[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 20 * 60 * 1000, // 20 minutos
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

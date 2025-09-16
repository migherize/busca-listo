import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG } from "@/config/api";
import { fetchWithCors } from "@/utils/fetchWithCors";

export function useRecentProducts() {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "recent"],
    queryFn: async () => {
      const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.RECENT}`;
      console.log("Fetching useRecentProducts:", url);

      const data = await fetchWithCors(url);
      return data as BaseProduct[];
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

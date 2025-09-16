import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type { MostViewedProduct } from "@shared/SchemaProduct";
import { API_CONFIG } from "@/config/api";
import { fetchWithCors } from "@/utils/fetchWithCors";

export function useMostViewedProducts(
  limit: number = 4
): UseQueryResult<MostViewedProduct[], Error> {
  return useQuery<MostViewedProduct[], Error>({
    queryKey: ["products", "mostViewed", limit],
    queryFn: async () => {
      const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.MOST_VIEWED}?limit=${limit}`;
      console.log("Fetching useMostViewedProducts:", url);

      const data = await fetchWithCors(url);
      return data as MostViewedProduct[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

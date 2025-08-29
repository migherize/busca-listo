import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { API_CONFIG } from "@/config/api";

export function useMostViewedProducts(limit: number = 4) {
  return useQuery<Product[]>({
    queryKey: ["products", "mostViewed", limit],
    queryFn: async () => {
      const url = new URL(`${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.MOST_VIEWED}`);
      url.searchParams.append("limit", String(limit));

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Error al cargar productos más vistos");
      const data: Product[] = await res.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

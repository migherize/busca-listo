import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { API_CONFIG } from "@/config/api";

export function useRecentProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "recent"],
    queryFn: async () => {
      const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.RECENT}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error al cargar productos: ${res.status}`);
      }

      const data: Product[] = await res.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

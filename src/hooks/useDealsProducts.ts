import { useQuery } from "@tanstack/react-query";
import type { DealsProduct } from "@shared/SchemaProduct";
import { API_CONFIG } from "@/config/api";

export function useDealsProducts(limit: number = 20) {
  return useQuery<DealsProduct[], Error>({
    queryKey: ["products", "deals", limit],
    queryFn: async () => {
      const url = new URL(`${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.ALL}`);
      url.searchParams.append("limit", String(limit));

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Error al cargar productos en oferta");
      
      let data = (await res.json()) as DealsProduct[];
      
      if (data.length > limit) {
        data = data.slice(0, limit);
      }
      
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

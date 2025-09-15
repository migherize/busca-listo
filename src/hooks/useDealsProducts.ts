import { useQuery } from "@tanstack/react-query";
import type { DealsProduct } from "@shared/SchemaProduct";
import { API_CONFIG } from "@/config/api";

export function useDealsProducts(limit: number = 20) {
  return useQuery<DealsProduct[], Error>({
    queryKey: ["products", "deals", limit],
    queryFn: async () => {
      try {
        const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.DEALS}?limit=${limit}`;
        console.log("Fetching useDealsProducts:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar productos en oferta");
        
        let data = (await res.json()) as DealsProduct[];
        
        if (data.length > limit) {
          data = data.slice(0, limit);
        }
        
        return data;
      } catch (error) {
        // Si hay error en la API, lanzar el error para que se maneje en el componente
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

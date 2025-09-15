import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "@/config/api";

export function useAllStores() {
  return useQuery<any[], Error>({
    queryKey: ["stores", "all"],
    queryFn: async () => {
      const url = `${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.COMPANIES.ALL}`;
      console.log("Fetching useAllStores:", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al cargar tiendas");
      const data = (await res.json()) as any[];
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 20 * 60 * 1000, // 20 minutos
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
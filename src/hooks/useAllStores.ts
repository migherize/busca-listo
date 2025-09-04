import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";

interface StoreData {
  id: number;
  name: string;
  phone?: string;
  logo?: string;
  location_name?: string;
  branches_count: number;
  products_count: number;
  created_at?: string;
  active: boolean;
}

export function useAllStores() {
  return useQuery<StoreData[]>({
    queryKey: ["stores", "all"],
    queryFn: async () => {
      const response = await apiService.getAllStores();
      if (!response.success) {
        throw new Error(response.error || "Error al cargar las tiendas");
      }
      return response.data;
    },
    retry: 3, // Reintentar 3 veces en caso de error
    retryDelay: 1000, // Esperar 1 segundo entre reintentos
    staleTime: 5 * 60 * 1000, // Los datos son válidos por 5 minutos
  });
}

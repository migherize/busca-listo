import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { apiService } from "@/services/apiService";

export function useProductsByCompany(companyName: string, categoryId?: number) {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "company", companyName, categoryId],
    queryFn: async () => {
      const response = await apiService.getProductsByCompany(companyName, categoryId);
      if (!response.success) {
        throw new Error(response.error || `Error al cargar productos de la empresa ${companyName}`);
      }
      return response.data;
    },
    enabled: !!companyName, // Solo ejecutar si hay companyName
    retry: 3, // Reintentar 3 veces en caso de error
    retryDelay: 1000, // Esperar 1 segundo entre reintentos
    staleTime: 2 * 60 * 1000, // Los datos son válidos por 2 minutos
  });
}

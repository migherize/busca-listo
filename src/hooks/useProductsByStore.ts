import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { apiService } from "@/services/apiService";

export function useProductsByStore(supplierId: string, category?: string) {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "store", supplierId, category],
    queryFn: async () => {
      const response = await apiService.getProductsByStore(supplierId, category);
      if (!response.success) {
        throw new Error(response.error || `Error al cargar productos de la tienda ${supplierId}`);
      }
      return response.data;
    },
    enabled: !!supplierId, // Solo ejecutar si hay supplierId
  });
}

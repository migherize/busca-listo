import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

export function useProductsByStore(supplierId: string, category?: string) {
  return useQuery<BaseProduct[]>({
    queryKey: ["products", "store", supplierId, category],
    queryFn: async () => {
      const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_STORE}/${supplierId}`;
      const params: Record<string, string | number> = {};
      if (category) params.categoria = category;
      
      const url = buildApiUrl(endpoint, params);
      console.log("Fetching useProductsByStore:", url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar productos de la tienda ${supplierId}: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    },
    enabled: !!supplierId, // Solo ejecutar si hay supplierId
  });
}

import { useQuery } from "@tanstack/react-query";
import type { DealsProduct } from "@shared/SchemaProduct";
import { API_CONFIG } from "@/config/api";
import dealsData from "@/data/product-deals.json";

export function useDealsProducts(limit: number = 20) {
  return useQuery<DealsProduct[], Error>({
    queryKey: ["products", "deals", limit],
    queryFn: async () => {
      try {
        const url = new URL(`${API_CONFIG.HOST}${API_CONFIG.ENDPOINTS.PRODUCTS.DEALS}`);
        url.searchParams.append("limit", String(limit));

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Error al cargar productos en oferta");
        
        let data = (await res.json()) as DealsProduct[];
        
        if (data.length > limit) {
          data = data.slice(0, limit);
        }
        
        console.log(`✅ Productos en oferta cargados desde API: ${data.length} productos`);
        return data;
      } catch (error) {
        console.warn("⚠️ API no disponible, cargando datos locales:", error);
        
        let localData = dealsData as DealsProduct[];
        
        localData = localData.filter(product => {
          const hasOfferPrice = (product.price_offer_usd !== null && product.price_offer_usd !== undefined) || 
                               (product.price_offer_bs !== null && product.price_offer_bs !== undefined);
          const hasDiscount = product.discount_percent !== null && 
                             product.discount_percent !== undefined && 
                             product.discount_percent > 0;
          
          return hasOfferPrice || hasDiscount;
        });
        
        if (localData.length > limit) {
          localData = localData.slice(0, limit);
        }
        
        console.log(`📁 Productos en oferta cargados desde datos locales: ${localData.length} productos`);
        console.log(`📊 Productos filtrados con ofertas activas:`, localData.map(p => ({ 
          id: p.id, 
          name: p.name, 
          discount: p.discount_percent,
          offer_price_bs: p.price_offer_bs,
          offer_price_usd: p.price_offer_usd
        })));
        
        return localData;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

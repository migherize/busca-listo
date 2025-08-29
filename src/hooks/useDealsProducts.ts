import { useQuery } from "@tanstack/react-query";
import type { DealsProduct } from "@shared/SchemaProduct";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

export function useDealsProducts(limit?: number) {
  return useQuery<DealsProduct[]>({
    queryKey: ["products", "deals", limit],
    queryFn: async () => {
      const response = await apiService.getDealsProducts(limit);
      if (!response.success) {
        throw new Error(response.error || "Error al cargar productos en oferta");
      }
      
      // Convertir de Product (apiService) a DealsProduct (nuevo esquema)
      const dealsProducts: DealsProduct[] = response.data.map((product: Product) => ({
        id: parseInt(product.id),
        name: product.name,
        brand_name: product.brand_name,
        price_bs: product.price,
        price_usd: product.priceUSD || 0,
        price_offer: product.offerPrice,
        image_url: product.image_url,
        offer_description: product.offerDescription,
        in_stock: product.stock,
        active: product.isActive,
        views: product.views,
        created_at: product.createdAt,
        subcategory_id: undefined,
        subcategory_name: product.subcategory,
        branch_id: undefined,
      }));
      
      return dealsProducts;
    },
  });
}

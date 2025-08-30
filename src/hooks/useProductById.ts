import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "@shared/SchemaProduct";

export function useProductById(productId: string) {
  return useQuery<BaseProduct>({
    queryKey: ["product", productId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const genericProduct: BaseProduct = {
        id: parseInt(productId),
        name: `Producto ${productId} - Nombre Genérico`,
        brand_id: null,
        brand_name: "Marca Genérica",
        subcategory_id: null,
        subcategory_name: "general",
        price_bs: 1500,
        price_usd: 15,
        in_stock: 50,
        active: true,
        views: 500,
        created_at: "2025-01-01T00:00:00.000Z",
        imagenes: [
          "/assets/logo1.jpeg",
          "/assets/logo2.jpeg"
        ],
        offer_description: "Descripción genérica de la oferta del producto",
        branch_id: null,
        url: `https://buscalisto.com/product/${productId}`,
        price_offer_usd: 12,
        price_offer_bs: 1200,
        discount_percent: 20,
        characteristics: "Características genéricas del producto",
        advancedCharacteristics: "Detalles técnicos generales",
        accessories: "Accesorios incluidos de forma genérica",
        highlightedFeatures: "Características destacadas genéricas",
        pros: "Ventajas genéricas del producto",
        cons: "Limitaciones o consideraciones generales",
        category: "Categoria Genérica",
        supplier: "Proveedor Genérico",
      };
      console.log(genericProduct);
      return genericProduct;
    },
    enabled: !!productId,
  });
}



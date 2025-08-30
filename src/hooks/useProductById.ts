import { useQuery } from "@tanstack/react-query";
import type { detailsProduct } from "@shared/SchemaProduct";

export function useProductById(productId: string) {
  return useQuery<detailsProduct>({
    queryKey: ["product", productId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const genericProduct: detailsProduct = {
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
        supplier_id: 10,
        supplier_name: "Proveedor Genérico",
        supplier_address: "Dirección Genérica, Ciudad, País",
        supplier_phone: "+00-000-0000000",
        supplier_email: "info@proveedorgenerico.com",
        supplier_website: "https://www.proveedorgenerico.com",
        supplier_hours: "Lunes a Viernes: 9:00 AM - 6:00 PM",
        supplier_rating: 3.5,
        supplier_reviews: 0,
        mockComments: [
          {
            id: 1,
            product_id: parseInt(productId),
            user_name: "María González",
            user_avatar: "/assets/avatar1.jpg",
            rating: 5,
            comment: "Excelente producto, muy buena calidad y llegó en perfectas condiciones. Lo recomiendo totalmente.",
            created_at: "2025-01-15T10:30:00Z",
            helpful_votes: 12,
            is_verified_purchase: true,
          },
          {
            id: 2,
            product_id: parseInt(productId),
            user_name: "Carlos Rodríguez",
            user_avatar: "/assets/avatar2.jpg",
            rating: 4,
            comment: "Buen producto, cumple con lo esperado. El envío fue rápido y el precio está bien.",
            created_at: "2025-01-12T14:20:00Z",
            helpful_votes: 8,
            is_verified_purchase: true,
          },
          {
            id: 3,
            product_id: parseInt(productId),
            user_name: "Ana Martínez",
            user_avatar: "/assets/avatar3.jpg",
            rating: 5,
            comment: "Super satisfecha con la compra. El producto es exactamente como se describe y la atención fue excelente.",
            created_at: "2025-01-10T09:15:00Z",
            helpful_votes: 15,
            is_verified_purchase: true,
          },
          {
            id: 4,
            product_id: parseInt(productId),
            user_name: "Luis Pérez",
            user_avatar: "/assets/avatar4.jpg",
            rating: 3,
            comment: "El producto está bien, pero tardó más de lo esperado en llegar. La calidad es aceptable.",
            created_at: "2025-01-08T16:45:00Z",
            helpful_votes: 3,
            is_verified_purchase: false,
          },
          {
            id: 5,
            product_id: parseInt(productId),
            user_name: "Isabella Silva",
            user_avatar: "/assets/avatar5.jpg",
            rating: 5,
            comment: "Increíble producto! Superó mis expectativas. La tienda es muy confiable y los precios son justos.",
            created_at: "2025-01-05T11:00:00Z",
            helpful_votes: 20,
            is_verified_purchase: true,
          },
        ],
      };
      console.log(genericProduct);
      return genericProduct;
    },
    enabled: !!productId,
  });
}



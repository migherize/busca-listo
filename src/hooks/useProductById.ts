import { useQuery } from "@tanstack/react-query";
import type { detailsProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

export function useProductById(productId: string) {
  return useQuery<detailsProduct>({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        // Intentar obtener el producto detallado desde la API
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL}/${productId}/detail`);
        const response = await fetch(url);
        
        if (response.ok) {
          const apiResponse = await response.json();
          console.log("Producto obtenido de la API:", apiResponse);
          
          // Mapear la estructura del backend al formato esperado por el frontend
          const { product, pricing, company, meta } = apiResponse;
          
          console.log("Datos del backend:", { product, pricing, company, meta });
          
          const detailsProduct: detailsProduct = {
            id: product.id,
            name: product.name,
            brand_id: product.brand_id,
            brand_name: product.brand_name,
            subcategory_id: product.subcategory_id,
            subcategory_name: product.subcategory_name,
            price_bs: pricing.price_bs,
            price_usd: pricing.price_usd,
            in_stock: product.in_stock,
            active: product.active,
            views: meta.views,
            created_at: meta.created_at,
            imagenes: product.imagenes || [],
            offer_description: pricing.offer_description,
            branch_id: product.branch_id,
            url: meta.url,
            price_offer_usd: pricing.price_offer_usd,
            price_offer_bs: pricing.price_offer_bs,
            discount_percent: pricing.discount_percent,
            characteristics: product.characteristics,
            advancedCharacteristics: product.advancedCharacteristics,
            accessories: product.accessories,
            highlightedFeatures: product.highlightedFeatures,
            pros: product.pros,
            cons: product.cons,
            category: product.category,
            supplier_id: company.supplier_id,
            supplier_name: company.supplier_name,
            supplier_address: company.supplier_address,
            supplier_phone: company.supplier_phone,
            supplier_email: company.supplier_email,
            supplier_website: company.supplier_website,
            supplier_hours: company.supplier_hours,
            supplier_rating: company.supplier_rating,
            supplier_reviews: company.supplier_reviews,
            mockComments: meta.mockComments || [],
          };
          
          console.log("Producto mapeado:", detailsProduct);
          return detailsProduct;
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.warn("Error al obtener producto de la API, usando fallback:", error);
        
        // Fallback: generar producto mockup
        const detailsProduct: detailsProduct = {
          id: parseInt(productId),
          name: `Producto ${productId}`,
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
          imagenes: ["/assets/logo1.jpeg", "/assets/logo2.jpeg"],
          offer_description: "Descripción del producto",
          branch_id: null,
          url: `https://buscalisto.com/product/${productId}`,
          price_offer_usd: null,
          price_offer_bs: null,
          discount_percent: null,
          characteristics: "Características del producto",
          advancedCharacteristics: "Detalles técnicos",
          accessories: "Accesorios incluidos",
          highlightedFeatures: "Características destacadas",
          pros: "Ventajas del producto",
          cons: "Consideraciones importantes",
          category: "Categoría General",
          supplier_id: 10,
          supplier_name: "Proveedor",
          supplier_address: "Dirección del proveedor",
          supplier_phone: "+00-000-0000000",
          supplier_email: "info@proveedor.com",
          supplier_website: "https://www.proveedor.com",
          supplier_hours: "Lunes a Viernes: 9:00 AM - 6:00 PM",
          supplier_rating: 4.0,
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
          ],
        };
        console.log("Producto fallback generado:", detailsProduct);
        return detailsProduct;
      }
    },
    enabled: !!productId,
  });
}



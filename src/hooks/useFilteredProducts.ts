import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { apiService } from "@/services/apiService";

interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: string;
  inStock?: boolean;
  availableOnline?: boolean;
  requirePrescription?: boolean;
  supplier_name?: string;
}

interface UseFilteredProductsParams {
  filters: ProductFilters;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useFilteredProducts({ 
  filters, 
  page = 1, 
  limit = 20, 
  sortBy, 
  sortOrder = 'desc' 
}: UseFilteredProductsParams) {
  return useQuery<{ products: Product[]; total: number; totalPages: number }>({
    queryKey: ["products", "filtered", filters, page, limit, sortBy, sortOrder],
    queryFn: async () => {
      // Por ahora, usamos getAllProducts con filtros básicos
      // En el futuro, podemos implementar filtros más avanzados en el servicio
      const response = await apiService.getAllProducts({ 
        page, 
        limit, 
        category: filters.category, 
        sortBy, 
        sortOrder 
      });
      
      if (!response.success) {
        throw new Error(response.error || "Error al filtrar productos");
      }
      
      // Aplicar filtros adicionales en el cliente si es necesario
      let filteredProducts = response.data.products;
      
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => 
          p.brand.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => 
          filters.inStock ? p.stock > 0 : true
        );
      }
      
      return {
        products: filteredProducts,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
      };
    },
    enabled: Object.keys(filters).some(key => filters[key as keyof ProductFilters] !== undefined),
  });
}

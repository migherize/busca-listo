import type { BaseProduct } from "@shared/SchemaProduct";
import { API_CONFIG, buildApiUrl } from "@/config";

// Interfaz para respuestas de la API
interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Interfaz para respuestas paginadas
interface PaginatedResponse<T> {
  products: T[];
  total: number;
  totalPages: number;
}

// Servicio principal de API
export const apiService = {
  // Productos recientes
  async getRecentProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.RECENT, limit ? { limit } : undefined);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos recientes: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getRecentProducts:", error);
      throw error;
    }
  },

  // Productos más vistos
  async getMostViewedProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.MOST_VIEWED, limit ? { limit } : undefined);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos más vistos: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getMostViewedProducts:", error);
      throw error;
    }
  },

  // Productos en oferta
  async getDealsProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.DEALS, limit ? { limit } : undefined);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos en oferta: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getDealsProducts:", error);
      throw error;
    }
  },

  // Productos por categoría
  async getProductsByCategory(category: string, limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_CATEGORY}/${category}`;
      const url = buildApiUrl(endpoint, limit ? { limit } : undefined);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos por categoría: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getProductsByCategory:", error);
      throw error;
    }
  },

  // Productos por tienda
  async getProductsByStore(supplierId: string, category?: string, limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_STORE}/${supplierId}`;
      const params: Record<string, string | number> = {};
      if (category) params.categoria = category;
      if (limit) params.limit = limit;
      
      const url = buildApiUrl(endpoint, params);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos por tienda: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getProductsByStore:", error);
      throw error;
    }
  },

  // Productos por empresa
  async getProductsByCompany(companyName: string, categoryId?: number, limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_COMPANY}/${encodeURIComponent(companyName)}`;
      const params: Record<string, string | number> = {};
      if (categoryId) params.category_id = categoryId;
      if (limit) params.limit = limit;
      
      const url = buildApiUrl(endpoint, params);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos por empresa: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getProductsByCompany:", error);
      throw error;
    }
  },

  // Búsqueda de productos
  async searchProducts(
    searchTerm: string, 
    category?: string, 
    limit?: number,
    page?: number,
    sortBy?: string,
    sortOrder?: string
  ): Promise<ApiResponse<any>> {
    try {
      const params: Record<string, string | number> = {};
      if (searchTerm) params.q = searchTerm;
      if (category) params.categoria = category;
      if (limit) params.limit = limit;
      if (page) params.page = page;
      if (sortBy) params.sort_by = sortBy;
      if (sortOrder) params.sort_order = sortOrder;
      
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH, params);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error en búsqueda: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en searchProducts:", error);
      throw error;
    }
  },

  // Todos los productos con paginación
  async getAllProducts(options: {
    page?: number;
    limit?: number;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<PaginatedResponse<BaseProduct>>> {
    try {
      const params: Record<string, string | number> = {
        page: options.page || 1,
        limit: options.limit || 20,
        orden: options.sortOrder || 'desc',
      };
      
      if (options.category) params.categoria = options.category;
      if (options.sortBy) params.ordenarPor = options.sortBy;
      
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL, params);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getAllProducts:", error);
      throw error;
    }
  },

  // Obtener todas las tiendas/empresas
  async getAllStores(): Promise<ApiResponse<any[]>> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.ALL);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar tiendas: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getAllStores:", error);
      throw error;
    }
  },

  // Categorías populares
  async getPopularCategories(limit?: number): Promise<ApiResponse<any[]>> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORIES.ALL, limit ? { limit } : undefined);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar categorías populares: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getPopularCategories:", error);
      throw error;
    }
  },

  // Obtener producto por ID
  async getProductById(productId: string): Promise<ApiResponse<BaseProduct>> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS.ALL}/${productId}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al cargar producto: ${response.status}`);
      }
      
      const data = await response.json();
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getProductById:", error);
      throw error;
    }
  },
};
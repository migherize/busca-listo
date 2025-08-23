import { mockProducts } from "@/mockProducts";
import type { Product } from "@shared/schema";
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

// Función helper para verificar si la API está disponible
async function isApiAvailable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
    
    const response = await fetch(buildApiUrl("/health"), { 
      signal: controller.signal,
      method: 'HEAD' // Solo verificar si responde, no descargar contenido
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn("API no disponible, usando datos mockup:", error);
    return false;
  }
}

// Función helper para obtener productos mockup con filtros
function getMockProducts(options: {
  limit?: number;
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Product[] {
  let filteredProducts = [...mockProducts];
  
  const { limit, category, searchTerm, sortBy, sortOrder } = options;
  
  // Filtrar por categoría
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Filtrar por término de búsqueda
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.subcategory.toLowerCase().includes(searchLower)
    );
  }
  
  // Ordenar
  if (sortBy) {
    filteredProducts.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];
      
      // Manejar valores undefined
      if (aValue === undefined) aValue = '';
      if (bValue === undefined) bValue = '';
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
  }
  
  // Aplicar límite
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }
  
  return filteredProducts;
}

// Función helper para simular delay de API
function simulateApiDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Servicio principal de API con fallback
export const apiService = {
  // Productos recientes
  async getRecentProducts(limit?: number): Promise<ApiResponse<Product[]>> {
    try {
      if (await isApiAvailable()) {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.RECENT, limit ? { limit } : undefined);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup
      await simulateApiDelay();
      const mockData = getMockProducts({ limit, sortBy: 'id', sortOrder: 'desc' });
      return { data: mockData, success: true };
      
    } catch (error) {
      console.error("Error en getRecentProducts:", error);
      // Fallback a mockup en caso de error
      const mockData = getMockProducts({ limit, sortBy: 'id', sortOrder: 'desc' });
      return { data: mockData, success: true };
    }
  },

  // Productos más vistos
  async getMostViewedProducts(limit?: number): Promise<ApiResponse<Product[]>> {
    try {
      if (await isApiAvailable()) {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.MOST_VIEWED, limit ? { limit } : undefined);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup
      await simulateApiDelay();
      const mockData = getMockProducts({ limit, sortBy: 'views', sortOrder: 'desc' });
      return { data: mockData, success: true };
      
    } catch (error) {
      console.error("Error en getMostViewedProducts:", error);
      const mockData = getMockProducts({ limit, sortBy: 'views', sortOrder: 'desc' });
      return { data: mockData, success: true };
    }
  },

  // Productos en oferta
  async getDealsProducts(limit?: number): Promise<ApiResponse<Product[]>> {
    try {
      if (await isApiAvailable()) {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.DEALS, limit ? { limit } : undefined);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup - filtrar productos con oferta
      await simulateApiDelay();
      const allProducts = getMockProducts();
      const dealsProducts = allProducts.filter(p => p.offerPrice !== null && p.offerPrice !== undefined);
      const mockData = dealsProducts.slice(0, limit || dealsProducts.length);
      return { data: mockData, success: true };
      
    } catch (error) {
      console.error("Error en getDealsProducts:", error);
      const allProducts = getMockProducts();
      const dealsProducts = allProducts.filter(p => p.offerPrice !== null && p.offerPrice !== undefined);
      const mockData = dealsProducts.slice(0, limit || dealsProducts.length);
      return { data: mockData, success: true };
    }
  },

  // Productos por categoría
  async getProductsByCategory(category: string, limit?: number): Promise<ApiResponse<Product[]>> {
    try {
      if (await isApiAvailable()) {
        const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_CATEGORY}/${category}`;
        const url = buildApiUrl(endpoint, limit ? { limit } : undefined);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup
      await simulateApiDelay();
      const mockData = getMockProducts({ limit, category });
      return { data: mockData, success: true };
      
    } catch (error) {
      console.error("Error en getProductsByCategory:", error);
      const mockData = getMockProducts({ limit, category });
      return { data: mockData, success: true };
    }
  },

  // Búsqueda de productos
  async searchProducts(searchTerm: string, category?: string, limit?: number): Promise<ApiResponse<Product[]>> {
    try {
      if (await isApiAvailable()) {
        const params: Record<string, string | number> = {};
        if (searchTerm) params.q = searchTerm;
        if (category) params.categoria = category;
        if (limit) params.limit = limit;
        
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH, params);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup
      await simulateApiDelay();
      const mockData = getMockProducts({ limit, category, searchTerm });
      return { data: mockData, success: true };
      
    } catch (error) {
      console.error("Error en searchProducts:", error);
      const mockData = getMockProducts({ limit, category, searchTerm });
      return { data: mockData, success: true };
    }
  },

  // Todos los productos con paginación
  async getAllProducts(options: {
    page?: number;
    limit?: number;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse<PaginatedResponse<Product>>> {
    try {
      if (await isApiAvailable()) {
        const params: Record<string, string | number> = {
          page: options.page || 1,
          limit: options.limit || 20,
          orden: options.sortOrder || 'desc',
        };
        
        if (options.category) params.categoria = options.category;
        if (options.sortBy) params.ordenarPor = options.sortBy;
        
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL, params);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup
      await simulateApiDelay();
      const allProducts = getMockProducts({ 
        category: options.category, 
        sortBy: options.sortBy, 
        sortOrder: options.sortOrder 
      });
      
      const page = options.page || 1;
      const limit = options.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedData: PaginatedResponse<Product> = {
        products: allProducts.slice(startIndex, endIndex),
        total: allProducts.length,
        totalPages: Math.ceil(allProducts.length / limit),
      };
      
      return { data: paginatedData, success: true };
      
    } catch (error) {
      console.error("Error en getAllProducts:", error);
      const allProducts = getMockProducts({ 
        category: options.category, 
        sortBy: options.sortBy, 
        sortOrder: options.sortOrder 
      });
      
      const page = options.page || 1;
      const limit = options.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedData: PaginatedResponse<Product> = {
        products: allProducts.slice(startIndex, endIndex),
        total: allProducts.length,
        totalPages: Math.ceil(allProducts.length / limit),
      };
      
      return { data: paginatedData, success: true };
    }
  },

  // Categorías populares (mockup por ahora)
  async getPopularCategories(limit?: number): Promise<ApiResponse<any[]>> {
    try {
      if (await isApiAvailable()) {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.CATEGORIES.POPULAR, limit ? { limit } : undefined);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup - categorías hardcodeadas por ahora
      await simulateApiDelay();
      const mockCategories = [
        { key: "medicamentos", name: "Medicamentos", imageUrl: "/assets/medicamentos.jpeg", productCount: 150 },
        { key: "cosmeticos", name: "Cosméticos", imageUrl: "/assets/defaultcategory.jpeg", productCount: 89 },
        { key: "vitaminas", name: "Vitaminas", imageUrl: "/assets/defaultcategory.jpeg", productCount: 67 },
        { key: "higiene", name: "Higiene Personal", imageUrl: "/assets/defaultcategory.jpeg", productCount: 45 },
        { key: "bebes", name: "Bebés y Niños", imageUrl: "/assets/defaultcategory.jpeg", productCount: 34 },
        { key: "dermatologicos", name: "Dermatológicos", imageUrl: "/assets/defaultcategory.jpeg", productCount: 28 },
      ];
      
      const data = limit ? mockCategories.slice(0, limit) : mockCategories;
      return { data, success: true };
      
    } catch (error) {
      console.error("Error en getPopularCategories:", error);
      const mockCategories = [
        { key: "medicamentos", name: "Medicamentos", imageUrl: "/assets/medicamentos.jpeg", productCount: 150 },
        { key: "cosmeticos", name: "Cosméticos", imageUrl: "/assets/defaultcategory.jpeg", productCount: 89 },
        { key: "vitaminas", name: "Vitaminas", imageUrl: "/assets/defaultcategory.jpeg", productCount: 67 },
        { key: "higiene", name: "Higiene Personal", imageUrl: "/assets/defaultcategory.jpeg", productCount: 45 },
        { key: "bebes", name: "Bebés y Niños", imageUrl: "/assets/defaultcategory.jpeg", productCount: 34 },
        { key: "dermatologicos", name: "Dermatológicos", imageUrl: "/assets/defaultcategory.jpeg", productCount: 28 },
      ];
      
      const data = limit ? mockCategories.slice(0, limit) : mockCategories;
      return { data, success: true };
    }
  },
};

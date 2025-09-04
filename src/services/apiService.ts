import { mockProducts } from "@/mockProducts";
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

// Función helper para verificar si la API está disponible
// Función para verificar si la API está disponible
async function isApiAvailable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(buildApiUrl("/"), { 
      signal: controller.signal,
      method: 'HEAD'
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
} = {}): BaseProduct[] {
  let filteredProducts = [...mockProducts];
  
  const { limit, category, searchTerm, sortBy, sortOrder } = options;
  
  // Filtrar por categoría
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.subcategory_name === category);
  }
  
  // Filtrar por término de búsqueda
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      (p.name?.toLowerCase().includes(searchLower) || false) ||
      (p.brand_name?.toLowerCase().includes(searchLower) || false) ||
      (p.subcategory_name?.toLowerCase().includes(searchLower) || false)
    );
  }
  
  // Ordenar
  if (sortBy) {
    filteredProducts.sort((a, b) => {
      let aValue: any = a[sortBy as keyof BaseProduct];
      let bValue: any = b[sortBy as keyof BaseProduct];
      
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
  async getRecentProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>> {
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
  async getMostViewedProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>> {
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
  async getDealsProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>> {
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
      const dealsProducts = allProducts.filter(p => p.price_offer_bs !== null && p.price_offer_bs !== undefined);
      const mockData = dealsProducts.slice(0, limit || dealsProducts.length);
      return { data: mockData, success: true };
      
    } catch (error) {
      console.error("Error en getDealsProducts:", error);
      const allProducts = getMockProducts();
      const dealsProducts = allProducts.filter(p => p.price_offer_bs !== null && p.price_offer_bs !== undefined);
      const mockData = dealsProducts.slice(0, limit || dealsProducts.length);
      return { data: mockData, success: true };
    }
  },

  // Productos por categoría
  async getProductsByCategory(category: string, limit?: number): Promise<ApiResponse<BaseProduct[]>> {
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

  // Productos por tienda
  async getProductsByStore(supplierId: string, category?: string, limit?: number): Promise<ApiResponse<BaseProduct[]>> {
    try {
      if (await isApiAvailable()) {
        const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_STORE}/${supplierId}`;
        const params: Record<string, string | number> = {};
        if (category) params.categoria = category;
        if (limit) params.limit = limit;
        
        const url = buildApiUrl(endpoint, params);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup - filtrar por supplier_id
      await simulateApiDelay();
      const allProducts = getMockProducts();
      let filteredProducts = allProducts.filter(p => p.supplier_id?.toString() === supplierId.toString());
      
      // Filtrar por categoría si se especifica
      if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subcategory_name === category);
      }
      
      // Aplicar límite
      if (limit) {
        filteredProducts = filteredProducts.slice(0, limit);
      }
      
      return { data: filteredProducts, success: true };
      
    } catch (error) {
      console.error("Error en getProductsByStore:", error);
      const allProducts = getMockProducts();
      let filteredProducts = allProducts.filter(p => p.supplier_id?.toString() === supplierId.toString());
      
      if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subcategory_name === category);
      }
      
      if (limit) {
        filteredProducts = filteredProducts.slice(0, limit);
      }
      
      return { data: filteredProducts, success: true };
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
      
      if (response.ok) {
        const data = await response.json();
        return { data, success: true };
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error en getProductsByCompany:", error);
      throw new Error(`Error al cargar productos de la empresa ${companyName}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
      console.log("🔍 Búsqueda URL:", url);
      console.log("🔍 Parámetros:", params);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log("🔍 Response status:", response.status);
      console.log("🔍 Response ok:", response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log("🔍 Response data:", data);
        return { data, success: true };
      } else {
        const errorText = await response.text();
        console.error("🔍 Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
    } catch (error) {
      console.error("Error en searchProducts:", error);
      
      // Fallback a mockup en caso de error
      console.log("🔄 Usando fallback a datos mock");
      const mockProducts = getMockProducts({ limit, category, searchTerm });
      const mockResponse = {
        products: mockProducts,
        total: mockProducts.length,
        page: page || 1,
        limit: limit || 20,
        total_pages: Math.ceil(mockProducts.length / (limit || 20)),
        search_term: searchTerm,
        category: category,
        sort_by: sortBy || "relevance",
        sort_order: sortOrder || "desc"
      };
      
      return { data: mockResponse, success: true };
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
      
      const paginatedData: PaginatedResponse<BaseProduct> = {
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
      
      const paginatedData: PaginatedResponse<BaseProduct> = {
        products: allProducts.slice(startIndex, endIndex),
        total: allProducts.length,
        totalPages: Math.ceil(allProducts.length / limit),
      };
      
      return { data: paginatedData, success: true };
    }
  },

  // Obtener todas las tiendas/empresas
  async getAllStores(): Promise<ApiResponse<any[]>> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.ALL);
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        return { data, success: true };
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error en getAllStores:", error);
      throw new Error(`Error al cargar las tiendas: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
        { key: "medicamentos", name: "Medicamentos", imageUrl: "/assets/medicamentos.jpeg", productCount: 100 },
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

  // Obtener producto por ID
  async getProductById(productId: string): Promise<ApiResponse<BaseProduct>> {
    try {
      if (await isApiAvailable()) {
        const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS.ALL}/${productId}`);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          return { data, success: true };
        }
      }
      
      // Fallback a mockup - generar producto mockup detallado
      await simulateApiDelay();
      
      // Buscar en productos mockup existentes
      let mockProduct = mockProducts.find(p => p.id?.toString() === productId);
      
      if (!mockProduct) {
        // Si no existe, crear un producto mockup completo basado en el ID
        const productTypes = [
          {
            name: "Paracetamol 500mg - Alivio del Dolor y Fiebre",
            brand: "Genérico",
            category: "medicamentos",
            subcategory_name: "analgésicos",
            price: 1250.00,
            price_offer_bs: 999.00,
            description: "El Paracetamol 500mg es un medicamento analgésico y antipirético ampliamente utilizado para aliviar el dolor leve a moderado y reducir la fiebre. Es especialmente efectivo para dolores de cabeza, dolores musculares, dolores de muelas, dolores menstruales y síntomas de resfriado o gripe.",
            characteristics: "• Alivio rápido del dolor leve a moderado\n• Reducción efectiva de la fiebre\n• Seguro para la mayoría de las personas\n• No causa irritación estomacal\n• Efectivo para dolores de cabeza y musculares\n• Ideal para síntomas de resfriado y gripe"
          },
          {
            name: "Ibuprofeno 400mg - Antiinflamatorio y Analgésico",
            brand: "Genérico",
            category: "medicamentos",
            subcategory_name: "antiinflamatorios",
            price: 1800.00,
            price_offer_bs: 1500.00,
            description: "El Ibuprofeno 400mg es un medicamento antiinflamatorio no esteroideo (AINE) que reduce la inflamación, el dolor y la fiebre. Es efectivo para dolores musculares, artritis, dolores de cabeza y cólicos menstruales.",
            characteristics: "• Reduce la inflamación y el dolor\n• Efectivo para dolores musculares\n• Alivia síntomas de artritis\n• Reduce la fiebre\n• Acción rápida y duradera\n• Disponible sin receta médica"
          },
          {
            name: "Vitamina C 1000mg - Refuerzo Inmunológico",
            brand: "Suplementos Plus",
            category: "vitaminas",
            subcategory_name: "inmunidad",
            price: 2200.00,
            price_offer_bs: null,
            description: "La Vitamina C 1000mg es un suplemento nutricional que fortalece el sistema inmunológico, actúa como antioxidante y ayuda en la formación de colágeno. Ideal para prevenir resfriados y mejorar la salud general.",
            characteristics: "• Fortalece el sistema inmunológico\n• Actúa como antioxidante\n• Ayuda en la formación de colágeno\n• Previene resfriados\n• Mejora la absorción de hierro\n• Apoya la salud de la piel"
          },
          {
            name: "Omeprazol 20mg - Protector Gástrico",
            brand: "Genérico",
            category: "medicamentos",
            subcategory_name: "gastrointestinal",
            price: 3200.00,
            price_offer_bs: 2800.00,
            description: "El Omeprazol 20mg es un medicamento que reduce la producción de ácido estomacal, aliviando la acidez, reflujo gastroesofágico y úlceras estomacales. Proporciona alivio prolongado y protección gástrica.",
            characteristics: "• Reduce la producción de ácido estomacal\n• Alivia la acidez y reflujo\n• Protege contra úlceras\n• Efecto prolongado de 24 horas\n• Seguro para uso a largo plazo\n• Mejora la calidad de vida"
          }
        ];
        
        // Seleccionar tipo de producto basado en el ID para variedad
        const productType = productTypes[parseInt(productId) % productTypes.length];
        
        mockProduct = {
          id: parseInt(productId) || 1,
          name: productType.name,
          brand_name: productType.brand,
          category: productType.category,
          subcategory_name: productType.subcategory_name,
          price_bs: productType.price,
          price_usd: productType.price / 100, // Conversión aproximada
          price_offer_bs: productType.price_offer_bs,
          image_url: "https://www.farmaciasnuevosiglo.com/img/articulos/8751041d-c1ae-4f8a-a318-e224e83ee08f.png",
          in_stock: Math.floor(Math.random() * 100) + 20, // Stock aleatorio entre 20-120
          url: `https://buscalisto.com/product/${productId}`,
          offer_description: productType.price_offer_bs ? "Oferta especial disponible" : null,
          supplier_name: "Farmacias Nuevo Siglo",
          views: Math.floor(Math.random() * 2000) + 100, // Vistas aleatorias entre 100-2100
          active: true,
          created_at: new Date().toISOString(),
        };
      }
      
      // Enriquecer el producto mockup con datos detallados
      const enrichedProduct: BaseProduct = {
        ...mockProduct,
        id: mockProduct?.id || 1,
        price_bs: mockProduct?.price_bs || 0,
        price_usd: mockProduct?.price_usd || 0,
      };
      
      return { data: enrichedProduct, success: true };
      
    } catch (error) {
      console.error("Error en getProductById:", error);
      throw error;
    }
  },
};


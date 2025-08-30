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
  async getProductById(productId: string): Promise<ApiResponse<Product>> {
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
      let mockProduct = mockProducts.find(p => p.id === productId);
      
      if (!mockProduct) {
        // Si no existe, crear un producto mockup completo basado en el ID
        const productTypes = [
          {
            name: "Paracetamol 500mg - Alivio del Dolor y Fiebre",
            brand: "Genérico",
            category: "medicamentos",
            subcategory: "analgésicos",
            price: 1250.00,
            offerPrice: 999.00,
            description: "El Paracetamol 500mg es un medicamento analgésico y antipirético ampliamente utilizado para aliviar el dolor leve a moderado y reducir la fiebre. Es especialmente efectivo para dolores de cabeza, dolores musculares, dolores de muelas, dolores menstruales y síntomas de resfriado o gripe.",
            characteristics: "• Alivio rápido del dolor leve a moderado\n• Reducción efectiva de la fiebre\n• Seguro para la mayoría de las personas\n• No causa irritación estomacal\n• Efectivo para dolores de cabeza y musculares\n• Ideal para síntomas de resfriado y gripe"
          },
          {
            name: "Ibuprofeno 400mg - Antiinflamatorio y Analgésico",
            brand: "Genérico",
            category: "medicamentos",
            subcategory: "antiinflamatorios",
            price: 1800.00,
            offerPrice: 1500.00,
            description: "El Ibuprofeno 400mg es un medicamento antiinflamatorio no esteroideo (AINE) que reduce la inflamación, el dolor y la fiebre. Es efectivo para dolores musculares, artritis, dolores de cabeza y cólicos menstruales.",
            characteristics: "• Reduce la inflamación y el dolor\n• Efectivo para dolores musculares\n• Alivia síntomas de artritis\n• Reduce la fiebre\n• Acción rápida y duradera\n• Disponible sin receta médica"
          },
          {
            name: "Vitamina C 1000mg - Refuerzo Inmunológico",
            brand: "Suplementos Plus",
            category: "vitaminas",
            subcategory: "inmunidad",
            price: 2200.00,
            offerPrice: null,
            description: "La Vitamina C 1000mg es un suplemento nutricional que fortalece el sistema inmunológico, actúa como antioxidante y ayuda en la formación de colágeno. Ideal para prevenir resfriados y mejorar la salud general.",
            characteristics: "• Fortalece el sistema inmunológico\n• Actúa como antioxidante\n• Ayuda en la formación de colágeno\n• Previene resfriados\n• Mejora la absorción de hierro\n• Apoya la salud de la piel"
          },
          {
            name: "Omeprazol 20mg - Protector Gástrico",
            brand: "Genérico",
            category: "medicamentos",
            subcategory: "gastrointestinal",
            price: 3200.00,
            offerPrice: 2800.00,
            description: "El Omeprazol 20mg es un medicamento que reduce la producción de ácido estomacal, aliviando la acidez, reflujo gastroesofágico y úlceras estomacales. Proporciona alivio prolongado y protección gástrica.",
            characteristics: "• Reduce la producción de ácido estomacal\n• Alivia la acidez y reflujo\n• Protege contra úlceras\n• Efecto prolongado de 24 horas\n• Seguro para uso a largo plazo\n• Mejora la calidad de vida"
          }
        ];
        
        // Seleccionar tipo de producto basado en el ID para variedad
        const productType = productTypes[parseInt(productId) % productTypes.length];
        
        mockProduct = {
          id: productId,
          name: productType.name,
          brand: productType.brand,
          category: productType.category,
          subcategory: productType.subcategory,
          price: productType.price,
          offerPrice: productType.offerPrice,
          imageUrl: "https://www.farmaciasnuevosiglo.com/img/articulos/8751041d-c1ae-4f8a-a318-e224e83ee08f.png",
          stock: Math.floor(Math.random() * 100) + 20, // Stock aleatorio entre 20-120
          url: `https://buscalisto.com/product/${productId}`,
          offerDescription: productType.offerPrice ? "Oferta especial disponible" : null,
          requirePrescription: Math.random() > 0.7, // 30% de probabilidad de requerir receta
          supplier_name: "Farmacias Nuevo Siglo",
          availableOnline: true,
          views: Math.floor(Math.random() * 2000) + 100, // Vistas aleatorias entre 100-2100
        };
      }
      
      // Enriquecer el producto mockup con datos detallados
      const enrichedProduct: Product = {
        ...mockProduct,
        // Múltiples imágenes para el carrusel
        imageUrls: [
          mockProduct.imageUrl,
          "https://www.farmaciasnuevosiglo.com/img/articulos/ab6c55bc-1305-4e73-bd77-348cbe71bb4e.png",
          "https://www.farmaciasnuevosiglo.com/img/articulos/f5dbac29-a87c-41ee-9ad3-8e75b8ec300d.png",
          "https://www.farmaciasnuevosiglo.com/img/articulos/c907a69f-8674-46f8-b3de-d19cb3326129.png",
        ],
        
        // Descripción detallada (usar la del tipo de producto si existe)
        description: mockProduct.description || `Descripción detallada de ${mockProduct.name}. Este producto ofrece soluciones efectivas para las necesidades de salud más comunes, con calidad farmacéutica garantizada y precios accesibles para todos.`,
        
        // Características principales (usar las del tipo de producto si existen)
        characteristics: mockProduct.characteristics || `• Producto de alta calidad\n• Efectividad comprobada\n• Seguro para el consumo\n• Disponible sin receta médica\n• Precio accesible\n• Respaldado por años de experiencia`,
        
        // Características avanzadas
        advancedCharacteristics: `• Fórmula de liberación controlada\n• Metabolización segura y eficiente\n• Vida media optimizada\n• Alta biodisponibilidad\n• Compatibilidad farmacológica\n• Mínimas interacciones medicamentosas`,
        
        // Accesorios
        accessories: `• Empaque original del fabricante\n• Prospecto informativo completo\n• Instrucciones de uso detalladas\n• Información de seguridad\n• Fecha de caducidad visible\n• Lote de fabricación`,
        
        // Características destacadas
        highlightedFeatures: `• Acción rápida y efectiva\n• Seguridad comprobada\n• Calidad farmacéutica\n• Precio competitivo\n• Disponibilidad garantizada\n• Respaldo médico`,
        
        // Pros
        pros: `• Efectividad comprobada\n• Seguro para uso regular\n• No causa dependencia\n• Precio accesible\n• Fácil de conseguir\n• Mínimos efectos secundarios`,
        
        // Contras
        cons: `• Respetar dosis recomendadas\n• Consultar médico si persisten síntomas\n• No exceder uso prolongado\n• Mantener fuera del alcance de niños\n• Almacenar en lugar fresco y seco`,
        
        // Precios (generar variaciones realistas)
        historicalPrice: mockProduct.price * (0.85 + Math.random() * 0.3), // Entre 85% y 115% del precio actual
        priceUSD: mockProduct.price / (100 + Math.random() * 50), // Conversión variable
        
        // Metadatos
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Últimos 30 días
        createdBy: ["Dr. Carlos Méndez", "Dra. Ana Rodríguez", "Dr. Luis González"][Math.floor(Math.random() * 3)],
        isActive: true,
        code: `${mockProduct.category.substring(0, 3).toUpperCase()}-${productId}-${Math.floor(Math.random() * 1000)}`,
      };
      
      return { data: enrichedProduct, success: true };
      
    } catch (error) {
      console.error("Error en getProductById:", error);
      throw error;
    }
  },
};


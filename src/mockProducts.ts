import rawData from "./data/products.json";
import type { BaseProduct } from "@shared/SchemaProduct";

let productId = 1;
export const mockProducts: BaseProduct[] = [];

// Función para transformar datos del JSON a Product
function transformProductData(rawProduct: any, farmaciaName: string): Product | null {
  // Validar que el producto tenga precio
  if (!rawProduct.precio || !rawProduct.precio.bs_sin_oferta) {
    console.warn("Producto sin precio encontrado:", rawProduct);
    return null;
  }

  const price = parseFloat(rawProduct.precio.bs_sin_oferta);
  const offerPrice = rawProduct.precio.bs_con_oferta
    ? parseFloat(rawProduct.precio.bs_con_oferta)
    : null;

  return {
    id: (productId++).toString(),
    name: rawProduct.nombre,
    brand: rawProduct.compuesto || "Desconocido",
    category: "medicamentos",
    subcategory: rawProduct.tipo || "general",
    price,
    offerPrice,
    imageUrl: rawProduct.imagen?.[0] || "",
    stock: 50,
    url: rawProduct.url,
    offerDescription: rawProduct.oferta ? "Oferta disponible" : null,
    requirePrescription: rawProduct.necesario_recipe_medico,
    supplier_name: farmaciaName,
    availableOnline: true,
    views: rawProduct.views ? parseInt(rawProduct.views, 10) : undefined,
  };
}

// Función para cargar productos desde JSON
export function loadMockProducts(): Product[] {
  if (mockProducts.length > 0) {
    return mockProducts; // Ya cargados
  }

  try {
    // Procesar datos del JSON
    for (const [farmaciaName, farmaciaData] of Object.entries(rawData)) {
      const sucursales = (farmaciaData as any).sucursales;

      for (const sucursalData of Object.values(sucursales)) {
        const productos = (sucursalData as any).productos;

        for (const rawProduct of productos) {
          const product = transformProductData(rawProduct, farmaciaName);
          if (product) {
            mockProducts.push(product);
          }
        }
      }
    }

    console.log(`✅ ${mockProducts.length} productos mockup cargados desde JSON`);
    return mockProducts;
  } catch (error) {
    console.error("❌ Error cargando productos mockup:", error);
    return [];
  }
}

// Función para obtener productos con filtros
export function getMockProducts(options: {
  limit?: number;
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Product[] {
  const { limit, category, searchTerm, sortBy, sortOrder = 'desc' } = options;
  
  // Asegurar que los productos estén cargados
  if (mockProducts.length === 0) {
    loadMockProducts();
  }

  let filteredProducts = [...mockProducts];

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

// Función para obtener productos recientes
export function getRecentMockProducts(limit: number = 8): Product[] {
  return getMockProducts({ 
    limit, 
    sortBy: 'id', 
    sortOrder: 'desc' 
  });
}

// Función para obtener productos más vistos
export function getMostViewedMockProducts(limit: number = 8): Product[] {
  return getMockProducts({ 
    limit, 
    sortBy: 'views', 
    sortOrder: 'desc' 
  });
}

// Función para obtener productos en oferta
export function getDealsMockProducts(limit: number = 6): Product[] {
  const allProducts = getMockProducts();
  const productsWithOffers = allProducts.filter(p => p.offerPrice);
  
  return productsWithOffers
    .sort((a, b) => {
      const discountA = ((a.price - a.offerPrice!) / a.price) * 100;
      const discountB = ((b.price - b.offerPrice!) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, limit);
}

// Cargar productos al importar el módulo
loadMockProducts();

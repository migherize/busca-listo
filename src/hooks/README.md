# Hooks de Productos - BuscaListo

Esta carpeta contiene todos los hooks personalizados para manejar productos en la aplicación BuscaListo.

## Configuración Centralizada

Todos los hooks utilizan una configuración centralizada ubicada en `@/config/api.ts` que incluye:

- **API_HOST**: URL base de la API (configurable por variables de entorno)
- **ENDPOINTS**: Todos los endpoints de la API organizados por categoría
- **DEFAULTS**: Valores por defecto para paginación y límites
- **buildApiUrl**: Función helper para construir URLs con parámetros

## Sistema de Fallback a Mockup

### 🚀 **Características del Sistema de Fallback**

- **🔄 Detección Automática**: Verifica automáticamente si la API está disponible
- **📱 Datos Locales**: Usa datos mockup cuando la API no responde
- **⚡ Experiencia Fluida**: La aplicación nunca se cuelga, siempre muestra datos
- **🕐 Timeout Inteligente**: 5 segundos de timeout para evitar esperas largas
- **📊 Estado Visual**: Indicadores visuales del estado de la API
- **🔄 Reconexión Automática**: Verifica la API cada 30 segundos

### **📁 Estructura del Sistema**

```
src/
├── services/
│   └── apiService.ts          # Servicio principal con fallback
├── hooks/
│   ├── useApiStatus.ts        # Hook para estado de la API
│   └── ...                    # Hooks de productos actualizados
├── components/
│   └── common/
│       └── ApiStatusIndicator.tsx  # Indicador visual del estado
└── data/
    └── products.json          # Datos mockup de respaldo
```

### **🔧 Cómo Funciona**

1. **Verificación de API**: Cada hook intenta primero conectar a la API real
2. **Timeout de 5s**: Si la API no responde en 5 segundos, usa fallback
3. **Datos Mockup**: Utiliza los datos locales del archivo `products.json`
4. **Filtrado Inteligente**: Aplica los mismos filtros y ordenamiento a los datos mockup
5. **Experiencia Consistente**: El usuario no nota diferencia en la funcionalidad

## Hooks Disponibles

### 1. `useRecentProducts`
Obtiene los productos más recientes con fallback automático.

```tsx
import { useRecentProducts } from '@/hooks';

function MyComponent() {
  const { data: products, isLoading, error } = useRecentProducts(5);
  
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 2. `useMostViewedProducts`
Obtiene los productos más vistos con fallback automático.

```tsx
import { useMostViewedProducts } from '@/hooks';

function MyComponent() {
  const { data: products, isLoading, error } = useMostViewedProducts(4);
  // ... resto del código
}
```

### 3. `useDealsProducts`
Obtiene productos en oferta con fallback automático.

```tsx
import { useDealsProducts } from '@/hooks';

function MyComponent() {
  const { data: products, isLoading, error } = useDealsProducts(6);
  // ... resto del código
}
```

### 4. `useProductsByCategory`
Obtiene productos por categoría específica con fallback automático.

```tsx
import { useProductsByCategory } from '@/hooks';

function MyComponent() {
  const { data: products, isLoading, error } = useProductsByCategory('medicamentos', 20);
  // ... resto del código
}
```

### 5. `useSearchProducts`
Busca productos por término de búsqueda con fallback automático.

```tsx
import { useSearchProducts } from '@/hooks';

function MyComponent() {
  const { data: products, isLoading, error } = useSearchProducts('paracetamol', 'medicamentos');
  // ... resto del código
}
```

### 6. `useAllProducts`
Obtiene todos los productos con paginación y ordenamiento, con fallback automático.

```tsx
import { useAllProducts } from '@/hooks';

function MyComponent() {
  const { data, isLoading, error } = useAllProducts({
    page: 1,
    limit: 20,
    category: 'medicamentos',
    sortBy: 'price',
    sortOrder: 'asc'
  });
  
  const { products, total, totalPages } = data || {};
  // ... resto del código
}
```

### 7. `usePopularCategories`
Obtiene categorías populares con fallback automático.

```tsx
import { usePopularCategories } from '@/hooks';

function MyComponent() {
  const { data: categories, isLoading, error } = usePopularCategories(6);
  // ... resto del código
}
```

### 8. `useFilteredProducts`
Obtiene productos con filtros avanzados y fallback automático.

```tsx
import { useFilteredProducts } from '@/hooks';

function MyComponent() {
  const { data, isLoading, error } = useFilteredProducts({
    filters: {
      category: 'medicamentos',
      minPrice: 10,
      maxPrice: 100,
      inStock: true
    },
    page: 1,
    limit: 20
  });
  
  const { products, total, totalPages } = data || {};
  // ... resto del código
}
```

### 9. `useProductPagination`
Maneja la paginación de productos.

```tsx
import { useProductPagination } from '@/hooks';

function MyComponent() {
  const pagination = useProductPagination({
    totalItems: 100,
    itemsPerPage: 20,
    initialPage: 1
  });
  
  const { currentPage, totalPages, goToPage, pageNumbers } = pagination;
  
  return (
    <div>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && goToPage(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
```

### 10. `useProductFilters`
Maneja el estado de los filtros de productos.

```tsx
import { useProductFilters } from '@/hooks';

function MyComponent() {
  const {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    activeFiltersCount,
    getFilterSummary
  } = useProductFilters({
    category: 'medicamentos',
    sortBy: 'price'
  });
  
  const handleCategoryChange = (category: string) => {
    updateFilter('category', category);
  };
  
  return (
    <div>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="medicamentos">Medicamentos</option>
        <option value="cosmeticos">Cosméticos</option>
      </select>
      
      {hasActiveFilters && (
        <button onClick={resetFilters}>
          Limpiar filtros ({activeFiltersCount})
        </button>
      )}
      
      <div>
        {getFilterSummary().map((summary, index) => (
          <span key={index}>{summary}</span>
        ))}
      </div>
    </div>
  );
}
```

### 11. `useProductById` ⭐ **NUEVO**
Obtiene un producto individual por ID con fallback automático.

```tsx
import { useProductById } from '@/hooks';

function ProductDetail({ productId }: { productId: string }) {
  const { data: product, isLoading, error } = useProductById(productId);
  
  if (isLoading) return <div>Cargando producto...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Resto de la información del producto */}
    </div>
  );
}
```

### 12. `useApiStatus` ⭐ **NUEVO**
Detecta el estado de la API y proporciona indicadores visuales.

```tsx
import { useApiStatus, ApiStatusIndicator } from '@/hooks';

function MyComponent() {
  const { isAvailable, isChecking, getStatusMessage } = useApiStatus();
  
  return (
    <div>
      {/* Indicador completo */}
      <ApiStatusIndicator />
      
      {/* O usar directamente */}
      <div className="text-sm text-gray-600">
        Estado: {getStatusMessage()}
        {isAvailable ? '🟢' : '🟡'}
      </div>
    </div>
  );
}
```

## Página de Detalle del Producto 🆕

### **📱 Características de la Página**

- **🖼️ Carrusel de Imágenes**: Soporte para múltiples imágenes con vista fullscreen
- **💰 Información de Precios**: Precio actual, ofertas, histórico y USD
- **📋 Características Detalladas**: Principales, avanzadas, pros/cons, accesorios
- **💬 Sistema de Comentarios**: Reseñas con calificaciones y respuestas
- **📱 Diseño Responsivo**: Optimizado para móvil y desktop
- **🔄 Fallback Automático**: Funciona con API o datos mockup

### **🔗 URL de Acceso**

```
/product/{id}
```

Ejemplo: `/product/9` para el producto con ID 9

### **📁 Componentes de la Página**

```
src/
├── pages/
│   └── ProductDetail/
│       └── index.tsx          # Página principal
├── components/
│   └── products/
│       ├── ProductImageCarousel.tsx    # Carrusel de imágenes
│       ├── ProductFeatures.tsx         # Características del producto
│       ├── ProductPricing.tsx          # Información de precios
│       └── ProductComments.tsx         # Sistema de comentarios
```

### **🎨 Uso de la Página**

```tsx
import { ProductDetail } from '@/pages/ProductDetail';

// En tu router
<Route path="/product/:id" component={ProductDetail} />

// O navegar programáticamente
import { useLocation } from 'wouter';
const [, setLocation] = useLocation();

// Al hacer click en un producto
setLocation(`/product/${product.id}`);
```

## Características Comunes

Todos los hooks de productos comparten estas características:

- **React Query**: Utilizan `@tanstack/react-query` para caché y manejo de estado
- **Manejo de errores**: Incluyen manejo de errores consistente
- **Estados de carga**: Proporcionan estados de `isLoading` para UI
- **Query Keys**: Usan claves de consulta únicas para caché eficiente
- **Tipado TypeScript**: Completamente tipados con TypeScript
- **Configuración Centralizada**: Todos los endpoints y configuración en un solo lugar
- **🔄 Fallback Automático**: Nunca fallan, siempre devuelven datos (API o mockup)

## Configuración

### Variables de Entorno

Puedes configurar la URL de la API usando variables de entorno:

```bash
# .env.local
VITE_API_HOST=https://tu-api.com
```

### Configuración por Defecto

```tsx
import { API_CONFIG } from '@/hooks';

// Acceder a la configuración
console.log(API_CONFIG.HOST); // URL base de la API
console.log(API_CONFIG.ENDPOINTS.PRODUCTS.RECENT); // Endpoint de productos recientes
console.log(API_CONFIG.DEFAULTS.PAGE_SIZE); // Tamaño de página por defecto
```

### Función Helper buildApiUrl

```tsx
import { buildApiUrl } from '@/hooks';

// Construir URL con parámetros
const url = buildApiUrl('/productos', { 
  page: 1, 
  limit: 20, 
  category: 'medicamentos' 
});
// Resultado: https://api.com/productos?page=1&limit=20&category=medicamentos
```

## Indicadores de Estado de API

### Componente ApiStatusIndicator

```tsx
import { ApiStatusIndicator } from '@/components/common/ApiStatusIndicator';

function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>BuscaListo</h1>
      <ApiStatusIndicator />
    </header>
  );
}
```

### Componente ApiStatusDot (Compacto)

```tsx
import { ApiStatusDot } from '@/components/common/ApiStatusIndicator';

function CompactHeader() {
  return (
    <header className="flex justify-between items-center p-2">
      <h1>BL</h1>
      <ApiStatusDot />
    </header>
  );
}
```

## Uso en Componentes

Para usar estos hooks en tus componentes, simplemente impórtalos desde el archivo de índice:

```tsx
import { 
  useRecentProducts, 
  useMostViewedProducts, 
  useDealsProducts,
  useProductById,
  API_CONFIG,
  useApiStatus 
} from '@/hooks';
```

Esto te dará acceso a todos los hooks de productos, la configuración y el estado de la API con una sola importación.

## Estructura de Archivos

```
src/
├── config/
│   ├── api.ts          # Configuración centralizada de la API
│   └── index.ts        # Exportaciones de configuración
├── services/
│   ├── apiService.ts   # Servicio principal con fallback a mockup
│   └── index.ts        # Exportaciones de servicios
├── hooks/
│   ├── useRecentProducts.ts
│   ├── useMostViewedProducts.ts
│   ├── useDealsProducts.ts
│   ├── useProductsByCategory.ts
│   ├── useSearchProducts.ts
│   ├── useAllProducts.ts
│   ├── usePopularCategories.ts
│   ├── useFilteredProducts.ts
│   ├── useProductPagination.ts
│   ├── useProductFilters.ts
│   ├── useProductById.ts        # Hook para producto individual
│   ├── useApiStatus.ts          # Hook para estado de la API
│   ├── index.ts                 # Exportaciones de hooks
│   └── README.md                # Esta documentación
├── components/
│   ├── common/
│   │   └── ApiStatusIndicator.tsx  # Indicadores de estado de API
│   └── products/
│       ├── ProductImageCarousel.tsx # Carrusel de imágenes
│       ├── ProductFeatures.tsx      # Características del producto
│       ├── ProductPricing.tsx       # Información de precios
│       └── ProductComments.tsx      # Sistema de comentarios
├── pages/
│   └── ProductDetail/
│       └── index.tsx              # Página de detalle del producto
└── data/
    └── products.json              # Datos mockup de respaldo
```

## Ventajas del Sistema de Fallback

1. **🚀 Experiencia Ininterrumpida**: La app nunca se cuelga
2. **📱 Desarrollo Offline**: Puedes desarrollar sin API funcionando
3. **🔄 Transición Transparente**: El usuario no nota el cambio
4. **⚡ Performance**: Datos locales son más rápidos
5. **🛡️ Robustez**: Múltiples capas de fallback
6. **📊 Monitoreo**: Indicadores visuales del estado
7. **🔄 Reconexión Automática**: Se recupera cuando la API vuelve

## Campos del Producto Disponibles

### **Campos Básicos**
- `id`, `name`, `brand`, `category`, `subcategory`
- `price`, `offerPrice`, `imageUrl`, `stock`, `url`
- `requirePrescription`, `supplier`, `availableOnline`, `views`

### **Campos Extendidos** 🆕
- `imageUrls`: Array de imágenes para carrusel
- `description`: Descripción detallada del producto
- `characteristics`: Características principales
- `advancedCharacteristics`: Características avanzadas
- `accessories`: Accesorios incluidos
- `highlightedFeatures`: Características destacadas
- `pros`: Ventajas del producto
- `cons`: Consideraciones
- `historicalPrice`: Precio histórico
- `priceUSD`: Precio en dólares
- `createdAt`, `createdBy`, `isActive`, `code`

Todos estos campos se muestran automáticamente en la página de detalle del producto cuando están disponibles.

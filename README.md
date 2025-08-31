# 🚀 Busca Listo - Frontend

**Plataforma de comparación de precios y productos farmacéuticos**

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura de Componentes](#estructura-de-componentes)
- [Gestión de Estado](#gestión-de-estado)
- [API y Datos](#api-y-datos)
- [Rutas y Navegación](#rutas-y-navegación)
- [Estilos y UI](#estilos-y-ui)
- [Desarrollo](#desarrollo)
- [Despliegue](#despliegue)

## 🎯 Descripción General

Busca Listo es una aplicación web que permite a los usuarios comparar precios de productos farmacéuticos y otros productos de consumo. Los usuarios pueden buscar productos, filtrar por categorías, ver ofertas y comparar precios entre diferentes tiendas.

### Características Principales

- 🔍 **Búsqueda avanzada** de productos con filtros
- 📱 **Diseño responsive** para móviles y desktop
- 🏪 **Comparación de precios** entre tiendas
- 📊 **Categorías organizadas** por tipo de producto
- 💰 **Sistema de ofertas** y descuentos
- 🎨 **UI moderna** con Tailwind CSS
- ⚡ **Rendimiento optimizado** con React Query

## 🛠️ Tecnologías

### Core
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### Estado y Datos
- **React Query (TanStack Query)** - Gestión de estado del servidor
- **React Context** - Estado global de la aplicación
- **Zod** - Validación de esquemas

### UI y Estilos
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos
- **Radix UI** - Componentes accesibles

### Navegación
- **Wouter** - Router ligero para React

### Testing
- **Vitest** - Framework de testing
- **Testing Library** - Utilidades para testing

## 🏗️ Arquitectura

La aplicación sigue una **arquitectura de capas** con separación clara de responsabilidades:

```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│        (Pages & Components)        │
├─────────────────────────────────────┤
│           Business Logic            │
│           (Hooks & Services)       │
├─────────────────────────────────────┤
│           Data Layer                │
│        (API & Local Storage)       │
└─────────────────────────────────────┘
```

### Patrón Container-Presenter

Utilizamos el patrón **Container-Presenter** para separar la lógica de negocio de la presentación:

- **Containers**: Manejan estado, lógica de negocio y llamadas a API
- **Presenters**: Se encargan únicamente de la renderización

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── common/          # Componentes genéricos
│   │   ├── ui/          # Componentes base de UI
│   │   └── pricing/     # Componentes de precios
│   ├── products/        # Componentes específicos de productos
│   │   ├── containers/  # Lógica de productos
│   │   │   ├── Details/ # Detalles del producto
│   │   │   ├── Deals/   # Productos en oferta
│   │   │   ├── Recent/  # Productos recientes
│   │   │   └── MostViewed/ # Más vistos
│   │   └── presenters/  # Presentación de productos
│   ├── categories/      # Componentes de categorías
│   ├── layout/          # Layout principal
│   ├── ads/             # Componentes de publicidad
│   └── store/           # Componentes de tienda
├── pages/               # Páginas de la aplicación
├── hooks/               # Custom hooks
├── services/            # Servicios de API
├── contexts/            # Contextos de React
├── config/              # Configuración
├── types/               # Tipos de TypeScript
├── data/                # Datos mockup
└── shared/              # Esquemas y tipos compartidos
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# API Configuration
VITE_API_HOST=https://buscalistobackend.onrender.com

# Email Service (opcional)
VITE_SENDGRID_API_KEY=tu_api_key_aqui
VITE_FROM_EMAIL=noreply@buscalisto.com
VITE_REGISTRATION_URL=https://buscalisto.com/register
```

### Dependencias

```bash
# Instalar dependencias
npm install

# Instalar dependencias de desarrollo
npm install -D
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run dev:host    # Inicia con host público

# Build
npm run build       # Construye para producción
npm run preview     # Previsualiza build de producción

# Testing
npm run test        # Ejecuta tests
npm run test:ui     # Ejecuta tests con UI
npm run test:coverage # Genera reporte de cobertura

# Linting
npm run lint        # Ejecuta ESLint
npm run lint:fix    # Corrige errores automáticamente
```

## 🧩 Estructura de Componentes

### Componentes Base (UI)

Los componentes base están en `src/components/common/ui/` y siguen el patrón de **compound components**:

```tsx
// Ejemplo de uso
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    Contenido del card
  </CardContent>
</Card>
```

### Componentes de Productos

Los componentes de productos siguen el patrón **Container-Presenter**:

```tsx
// Container (lógica)
export function RecentProductsContainer() {
  const { data: products } = useRecentProducts();
  return <RecentProductsPresenter products={products} />;
}

// Presenter (presentación)
export function RecentProductsPresenter({ products }: { products: RecentProduct[] }) {
  return (
    <div>
      {products.map(product => (
        <RecentProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 📊 Gestión de Estado

### React Query (TanStack Query)

Para el estado del servidor y caché:

```tsx
// Hook personalizado
export function useRecentProducts() {
  return useQuery({
    queryKey: ['products', 'recent'],
    queryFn: () => apiService.getRecentProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Uso en componentes
function MyComponent() {
  const { data: products, isLoading, error } = useRecentProducts();
  
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  
  return <ProductList products={products} />;
}
```

### React Context

Para estado global de la aplicación:

```tsx
// SearchContext
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
    }}>
      {children}
    </SearchContext.Provider>
  );
}
```

## 🌐 API y Datos

### Servicio de API

El `apiService` maneja todas las comunicaciones con el backend:

```tsx
export const apiService = {
  // Productos recientes
  async getRecentProducts(limit?: number): Promise<ApiResponse<BaseProduct[]>>,
  
  // Productos por categoría
  async getProductsByCategory(category: string, limit?: number): Promise<ApiResponse<BaseProduct[]>>,
  
  // Búsqueda de productos
  async searchProducts(searchTerm: string, category?: string, limit?: number): Promise<ApiResponse<BaseProduct[]>>,
  
  // Y más métodos...
};
```

### Fallback a Datos Mockup

La aplicación tiene un sistema de fallback robusto:

```tsx
async function getRecentProducts() {
  try {
    if (await isApiAvailable()) {
      // Intentar obtener de la API
      const response = await apiService.getRecentProducts();
      return response;
    }
  } catch (error) {
    console.warn('API no disponible, usando datos mockup');
  }
  
  // Fallback a datos mockup
  return getMockProducts();
}
```

### Esquemas de Datos

Utilizamos **Zod** para validación de esquemas:

```tsx
// SchemaProduct.ts
export const baseProductSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  price_bs: z.number(),
  price_usd: z.number(),
  // ... más campos
});

export type BaseProduct = z.infer<typeof baseProductSchema>;
```

## 🗺️ Rutas y Navegación

### Configuración de Rutas

```tsx
// App.tsx
<Switch>
  <Route path="/" component={Home} />
  <Route path="/category/:category" component={CategoryPage} />
  <Route path="/categories" component={CategoriesPage} />
  <Route path="/product/:id" component={ProductDetail} />
  <Route path="/store/:storeName" component={StorePage} />
  <Route path="/register-store" component={RegisterStore} />
  <Route path="/help" component={Help} />
  <Route path="/terms" component={Terms} />
  <Route path="/privacy" component={Privacy} />
  <Route path="/services" component={OurServices} />
  <Route component={NotFound} />
</Switch>
```

### Navegación Programática

```tsx
import { useLocation } from 'wouter';

function MyComponent() {
  const [, setLocation] = useLocation();
  
  const handleNavigation = () => {
    setLocation('/product/123');
  };
  
  return <button onClick={handleNavigation}>Ir al producto</button>;
}
```

## 🎨 Estilos y UI

### Tailwind CSS

Utilizamos Tailwind CSS con configuración personalizada:

```tsx
// Clases de ejemplo
<div className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
  <h2 className="text-2xl font-bold text-slate-900 mb-4">
    Título del Componente
  </h2>
  <p className="text-slate-600 leading-relaxed">
    Descripción del componente
  </p>
</div>
```

### Componentes de UI

Los componentes base están en `src/components/common/ui/`:

- `Button` - Botones con variantes
- `Card` - Cards con header, content y footer
- `Input` - Campos de entrada
- `Badge` - Etiquetas y badges
- `Modal` - Modales y diálogos
- `Pagination` - Paginación
- Y más...

### Responsive Design

```tsx
// Ejemplo de responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 columna en móvil, 2 en tablet, 3 en desktop */}
</div>

// Ocultar/mostrar elementos
<div className="hidden md:block">Solo visible en tablet+</div>
<div className="md:hidden">Solo visible en móvil</div>
```

## 🚀 Desarrollo

### Flujo de Trabajo

1. **Crear feature branch** desde `main`
2. **Desarrollar** siguiendo los patrones establecidos
3. **Testing** local con `npm run dev`
4. **Commit** con mensajes descriptivos
5. **Push** y crear Pull Request
6. **Code Review** por el equipo
7. **Merge** a `main`

### Convenciones de Código

#### Nomenclatura

```tsx
// Archivos: PascalCase
ProductCard.tsx
RecentProductsContainer.tsx

// Componentes: PascalCase
export function ProductCard() {}
export function RecentProductsContainer() {}

// Hooks: camelCase con prefijo 'use'
export function useRecentProducts() {}
export function useProductById() {}

// Tipos: PascalCase
export interface ProductCardProps {}
export type BaseProduct = z.infer<typeof baseProductSchema>;
```

#### Estructura de Componentes

```tsx
// 1. Imports
import React from 'react';
import { Button } from '@/components/common/ui/button';

// 2. Tipos
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Componente
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 4. Hooks y estado
  const [isLoading, setIsLoading] = useState(false);
  
  // 5. Handlers
  const handleClick = () => {
    setIsLoading(true);
    onAction();
  };
  
  // 6. Render
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Acción'}
      </Button>
    </div>
  );
}
```

### Testing

```tsx
// Ejemplo de test
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('should render product information', () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      price_bs: 100,
    };
    
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Bs. 100')).toBeInTheDocument();
  });
});
```

## 🚀 Despliegue

### Build de Producción

```bash
# Construir aplicación
npm run build

# Previsualizar build
npm run preview
```

### Despliegue en Vercel

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno**
3. **Deploy automático** en cada push a `main`

### Variables de Entorno de Producción

```bash
# En Vercel
VITE_API_HOST=https://buscalistobackend.onrender.com
VITE_REGISTRATION_URL=https://buscalisto.com/register
```

## 🔧 Troubleshooting

### Problemas Comunes

#### Error de Build
```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Error de Tipos
```bash
# Verificar tipos
npx tsc --noEmit
```

#### Error de Linting
```bash
# Corregir automáticamente
npm run lint:fix
```

### Debug

```tsx
// En desarrollo
console.log('Debug info:', { products, loading, error });

// En producción
console.warn('Warning info:', warningData);
console.error('Error info:', errorData);
```

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de React Query](https://tanstack.com/query/latest)
- [Documentación de Vite](https://vitejs.dev/guide/)

## 🤝 Contribución

1. **Fork** el repositorio
2. **Clone** tu fork
3. **Crea** una feature branch
4. **Desarrolla** tu feature
5. **Testea** tu código
6. **Commit** tus cambios
7. **Push** a tu branch
8. **Crea** un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**¿Necesitas ayuda?** 🆘

- 📧 Email: equipo@buscalisto.com
- 💬 Slack: #frontend-team
- 📖 Wiki: [Confluence](https://company.atlassian.net/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/company/busca-listo/issues)

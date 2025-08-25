# 🏗️ **Guía de Refactorización - Patrón Container-Presenter**

## 📋 **Resumen de Cambios**

Este documento describe la refactorización implementada para seguir el patrón **Container-Presenter** y organizar mejor los mockups en archivos JSON.

---

## 🎯 **Objetivos de la Refactorización**

### **✅ Separación de Responsabilidades:**
- **Containers**: Manejan lógica de negocio, estado y datos
- **Presenters**: Solo manejan presentación y UI
- **Mockups**: Organizados en archivos JSON para fácil mantenimiento

### **✅ Mejor Organización:**
- **Estructura clara** de directorios
- **Mockups centralizados** en `/src/data`
- **Fácil mantenimiento** y actualización
- **Reutilización** de componentes

---

## 🗂️ **Nueva Estructura de Directorios**

```
src/
├── components/
│   ├── containers/          # 🧠 Lógica de negocio
│   │   ├── ProductGridContainer.tsx
│   │   ├── DealsCarouselContainer.tsx
│   │   ├── PopularCategoryContainer.tsx
│   │   └── index.ts
│   ├── presenters/          # 🎨 Solo presentación
│   │   ├── ProductGridPresenter.tsx
│   │   ├── DealsCarouselPresenter.tsx
│   │   ├── PopularCategoryPresenter.tsx
│   │   └── index.ts
│   ├── products/            # 📦 Componentes existentes
│   ├── common/              # 🔧 Componentes comunes
│   └── layout/              # 🏠 Layout y navegación
├── data/                    # 📊 Datos JSON y mockups
│   ├── products.json        # Productos mockup
│   ├── subscriptions.json   # Planes de suscripción
│   ├── categories.json      # Categorías populares
│   ├── deals.json          # Ofertas especiales
│   ├── footerData.ts       # Datos del footer
│   └── index.ts            # Exportaciones centralizadas
└── hooks/                   # 🪝 Hooks personalizados
    └── useFetchData.ts     # Hook refactorizado
```

---

## 🔄 **Patrón Container-Presenter**

### **📦 Container (Lógica de Negocio):**
```tsx
// ProductGridContainer.tsx
export function ProductGridContainer({ products, variant, onProductClick }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  
  // Lógica de filtrado y ordenamiento
  useEffect(() => {
    // ... lógica de negocio
  }, [products, sortBy]);
  
  // Event handlers
  const handleSortChange = (newSortBy) => {
    // ... lógica de negocio
  };
  
  return (
    <ProductGridPresenter
      products={filteredProducts}
      sortBy={sortBy}
      onSortChange={handleSortChange}
      // ... props
    />
  );
}
```

### **🎨 Presenter (Solo Presentación):**
```tsx
// ProductGridPresenter.tsx
export function ProductGridPresenter({ products, sortBy, onSortChange }) {
  // Solo renderizado, sin lógica de negocio
  
  return (
    <div className="space-y-6">
      {/* Controles de ordenamiento */}
      <div className="flex items-center space-x-2">
        {["price", "name", "popularity"].map((field) => (
          <Button onClick={() => onSortChange(field)}>
            {getSortLabel(field)}
          </Button>
        ))}
      </div>
      
      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map(renderProductCard)}
      </div>
    </div>
  );
}
```

---

## 📊 **Mockups JSON Organizados**

### **🛍️ products.json:**
```json
{
  "farmacia1": {
    "sucursales": {
      "sucursal1": {
        "productos": [
          {
            "nombre": "Paracetamol 500mg",
            "compuesto": "Paracetamol",
            "precio": {
              "bs_sin_oferta": "15000",
              "bs_con_oferta": "10500"
            }
          }
        ]
      }
    }
  }
}
```

### **🏷️ categories.json:**
```json
{
  "categories": [
    {
      "id": "medicamentos",
      "name": "Medicamentos",
      "description": "Medicamentos de venta libre y con receta",
      "popular": true,
      "productCount": 1250
    }
  ]
}
```

### **🎯 deals.json:**
```json
{
  "deals": [
    {
      "id": "deal-1",
      "title": "Ofertas del Día",
      "discount": "30%",
      "products": [...]
    }
  ]
}
```

---

## 🚀 **Beneficios de la Refactorización**

### **✅ Mantenibilidad:**
- **Mockups centralizados** en archivos JSON
- **Fácil actualización** de datos de prueba
- **Separación clara** de responsabilidades

### **✅ Reutilización:**
- **Containers reutilizables** para diferentes contextos
- **Presenters intercambiables** para diferentes diseños
- **Lógica de negocio** centralizada

### **✅ Testing:**
- **Containers** fáciles de testear (lógica pura)
- **Presenters** fáciles de testear (UI pura)
- **Mockups** fáciles de mockear

### **✅ Escalabilidad:**
- **Nuevos componentes** siguen el mismo patrón
- **Fácil agregar** nuevas funcionalidades
- **Estructura consistente** en toda la aplicación

---

## 🔧 **Cómo Usar la Nueva Estructura**

### **1. Importar Containers:**
```tsx
import { ProductGridContainer } from "@/components/containers";

function HomePage() {
  return (
    <ProductGridContainer
      products={products}
      variant="default"
      onProductClick={handleProductClick}
    />
  );
}
```

### **2. Importar Datos JSON:**
```tsx
import { categoriesData, dealsData } from "@/data";

function MyComponent() {
  const popularCategories = categoriesData.categories.filter(c => c.popular);
  // ...
}
```

### **3. Crear Nuevos Containers:**
```tsx
// 1. Crear el Container con lógica
export function NewFeatureContainer({ data, onAction }) {
  const [state, setState] = useState();
  
  // Lógica de negocio aquí
  
  return <NewFeaturePresenter {...props} />;
}

// 2. Crear el Presenter con UI
export function NewFeaturePresenter({ data, onAction }) {
  // Solo UI aquí
  
  return <div>...</div>;
}
```

---

## 📝 **Próximos Pasos**

### **🔄 Refactorizar Componentes Existentes:**
- [ ] `ProductCard` → Container + Presenter
- [ ] `CategoryNavbar` → Container + Presenter
- [ ] `RecentProductCard` → Container + Presenter

### **📊 Agregar Más Mockups JSON:**
- [ ] `stores.json` - Datos de tiendas
- [ ] `users.json` - Datos de usuarios
- [ ] `orders.json` - Datos de pedidos

### **🧪 Testing:**
- [ ] Tests unitarios para Containers
- [ ] Tests de UI para Presenters
- [ ] Tests de integración

---

## 🎉 **Resultado Final**

Con esta refactorización, ahora tienes:

1. **✅ Estructura clara** Container-Presenter
2. **✅ Mockups organizados** en archivos JSON
3. **✅ Separación de responsabilidades** clara
4. **✅ Código más mantenible** y escalable
5. **✅ Fácil testing** y debugging
6. **✅ Patrón consistente** en toda la aplicación

**¡La aplicación está ahora mejor organizada y preparada para crecer!**

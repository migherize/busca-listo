import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { ProductCard } from "@/components/products/ProductCard";
import type { BaseProduct } from "@shared/SchemaProduct";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { useProductsByStore } from "@/hooks/useProductsByStore";
import { useAllCategories } from "@/hooks/useAllCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Button } from "@/components/common/ui/button";
import { Link } from "wouter";
import { 
  Pill, 
  Wrench, 
  Smartphone, 
  Tv, 
  Utensils, 
  FootprintsIcon, 
  Heart, 
  Sparkles, 
  Shirt,
  Grid3X3,
  ArrowRight,
  Store,
  Star,
  MapPin,
  Phone,
  Globe,
  Clock
} from "lucide-react";
import type { Category } from "@shared/SchemaCategory";

export default function StorePage() {
  const { storeName } = useParams();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedSort, setSelectedSort] = useState("relevancia");
  const resultsPerPage = 12;

  // Obtener el supplier_id de los parámetros de consulta o usar el storeName como fallback
  const getSupplierId = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || storeName || '';
  };
  
  const supplierId = getSupplierId();
  
  // Obtener todas las categorías desde la API
  const { data: apiCategories = [], isLoading: categoriesLoading, error: categoriesError } = useAllCategories();

  // Obtener productos de la tienda
  const { data: products = [], isLoading, error, refetch } = useProductsByStore(supplierId, selectedCategory === "all" ? undefined : selectedCategory);

  // Paginación
  const totalPages = Math.ceil((products?.length || 0) / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedProducts = products?.slice(startIndex, startIndex + resultsPerPage) || [];

  // Resetear página cuando cambie la categoría
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (category: Category | "all") => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    setCurrentPage(1);
  };

  // Obtener el nombre legible de la categoría
  const getCategoryDisplayName = (category: Category): string => {
    const categoryNames: Record<Category, string> = {
      all: "Todos",
      medicamentos: "Medicamentos",
      repuestos: "Repuestos",
      telefonos: "Teléfonos",
      tv: "TV",
      comidarapida: "Comida Rápida",
      zapatos: "Zapatos",
      suplementos: "Suplementos",
      belleza: "Belleza",
      ropa: "Ropa",
    };
    return categoryNames[category] || category;
  };

  // Definir todas las categorías para el sidebar
  const allCategories = [
    { key: "all" as const, name: "Todos los Productos", icon: Grid3X3, color: "text-blue-600" },
    { key: "medicamentos" as Category, name: "Medicamentos", icon: Pill, color: "text-blue-600" },
    { key: "repuestos" as Category, name: "Repuestos", icon: Wrench, color: "text-orange-600" },
    { key: "telefonos" as Category, name: "Teléfonos", icon: Smartphone, color: "text-green-600" },
    { key: "tv" as Category, name: "TV", icon: Tv, color: "text-purple-600" },
    { key: "comidarapida" as Category, name: "Comida Rápida", icon: Utensils, color: "text-red-600" },
    { key: "zapatos" as Category, name: "Zapatos", icon: FootprintsIcon, color: "text-amber-600" },
    { key: "suplementos" as Category, name: "Suplementos", icon: Heart, color: "text-pink-600" },
    { key: "belleza" as Category, name: "Belleza", icon: Sparkles, color: "text-indigo-600" },
    { key: "ropa" as Category, name: "Ropa", icon: Shirt, color: "text-teal-600" },
  ];

  if (isLoading || categoriesLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error.message || "Error al cargar productos de la tienda"} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="w-full py-6 lg:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Layout principal con sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contenido principal */}
            <div className="flex-1">
              {/* Encabezado de la tienda */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                      <Store className="h-4 w-4 mr-2" />
                      Todas las tiendas
                    </Button>
                  </Link>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                      {storeName || "Tienda"}
                    </h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>4.8 (1250 reseñas)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>Bogotá, Colombia</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-lg">
                  {products?.length || 0} productos disponibles en esta tienda
                </p>
              </div>

              {/* Filtros de ordenamiento */}
              <div className="mb-6 flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-slate-700">Ordenar por:</span>
                <div className="flex gap-2">
                  {["relevancia", "precio", "nombre", "más vendidos"].map((sort) => (
                    <Button
                      key={sort}
                      variant={selectedSort === sort ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortSelect(sort)}
                    >
                      {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Contenido de productos de la tienda */}
              {products && products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalResults={products.length}
                        resultsPerPage={resultsPerPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <EmptyState 
                  title="No hay productos en esta categoría"
                  description="Intenta con otra categoría o contacta a la tienda para más información"
                  searchTerm=""
                  selectedCategory="all"
                  onClearFilters={() => {}}
                />
              )}
            </div>

            {/* Sidebar derecho con categorías */}
            <div className="lg:w-80 flex-shrink-0">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Grid3X3 className="h-5 w-5 text-blue-600" />
                    Categorías de la Tienda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {allCategories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = category.key === selectedCategory;
                    
                    return (
                      <button
                        key={category.key} 
                        onClick={() => handleCategorySelect(category.key)}
                        className={`
                          w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                          ${isActive 
                            ? 'bg-blue-50 border-2 border-blue-200 text-blue-700' 
                            : 'hover:bg-slate-50 border-2 border-transparent hover:border-slate-200'
                          }
                        `}
                      >
                        <IconComponent className={`h-5 w-5 ${category.color}`} />
                        <span className={`font-medium ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                          {category.name}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Información de la tienda */}
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Store className="h-5 w-5 text-blue-600" />
                      Información de la Tienda
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span>+57 1 234 5678</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-slate-500" />
                      <span>www.tienda.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>Lun-Vie: 8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200">
                      <Button variant="outline" className="w-full">
                        Contactar Tienda
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

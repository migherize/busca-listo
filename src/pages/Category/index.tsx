import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { SearchResults } from "@/components/common/SearchResults";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import { useAllCategories } from "@/hooks/useAllCategories";
import { useSearch } from "@/contexts/SearchContext";
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
  ArrowRight
} from "lucide-react";
import type { Category } from "@shared/SchemaCategory";

export default function CategoryPage() {
  const [, setLocation] = useLocation();
  const { searchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("relevancia");
  const resultsPerPage = 12;

  // Obtener la categoría de la URL
  const getCategoryFromUrl = (): Category => {
    const path = window.location.pathname;
    const categoryMatch = path.match(/\/category\/(.+)/);
    if (categoryMatch) {
      const categoryKey = categoryMatch[1];
      // Mapear la URL a la categoría correcta
      const categoryMap: Record<string, Category> = {
        "medicamentos": "medicamentos",
        "repuestos": "repuestos",
        "telefonos": "telefonos",
        "tv": "tv",
        "comidarapida": "comidarapida",
        "zapatos": "zapatos",
        "suplementos": "suplementos",
        "belleza": "belleza",
        "ropa": "ropa",
      };
      return categoryMap[categoryKey] || "medicamentos";
    }
    return "medicamentos";
  };

  const selectedCategory = getCategoryFromUrl();

  // Obtener todas las categorías desde la API
  const { data: apiCategories = [], isLoading: categoriesLoading, error: categoriesError } = useAllCategories();

  // Obtener productos de la categoría
  const { data: products = [], isLoading, error, refetch } = useProductsByCategory(selectedCategory);

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
    if (category === "all") {
      setLocation("/");
    } else {
      setLocation(`/category/${category}`);
    }
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
    return <ErrorState error={error.message || "Error al cargar productos"} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="w-full py-6 lg:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Layout principal con sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contenido principal */}
            <div className="flex-1">
              {/* Encabezado de la categoría */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Link href="/category">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      Todas las categorías
                    </Button>
                  </Link>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  <h1 className="text-3xl font-bold text-slate-900">
                    {getCategoryDisplayName(selectedCategory)}
                  </h1>
                </div>
                <p className="text-slate-600 text-lg">
                  {products?.length || 0} productos encontrados en esta categoría
                </p>
              </div>

              {/* Componente de búsqueda y resultados */}
              <SearchResults 
                className="mb-8"
                resultsPerPage={12}
                showCategoryNavbar={true}
              />

              {/* Contenido de productos de la categoría (solo cuando no hay búsqueda activa) */}
              {!searchTerm && products && products.length > 0 && (
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
              )}

              {/* Estado vacío si no hay productos */}
              {!searchTerm && (!products || products.length === 0) && (
                <EmptyState 
                  title="No hay productos en esta categoría"
                  description="Intenta con otra categoría o utiliza la búsqueda para encontrar productos similares"
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
                    Categorías Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {allCategories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = category.key === selectedCategory;
                    
                    return (
                      <Link 
                        key={category.key} 
                        href={`/category/${category.key}`}
                        className="block"
                      >
                        <div className={`
                          flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                          ${isActive 
                            ? 'bg-blue-50 border-2 border-blue-200 text-blue-700' 
                            : 'hover:bg-slate-50 border-2 border-transparent hover:border-slate-200'
                          }
                        `}>
                          <IconComponent className={`h-5 w-5 ${category.color}`} />
                          <span className={`font-medium ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                            {category.name}
                          </span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                  
                  {/* Enlace a todas las categorías */}
                  <div className="pt-4 border-t border-slate-200">
                    <Link href="/category">
                      <Button 
                        variant="outline" 
                        className="w-full justify-center"
                      >
                        Ver Todas las Categorías
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Información adicional */}
              <div className="mt-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2">¿Necesitas ayuda?</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Si no encuentras lo que buscas en esta categoría, utiliza nuestra búsqueda avanzada.
                    </p>
                    <Link href="/search">
                      <Button size="sm" variant="outline" className="w-full">
                        Buscar Productos
                      </Button>
                    </Link>
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

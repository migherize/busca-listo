import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { CategoryNavbar } from "@/components/products/CategoryNavbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import type { Category } from "@shared/SchemaCategory";

export default function CategoryPage() {
  const [, setLocation] = useLocation();
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
        "TV": "TV",
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
      TV: "TV",
      comidarapida: "Comida Rápida",
      zapatos: "Zapatos",
      suplementos: "Suplementos",
      belleza: "Belleza",
      ropa: "Ropa",
    };
    return categoryNames[category] || category;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error.message || "Error al cargar productos"} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="w-full py-6 lg:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Encabezado de la categoría */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {getCategoryDisplayName(selectedCategory)}
            </h1>
            <p className="text-slate-600">
              {products?.length || 0} productos encontrados en esta categoría
            </p>
          </div>

          {/* Navegación de categorías y ordenamiento */}
          <CategoryNavbar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            selectedSort={selectedSort}
            onSortSelect={handleSortSelect}
          />

          {/* Contenido de productos */}
          {products && products.length > 0 ? (
            <>
              <ProductGrid products={paginatedProducts} />
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
              searchTerm=""
              selectedCategory={selectedCategory}
              onClearFilters={() => setLocation("/")}
            />
          )}
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { CategoryNavbarContainer } from "@/components/categories/containers/CategoryNavbar/CategoryNavbarContainer";
import { useFetchData } from "@/hooks/useFetchData";
import { useSearch } from "@/contexts/SearchContext";

interface SearchResultsProps {
  className?: string;
  resultsPerPage?: number;
  showCategoryNavbar?: boolean;
  onResultsChange?: (count: number) => void;
}

export function SearchResults({
  className = "",
  resultsPerPage = 8,
  showCategoryNavbar = true,
  onResultsChange,
}: SearchResultsProps) {
  const { searchTerm } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [selectedSort, setSelectedSort] = useState<string>("precio");
  const [currentPage, setCurrentPage] = useState(1);

  // Resetear página cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSort]);

  // Obtener datos de búsqueda
  const { products, isLoading, error, refetch } = useFetchData({
    searchTerm,
    selectedCategory,
  });

  // Notificar cambio en resultados
  useEffect(() => {
    if (onResultsChange) {
      onResultsChange(products.length);
    }
  }, [products.length, onResultsChange]);

  // Paginación
  const totalPages = Math.ceil(products.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + resultsPerPage);

  const handleCategorySelect = (category: string | "all") => {
    setSelectedCategory(category);
  };

  const handleSortSelect = (sortKey: string) => {
    setSelectedSort(sortKey);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedSort("precio");
    setCurrentPage(1);
  };

  // Determinar si hay búsqueda activa
  const hasActiveSearch = searchTerm.trim() !== "" || selectedCategory !== "all";

  // Si no hay búsqueda activa, no mostrar nada
  if (!hasActiveSearch) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Navegación de categorías y ordenamiento */}
      {showCategoryNavbar && (
        <CategoryNavbarContainer
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          selectedSort={selectedSort}
          onSortSelect={handleSortSelect}
        />
      )}

      {/* Encabezado de resultados */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          {searchTerm
            ? `Resultados para "${searchTerm}"`
            : selectedCategory !== "all"
              ? `Productos de ${selectedCategory}`
              : "Todos los productos"}
        </h2>
        <p className="text-slate-600">{products.length} productos encontrados</p>

        {/* Botón para limpiar filtros */}
        {(searchTerm || selectedCategory !== "all") && (
          <button
            onClick={handleClearFilters}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Contenido de resultados */}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm || "tu búsqueda"}
          selectedCategory={selectedCategory}
          onClearFilters={handleClearFilters}
        />
      ) : (
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
    </div>
  );
}

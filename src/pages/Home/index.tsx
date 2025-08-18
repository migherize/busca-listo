  import { useState, useEffect } from "react";
  import { Header } from "@/components/layout/Header";
  import { CategoryNavbar } from "@/components/products/CategoryNavbar";
  import { ProductGrid } from "@/components/products/ProductGrid";
  import { LoadingState } from "@/components/common/LoadingState";
  import { EmptyState } from "@/components/common/EmptyState";
  import { ErrorState } from "@/components/common/ErrorState";
  import { Pagination } from "@/components/common/Pagination";
  import { Footer } from "@/components/layout/Footer";
  import { CustomAdsLeft } from "@/components/ads/CustomAdsLeft";
  import { AdBannerVertical } from "@/components/ads/AdBannerVertical";
  import { useFetchData } from "@/hooks/useFetchData";
  import type { Category } from "@shared/schema";

  export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 8;
  
    // Debounce search term
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
        setCurrentPage(1); // Reset to first page on search
      }, 500);
  
      return () => clearTimeout(timer);
    }, [searchTerm]);
  
    const { products, isLoading, error, refetch } = useFetchData({
      searchTerm: debouncedSearchTerm,
      selectedCategory,
    });
  
    // Reset to first page when category changes
    useEffect(() => {
      setCurrentPage(1);
    }, [selectedCategory]);
  
    // Pagination logic
    const totalPages = Math.ceil(products.length / resultsPerPage);
    const startIndex = (currentPage - 1) * resultsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + resultsPerPage);
  
    const handleClearFilters = () => {
      setSearchTerm("");
      setDebouncedSearchTerm("");
      setSelectedCategory("all");
      setCurrentPage(1);
    };
  
    const handleSearchChange = (value: string) => {
      setSearchTerm(value);
    };
  
    const handleCategorySelect = (category: Category | "all") => {
      setSelectedCategory(category);
    };
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    return (
      <div className="min-h-screen bg-slate-50">
        <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        
        <CategoryNavbar 
          selectedCategory={selectedCategory} 
          onCategorySelect={handleCategorySelect} 
        />
  
        <main className="w-full mx-auto px-2 sm:px-4 lg:px-6 py-8 flex gap-4">
          {/* Columna izquierda: anuncios propios */}
          <div className="w-1/8">
            <CustomAdsLeft />
          </div>
          {/* Columna central: productos */}
          <div className="flex-1">

            {/* Search Results Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {debouncedSearchTerm 
                  ? `Resultados para "${debouncedSearchTerm}"` 
                  : selectedCategory !== "all" 
                    ? `Productos de ${selectedCategory}`
                    : "Todos los productos"
                }
              </h2>
              <p className="text-slate-600">
                {products.length} productos encontrados
              </p>
            </div>
    
            {/* Content */}
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onRetry={refetch} />
            ) : products.length === 0 ? (
              <EmptyState
                searchTerm={debouncedSearchTerm || "tu búsqueda"}
                selectedCategory={selectedCategory}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalResults={products.length}
                    resultsPerPage={resultsPerPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>

          {/* Columna derecha: anuncios de terceros */}
          <div className="w-1/6 flex flex-col gap-4">
            <AdBannerVertical adSlot="8365869664" />
          </div>
        </main>
  
        <Footer />
      </div>
    );
  }
  
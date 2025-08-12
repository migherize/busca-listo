  import { useState, useEffect } from "react";
  import { Header } from "@/components/Header";
  import { CategoryNavbar } from "@/components/CategoryNavbar";
  import { ProductGrid } from "@/components/ProductGrid";
  import { LoadingState } from "@/components/LoadingState";
  import { EmptyState } from "@/components/EmptyState";
  import { ErrorState } from "@/components/ErrorState";
  import { Pagination } from "@/components/Pagination";
  import { Footer } from "@/components/Footer";
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
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </main>
  
        <Footer />
      </div>
    );
  }
  
import { useState, useEffect } from "react";

import { RecentProductsContainer } from "@/components/products/containers/Recent/RecentProductsContainer";
import { MostViewedProductsContainer } from "@/components/products/containers/MostViewed/MostViewedProductsContainer";
import { PopularCategoriesList } from "@/components/categories/PopularCategories/PopularCategoriesListContainer";



import { CategoryNavbar } from "@/components/products/CategoryNavbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { DealsCarousel } from "@/components/products/DealsCarousel";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { CustomAdsLeft } from "@/components/ads/CustomAdsLeft";
import { AdBannerVertical } from "@/components/ads/AdBannerVertical";



import type { Category } from "@shared/SchemaCategory";
import { useFetchData } from "@/hooks/useFetchData";
import { useRecentProducts } from "@/hooks/useRecentProducts";
import { useSearch } from "@/contexts/SearchContext";

export default function Home() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;

  // Recientes desde backend
  const { data: recentProducts = [], isLoading: isLoadingRecent } = useRecentProducts();
  console.log("Backend recent products:", recentProducts);


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

  // Derived UI mode
  const isSearchMode = (debouncedSearchTerm && debouncedSearchTerm.trim() !== "") || selectedCategory !== "all";



  const offerScore = (price: number, offerPrice: number | null | undefined) => {
    if (!offerPrice || price <= 0) return 0;
    return (price - offerPrice) / price;
  };
  const dailyDeals = [...products]
    .filter(p => p.offerPrice !== null && p.offerPrice !== undefined)
    .sort((a, b) => offerScore(b.price, b.offerPrice) - offerScore(a.price, a.offerPrice))
    .slice(0, 8);

  

  const handlePopularSubcategoryClick = (name: string) => {
    setSelectedCategory("all");
    setSearchTerm(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [selectedSort, setSelectedSort] = useState<string>("precio");

  const handleSortSelect = (sortKey: string) => {
    setSelectedSort(sortKey);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">


      {isSearchMode && (
        <CategoryNavbar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          selectedSort={selectedSort}
          onSortSelect={handleSortSelect}
        />
      )}

      <main className="w-full py-6 lg:py-8">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* Columna izquierda: anuncios propios */}
          <div className="hidden lg:block lg:w-56 xl:w-64 flex-shrink-0">
            <CustomAdsLeft />
          </div>
          {/* Columna central */}
          <div className="flex-1">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              {isSearchMode ? (
                <>
                  {/* Encabezado de resultados */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                      {debouncedSearchTerm
                        ? `Resultados para "${debouncedSearchTerm}"`
                        : selectedCategory !== "all"
                          ? `Productos de ${selectedCategory}`
                          : "Todos los productos"}
                    </h2>
                    <p className="text-slate-600">{products.length} productos encontrados</p>
                  </div>
                  {/* Contenido de resultados */}
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
                </>
              ) : (
                <>
                  {/* Landing: Lo más reciente */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Lo más reciente</h2>
                    <RecentProductsContainer></RecentProductsContainer>
                  </section>

                  {/* Landing: Lo más visto */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Lo más visto</h2>
                    <MostViewedProductsContainer></MostViewedProductsContainer>
                  </section>

                  {/* Landing: Categorías más populares (por subcategoría) */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Las categorías más populares</h2>
                    <PopularCategoriesList></PopularCategoriesList>
                  </section>

                  {/* Landing: Ofertas del día */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Ofertas del día</h2>
                    {isLoading ? <LoadingState /> : <DealsCarousel products={dailyDeals} />}
                  </section>
                </>
              )}
            </div>
          </div>

          {/* Columna derecha: anuncios de terceros */}
          <div className="hidden lg:flex lg:w-[160px] flex-col gap-4 flex-shrink-0 items-center">
            <AdBannerVertical adSlot="8365869664" />
          </div>
        </div>
      </main>

    </div>
  );
}
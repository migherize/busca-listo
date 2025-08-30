import { RecentProductsContainer } from "@/components/products/containers/Recent/RecentProductsContainer";
import { MostViewedProductsContainer } from "@/components/products/containers/MostViewed/MostViewedProductsContainer";
import { DealsProductsContainer } from "@/components/products/containers/Deals/DealsProductsContainer";
import { PopularCategoriesList } from "@/components/categories/containers/PopularCategories/PopularCategoriesListContainer";

import { SearchResults } from "@/components/common/SearchResults";
import { CustomAdsLeft } from "@/components/ads/CustomAdsLeft";
import { AdBannerVertical } from "@/components/ads/AdBannerVertical";
import { useSearch } from "@/contexts/SearchContext";

export default function Home() {
  const { searchTerm } = useSearch();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <main className="w-full py-6 lg:py-8">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* Columna izquierda: anuncios propios */}
          <div className="hidden lg:block lg:w-56 xl:w-64 flex-shrink-0">
            <CustomAdsLeft />
          </div>
          
          {/* Columna central */}
          <div className="flex-1">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              {/* Componente de búsqueda y resultados */}
              <SearchResults 
                className="mb-8"
                resultsPerPage={8}
                showCategoryNavbar={true}
              />
              
              {/* Landing: Solo mostrar cuando no hay búsqueda activa */}
              {!searchTerm && (
                <>
                  {/* Lo más reciente */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Lo más reciente</h2>
                    <RecentProductsContainer></RecentProductsContainer>
                  </section>

                  {/* Lo más visto */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Lo más visto</h2>
                    <MostViewedProductsContainer></MostViewedProductsContainer>
                  </section>

                  {/* Categorías más populares */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Las categorías más populares</h2>
                    <PopularCategoriesList></PopularCategoriesList>
                  </section>

                  {/* Ofertas del día */}
                  <section className="mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Ofertas del día</h2>
                    <DealsProductsContainer 
                      maxProducts={6}    
                      limit={20}         
                    />
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
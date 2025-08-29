import { useRecentProducts, useMostViewedProducts, useDealsProducts, usePopularCategories } from "@/hooks";
import { RecentProductCard } from "@/components/products/presenters/Recent/RecentProductCard";
import { MostViewedProductCard } from "@/components/products/presenters/MostViewed/MostViewedProductCard";
import { ProductCard } from "./ProductCard";
import { PopularCategoryCard } from "./PopularCategoryCard";

export function ProductShowcase() {
  // Usar múltiples hooks para diferentes tipos de productos
  const { data: recentProducts, isLoading: recentLoading, error: recentError } = useRecentProducts(4);
  const { data: mostViewedProducts, isLoading: mostViewedLoading, error: mostViewedError } = useMostViewedProducts(4);
  const { data: dealsProducts, isLoading: dealsLoading, error: dealsError } = useDealsProducts(6);
  const { data: popularCategories, isLoading: categoriesLoading, error: categoriesError } = usePopularCategories(6);

  return (
    <div className="space-y-8">
      {/* Productos Recientes */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Productos Recientes</h2>
        {recentLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : recentError ? (
          <p className="text-red-500">Error al cargar productos recientes</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProducts?.map((product) => (
              <RecentProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Productos Más Vistos */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Más Vistos</h2>
        {mostViewedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : mostViewedError ? (
          <p className="text-red-500">Error al cargar productos más vistos</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mostViewedProducts?.map((product) => (
              <MostViewedProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Ofertas */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ofertas Especiales</h2>
        {dealsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : dealsError ? (
          <p className="text-red-500">Error al cargar ofertas</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dealsProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categorías Populares */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Categorías Populares</h2>
        {categoriesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
            ))}
          </div>
        ) : categoriesError ? (
          <p className="text-red-500">Error al cargar categorías</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {popularCategories?.map((category) => (
              <PopularCategoryCard
                key={category.key}
                name={category.name}
                imageUrl={category.imageUrl}
                categoryKey={category.key}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}



import { useMostViewedProducts } from "@/hooks/useMostViewedProducts";
import { MostViewedProductsPresenter } from "@/components/products/presenters/MostViewed/MostViewedProductsPresenter";

interface MostViewedProductsContainerProps {
  maxProducts?: number;
}

export function MostViewedProductsContainer({ maxProducts = 4 }: MostViewedProductsContainerProps) {
  const { data: mostViewedProducts = [], isLoading, error } = useMostViewedProducts(maxProducts);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: maxProducts }).map((_, idx) => (
          <div key={idx} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error al cargar productos más vistos</div>;
  }

  return <MostViewedProductsPresenter products={mostViewedProducts} maxProducts={maxProducts} />;
}

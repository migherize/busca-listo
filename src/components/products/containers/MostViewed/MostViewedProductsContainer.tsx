import { useMostViewedProducts } from "@/hooks/useMostViewedProducts";
import { MostViewedProductsPresenter } from "@/components/products/presenters/MostViewed/MostViewedProductsPresenter";
import { ProductSkeleton } from "@/components/common/skeleton";

interface MostViewedProductsContainerProps {
  maxProducts?: number;
}

export function MostViewedProductsContainer({ maxProducts = 4 }: MostViewedProductsContainerProps) {
  const { data: mostViewedProducts = [], isLoading, error } = useMostViewedProducts(maxProducts);

  if (isLoading) {
    return (
      <ProductSkeleton 
        count={maxProducts}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        variant="card"
      />
    );
  }

  if (error) {
    return (
      <ProductSkeleton 
        count={maxProducts}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        variant="card"
      />
    );
  }

  if (!mostViewedProducts || mostViewedProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No hay productos populares disponibles
        </div>
        <div className="text-gray-400 text-sm">
          Vuelve pronto para ver los productos más vistos
        </div>
      </div>
    );
  }

  return <MostViewedProductsPresenter products={mostViewedProducts} maxProducts={maxProducts} />;
}

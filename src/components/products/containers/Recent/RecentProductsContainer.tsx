import { useRecentProducts } from "@/hooks/useRecentProducts";
import { RecentProductsPresenter } from "@/components/products/presenters/Recent/RecentProductsPresenter";
import { ProductSkeleton } from "@/components/common/skeleton";

interface RecentProductsContainerProps {
  maxProducts?: number;
}

export function RecentProductsContainer({ maxProducts = 3 }: RecentProductsContainerProps) {
  const { data: products = [], isLoading, error } = useRecentProducts();

  if (isLoading) {
    return (
      <ProductSkeleton 
        count={maxProducts}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        variant="card"
      />
    );
  }

  if (error) {
    return (
      <ProductSkeleton 
        count={maxProducts}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        variant="card"
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No hay productos recientes disponibles
        </div>
        <div className="text-gray-400 text-sm">
          Vuelve pronto para ver los últimos productos
        </div>
      </div>
    );
  }

  return <RecentProductsPresenter products={products} maxProducts={maxProducts} />;
}

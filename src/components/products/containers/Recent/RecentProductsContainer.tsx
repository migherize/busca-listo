import { useRecentProducts } from "@/hooks/useRecentProducts";
import { RecentProductsPresenter } from "@/components/products/presenters/Recent/RecentProductsPresenter";

interface RecentProductsContainerProps {
  maxProducts?: number;
}

export function RecentProductsContainer({ maxProducts = 3 }: RecentProductsContainerProps) {
  const { data: products = [], isLoading, error } = useRecentProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: maxProducts }).map((_, idx) => (
          <div key={idx} className="bg-gray-200 animate-pulse rounded-lg h-28"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar productos recientes
      </div>
    );
  }

  return <RecentProductsPresenter products={products} maxProducts={maxProducts} />;
}

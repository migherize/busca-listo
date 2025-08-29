import { useDealsProducts } from "@/hooks/useDealsProducts";
import { DealsProductsPresenter } from "@/components/products/presenters/Deals/DealsProductsPresenter";

interface DealsProductsContainerProps {
  maxProducts?: number;
}

export function DealsProductsContainer({ maxProducts = 10 }: DealsProductsContainerProps) {
  const { data: products = [], isLoading, error } = useDealsProducts(maxProducts);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="min-w-[260px] max-w-[260px]">
            <div className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">No hay ofertas disponibles en este momento</p>
      </div>
    );
  }

  return <DealsProductsPresenter products={products} maxProducts={maxProducts} />;
}

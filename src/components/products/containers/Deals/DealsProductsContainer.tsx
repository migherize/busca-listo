import { useDealsProducts } from "@/hooks/useDealsProducts";
import { DealsProductsPresenter } from "@/components/products/presenters/Deals/DealsProductsPresenter";
import { DealsSkeleton } from "@/components/common/skeleton";

interface DealsProductsContainerProps {
  maxProducts?: number;  // Productos visibles en el carrusel
  limit?: number;        // Total de productos a cargar de la API
}

export function DealsProductsContainer({ 
  maxProducts = 6, 
  limit = 20 
}: DealsProductsContainerProps) {
  const { data: products = [], isLoading, error } = useDealsProducts(limit);

  if (isLoading) {
    return (
      <DealsSkeleton 
        count={maxProducts}
      />
    );
  }

  if (error) {
    return (
      <DealsSkeleton 
        count={maxProducts}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No hay ofertas disponibles en este momento
        </div>
        <div className="text-gray-400 text-sm">
          Vuelve pronto para ver las mejores ofertas
        </div>
      </div>
    );
  }

  return <DealsProductsPresenter products={products} maxProducts={maxProducts} maxRenderProducts={limit} />;
}

import { MostViewedProductCard } from "@/components/products/presenters/MostViewed/MostViewedProductCard";
import type { MostViewedProduct } from "@shared/SchemaProduct";

interface MostViewedProductsPresenterProps {
  products: MostViewedProduct[];
  maxProducts?: number;
}

export function MostViewedProductsPresenter({
  products,
  maxProducts = 4,
}: MostViewedProductsPresenterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.slice(0, maxProducts).map((product) => (
        <MostViewedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

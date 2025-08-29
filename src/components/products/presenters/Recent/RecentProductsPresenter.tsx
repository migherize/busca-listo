import type { RecentProduct } from "@shared/SchemaProduct";
import { RecentProductCard } from "@/components/products/presenters/Recent/RecentProductCard";

interface RecentProductsPresenterProps {
  products: RecentProduct[];
  maxProducts?: number;
}

export function RecentProductsPresenter({
  products,
  maxProducts = 3,
}: RecentProductsPresenterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.slice(0, maxProducts).map((product) => (
        <RecentProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

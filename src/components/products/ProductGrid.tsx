import { ProductCard } from "./ProductCard";
import type { ProductGridProps } from "@shared/schema";
import { RecentProductCard } from "@/components/products/presenters/Recent/RecentProductCard";
import { MostViewedProductCard } from "@/components/products/presenters/MostViewed/MostViewedProductCard";

type GridVariant = "default" | "recent" | "mostViewed";

export function ProductGrid({ products, variant = "default" as GridVariant }: ProductGridProps & { variant?: GridVariant }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        variant === "recent" ? (
          <RecentProductCard key={product.id} product={product} />
        ) : variant === "mostViewed" ? (
          <MostViewedProductCard key={product.id} product={product} />
        ) : (
          <ProductCard key={product.id} product={product} />
        )
      ))}
    </div>
  );
}

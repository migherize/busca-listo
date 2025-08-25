import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { ProductCard } from "./ProductCard";
import { useDealsProducts } from "@/hooks";

export function DealsCarousel({ maxProducts = 10 }: { maxProducts?: number }) {
  const { data: products, isLoading, error } = useDealsProducts(maxProducts);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (delta: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

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

  return (
    <div className="relative overflow-hidden">
      <div className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <Button variant="secondary" size="icon" className="rounded-full" onClick={() => scrollByAmount(-320)}>
          ‹
        </Button>
      </div>
      <div className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <Button variant="secondary" size="icon" className="rounded-full" onClick={() => scrollByAmount(320)}>
          ›
        </Button>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[260px] max-w-[260px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}


import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { ProductCard } from "./ProductCard";

export function DealsCarousel({ products }: { products: Product[] }) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (delta: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
        <Button variant="secondary" size="icon" className="rounded-full" onClick={() => scrollByAmount(-320)}>
          ‹
        </Button>
      </div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
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


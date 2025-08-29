import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { DealsProduct } from "@shared/SchemaProduct";
import { DealsProductCard } from "@/components/products/presenters/Deals/DealsProductCard";

interface DealsProductsPresenterProps {
  products: DealsProduct[];
  maxProducts?: number;
}

export function DealsProductsPresenter({
  products,
  maxProducts = 10,
}: DealsProductsPresenterProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (delta: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  const limitedProducts = products.slice(0, maxProducts);

  return (
    <div className="relative overflow-hidden">
      <div className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full" 
          onClick={() => scrollByAmount(-320)}
        >
          ‹
        </Button>
      </div>
      <div className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full" 
          onClick={() => scrollByAmount(320)}
        >
          ›
        </Button>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
      >
        {limitedProducts.map((product) => (
          <div key={product.id} className="min-w-[260px] max-w-[260px] snap-start">
            <DealsProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { DealsProduct } from "@shared/SchemaProduct";
import { DealsProductCard } from "@/components/products/presenters/Deals/DealsProductCard";

interface DealsProductsPresenterProps {
  products: DealsProduct[];
  maxProducts?: number;         
  maxRenderProducts?: number;   
}

export function DealsProductsPresenter({
  products,
  maxProducts = 6,
  maxRenderProducts = 20,
}: DealsProductsPresenterProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (delta: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  const hasMoreProducts = products.length > maxProducts;

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="relative">
        {/* Botón izquierdo */}
        {hasMoreProducts && (
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
        )}

        {/* Botón derecho */}
        {hasMoreProducts && (
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
        )}

        {/* Contenedor con ancho limitado a `maxProducts` */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{
            width: `${maxProducts * 260 + (maxProducts - 1) * 16}px`, // 260px ancho card + 16px gap
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Renderizamos hasta `maxRenderProducts`, pero solo caben `maxProducts` visibles */}
          {products.slice(0, maxRenderProducts).map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start"
            >
              <DealsProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {hasMoreProducts && (
        <div className="text-center mt-2">
          <p className="text-xs text-slate-500">
            Desliza para ver más productos ({products.length} disponibles)
          </p>
        </div>
      )}
    </div>
  );
}

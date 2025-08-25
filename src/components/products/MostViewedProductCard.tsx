import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PriceTag } from "@/components/products/PriceTag";
import type { Product } from "@shared/schema";
import { Link } from "wouter";
import { useMostViewedProducts } from "@/hooks";

export function MostViewedProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
        <div className="relative">
          {typeof product.views === "number" && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-slate-900/90 text-white text-[10px] font-medium px-2 py-1">
                {product.views.toLocaleString()} vistas
              </Badge>
            </div>
          )}
          <img src={product.imageUrl} alt={product.name} className="w-full h-44 object-cover rounded-t-lg" />
        </div>
        <CardContent className="p-4">
          <div className="min-h-[48px]"> 
          <h3
            className="text-sm font-semibold text-slate-900 line-clamp-2 h-[40px] leading-snug"
          >
            {product.name}
          </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.brand}</p>
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-slate-900">
              <PriceTag price={product.price} offerPrice={product.offerPrice} />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface MostViewedProductsList {
  maxProducts?: number; // por defecto 4
}

export function MostViewedProductsList({ maxProducts = 4 }: MostViewedProductsList) {
  const { data: products, isLoading, error } = useMostViewedProducts(maxProducts);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: maxProducts }).map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
        ))}
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error al cargar productos más vistos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.slice(0, maxProducts).map((product) => (
        <MostViewedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

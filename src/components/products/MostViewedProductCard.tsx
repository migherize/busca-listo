import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PriceTag } from "@/components/products/PriceTag";
import type { Product } from "@shared/schema";
import { Link } from "wouter";

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
  products: Product[];
  maxProducts?: number; // por defecto 4
}

export function MostViewedProductsList({ products, maxProducts = 4 }: MostViewedProductsList) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {products.slice(0, maxProducts).map((product) => (
        <MostViewedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

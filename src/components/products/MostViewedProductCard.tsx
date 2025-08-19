import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

export function MostViewedProductCard({ product }: { product: Product }) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  return (
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
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.brand}</p>
        <div className="mt-2">
          <span className="text-base font-bold text-slate-900">
            {formatPrice(product.offerPrice ?? product.price)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}


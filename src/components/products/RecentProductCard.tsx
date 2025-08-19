import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

export function RecentProductCard({ product }: { product: Product }) {
  const handleViewMore = () => {
    window.open(product.url, "_blank", "noopener noreferrer");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4 p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-28 h-28 object-cover rounded-md flex-shrink-0"
        />
        <CardContent className="p-0 flex-1 flex items-start justify-between">
          <div className="pr-4">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{product.brand}</p>
            <div className="mt-2">
              <span className="text-base font-bold text-slate-900">
                {formatPrice(product.offerPrice ?? product.price)}
              </span>
              {product.offerPrice && (
                <span className="text-xs text-slate-500 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start">
            <Button onClick={handleViewMore} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              Ver más
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}


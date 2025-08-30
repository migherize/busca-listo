import { Badge } from "@/components/common/ui/badge";
import { Card, CardContent } from "@/components/common/ui/card";
import { PriceTag } from "@/components/products/PriceTag";
import type { MostViewedProduct } from "@shared/SchemaProduct";
import { Link } from "wouter";

interface MostViewedProductCardProps {
  product: MostViewedProduct;
}

export function MostViewedProductCard({ product }: MostViewedProductCardProps) {
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
          {/* Contenedor de imagen mejorado */}
          <div className="w-full h-44 bg-slate-100 rounded-t-lg overflow-hidden flex items-center justify-center">
            <img
              src={product.image_url ?? "/assets/logo1.jpeg"}
              alt={product.name ?? "Producto"}
              className="w-full h-full object-contain p-2"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/logo1.jpeg";
              }}
            />
          </div>
        </div>
        <CardContent className="p-4">
          <div className="min-h-[48px]">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 h-[40px] leading-snug">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.brand_name}</p>
          </div>
          <div className="mt-2">
            <PriceTag
              priceUsd={product.price_usd}
              priceBs={product.price_bs}
              offerPriceUsd={product.price_offer_usd}
              offerPriceBs={product.price_offer_bs}
              discountPercent={product.discount_percent}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

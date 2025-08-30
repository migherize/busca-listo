import { Badge } from "@/components/common/ui/badge";
import { Card, CardContent } from "@/components/common/ui/card";
import { PriceTag } from "@/components/products/PriceTag";
import type { DealsProduct } from "@shared/SchemaProduct";
import { Link } from "wouter";

interface DealsProductCardProps {
  product: DealsProduct;
}

export function DealsProductCard({ product }: DealsProductCardProps) {
  const discountPercentage = product.discount_percent || 0;

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
        <div className="relative">
          {/* Badge de oferta destacado */}
          {product.discount_percent && product.discount_percent > 0 && (
            <Badge className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 animate-pulse">
              🔥 {product.discount_percent}% OFF
            </Badge>
          )}
          
          {/* Badge de descripción de oferta si existe */}
          {product.offer_description && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-orange-500 text-white text-[10px] font-medium px-2 py-1">
                {product.offer_description}
              </Badge>
            </div>
          )}
          
          <img
            src={product.image_url ?? "/assets/logo1.jpeg"}
            alt={product.name ?? "Producto en oferta"}
            className="w-full h-44 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-4">
          <div className="min-h-[48px]">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 h-[40px] leading-snug">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.brand_name}</p>
          </div>
          
          {/* Precios con énfasis en la oferta */}
          <div className="mt-3">
          <PriceTag
              priceUsd={product.price_usd}
              priceBs={product.price_bs}
              offerPriceUsd={product.price_offer_usd}
              offerPriceBs={product.price_offer_bs}
              discountPercent={product.discount_percent}
            />
            
            {/* Información adicional de la oferta */}
            {product.discount_percent && product.discount_percent > 0 && product.price_offer_bs && (
              <div className="mt-2 text-center">
                <p className="text-xs text-green-600 font-medium">
                  ¡Ahorras Bs. {(product.price_bs - product.price_offer_bs).toLocaleString()}!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

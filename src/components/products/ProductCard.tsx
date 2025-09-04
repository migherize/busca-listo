import { Badge } from "@/components/common/ui/badge";
import { Card, CardContent } from "@/components/common/ui/card";
import { PriceTag } from "@/components/common/pricing/PriceTag";
import { Store, MapPin } from "lucide-react";
import { BaseProduct } from "@shared/SchemaProduct";
import { Link } from "wouter";

export interface ProductCardProps {
  product: BaseProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  // Generar URL de imagen con cache busting
  const imageUrl = product.image_url 
    ? `${product.image_url}?v=${product.id}-${Date.now()}`
    : "/assets/logo1.jpeg";

  return (
    <Link key={product.id} href={`/product/${product.id}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
        <div className="relative">
          {/* Badge de descuento si existe */}
          {product.discount_percent && product.discount_percent > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-red-500 text-white text-[10px] font-medium px-2 py-1">
                -{product.discount_percent}%
              </Badge>
            </div>
          )}
          
          {/* Contenedor de imagen mejorado */}
          <div className="w-full h-44 bg-slate-100 rounded-t-lg overflow-hidden flex items-center justify-center">
            <img
              key={`${product.id}-${product.image_url}`}
              src={imageUrl}
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
              {product.name ?? "Producto sin nombre"}
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
          
          {/* Información de sucursal y tienda */}
          <div className="mt-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col gap-1 text-xs text-slate-600">
              {product.company_name && (
                <div className="flex items-center gap-1">
                  <Store className="h-3 w-3 text-slate-400" />
                  <span className="font-medium text-slate-700">{product.company_name}</span>
                </div>
              )}
              {product.branch_name && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="text-slate-600">{product.branch_name}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

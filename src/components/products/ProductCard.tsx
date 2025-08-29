import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Store, ExternalLink } from "lucide-react";
import { BaseProduct } from "@shared/SchemaProduct";

export interface ProductCardProps {
  product: BaseProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = product.price_offer
    ? Math.round(((product.price_usd - product.price_offer) / product.price_usd) * 100)
    : 0;

  const handleVisitStore = () => {
    window.open(product.url, "_blank", "noopener noreferrer");
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Offer Badge */}
        {product.price_offer && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1">
              -{discountPercentage}%
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{product.brand_name}</p>
        </div>
        
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.subcategory_name.charAt(0).toUpperCase() + product.subcategory_name.slice(1)}
          </Badge>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            {product.price_offer ? (
              <>
                <span className="text-lg font-bold text-slate-900">
                  {formatPrice(product.price_offer)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.price_usd)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(product.price_usd)}
              </span>
            )}
          </div>
          {product.price_offer && (
            <p className="text-xs text-amber-600 mt-1">{product.price_offer}</p>
          )}
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center">
              <Package className="h-3 w-3 mr-1" />
              Stock: <span className="font-medium ml-1">{product.in_stock}</span>
            </span>
            <span className="flex items-center">
              <Store className="h-3 w-3 mr-1" />
              {product.branch_id}
            </span>
          </div>
        </div>
        
        <Button
          onClick={handleVisitStore}
          className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 hover:bg-blue-700 transition-colors"
        >
          Ir a la tienda
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

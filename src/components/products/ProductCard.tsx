import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/card";
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

  const discountPercentage = product.price_offer_bs
    ? Math.round(((product.price_bs - product.price_offer_bs) / product.price_bs) * 100)
    : 0;

  const handleVisitStore = () => {
    if (product.url) {
      window.open(product.url, "_blank", "noopener noreferrer");
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.image_url ?? "/assets/logo1.jpeg"}
          alt={product.name ?? "Producto"}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Offer Badge */}
        {product.price_offer_bs && (
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
            {product.name ?? "Producto sin nombre"}
          </h3>
          {product.brand_name && (
            <p className="text-xs text-slate-500 mt-1">{product.brand_name}</p>
          )}
        </div>
        
        <div className="mb-2">
          {product.subcategory_name && (
            <Badge variant="secondary" className="text-xs">
              {product.subcategory_name.charAt(0).toUpperCase() + product.subcategory_name.slice(1)}
            </Badge>
          )}
        </div>
        
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            {product.price_offer_bs ? (
              <>
                <span className="text-lg font-bold text-slate-900">
                  {formatPrice(product.price_offer_bs)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.price_bs)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(product.price_bs)}
              </span>
            )}
          </div>
          {product.price_offer_bs && (
            <p className="text-xs text-amber-600 mt-1">
              Precio en oferta: {formatPrice(product.price_offer_bs)}
            </p>
          )}
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center">
              <Package className="h-3 w-3 mr-1" />
              Stock: <span className="font-medium ml-1">{product.in_stock ?? 0}</span>
            </span>
            {product.branch_id && (
              <span className="flex items-center">
                <Store className="h-3 w-3 mr-1" />
                Sucursal: {product.branch_id}
              </span>
            )}
          </div>
        </div>
        
        {product.url && (
          <Button
            onClick={handleVisitStore}
            className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 hover:bg-blue-700 transition-colors"
          >
            Ir a la tienda
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

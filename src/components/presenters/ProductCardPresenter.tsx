import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Store, ExternalLink, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardPresenterProps {
  product: Product;
  variant?: "default" | "compact" | "detailed";
  showActions?: boolean;
  isHovered: boolean;
  isLoading: boolean;
  discountPercentage: number;
  isOnSale: boolean;
  hasStock: boolean;
  requiresPrescription: boolean;
  formatPrice: (price: number) => string;
  formatCategory: (category: string) => string;
  onProductClick?: () => void;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  onVisitStore?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ProductCardPresenter({
  product,
  variant = "default",
  showActions = true,
  isHovered,
  isLoading,
  discountPercentage,
  isOnSale,
  hasStock,
  requiresPrescription,
  formatPrice,
  formatCategory,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onVisitStore,
  onMouseEnter,
  onMouseLeave,
}: ProductCardPresenterProps) {
  const getCardClasses = () => {
    const baseClasses = "bg-white rounded-lg shadow-sm border border-slate-200 transition-all duration-200";
    
    if (variant === "compact") {
      return `${baseClasses} hover:shadow-md`;
    }
    
    if (variant === "detailed") {
      return `${baseClasses} hover:shadow-lg transform hover:-translate-y-1`;
    }
    
    return `${baseClasses} hover:shadow-md`;
  };

  const getImageClasses = () => {
    const baseClasses = "w-full object-cover rounded-t-lg";
    
    switch (variant) {
      case "compact":
        return `${baseClasses} h-32`;
      case "detailed":
        return `${baseClasses} h-56`;
      default:
        return `${baseClasses} h-48`;
    }
  };

  const renderBadges = () => (
    <>
      {/* Prescription Badge */}
      {requiresPrescription && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1">
            <Package className="h-3 w-3 mr-1" />
            Receta
          </Badge>
        </div>
      )}
      
      {/* Offer Badge */}
      {isOnSale && (
        <div className="absolute top-2 left-2">
          <Badge className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1">
            -{discountPercentage}%
          </Badge>
        </div>
      )}

      {/* Stock Badge */}
      {!hasStock && (
        <div className="absolute top-2 left-2">
          <Badge className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1">
            Sin Stock
          </Badge>
        </div>
      )}
    </>
  );

  const renderPrice = () => (
    <div className="mb-3">
      <div className="flex items-center space-x-2">
        {isOnSale ? (
          <>
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(product.offerPrice!)}
            </span>
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product. price_usd)}
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(product. price_usd)}
          </span>
        )}
      </div>
      {product.offerDescription && (
        <p className="text-xs text-amber-600 mt-1">{product.offerDescription}</p>
      )}
    </div>
  );

  const renderActions = () => {
    if (!showActions) return null;

    if (variant === "compact") {
      return (
        <Button
          onClick={onVisitStore}
          size="sm"
          className="w-full bg-blue-600 text-white text-xs font-medium py-1 px-2 hover:bg-blue-700 transition-colors"
        >
          Ver
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      );
    }

    return (
      <div className="space-y-2">
        <Button
          onClick={onVisitStore}
          className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 hover:bg-blue-700 transition-colors"
          disabled={!hasStock}
        >
          {hasStock ? "Ir a la tienda" : "Sin stock"}
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
        
        {variant === "detailed" && (
          <div className="flex space-x-2">
            <Button
              onClick={onAddToCart}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!hasStock || isLoading}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isLoading ? "..." : "Carrito"}
            </Button>
            <Button
              onClick={onAddToWishlist}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={isLoading}
            >
              <Heart className="h-4 w-4 mr-1" />
              {isLoading ? "..." : "Favoritos"}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card 
      className={getCardClasses()}
      onClick={onProductClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className={getImageClasses()}
        />
        {renderBadges()}
      </div>
      
      <CardContent className={`p-4 ${variant === "compact" ? "p-3" : ""}`}>
        <div className="mb-2">
          <h3 className={`font-medium text-slate-900 line-clamp-2 ${
            variant === "compact" ? "text-sm" : "text-sm"
          }`}>
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{product.brand_name}</p>
        </div>
        
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {formatCategory(product.category)}
          </Badge>
        </div>
        
        {renderPrice()}
        
        {variant !== "compact" && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center">
                <Package className="h-3 w-3 mr-1" />
                Stock: <span className="font-medium ml-1">{product.stock}</span>
              </span>
              <span className="flex items-center">
                <Store className="h-3 w-3 mr-1" />
                {product.supplier}
              </span>
            </div>
          </div>
        )}
        
        {renderActions()}
      </CardContent>
    </Card>
  );
}

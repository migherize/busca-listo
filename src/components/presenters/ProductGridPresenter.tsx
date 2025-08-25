import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { RecentProductCard } from "./RecentProductCard";
import { MostViewedProductCard } from "./MostViewedProductCard";
import type { Product } from "@shared/schema";

interface ProductGridPresenterProps {
  products: Product[];
  variant?: "default" | "recent" | "mostViewed";
  sortBy: "price" | "name" | "popularity";
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: "price" | "name" | "popularity") => void;
  onProductClick?: (product: Product) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function ProductGridPresenter({
  products,
  variant = "default",
  sortBy,
  sortOrder,
  onSortChange,
  onProductClick,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: ProductGridPresenterProps) {
  const getSortIcon = (field: "price" | "name" | "popularity") => {
    if (sortBy !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getSortLabel = (field: "price" | "name" | "popularity") => {
    switch (field) {
      case "price": return "Precio";
      case "name": return "Nombre";
      case "popularity": return "Popularidad";
      default: return field;
    }
  };

  const renderProductCard = (product: Product) => {
    switch (variant) {
      case "recent":
        return <RecentProductCard key={product.id} product={product} />;
      case "mostViewed":
        return <MostViewedProductCard key={product.id} product={product} />;
      default:
        return (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick?.(product)}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controles de ordenamiento */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-700">Ordenar por:</span>
          {(["price", "name", "popularity"] as const).map((field) => (
            <Button
              key={field}
              variant="ghost"
              size="sm"
              onClick={() => onSortChange(field)}
              className={`flex items-center space-x-1 ${
                sortBy === field ? "bg-blue-50 text-blue-700" : ""
              }`}
            >
              {getSortIcon(field)}
              <span>{getSortLabel(field)}</span>
            </Button>
          ))}
        </div>
        
        <div className="text-sm text-slate-500">
          {products.length} productos
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(renderProductCard)}
      </div>

      {/* Botón de cargar más */}
      {hasMore && (
        <div className="text-center pt-6">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
            size="lg"
          >
            {isLoading ? "Cargando..." : "Cargar más productos"}
          </Button>
        </div>
      )}

      {/* Estado vacío */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400">
            <p className="text-lg font-medium">No se encontraron productos</p>
            <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
          </div>
        </div>
      )}
    </div>
  );
}

import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/card";
import { Badge } from "@/components/common/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Tag } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  products: Array<{
    id: string;
    name: string;
    originalPrice: number;
    offerPrice: number;
    discount: string;
    imageUrl: string;
    stock: number;
  }>;
}

interface DealsCarouselPresenterProps {
  deals: Deal[];
  currentDealIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onDealClick?: (deal: Deal) => void;
  onProductClick?: (product: any) => void;
}

export function DealsCarouselPresenter({
  deals,
  currentDealIndex,
  onNext,
  onPrev,
  onDealClick,
  onProductClick,
}: DealsCarouselPresenterProps) {
  const currentDeal = deals[currentDealIndex];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!currentDeal) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
      {/* Header de la oferta */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Tag className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">{currentDeal.title}</h2>
            <Badge className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1">
              {currentDeal.discount}
            </Badge>
          </div>
          <p className="text-slate-600">{currentDeal.description}</p>
          <div className="flex items-center space-x-2 mt-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>Válido hasta {formatDate(currentDeal.validUntil)}</span>
          </div>
        </div>
        
        {/* Controles de navegación */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrev}
            disabled={deals.length <= 1}
            className="h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-sm text-slate-500">
            {currentDealIndex + 1} de {deals.length}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={deals.length <= 1}
            className="h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Productos de la oferta */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDeal.products.map((product) => (
          <Card
            key={product.id}
            className="bg-white hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onProductClick?.(product)}
          >
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-800">
                  {product.discount}
                </Badge>
              </div>
              
              <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold text-slate-900">
                  {formatPrice(product.offerPrice)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              
              <div className="text-xs text-slate-500">
                Stock: {product.stock} unidades
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Indicadores de página */}
      {deals.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Aquí podrías implementar navegación directa
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentDealIndex
                  ? "bg-blue-600"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

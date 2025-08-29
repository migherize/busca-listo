import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, DollarSign, Calendar, Tag } from "lucide-react";
import { PriceTag } from "./PriceTag";

interface ProductPricingProps {
  price: number;
  offerPrice?: number | null;
  historicalPrice?: number | null;
  priceUSD?: number | null;
  offerDescription?: string | null;
  stock: number;
  views?: number;
}

export function ProductPricing({
  price,
  offerPrice,
  historicalPrice,
  priceUSD,
  offerDescription,
  stock,
  views,
}: ProductPricingProps) {
  const hasOffer = offerPrice && offerPrice < price;
  const hasHistoricalPrice = historicalPrice && historicalPrice !== price;
  const discountPercentage = hasOffer ? Math.round(((price - offerPrice!) / price) * 100) : 0;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-blue-900">
          <Tag className="h-6 w-6 text-blue-600" />
          Información de Precios
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Precio Principal */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-900 mb-2">
            <PriceTag
              priceUsd={priceUSD || 0}
              priceBs={price}
              offerPriceUsd={offerPrice}
              offerPriceBs={offerPrice}
              discountPercent={discountPercentage}
            />
          </div>
          
          {hasOffer && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="destructive" className="text-sm">
                -{discountPercentage}%
              </Badge>
              <span className="text-slate-600 line-through">
                ${price.toLocaleString()}
              </span>
            </div>
          )}
          
          {offerDescription && (
            <p className="text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-block">
              {offerDescription}
            </p>
          )}
        </div>

        {/* Información Adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Precio en USD */}
          {priceUSD && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-slate-600">Precio en USD</p>
                <p className="font-semibold text-green-700">${priceUSD.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Precio Histórico */}
          {hasHistoricalPrice && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-slate-600">Precio Histórico</p>
                <p className="font-semibold text-orange-700">${historicalPrice.toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
            <div className={`w-3 h-3 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <div>
              <p className="text-sm text-slate-600">Stock</p>
              <p className={`font-semibold ${stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {stock > 0 ? `${stock} unidades` : 'Sin stock'}
              </p>
            </div>
          </div>

          {/* Vistas */}
          {views && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">Vistas</p>
                <p className="font-semibold text-purple-700">{views.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Ahorro si hay oferta */}
        {hasOffer && (
          <div className="text-center p-3 bg-green-100 rounded-lg border border-green-200">
            <p className="text-sm text-green-700">
              <span className="font-semibold">¡Ahorras ${(price - offerPrice!).toLocaleString()}!</span>
              <br />
              {discountPercentage}% de descuento
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


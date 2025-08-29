import React from "react";

interface PriceTagProps {
  priceUsd: number;            
  priceBs: number;             
  offerPriceUsd?: number | null;     
  offerPriceBs?: number | null;      
  discountPercent?: number | null;  
}

export function PriceTag({ 
  priceUsd, 
  priceBs, 
  offerPriceUsd, 
  offerPriceBs, 
  discountPercent 
}: PriceTagProps) {
  const hasOffer = discountPercent && discountPercent > 0;

  return (
    <div className="flex flex-col gap-1">
      {hasOffer ? (
        <>
          {/* Precio de oferta destacado */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              ${offerPriceUsd?.toFixed(2)}
            </span>
            <span className="text-sm text-green-600">
              Bs. {offerPriceBs?.toLocaleString()}
            </span>
          </div>
          
          {/* Precio original tachado */}
          <div className="flex items-center gap-2 text-slate-500">
            <span className="line-through">
              ${priceUsd.toFixed(2)}
            </span>
            <span className="line-through text-sm">
              Bs. {priceBs.toLocaleString()}
            </span>
          </div>
          
          {/* Porcentaje de descuento */}
          <div className="text-xs text-green-600 font-medium">
            -{discountPercent}% de descuento
          </div>
        </>
      ) : (
        /* Precio normal sin oferta */
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">
            ${priceUsd.toFixed(2)}
          </span>
          <span className="text-sm text-slate-600">
            Bs. {priceBs.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
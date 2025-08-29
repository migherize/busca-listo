import React from "react";

interface PriceTagProps {
  priceUsd: number;            
  priceBs: number;             
  offerPrice?: number | null;  
}

export function PriceTag({ priceUsd, offerPrice, priceBs }: PriceTagProps) {
  const formatPriceUsd = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  const formatPriceBs = (amount: number) =>
    new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "VES",
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div>
      {/* Precio en USD */}
      <div className="text-base font-bold text-slate-900">
        {offerPrice ? (
          <>
            {formatPriceUsd(offerPrice)}{" "}
            <span className="text-xs text-slate-500 line-through">
              {formatPriceUsd(priceUsd)}
            </span>
          </>
        ) : (
          formatPriceUsd(priceUsd)
        )}
      </div>

      {/* Precio en Bs */}
      <div className="text-xs text-slate-500 mt-1">
        {formatPriceBs(priceBs)}
      </div>
    </div>
  );
}

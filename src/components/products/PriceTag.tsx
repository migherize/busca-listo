import React from "react";

interface PriceTagProps {
  PriceUsd: number;
  PriceBs: number | null;
  OfferPrice?: number | null;
}

export function PriceTag({ PriceUsd, OfferPrice, PriceBs }: PriceTagProps) {
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
        {OfferPrice ? (
          <>
            {formatPriceUsd(OfferPrice)}{" "}
            <span className="text-xs text-slate-500 line-through">
              {formatPriceUsd(PriceUsd)}
            </span>
          </>
        ) : (
          formatPriceUsd(PriceUsd)
        )}
      </div>

      {/* Precio en Bs */}
      <div className="text-xs text-slate-500 mt-1">
        {formatPriceBs(PriceBs)}
      </div>
    </div>
  );
}

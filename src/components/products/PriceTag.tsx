import React from "react";

interface PriceTagProps {
  price: number;
  offerPrice?: number| null;
  rate?: number;
}

export function PriceTag({ price, offerPrice, rate = 136.89 }: PriceTagProps) {
  const formatPriceBs = (amount: number) =>
    new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "VES",
      minimumFractionDigits: 0,
    }).format(amount);

  const calculateRef = (amount: number) => amount / rate;

  const formatPriceRef = (amount: number) => `REF. ${calculateRef(amount).toFixed(2)}`;

  return (
    <div>
      {/* Precio en REF */}
      <div className="text-base font-bold text-slate-900">
        {offerPrice ? (
          <>
            {formatPriceRef(offerPrice)}{" "}
            <span className="text-xs text-slate-500 line-through">{formatPriceRef(price)}</span>
          </>
        ) : (
          formatPriceRef(price)
        )}
      </div>

      {/* Precio en Bs */}
      <div className="text-xs text-slate-500 mt-1">
        {formatPriceBs(offerPrice ?? price)}
      </div>
    </div>
  );
}

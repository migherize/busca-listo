import { PriceTag } from "@/components/products/PriceTag";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { RecentProduct } from "@shared/SchemaProduct";

interface RecentProductCardProps {
  product: RecentProduct;
}

export function RecentProductCard({ product }: RecentProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="flex gap-4 p-4">
          <img
            src={product.image_url ?? "/assets/logo1.jpeg"}
            alt={product.name ?? "Producto"}
            className="w-28 h-28 object-cover rounded-md flex-shrink-0"
          />
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{product.brand_name}</p>
            </div>

            <PriceTag
              priceUsd={product.price_usd}
              priceBs={product.price_bs}
              offerPrice={product.price_offer}
            />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

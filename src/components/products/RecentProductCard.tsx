import { PriceTag } from "@/components/products/PriceTag";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
interface RecentProductCardProps {
  product: Product;
}

interface RecentProductsListProps {
  products: Product[];
}

export function RecentProductCard({ product }: RecentProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="flex gap-4 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-28 h-28 object-cover rounded-md flex-shrink-0"
          />
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{product.brand}</p>
            </div>

            {/* Precio */}
            <PriceTag price={product.price} offerPrice={product.offerPrice} />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}


export function RecentProductsList({ products }: RecentProductsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.slice(0, 3).map((product) => (
        <RecentProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

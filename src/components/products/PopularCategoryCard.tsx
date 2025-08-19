import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export interface PopularCategoryCardProps {
  name: string;
  imageUrl: string;
  categoryKey: string; // clave de la categoría para el link
}

export function PopularCategoryCard({ name, imageUrl, categoryKey }: PopularCategoryCardProps) {
  return (
    <Link href={`/category/${categoryKey}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="h-28 w-full overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-4 flex items-center justify-center">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 text-center">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}

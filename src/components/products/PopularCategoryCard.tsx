import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { usePopularCategories } from "@/hooks";

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

export function PopularCategoriesList({ maxCategories = 6 }: { maxCategories?: number }) {
  const { data: categories, isLoading, error } = usePopularCategories(maxCategories);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {Array.from({ length: maxCategories }).map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error al cargar categorías populares</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {categories.slice(0, maxCategories).map((category) => (
        <PopularCategoryCard
          key={category.key}
          name={category.name}
          imageUrl={category.imageUrl}
          categoryKey={category.key}
        />
      ))}
    </div>
  );
}

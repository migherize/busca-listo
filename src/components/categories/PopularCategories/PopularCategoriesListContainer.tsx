import { usePopularCategories } from "@/hooks/usePopularCategories";
import { PopularCategoryCard } from "./PopularCategoryCardPresenter";
import type { CategoryPopular } from "@shared/SchemaCategory";

interface PopularCategoriesListProps {
  limit?: number;
}

export function PopularCategoriesList({ limit = 6 }: PopularCategoriesListProps) {
  const { data: categories, isLoading, error } = usePopularCategories(limit);
  console.log("Backend most views categories:", categories);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: limit }).map((_, idx) => (
          <div key={idx} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  if (error || !categories) {
    return <div className="text-center py-8 text-red-500">Error al cargar categorías populares</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.slice(0, limit).map((cat: CategoryPopular) => (
        <PopularCategoryCard
          key={cat.name}
          name={cat.name}
          categoryKey={cat.name}
          imageUrl={cat.image_urls?.[0]}
        />
      ))}
    </div>
  );
}

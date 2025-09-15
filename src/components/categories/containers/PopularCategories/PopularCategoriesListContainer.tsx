import { usePopularCategories } from "@/hooks/usePopularCategories";
import { PopularCategoryCard } from "@/components/categories/presenters/PopularCategories/PopularCategoryCardPresenter";
import { CategorySkeleton } from "@/components/common/skeleton";
import type { CategoryPopular } from "@shared/SchemaCategory";

interface PopularCategoriesListProps {
  limit?: number;
}

export function PopularCategoriesList({ limit = 6 }: PopularCategoriesListProps) {
  const { data: categories, isLoading, error } = usePopularCategories(limit);

  if (isLoading) {
    return (
      <CategorySkeleton 
        count={limit}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        variant="grid"
      />
    );
  }

  if (error) {
    return (
      <CategorySkeleton 
        count={limit}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        variant="grid"
      />
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No hay categorías populares disponibles
        </div>
        <div className="text-gray-400 text-sm">
          Vuelve pronto para ver las categorías más populares
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.slice(0, limit).map((cat: CategoryPopular) => (
        <PopularCategoryCard
          key={cat.name}
          name={cat.name}
          categoryKey={cat.key}
          imageUrl={cat.image_urls?.[0]}
        />
      ))}
    </div>
  );
}

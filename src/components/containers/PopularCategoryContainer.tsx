import { useState, useEffect } from "react";
import { PopularCategoryPresenter } from "@/components/presenters/PopularCategoryPresenter";
import categoriesData from "@/data/categories.json";
import type { Category } from "@shared/schema";

interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  popular: boolean;
  subcategories: string[];
}

interface PopularCategoryContainerProps {
  categories?: Category[];
  limit?: number;
  onCategoryClick?: (category: Category) => void;
  onSubcategoryClick?: (subcategory: string) => void;
}

export function PopularCategoryContainer({
  categories = [],
  limit = 6,
  onCategoryClick,
  onSubcategoryClick,
}: PopularCategoryContainerProps) {
  const [popularCategories, setPopularCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar categorías desde JSON o usar las proporcionadas
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      
      try {
        // Intentar cargar desde JSON primero
        if (categoriesData && categoriesData.categories) {
          const popular = categoriesData.categories
            .filter(cat => cat.popular)
            .slice(0, limit);
          setPopularCategories(popular);
        } else {
          // Fallback: usar categorías proporcionadas
          const fallbackCategories = generateFallbackCategories(categories, limit);
          setPopularCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        // Fallback: usar categorías proporcionadas
        const fallbackCategories = generateFallbackCategories(categories, limit);
        setPopularCategories(fallbackCategories);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [categories, limit]);

  const generateFallbackCategories = (categories: Category[], limit: number): CategoryData[] => {
    if (categories.length === 0) return [];

    return categories.slice(0, limit).map((cat, index) => ({
      id: cat.id || `fallback-${index}`,
      name: cat.name,
      description: `Productos de ${cat.name}`,
      image: `/assets/categories/${cat.name.toLowerCase()}.jpg`,
      productCount: Math.floor(Math.random() * 500) + 100,
      popular: true,
      subcategories: [cat.name],
    }));
  };

  const handleCategoryClick = (category: CategoryData) => {
    const mappedCategory: Category = {
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
    };
    
    if (onCategoryClick) {
      onCategoryClick(mappedCategory);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategory);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-slate-200 h-4 rounded mb-2"></div>
            <div className="bg-slate-200 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (popularCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400">
          <p className="text-lg font-medium">No hay categorías disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <PopularCategoryPresenter
      categories={popularCategories}
      onCategoryClick={handleCategoryClick}
      onSubcategoryClick={handleSubcategoryClick}
    />
  );
}

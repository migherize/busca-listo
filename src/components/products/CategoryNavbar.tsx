import { Button } from "@/components/ui/button";
import type { CategoryNavbarProps } from "@shared/schema";
import { categories, sortOptions } from "@/data/categories";

export function CategoryNavbar({
  selectedCategory,
  onCategorySelect,
  selectedSort,
  onSortSelect,
}: CategoryNavbarProps & {
  selectedSort: string;
  onSortSelect: (sortKey: string) => void;
}) {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Categorías */}
        <div className="flex items-center space-x-4 py-3 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "ghost"}
              size="sm"
              className={
                selectedCategory === category.key
                  ? "whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100"
                  : "whitespace-nowrap px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-full"
              }
              onClick={() => onCategorySelect(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Ordenar por */}
        <div className="flex items-center space-x-4 py-3 overflow-x-auto border-t border-slate-100">
          {sortOptions.map((option) => (
            <Button
              key={option.key}
              variant={selectedSort === option.key ? "default" : "ghost"}
              size="sm"
              className={
                selectedSort === option.key
                  ? "whitespace-nowrap px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-full border border-purple-200 hover:bg-purple-100"
                  : "whitespace-nowrap px-4 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-slate-50 rounded-full"
              }
              onClick={() => onSortSelect(option.key)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}

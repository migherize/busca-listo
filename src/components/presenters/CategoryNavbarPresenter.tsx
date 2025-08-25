import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import type { Category } from "@shared/category";

interface CategoryNavbarPresenterProps {
  categories: Category[];
  sortOptions: Array<{ key: string; label: string }>;
  selectedCategory: string | "all";
  selectedSort: string;
  showCategories: boolean;
  showSorting: boolean;
  isSticky: boolean;
  showChangeIndicators: boolean;
  onCategorySelect: (category: string | "all") => void;
  onSortSelect: (sortKey: string) => void;
  onCategoryHover?: (category: string) => void;
  onSortHover?: (sortKey: string) => void;
}

export function CategoryNavbarPresenter({
  categories,
  sortOptions,
  selectedCategory,
  selectedSort,
  showCategories,
  showSorting,
  isSticky,
  showChangeIndicators,
  onCategorySelect,
  onSortSelect,
  onCategoryHover,
  onSortHover,
}: CategoryNavbarPresenterProps) {
  const getNavbarClasses = () => {
    const baseClasses = "bg-white border-b border-slate-200 transition-all duration-200";
    
    if (isSticky) {
      return `${baseClasses} sticky top-0 z-50 shadow-md`;
    }
    
    return baseClasses;
  };

  const getCategoryButtonClasses = (categoryKey: string) => {
    const baseClasses = "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-200";
    
    if (selectedCategory === categoryKey) {
      return `${baseClasses} text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100`;
    }
    
    return `${baseClasses} text-slate-600 hover:text-blue-600 hover:bg-slate-50`;
  };

  const getSortButtonClasses = (sortKey: string) => {
    const baseClasses = "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-200";
    
    if (selectedSort === sortKey) {
      return `${baseClasses} text-purple-600 bg-purple-50 border border-purple-200 hover:bg-purple-100`;
    }
    
    return `${baseClasses} text-slate-600 hover:text-purple-600 hover:bg-slate-50`;
  };

  const getSortIcon = (sortKey: string) => {
    switch (sortKey) {
      case "price-asc":
        return <SortAsc className="h-4 w-4 mr-1" />;
      case "price-desc":
        return <SortDesc className="h-4 w-4 mr-1" />;
      case "name-asc":
        return <SortAsc className="h-4 w-4 mr-1" />;
      case "name-desc":
        return <SortDesc className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const renderCategories = () => {
    if (!showCategories) return null;

    return (
      <div className="flex items-center space-x-4 py-3 overflow-x-auto">
        {/* Botón "Todas" */}
        <Button
          variant={selectedCategory === "all" ? "default" : "ghost"}
          size="sm"
          className={getCategoryButtonClasses("all")}
          onClick={() => onCategorySelect("all")}
          onMouseEnter={() => onCategoryHover?.("all")}
        >
          Todas
        </Button>
        
        {/* Categorías */}
        {categories.map((category) => (
          <Button
            key={category.key}
            variant="ghost"
            size="sm"
            className={getCategoryButtonClasses(category.key)}
            onClick={() => onCategorySelect(category.key)}
            onMouseEnter={() => onCategoryHover?.(category.key)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    );
  };

  const renderSorting = () => {
    if (!showSorting) return null;

    return (
      <div className="flex items-center space-x-4 py-3 overflow-x-auto border-t border-slate-100">
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <SortAsc className="h-4 w-4" />
          <span>Ordenar por:</span>
        </div>
        
        {sortOptions.map((option) => (
          <Button
            key={option.key}
            variant="ghost"
            size="sm"
            className={getSortButtonClasses(option.key)}
            onClick={() => onSortSelect(option.key)}
            onMouseEnter={() => onSortHover?.(option.key)}
          >
            {getSortIcon(option.key)}
            {option.label}
          </Button>
        ))}
      </div>
    );
  };

  const renderChangeIndicators = () => {
    if (!showChangeIndicators) return null;

    return (
      <div className="flex items-center justify-center py-2 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <Filter className="h-4 w-4" />
          <span>Filtros aplicados</span>
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="text-xs">
              {categories.find(c => c.key === selectedCategory)?.label || selectedCategory}
            </Badge>
          )}
          {selectedSort !== "default" && (
            <Badge variant="secondary" className="text-xs">
              {sortOptions.find(o => o.key === selectedSort)?.label || selectedSort}
            </Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderCategories()}
        {renderSorting()}
        {renderChangeIndicators()}
      </div>
    </nav>
  );
}

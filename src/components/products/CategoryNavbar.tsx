import { Button } from "@/components/ui/button";
import type { Category, CategoryNavbarProps } from "@shared/schema";

const categories = [
  { key: "all" as const, label: "Todos" },
  { key: "medicamentos" as const, label: "Medicamentos" },
  { key: "vitaminas" as const, label: "Vitaminas" },
  { key: "cuidado-personal" as const, label: "Cuidado Personal" },
  { key: "suplementos" as const, label: "Suplementos" },
  { key: "belleza" as const, label: "Belleza" },
];

export function CategoryNavbar({ selectedCategory, onCategorySelect }: CategoryNavbarProps) {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 py-4 overflow-x-auto">
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
      </div>
    </nav>
  );
}

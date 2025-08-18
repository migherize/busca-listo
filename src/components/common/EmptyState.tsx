import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { EmptyStateProps } from "@shared/schema";

export function EmptyState({ searchTerm, selectedCategory, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          No se encontraron productos
        </h3>
        <p className="text-slate-600 mb-6">
          No pudimos encontrar productos para "{searchTerm}" 
          {selectedCategory !== "all" && ` en la categoría ${selectedCategory}`}.
        </p>
        <Button
          onClick={onClearFilters}
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Ver todos los productos
        </Button>
      </div>
    </div>
  );
}

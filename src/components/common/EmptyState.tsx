import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { EmptyStateProps } from "@shared/schema";

interface SimpleEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  searchTerm, 
  selectedCategory, 
  onClearFilters,
  title,
  description,
  actionText,
  onAction
}: EmptyStateProps & Partial<SimpleEmptyStateProps>) {
  // Si se proporcionan props simples, usar esa versión
  if (title || description) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {title || "No se encontraron productos"}
          </h3>
          <p className="text-slate-600 mb-6">
            {description || "No pudimos encontrar lo que buscas."}
          </p>
          {actionText && onAction && (
            <Button
              onClick={onAction}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Versión original para búsquedas
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

import { useState, useEffect, useCallback, useMemo } from "react";
import { CategoryNavbarPresenter } from "@/components/presenters/CategoryNavbarPresenter";
import { categories, sortOptions } from "@shared/SchemaCategory";
import type { Category } from "@shared/SchemaCategory";

interface CategoryNavbarContainerProps {
  selectedCategory: string | "all";
  onCategorySelect: (category: string | "all") => void;
  selectedSort: string;
  onSortSelect: (sortKey: string) => void;
  showCategories?: boolean;
  showSorting?: boolean;
  sticky?: boolean;
  onCategoryHover?: (category: string) => void;
  onSortHover?: (sortKey: string) => void;
}

export function CategoryNavbarContainer({
  selectedCategory,
  onCategorySelect,
  selectedSort,
  onSortSelect,
  showCategories = true,
  showSorting = true,
  sticky = false,
  onCategoryHover,
  onSortHover,
}: CategoryNavbarContainerProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filtrar categorías activas
  const activeCategories = useMemo(() => {
    return categories.filter(category => {
      // Aquí podrías agregar lógica para filtrar categorías basada en:
      // - Productos disponibles
      // - Permisos del usuario
      // - Configuración de la tienda
      return true;
    });
  }, []);

  // Filtrar opciones de ordenamiento disponibles
  const availableSortOptions = useMemo(() => {
    return sortOptions.filter(option => {
      // Aquí podrías agregar lógica para filtrar opciones basada en:
      // - Tipo de productos
      // - Configuración de la tienda
      // - Preferencias del usuario
      return true;
    });
  }, []);

  // Manejar scroll para sticky behavior
  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setIsSticky(position > 100); // Sticky después de 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Handlers con debounce para hover
  const handleCategoryHover = useCallback((category: string) => {
    if (onCategoryHover) {
      onCategoryHover(category);
    }
  }, [onCategoryHover]);

  const handleSortHover = useCallback((sortKey: string) => {
    if (onSortHover) {
      onSortHover(sortKey);
    }
  }, [onSortHover]);

  // Validar selección de categoría
  const handleCategorySelect = useCallback((category: string | "all") => {
    // Validar que la categoría sea válida
    if (category === "all" || activeCategories.some(c => c.key === category)) {
      onCategorySelect(category);
    } else {
      console.warn(`Categoría inválida: ${category}`);
    }
  }, [activeCategories, onCategorySelect]);

  // Validar selección de ordenamiento
  const handleSortSelect = useCallback((sortKey: string) => {
    // Validar que la opción de ordenamiento sea válida
    if (availableSortOptions.some(option => option.key === sortKey)) {
      onSortSelect(sortKey);
    } else {
      console.warn(`Opción de ordenamiento inválida: ${sortKey}`);
    }
  }, [availableSortOptions, onSortSelect]);

  // Determinar si hay cambios en la selección
  const hasCategoryChanges = useMemo(() => {
    return selectedCategory !== "all";
  }, [selectedCategory]);

  const hasSortChanges = useMemo(() => {
    return selectedSort !== "default";
  }, [selectedSort]);

  // Determinar si mostrar indicadores de cambio
  const showChangeIndicators = hasCategoryChanges || hasSortChanges;

  return (
    <CategoryNavbarPresenter
      categories={activeCategories}
      sortOptions={availableSortOptions}
      selectedCategory={selectedCategory}
      selectedSort={selectedSort}
      showCategories={showCategories}
      showSorting={showSorting}
      isSticky={isSticky}
      showChangeIndicators={showChangeIndicators}
      onCategorySelect={handleCategorySelect}
      onSortSelect={handleSortSelect}
      onCategoryHover={handleCategoryHover}
      onSortHover={handleSortHover}
    />
  );
}

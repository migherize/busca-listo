import { useState, useCallback, useMemo } from 'react';

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  availableOnline?: boolean;
  requirePrescription?: boolean;
  supplier?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useProductFilters(initialFilters: Partial<ProductFilters> = {}) {
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialFilters,
  });

  const updateFilter = useCallback((key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      sortBy: 'name',
      sortOrder: 'asc',
    });
  }, []);

  const clearFilter = useCallback((key: keyof ProductFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    const defaultFilters = { sortBy: 'name', sortOrder: 'asc' };
    return Object.keys(filters).some(key => {
      const filterKey = key as keyof ProductFilters;
      return filters[filterKey] !== defaultFilters[filterKey as keyof typeof defaultFilters];
    });
  }, [filters]);

  const activeFiltersCount = useMemo(() => {
    const defaultFilters = { sortBy: 'name', sortOrder: 'asc' };
    return Object.keys(filters).filter(key => {
      const filterKey = key as keyof ProductFilters;
      return filters[filterKey] !== defaultFilters[filterKey as keyof typeof defaultFilters];
    }).length;
  }, [filters]);

  const getFilterSummary = useCallback(() => {
    const summary: string[] = [];
    
    if (filters.category) summary.push(`Categoría: ${filters.category}`);
    if (filters.subcategory) summary.push(`Subcategoría: ${filters.subcategory}`);
    if (filters.brand) summary.push(`Marca: ${filters.brand}`);
    if (filters.minPrice !== undefined) summary.push(`Precio mínimo: $${filters.minPrice}`);
    if (filters.maxPrice !== undefined) summary.push(`Precio máximo: $${filters.maxPrice}`);
    if (filters.inStock !== undefined) summary.push(`En stock: ${filters.inStock ? 'Sí' : 'No'}`);
    if (filters.availableOnline !== undefined) summary.push(`Disponible online: ${filters.availableOnline ? 'Sí' : 'No'}`);
    if (filters.requirePrescription !== undefined) summary.push(`Requiere receta: ${filters.requirePrescription ? 'Sí' : 'No'}`);
    if (filters.supplier) summary.push(`Proveedor: ${filters.supplier}`);
    
    return summary;
  }, [filters]);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    clearFilter,
    hasActiveFilters,
    activeFiltersCount,
    getFilterSummary,
  };
}


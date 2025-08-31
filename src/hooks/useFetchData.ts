import { useState, useEffect } from "react";
import { getMockProducts } from "@/mockProducts";
import type { BaseProduct } from "@shared/SchemaProduct";

interface UseFetchDataProps {
  searchTerm: string;
  selectedCategory: string | "all";
}

interface UseFetchDataReturn {
  products: BaseProduct[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchData = ({ searchTerm, selectedCategory }: UseFetchDataProps): UseFetchDataReturn => {
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));

      // Usar la nueva función getMockProducts que ya maneja filtros
      const filteredProducts = getMockProducts({
        category: selectedCategory,
        searchTerm,
      });

      setProducts(filteredProducts);
    } catch (err) {
      setError("Error al cargar los productos. Por favor, inténtalo de nuevo.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedCategory]);

  const refetch = () => {
    fetchData();
  };

  return {
    products,
    isLoading,
    error,
    refetch,
  };
};

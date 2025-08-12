import { useState, useEffect } from "react";
import { mockProducts } from "../data/mockProducts";
import type { Product, Category } from "@shared/schema";

interface UseFetchDataProps {
  searchTerm: string;
  selectedCategory: Category | "all";
}

interface UseFetchDataReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchData = ({ searchTerm, selectedCategory }: UseFetchDataProps): UseFetchDataReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));

      let filteredProducts = mockProducts;

      // Filtrar por categoría
      if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(
          product => product.category === selectedCategory
        );
      }

      // Filtrar por término de búsqueda
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        filteredProducts = filteredProducts.filter(
          product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.brand.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            product.subcategory.toLowerCase().includes(searchLower)
        );
      }

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

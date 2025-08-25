import { useState, useEffect } from "react";
import { ProductGridPresenter } from "@/components/presenters/ProductGridPresenter";
import type { Product } from "@shared/schema";

interface ProductGridContainerProps {
  products: Product[];
  variant?: "default" | "recent" | "mostViewed";
  onProductClick?: (product: Product) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function ProductGridContainer({
  products,
  variant = "default",
  onProductClick,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: ProductGridContainerProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<"price" | "name" | "popularity">("popularity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filtrar y ordenar productos
  useEffect(() => {
    let sorted = [...products];

    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => {
          const priceA = a.offerPrice || a.price;
          const priceB = b.offerPrice || b.price;
          return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });
        break;
      case "name":
        sorted.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return sortOrder === "asc" 
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
        break;
      case "popularity":
        sorted.sort((a, b) => {
          const viewsA = a.views || 0;
          const viewsB = b.views || 0;
          return sortOrder === "asc" ? viewsA - viewsB : viewsB - viewsA;
        });
        break;
    }

    setFilteredProducts(sorted);
  }, [products, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: "price" | "name" | "popularity") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <ProductGridPresenter
      products={filteredProducts}
      variant={variant}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
      onProductClick={handleProductClick}
      onLoadMore={onLoadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
}

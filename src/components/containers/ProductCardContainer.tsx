import { useState, useCallback } from "react";
import { ProductCardPresenter } from "@/components/presenters/ProductCardPresenter";
import type { Product } from "@shared/schema";

interface ProductCardContainerProps {
  product: Product;
  variant?: "default" | "compact" | "detailed";
  showActions?: boolean;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onVisitStore?: (product: Product) => void;
}

export function ProductCardContainer({
  product,
  variant = "default",
  showActions = true,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onVisitStore,
}: ProductCardContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calcular descuento
  const discountPercentage = product.offerPrice
    ? Math.round(((product. price_usd - product.offerPrice) / product. price_usd) * 100)
    : 0;

  // Formatear precio
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  }, []);

  // Formatear categoría
  const formatCategory = useCallback((category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }, []);

  // Handlers
  const handleProductClick = useCallback(() => {
    if (onProductClick) {
      onProductClick(product);
    }
  }, [onProductClick, product]);

  const handleAddToCart = useCallback(async () => {
    if (onAddToCart) {
      setIsLoading(true);
      try {
        await onAddToCart(product);
      } finally {
        setIsLoading(false);
      }
    }
  }, [onAddToCart, product]);

  const handleAddToWishlist = useCallback(async () => {
    if (onAddToWishlist) {
      setIsLoading(true);
      try {
        await onAddToWishlist(product);
      } finally {
        setIsLoading(false);
      }
    }
  }, [onAddToWishlist, product]);

  const handleVisitStore = useCallback(() => {
    if (onVisitStore) {
      onVisitStore(product);
    } else {
      // Fallback: abrir en nueva pestaña
      window.open(product.url, "_blank", "noopener noreferrer");
    }
  }, [onVisitStore, product]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Determinar si el producto está en oferta
  const isOnSale = !!product.offerPrice;

  // Determinar si el producto tiene stock
  const hasStock = product.stock > 0;

  // Determinar si requiere receta
  const requiresPrescription = product.requirePrescription;

  return (
    <ProductCardPresenter
      product={product}
      variant={variant}
      showActions={showActions}
      isHovered={isHovered}
      isLoading={isLoading}
      discountPercentage={discountPercentage}
      isOnSale={isOnSale}
      hasStock={hasStock}
      requiresPrescription={requiresPrescription}
      formatPrice={formatPrice}
      formatCategory={formatCategory}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
      onVisitStore={handleVisitStore}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

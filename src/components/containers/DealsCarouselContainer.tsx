import { useState, useEffect } from "react";
import { DealsCarouselPresenter } from "@/components/presenters/DealsCarouselPresenter";
import dealsData from "@/data/deals.json";
import type { Product } from "@shared/schema";

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  products: Array<{
    id: string;
    name: string;
    originalPrice: number;
    offerPrice: number;
    discount: string;
    imageUrl: string;
    stock: number;
  }>;
}

interface DealsCarouselContainerProps {
  products?: Product[];
  limit?: number;
  onDealClick?: (deal: Deal) => void;
  onProductClick?: (product: Product) => void;
}

export function DealsCarouselContainer({
  products = [],
  limit = 6,
  onDealClick,
  onProductClick,
}: DealsCarouselContainerProps) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar ofertas desde JSON o generar desde productos
  useEffect(() => {
    const loadDeals = async () => {
      setIsLoading(true);
      
      try {
        // Intentar cargar desde JSON primero
        if (dealsData && dealsData.deals) {
          setDeals(dealsData.deals);
        } else {
          // Fallback: generar ofertas desde productos
          const productsWithOffers = products.filter(p => p.offerPrice);
          const generatedDeals = generateDealsFromProducts(productsWithOffers, limit);
          setDeals(generatedDeals);
        }
      } catch (error) {
        console.error("Error loading deals:", error);
        // Fallback: generar ofertas desde productos
        const productsWithOffers = products.filter(p => p.offerPrice);
        const generatedDeals = generateDealsFromProducts(productsWithOffers, limit);
        setDeals(generatedDeals);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeals();
  }, [products, limit]);

  const generateDealsFromProducts = (productsWithOffers: Product[], limit: number): Deal[] => {
    if (productsWithOffers.length === 0) return [];

    const deals: Deal[] = [];
    const chunkSize = Math.ceil(productsWithOffers.length / 2);
    
    for (let i = 0; i < productsWithOffers.length; i += chunkSize) {
      const chunk = productsWithOffers.slice(i, i + chunkSize);
      const deal: Deal = {
        id: `generated-deal-${i}`,
        title: `Oferta Especial ${Math.floor(i / chunkSize) + 1}`,
        description: "Productos con descuentos especiales",
        discount: "20%",
        validUntil: "2024-12-31",
        products: chunk.map(p => ({
          id: p.id,
          name: p.name,
          originalPrice: p.price,
          offerPrice: p.offerPrice!,
          discount: `${Math.round(((p.price - p.offerPrice!) / p.price) * 100)}%`,
          imageUrl: p.imageUrl,
          stock: p.stock,
        })),
      };
      deals.push(deal);
    }

    return deals.slice(0, 2); // Máximo 2 ofertas generadas
  };

  const nextDeal = () => {
    setCurrentDealIndex((prev) => (prev + 1) % deals.length);
  };

  const prevDeal = () => {
    setCurrentDealIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  const handleDealClick = (deal: Deal) => {
    if (onDealClick) {
      onDealClick(deal);
    }
  };

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Cargando ofertas...</div>
      </div>
    );
  }

  if (deals.length === 0) {
    return null;
  }

  return (
    <DealsCarouselPresenter
      deals={deals}
      currentDealIndex={currentDealIndex}
      onNext={nextDeal}
      onPrev={prevDeal}
      onDealClick={handleDealClick}
      onProductClick={handleProductClick}
    />
  );
}

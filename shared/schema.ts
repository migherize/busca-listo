import { z } from "zod";
import type { BaseProduct } from "./SchemaProduct";

export const adSchema = z.object({
  id: z.number(),
  title: z.string(),
  imageUrl: z.string(),
  link: z.string(),
});

export type Ad = z.infer<typeof adSchema>;

// Product schema moved to SchemaProduct.ts to avoid duplication
// Use BaseProduct or specific product types from SchemaProduct.ts instead

// ---------- Component Props (UI domain) ----------

export interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface AdBannerProps {
  adSlot: string;
}

export interface ProductCardProps {
  product: BaseProduct;
}

export interface ProductGridProps {
  products: BaseProduct[];
}

export interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface EmptyStateProps {
  searchTerm: string;
  selectedCategory: string;
  onClearFilters: () => void;
}

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}



import { z } from "zod";

export const adSchema = z.object({
  id: z.number(),
  title: z.string(),
  imageUrl: z.string(),
  link: z.string(),
});

export type Ad = z.infer<typeof adSchema>;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  subcategory: z.string(),
  price: z.number(),
  offerPrice: z.number().nullable().optional(),
  imageUrl: z.string(),
  stock: z.number(),
  url: z.string(),
  offerDescription: z.string().nullable().optional(),
  requirePrescription: z.boolean(),
  supplier: z.string(),
  availableOnline: z.boolean(),
  // Optional analytics field for most-viewed section
  views: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;

// ---------- Component Props (UI domain) ----------

export interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface AdBannerProps {
  adSlot: string;
}


export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
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

export interface PDFDownloadProps {
  targetId: string;
  filename?: string;
  children?: React.ReactNode;
}

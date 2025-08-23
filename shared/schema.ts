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
  imageUrls: z.array(z.string()).optional(), // Lista de imágenes para carrusel
  stock: z.number(),
  url: z.string(),
  offerDescription: z.string().nullable().optional(),
  requirePrescription: z.boolean(),
  supplier: z.string(),
  availableOnline: z.boolean(),
  views: z.number().optional(),
  
  // Campos adicionales del backend
  description: z.string().nullable().optional(),
  characteristics: z.string().nullable().optional(),
  advancedCharacteristics: z.string().nullable().optional(),
  accessories: z.string().nullable().optional(),
  highlightedFeatures: z.string().nullable().optional(),
  pros: z.string().nullable().optional(),
  cons: z.string().nullable().optional(),
  historicalPrice: z.number().nullable().optional(),
  priceUSD: z.number().nullable().optional(),
  
  // Metadatos
  createdAt: z.string().nullable().optional(),
  createdBy: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  code: z.string().nullable().optional(),
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

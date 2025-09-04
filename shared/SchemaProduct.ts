import { z } from "zod";

// Esquema para comentarios
export const commentSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  user_name: z.string(),
  user_avatar: z.string().nullable().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  created_at: z.string(),
  helpful_votes: z.number().default(0),
  is_verified_purchase: z.boolean().default(false),
});

export type Comment = z.infer<typeof commentSchema>;

export const baseProductSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  brand_id: z.number().nullable().optional(), 
  brand_name: z.string().nullable().optional(),
  subcategory_id: z.number().nullable().optional(),
  subcategory_name: z.string().nullable().optional(),
  price_bs: z.number(),
  price_usd: z.number(),
  in_stock: z.number().nullable().optional(),
  active: z.boolean().optional(),
  views: z.number().optional(),
  created_at: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  imagenes: z.array(z.string()).optional(),
  offer_description: z.string().nullable().optional(),
  branch_id: z.number().nullable().optional(), 
  url: z.string().nullable().optional(),
  price_offer_usd: z.number().nullable().optional(),
  price_offer_bs: z.number().nullable().optional(),
  discount_percent: z.number().nullable().optional(),
  characteristics: z.string().nullable().optional(),
  advancedCharacteristics: z.string().nullable().optional(),
  accessories: z.string().nullable().optional(),
  highlightedFeatures: z.string().nullable().optional(),
  pros: z.string().nullable().optional(),
  cons: z.string().nullable().optional(),
  supplier_id: z.number().nullable().optional(),
  category: z.string().nullable().optional(),
  category_name: z.string().nullable().optional(),
  category_key: z.string().nullable().optional(),
  category_id: z.number().nullable().optional(),
  company_name: z.string().nullable().optional(),
  branch_name: z.string().nullable().optional(),
  supplier_name: z.string().nullable().optional(),
  supplier_address: z.string().nullable().optional(),
  supplier_phone: z.string().nullable().optional(),
  supplier_email: z.string().nullable().optional(),
  supplier_website: z.string().nullable().optional(),
  supplier_hours: z.string().nullable().optional(),
  supplier_rating: z.number().nullable().optional(),
  supplier_reviews: z.number().nullable().optional(),
  mockComments: z.array(commentSchema).optional(),
});

export type BaseProduct = z.infer<typeof baseProductSchema>;

export const recentProductSchema = baseProductSchema.pick({
  id: true,
  name: true,
  brand_name: true,
  price_bs: true,
  price_usd: true,
  price_offer_usd: true,
  price_offer_bs: true,
  discount_percent: true,
  image_url: true,
  offer_description: true,
});

export type RecentProduct = z.infer<typeof recentProductSchema>;

export const mostViewedProductSchema = recentProductSchema.extend({
  views: z.number(),
});

export type MostViewedProduct = z.infer<typeof mostViewedProductSchema>;

export const dealsProductSchema = recentProductSchema.extend({
  // Los productos en oferta pueden tener campos adicionales específicos
  // Por ahora usamos el mismo esquema que RecentProduct
});

export type DealsProduct = z.infer<typeof dealsProductSchema>;


export const detailsProductSchema = baseProductSchema.pick({
  id: true,
  name: true,
  brand_id: true,
  brand_name: true,
  subcategory_id: true,
  subcategory_name: true,
  price_bs: true,
  price_usd: true,
  in_stock: true,
  active: true,
  views: true,
  created_at: true,
  imagenes: true,
  offer_description: true,
  branch_id: true,
  url: true,
  price_offer_usd: true,
  price_offer_bs: true,
  discount_percent: true,
  characteristics: true,
  advancedCharacteristics: true,
  accessories: true,
  highlightedFeatures: true,
  pros: true,
  cons: true,
  category: true,
  category_name: true,
  category_key: true,
  category_id: true,
  company_name: true,
  branch_name: true,
  supplier_id: true,
  supplier_name: true,
  supplier_address: true,
  supplier_phone: true,
  supplier_email: true,
  supplier_website: true,
  supplier_hours: true,
  supplier_rating: true,
  supplier_reviews: true,
  mockComments: true,
});

export type detailsProduct = z.infer<typeof detailsProductSchema>;

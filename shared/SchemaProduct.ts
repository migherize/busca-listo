import { z } from "zod";

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
  offer_description: z.string().nullable().optional(),
  branch_id: z.number().nullable().optional(), 
  url: z.string().nullable().optional(),
  price_offer_usd: z.number().nullable().optional(),
  price_offer_bs: z.number().nullable().optional(),
  discount_percent: z.number().nullable().optional(),
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

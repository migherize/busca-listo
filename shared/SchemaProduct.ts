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
  price_offer: z.number().nullable().optional(),
  in_stock: z.number().nullable().optional(),
  active: z.boolean().optional(),
  views: z.number().optional(),
  created_at: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  offer_description: z.string().nullable().optional(),
  branch_id: z.number().nullable().optional(), 
});

export type BaseProduct = z.infer<typeof baseProductSchema>;

export const recentProductSchema = baseProductSchema.pick({
  id: true,
  name: true,
  brand_name: true,
  price_bs: true,
  price_usd: true,
  price_offer: true,
  image_url: true,
  offer_description: true,
});

export type RecentProduct = z.infer<typeof recentProductSchema>;

export const mostViewedProductSchema = recentProductSchema.extend({
  views: z.number(),
});

export type MostViewedProduct = z.infer<typeof mostViewedProductSchema>;

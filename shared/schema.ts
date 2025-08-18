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
  offerPrice: z.number().optional(),
  imageUrl: z.string(),
  stock: z.number(),
  url: z.string(),
  offerDescription: z.string().optional(),
  requirePrescription: z.boolean(),
  supplier: z.string(),
  availableOnline: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

export const categorySchema = z.enum([
  "medicamentos",
  "vitaminas",
  "cuidado-personal",
  "suplementos",
  "belleza",
]);

export type Category = z.infer<typeof categorySchema>;

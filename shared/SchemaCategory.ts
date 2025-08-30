import { z } from "zod";

export const baseCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  image_urls: z.array(z.string().url())
});

export type CategoryPopular= z.infer<typeof baseCategorySchema>;

export const categorySchema = z.enum([
  "all",
  "medicamentos",
  "repuestos",
  "telefonos",
  "TV",
  "comidarapida",
  "zapatos",
  "suplementos",
  "belleza",
  "ropa",
]);

export type Category = z.infer<typeof categorySchema>;

export const categories = categorySchema.options.map((key) => ({
  key,
  label:
    key === "all"
      ? "Todos"
      : key
          .split("-")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" "),
}));

export const sortOptions = [
  { key: "precio", label: "Precio" },
  { key: "relevancia", label: "Relevancia" },
  { key: "popularidad", label: "Popularidad" },
  { key: "descuento", label: "Descuento" },
];



// export const categoryImages: Record<string, string> = {
//   "medicamentos": "/assets/medicamentos.jpeg",
//   "repuestos": "/assets/repuestos.jpeg",
//   "telefonos": "/assets/telefonos.jpeg",
//   "TV": "/assets/TV.jpeg",
//   "comidarapida": "/assets/comidarapida.png",
//   "zapatos": "/assets/zapatos.jpeg",
// };
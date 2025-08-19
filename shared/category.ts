import { z } from "zod";

export const categorySchema = z.enum([
  "all",
  "medicamentos",
  "vitaminas",
  "cuidado-personal",
  "suplementos",
  "belleza",
  "ropa",
  "zapatos",
  "telefonos",
  "computadoras"
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

export interface CategoryNavbarProps {
  selectedCategory: Category | "all";
  onCategorySelect: (category: Category | "all") => void;
}
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

// const API_HOST = import.meta.env.VITE_API_HOST;
const API_HOST = "https://buscalistobackend.onrender.com";

export function useRecentProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "recientes"],
    queryFn: async () => {
      const res = await fetch(`${API_HOST}/productos/top/recientes`);
      if (!res.ok) throw new Error("Error al cargar productos");
      return res.json() as Promise<Product[]>;
    },
  });
}

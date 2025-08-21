import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export function useRecentProducts() {
  return useQuery<Product[]>({
    queryKey: ["/top", "recientes"],
  });
}


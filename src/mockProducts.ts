import rawData from "./data/products.json";
import type { Product } from "@shared/schema";

let productId = 1;
export const mockProducts: Product[] = [];

for (const [farmaciaName, farmaciaData] of Object.entries(rawData)) {
  const sucursales = farmaciaData.sucursales;

  for (const sucursalData of Object.values(sucursales)) {
    const productos = sucursalData.productos;

    for (const p of productos) {
      // si no tiene precio, lo saltamos
      if (!p.precio || !p.precio.bs_sin_oferta) {
        console.warn("Producto sin precio encontrado:", p);
        continue;
      }
      const price = parseFloat(p.precio.bs_sin_oferta);
      const offerPrice = p.precio.bs_con_oferta
        ? parseFloat(p.precio.bs_con_oferta)
        : null;

      const product: Product = {
        id: (productId++).toString(),
        name: p.nombre,
        brand: p.compuesto || "Desconocido",
        category: "medicamentos",
        subcategory: p.tipo || "general",
        price,
        offerPrice,
        imageUrl: p.imagen?.[0] || "",
        stock: 50,
        url: p.url,
        offerDescription: p.oferta ? "Oferta disponible" : null,
        requirePrescription: p.necesario_recipe_medico,
        supplier: farmaciaName,
        availableOnline: true,
        views: p.views ? parseInt(p.views, 10) : undefined,
      };

      mockProducts.push(product);
    }
  }
}

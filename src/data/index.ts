// Datos JSON para fallbacks y mockups
export { default as productsData } from "./products.json";
export { default as subscriptionsData } from "./subscriptions.json";
export { default as dealsData } from "./deals.json";
export { default as storesData } from "./stores.json";
export { default as usersData } from "./users.json";
export { default as ordersData } from "./orders.json";

// Datos dummy para productos detallados
export { default as productDetailsData } from './product-details.json';

// Datos estructurados
export { footerData } from "./footerData";

// Tipos para los datos JSON
export interface ProductsData {
  [farmacia: string]: {
    sucursales: {
      [sucursal: string]: {
        productos: Array<{
          nombre: string;
          compuesto: string;
          tipo: string;
          precio: {
            bs_sin_oferta: string;
            bs_con_oferta?: string;
          };
          imagen?: string[];
          url: string;
          oferta?: boolean;
          necesario_recipe_medico: boolean;
          views?: string;
        }>;
      };
    };
  };
}

export interface DealsData {
  deals: Array<{
    id: string;
    title: string;
    description: string;
    discount: string;
    validUntil: string;
    products: Array<{
      id: string;
      name: string;
      originalPrice: number;
      offerPrice: number;
      discount: string;
      imageUrl: string;
      stock: number;
    }>;
  }>;
}

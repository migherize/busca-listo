export const API_CONFIG = {
  HOST: import.meta.env.VITE_API_HOST || "https://buscalistobackend.onrender.com",
  
  ENDPOINTS: {
    PRODUCTS: {
      RECENT: "/productos/top/newest", //TODO: cambiar a products/top/recent
      MOST_VIEWED: "/products/top/viewed",
      DEALS: "/products/deals",
      BY_CATEGORY: "/products/category",
      SEARCH: "/products/search",
      ALL: "/products",
      FILTERED: "/products/filter",
    },
    CATEGORIES: {
      POPULAR: "/categories/popular",
    },
  },
  
  DEFAULTS: {
    PAGE_SIZE: 20,
    MAX_PRODUCTS: 10,
    MAX_CATEGORIES: 6,
  },
} as const;

export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>) => {
  const url = new URL(endpoint, API_CONFIG.HOST);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });
  }
  
  return url.toString();
};



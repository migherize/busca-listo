export const API_CONFIG = {
  HOST: import.meta.env.VITE_API_HOST || "http://localhost:8000",
  
  ENDPOINTS: {
    PRODUCTS: {
      RECENT: "/products/top/newest", 
      MOST_VIEWED: "/products/top/most-viewed",
      DEALS: "/products/deals",
      BY_CATEGORY: "/products/category",
      BY_STORE: "/products/store",
      BY_COMPANY: "/products/company",
      SEARCH: "/products/search",
      ALL: "/products",
      FILTERED: "/products/filter",
      DETAIL: "/products",
    },
    CATEGORIES: {
      ALL: "/categories",
      POPULAR: "/categories/popular",
    },
    COMPANIES: {
      ALL: "/companies",
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



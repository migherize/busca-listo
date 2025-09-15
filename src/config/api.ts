export const API_CONFIG = {
  HOST: import.meta.env.VITE_API_HOST || "http://localhost:8000",
  
  ENDPOINTS: {
    PRODUCTS: {
      RECENT: "/api/products/top/newest", 
      MOST_VIEWED: "/api/products/top/most-viewed",
      DEALS: "/api/products/deals",
      BY_CATEGORY: "/api/products/category",
      BY_STORE: "/api/products/store",
      BY_COMPANY: "/api/products/company",
      SEARCH: "/api/products/search",
      ALL: "/api/products",
      FILTERED: "/api/products/filter",
      DETAIL: "/api/products",
    },
    CATEGORIES: {
      ALL: "/api/categories",
      POPULAR: "/api/categories/popular",
    },
    COMPANIES: {
      ALL: "/api/companies",
    },
  },
  
  DEFAULTS: {
    PAGE_SIZE: 20,
    MAX_PRODUCTS: 10,
    MAX_CATEGORIES: 6,
  },
} as const;

export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>) => {
  let url = `${API_CONFIG.HOST}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });
    
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
};



export interface SubscriptionFeatures {
  products: number;
  ads: boolean;
  listingPriority: 'none' | 'medium' | 'high';
  locations: 'limited' | 'sidebar_internal' | 'home_sidebar_exclusive';
  statistics: boolean;
  support: 'basic' | 'standard' | 'priority';
  extras: string[];
}

export interface SubscriptionPlan {
  id: 'basic' | 'medium' | 'premium';
  name: string;
  price: number;
  currency: string;
  features: SubscriptionFeatures;
  description: string;
  popular: boolean;
}

export interface SubscriptionsData {
  subscriptions: SubscriptionPlan[];
}

export interface StoreRegistrationData {
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  businessType: string;
  description: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface EmailResponse {
  success: boolean;
  error?: string;
}

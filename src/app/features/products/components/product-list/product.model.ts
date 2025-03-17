export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    reviewCount: number;
    images: string[];
    inStock: boolean;
    stockCount?: number;
    category: string;
    brand: string;
    tags?: string[];
    freeShipping?: boolean;
    fastDelivery?: boolean;
    specifications?: Record<string, string>;
  }
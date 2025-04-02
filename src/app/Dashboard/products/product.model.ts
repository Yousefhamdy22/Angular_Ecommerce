export interface Product {
  id?: number;  // Optional for newly created products before they are saved
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  isFeatured: boolean;
  isActive: boolean;
  weight?: number;
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
  };
  imageUrl?: string;  // Optional, stores image URL if available
  createdAt?: Date;
  updatedAt?: Date;
}

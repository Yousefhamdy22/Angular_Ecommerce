import { Product } from "../products/product.model";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  productCount: number;
  status: "active" | "inactive";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
  icon?: string;
  level?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  sortOrder?: number;
  products?: Product[]; // removed 
  productResponse: Product[];
  count: number
}
export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  featuredCategories: number;
  totalProducts: number;
  topCategory?: {
    name: string;
    productCount: number;
  };
  recentlyAdded: number;
  averageProductsPerCategory: number;
}

export interface CategoryApiResponse {
  data: Category[];
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface CategoryCreateDto {
  name: string;
  description?: string;
  parentId?: number;
  status?: "active" | "inactive";
  featured?: boolean;
  imageUrl?: string;
}

export interface CategoryUpdateDto extends Partial<CategoryCreateDto> {
  id: number;
}

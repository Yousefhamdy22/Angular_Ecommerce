
  // export interface Product {
  //   id?: number;
  //   name: string;
  //   rating?: number;
  //   category: string;
  //   description: string;
  //   price: number;
  //   stock: number;
  //   comparePrice?: number;
  //   sales?: number;
  //   categoryId?: number;
  //   sku: string;
   
   
  
  //   isFeatured: boolean;
  //   isActive: boolean;
  //   weight?: number;
  //   dimensions?: {
  //     length?: number;
  //     width?: number;
  //     height?: number;
  //   };
  //   imageUrl?: string;
  //   createdAt?: Date;
  //   updatedAt?: Date;
  // }


  export interface Product {
    id: number;
    categoryId: number;
    item_Name: string;
    price: number;
    description: string;
    solditems: number;
    quantity: number;
    isFeatured: boolean;
    isActive?: boolean; 
    imageUrls: string[];
    createdAt?: Date;
    updatedAt?: Date;
    costPrice?: number;
    productResponse: Product[];
    variants?: { id: number; name: string; price: number }[]; // Array of variants

    brand: string
      image: string
      images: string[]
      
      originalPrice: number | null
      rating: number
      reviewCount: number
     
      shortDescription?: string
      benefits: string[]
      isBestSeller?: boolean
      isNew?: boolean
      inStock: boolean
      category: string
      tags: string[]
      colors?: string[]
      sizes?: string[]
      freeShipping?: boolean
    //

    length?: number;
  }
  export interface SingleProductApiResponse {
    statusCode: number;
    meta: any;
    succeeded: boolean;
    message: string;
    errors: any;
    data: Product; // For single product responses
  }
  
  export interface MultiProductApiResponse {
    statusCode: number;
    meta: any;
    succeeded: boolean;
    message: string;
    errors: any;
    data: Product[]; // For multiple products responses
  }
  
  export interface PaginatedProductResponse extends MultiProductApiResponse {
    meta: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  }
  
import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CategoryService } from '../../catrgory/category.service';
import { Category } from '../../catrgory/category.model';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  searchQuery = ""


 

  products: Product[] = []  
  filteredProducts: Product[] = [];
  category: Category[] = [] 
  categories: any[] = [];
 


  
  @Input() isLoading = false  // Loading state for the product list
  @Input() isError = false  // Error state for the product list         
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService 
  
  ) {}
  ngOnInit(): void {

    this.loadCategories();

    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data; ;
        this.isLoading = false;
        this.filteredProducts = this.products; 
      
     

        
      },

      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading = false;
      }
  }
    );}

    
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }
  

    trackByProductId(index: number, product: Product): number {
      return product.id;
    }
  
    getStockPercentage(quantity: number): number {
      // Assuming max stock is 50 for percentage calculation
      const maxStock = 50;
      return Math.min((quantity / maxStock) * 100, 100);
    }
  
    getStockStatusClass(quantity: number): string {
      if (quantity === 0) return 'bg-red-100 text-red-800 border-red-200';
      if (quantity < 10) return 'bg-amber-100 text-amber-800 border-amber-200';
      return 'bg-green-100 text-green-800 border-green-200';
    }
  
    getStockStatusText(quantity: number): string {
      if (quantity === 0) return 'Out of Stock';
      if (quantity < 10) return 'Low Stock';
      return 'In Stock';
    }

  getUniqueCategories(): number[] {
    return [...new Set(this.products.map((product) => product.categoryId))]
  }

  getLowStockCount(): number {
    return this.products.filter((product) => product.quantity < 10).length
  }

  getFeaturedCount(): number {
    return this.products.filter((product) => product.isFeatured).length
  }

  

    getCategoryName(categoryId: number): string {
      const category = this.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : 'Unknown Category';
    }

    onSearch(): void {
      if (this.searchQuery.trim() === '') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product =>
          product.item_Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          this.getCategoryName(product.categoryId).toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  
  
}
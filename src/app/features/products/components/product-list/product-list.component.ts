import { Component , OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product-list',
  standalone:false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  sortOptions = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating-desc' },
    { label: 'Newest First', value: 'newest' }
  ];
  selectedSortOption: string = 'newest';
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applySorting();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.loading = false;
      }
    });
  }
  
  applySorting(): void {
    switch(this.selectedSortOption) {
      case 'price-asc':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        this.products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming products have a timestamp, otherwise implement as needed
        break;
    }
  }
  
  onSortChange(): void {
    this.applySorting();
  }
}
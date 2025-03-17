import { Component , OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-list/product.model';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-detail',
  standalone:false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product: Product | null = null;
  loading: boolean = true;
  quantity: number = 1;
  selectedImageIndex: number = 0;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    // private cartService: CartService,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }
  
  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product details', error);
        this.loading = false;
      }
    });
  }
  
  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }
  
  increaseQuantity(): void {
    if (this.product && this.product.stockCount && this.quantity < this.product.stockCount) {
      this.quantity += 1;
    } else if (!this.product?.stockCount) {
      this.quantity += 1;
    }
  }
  
  // addToCart(): void {
  //   if (this.product) {
  //     this.cartService.addToCart(this.product, this.quantity);
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Added to Cart',
  //       detail: `${this.quantity} x ${this.product.title} added to your cart`
  //     });
  //   }
  // }
  
  // buyNow(): void {
  //   if (this.product) {
  //     this.cartService.addToCart(this.product, this.quantity);
  //     // Navigate to checkout - implementation depends on your routing setup
  //     // this.router.navigate(['/checkout']);
  //   }
  // }
}

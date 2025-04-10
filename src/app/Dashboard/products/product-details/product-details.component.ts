import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from '../product.service';
import { CategoryService } from '../../catrgory/category.service';
import { Category } from '../../catrgory/category.model';




@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  standalone: false
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  isLoading = false;
  isError = false;
  errorMessage = '';
  editMode = false;
  private subscription: Subscription | null = null;

  itemStatus: string = 'active'; // or 'inactive'
createdDate: Date = new Date(); // set your actual created date
updatedDate: Date = new Date(); // set your actual updated date
  
  // For image gallery
  activeImageIndex = 0;
  
  // For related products
  relatedProducts: Product[] = [];
  
  // For sales metrics
  salesMetrics = {
    averageRating: 4.5,
    returnRate: 2.3,
    totalRevenue: 0
  };
  
  // For inventory history
  inventoryHistory: any[] = [];
  
  // For dropdowns and dialogs
  categories: Category[] = [];
  menuItems: MenuItem[] = [];
  showInventoryDialog = false;
  adjustmentTypes = [
    { label: 'Add Stock', value: 'add' },
    { label: 'Remove Stock', value: 'remove' },
    { label: 'Set Stock', value: 'set' }
  ];
  selectedAdjustmentType = 'add';
  adjustmentValue = 1;
  adjustmentNotes = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    
    this.subscription = this.route.params.subscribe(params => {
      const productId = +params['id'];
      
      if (productId) {
        this.loadProduct(productId);
        this.loadCategories();
      } else {
        this.isError = true;
        this.errorMessage = 'Invalid product ID';
        this.isLoading = false;
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.updateMenuItems();

      
      },
      

      error: (err) => {
        console.error('Error loading categories', err);
      }
    });
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }
  
    updateMenuItems(): void {
    if (!this.product) return;
    
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.toggleEditMode()
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteProduct()
      },
      {
        label: 'Duplicate',
        icon: 'pi pi-copy',
        command: () => this.duplicateProduct()
      },
      { separator: true },
      {
        label: this.product.isFeatured ? 'Remove from Featured' : 'Mark as Featured',
        icon: this.product.isFeatured ? 'pi pi-star-fill' : 'pi pi-star',
        command: () => this.toggleFeatured()
      },
      {
        label: this.product.isActive ? 'Deactivate' : 'Activate',
        icon: this.product.isActive ? 'pi pi-eye-slash' : 'pi pi-eye',
        command: () => this.toggleActiveStatus()
      }
    ];
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
        this.updateMenuItems();
        this.isLoading = false;
        // this.loadRelatedProducts();
        // this.loadInventoryHistory();
        this.calculateSalesMetrics();
      },
      error: (err) => {
        console.error('Error loading product details', err);
        this.isError = true;
        this.errorMessage = 'Failed to load product details';
        this.isLoading = false;
      }
    });
  }
  
  calculateSalesMetrics(): void {
    if (!this.product) return;
    
    this.salesMetrics.totalRevenue = this.product.price * this.product.solditems;
    // Add more metric calculations as needed
  }
  
  // loadRelatedProducts(): void {
  //   if (!this.product) return;
    
  //   this.productService.getRelatedProducts(this.product.categoryId, this.product.id).subscribe({
  //     next: (products) => {
  //       this.relatedProducts = products;
  //     },
  //     error: (err) => {
  //       console.error('Error loading related products', err);
  //       this.messageService.add({
  //         severity: 'warn',
  //         summary: 'Warning',
  //         detail: 'Could not load related products'
  //       });
  //     }
  //   });
  // }
  
  // loadInventoryHistory(): void {
  //   if (!this.product) return;
    
  //   this.productService.getInventoryHistory(this.product.id).subscribe({
  //     next: (history) => {
  //       this.inventoryHistory = history.map(item => ({
  //         ...item,
  //         date: new Date(item.date)
  //       }));
  //     },
  //     error: (err) => {
  //       console.error('Error loading inventory history', err);
  //       // Fallback to sample data
  //       this.inventoryHistory = [
  //         {
  //           date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  //           action: 'Stock Update',
  //           previousValue: this.product!.quantity - 10,
  //           newValue: this.product!.quantity,
  //           user: 'Admin',
  //           notes: 'Monthly restock'
  //         },
  //         {
  //           date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  //           action: 'Price Change',
  //           previousValue: this.product!.price * 0.9,
  //           newValue: this.product!.price,
  //           user: 'Manager',
  //           notes: 'Seasonal price adjustment'
  //         }
  //       ];
  //     }
  //   });
  // }
  
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  
  saveProduct(): void {
    if (!this.product) return;
    
    this.isLoading = true;
    
    this.productService.updateProduct(this.product.id, this.product).subscribe({
      next: (updatedProduct) => {
        this.product = updatedProduct;
        this.editMode = false;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated successfully',
          life: 3000
        });
        this.updateMenuItems();
      //  this.loadInventoryHistory();
      },
      error: (err) => {
        console.error('Error updating product', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product',
          life: 5000
        });
      }
    });
  }
  

  deleteProduct(): void {
    if (!this.product) return;
    
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${this.product.item_Name}"? This action cannot be undone.`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.isLoading = true;
        
        this.productService.deleteProduct(this.product!.id).subscribe({
          next: () => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deleted successfully',
              life: 3000
            });
            this.navigateToList();
          },
          error: (err) => {
            console.error('Error deleting product', err);
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete product',
              life: 5000
            });
          }
        });
      }
    });
  }
  
  updateInventory(): void {
    if (!this.product) return;
    
    let newQuantity = this.product.quantity;
    
    switch (this.selectedAdjustmentType) {
      case 'add':
        newQuantity += this.adjustmentValue;
        break;
      case 'remove':
        newQuantity = Math.max(0, newQuantity - this.adjustmentValue);
        break;
      case 'set':
        newQuantity = Math.max(0, this.adjustmentValue);
        break;
    }
    
    if (newQuantity === this.product.quantity) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Change',
        detail: 'Inventory quantity remains the same',
        life: 3000
      });
      this.showInventoryDialog = false;
      return;
    }
    
    this.isLoading = true;
    
    const updatedProduct = { ...this.product, quantity: newQuantity };
    
    this.productService.updateProduct(this.product.id, updatedProduct).subscribe({
      next: (result) => {
        this.product = result;
        this.isLoading = false;
        this.showInventoryDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Inventory updated to ${newQuantity} units`,
          life: 3000
        });
        
        // Add to history
        this.inventoryHistory.unshift({
          date: new Date(),
          action: 'Inventory Adjustment',
          previousValue: this.product.quantity,
          newValue: newQuantity,
          user: 'Current User', // Replace with actual user
          notes: this.adjustmentNotes || `Manual ${this.selectedAdjustmentType}`
        });
        
        // Reset form
        this.adjustmentValue = 1;
        this.adjustmentNotes = '';
      },
      error: (err) => {
        console.error('Error updating inventory', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update inventory',
          life: 5000
        });
      }
    });
  }
  
  toggleFeatured(): void {
    if (!this.product) return;
    
    const updatedProduct = { ...this.product, isFeatured: !this.product.isFeatured };
    
    this.isLoading = true;
    
    this.productService.updateProduct(this.product.id, updatedProduct).subscribe({
      next: (result) => {
        this.product = result;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${this.product!.isFeatured ? 'marked as featured' : 'removed from featured'}`,
          life: 3000
        });
        this.updateMenuItems();
      },
      error: (err) => {
        console.error('Error updating featured status', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update featured status',
          life: 5000
        });
      }
    });
  }
  
  toggleActiveStatus(): void {
    if (!this.product) return;
    
    const updatedProduct = { ...this.product, isActive: !this.product.isActive };
    const action = updatedProduct.isActive ? 'activated' : 'deactivated';
    
    this.isLoading = true;
    
    this.productService.updateProduct(this.product.id, updatedProduct).subscribe({
      next: (result) => {
        this.product = result;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${action} successfully`,
          life: 3000
        });
        this.updateMenuItems();
      },
      error: (err) => {
        console.error(`Error ${action} product`, err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to ${action} product`,
          life: 5000
        });
      }
    });
  }
  
  duplicateProduct(): void {
    if (!this.product) return;
    
    this.confirmationService.confirm({
      message: `Create a copy of "${this.product.item_Name}"?`,
      header: 'Confirm Duplication',
      icon: 'pi pi-copy',
      accept: () => {
        // Create a copy without the ID
        const productCopy = { 
          ...this.product, 
          id: 0,
          item_Name: `${this.product?.item_Name || 'Unnamed Product'} (Copy)`,
          isFeatured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        this.isLoading = true;
        
        this.productService.createProduct(productCopy as Product).subscribe({
          next: (newProduct) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product duplicated successfully',
              life: 3000
            });
            
            // Navigate to the new product
            this.router.navigate(['/products', newProduct.id]);
          },
          error: (err) => {
            console.error('Error duplicating product', err);
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to duplicate product',
              life: 5000
            });
          }
        });
      }
    });
  }
  
  navigateToList(): void {
    this.router.navigate(['/products']);
  }
  
  getStockStatusSeverity(): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    if (this.product && this.product.quantity === 0) {
      return 'danger';
    } else if (this.product && this.product.quantity < 10) {
      return 'warn';
    } else {
      return 'success';
    }
  }
  getStockStatusIcon(): string {
    if (!this.product) return 'pi pi-info-circle';
    
    if (this.product.quantity === 0) return 'pi pi-times-circle';
    if (this.product.quantity < 10) return 'pi pi-exclamation-circle';
    return 'pi pi-check-circle';
  }
  
  getStockStatusText(): string {
    if (!this.product) return 'Loading...';
    
    if (this.product.quantity === 0) return 'Out of Stock';
    if (this.product.quantity < 10) return 'Low Stock';
    return 'In Stock';
  }
  
  getTimelineIcon(action: string): string {
    switch(action.toLowerCase()) {
      case 'created': return 'pi pi-plus';
      case 'updated': return 'pi pi-pencil';
      case 'inventory': 
      case 'stock update': return 'pi pi-box';
      case 'price': 
      case 'price change': return 'pi pi-dollar';
      default: return 'pi pi-info-circle';
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  isLoading = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  formSubmitted = false;
  categories: any[] = []; // You should populate this from your service

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.max(10000)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      sku: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      category: ['', [Validators.required]], // Added category field
      isFeatured: [false],
      isActive: [true],
      weight: ['', [Validators.min(0)]],
      dimensions: this.fb.group({
        length: ['', [Validators.min(0)]],
        width: ['', [Validators.min(0)]],
        height: ['', [Validators.min(0)]]
      })
    });
  }

  ngOnInit(): void {
    // Load categories when component initializes
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match(/image\/(jpeg|png|gif|webp)/)) {
        alert('Only image files are allowed (JPEG, PNG, GIF, WEBP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    
    Object.keys(this.productForm.value).forEach(key => {
      const value = this.productForm.value[key];
      if (key === 'dimensions') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard/products'], {
          queryParams: { success: 'Product created successfully' }
        });
      },
      error: (err) => {
        this.isLoading = false;
        alert(err.error.message || 'Failed to create product');
      }
    });
  }

  get f() {
    return this.productForm.controls;
  }

  get dimensionControls() {
    return (this.productForm.get('dimensions') as FormGroup).controls;
  }

  // Helper to check if field has error
  hasError(controlName: string, errorName: string): boolean {
    const control = this.productForm.get(controlName);
    return control ? control.hasError(errorName) && (control.dirty || control.touched || this.formSubmitted) : false;
  }
}
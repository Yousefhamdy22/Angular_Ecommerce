import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../../catrgory/category.service';

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
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.max(10000)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      category: ['', [Validators.required]],
      isFeatured: [false],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
   this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data; 
      },
      error: (err) => {
        console.error('Error loading categories', err);
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

    const formValue = this.productForm.value;
    const formData = new FormData();

    // 🔁 Map frontend names ➡ backend expected keys
    formData.append('Name', formValue.name);
    formData.append('Description', formValue.description);
    formData.append('price', formValue.price.toString());
    formData.append('quantity', formValue.stock.toString());
    formData.append('CategoryId', formValue.category.toString());
    formData.append('solditems', '0'); // Set default or from form if needed

    // ⬆️ Optional fields (like IsActive / IsFeatured), if backend expects them
    formData.append('IsActive', formValue.isActive ? 'true' : 'false');
    formData.append('IsFeatured', formValue.isFeatured ? 'true' : 'false');

    if (this.selectedFile) {
      formData.append('File', this.selectedFile); // ✅ Backend expects 'File'
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

  hasError(controlName: string, errorName: string): boolean {
    const control = this.productForm.get(controlName);
    return control ? control.hasError(errorName) && (control.dirty || control.touched || this.formSubmitted) : false;
  }
}
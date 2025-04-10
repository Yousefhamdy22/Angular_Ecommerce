import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService, ConfirmationService } from "primeng/api";
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Table } from "primeng/table";
import { CategoryService } from './category.service';
import { Category } from './category.model';

interface CategoryStats {
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

enum ViewMode {
  TABLE = 'Table',
  TREE = 'Tree'
}

enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

enum BulkActions {
  SET_ACTIVE = 'setActive',
  SET_INACTIVE = 'setInactive',
  SET_FEATURED = 'setFeatured',
  REMOVE_FEATURED = 'removeFeatured',
  DELETE = 'delete'
}

const DEFAULT_CATEGORY_COLOR = '#3B82F6';
const DEFAULT_CATEGORY_ICON = 'pi pi-tag';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './catrgory.component.html',
  styleUrl: './catrgory.component.css'
  ,providers:[]
})
export class CategoryComponent implements OnInit, OnDestroy {
deleteSelectedCategories() {
throw new Error('Method not implemented.');
}

hideDialog() {
throw new Error('Method not implemented.');
}
saveCategory() {
throw new Error('Method not implemented.');
}
  @ViewChild("dt") table!: Table;

  // Form and Data
  categoryForm: FormGroup;
  category: Category = this.getDefaultCategory();//
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  categoryTree: any[] = [];
  parentCategories: any[] = [];
  stats: CategoryStats = this.initializeStats();

  // UI State
  viewMode: ViewMode = ViewMode.TABLE;
  statuses = [
    { label: 'Active', value: CategoryStatus.ACTIVE },
    { label: 'Inactive', value: CategoryStatus.INACTIVE }
  ];
  bulkActionOptions = [
    { label: "Select Action", value: "" },
    { label: "Set Active", value: BulkActions.SET_ACTIVE },
    { label: "Set Inactive", value: BulkActions.SET_INACTIVE },
    { label: "Set Featured", value: BulkActions.SET_FEATURED },
    { label: "Remove Featured", value: BulkActions.REMOVE_FEATURED },
    { label: "Delete", value: BulkActions.DELETE },
  ];

  // Flags
  loading = false;
  saving = false;
  deleting = false;
  submitted = false;
  showAdvancedOptions = false;
  categoryDialog = false;
  deleteDialog = false;

  // Filters
  searchQuery = "";
  statusFilter = "";
  bulkAction = "";

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.createCategoryForm();
    this.category = this.getDefaultCategory(); 
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadParentCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --------------------------
  // Initialization Methods
  // --------------------------

  private createCategoryForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      icon: [DEFAULT_CATEGORY_ICON],
      color: [DEFAULT_CATEGORY_COLOR],
      status: [CategoryStatus.ACTIVE, Validators.required],
      parentId: [null],
      featured: [false],
      sortOrder: [0, [Validators.min(0), Validators.max(1000)]],
      seoTitle: ['', Validators.maxLength(60)],
      seoDescription: ['', Validators.maxLength(160)],
      seoKeywords: [''],
      file: [null]
    });
  }

  private initializeStats(): CategoryStats {
    return {
      totalCategories: 0,
      activeCategories: 0,
      featuredCategories: 0,
      totalProducts: 0,
      recentlyAdded: 0,
      averageProductsPerCategory: 0
    };
  }

  // --------------------------
  // Data Loading Methods
  // --------------------------

  loadCategories(): void {
    this.loading = true;
    
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories.map(c => ({
            ...c,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt)
          }));
          
          this.calculateStatistics();
          this.buildCategoryTree();
          this.prepareParentCategories();
          this.loading = false;
        },
        error: (error) => this.handleDataLoadError(error)
      });
  }

  loadParentCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.parentCategories = [
            { label: "None (Root Category)", value: null },
            ...categories.map(c => ({ label: c.name, value: c.id }))
          ];
        },
        error: (error) => this.handleDataLoadError(error)
      });
  }

  private handleDataLoadError(error: any): void {
    console.error('Error loading data:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load data',
      life: 3000
    });
    this.loading = false;
  }

  // --------------------------
  // Category CRUD Operations
  // --------------------------

  onSubmit(): void {
    this.submitted = true;
    
    if (this.categoryForm.invalid) {
      this.markFormGroupTouched(this.categoryForm);
      return;
    }

    this.loading = true;
    const formData = this.prepareFormData();

    const saveOperation = this.category.id 
      ? this.categoryService.updateCategory(this.category.id, this.categoryForm.value)
      : this.categoryService.createCategory(formData);

    saveOperation
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSaveSuccess(),
        error: (error) => this.handleSaveError(error)
      });
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.categoryForm.value;

    Object.keys(formValue).forEach(key => {
      if (key === 'file' && formValue[key]) {
        formData.append(key, formValue[key]);
      } else if (formValue[key] !== null) {
        formData.append(key, formValue[key]);
      }
    });

    return formData;
  }

  private handleSaveSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.category.id ? 'Category updated' : 'Category created'
    });
    this.resetForm();
    this.loadCategories();
    this.loading = false;
  }

  private handleSaveError(error: any): void {
    console.error('Error saving category:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.getSaveErrorMessage(error)
    });
    this.loading = false;
  }

  deleteCategory(category: Category): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${category.name}" and all its subcategories?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleting = true;
        this.categoryService.deleteCategory(category.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => this.handleDeleteSuccess(category),
            error: (error) => this.handleDeleteError(error, category)
          });
      }
    });
  }

  private handleDeleteSuccess(category: Category): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: `"${category.name}" was deleted successfully`
    });
    this.selectedCategories = this.selectedCategories.filter(c => c.id !== category.id);
    this.loadCategories();
    this.deleting = false;
  }

  private handleDeleteError(error: any, category: Category): void {
    console.error('Error deleting category:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Delete Failed',
      detail: this.getDeleteErrorMessage(error, category)
    });
    this.deleting = false;
  }

  // --------------------------
  // Bulk Operations
  // --------------------------

  executeBulkAction(): void {
    if (!this.bulkAction || this.selectedCategories.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Action',
        detail: 'Please select an action and categories'
      });
      return;
    }

    const confirmationMessage = this.getBulkActionConfirmation();
    
    this.confirmationService.confirm({
      message: confirmationMessage,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.processBulkAction()
    });
  }

  private processBulkAction(): void {
    const requests = this.selectedCategories.map(category => {
      switch (this.bulkAction) {
        case BulkActions.DELETE:
          return this.categoryService.deleteCategory(category.id);
        default:
          const updatedCategory = this.getUpdatedCategoryForBulkAction(category);
          return this.categoryService.updateCategory(category.id, { ...updatedCategory, id: category.id });
      }
    });

    forkJoin(requests)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleBulkActionSuccess(),
        error: (error) => this.handleBulkActionError(error)
      });
  }

  private getUpdatedCategoryForBulkAction(category: Category): Partial<Category> {
    const updates: Partial<Category> = { ...category };
    
    switch (this.bulkAction) {
      case BulkActions.SET_ACTIVE: updates.status = CategoryStatus.ACTIVE; break;
      case BulkActions.SET_INACTIVE: updates.status = CategoryStatus.INACTIVE; break;
      case BulkActions.SET_FEATURED: updates.featured = true; break;
      case BulkActions.REMOVE_FEATURED: updates.featured = false; break;
    }

    return updates;
  }

  private handleBulkActionSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Bulk operation completed'
    });
    this.bulkAction = '';
    this.selectedCategories = [];
    this.loadCategories();
  }

  private handleBulkActionError(error: any): void {
    console.error('Bulk operation error:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to complete bulk operation'
    });
  }

  // --------------------------
  // Helper Methods
  // --------------------------

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private getBulkActionConfirmation(): string {
    const count = this.selectedCategories.length;
    const actions = {
      [BulkActions.SET_ACTIVE]: `Set ${count} categories as active?`,
      [BulkActions.SET_INACTIVE]: `Set ${count} categories as inactive?`,
      [BulkActions.SET_FEATURED]: `Set ${count} categories as featured?`,
      [BulkActions.REMOVE_FEATURED]: `Remove ${count} categories from featured?`,
      [BulkActions.DELETE]: `Delete ${count} categories?`
    };

    return actions[this.bulkAction as BulkActions] || 'Confirm action?';
  }

  private getSaveErrorMessage(error: any): string {
    if (error.status === 409) return 'Category with this name already exists';
    if (error.status === 400) return 'Invalid category data';
    return 'Failed to save category';
  }

  private getDeleteErrorMessage(error: any, category: Category): string {
    if (error.status === 404) return `Category "${category.name}" not found`;
    if (error.status === 403) return `No permission to delete "${category.name}"`;
    if (error.status === 409) return `"${category.name}" has associated products`;
    return `Failed to delete "${category.name}"`;
  }

  // --------------------------
  // UI Utility Methods
  // --------------------------

  openNew(): void {
    this.category = this.getDefaultCategory();
    this.submitted = false;
    this.categoryDialog = true;
  }

  editCategory(category: Category): void {
    this.category = { ...category };
    this.categoryForm.patchValue(category);
    this.categoryDialog = true;
  }

  resetForm(): void {
    this.categoryForm.reset({
      icon: DEFAULT_CATEGORY_ICON,
      color: DEFAULT_CATEGORY_COLOR,
      status: CategoryStatus.ACTIVE,
      featured: false,
      sortOrder: 0
    });
    this.submitted = false;
  }

  private getDefaultCategory(): Category {
    return {
        id: 0,
        name: '',
        slug: '',
        description: '',
        productCount: 0,
        status: CategoryStatus.ACTIVE,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        color: DEFAULT_CATEGORY_COLOR,
        icon: DEFAULT_CATEGORY_ICON,
        level: 0,
        sortOrder: 0, // Default to 0, we'll update this when needed
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        productResponse: [],
        imageUrl: '',
        count: 0
    };
}

  // --------------------------
  // Tree and Statistics Methods
  // --------------------------

  private calculateStatistics(): void {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    this.stats = {
      totalCategories: this.categories.length,
      activeCategories: this.categories.filter(c => c.status === CategoryStatus.ACTIVE).length,
      featuredCategories: this.categories.filter(c => c.featured).length,
      totalProducts: this.categories.reduce((sum, c) => sum + (c.productCount || 0), 0),
      recentlyAdded: this.categories.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length,
      averageProductsPerCategory: this.categories.length > 0 
        ? this.categories.reduce((sum, c) => sum + (c.productCount || 0), 0) / this.categories.length 
        : 0,
      topCategory: this.categories.length > 0
        ? this.categories.reduce((prev, current) => 
            (prev.productCount || 0) > (current.productCount || 0) ? prev : current
          )
        : undefined
    };
  }

  private buildCategoryTree(): void {
    const rootCategories = this.categories.filter(c => !c.parentId);
    this.categoryTree = rootCategories.map(root => this.buildTreeNode(root));
  }

  private buildTreeNode(category: Category): any {
    return {
      key: category.id,
      label: category.name,
      data: category,
      icon: category.icon,
      children: this.categories
        .filter(c => c.parentId === category.id)
        .map(child => this.buildTreeNode(child))
    };
  }

  private prepareParentCategories(): void {
    this.parentCategories = [
      { label: "None (Root Category)", value: null },
      ...this.categories
        .filter(c => !c.parentId)
        .map(c => ({ label: c.name, value: c.id }))
    ];
  }

  // --------------------------
  // Event Handlers
  // --------------------------

  onFileChange(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.categoryForm.patchValue({ file });
      this.categoryForm.get('file')?.updateValueAndValidity();
    }
  }

  generateSlug(): void {
    const nameControl = this.categoryForm.get('name');
    const slugControl = this.categoryForm.get('slug');
    
    if (nameControl?.value && !slugControl?.dirty) {
      const slug = nameControl.value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      slugControl?.setValue(slug);
    }
  }

  toggleFeatured(category: Category, event: any): void {
    this.categoryService.updateCategory(category.id, { ...category, featured: event.checked })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: `Featured status updated for ${category.name}`
        }),
        error: (error) => this.handleSaveError(error)
      });
  }

  exportCategories(): void {
    this.loading = true;
    
  }

  private handleExportSuccess(data: any): void {
    // Implement actual export logic (e.g., download file)
    console.log('Export data:', data);
    this.messageService.add({
      severity: 'success',
      summary: 'Exported',
      detail: 'Categories exported successfully'
    });
    this.loading = false;
  }

  private handleExportError(error: any): void {
    console.error('Export error:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Export Failed',
      detail: 'Failed to export categories'
    });
    this.loading = false;
  }

  toggleStatus(category: Category, event: Event): void {
    const newStatus = category.status === CategoryStatus.ACTIVE 
      ? CategoryStatus.INACTIVE 
      : CategoryStatus.ACTIVE;
    
    this.categoryService.updateCategory(category.id, { ...category, status: newStatus })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: `Status updated for ${category.name}`
        }),
        error: (error) => this.handleSaveError(error)
      });
  }

  clearFilters(): void {
    this.searchQuery = "";
    this.statusFilter = "";
    this.table.clear();
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  // --------------------------
  // Getters for Template
  // --------------------------

  get f() { return this.categoryForm.controls; }

  get filteredCategories(): Category[] {
    let filtered = this.categories;

    if (this.statusFilter) {
      filtered = filtered.filter(c => c.status === this.statusFilter);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        (c.description?.toLowerCase().includes(query)) ||
        (c.slug?.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  // getSeverity(status: string): string {
  //   switch (status) {
  //     case CategoryStatus.ACTIVE: return "success";
  //     case CategoryStatus.INACTIVE: return "danger";
  //     default: return "info";
  //   }
  // }
  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    if (status === 'active') return 'success';
    if (status === 'inactive') return 'danger';
    return 'info';
  }

  getParentCategoryName(parentId?: number): string {
    if (!parentId) return "None (Root Category)";
    const parent = this.categories.find(c => c.id === parentId);
    return parent ? parent.name : "Unknown";
  }

  getCategoryLevel(category: Category): string {
    return category.level === 0 ? "Root" : `Level ${category.level}`;
  }


toggleAdvancedOptions(): void {
  this.showAdvancedOptions = !this.showAdvancedOptions;
}
getFilteredCategories(): any[] {
  return this.categories.filter(category => category.name.includes(this.searchQuery));
}

}
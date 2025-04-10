import { Component , OnInit } from '@angular/core';
import { Category } from '../../../../Dashboard/catrgory/category.model';

import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environment/environment';
import { CategoryService } from '../../../../Dashboard/catrgory/category.service';

@Component({
  selector: 'app-categoryshop',
  standalone: false,
  templateUrl: './categoryshop.component.html',
  styleUrl: './categoryshop.component.css'
})
export class CategoryshopComponent implements OnInit {
  private readonly apiBaseUrl = `${environment.apiUrl}/categories`;
  category: Category | null = null;
  loading = true;
  error: string | null = null;
  isEmpty: boolean = false;

  constructor(
    private categoryservice : CategoryService,

    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  selectedSort: string | null = null;
  sortOptions: { label: string, value: string }[] = [
    { label: 'Price: Low to High', value: 'priceAsc' },
    { label: 'Price: High to Low', value: 'priceDesc' },
    { label: 'Name: A to Z', value: 'nameAsc' },
    { label: 'Name: Z to A', value: 'nameDesc' }
  ];

  sortProducts(): void {
   
    console.log('Sorting products based on selectedSort:', this.selectedSort);
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert string to number
      this.loadCategory(id);
    });
  }

  loadCategory(id: number): void {
    this.loading = true;
    this.error = null;
    this.isEmpty = false;

    this.categoryservice.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = category;
        
        // Check if products exist
        if (!category.productResponse || category.productResponse.length === 0) {
          this.isEmpty = true;
        }
        
        this.loading = false;
      },
      error: (err) => {
        this.handleError(err);
        this.loading = false;
      }
    });
  }
  // loadCategory(id: number): void {
  //   this.loading = true;
  //   this.error = null;

  //   this.categoryservice.getCategoryById(id).subscribe({
  //     next: (category) => {
  //       this.category = {
  //         ...category,
  //         productResponse: category.productResponse || [] // Ensure array exists
  //       };
  //       this.loading = false;
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       this.handleError(err);
  //       this.loading = false;
  //     }
  //   });
  // }


  // getCategoryById(id: number): Observable<Category> {
  //   return this.http.get<{ data: Category }>(`${this.apiBaseUrl}/GetByID`, {
  //     params: new HttpParams().set('id', id.toString())
  //   }).pipe(
  //     map(response => response.data),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: any): Observable<never> {
    // Custom error handling logic
    console.error('An error occurred:', error);
    throw error;
  }

 
 
}
function tap(arg0: (category: any) => void): import("rxjs").OperatorFunction<Category, unknown> {
  throw new Error('Function not implemented.');
}

function switchMap(arg0: (params: any) => Observable<void>): import("rxjs").OperatorFunction<import("@angular/router").Params, unknown> {
  throw new Error('Function not implemented.');
}

function of(undefined: undefined): any {
  throw new Error('Function not implemented.');
}


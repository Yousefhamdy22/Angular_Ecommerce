import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { 
  Product, 
  SingleProductApiResponse, 
  MultiProductApiResponse, 
  PaginatedProductResponse 
} from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiBaseUrl = `${environment.apiUrl}/product`;
  private readonly defaultRetryCount = 2; // Auto-retry failed requests
  private readonly defaultPageSize = 10; // Default pagination size

  constructor(private http: HttpClient) {}

  // ==================== GET ALL PRODUCTS (NO PAGINATION) ====================
  getAllProductsNoPagination(filters?: { [key: string]: string | number }): Observable<Product[]> {
    let params = new HttpParams();
  
    // Apply filters if needed (optional)
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.set(key, filters[key].toString());
      });
    }
  
    return this.http.get<MultiProductApiResponse>(
      `${this.apiBaseUrl}/GetAllProduct`, // Ensure your API supports this
      { params }
    ).pipe(
      map(response => response.data), // Extract the `data` array
      retry(this.defaultRetryCount),
      catchError(this.handleError)
    );
  }
  // ==================== GET ALL PRODUCTS (PAGINATED) ====================
  getProducts(
    page: number = 1,
    pageSize: number = this.defaultPageSize,
    filters?: { [key: string]: string | number }
  ): Observable<PaginatedProductResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    // Apply filters if provided (e.g., { categoryId: 5, minPrice: 100 })
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.set(key, filters[key].toString());
      });
    }

    return this.http.get<PaginatedProductResponse>(
      `${this.apiBaseUrl}/GetAllProduct`, 
      { params }
    ).pipe(
      retry(this.defaultRetryCount), // Retry failed requests
      catchError(this.handleError)   // Handle errors
    );
  }

  // ==================== GET PRODUCT BY ID ====================
  getProductById(id: number): Observable<Product> {
    return this.http.get<SingleProductApiResponse>(
      `${this.apiBaseUrl}/GetByID`, 
      { params: new HttpParams().set('id', id.toString()) }
    ).pipe(
      map(response => response.data), // Extract `data` from API response
      retry(this.defaultRetryCount),
      catchError(this.handleError)
    );
  }

  // ==================== CREATE PRODUCT (SUPPORTS FILE UPLOAD) ====================
  createProduct(product: Product | FormData): Observable<Product> {
    let headers = new HttpHeaders();
    
    // If sending JSON (not FormData), set Content-Type
    if (!(product instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.http.post<SingleProductApiResponse>(
      `${this.apiBaseUrl}/create`, 
      product, 
      { headers }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // ==================== UPDATE PRODUCT ====================
  updateProduct(id: number, product: Product | FormData): Observable<Product> {
    let headers = new HttpHeaders();
    
    if (!(product instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.http.put<SingleProductApiResponse>(
      `${this.apiBaseUrl}/${id}`, 
      product, 
      { headers }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // ==================== DELETE PRODUCT ====================
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/${id}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== SEARCH PRODUCTS ====================
  searchProducts(query: string, limit: number = 5): Observable<Product[]> {
    return this.http.get<MultiProductApiResponse>(
      `${this.apiBaseUrl}/search`, 
      {
        params: new HttpParams()
          .set('q', query)
          .set('limit', limit.toString())
      }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // ==================== GET FEATURED PRODUCTS ====================
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<MultiProductApiResponse>(
      `${this.apiBaseUrl}/featured`
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // ==================== ERROR HANDLER ====================
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error (network issues, CORS, etc.)
      errorMessage = `Network Error: ${error.error.message}`;
    } else {
      // Server-side error (API errors)
      switch (error.status) {
        case 0:
          errorMessage = 'No internet connection.';
          break;
        case 400:
          errorMessage = 'Invalid request data.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login.';
          break;
        case 403:
          errorMessage = 'Access denied.';
          break;
        case 404:
          errorMessage = 'Product not found.';
          break;
        case 409:
          errorMessage = 'Product already exists.';
          break;
        case 500:
          errorMessage = 'Server error. Try again later.';
          break;
      }
    }
    
    console.error('ProductService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
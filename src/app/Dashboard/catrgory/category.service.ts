import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Category, CategoryApiResponse, CategoryCreateDto, CategoryUpdateDto } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiBaseUrl = `${environment.apiUrl}/categories`;
  
  constructor(private http: HttpClient) {}
  
  // GET all categories with pagination support
  getCategories(page: number = 1, pageSize: number = 10): Observable<CategoryApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<CategoryApiResponse>(`${this.apiBaseUrl}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // GET all categories (simplified version)
  getAllCategories(): Observable<Category[]> {
    return this.http.get<{ data: Category[] }>(`${this.apiBaseUrl}/GetAllCategory`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // GET category by ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<{ data: Category }>(`${this.apiBaseUrl}/GetByID`, {
      params: new HttpParams().set('id', id.toString())
    }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // CREATE new category
  // createCategory(category: CategoryCreateDto): Observable<Category> {
  //   return this.http.post<{ data: Category }>(this.apiBaseUrl, category).pipe(
  //     map(response => response.data),
  //     catchError(this.handleError)
  //   );
  // }
  createCategory(categoryFormData: FormData): Observable<Category> {
    return this.http.post<{ data: Category }>(`${this.apiBaseUrl}/CreateCategory`, categoryFormData).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }
  

  // UPDATE existing category
  updateCategory(id: number, category: CategoryUpdateDto): Observable<Category> {
    return this.http.put<{ data: Category }>(`${this.apiBaseUrl}/${id}`, category).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // DELETE category
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // GET featured categories
  // getFeaturedCategories(): Observable<Category[]> {
  //   return this.http.get<{ data: Category[] }>(`${this.apiBaseUrl}/featured`).pipe(
  //     map(response => response.data),
  //     catchError(this.handleError)
  //   );
  // }

  // SEARCH categories
  searchCategories(query: string): Observable<Category[]> {
    return this.http.get<{ data: Category[] }>(`${this.apiBaseUrl}/search`, {
      params: new HttpParams().set('q', query)
    }).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Improved error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Add specific error messages based on status code
      switch (error.status) {
        case 404:
          errorMessage = 'Category not found';
          break;
        case 400:
          errorMessage = 'Invalid request data';
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          break;
        case 403:
          errorMessage = 'Forbidden operation';
          break;
        case 409:
          errorMessage = 'Category already exists';
          break;
      }
    }
    
    console.error('CategoryService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
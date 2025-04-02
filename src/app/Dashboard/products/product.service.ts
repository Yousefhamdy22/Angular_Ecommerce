import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  
  getCategories(): Observable<any[]> {
    // Replace the URL with the actual endpoint for fetching categories
    return this.http.get<any[]>('/api/categories');
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post('/api/products', formData);
  }
}

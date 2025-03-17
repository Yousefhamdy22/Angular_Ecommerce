import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RatingModule,
    SkeletonModule,
    ButtonModule,
    BrowserModule,
    HttpClientModule 
  ],
  providers:[
   ProductService
  ],
  exports:[
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductsModule { }

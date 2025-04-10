import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsModule } from './features/products/products.module';

import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './features/auth/auth.module';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardModule } from './Dashboard/dashboard.module';
import { FeatureModule } from './features/feature.module';

import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent 
    
   
  ],
  imports: [
    // Angular Modules
    SharedModule,
    ProductsModule,
    DashboardModule,
    AuthModule,
   FeatureModule ,  // PrimeNG Modules
    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    RatingModule,
    CommonModule,
     
    ReactiveFormsModule,
   // Angular Router
    
    AppRoutingModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
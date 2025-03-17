import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsModule } from './features/products/products.module';

import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from "./features/home/home.module";

@NgModule({
  declarations: [AppComponent
   
  ],
  imports: [
    SharedModule,
    ProductsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    HomeModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,  // PrimeNG Buttons
    CarouselModule, // PrimeNG Carousels
    CardModule, // PrimeNG Cards
    HttpClientModule 

  ],
  exports: [HomeComponent], // Export for usage in other modules
})
export class HomeModule {}

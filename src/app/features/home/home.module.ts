import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';

import { TagModule } from "primeng/tag"
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    ButtonModule, // PrimeNG Buttons
    CarouselModule, // PrimeNG Carousels
    CardModule, // PrimeNG Cards
    HttpClientModule,
    FormsModule,
    RatingModule, // PrimeNG Rating
    ToastModule,
    ToastModule,
    TabViewModule,
    DialogModule,
    GalleriaModule,
    TooltipModule, InputNumberModule, TagModule,
    SharedModule
],

 
  exports: [HomeComponent], 
})
export class HomeModule {}

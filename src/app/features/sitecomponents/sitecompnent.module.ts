import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from "primeng/button"
import { InputTextModule } from "primeng/inputtext"
import { CheckboxModule } from "primeng/checkbox"
import { RadioButtonModule } from "primeng/radiobutton"
import { SliderModule } from "primeng/slider"
import { DropdownModule } from "primeng/dropdown"
import { RatingModule } from "primeng/rating"
import { BadgeModule } from "primeng/badge"
import { TooltipModule } from "primeng/tooltip"
import { RippleModule } from "primeng/ripple"
import { PaginatorModule } from "primeng/paginator"
import { SkeletonModule } from "primeng/skeleton"
import { DialogModule } from "primeng/dialog"
import { GalleriaModule } from "primeng/galleria"
import { InputNumberModule } from "primeng/inputnumber"
import { MessageService } from "primeng/api"
import { ToastModule } from "primeng/toast"
import { DividerModule } from "primeng/divider"
import { AccordionModule } from "primeng/accordion"
import { ChipModule } from "primeng/chip"
import { OverlayPanelModule } from "primeng/overlaypanel"
import { ShopComponent } from './shop/shop.component';
import { NewarrivalsComponent } from './newarrivals/newarrivals.component';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CategoryshopComponent } from './shop/categoryshop/categoryshop.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
@NgModule({
  declarations: [
    
      ShopComponent,
      NewarrivalsComponent
    , CategoryshopComponent ,
      AboutComponent ,
      ContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    SliderModule,
    DropdownModule,
    RatingModule,
    BadgeModule,
    TooltipModule,
    RippleModule,
    PaginatorModule,
    SkeletonModule,
    DialogModule,
    GalleriaModule,
    InputNumberModule,
    ToastModule,
    DividerModule,
    AccordionModule,
    ChipModule,
    OverlayPanelModule,
    TabViewModule,
    ProgressSpinnerModule,
    SharedModule
],
  exports: [
    ShopComponent ,
    NewarrivalsComponent,
    CategoryshopComponent,
     AboutComponent ,
     ContactComponent
  ]
})
export class sitecomponentModule { }

import { NgModule } from '@angular/core';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FilterPipe } from './dashboard-main/filter.pipe';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';

import { CategoryComponent } from './catrgory/catrgory.component';

import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"

// PrimeNG Modules
import { TableModule } from "primeng/table"
import { ToastModule } from "primeng/toast"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { DialogModule } from "primeng/dialog"
import { ConfirmDialogModule } from "primeng/confirmdialog"

import { DropdownModule } from "primeng/dropdown"
import { InputTextModule } from "primeng/inputtext"
import { InputTextarea } from "primeng/inputtextarea"
import { InputNumberModule } from "primeng/inputnumber"
import { InputSwitchModule } from "primeng/inputswitch"
import { CheckboxModule } from "primeng/checkbox"
import { TagModule } from "primeng/tag"
import { SelectButtonModule } from "primeng/selectbutton"
import { ColorPickerModule } from "primeng/colorpicker"
import { TreeModule } from "primeng/tree"
import { RippleModule } from "primeng/ripple"
import { SplitButtonModule } from "primeng/splitbutton"
import { Table } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { ProgressBarModule } from 'primeng/progressbar';

import { MenuItem } from 'primeng/api';

// Your Product Service and Model



import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { TimelineModule } from 'primeng/timeline';
import { RatingModule } from 'primeng/rating';


import { MessageService, ConfirmationService } from "primeng/api"
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { MenuModule } from 'primeng/menu';
import { CategoryService } from './catrgory/category.service';
import { FileUploadModule } from 'primeng/fileupload';
import { OrderdetailsComponent } from './orders/orderdetails/orderdetails.component';
@NgModule({
    declarations: [
        DashboardMainComponent,
        ProductAddComponent,
        ProductListComponent,
        ProductDetailsComponent,
        OrderListComponent,
        OrderHistoryComponent,
        OrderdetailsComponent,

        CategoryComponent,
        
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        FilterPipe,
        FileUploadModule,
        TooltipModule,
        FilterPipe,
        
        ToolbarModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        InputSwitchModule,
        CheckboxModule,
        TagModule,
        SelectButtonModule,
        ColorPickerModule,
        TreeModule,
        RippleModule,
        RippleModule,
        RatingModule,
        ProgressSpinnerModule,
        SplitButtonModule,
        TimelineModule,
        BrowserModule,
        MenuModule,
       TableModule,
       ProgressBarModule,

        ButtonModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        TagModule,
        SplitButtonModule,
        InputNumberModule,
        RatingModule,
        InputTextModule,
        
        CheckboxModule,
        TimelineModule
    ],
   
    exports: [
        DashboardMainComponent,
        ProductAddComponent,
        ProductListComponent,
        ProductDetailsComponent,
        OrderListComponent,
        OrderHistoryComponent,   

        CategoryComponent,
    ],
  providers: [
  MessageService
, ConfirmationService
, CategoryService

,
],
  
    bootstrap: [],
})
export class DashboardModule { }
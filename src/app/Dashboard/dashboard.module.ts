import { NgModule } from '@angular/core';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DashboardMainComponent,
        ProductAddComponent
        
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        RouterOutlet,
        ReactiveFormsModule,
        
        
    ],
   
    exports: [
        DashboardMainComponent,
        ProductAddComponent
        
    ],
  
})
export class DashboardModule { }
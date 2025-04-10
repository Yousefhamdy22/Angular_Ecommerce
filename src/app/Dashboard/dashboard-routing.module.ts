import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductAddComponent } from './products/product-add/product-add.component';

import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { CategoryComponent } from './catrgory/catrgory.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { OrderdetailsComponent } from './orders/orderdetails/orderdetails.component';



const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardMainComponent, // this is a standalone component now, not in a layout
  },
  {
    path: 'dashboard/products',
    component: ProductListComponent, // Open in a new page
  },
  {
    path: 'dashboard/products/create',
    component: ProductAddComponent, // Open in a new page
  },

  {
    path: 'dashboard/products/details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'dashboard/orders',
    component: OrderListComponent,
 },
  {
    path: 'dashboard/orders/history',
    component: OrderHistoryComponent, 
  },
  {
    path: 'dashboard/orders/details',
    component: OrderdetailsComponent, 
  },
  {
    path: 'dashboard/categories',
    component: CategoryComponent, 
  }
  ,
 // { path: '**', redirectTo: '/dashboard' },
];




  
        
  

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
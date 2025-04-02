import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductAddComponent } from './products/product-add/product-add.component';

import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const routes: Routes = [
    { 
      path: 'dashboard', 
      component: DashboardMainComponent,
      children: [  
        { path: 'products', component: ProductListComponent },
        { path: 'products/create', component: ProductAddComponent },
        { path: 'products/edit/:id', component: ProductEditComponent },
        { path: '', redirectTo: '', pathMatch: 'full' }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
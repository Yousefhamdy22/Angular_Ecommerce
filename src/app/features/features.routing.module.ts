import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'dashboard', 
    loadChildren: () => import('../Dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild for feature modules
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/features/home/home.component';


const routes: Routes = [ 
  {path: '' ,component : HomeComponent }, 
  { path: 'feature', loadChildren: () => import('./app/features/feature.module').then(m => m.FeatureModule) },
  {path: 'dashboard', loadChildren: () => import('./app/Dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', redirectTo: 'feature', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {}
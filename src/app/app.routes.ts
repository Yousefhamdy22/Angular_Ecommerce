import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    loadChildren: () => import('./features/feature.module').then(m => m.FeatureModule)
  },

  {path: 'dashboard', loadChildren: () => import('../app/Dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', redirectTo: 'feature', pathMatch: 'full' } 
 
];

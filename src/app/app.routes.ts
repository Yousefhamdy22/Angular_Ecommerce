import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./features/feature.module').then(m => m.FeatureModule)
  }
 
];
